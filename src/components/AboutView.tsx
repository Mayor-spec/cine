import React from 'react';
import {
  Film,
  Compass,
  Users,
  Layers,
  TrendingUp,
  Globe2,
  ShieldCheck,
  Target,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface AboutViewProps {
  onStart: () => void;
  onExploreDemo: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onStart, onExploreDemo }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-xs font-tech font-semibold mb-3">
          <Film className="w-3.5 h-3.5" />
          <span>The CineScout Philosophy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F1EDE4] font-cinematic mb-4">
          "Before you shoot, scout."
        </h1>
        <p className="text-base text-zinc-300 leading-relaxed">
          CineScout does not write your script or replace human vision. CineScout helps filmmakers, screenwriters, and independent producers stress-test narrative mechanics, market appetite, and physical feasibility before committing financial capital.
        </p>
      </div>

      {/* Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="p-6 rounded-2xl glass-panel space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#171A24] border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F]">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-base font-tech font-bold text-[#F1EDE4]">
            Pre-Production Risk Reduction
          </h2>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Over 80% of independent film financial failures stem from avoidable pre-production oversights: third-act structural collapses, lack of clear audience hooks, and misjudged budget feasibility.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#171A24] border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F]">
            <Globe2 className="w-5 h-5" />
          </div>
          <h2 className="text-base font-tech font-bold text-[#F1EDE4]">
            African Cinema Empowerment
          </h2>
          <p className="text-xs text-zinc-300 leading-relaxed">
            African cinema produces thousands of films annually, yet indie creators rarely have access to six-figure Hollywood development analytics. CineScout levels the playing field with tailored Nollywood and diaspora intelligence.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-panel space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#171A24] border border-[#D6A84F]/30 flex items-center justify-center text-[#D6A84F]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h2 className="text-base font-tech font-bold text-[#F1EDE4]">
            Evidence-Informed Development
          </h2>
          <p className="text-xs text-zinc-300 leading-relaxed">
            Instead of making assumptions, CineScout produces an actionable Evidence Plan pointing filmmakers to concrete data sources, surveys, and pre-visualization tests before production begins.
          </p>
        </div>
      </div>

      {/* Scout Agent Roster */}
      <div className="p-8 rounded-2xl glass-panel-glow border-[#D6A84F]/25 mb-12">
        <h2 className="text-2xl font-bold text-[#F1EDE4] font-cinematic mb-6 text-center">
          The 8 Specialized AI Film Scouts
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {[
            { title: '1. Concept Scout', desc: 'Evaluates originality, narrative engine, and core logline hook strength.' },
            { title: '2. Audience Scout', desc: 'Profiles primary/secondary demographics, motivations, and viewer appeal.' },
            { title: '3. Competition Scout', desc: 'Identifies African and global comparable films and market gap positioning.' },
            { title: '4. Market Scout', desc: 'Assesses theatrical, streaming (SVOD), and international festival commerciality.' },
            { title: '5. Culture Scout', desc: 'Ensures authentic linguistic nuances and flags cultural context for human review.' },
            { title: '6. Production Scout', desc: 'Estimates physical feasibility, location needs, and low-budget optimizations.' },
            { title: '7. Story Scout', desc: 'Inspects protagonist agency, stakes, 3-act beats, and provides script notes.' },
            { title: '8. Executive Producer', desc: 'Delivers the final Greenlight / Develop verdict with investor pitch angles.' },
          ].map((s) => (
            <div key={s.title} className="p-3.5 rounded-xl bg-[#0D0F17] border border-zinc-800">
              <h3 className="font-tech font-bold text-[#D6A84F] mb-1">{s.title}</h3>
              <p className="text-zinc-300">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="text-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#D6A84F] hover:bg-[#E5B75E] text-[#08090D] font-tech font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D6A84F]/20"
          >
            <span>Start an Investigation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#11131A] hover:bg-[#171A24] border border-zinc-700 text-[#F1EDE4] font-tech text-sm flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#D6A84F]" />
            <span>Explore Demo (The Last Signal)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
