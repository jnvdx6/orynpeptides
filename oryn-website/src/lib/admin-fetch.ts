// Shared helper for authenticated admin API calls

function getAuthHeaders(): Record<string, string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('oryn_admin_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function adminGet<T = unknown>(url: string): Promise<T> {
  const res = await fetch(url, { headers: getAuthHeaders() });
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oryn_admin_token');
      localStorage.removeItem('oryn_admin_email');
      window.location.href = '/admin/login';
    }
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function adminPost<T = unknown>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oryn_admin_token');
      localStorage.removeItem('oryn_admin_email');
      window.location.href = '/admin/login';
    }
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function adminPut<T = unknown>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  });
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oryn_admin_token');
      localStorage.removeItem('oryn_admin_email');
      window.location.href = '/admin/login';
    }
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function adminDelete<T = unknown>(url: string): Promise<T> {
  const res = await fetch(url, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('oryn_admin_token');
      localStorage.removeItem('oryn_admin_email');
      window.location.href = '/admin/login';
    }
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed: ${res.status}`);
  }
  return res.json();
}
