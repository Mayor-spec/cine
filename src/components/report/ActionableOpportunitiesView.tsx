import React, { useState } from 'react';
import { ActionableOpportunity, PriorityLevel } from '../../types';
import {
  Sparkles,
  TrendingUp,
  ArrowRight,
  Zap,
  Target,
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

interface ActionableOpportunitiesViewProps {
  opportunities: ActionableOpportunity[];
}

const getPriorityStyle = (priority: PriorityLevel) => {
  switch (priority) {
    case 'HIGH':
      return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
    case 'MEDIUM':
      return 'bg-[#D6A84F]/20 text-[#D6A84F] border-[#D6A84F]/40';
    case 'LOW':
      return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    default:
      return 'bg-zinc-800 text-zinc-300 border-zinc-700';
  }
};

export const ActionableOpportunitiesView: React.FC<ActionableOpportunitiesViewProps> = ({
  opportunities,
}) => {
  return (
    <div className="space-y-6" id="actionable-opportunities-section">
      {/* Header Bar */}
      <div className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D6A84F]">
            <Sparkles className="w-4 h-4" />
            <span>Commercial & Creative Catalysts</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 font-serif">
            Actionable Strategic Opportunities
          </h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            Turn passive project observations into concrete value-creating moves with explicit rationales, action steps, expected impact, and priority weighting.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-black/60 border border-zinc-800 shrink-0 self-start sm:self-center">
          <Target className="w-4 h-4 text-[#D6A84F]" />
          <span className="text-xs text-zinc-300 font-semibold">{opportunities.length} High-Impact Catalysts</span>
        </div>
      </div>

      {/* Grid of Actionable Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {opportunities.map((opp, idx) => (
          <div
            key={opp.id || idx}
            className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-[#D6A84F]/40 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Header: Category & Priority */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold text-[#D6A84F] uppercase tracking-wider">
                  {opp.category}
                </span>

                <div
                  className={`px-2.5 py-1 rounded-md border text-[11px] font-bold uppercase tracking-wider ${getPriorityStyle(
                    opp.priority
                  )}`}
                >
                  {opp.priority} Priority
                </div>
              </div>

              {/* Title & Core Opportunity Statement */}
              <h3 className="text-base font-bold text-white mb-2 leading-snug">
                {opp.title}
              </h3>
              <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                {opp.opportunity}
              </p>

              {/* Action Blueprint: Why -> Action -> Impact */}
              <div className="space-y-2.5 pt-4 border-t border-zinc-800/80">
                {/* 1. Why it matters */}
                <div className="p-3 rounded-lg bg-black/40 border border-zinc-800">
                  <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block mb-1">
                    Why It Matters
                  </span>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {opp.whyItMatters}
                  </p>
                </div>

                {/* 2. Recommended Action */}
                <div className="p-3 rounded-lg bg-[#D6A84F]/10 border border-[#D6A84F]/30">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#D6A84F] tracking-wider mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span>Prescribed Action</span>
                  </div>
                  <p className="text-xs text-zinc-100 font-medium leading-relaxed">
                    {opp.recommendedAction}
                  </p>
                </div>

                {/* 3. Expected Impact */}
                <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/30">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-emerald-400 tracking-wider mb-1">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Expected Financial / Audience Impact</span>
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed">
                    {opp.expectedImpact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
