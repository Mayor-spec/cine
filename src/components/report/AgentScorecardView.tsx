import React from 'react';
import { AgentScorecardItem } from '../../types';
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
  ArrowUpRight,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface AgentScorecardViewProps {
  scorecards: AgentScorecardItem[];
  onSelectAgentDossier?: (agentId: string) => void;
}

const getAgentIcon = (id: string) => {
  switch (id) {
    case 'concept':
      return <Compass className="w-5 h-5 text-amber-400" />;
    case 'audience':
      return <Users className="w-5 h-5 text-sky-400" />;
    case 'competition':
      return <Target className="w-5 h-5 text-purple-400" />;
    case 'market':
      return <TrendingUp className="w-5 h-5 text-emerald-400" />;
    case 'culture':
      return <Globe2 className="w-5 h-5 text-amber-300" />;
    case 'production':
      return <ShieldCheck className="w-5 h-5 text-blue-400" />;
    case 'story':
      return <BookOpen className="w-5 h-5 text-rose-400" />;
    case 'executive':
      return <Award className="w-5 h-5 text-yellow-400" />;
    default:
      return <Sparkles className="w-5 h-5 text-amber-400" />;
  }
};

const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
  if (score >= 75) return 'text-[#D6A84F] border-[#D6A84F]/40 bg-[#D6A84F]/10';
  if (score >= 60) return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
  return 'text-rose-400 border-rose-500/40 bg-rose-500/10';
};

const getProgressBarColor = (score: number) => {
  if (score >= 85) return 'bg-gradient-to-r from-emerald-500 to-emerald-400';
  if (score >= 75) return 'bg-gradient-to-r from-[#D6A84F] to-amber-300';
  if (score >= 60) return 'bg-gradient-to-r from-amber-500 to-amber-400';
  return 'bg-gradient-to-r from-rose-500 to-rose-400';
};

export const AgentScorecardView: React.FC<AgentScorecardViewProps> = ({
  scorecards,
  onSelectAgentDossier,
}) => {
  const averageScore = Math.round(
    scorecards.reduce((acc, curr) => acc + curr.score, 0) / (scorecards.length || 1)
  );

  return (
    <div className="space-y-6" id="agent-scorecard-section">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-sm">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D6A84F]">
            <Sparkles className="w-4 h-4" />
            <span>8-Agent Collective Assessment</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 font-serif">
            Film Industry Agent Scorecard
          </h2>
          <p className="text-sm text-zinc-400 mt-0.5">
            Individual quantitative ratings, analytical reasoning, key findings, and critical concerns from 8 specialized scouts.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-center px-4 py-2.5 rounded-lg bg-black/60 border border-zinc-700/80">
          <span className="text-xs text-zinc-400 uppercase tracking-wider">Scout Mean</span>
          <span className="text-2xl font-bold text-[#D6A84F] font-mono">{averageScore}</span>
          <span className="text-xs text-zinc-500">/100</span>
        </div>
      </div>

      {/* Grid of 8 Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {scorecards.map((agent) => {
          const scoreBadgeClass = getScoreColor(agent.score);
          const progressClass = getProgressBarColor(agent.score);

          return (
            <div
              key={agent.id}
              className="flex flex-col justify-between p-5 rounded-xl bg-zinc-900/70 border border-zinc-800/90 hover:border-[#D6A84F]/40 transition-all duration-200 group relative overflow-hidden"
            >
              {/* Top Row: Icon + Role + Score */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-black/50 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                      {getAgentIcon(agent.id)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm group-hover:text-[#D6A84F] transition-colors leading-tight">
                        {agent.name}
                      </h3>
                      <p className="text-[11px] text-zinc-400 line-clamp-1">{agent.role}</p>
                    </div>
                  </div>

                  <div
                    className={`px-2.5 py-1 rounded-md border font-mono font-bold text-xs flex items-baseline gap-0.5 shrink-0 ${scoreBadgeClass}`}
                  >
                    <span>{agent.score}</span>
                    <span className="text-[10px] opacity-70">/100</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-zinc-950 rounded-full h-1.5 mb-4 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${progressClass}`}
                    style={{ width: `${agent.score}%` }}
                  />
                </div>

                {/* Reasoning */}
                <p className="text-xs text-zinc-300 leading-relaxed mb-4 italic">
                  &ldquo;{agent.shortReasoning}&rdquo;
                </p>

                {/* Strongest Finding */}
                <div className="p-2.5 rounded-lg bg-black/40 border border-emerald-900/30 mb-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Strongest Finding</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-snug">
                    {agent.strongestFinding}
                  </p>
                </div>

                {/* Biggest Concern */}
                <div className="p-2.5 rounded-lg bg-black/40 border border-rose-900/30 mb-2.5">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-rose-400 mb-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Biggest Concern</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-snug">
                    {agent.biggestConcern}
                  </p>
                </div>

                {/* Specialist Recommendation */}
                {agent.recommendation && (
                  <div className="p-2.5 rounded-lg bg-black/40 border border-[#D6A84F]/30">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#D6A84F] mb-1 font-tech">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>Specialist Recommendation</span>
                    </div>
                    <p className="text-xs text-zinc-200 leading-snug font-sans">
                      {agent.recommendation}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Quick Jump Action */}
              {onSelectAgentDossier && (
                <button
                  type="button"
                  onClick={() => onSelectAgentDossier(agent.id)}
                  className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[11px] text-zinc-400 hover:text-[#D6A84F] transition-colors w-full"
                >
                  <span>View Full Dossier</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
