"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/providers/auth";
import { useLocale } from "@/i18n/LocaleContext";

interface ReferralData {
  referralCode: string;
  directReferrals: { id: string; firstName: string; lastName: string; email: string; createdAt: string }[];
  totalDirectReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  availableBalance: number;
  commissions: {
    id: string;
    orderRef: string;
    level: number;
    percentage: number;
    amount: number;
    status: string;
    createdAt: string;
  }[];
  stats: {
    directReferrals: number;
    totalNetworkSize: number;
    totalEarnings: number;
    pendingCommissions: number;
    approvedCommissions: number;
    paidCommissions: number;
    commissionsByLevel: { level: number; count: number; total: number }[];
  };
}

export default function ReferralsPage() {
  const { user, token } = useAuth();
  const { formatPrice } = useLocale();
  const [data, setData] = useState<ReferralData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch("/api/referrals", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [token]);

  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}/en/products?ref=${user?.referralCode || ""}`
    : "";

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const shareViaWhatsApp = () => {
    const text = `Check out ORYN Peptides — precision research peptides from a European biotech lab. Use my code ${user?.referralCode} for tracking on your first order: ${referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const shareViaEmail = () => {
    const subject = "ORYN Peptides — Precision Research Peptides";
    const body = `Hi,\n\nI wanted to share ORYN Peptides with you. They produce pharmaceutical-grade research peptides with >99% purity.\n\nUse my referral code: ${user?.referralCode}\n\nOr click here: ${referralLink}\n\nBest regards`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, "_blank");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-6 h-6 border-2 border-oryn-orange border-t-transparent animate-spin" />
      </div>
    );
  }

  const stats = data?.stats;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-oryn-grey/15 p-6">
        <div className="flex items-center gap-3 mb-1">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5">
            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 className="text-2xl font-bold tracking-tight">Referral Program</h1>
        </div>
        <p className="text-xs text-oryn-black/40 font-plex">
          Share ORYN with colleagues and earn commissions on every order they place.
        </p>
      </div>

      {/* Referral Link + Share */}
      <div className="bg-oryn-orange/5 border border-oryn-orange/15 p-6">
        <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">YOUR REFERRAL CODE</h3>

        <div className="flex items-center gap-3 mb-4">
          <code className="px-6 py-3 bg-white border border-oryn-orange/20 text-2xl font-mono font-bold text-oryn-orange tracking-[0.25em]">
            {user?.referralCode}
          </code>
          <button
            onClick={() => copyToClipboard(user?.referralCode || "", "code")}
            className="px-4 py-3 bg-oryn-orange text-white text-[10px] font-medium tracking-[0.1em] hover:bg-oryn-orange-dark transition-colors"
          >
            {copied === "code" ? "COPIED!" : "COPY CODE"}
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-[9px] font-mono text-oryn-black/40 tracking-[0.15em] mb-1.5">
            YOUR REFERRAL LINK
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={referralLink}
              className="flex-1 px-3 py-2 bg-white border border-oryn-grey/20 text-xs font-mono text-oryn-black/60"
            />
            <button
              onClick={() => copyToClipboard(referralLink, "link")}
              className="px-3 py-2 bg-oryn-black text-white text-[9px] font-medium tracking-[0.1em] hover:bg-oryn-black/80 transition-colors shrink-0"
            >
              {copied === "link" ? "COPIED!" : "COPY LINK"}
            </button>
          </div>
        </div>

        {/* Share buttons */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.1em]">SHARE VIA:</span>
          <button
            onClick={shareViaWhatsApp}
            className="px-3 py-1.5 bg-[#25D366] text-white text-[9px] font-medium tracking-[0.05em] hover:bg-[#20b858] transition-colors flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </button>
          <button
            onClick={shareViaEmail}
            className="px-3 py-1.5 bg-oryn-black text-white text-[9px] font-medium tracking-[0.05em] hover:bg-oryn-black/80 transition-colors flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            Email
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "DIRECT REFERRALS", value: stats?.directReferrals || 0, format: "number" },
          { label: "NETWORK SIZE", value: stats?.totalNetworkSize || 0, format: "number" },
          { label: "TOTAL EARNED", value: stats?.totalEarnings || 0, format: "currency" },
          { label: "AVAILABLE", value: data?.availableBalance || 0, format: "currency" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-oryn-grey/15 p-4">
            <span className="text-[9px] font-mono text-oryn-black/30 tracking-[0.15em]">
              {stat.label}
            </span>
            <p className="text-2xl font-bold mt-1">
              {stat.format === "currency" ? formatPrice(stat.value as number) : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Commission breakdown by level */}
      {stats?.commissionsByLevel && stats.commissionsByLevel.length > 0 && (
        <div className="bg-white border border-oryn-grey/15 p-6">
          <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">EARNINGS BY LEVEL</h3>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((level) => {
              const levelData = stats.commissionsByLevel.find((l) => l.level === level);
              const rates = [10, 5, 3, 2, 1];
              return (
                <div key={level} className="flex items-center justify-between px-4 py-3 bg-oryn-grey-light">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-oryn-orange/10 text-oryn-orange text-[10px] font-bold flex items-center justify-center">
                      L{level}
                    </span>
                    <span className="text-xs font-plex text-oryn-black/50">
                      Level {level} ({rates[level - 1]}% commission)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold">
                      {levelData ? formatPrice(levelData.total) : formatPrice(0)}
                    </span>
                    <span className="text-[9px] text-oryn-black/30 font-plex ml-2">
                      ({levelData?.count || 0} orders)
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Pending vs Paid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-yellow-50 border border-yellow-200 p-4">
          <span className="text-[9px] font-mono text-yellow-600 tracking-[0.15em]">PENDING</span>
          <p className="text-xl font-bold text-yellow-700 mt-1">{formatPrice(stats?.pendingCommissions || 0)}</p>
        </div>
        <div className="bg-green-50 border border-green-200 p-4">
          <span className="text-[9px] font-mono text-green-600 tracking-[0.15em]">APPROVED</span>
          <p className="text-xl font-bold text-green-700 mt-1">{formatPrice(stats?.approvedCommissions || 0)}</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-4">
          <span className="text-[9px] font-mono text-blue-600 tracking-[0.15em]">PAID OUT</span>
          <p className="text-xl font-bold text-blue-700 mt-1">{formatPrice(stats?.paidCommissions || 0)}</p>
        </div>
      </div>

      {/* Recent referrals */}
      {data?.directReferrals && data.directReferrals.length > 0 && (
        <div className="bg-white border border-oryn-grey/15 p-6">
          <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">YOUR REFERRALS</h3>
          <div className="divide-y divide-oryn-grey/10">
            {data.directReferrals.map((ref) => (
              <div key={ref.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-oryn-orange/10 text-oryn-orange text-[10px] font-bold flex items-center justify-center">
                    {ref.firstName?.[0]}{ref.lastName?.[0]}
                  </div>
                  <div>
                    <p className="text-xs font-bold">{ref.firstName} {ref.lastName}</p>
                    <p className="text-[10px] text-oryn-black/30 font-plex">{ref.email}</p>
                  </div>
                </div>
                <span className="text-[9px] text-oryn-black/30 font-plex">
                  {new Date(ref.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Commission history */}
      {data?.commissions && data.commissions.length > 0 && (
        <div className="bg-white border border-oryn-grey/15 p-6">
          <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">COMMISSION HISTORY</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-oryn-grey/10">
                  <th className="text-left py-2 font-mono text-[9px] text-oryn-black/30 tracking-[0.1em]">ORDER</th>
                  <th className="text-left py-2 font-mono text-[9px] text-oryn-black/30 tracking-[0.1em]">LEVEL</th>
                  <th className="text-left py-2 font-mono text-[9px] text-oryn-black/30 tracking-[0.1em]">RATE</th>
                  <th className="text-right py-2 font-mono text-[9px] text-oryn-black/30 tracking-[0.1em]">AMOUNT</th>
                  <th className="text-right py-2 font-mono text-[9px] text-oryn-black/30 tracking-[0.1em]">STATUS</th>
                  <th className="text-right py-2 font-mono text-[9px] text-oryn-black/30 tracking-[0.1em]">DATE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-oryn-grey/5">
                {data.commissions.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2.5 font-mono text-oryn-orange">{c.orderRef}</td>
                    <td className="py-2.5">L{c.level}</td>
                    <td className="py-2.5">{c.percentage}%</td>
                    <td className="py-2.5 text-right font-bold">{formatPrice(c.amount)}</td>
                    <td className="py-2.5 text-right">
                      <span className={`px-2 py-0.5 text-[9px] font-mono ${
                        c.status === "paid" ? "bg-green-100 text-green-700" :
                        c.status === "approved" ? "bg-blue-100 text-blue-700" :
                        c.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {c.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-oryn-black/30">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* How it works */}
      <div className="bg-white border border-oryn-grey/15 p-6">
        <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">HOW IT WORKS</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              title: "Share Your Code",
              desc: "Send your unique referral code or link to colleagues and fellow researchers.",
            },
            {
              step: "2",
              title: "They Order",
              desc: "When they register with your code and place an order, you earn commission.",
            },
            {
              step: "3",
              title: "Earn Rewards",
              desc: "Earn 10% on direct referrals, plus commissions on their referrals up to 5 levels deep.",
            },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-10 h-10 bg-oryn-orange text-white text-lg font-bold flex items-center justify-center mx-auto mb-3">
                {item.step}
              </div>
              <h4 className="text-sm font-bold mb-1">{item.title}</h4>
              <p className="text-[10px] text-oryn-black/40 font-plex">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
