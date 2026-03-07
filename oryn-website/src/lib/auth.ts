import crypto from 'crypto';

const TOKEN_SECRET = 'oryn-peptides-secret-key-2024';
const TOKEN_EXPIRY_HOURS = 24;

// ─── Password hashing ──────────────────────────────────────────────────────

/**
 * Hash a password using SHA-256 with a salt.
 * Note: In production, use bcrypt or argon2. This is a simple approach
 * for environments where those packages aren't easily available.
 */
export function hashPassword(password: string): string {
  const salt = 'oryn-salt-v1';
  return crypto
    .createHash('sha256')
    .update(salt + password)
    .digest('hex');
}

/**
 * Verify a password against a stored hash.
 */
export function verifyPassword(password: string, hash: string): boolean {
  return hashPassword(password) === hash;
}

// ─── Token management ───────────────────────────────────────────────────────

interface TokenPayload {
  userId: string;
  exp: number; // expiry timestamp in ms
  iat: number; // issued at timestamp in ms
}

/**
 * Generate a simple JWT-like token (base64-encoded JSON with HMAC signature).
 */
export function generateToken(userId: string): string {
  const now = Date.now();
  const payload: TokenPayload = {
    userId,
    iat: now,
    exp: now + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000,
  };

  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', TOKEN_SECRET)
    .update(payloadB64)
    .digest('base64url');

  return `${payloadB64}.${signature}`;
}

/**
 * Verify and decode a token. Returns the userId if valid, null otherwise.
 */
export function verifyToken(token: string): string | null {
  try {
    const [payloadB64, signature] = token.split('.');
    if (!payloadB64 || !signature) return null;

    // Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', TOKEN_SECRET)
      .update(payloadB64)
      .digest('base64url');

    if (signature !== expectedSignature) return null;

    // Decode payload
    const payload: TokenPayload = JSON.parse(
      Buffer.from(payloadB64, 'base64url').toString('utf-8')
    );

    // Check expiry
    if (Date.now() > payload.exp) return null;

    return payload.userId;
  } catch {
    return null;
  }
}

// ─── Code generators ────────────────────────────────────────────────────────

/**
 * Generate a unique 8-character alphanumeric referral code.
 */
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  const bytes = crypto.randomBytes(8);
  for (let i = 0; i < 8; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return code;
}

/**
 * Generate an order reference in the format ORY-XXXXX (5 digits).
 */
export function generateOrderRef(): string {
  const num = crypto.randomInt(10000, 99999);
  return `ORY-${num}`;
}
