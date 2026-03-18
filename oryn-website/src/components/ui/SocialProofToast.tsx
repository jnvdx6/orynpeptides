"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { products, productImages } from "@/data/products";
import { useLocale } from "@/i18n/LocaleContext";

// Simulated recent purchases for social proof
const CITIES = [
  "London", "Manchester", "Birmingham", "Edinburgh", "Glasgow",
  "Leeds", "Bristol", "Liverpool", "Brighton", "Oxford",
  "Cardiff", "Newcastle", "Cambridge", "York", "Sheffield",
  "Madrid", "Barcelona", "Sevilla", "Valencia", "Bilbao",
];

const FIRST_NAMES = [
  "James", "Oliver", "Emma", "Sophie", "William",
  "Daniel", "Charlotte", "Lucy", "Thomas", "Harry",
  "Carlos", "Maria", "Pablo", "Laura", "Alejandro",
];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function SocialProofToast() {
  const [show, setShow] = useState(false);
  const { t } = useLocale();
  const sp = t.socialProof;
  const [data, setData] = useState<{
    name: string;
    city: string;
    product: (typeof products)[0];
    mins: number;
  } | null>(null);

  useEffect(() => {
    // Show first toast after 15-30 seconds
    const initialDelay = 15000 + Math.random() * 15000;

    const showToast = () => {
      const product = getRandomItem(products);
      setData({
        name: getRandomItem(FIRST_NAMES),
        city: getRandomItem(CITIES),
        product,
        mins: Math.floor(Math.random() * 45) + 2,
      });
      setShow(true);

      // Hide after 5 seconds
      setTimeout(() => setShow(false), 5000);
    };

    const timer = setTimeout(() => {
      showToast();
      // Show subsequent toasts every 30-60 seconds
      const interval = setInterval(showToast, 30000 + Math.random() * 30000);
      return () => clearInterval(interval);
    }, initialDelay);

    return () => clearTimeout(timer);
  }, []);

  if (!show || !data) return null;

  return (
    <div className="fixed bottom-4 left-4 z-30 animate-slide-in-left hidden lg:block pointer-events-none">
      <div className="bg-white/95 backdrop-blur-sm border border-oryn-grey/20 shadow-lg p-3 flex items-center gap-3 max-w-[260px] pointer-events-auto">
        <div className="w-10 h-10 bg-oryn-cream flex items-center justify-center shrink-0">
          <Image
            src={productImages.bySlug[data.product.slug] || "/images/products/peptide-pen-black.png"}
            alt={data.product.name}
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <div className="min-w-0">
          <p className="text-[10px] text-oryn-black/70 font-plex leading-tight">
            <strong>{data.name}</strong> {sp.from} {data.city} {sp.purchased}{" "}
            <strong className="text-oryn-orange">{data.product.name}</strong>
          </p>
          <p className="text-[9px] text-oryn-black/30 font-mono mt-0.5">
            {sp.minAgo.replace("{min}", String(data.mins))}
          </p>
        </div>
        <button
          onClick={() => setShow(false)}
          className="shrink-0 p-2 -m-1.5 text-oryn-black/20 hover:text-oryn-black/50 transition-colors"
          aria-label={t.aria.close}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
