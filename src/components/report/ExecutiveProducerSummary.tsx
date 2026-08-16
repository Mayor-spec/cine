import React, { useState } from 'react';
import { ExecutiveProducerSummaryView, VerdictType, EvidenceBasedRecommendation, VerdictReasonItem } from '../../types';
import {
  Award,
  TrendingUp,
  Film,
  Users,
  AlertTriangle,
  Sparkles,
  Zap,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Flame,
  Target,
  ChevronDown,
  ChevronUp,
  FileText,
  Layers,
  ExternalLink,
  ShieldCheck,
  Info
} from 'lucide-react';
import { EvidenceBadge, EvidenceLegend, ConfidenceBadge } from '../common/EvidenceBadge';

interface ExecutiveProducerSummaryProps {
  executiveView: ExecutiveProducerSummaryView;
  projectTitle: string;
  evidenceList?: EvidenceBasedRecommendation[];
  onNavigateToEvidence?: () => void;
  onCreatePitchPack?: () => void;
}

const getVerdictBadgeStyle = (verdict: VerdictType) => {
  switch (verdict) {
    case 'GREENLIGHT':
      return {
        bg: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40 shadow-emerald-950/40',
        dot: 'bg-emerald-400 shadow-emerald-400/50',
        label: 'GREENLIGHT',
        sublead: 'HIGH-PRIORITY PRODUCTION ASSET READY FOR PACKAGING & FINANCING',
        tagline: 'High Commercial & Festival Viability',
      };
    case 'DEVELOP':
      return {
        bg: 'bg-[#D6A84F]/15 text-[#D6A84F] border-[#D6A84F]/40 shadow-amber-950/40',
        dot: 'bg-[#D6A84F] shadow-[#D6A84F]/50',
        label: 'DEVELOP',
        sublead: 'HIGH-PRIORITY DEVELOPMENT ASSET WITH COMMERCIAL BREAKTHROUGH POTENTIAL',
        tagline: 'High Commercial & Festival Viability with Targeted Revisions',
      };
    case 'REWORK':
    case 'REVISE':
      return {
        bg: 'bg-amber-500/15 text-amber-400 border-amber-500/40 shadow-amber-950/40',
        dot: 'bg-amber-400 shadow-amber-400/50',
        label: verdict === 'REVISE' ? 'REVISE' : 'REWORK',
        sublead: 'COMPELLING CORE PREMISE REQUIRING STRUCTURAL SCRIPT REALIGNMENT',
        tagline: 'Moderate Viability — Narrative & Pacing Adjustments Prescribed',
      };
    case 'PASS':
      return {
        bg: 'bg-rose-500/15 text-rose-400 border-rose-500/40 shadow-rose-950/40',
        dot: 'bg-rose-400 shadow-rose-400/50',
        label: 'PASS',
        sublead: 'ELEVATED MARKET RISK RELATIVE TO ESTIMATED PHYSICAL CAPITAL EXPOSURE',
        tagline: 'High Risk Profile Relative to Current Buyer Sentiment',
      };
    default:
      return {
        bg: 'bg-zinc-800 text-zinc-300 border-zinc-700',
        dot: 'bg-zinc-400',
        label: 'REVIEW',
        sublead: 'ASSESSMENT SYNTHESIS IN PROGRESS',
        tagline: 'Assessment In Progress',
      };
  }
};

export const ExecutiveProducerSummary: React.FC<ExecutiveProducerSummaryProps> = ({
  executiveView,
  projectTitle,
  evidenceList = [],
  onNavigateToEvidence,
  onCreatePitchPack,
}) => {
  const verdictStyle = getVerdictBadgeStyle(executiveView.verdict);
  const score = executiveView.overallScore || 80;
  const [isAudienceExpanded, setIsAudienceExpanded] = useState(false);
  const [isEvidencePanelOpen, setIsEvidencePanelOpen] = useState(false);

  // SVG circular gauge parameters (smooth 100 scale)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, score)) / 100) * circumference;

  const coreQuestionCards = [
    {
      q: 'Is this worth making?',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
      answer: executiveView.coreAnswers.isWorthMaking,
      border: 'border-emerald-500/25',
      bg: 'bg-emerald-950/15',
      badge: 'Verdict Rationale',
    },
    {
      q: 'Why?',
      icon: <Sparkles className="w-4 h-4 text-[#D6A84F] shrink-0" />,
      answer: executiveView.coreAnswers.why,
      border: 'border-[#D6A84F]/25',
      bg: 'bg-[#D6A84F]/10',
      badge: 'Core Engine',
    },
    {
      q: 'What makes it commercially valuable?',
      icon: <TrendingUp className="w-4 h-4 text-sky-400 shrink-0" />,
      answer: executiveView.coreAnswers.whatMakesItCommerciallyValuable,
      border: 'border-sky-500/25',
      bg: 'bg-sky-950/15',
      badge: 'Commercial Thesis',
    },
    {
      q: 'What could kill the project?',
      icon: <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />,
      answer: executiveView.coreAnswers.whatCouldKillIt,
      border: 'border-rose-500/25',
      bg: 'bg-rose-950/15',
      badge: 'Critical Vulnerability',
    },
    {
      q: 'How can I improve it?',
      icon: <Zap className="w-4 h-4 text-amber-400 shrink-0" />,
      answer: executiveView.coreAnswers.howToImproveIt,
      border: 'border-amber-500/25',
      bg: 'bg-amber-950/15',
      badge: 'Strategic Intervention',
    },
    {
      q: 'What should I do next?',
      icon: <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />,
      answer: executiveView.coreAnswers.whatToDoNext,
      border: 'border-emerald-500/25',
      bg: 'bg-emerald-950/15',
      badge: 'Immediate Next Step',
    },
  ];

  // Normalized whyThisVerdict items with basis fallback
  const rawReasons = executiveView.whyThisVerdict || [];
  const normalizedReasons: VerdictReasonItem[] = rawReasons.map((item, idx) => {
    if (typeof item === 'string') {
      const lower = item.toLowerCase();
      const isWarn = lower.includes('require') || lower.includes('must') || lower.includes('risk') || lower.includes('concern');
      const isNegative = lower.includes('unresolved') || lower.includes('fatal') || lower.includes('cliché');
      const isSource = lower.includes('audience') || lower.includes('market') || lower.includes('box office') || lower.includes('established') || lower.includes('festival');
      return {
        type: isNegative ? 'negative' : isWarn ? 'warning' : 'positive',
        text: item,
        basis: isSource ? 'SOURCE' : 'INFERENCE',
      };
    }
    
    // If basis is missing, infer logically from content
    let basis = item.basis;
    if (!basis) {
      const lower = (item.text || '').toLowerCase();
      if (lower.includes('audience interest') || lower.includes('benchmark') || lower.includes('box office') || lower.includes('established market') || item.provenance === 'SOURCE-BACKED') {
        basis = 'SOURCE';
      } else if (lower.includes('projection') || lower.includes('forecast') || lower.includes('potential') || item.provenance === 'AI PROJECTION') {
        basis = 'PROJECTION';
      } else {
        basis = 'INFERENCE';
      }
    }

    return {
      ...item,
      basis,
    };
  });

  return (
    <div className="space-y-5 sm:space-y-6" id="executive-producer-view">
      {/* 1. HERO / VERDICT CENTERPIECE */}
      <div className="p-4 sm:p-6 lg:p-7 rounded-2xl bg-gradient-to-br from-[#131622] via-[#0E1018] to-[#08090D] border border-[#D6A84F]/30 shadow-2xl relative overflow-hidden">
        {/* Subtle background ambient lights */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
          {/* Left: Project Header & Verdict Synthesis */}
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-[11px] sm:text-xs font-tech font-semibold">
                <Award className="w-3.5 h-3.5" />
                <span>EXECUTIVE PRODUCER VERDICT</span>
              </div>
              <ConfidenceBadge level={executiveView.confidence || 'HIGH'} reason="Synthesized from multi-specialist evidence and structured inference" />
            </div>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-bold text-[#F1EDE4] font-cinematic tracking-tight leading-tight">
              {projectTitle}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              Holistic multi-agent intelligence evaluation synthesized from 8 specialized studio scouts. Balancing commercial distribution viability, artistic depth, and physical pre-production feasibility.
            </p>

            <div className="pt-0.5 flex items-center gap-2 text-xs font-tech text-[#D6A84F]">
              <span className="w-2 h-2 rounded-full bg-[#D6A84F] animate-pulse" />
              <span className="font-semibold tracking-wide text-[11px] sm:text-xs">{verdictStyle.tagline}</span>
            </div>
          </div>

          {/* Right: Circular Score Gauge & Studio Verdict Badge */}
          <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-6 bg-[#080A10]/95 p-3.5 sm:p-5 rounded-2xl border border-zinc-800 shadow-xl shrink-0">
            {/* Refined SVG Circular Gauge */}
            <div className="relative w-20 h-20 sm:w-26 sm:h-26 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
                <circle
                  cx="45"
                  cy="45"
                  r={radius}
                  stroke="#1C2030"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="45"
                  cy="45"
                  r={radius}
                  stroke="url(#verdictGoldGradient)"
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="verdictGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF4D0" />
                    <stop offset="50%" stopColor="#D6A84F" />
                    <stop offset="100%" stopColor="#B8852A" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Centered Score */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl sm:text-3xl font-bold text-[#F1EDE4] font-mono leading-none">
                  {score}
                </span>
                <span className="text-[9px] sm:text-[10px] text-[#D6A84F] font-tech font-semibold mt-0.5">
                  / 100
                </span>
              </div>
            </div>

            {/* Verdict Status Box */}
            <div className="flex flex-col justify-center space-y-1.5 pl-2.5 sm:pl-3 border-l border-zinc-800">
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-tech font-bold text-zinc-400">
                OFFICIAL VERDICT
              </span>
              <div
                className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-xl border font-tech font-bold text-xs sm:text-sm tracking-wider uppercase flex items-center gap-1.5 sm:gap-2 shadow-lg ${verdictStyle.bg}`}
              >
                <span className={`w-2 h-2 rounded-full animate-pulse ${verdictStyle.dot}`} />
                <span>VERDICT: {verdictStyle.label}</span>
              </div>
              <span className="text-[9px] sm:text-[10px] text-zinc-400 font-tech">
                8-Scout Consensus
              </span>
            </div>
          </div>
        </div>

        {/* 2. RESPONSIVE METRICS GRID (5 CARDS WITH FORECAST DISCLAIMERS) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mt-5 pt-4 border-t border-zinc-800/80">
          {/* Card 1: Development Score */}
          <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors">
            <span className="text-[10px] uppercase font-tech font-semibold tracking-wider text-zinc-400 block mb-1">
              Development Score
            </span>
            <div className="flex items-center gap-1.5 text-sm sm:text-base font-semibold text-[#D6A84F] font-mono">
              <Award className="w-3.5 h-3.5 text-[#D6A84F] shrink-0" />
              <span>{score} / 100</span>
            </div>
          </div>

          {/* Card 2: Commercial Potential */}
          <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] uppercase font-tech font-semibold tracking-wider text-zinc-400">
                  Commercial Outlook
                </span>
                <EvidenceBadge basis="PROJECTION" size="xs" showIcon={false} />
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-400 font-tech">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="leading-snug">{executiveView.commercialPotential}</span>
              </div>
            </div>
            <span className="text-[9px] text-zinc-500 font-tech mt-1.5 block">
              AI projection — not a financial guarantee
            </span>
          </div>

          {/* Card 3: Festival Viability */}
          <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] uppercase font-tech font-semibold tracking-wider text-zinc-400">
                  Festival Viability
                </span>
                <EvidenceBadge basis="PROJECTION" size="xs" showIcon={false} />
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-purple-400 font-tech">
                <Film className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span className="leading-snug">{executiveView.festivalPotential}</span>
              </div>
            </div>
            <span className="text-[9px] text-zinc-500 font-tech mt-1.5 block">
              Strategic recommendation — no selection guarantee
            </span>
          </div>

          {/* Card 4: Production Feasibility */}
          <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[10px] uppercase font-tech font-semibold tracking-wider text-zinc-400">
                  Production Feasibility
                </span>
                <EvidenceBadge basis="INFERENCE" size="xs" showIcon={false} />
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-sky-400 font-tech">
                <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="leading-snug">{executiveView.productionFeasibility}</span>
              </div>
            </div>
            <span className="text-[9px] text-zinc-500 font-tech mt-1.5 block">
              Based on provided scale & shooting constraints
            </span>
          </div>

          {/* Card 5: Audience Core */}
          <div className="p-3 rounded-xl bg-black/40 border border-zinc-800/80 hover:border-zinc-700 transition-colors col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-1">
            <span className="text-[10px] uppercase font-tech font-semibold tracking-wider text-zinc-400 block mb-1">
              Audience Core
            </span>
            <div className="flex items-start gap-1.5 text-xs font-semibold text-zinc-200 font-tech">
              <Users className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className={`text-xs text-zinc-200 leading-snug font-sans ${isAudienceExpanded ? '' : 'line-clamp-2'}`}>
                  {executiveView.audiencePotential}
                </p>
                {executiveView.audiencePotential && executiveView.audiencePotential.length > 60 && (
                  <button
                    type="button"
                    onClick={() => setIsAudienceExpanded(!isAudienceExpanded)}
                    className="text-[10px] text-[#D6A84F] hover:underline font-tech mt-0.5 inline-block"
                  >
                    {isAudienceExpanded ? 'View less' : 'View more'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. WHY THIS VERDICT? (Explainable Studio Consensus with Explicit Evidence Basis) */}
      <div className="p-5 sm:p-7 rounded-2xl bg-[#0B0D14] border border-[#D6A84F]/30 shadow-xl space-y-4" id="why-this-verdict-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/80">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#D6A84F]" />
              <h2 className="text-base sm:text-lg font-cinematic font-bold text-white tracking-wide">
                WHY THIS VERDICT?
              </h2>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5 font-sans">
              3–5 core analytical reasons synthesized across all 8 development perspectives with transparent claim classification.
            </p>
          </div>

          {/* Inline Micro Legend */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] text-zinc-500 uppercase font-tech font-semibold hidden sm:inline">Basis:</span>
            <div className="flex items-center gap-1.5">
              <EvidenceBadge basis="SOURCE" size="xs" />
              <EvidenceBadge basis="INFERENCE" size="xs" />
              <EvidenceBadge basis="PROJECTION" size="xs" />
            </div>
          </div>
        </div>

        {/* Reasons List */}
        <div className="space-y-2.5 pt-1">
          {normalizedReasons.length > 0 ? (
            normalizedReasons.map((item, idx) => {
              const isPositive = item.type === 'positive';
              const isNegative = item.type === 'negative';
              const isWarning = item.type === 'warning';

              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    isPositive
                      ? 'bg-emerald-950/15 border-emerald-500/30'
                      : isNegative
                      ? 'bg-rose-950/15 border-rose-500/30'
                      : 'bg-amber-950/15 border-amber-500/30'
                  }`}
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5 shrink-0">
                      {isPositive && (
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {isNegative && (
                        <div className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center justify-center">
                          <ShieldAlert className="w-3.5 h-3.5" />
                        </div>
                      )}
                      {isWarning && (
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                          <AlertTriangle className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm text-zinc-100 font-medium leading-relaxed font-sans">
                        {item.text}
                      </p>
                    </div>
                  </div>

                  {/* Basis Badge on the Right */}
                  <div className="self-end sm:self-center shrink-0 pl-8 sm:pl-0">
                    <EvidenceBadge basis={item.basis || 'INFERENCE'} size="xs" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl border bg-emerald-950/15 border-emerald-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p className="text-xs sm:text-sm text-zinc-200 font-sans">{executiveView.coreAnswers.why}</p>
                </div>
                <EvidenceBadge basis="INFERENCE" size="xs" />
              </div>
              <div className="p-3.5 rounded-xl border bg-amber-950/15 border-amber-500/30 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <p className="text-xs sm:text-sm text-zinc-200 font-sans">{executiveView.biggestRisk}</p>
                </div>
                <EvidenceBadge basis="INFERENCE" size="xs" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 4. COLLAPSIBLE EVIDENCE & SOURCES DRAWER */}
      <div className="rounded-2xl bg-[#0C0E17] border border-zinc-800/90 shadow-xl overflow-hidden" id="evidence-collapsible-panel">
        <button
          type="button"
          onClick={() => setIsEvidencePanelOpen(!isEvidencePanelOpen)}
          className="w-full p-4 sm:p-5 flex items-center justify-between gap-3 text-left hover:bg-zinc-900/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#D6A84F]/10 border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white font-cinematic">
                  EVIDENCE & SOURCES
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 font-tech">
                  {evidenceList.length > 0 ? `${evidenceList.length} Items` : 'Transparency Layer'}
                </span>
              </div>
              <p className="text-xs text-zinc-400 mt-0.5">
                Verified external benchmarks, structural AI deductions, and forward projections.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-tech text-[#D6A84F] shrink-0">
            <span>{isEvidencePanelOpen ? 'Collapse Evidence' : 'Expand Evidence'}</span>
            {isEvidencePanelOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isEvidencePanelOpen && (
          <div className="p-4 sm:p-6 border-t border-zinc-800/80 space-y-4 bg-black/40">
            {/* Standard Legend */}
            <EvidenceLegend />

            {/* Evidence Items */}
            <div className="space-y-3 pt-2">
              {evidenceList.length > 0 ? (
                evidenceList.map((item, idx) => {
                  const hasSource = item.sourceDetails && item.sourceDetails.sourceTitle;

                  return (
                    <div
                      key={item.id || idx}
                      className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-2.5 hover:border-zinc-700 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider font-tech">
                            {item.category}
                          </span>
                          <h4 className="text-xs sm:text-sm font-bold text-white">{item.title}</h4>
                        </div>
                        <EvidenceBadge basis={item.basis || item.provenance} size="xs" />
                      </div>

                      <p className="text-xs text-zinc-200 leading-relaxed font-sans">{item.evidence}</p>

                      {/* Source details if source-backed */}
                      {hasSource ? (
                        <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/25 text-[11px] font-tech text-zinc-300 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-emerald-400 font-bold uppercase tracking-wide text-[10px]">
                              Source Title:
                            </span>
                            <span className="text-white font-medium">{item.sourceDetails?.sourceTitle}</span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-zinc-400 text-[10px]">
                            {item.sourceDetails?.organization && (
                              <span>Org: <strong className="text-zinc-300">{item.sourceDetails.organization}</strong></span>
                            )}
                            {item.sourceDetails?.sourceType && (
                              <span>Type: <strong className="text-zinc-300">{item.sourceDetails.sourceType}</strong></span>
                            )}
                            {item.sourceDetails?.date && (
                              <span>Date: <strong className="text-zinc-300">{item.sourceDetails.date}</strong></span>
                            )}
                            {item.sourceDetails?.url && (
                              <a
                                href={item.sourceDetails.url}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="text-[#D6A84F] hover:underline flex items-center gap-1"
                              >
                                <span>Reference link</span>
                                <ExternalLink className="w-2.5 h-2.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="text-[10px] font-tech text-zinc-500 flex items-center gap-1.5">
                          <Info className="w-3 h-3 text-sky-400" />
                          <span>No external database query cited — deduced via structured CineScout analytical inference.</span>
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-6 text-xs text-zinc-400 font-tech">
                  Detailed evidence items mapped in the dedicated Evidence Analysis tab.
                </div>
              )}
            </div>

            {onNavigateToEvidence && (
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={onNavigateToEvidence}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-tech font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <span>Open Full Evidence Matrix</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 5. EXECUTIVE PRODUCER EDITORIAL ASSESSMENT CARD */}
      <div className="p-5 sm:p-7 rounded-2xl bg-[#0D0F17] border border-zinc-800 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84F] font-tech">
          <FileText className="w-4 h-4" />
          <span>EXECUTIVE PRODUCER ASSESSMENT</span>
        </div>

        <div>
          <h2 className="text-base sm:text-lg font-cinematic font-bold text-[#F1EDE4] tracking-wide leading-snug">
            {verdictStyle.sublead}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-2.5 leading-relaxed font-sans">
            {executiveView.coreAnswers.isWorthMaking} {executiveView.coreAnswers.why}
          </p>
        </div>

        {/* OPPORTUNITY / RISK / ACTION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
          {/* Subtle Emerald: Biggest Opportunity */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 font-tech">
              <Flame className="w-3.5 h-3.5" />
              <span>BIGGEST OPPORTUNITY</span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed font-sans">
              {executiveView.biggestOpportunity}
            </p>
          </div>

          {/* Subtle Crimson: Biggest Threat */}
          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 mb-1.5 font-tech">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>BIGGEST THREAT</span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed font-sans">
              {executiveView.biggestRisk}
            </p>
          </div>

          {/* Subtle Gold: Immediate Next Action */}
          <div className="p-4 rounded-xl bg-[#D6A84F]/10 border border-[#D6A84F]/30">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84F] mb-1.5 font-tech">
              <Zap className="w-3.5 h-3.5" />
              <span>#1 IMMEDIATE ACTION</span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed font-sans">
              {executiveView.immediateNextAction}
            </p>
          </div>
        </div>

        {/* Executive Pitch Pack Launcher Callout */}
        {onCreatePitchPack && (
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#171B2A] via-[#10131F] to-[#0A0D15] border border-[#D6A84F]/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-[#D6A84F]">
                <Sparkles className="w-4 h-4 text-[#D6A84F]" />
                <span>EXECUTIVE PRESENTATION READY</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 font-sans">
                Convert this complete {score}/100 development intelligence dossier into a concise executive pitch pack for producers, financiers, distributors, and festival selectors.
              </p>
            </div>
            <button
              type="button"
              onClick={onCreatePitchPack}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#E5B75E] via-[#D6A84F] to-[#B8852A] hover:brightness-110 text-[#08090D] font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#D6A84F]/25 transition-all font-tech uppercase tracking-wider shrink-0"
            >
              <FileText className="w-4 h-4 stroke-[2.5]" />
              <span>CREATE PITCH PACK</span>
            </button>
          </div>
        )}
      </div>

      {/* 6. FILMMAKER CORE INQUIRIES SECTION */}
      <div className="space-y-4 pt-1">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#D6A84F]" />
            <h2 className="text-base sm:text-lg font-bold text-white font-cinematic">
              Filmmaker Core Inquiries
            </h2>
          </div>
          <span className="text-[11px] sm:text-xs text-zinc-400 font-tech">
            Key strategic questions for executive packaging & script development
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {coreQuestionCards.map((card, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-xl border ${card.border} ${card.bg} flex flex-col justify-between transition-all duration-200 hover:border-opacity-60 shadow-sm`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {card.icon}
                    <h3 className="font-semibold text-white text-xs sm:text-sm">
                      {card.q}
                    </h3>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-tech uppercase tracking-wider text-zinc-400 shrink-0 px-1.5 py-0.5 rounded bg-black/40 border border-zinc-800">
                    {card.badge}
                  </span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed mt-1">
                  {card.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



