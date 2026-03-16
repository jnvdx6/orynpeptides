"use client";

import Link from "next/link";
import { useLocale } from "@/i18n/LocaleContext";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({
  items,
  locale,
}: {
  items: BreadcrumbItem[];
  locale: string;
}) {
  const { t } = useLocale();
  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <nav
        aria-label={t.aria.breadcrumb}
        className="flex items-center gap-2 text-[10px] font-mono text-oryn-black/30 tracking-[0.1em]"
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-oryn-orange">/</span>}
              {isLast || !item.href ? (
                <span className="text-oryn-orange">
                  {item.label.toUpperCase()}
                </span>
              ) : (
                <Link
                  href={item.href.startsWith("/") ? `/${locale}${item.href}` : item.href}
                  className="hover:text-oryn-orange transition-colors"
                >
                  {item.label.toUpperCase()}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
