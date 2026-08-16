import React from 'react';
import { DevelopmentRoadmapStep } from '../../types';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Target,
  ArrowRight,
  Sparkles,
  FileCheck,
  Flag
} from 'lucide-react';

interface FilmmakerRoadmapViewProps {
  roadmap: DevelopmentRoadmapStep[];
}

export const FilmmakerRoadmapView: React.FC<FilmmakerRoadmapViewProps> = ({
  roadmap,
}) => {
  return (
    <div className="space-y-6" id="filmmaker-action-plan-section">
      {/* Header Bar */}
      <div className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D6A84F]">
            <Calendar className="w-4 h-4" />
            <span>Development To Principal Photography</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 font-serif">
            Filmmaker Action Plan & Roadmap
          </h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            A battle-tested 7-phase execution roadmap from script polish to festival submission runway.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black/60 border border-zinc-800 shrink-0 self-start sm:self-center">
          <Flag className="w-4 h-4 text-[#D6A84F]" />
          <span className="text-xs text-zinc-300 font-semibold">7 Sequential Milestones</span>
        </div>
      </div>

      {/* 7-Step Timeline Cards */}
      <div className="relative border-l-2 border-zinc-800 ml-4 sm:ml-6 space-y-6 pl-6 sm:pl-8 py-2">
        {roadmap.map((step) => (
          <div key={step.step} className="relative group">
            {/* Timeline Step Node */}
            <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-black border-2 border-[#D6A84F] flex items-center justify-center text-xs font-bold font-mono text-[#D6A84F] group-hover:bg-[#D6A84F] group-hover:text-black transition-colors shadow-lg">
              0{step.step}
            </div>

            {/* Step Card */}
            <div className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-[#D6A84F]/40 transition-all duration-200 space-y-3">
              {/* Header: Phase Name + Timeframe */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-800/80">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D6A84F]">
                    Phase 0{step.step}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">
                    {step.phaseName}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-black/60 border border-zinc-800 text-xs font-mono font-semibold text-zinc-300 self-start sm:self-center">
                  <Clock className="w-3.5 h-3.5 text-[#D6A84F]" />
                  <span>{step.timeframe}</span>
                </div>
              </div>

              {/* Core Objective */}
              <div className="p-3 rounded-lg bg-black/40 border border-zinc-850">
                <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                  Core Objective
                </span>
                <p className="text-xs text-zinc-200 leading-relaxed">
                  {step.coreObjective}
                </p>
              </div>

              {/* Two columns: Deliverables + Success Metric */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Deliverables */}
                <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-zinc-300 mb-2">
                    <FileCheck className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Key Deliverables</span>
                  </div>
                  <ul className="space-y-1.5">
                    {step.keyDeliverables.map((deliv, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Success Metric */}
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                      <Target className="w-3.5 h-3.5" />
                      <span>Success Metric / Exit Gate</span>
                    </div>
                    <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                      {step.successMetric}
                    </p>
                  </div>
                  <div className="text-[10px] text-emerald-400/80 mt-2 font-mono">
                    ✓ Gate verified before next phase
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
