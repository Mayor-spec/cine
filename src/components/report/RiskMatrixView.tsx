import React, { useState } from 'react';
import { ProfessionalRiskItem, RiskCategoryType, SeverityLevel } from '../../types';
import {
  ShieldAlert,
  AlertTriangle,
  AlertCircle,
  CheckCircle2,
  Filter,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

interface RiskMatrixViewProps {
  risks: ProfessionalRiskItem[];
}

const getSeverityBadge = (severity: SeverityLevel) => {
  switch (severity) {
    case 'CRITICAL':
      return {
        badge: 'bg-rose-500/25 text-rose-300 border-rose-500/60',
        dot: 'bg-rose-500 animate-pulse',
      };
    case 'HIGH':
      return {
        badge: 'bg-rose-500/15 text-rose-400 border-rose-500/40',
        dot: 'bg-rose-400',
      };
    case 'MEDIUM':
      return {
        badge: 'bg-[#D6A84F]/15 text-[#D6A84F] border-[#D6A84F]/40',
        dot: 'bg-[#D6A84F]',
      };
    case 'LOW':
      return {
        badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
        dot: 'bg-emerald-400',
      };
    default:
      return {
        badge: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        dot: 'bg-zinc-400',
      };
  }
};

export const RiskMatrixView: React.FC<RiskMatrixViewProps> = ({ risks }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    'ALL',
    'Story risk',
    'Production risk',
    'Market risk',
    'Audience risk',
    'Cultural authenticity risk',
    'Technical/VFX risk',
    'Distribution risk',
  ];

  const filteredRisks = selectedCategory === 'ALL'
    ? risks
    : risks.filter((r) => r.category.toLowerCase().includes(selectedCategory.toLowerCase().replace(' risk', '')));

  const criticalOrHighCount = risks.filter(
    (r) => r.severity === 'CRITICAL' || r.severity === 'HIGH'
  ).length;

  return (
    <div className="space-y-6" id="risk-matrix-section">
      {/* Header Bar */}
      <div className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-rose-400">
            <ShieldAlert className="w-4 h-4" />
            <span>Studio Production Safeguard</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 font-serif">
            Professional Film Risk Matrix
          </h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            Systematic vulnerability audit across 7 critical film development dimensions with actionable preventative mitigations.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center px-4 py-2.5 rounded-lg bg-black/60 border border-zinc-800 shrink-0">
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-semibold">Total Audited</span>
            <span className="text-lg font-bold text-white font-mono">{risks.length}</span>
          </div>
          <div className="w-px h-6 bg-zinc-800" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] text-rose-400 uppercase tracking-widest font-semibold">High Priority</span>
            <span className="text-lg font-bold text-rose-400 font-mono">{criticalOrHighCount}</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 p-2 rounded-xl bg-black/50 border border-zinc-800">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#D6A84F] text-black font-semibold shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat === 'ALL' ? 'All Risks (7 Domains)' : cat}
            </button>
          );
        })}
      </div>

      {/* Risk Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRisks.map((risk, idx) => {
          const severityInfo = getSeverityBadge(risk.severity);

          return (
            <div
              key={risk.id || idx}
              className="p-5 rounded-xl bg-zinc-900/70 border border-zinc-800 hover:border-zinc-700 transition-all duration-200"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                {/* Left Section: Category, Title, Explanation */}
                <div className="flex-1 space-y-2.5">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-bold text-[#D6A84F] uppercase tracking-wider">
                      {risk.category}
                    </span>

                    <div
                      className={`px-2.5 py-0.5 rounded-md border text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 ${severityInfo.badge}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${severityInfo.dot}`} />
                      <span>{risk.severity} Severity</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white leading-tight">
                    {risk.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {risk.explanation}
                  </p>

                  {/* Mitigation Box */}
                  <div className="p-3.5 rounded-lg bg-emerald-950/20 border border-emerald-500/30 mt-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Actionable Mitigation Strategy</span>
                    </div>
                    <p className="text-xs text-zinc-200 font-medium leading-relaxed">
                      {risk.mitigation}
                    </p>
                  </div>
                </div>

                {/* Right Section: Probability & Impact Pill */}
                <div className="flex lg:flex-col items-center lg:items-end justify-between lg:justify-center p-3 rounded-xl bg-black/60 border border-zinc-800 shrink-0 gap-3">
                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Probability</span>
                    <span className="text-xs font-bold text-white font-mono">{risk.probability}</span>
                  </div>

                  <div className="w-px h-6 bg-zinc-800 lg:hidden" />

                  <div className="text-left lg:text-right">
                    <span className="text-[10px] uppercase font-semibold text-zinc-400 block">Impact</span>
                    <span className="text-xs font-bold text-white font-mono">{risk.impact}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
