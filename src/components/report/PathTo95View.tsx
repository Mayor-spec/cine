import React from 'react';
import { PathTo95Item } from '../../types';
import {
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface PathTo95ViewProps {
  items: PathTo95Item[];
  currentScore: number;
}

export const PathTo95View: React.FC<PathTo95ViewProps> = ({
  items,
  currentScore,
}) => {
  const totalImpact = items.reduce((acc, curr) => acc + curr.estimatedScoreImpact, 0);
  const projectedScore = Math.min(95, currentScore + totalImpact);

  return (
    <div className="space-y-6" id="path-to-95-section">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-900 border border-[#D6A84F]/40 shadow-xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-10 right-0 w-72 h-72 bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#D6A84F] mb-1">
              <Target className="w-4 h-4" />
              <span>Strategic Optimization Engine</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-serif tracking-tight">
              Path to 95 / 100
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Targeted high-leverage interventions in screenplay mechanics, pacing, and production containment designed to elevate your project to tier-1 festival and buyer tier.
            </p>
          </div>

          <div className="flex items-center gap-4 self-start sm:self-center p-3.5 rounded-xl bg-black/70 border border-zinc-700/80 shrink-0">
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Current</span>
              <span className="text-2xl font-bold text-zinc-300 font-mono">{currentScore}</span>
            </div>

            <div className="flex items-center text-[#D6A84F]">
              <ArrowRight className="w-5 h-5" />
            </div>

            <div className="flex flex-col items-center">
              <span className="text-[10px] text-[#D6A84F] uppercase tracking-widest font-semibold">Projected</span>
              <span className="text-2xl font-bold text-[#D6A84F] font-mono">{projectedScore}</span>
            </div>

            <div className="pl-3 border-l border-zinc-700/80 flex flex-col items-center">
              <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">Gain</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">+{totalImpact}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Intervention Cards */}
      <div className="grid grid-cols-1 gap-4">
        {items.map((item, idx) => (
          <div
            key={item.id || idx}
            className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-[#D6A84F]/40 transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              {/* Left Column: Number + Weakness + Recommended Change */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#D6A84F]/15 border border-[#D6A84F]/40 flex items-center justify-center text-xs font-bold text-[#D6A84F] font-mono shrink-0">
                    0{idx + 1}
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-400">Current Friction</span>
                    <h4 className="text-sm font-semibold text-zinc-200">
                      {item.currentWeakness}
                    </h4>
                  </div>
                </div>

                {/* Recommended Change */}
                <div className="p-3.5 rounded-lg bg-black/40 border border-[#D6A84F]/30 ml-0 md:ml-10">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84F] mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Prescribed Strategic Polish</span>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {item.recommendedChange}
                  </p>
                </div>

                {/* Why It Matters */}
                <div className="flex items-start gap-2 text-xs text-zinc-400 ml-0 md:ml-10">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong className="text-zinc-300 font-medium">Why it matters:</strong> {item.whyItMatters}</span>
                </div>
              </div>

              {/* Right Column: Score Impact Pill */}
              <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center p-3 md:p-4 rounded-xl bg-black/60 border border-emerald-900/40 shrink-0">
                <span className="text-[10px] uppercase font-semibold text-zinc-400 tracking-wider">Score Upside</span>
                <div className="flex items-baseline gap-1 text-emerald-400 font-mono font-bold text-xl md:text-2xl mt-0.5">
                  <span>+{item.estimatedScoreImpact}</span>
                  <span className="text-xs font-normal text-emerald-500/80">pts</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
