export function MedicalDisclaimer() {
  return (
    <aside className="max-w-4xl mx-auto px-6 py-8" aria-label="Research disclaimer">
      <div className="border border-oryn-grey/20 bg-oryn-cream/50 p-5">
        <div className="flex items-start gap-3">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FF6A1A"
            strokeWidth="1.5"
            className="shrink-0 mt-0.5"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4m0 4h.01" />
          </svg>
          <p className="text-[10px] text-oryn-black/40 font-plex leading-relaxed">
            <strong className="text-oryn-black/60 font-bold">Research Use Disclaimer:</strong>{" "}
            ORYN products are sold strictly for in-vitro research and laboratory use only. They
            are not intended for human consumption, self-administration, or any clinical or
            therapeutic application. No statements on this website have been evaluated by any
            regulatory authority. Always consult qualified professionals before undertaking any
            research involving peptides.
          </p>
        </div>
      </div>
    </aside>
  );
}
