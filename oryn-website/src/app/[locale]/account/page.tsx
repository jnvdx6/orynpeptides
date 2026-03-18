"use client";

import { useAuth } from "@/providers/auth";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/components/ui/LocaleLink";

export default function AccountDashboard() {
  const { user } = useAuth();
  const { t, locale } = useLocale();
  const d = t.account.dashboard;

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-white border border-oryn-grey/15 p-6">
        <h1 className="text-2xl font-bold tracking-tight mb-1">
          {d.welcome} {user?.firstName}
        </h1>
        <p className="text-xs text-oryn-black/40 font-plex">
          {d.subtitle}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/account/orders"
          className="bg-white border border-oryn-grey/15 p-5 hover:border-oryn-orange/30 transition-colors group"
        >
          <div className="w-10 h-10 bg-oryn-orange/5 flex items-center justify-center mb-3 group-hover:bg-oryn-orange transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="group-hover:stroke-white transition-colors">
              <path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <h3 className="text-sm font-bold mb-1">{d.yourOrders}</h3>
          <p className="text-[10px] text-oryn-black/40 font-plex">{d.yourOrdersDesc}</p>
        </Link>

        <Link
          href="/account/profile"
          className="bg-white border border-oryn-grey/15 p-5 hover:border-oryn-orange/30 transition-colors group"
        >
          <div className="w-10 h-10 bg-oryn-orange/5 flex items-center justify-center mb-3 group-hover:bg-oryn-orange transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="group-hover:stroke-white transition-colors">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h3 className="text-sm font-bold mb-1">{d.profileSettings}</h3>
          <p className="text-[10px] text-oryn-black/40 font-plex">{d.profileSettingsDesc}</p>
        </Link>

        <Link
          href="/products"
          className="bg-white border border-oryn-grey/15 p-5 hover:border-oryn-orange/30 transition-colors group"
        >
          <div className="w-10 h-10 bg-oryn-orange/5 flex items-center justify-center mb-3 group-hover:bg-oryn-orange transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5" className="group-hover:stroke-white transition-colors">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
          <h3 className="text-sm font-bold mb-1">{d.shopPeptides}</h3>
          <p className="text-[10px] text-oryn-black/40 font-plex">{d.shopPeptidesDesc}</p>
        </Link>
      </div>

      {/* Loyalty Points */}
      <div className="bg-gradient-to-r from-oryn-black to-oryn-black/90 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-oryn-orange flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold">{d.orynRewards}</h3>
              <p className="text-[10px] text-white/50 font-plex">{d.earnPoints}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-oryn-orange">
              {Math.floor((user?.totalEarnings || 0) * 10)}
            </p>
            <p className="text-[9px] font-mono text-white/40 tracking-[0.15em]">{d.points}</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/5 p-3 text-center">
            <p className="text-[9px] font-mono text-white/40 tracking-[0.1em] mb-1">{d.tier}</p>
            <p className="text-xs font-bold text-oryn-orange">{d.member}</p>
          </div>
          <div className="bg-white/5 p-3 text-center">
            <p className="text-[9px] font-mono text-white/40 tracking-[0.1em] mb-1">{d.nextReward}</p>
            <p className="text-xs font-bold">{d.nextRewardValue}</p>
          </div>
          <div className="bg-white/5 p-3 text-center">
            <p className="text-[9px] font-mono text-white/40 tracking-[0.1em] mb-1">{d.multiplier}</p>
            <p className="text-xs font-bold text-oryn-orange">{d.multiplierValue}</p>
          </div>
        </div>
      </div>

      {/* Referral Code */}
      {user?.referralCode && (
        <div className="bg-oryn-orange/5 border border-oryn-orange/15 p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="1.5">
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-sm font-bold">{d.inviteEarn}</h3>
            </div>
            <Link
              href="/account/referrals"
              className="text-[10px] font-mono text-oryn-orange tracking-[0.1em] hover:underline"
            >
              {d.viewDashboard} &rarr;
            </Link>
          </div>
          <p className="text-xs text-oryn-black/40 font-plex mb-3">
            {d.inviteDescription}
          </p>
          <div className="flex items-center gap-3 mb-4">
            <code className="px-4 py-2.5 bg-white border border-oryn-orange/20 text-lg font-mono font-bold text-oryn-orange tracking-[0.2em]">
              {user.referralCode}
            </code>
            <button
              onClick={() => navigator.clipboard.writeText(user.referralCode)}
              className="px-3 py-2.5 bg-oryn-orange text-white text-[10px] font-medium tracking-[0.1em] hover:bg-oryn-orange-dark transition-colors"
            >
              {d.copyCode}
            </button>
            <button
              onClick={() => {
                const link = `${window.location.origin}/${locale}/products?ref=${user.referralCode}`;
                navigator.clipboard.writeText(link);
              }}
              className="px-3 py-2.5 bg-oryn-black text-white text-[10px] font-medium tracking-[0.1em] hover:bg-oryn-black/80 transition-colors"
            >
              {d.copyLink}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono text-oryn-black/30">{d.share}</span>
            <button
              onClick={() => {
                const text = `Check out ORYN Peptides! Use my code ${user.referralCode}: ${window.location.origin}/${locale}/products?ref=${user.referralCode}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
              }}
              className="px-2 py-1 bg-[#25D366] text-white text-[8px] font-medium hover:bg-[#20b858] transition-colors"
            >
              WhatsApp
            </button>
            <button
              onClick={() => {
                const body = `Hi, check out ORYN Peptides — biotech lab with >99% purity research peptides.\n\nUse my referral code: ${user.referralCode}\n${window.location.origin}/${locale}/products?ref=${user.referralCode}`;
                window.open(`mailto:?subject=${encodeURIComponent("ORYN Peptides")}&body=${encodeURIComponent(body)}`, "_blank");
              }}
              className="px-2 py-1 bg-oryn-black text-white text-[8px] font-medium hover:bg-oryn-black/80 transition-colors"
            >
              Email
            </button>
          </div>
        </div>
      )}

      {/* Account Benefits */}
      <div className="bg-white border border-oryn-grey/15 p-6">
        <h3 className="text-[10px] font-mono text-oryn-orange tracking-[0.2em] mb-4">{d.accountBenefits}</h3>
        <div className="grid grid-cols-2 gap-4">
          {d.benefits.map((item) => (
            <div key={item.title} className="flex items-start gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FF6A1A" strokeWidth="2" className="shrink-0 mt-0.5">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs font-medium">{item.title}</p>
                <p className="text-[9px] text-oryn-black/40 font-plex">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
