"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { identifyUser, trackLogin, trackSignup, trackLogout } from "@/lib/analytics";
import { MEDUSA_BACKEND_URL, PUBLISHABLE_KEY } from "@/lib/medusa";

// User shape matches Medusa customer + our extensions via metadata
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  referralCode: string;
  totalEarnings: number;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<Pick<User, "firstName" | "lastName">>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  organization?: string;
  referralCodeUsed?: string;
}

const TOKEN_KEY = "oryn_medusa_auth_token";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Common headers for Medusa Store API calls */
function storeHeaders(token?: string | null): Record<string, string> {
  const h: Record<string, string> = { "Content-Type": "application/json" };
  if (PUBLISHABLE_KEY) h["x-publishable-api-key"] = PUBLISHABLE_KEY;
  if (token) h["Authorization"] = `Bearer ${token}`;
  return h;
}

/** Map Medusa customer response to our User shape */
function mapCustomerToUser(customer: Record<string, unknown>): User {
  const metadata = (customer.metadata || {}) as Record<string, unknown>;
  return {
    id: customer.id as string,
    email: customer.email as string,
    firstName: (customer.first_name as string) || "",
    lastName: (customer.last_name as string) || "",
    role: (metadata.role as string) || "customer",
    referralCode: (metadata.referral_code as string) || "",
    totalEarnings: (metadata.total_earnings as number) || 0,
  };
}

/** Fetch the current customer profile from Medusa */
async function fetchCustomerProfile(token: string): Promise<User> {
  const res = await fetch(`${MEDUSA_BACKEND_URL}/store/customers/me`, {
    headers: storeHeaders(token),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch customer profile");
  }
  const data = await res.json();
  return mapCustomerToUser(data.customer);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount: check for existing token and load profile
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      fetchCustomerProfile(storedToken)
        .then((customer) => {
          setToken(storedToken);
          setUser(customer);
          identifyUser(customer);
        })
        .catch(() => {
          // Token expired or invalid — clear it
          localStorage.removeItem(TOKEN_KEY);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Step 1: Authenticate with Medusa
      const authRes = await fetch(`${MEDUSA_BACKEND_URL}/auth/customer/emailpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!authRes.ok) {
        const errData = await authRes.json().catch(() => ({}));
        const msg = (errData as Record<string, string>).message || "Invalid email or password";
        return { success: false, error: msg };
      }

      const authData = await authRes.json();
      const newToken = authData.token as string;

      // Step 2: Fetch the full customer profile
      const customer = await fetchCustomerProfile(newToken);

      // Step 3: Persist
      localStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
      setUser(customer);
      identifyUser(customer);
      trackLogin("email");
      return { success: true };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      // Step 1: Register auth identity in Medusa
      const authRes = await fetch(`${MEDUSA_BACKEND_URL}/auth/customer/emailpass/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      if (!authRes.ok) {
        const errData = await authRes.json().catch(() => ({}));
        const msg = (errData as Record<string, string>).message || "Registration failed";
        // Common: "Identity with email already exists"
        if (msg.toLowerCase().includes("already exists") || msg.toLowerCase().includes("already registered")) {
          return { success: false, error: "An account with this email already exists. Please log in instead." };
        }
        return { success: false, error: msg };
      }

      const authData = await authRes.json();
      const newToken = authData.token as string;

      // Step 2: Create the customer profile
      const metadata: Record<string, string> = {};
      if (data.referralCodeUsed) metadata.referred_by_code = data.referralCodeUsed;
      if (data.organization) metadata.organization = data.organization;

      const createRes = await fetch(`${MEDUSA_BACKEND_URL}/store/customers`, {
        method: "POST",
        headers: storeHeaders(newToken),
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          metadata,
        }),
      });

      if (!createRes.ok) {
        const errData = await createRes.json().catch(() => ({}));
        const msg = (errData as Record<string, string>).message || "Failed to create customer profile";
        return { success: false, error: msg };
      }

      // Step 3: Fetch the full customer profile
      const customer = await fetchCustomerProfile(newToken);

      // Step 4: Persist
      localStorage.setItem(TOKEN_KEY, newToken);
      setToken(newToken);
      setUser(customer);
      identifyUser(customer);
      trackSignup("email", data.referralCodeUsed);
      return { success: true };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  }, []);

  const logout = useCallback(() => {
    trackLogout();
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
  }, []);

  const refreshProfile = useCallback(async () => {
    const currentToken = localStorage.getItem(TOKEN_KEY);
    if (!currentToken) return;
    try {
      const customer = await fetchCustomerProfile(currentToken);
      setUser(customer);
    } catch {
      // If token is invalid, log out
      logout();
    }
  }, [logout]);

  const updateProfile = useCallback(
    async (data: Partial<Pick<User, "firstName" | "lastName">>) => {
      const currentToken = localStorage.getItem(TOKEN_KEY);
      if (!currentToken) return;

      const body: Record<string, string> = {};
      if (data.firstName !== undefined) body.first_name = data.firstName;
      if (data.lastName !== undefined) body.last_name = data.lastName;

      const res = await fetch(`${MEDUSA_BACKEND_URL}/store/customers/me`, {
        method: "POST",
        headers: storeHeaders(currentToken),
        body: JSON.stringify(body),
      });

      if (res.ok) {
        const result = await res.json();
        const updatedCustomer = mapCustomerToUser(result.customer);
        setUser(updatedCustomer);
      }
    },
    []
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
