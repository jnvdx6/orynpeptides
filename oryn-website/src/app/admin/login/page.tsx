'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid credentials');
        setLoading(false);
        return;
      }

      localStorage.setItem('oryn_admin_token', data.token);
      localStorage.setItem('oryn_admin_email', email);
      router.push('/admin');
    } catch {
      // If API doesn't exist yet, use mock auth
      if (email === 'admin@oryn.com' && password === 'admin123') {
        localStorage.setItem('oryn_admin_token', 'mock_admin_token_' + Date.now());
        localStorage.setItem('oryn_admin_email', email);
        router.push('/admin');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-grotesk">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 bg-oryn-orange rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">O</span>
          </div>
          <span className="text-gray-900 font-semibold text-xl tracking-tight">
            Oryn Admin
          </span>
        </div>

        {/* Login card */}
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
          <div className="mb-6">
            <h2 className="text-gray-900 text-lg font-semibold">Sign in</h2>
            <p className="text-gray-500 text-sm mt-1">
              Enter your credentials to access the admin panel.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@oryn.com"
                required
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-oryn-orange focus:ring-2 focus:ring-oryn-orange/20 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full px-3.5 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-oryn-orange focus:ring-2 focus:ring-oryn-orange/20 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-oryn-orange hover:bg-oryn-orange-dark text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm mt-2"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>

          <p className="mt-5 text-center text-gray-400 text-xs">
            Default: admin@oryn.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
