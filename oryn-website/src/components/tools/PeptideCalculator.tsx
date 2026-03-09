"use client";

import { useState, useMemo, useCallback } from "react";

/* ─── Presets ──────────────────────────────────────────────────────── */
const PEPTIDE_PRESETS = [5, 10, 15, 30] as const;
const WATER_PRESETS = [1, 2, 3] as const;

/* ─── Syringe SVG ──────────────────────────────────────────────────── */
function SyringeVisual({
  fillPercent,
  volumeMl,
  units,
}: {
  fillPercent: number;
  volumeMl: number;
  units: number;
}) {
  const clampedFill = Math.min(Math.max(fillPercent, 0), 100);
  const markings = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[10px] font-mono text-white/40 tracking-[0.15em] uppercase">
        Insulin Syringe (100 units = 1 mL)
      </p>
      <div className="relative w-full max-w-xs mx-auto">
        {/* Syringe body */}
        <div className="relative h-[280px] w-16 mx-auto">
          {/* Outer barrel */}
          <div className="absolute inset-0 border-2 border-white/20 rounded-t-sm rounded-b-none bg-white/5">
            {/* Fill level */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-oryn-orange/30 border-t-2 border-oryn-orange transition-all duration-500 ease-out"
              style={{ height: `${clampedFill}%` }}
            />
            {/* Graduation marks */}
            {markings.map((mark) => (
              <div
                key={mark}
                className="absolute left-0 right-0 flex items-center"
                style={{ bottom: `${mark}%` }}
              >
                <div
                  className={`h-px ${mark % 50 === 0 ? "w-full bg-white/30" : mark % 10 === 0 ? "w-3/4 bg-white/15" : "w-1/2 bg-white/10"}`}
                />
                {mark % 20 === 0 && (
                  <span className="absolute -right-10 text-[9px] font-mono text-white/50">
                    {mark}
                  </span>
                )}
              </div>
            ))}
          </div>
          {/* Needle */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full w-px h-10 bg-white/30" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[calc(100%+40px)] w-0 h-0 border-l border-r border-l-transparent border-r-transparent border-t-[6px] border-t-white/30" />
        </div>
      </div>

      {/* Readout */}
      <div className="text-center mt-2 space-y-1">
        <p className="text-2xl font-bold text-oryn-orange font-mono">
          {units > 0 && units < 1000
            ? `${units.toFixed(1)} units`
            : units >= 1000
              ? "> 100 units"
              : "0 units"}
        </p>
        <p className="text-sm text-white/50 font-plex">
          {volumeMl > 0 && volumeMl <= 1
            ? `${volumeMl.toFixed(3)} mL`
            : volumeMl > 1
              ? "> 1.0 mL (use larger syringe)"
              : "0.000 mL"}
        </p>
      </div>
    </div>
  );
}

/* ─── Main Calculator ──────────────────────────────────────────────── */
export function PeptideCalculator() {
  const [peptideAmountMg, setPeptideAmountMg] = useState<number>(10);
  const [waterVolumeMl, setWaterVolumeMl] = useState<number>(2);
  const [desiredDoseMcg, setDesiredDoseMcg] = useState<number>(250);

  const results = useMemo(() => {
    if (peptideAmountMg <= 0 || waterVolumeMl <= 0 || desiredDoseMcg <= 0) {
      return null;
    }

    const peptideAmountMcg = peptideAmountMg * 1000;
    const concentrationMcgPerMl = peptideAmountMcg / waterVolumeMl;
    const injectionVolumeMl = desiredDoseMcg / concentrationMcgPerMl;
    const insulinUnits = injectionVolumeMl * 100;
    const totalDoses = peptideAmountMcg / desiredDoseMcg;

    return {
      concentrationMcgPerMl,
      injectionVolumeMl,
      insulinUnits,
      totalDoses,
      fillPercent: Math.min((injectionVolumeMl / 1) * 100, 100),
    };
  }, [peptideAmountMg, waterVolumeMl, desiredDoseMcg]);

  const handleNumberInput = useCallback(
    (setter: (v: number) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      setter(isNaN(val) ? 0 : val);
    },
    []
  );

  return (
    <div className="bg-oryn-grey-dark border border-white/10 rounded-sm overflow-hidden">
      {/* Header */}
      <div className="bg-oryn-black border-b border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-[2px] bg-oryn-orange" />
          <span className="text-[10px] font-mono text-oryn-orange tracking-[0.25em]">
            INTERACTIVE TOOL
          </span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Peptide Reconstitution Calculator
        </h2>
        <p className="text-sm text-white/50 font-plex mt-2">
          Enter your peptide amount, water volume and desired dose to calculate
          concentration and injection volume.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-0">
        {/* ─── Inputs ──────────────────────────────────── */}
        <div className="p-6 md:p-8 space-y-8 border-b lg:border-b-0 lg:border-r border-white/10">
          {/* Peptide Amount */}
          <div>
            <label className="block text-[10px] font-mono text-white/60 tracking-[0.15em] uppercase mb-3">
              Peptide Amount
            </label>
            <div className="flex gap-2 mb-3 flex-wrap">
              {PEPTIDE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setPeptideAmountMg(preset)}
                  className={`px-4 py-2 text-sm font-mono border transition-all ${
                    peptideAmountMg === preset
                      ? "bg-oryn-orange text-white border-oryn-orange"
                      : "bg-transparent text-white/60 border-white/15 hover:border-oryn-orange/50 hover:text-white"
                  }`}
                >
                  {preset} mg
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="number"
                value={peptideAmountMg || ""}
                onChange={handleNumberInput(setPeptideAmountMg)}
                placeholder="Custom amount"
                min={0}
                step={0.5}
                className="w-full bg-oryn-black border border-white/15 text-white px-4 py-3 font-mono text-lg focus:outline-none focus:border-oryn-orange transition-colors placeholder:text-white/20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-mono text-sm">
                mg
              </span>
            </div>
          </div>

          {/* Water Volume */}
          <div>
            <label className="block text-[10px] font-mono text-white/60 tracking-[0.15em] uppercase mb-3">
              Bacteriostatic Water Volume
            </label>
            <div className="flex gap-2 mb-3 flex-wrap">
              {WATER_PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setWaterVolumeMl(preset)}
                  className={`px-4 py-2 text-sm font-mono border transition-all ${
                    waterVolumeMl === preset
                      ? "bg-oryn-orange text-white border-oryn-orange"
                      : "bg-transparent text-white/60 border-white/15 hover:border-oryn-orange/50 hover:text-white"
                  }`}
                >
                  {preset} mL
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="number"
                value={waterVolumeMl || ""}
                onChange={handleNumberInput(setWaterVolumeMl)}
                placeholder="Custom volume"
                min={0}
                step={0.5}
                className="w-full bg-oryn-black border border-white/15 text-white px-4 py-3 font-mono text-lg focus:outline-none focus:border-oryn-orange transition-colors placeholder:text-white/20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-mono text-sm">
                mL
              </span>
            </div>
          </div>

          {/* Desired Dose */}
          <div>
            <label className="block text-[10px] font-mono text-white/60 tracking-[0.15em] uppercase mb-3">
              Desired Dose Per Injection
            </label>
            <div className="flex gap-2 mb-3 flex-wrap">
              {[100, 200, 250, 300, 500].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setDesiredDoseMcg(preset)}
                  className={`px-3 py-2 text-sm font-mono border transition-all ${
                    desiredDoseMcg === preset
                      ? "bg-oryn-orange text-white border-oryn-orange"
                      : "bg-transparent text-white/60 border-white/15 hover:border-oryn-orange/50 hover:text-white"
                  }`}
                >
                  {preset} mcg
                </button>
              ))}
            </div>
            <div className="relative">
              <input
                type="number"
                value={desiredDoseMcg || ""}
                onChange={handleNumberInput(setDesiredDoseMcg)}
                placeholder="Custom dose"
                min={0}
                step={10}
                className="w-full bg-oryn-black border border-white/15 text-white px-4 py-3 font-mono text-lg focus:outline-none focus:border-oryn-orange transition-colors placeholder:text-white/20"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 font-mono text-sm">
                mcg
              </span>
            </div>
          </div>
        </div>

        {/* ─── Results ─────────────────────────────────── */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          {results ? (
            <div className="space-y-6">
              {/* Results grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-oryn-black/60 border border-white/10 p-4">
                  <p className="text-[9px] font-mono text-white/40 tracking-[0.15em] uppercase mb-1">
                    Concentration
                  </p>
                  <p className="text-xl font-bold text-white font-mono">
                    {results.concentrationMcgPerMl.toLocaleString("en", {
                      maximumFractionDigits: 1,
                    })}
                  </p>
                  <p className="text-[10px] text-white/30 font-mono">mcg / mL</p>
                </div>

                <div className="bg-oryn-black/60 border border-white/10 p-4">
                  <p className="text-[9px] font-mono text-white/40 tracking-[0.15em] uppercase mb-1">
                    Injection Volume
                  </p>
                  <p className="text-xl font-bold text-oryn-orange font-mono">
                    {results.injectionVolumeMl < 10
                      ? results.injectionVolumeMl.toFixed(3)
                      : "> 10"}
                  </p>
                  <p className="text-[10px] text-white/30 font-mono">mL per dose</p>
                </div>

                <div className="bg-oryn-black/60 border border-white/10 p-4">
                  <p className="text-[9px] font-mono text-white/40 tracking-[0.15em] uppercase mb-1">
                    Insulin Syringe
                  </p>
                  <p className="text-xl font-bold text-white font-mono">
                    {results.insulinUnits < 1000
                      ? results.insulinUnits.toFixed(1)
                      : "> 1000"}
                  </p>
                  <p className="text-[10px] text-white/30 font-mono">units (IU marks)</p>
                </div>

                <div className="bg-oryn-black/60 border border-white/10 p-4">
                  <p className="text-[9px] font-mono text-white/40 tracking-[0.15em] uppercase mb-1">
                    Total Doses
                  </p>
                  <p className="text-xl font-bold text-white font-mono">
                    {results.totalDoses < 10000
                      ? Math.floor(results.totalDoses)
                      : "> 10k"}
                  </p>
                  <p className="text-[10px] text-white/30 font-mono">
                    from vial
                  </p>
                </div>
              </div>

              {/* Syringe visual */}
              <SyringeVisual
                fillPercent={results.fillPercent}
                volumeMl={results.injectionVolumeMl}
                units={results.insulinUnits}
              />

              {/* Warning */}
              {results.insulinUnits > 100 && (
                <div className="bg-yellow-900/20 border border-yellow-500/30 p-4">
                  <p className="text-xs text-yellow-400 font-plex">
                    <strong>Note:</strong> The calculated dose exceeds a standard
                    100-unit insulin syringe (1 mL). Consider adding more
                    bacteriostatic water to increase the volume, which will lower
                    the concentration and reduce the injection volume per dose.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px]">
              <p className="text-white/30 font-plex text-sm text-center">
                Enter valid values above to see your calculated results.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick reference */}
      <div className="border-t border-white/10 p-6 md:p-8 bg-oryn-black/40">
        <p className="text-[10px] font-mono text-white/40 tracking-[0.15em] uppercase mb-4">
          Quick Reference
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm font-plex text-white/60">
          <div>
            <p className="text-white/80 font-semibold mb-1">Unit Conversions</p>
            <p>1 mg = 1,000 mcg</p>
            <p>1 mL = 100 insulin units</p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">Standard Syringe</p>
            <p>U-100 insulin syringe</p>
            <p>100 units = 1.0 mL</p>
          </div>
          <div>
            <p className="text-white/80 font-semibold mb-1">The Formula</p>
            <p>Dose (mcg) / Concentration (mcg/mL)</p>
            <p>= Volume to inject (mL)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
