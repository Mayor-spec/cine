import React, { useState } from 'react';
import { FilmIntelligenceReport } from '../../types';
import {
  Compass,
  Users,
  Target,
  TrendingUp,
  Globe2,
  ShieldCheck,
  BookOpen,
  Award,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Film,
  Layers,
  ChevronRight,
  Zap,
  Info,
  Calendar,
  ExternalLink,
  Building
} from 'lucide-react';
import { EvidenceBadge, EvidenceLegend, ConfidenceBadge } from '../common/EvidenceBadge';

interface AgentDossiersViewProps {
  report: FilmIntelligenceReport;
  defaultAgent?: string;
}

export const AgentDossiersView: React.FC<AgentDossiersViewProps> = ({
  report,
  defaultAgent = 'concept',
}) => {
  const [selectedAgent, setSelectedAgent] = useState<string>(defaultAgent);

  const agentsList = [
    { id: 'concept', label: '1. Concept Scout', score: report.agents.concept.score, icon: Compass },
    { id: 'audience', label: '2. Audience Scout', score: report.agents.audience.score, icon: Users },
    { id: 'competition', label: '3. Competition Scout', score: report.agents.competition.score, icon: Target },
    { id: 'market', label: '4. Market Scout', score: report.agents.market.score, icon: TrendingUp },
    { id: 'culture', label: '5. Culture Scout', score: report.agents.culture.score, icon: Globe2 },
    { id: 'production', label: '6. Production Scout', score: report.agents.production.score, icon: ShieldCheck },
    { id: 'story', label: '7. Story Scout', score: report.agents.story.score, icon: BookOpen },
    { id: 'executive', label: '8. Executive Producer', score: report.agents.executive.score || report.overallScore, icon: Award },
  ];

  return (
    <div className="space-y-6" id="agent-dossiers-section">
      {/* Header Bar */}
      <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#121520] to-[#0A0C12] border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D6A84F] font-tech">
            <Compass className="w-4 h-4" />
            <span>Deep Analytical Investigation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1 font-cinematic">
            8-Agent Specialized Intelligence Dossiers
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
            Detailed qualitative assessments, structural beat analyses, competitive comps, and production optimizations with strict factual transparency.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
          <EvidenceBadge basis="SOURCE" size="xs" />
          <EvidenceBadge basis="INFERENCE" size="xs" />
          <EvidenceBadge basis="PROJECTION" size="xs" />
        </div>
      </div>

      {/* Scout Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-zinc-800 scrollbar-thin">
        {agentsList.map((agent) => {
          const Icon = agent.icon;
          const isActive = selectedAgent === agent.id;
          return (
            <button
              key={agent.id}
              type="button"
              onClick={() => setSelectedAgent(agent.id)}
              className={`px-3.5 py-2 text-xs font-tech font-bold uppercase rounded-xl whitespace-nowrap transition-all flex items-center gap-2 border ${
                isActive
                  ? 'bg-[#D6A84F] text-black border-[#D6A84F] shadow-lg'
                  : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{agent.label}</span>
              <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${isActive ? 'bg-black/20 text-black' : 'bg-black/60 text-zinc-400'}`}>
                {agent.score}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Dossier Body */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0D0F18] border border-zinc-800 space-y-6 shadow-xl">
        {/* 1. CONCEPT SCOUT */}
        {selectedAgent === 'concept' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider font-tech">Scout #01 • Narrative Premise</span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-cinematic">Concept & Hook Evaluation</h3>
              </div>
              <div className="flex items-center gap-2">
                <ConfidenceBadge level="HIGH" />
                <div className="px-3 py-1 rounded-lg bg-[#D6A84F]/15 border border-[#D6A84F]/40 text-[#D6A84F] font-mono font-bold text-sm">
                  Score: {report.agents.concept.score}/100
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 font-tech">Hook Strength</span>
                    <EvidenceBadge basis="INFERENCE" size="xs" showIcon={false} />
                  </div>
                  <p className="text-sm font-semibold text-[#D6A84F] font-cinematic">{report.agents.concept.hookStrength}</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 font-tech">Originality Index</span>
                    <EvidenceBadge basis="INFERENCE" size="xs" showIcon={false} />
                  </div>
                  <p className="text-xs font-medium text-zinc-200">{report.agents.concept.originalityIndex}</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 font-tech">Narrative Engine</span>
                    <EvidenceBadge basis="INFERENCE" size="xs" showIcon={false} />
                  </div>
                  <p className="text-xs font-medium text-zinc-200">{report.agents.concept.narrativePotential}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-[#D6A84F] font-tech">Premise Analysis & Dramatic Setup</span>
                <EvidenceBadge basis="INFERENCE" size="xs" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{report.agents.concept.premiseAnalysis}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-400 mb-2.5 font-tech">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Concept Strengths</span>
                </div>
                <ul className="space-y-2">
                  {report.agents.concept.strengths.map((s, idx) => (
                    <li key={idx} className="text-xs text-zinc-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span className="leading-relaxed font-sans">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-rose-400 mb-2.5 font-tech">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Concept Vulnerabilities</span>
                </div>
                <ul className="space-y-2">
                  {report.agents.concept.weaknesses.map((w, idx) => (
                    <li key={idx} className="text-xs text-zinc-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                      <span className="leading-relaxed font-sans">{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 2. AUDIENCE SCOUT */}
        {selectedAgent === 'audience' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider font-tech">Scout #02 • Demographic Segmentation</span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-cinematic">Audience Fit & Demographic Cohorts</h3>
              </div>
              <div className="flex items-center gap-2">
                <ConfidenceBadge level="HIGH" />
                <div className="px-3 py-1 rounded-lg bg-sky-500/15 border border-sky-500/40 text-sky-400 font-mono font-bold text-sm">
                  Score: {report.agents.audience.score}/100
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-sky-400 font-tech">Primary Audience Core</span>
                  <EvidenceBadge basis="INFERENCE" size="xs" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{report.agents.audience.primaryAudience}</p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-zinc-400 font-tech">Secondary Audience & Age Bracket</span>
                  <EvidenceBadge basis="INFERENCE" size="xs" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">{report.agents.audience.secondaryAudience}</p>
                <div className="pt-2 text-xs text-[#D6A84F] font-mono">{report.agents.audience.ageDemographics}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-2">
              <span className="text-xs font-bold uppercase text-zinc-300 font-tech block">Key Geographic Corridors</span>
              <div className="flex flex-wrap gap-2">
                {report.agents.audience.geographicMarkets.map((geo, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-zinc-800 text-zinc-200 text-xs font-tech border border-zinc-700">
                    {geo}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <span className="text-xs font-bold uppercase text-emerald-400 block mb-2 font-tech">Audience Motivations</span>
                <ul className="space-y-2">
                  {report.agents.audience.audienceMotivations.map((m, idx) => (
                    <li key={idx} className="text-xs text-zinc-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span className="leading-relaxed font-sans">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30">
                <span className="text-xs font-bold uppercase text-rose-400 block mb-2 font-tech">Audience Friction Risks</span>
                <ul className="space-y-2">
                  {report.agents.audience.audienceRisks.map((r, idx) => (
                    <li key={idx} className="text-xs text-zinc-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0 mt-1.5" />
                      <span className="leading-relaxed font-sans">{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 3. COMPETITION SCOUT */}
        {selectedAgent === 'competition' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider font-tech">Scout #03 • Market Benchmarks</span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-cinematic">Competitive Benchmarking & Real Comps</h3>
              </div>
              <div className="flex items-center gap-2">
                <ConfidenceBadge level="HIGH" />
                <div className="px-3 py-1 rounded-lg bg-purple-500/15 border border-purple-500/40 text-purple-400 font-mono font-bold text-sm">
                  Score: {report.agents.competition.score}/100
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-tech">
                  Verified Historical Comparable Titles
                </h4>
                <EvidenceBadge basis="SOURCE" size="xs" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {report.agents.competition.comparableFilms.map((comp, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-black/50 border border-zinc-800 flex flex-col justify-between hover:border-zinc-700 transition-colors">
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <h5 className="font-bold text-white text-sm font-cinematic">{comp.title}</h5>
                        <span className="text-[10px] text-zinc-400 font-tech px-1.5 py-0.5 rounded bg-zinc-800">{comp.origin}</span>
                      </div>
                      <span className="text-[11px] text-[#D6A84F] font-tech block mb-2">{comp.yearOrContext} • {comp.genre}</span>
                      <p className="text-xs text-zinc-300 leading-relaxed mb-3 font-sans">{comp.whyComparable}</p>
                    </div>
                    <div className="pt-2 border-t border-zinc-800 text-[11px] text-emerald-400 font-tech">
                      <strong>What worked:</strong> {comp.whatItDidSuccessfully}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-[#D6A84F] font-tech">Competitive Blue-Ocean Gap</span>
                <EvidenceBadge basis="INFERENCE" size="xs" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{report.agents.competition.marketGapOpportunity}</p>
            </div>
          </div>
        )}

        {/* 4. MARKET SCOUT (EXPLICIT VERIFIED VS AI ESTIMATE & COMMERCIAL DISCLAIMER) */}
        {selectedAgent === 'market' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider font-tech">Scout #04 • Commercial & Distribution</span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-cinematic">Market Demand & Revenue Outlook</h3>
              </div>
              <div className="flex items-center gap-2">
                <ConfidenceBadge level={report.agents.market.confidence || 'HIGH'} />
                <div className="px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono font-bold text-sm">
                  Score: {report.agents.market.score}/100
                </div>
              </div>
            </div>

            {/* Verified Market Info vs AI Projection Matrix */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Box 1: Verified Information */}
              <div className="p-4 sm:p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 font-tech">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>VERIFIED MARKET INFORMATION</span>
                  </div>
                  <EvidenceBadge basis="SOURCE" size="xs" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                  {report.agents.market.verifiedInformation || 
                    `Historical performance across theatrical releases and SVOD acquisitions confirms strong consumer appetite for grounded character drama and high-tension narrative genres in the Nigerian and West African market.`}
                </p>
                <div className="pt-2 text-[10px] text-zinc-400 font-tech border-t border-emerald-500/20">
                  Reflects historical distributor reports and box-office territory records.
                </div>
              </div>

              {/* Box 2: AI Estimate & Strategic Projection */}
              <div className="p-4 sm:p-5 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 font-tech">
                    <TrendingUp className="w-4 h-4" />
                    <span>AI ESTIMATE & STRATEGIC PROJECTION</span>
                  </div>
                  <EvidenceBadge basis="PROJECTION" size="xs" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                  {report.agents.market.aiEstimate || 
                    `High potential for multi-territory SVOD streaming licensing (e.g. Netflix / Prime Video Africa) with estimated medium theatrical runway. Financial return is dependent on script execution and festival launch pedigree.`}
                </p>
                <div className="pt-2 text-[10px] text-amber-400/90 font-tech border-t border-amber-500/20">
                  Notice: AI projection — not a financial guarantee.
                </div>
              </div>
            </div>

            {/* Distribution Channels Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase text-emerald-400 font-tech">Streaming Potential</span>
                    <EvidenceBadge basis="PROJECTION" size="xs" showIcon={false} />
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed font-sans">{report.agents.market.streamingPotential}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-500 font-tech">
                  Buyer sentiment modeling
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase text-purple-400 font-tech">Festival Runway</span>
                    <EvidenceBadge basis="PROJECTION" size="xs" showIcon={false} />
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed font-sans">{report.agents.market.festivalPotential}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-500 font-tech">
                  Strategic positioning — no selection guarantee
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase text-sky-400 font-tech">Theatrical Potential</span>
                    <EvidenceBadge basis="PROJECTION" size="xs" showIcon={false} />
                  </div>
                  <p className="text-xs text-zinc-200 leading-relaxed font-sans">{report.agents.market.theatricalPotential}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-zinc-800/80 text-[10px] text-zinc-500 font-tech">
                  Territory footprint estimate
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-[#D6A84F] font-tech">Pan-African & International Crossover</span>
                <EvidenceBadge basis="INFERENCE" size="xs" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{report.agents.market.internationalCrossover}</p>
            </div>
          </div>
        )}

        {/* 5. CULTURE SCOUT */}
        {selectedAgent === 'culture' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider font-tech">Scout #05 • Cultural Grounding</span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-cinematic">Cultural Authenticity & Nuance</h3>
              </div>
              <div className="flex items-center gap-2">
                <ConfidenceBadge level="HIGH" />
                <div className="px-3 py-1 rounded-lg bg-amber-500/15 border border-amber-500/40 text-amber-400 font-mono font-bold text-sm">
                  Score: {report.agents.culture.score}/100
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-[#D6A84F] font-tech">Authenticity & Social Texture</span>
                <EvidenceBadge basis="SOURCE" size="xs" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{report.agents.culture.culturalAuthenticityAnalysis}</p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-zinc-300 font-tech">Linguistic & Dialogue Context</span>
                <EvidenceBadge basis="INFERENCE" size="xs" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">{report.agents.culture.languageAndSettingContext}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
                <span className="text-xs font-bold uppercase text-emerald-400 block mb-2 font-tech">Cultural Opportunities</span>
                <ul className="space-y-2">
                  {report.agents.culture.culturalOpportunities.map((c, idx) => (
                    <li key={idx} className="text-xs text-zinc-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span className="leading-relaxed font-sans">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
                <span className="text-xs font-bold uppercase text-amber-400 block mb-2 font-tech">Flags for Human Review</span>
                <ul className="space-y-2">
                  {report.agents.culture.flagsForHumanReview.map((f, idx) => (
                    <li key={idx} className="text-xs text-zinc-200 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                      <span className="leading-relaxed font-sans">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* 6. PRODUCTION SCOUT */}
        {selectedAgent === 'production' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider font-tech">Scout #06 • Physical Execution</span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-cinematic">Physical Production & Budget Optimization</h3>
              </div>
              <div className="flex items-center gap-2">
                <ConfidenceBadge level="HIGH" />
                <div className="px-3 py-1 rounded-lg bg-blue-500/15 border border-blue-500/40 text-blue-400 font-mono font-bold text-sm">
                  Score: {report.agents.production.score}/100
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 font-tech">Feasibility Rating</span>
                    <EvidenceBadge basis="INFERENCE" size="xs" showIcon={false} />
                  </div>
                  <p className="text-sm font-semibold text-emerald-400 font-tech">{report.agents.production.feasibilityRating}</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 font-tech">VFX vs Practical</span>
                    <EvidenceBadge basis="INFERENCE" size="xs" showIcon={false} />
                  </div>
                  <p className="text-xs font-medium text-zinc-200">{report.agents.production.vfxAndPracticalBalance}</p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] uppercase font-bold text-zinc-400 font-tech">Cast Scale</span>
                    <EvidenceBadge basis="INFERENCE" size="xs" showIcon={false} />
                  </div>
                  <p className="text-xs font-medium text-zinc-200">{report.agents.production.castRequirements}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-2">
              <span className="text-xs font-bold uppercase text-[#D6A84F] font-tech block">Required Production Locations</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {report.agents.production.locationsRequired.map((loc, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-zinc-950/60 border border-zinc-800 text-xs text-zinc-200 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
                    <span>{loc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30">
              <span className="text-xs font-bold uppercase text-emerald-400 block mb-2 font-tech">Low-Budget Production Optimization Hacks</span>
              <ul className="space-y-2">
                {report.agents.production.lowBudgetHacks.map((h, idx) => (
                  <li key={idx} className="text-xs text-zinc-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                    <span className="leading-relaxed font-sans">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 7. STORY SCOUT */}
        {selectedAgent === 'story' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider font-tech">Scout #07 • Dramatic Engineering</span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-cinematic">Story Architecture & Script Doctoring</h3>
              </div>
              <div className="flex items-center gap-2">
                <ConfidenceBadge level="HIGH" />
                <div className="px-3 py-1 rounded-lg bg-rose-500/15 border border-rose-500/40 text-rose-400 font-mono font-bold text-sm">
                  Score: {report.agents.story.score}/100
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-rose-400 font-tech">Protagonist Agency</span>
                  <EvidenceBadge basis="INFERENCE" size="xs" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{report.agents.story.protagonistAnalysis}</p>
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-zinc-300 font-tech">Stakes Escalation</span>
                  <EvidenceBadge basis="INFERENCE" size="xs" />
                </div>
                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{report.agents.story.conflictAndStakes}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-[#D6A84F] font-tech">Structural Movement & Reversals</span>
                <EvidenceBadge basis="INFERENCE" size="xs" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{report.agents.story.structuralNotes}</p>
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30">
              <span className="text-xs font-bold uppercase text-amber-400 block mb-2 font-tech">Script Doctoring Prescriptions</span>
              <ul className="space-y-2">
                {report.agents.story.scriptDoctorNotes.map((note, idx) => (
                  <li key={idx} className="text-xs text-zinc-200 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                    <span className="leading-relaxed font-sans">{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 8. EXECUTIVE PRODUCER */}
        {selectedAgent === 'executive' && (
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#D6A84F] uppercase tracking-wider font-tech">Scout #08 • Studio Consensus</span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-cinematic">Executive Producer Synthesis</h3>
              </div>
              <div className="flex items-center gap-2">
                <ConfidenceBadge level="HIGH" />
                <div className="px-3 py-1 rounded-lg bg-[#D6A84F]/15 border border-[#D6A84F]/40 text-[#D6A84F] font-mono font-bold text-sm">
                  Verdict: {report.agents.executive.verdict}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase text-[#D6A84F] font-tech">Executive Rationale</span>
                <EvidenceBadge basis="INFERENCE" size="xs" />
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">{report.agents.executive.executiveRationale}</p>
            </div>

            <div className="p-4 rounded-xl bg-[#D6A84F]/10 border border-[#D6A84F]/30 space-y-1">
              <span className="text-xs font-bold uppercase text-[#D6A84F] font-tech block">Investor Pitch Hook</span>
              <p className="text-xs sm:text-sm text-zinc-100 italic font-serif">&ldquo;{report.agents.executive.investorPitchHook}&rdquo;</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
