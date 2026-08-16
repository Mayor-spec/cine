import React from 'react';
import { CompetitivePositioning } from '../../types';
import {
  Trophy,
  Sparkles,
  Target,
  ShieldCheck,
  Zap,
  CheckCircle2,
  XCircle,
  ArrowRight
} from 'lucide-react';

interface CompetitivePositioningViewProps {
  positioning: CompetitivePositioning;
}

export const CompetitivePositioningView: React.FC<CompetitivePositioningViewProps> = ({
  positioning,
}) => {
  return (
    <div className="space-y-6" id="competitive-positioning-section">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-black border border-[#D6A84F]/40 shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D6A84F]">
            <Trophy className="w-4 h-4" />
            <span>Market Edge & Distinctive Moat</span>
          </div>
          <h2 className="text-2xl font-bold text-white font-serif tracking-tight">
            Why This Project Can Win
          </h2>
          <p className="text-sm font-semibold text-[#D6A84F] max-w-3xl italic">
            &ldquo;{positioning.tagline}&rdquo;
          </p>
          <p className="text-xs text-zinc-300 max-w-3xl leading-relaxed pt-1">
            {positioning.whyCanWinHeadline}
          </p>
        </div>
      </div>

      {/* 3 Unique Advantages */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#D6A84F]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Core Strategic Moats
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {positioning.uniqueAdvantages.map((adv, idx) => (
            <div
              key={idx}
              className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-[#D6A84F]/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#D6A84F]/15 border border-[#D6A84F]/40 flex items-center justify-center text-xs font-bold text-[#D6A84F] font-mono mb-3">
                  0{idx + 1}
                </div>
                <h4 className="font-bold text-white text-sm mb-2 leading-snug">
                  {adv.title}
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {adv.description}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
                  Marketplace Advantage
                </span>
                <p className="text-xs text-zinc-200 font-medium">
                  {adv.marketEdge}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competing Matrix Table */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-[#D6A84F]" />
          <h3 className="text-sm font-bold uppercase tracking-wider text-white">
            Competitive Comparison vs. Standard Offerings
          </h3>
        </div>

        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60">
          <div className="grid grid-cols-1 md:grid-cols-12 bg-black/80 text-xs font-bold text-zinc-400 uppercase tracking-wider p-4 border-b border-zinc-800">
            <div className="md:col-span-3">Strategic Dimension</div>
            <div className="md:col-span-4 mt-2 md:mt-0 text-zinc-400">Standard Competing Titles</div>
            <div className="md:col-span-5 mt-2 md:mt-0 text-[#D6A84F]">This Project&apos;s Decisive Edge</div>
          </div>

          <div className="divide-y divide-zinc-800/70">
            {positioning.competingComparison.map((comp, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-12 p-4 text-xs gap-3 hover:bg-zinc-850 transition-colors items-center"
              >
                <div className="md:col-span-3 font-semibold text-white flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
                  <span>{comp.dimension}</span>
                </div>

                <div className="md:col-span-4 text-zinc-400 flex items-start gap-2 bg-black/30 p-2.5 rounded-lg border border-zinc-850">
                  <XCircle className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                  <span>{comp.standardProjects}</span>
                </div>

                <div className="md:col-span-5 text-zinc-200 font-medium flex items-start gap-2 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-900/40">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{comp.thisProjectEdge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
