import React from 'react';
import { ConfidenceAnalysis } from '../../types';
import {
  ShieldCheck,
  AlertTriangle,
  Info,
  Scale,
  Sparkles,
  CheckCircle2,
  Lock,
  FileSpreadsheet,
  AlertOctagon,
  Eye
} from 'lucide-react';
import { EvidenceLegend } from '../common/EvidenceBadge';

interface ConfidenceEthicsViewProps {
  confidence: ConfidenceAnalysis;
}

export const ConfidenceEthicsView: React.FC<ConfidenceEthicsViewProps> = ({
  confidence,
}) => {
  return (
    <div className="space-y-6" id="confidence-ethics-section">
      {/* Header Bar */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#121520] to-[#0A0C12] border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D6A84F] font-tech">
            <Scale className="w-4 h-4" />
            <span>AI GOVERNANCE & TRANSPARENCY PROTOCOL</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 font-cinematic">
            Confidence Assessment & AI Disclosure
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-3xl leading-relaxed">
            CineScout operates under strict ethical disclosure guidelines. AI inferences and market projections are rigorously separated from verified institutional evidence.
          </p>
        </div>

        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-black/70 border border-zinc-800 shrink-0 self-start sm:self-center">
          <div className="flex flex-col text-right">
            <span className="text-[10px] text-zinc-400 uppercase font-tech font-semibold">Model Confidence</span>
            <span className="text-xs text-zinc-500 font-tech">Structural Integrity</span>
          </div>
          <span className="text-2xl font-bold text-emerald-400 font-mono">{confidence.confidenceScore}%</span>
        </div>
      </div>

      {/* 3-Tier Evidence Taxonomy Legend */}
      <EvidenceLegend />

      {/* Core Reasoning & Boundaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Reasoning & Boundaries */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0D0F17] border border-zinc-800/90 space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 mb-1.5 font-tech">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ASSESSMENT REASONING & ANALYTICAL BOUNDARIES</span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
              {confidence.reasoning}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-1 font-tech">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Inferences vs. Real-World Execution Notice</span>
            </div>
            <p className="text-xs text-zinc-200 leading-relaxed font-sans">
              {confidence.inferencesVsFactsNotice}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-zinc-800 text-xs text-zinc-400 space-y-2">
            <div className="flex items-center gap-1.5 text-zinc-200 font-tech font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>ANTI-FABRICATION SAFEGUARD</span>
            </div>
            <p className="leading-relaxed">
              CineScout strictly forbids generative hallucination of unverified box-office gross numbers, distributor guarantees, or festival acceptance metrics. Where empirical data is unindexed, the analysis defaults to conservative logical inference.
            </p>
          </div>
        </div>

        {/* Human Review Gates */}
        <div className="p-5 sm:p-6 rounded-2xl bg-[#0D0F17] border border-zinc-800/90 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 font-tech">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>MANDATORY PRE-PRODUCTION HUMAN REVIEWS</span>
            </div>

            <ul className="space-y-2.5">
              {confidence.humanReviewRecommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-black/40 border border-zinc-800/80 text-xs text-zinc-200">
                  <span className="w-5 h-5 rounded-lg bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/30 flex items-center justify-center text-[10px] font-bold font-mono shrink-0 mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="leading-relaxed">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-[11px] text-zinc-400 flex items-start gap-2.5 font-sans">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>
              <strong>Professional Disclaimer:</strong> CineScout AI reports are strategic advisory syntheses for development and packaging. They do not constitute binding financial, legal, clearance, or talent representation counsel.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

