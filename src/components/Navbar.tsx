import React from 'react';
import { Film, Clapperboard, FolderArchive, Sparkles, HelpCircle, Plus } from 'lucide-react';

interface NavbarProps {
  activeView: 'home' | 'input' | 'progress' | 'report' | 'saved' | 'about';
  onNavigate: (view: 'home' | 'input' | 'progress' | 'report' | 'saved' | 'about') => void;
  onLaunchDemo: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  onLaunchDemo,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#D6A84F]/15 bg-[#08090D]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-2">
        {/* Brand */}
        <button
          id="nav-brand-btn"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 sm:gap-3 group text-left focus:outline-none shrink-0"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br from-[#201D16] to-[#12141C] border border-[#D6A84F]/40 flex items-center justify-center shadow-md group-hover:border-[#D6A84F] transition-all">
            <Film className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D6A84F]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <span className="font-cinematic text-sm sm:text-base md:text-lg font-bold tracking-wider text-[#F1EDE4] group-hover:text-[#D6A84F] transition-colors leading-none">
                CINESCOUT
              </span>
              <span className="text-[8px] sm:text-[9px] font-tech uppercase tracking-wider px-1 py-0.2 rounded bg-[#D6A84F]/10 text-[#D6A84F] border border-[#D6A84F]/25 font-semibold">
                AI ROOM
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-zinc-400 font-sans hidden md:block">
              Film Development Intelligence Platform
            </span>
          </div>
        </button>

        {/* Navigation Actions */}
        <nav className="flex items-center gap-1 sm:gap-1.5 shrink-0">
          <button
            id="nav-investigate-btn"
            onClick={() => onNavigate('input')}
            className={`px-2 sm:px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1 sm:gap-1.5 ${
              activeView === 'input'
                ? 'bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/40 shadow-sm font-semibold'
                : 'text-zinc-300 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Clapperboard className="w-3.5 h-3.5 text-[#D6A84F]" />
            <span className="font-tech tracking-wide text-[11px] sm:text-xs">INVESTIGATE</span>
          </button>

          <button
            id="nav-saved-btn"
            onClick={() => onNavigate('saved')}
            className={`px-2 sm:px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all flex items-center gap-1 ${
              activeView === 'saved'
                ? 'bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/40 shadow-sm font-semibold'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
            title="Saved Dossiers"
          >
            <FolderArchive className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs">Dossiers</span>
            {savedCount > 0 && (
              <span className="text-[9px] sm:text-[10px] bg-zinc-800 text-[#D6A84F] px-1.5 py-0.2 rounded-full border border-zinc-700 font-mono">
                {savedCount}
              </span>
            )}
          </button>

          <button
            id="nav-about-btn"
            onClick={() => onNavigate('about')}
            className={`hidden md:flex px-2 sm:px-2.5 py-1.5 text-xs font-medium rounded-lg transition-all items-center gap-1 ${
              activeView === 'about'
                ? 'bg-[#D6A84F]/15 text-[#D6A84F] border border-[#D6A84F]/40'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
            title="About CineScout"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Philosophy</span>
          </button>

          {/* Quick Demo CTA */}
          <button
            id="nav-demo-btn"
            onClick={onLaunchDemo}
            className="hidden sm:flex px-2 sm:px-2.5 py-1.5 text-xs font-tech font-semibold rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-[#D6A84F] border border-zinc-700/80 hover:border-[#D6A84F]/50 transition-all items-center gap-1 shadow-sm"
          >
            <Sparkles className="w-3 h-3 text-[#D6A84F]" />
            <span>Demo</span>
          </button>

          {/* Primary CTA */}
          <button
            id="nav-new-investigation-btn"
            onClick={() => onNavigate('input')}
            className="px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs font-bold rounded-lg bg-gradient-to-r from-[#D6A84F] to-[#E5B75E] hover:from-[#E5B75E] hover:to-[#D6A84F] text-[#08090D] transition-all flex items-center gap-1 shadow-md shadow-[#D6A84F]/15 font-tech tracking-wide shrink-0"
          >
            <Plus className="w-3 h-3 stroke-[2.5]" />
            <span>New</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
