import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Globe2,
  Users,
  Compass,
  FileCheck2,
  Film,
  ArrowRight,
  Target,
  CheckCircle2,
  ChevronRight,
  Layers
} from 'lucide-react';
import { FILM_PRESETS } from '../data/presets';

interface HeroLandingProps {
  onStart: () => void;
  onExploreDemo: () => void;
  onSelectPreset: (presetIndex: number) => void;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onStart,
  onExploreDemo,
  onSelectPreset,
}) => {
  const scouts = [
    { name: 'Concept Scout', role: 'Originality, Emotional Engine & Hook', icon: Compass, color: 'text-amber-400' },
    { name: 'Audience Scout', role: 'Demographics, Sub-Segments & Appeal', icon: Users, color: 'text-emerald-400' },
    { name: 'Competition Scout', role: 'Comparable Films & Blue-Ocean Gaps', icon: Layers, color: 'text-sky-400' },
    { name: 'Market Scout', role: 'Theatrical, Streaming & Festival Potential', icon: TrendingUp, color: 'text-purple-400' },
    { name: 'Culture Scout', role: 'African & Global Cultural Authenticity', icon: Globe2, color: 'text-rose-400' },
    { name: 'Production Scout', role: 'Feasibility, Logistics & Low-Budget Hacks', icon: ShieldCheck, color: 'text-yellow-400' },
    { name: 'Story Scout', role: '3-Act Structure, Stakes & Script Notes', icon: Film, color: 'text-cyan-400' },
    { name: 'Executive Producer', role: 'Greenlight Verdict & Financing Rationale', icon: Target, color: 'text-[#D6A84F]' },
  ];

  return (
    <div className="relative overflow-hidden film-grain">
      {/* Ambient background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#D6A84F]/10 via-[#D6A84F]/3 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 sm:pt-20 sm:pb-28 relative z-10">
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#171A24] border border-[#D6A84F]/30 shadow-inner mb-6 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#D6A84F] animate-ping" />
            <span className="text-xs font-tech font-semibold tracking-wider text-[#D6A84F] uppercase">
              Before you shoot, scout.
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#F1EDE4] mb-6 leading-tight">
            Investigate your film <br />
            <span className="gold-gradient-text">before you make it.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Turn an unproven story concept into an evidence-informed film strategy. 
            Simulate a high-level development room powered by <span className="text-[#D6A84F] font-medium">8 specialized AI scouts</span> to evaluate audience fit, market viability, cultural authenticity, and production economics.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14">
            <button
              id="hero-start-investigation-btn"
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#C2933C] hover:from-[#E5B75E] hover:to-[#D6A84F] text-[#08090D] font-tech font-bold text-base tracking-wide flex items-center justify-center gap-3 shadow-lg shadow-[#D6A84F]/20 hover:scale-[1.02] active:scale-[0.99] transition-all"
            >
              <span>Start an Investigation</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              id="hero-explore-demo-btn"
              onClick={onExploreDemo}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#11131A] hover:bg-[#171A24] text-[#F1EDE4] border border-[#D6A84F]/30 hover:border-[#D6A84F]/70 font-tech font-semibold text-base flex items-center justify-center gap-2.5 transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#D6A84F]" />
              <span>Explore Demo Dossier</span>
              <span className="text-xs px-2 py-0.5 rounded bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/30 font-normal">
                The Last Signal
              </span>
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-4 pb-8 border-y border-zinc-800/80">
            <div className="p-3 text-center">
              <div className="text-2xl font-tech font-bold text-[#F1EDE4]">8 Specialized</div>
              <div className="text-xs text-zinc-400 mt-0.5">AI Film Scouts</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl font-tech font-bold text-[#D6A84F]">Nollywood & Global</div>
              <div className="text-xs text-zinc-400 mt-0.5">Market & Cultural Lens</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl font-tech font-bold text-[#F1EDE4]">Evidence Plan</div>
              <div className="text-xs text-zinc-400 mt-0.5">Pre-Production Verification</div>
            </div>
            <div className="p-3 text-center">
              <div className="text-2xl font-tech font-bold text-emerald-400">Executive Verdict</div>
              <div className="text-xs text-zinc-400 mt-0.5">Financing Feasibility</div>
            </div>
          </div>
        </div>

        {/* 8 AI Scouts Command Grid */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-tech font-semibold text-[#D6A84F] uppercase tracking-widest">
                The Intelligence Council
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F1EDE4] mt-1 font-cinematic">
                8 Specialized Film Industry Agents
              </h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-md">
              Each scout investigates your premise from a distinct industry vantage point before the Executive Producer delivers the final verdict.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scouts.map((scout, i) => {
              const Icon = scout.icon;
              return (
                <div
                  key={scout.name}
                  className="p-5 rounded-xl glass-panel hover:border-[#D6A84F]/40 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#171A24] border border-zinc-700/60 flex items-center justify-center group-hover:border-[#D6A84F]/50 transition-colors">
                      <Icon className={`w-4 h-4 ${scout.color}`} />
                    </div>
                    <span className="text-[10px] font-tech text-zinc-500 uppercase tracking-wider">
                      Agent 0{i + 1}
                    </span>
                  </div>
                  <h3 className="font-tech text-base font-bold text-[#F1EDE4] group-hover:text-[#D6A84F] transition-colors">
                    {scout.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {scout.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* African & Nigerian Market Focus Card */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl glass-panel-glow border-[#D6A84F]/30 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-xs font-tech font-semibold mb-3">
                <Globe2 className="w-3.5 h-3.5" />
                <span>Specialized African & Global Intelligence</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#F1EDE4] font-cinematic mb-3">
                Empowering African & Independent Filmmakers
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                African filmmakers frequently lack access to expensive international market research firms. CineScout provides tailored Nigerian box office dynamics, Pan-African streaming intelligence (Showmax, Netflix, Canal+), diaspora appetite metrics, and nuanced cultural sensitivity checks.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <span>Local Nollywood multiplex & VOD trends</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <span>Authentic dialect & cultural nuance checks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <span>Global diaspora audience positioning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D6A84F] shrink-0" />
                  <span>Low-budget practical production hacks</span>
                </div>
              </div>
            </div>

            {/* Interactive Idea Presets launcher */}
            <div className="bg-[#0D0F17]/90 p-5 rounded-xl border border-zinc-800">
              <div className="text-xs font-tech font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center justify-between">
                <span>Featured Project Presets</span>
                <span className="text-[#D6A84F] text-[10px]">1-Click Test</span>
              </div>
              <div className="space-y-2.5">
                {FILM_PRESETS.slice(0, 3).map((preset, idx) => (
                  <button
                    key={preset.name}
                    id={`hero-preset-btn-${idx}`}
                    onClick={() => onSelectPreset(idx)}
                    className="w-full text-left p-2.5 rounded-lg bg-[#141722] hover:bg-[#1C2030] border border-zinc-700/60 hover:border-[#D6A84F]/50 transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-xs font-tech font-bold text-[#F1EDE4] group-hover:text-[#D6A84F] transition-colors">
                        {preset.name}
                      </div>
                      <div className="text-[11px] text-zinc-400 truncate max-w-[200px]">
                        {preset.tag}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-[#D6A84F] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* The CineScout Difference (Old Way vs CineScout) */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#11131A]/60 border border-red-500/20">
            <h3 className="text-lg font-bold text-red-400 font-tech mb-2 flex items-center gap-2">
              <span>✕</span> The Old Way (Shooting Blind)
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Spending $100k+ on production only to find zero streaming buyer demand.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Third-act plot collapses discovered on the set or in editing room.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Cultural missteps that alienate local communities or festival juries.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span>Unrealistic VFX requirements bankrupting indie productions mid-shoot.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-[#11131A]/90 border border-[#D6A84F]/40 shadow-lg shadow-[#D6A84F]/5">
            <h3 className="text-lg font-bold text-[#D6A84F] font-tech mb-2 flex items-center gap-2">
              <span>✓</span> The CineScout Way (Evidence-Informed)
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
              <li className="flex items-start gap-2">
                <span className="text-[#D6A84F] font-bold">•</span>
                <span>Multi-agent stress-testing before committing financial capital.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D6A84F] font-bold">•</span>
                <span>Detailed Evidence Plan identifying what to verify before pre-production.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D6A84F] font-bold">•</span>
                <span>Concrete low-budget production hacks that preserve visual ambition.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D6A84F] font-bold">•</span>
                <span>Actionable Executive Producer feedback ready for investors.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
