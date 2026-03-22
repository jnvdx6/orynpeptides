"use client";

import { useEffect, useState } from "react";

const ERROR_TEXT: Record<string, { title: string; desc: string; tryAgain: string; goHome: string }> = {
  en: { title: "Something went wrong", desc: "An unexpected error occurred. Please try again.", tryAgain: "TRY AGAIN", goHome: "GO HOME" },
  es: { title: "Algo salió mal", desc: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.", tryAgain: "REINTENTAR", goHome: "IR AL INICIO" },
  de: { title: "Etwas ist schiefgelaufen", desc: "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.", tryAgain: "ERNEUT VERSUCHEN", goHome: "ZUR STARTSEITE" },
  fr: { title: "Une erreur est survenue", desc: "Une erreur inattendue s'est produite. Veuillez réessayer.", tryAgain: "RÉESSAYER", goHome: "ACCUEIL" },
  it: { title: "Qualcosa è andato storto", desc: "Si è verificato un errore imprevisto. Riprova.", tryAgain: "RIPROVA", goHome: "VAI ALLA HOME" },
  pt: { title: "Algo correu mal", desc: "Ocorreu um erro inesperado. Por favor, tente novamente.", tryAgain: "TENTAR NOVAMENTE", goHome: "IR PARA INÍCIO" },
  nl: { title: "Er ging iets mis", desc: "Er is een onverwachte fout opgetreden. Probeer het opnieuw.", tryAgain: "OPNIEUW PROBEREN", goHome: "NAAR HOME" },
  pl: { title: "Coś poszło nie tak", desc: "Wystąpił nieoczekiwany błąd. Spróbuj ponownie.", tryAgain: "SPRÓBUJ PONOWNIE", goHome: "STRONA GŁÓWNA" },
};

function getLocaleFromPath(): string {
  if (typeof window === "undefined") return "en";
  const seg = window.location.pathname.split("/")[1];
  return seg && ERROR_TEXT[seg] ? seg : "en";
}

export default function LocaleError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    setLocale(getLocaleFromPath());
  }, []);

  // Suppress unused var warning
  useEffect(() => { void error; }, [error]);

  const text = ERROR_TEXT[locale] || ERROR_TEXT.en;

  return (
    <div className="pt-24 min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-red-50 flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5">
            <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold mb-3">{text.title}</h1>
        <p className="text-sm text-oryn-black/50 font-plex mb-6">
          {text.desc}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-3 bg-oryn-orange text-white text-xs font-medium tracking-[0.15em] hover:bg-oryn-orange-dark transition-colors"
          >
            {text.tryAgain}
          </button>
          <a
            href={`/${locale}`}
            className="px-6 py-3 border border-oryn-grey/30 text-xs font-medium tracking-[0.15em] hover:border-oryn-orange/30 hover:text-oryn-orange transition-colors"
          >
            {text.goHome}
          </a>
        </div>
        {error.digest && (
          <p className="mt-6 text-[9px] font-mono text-oryn-black/20">
            Error ID: {error.digest}
          </p>
        )}
      </div>
    </div>
  );
}
