import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Check,
  CircleDot,
  Circle,
  Loader2,
  Film,
  AlertCircle,
} from 'lucide-react';
import { FilmProjectInput } from '../types';

interface InvestigationProgressProps {
  project: FilmProjectInput;
  onAnimationComplete?: () => void;
  isBackendReady: boolean;
  error?: { title: string; message: string } | null;
  onRetry?: () => void;
  onCancel?: () => void;
}

interface AnalysisStage {
  id: string;
  label: string;
  description: string;
}

const ANALYSIS_STAGES: AnalysisStage[] = [
  {
    id: 'reading',
    label: '01 Reading the project',
    description: 'Parsing submitted narrative materials, logline dynamics, and structural elements...',
  },
  {
    id: 'concept',
    label: '02 Evaluating concept',
    description: 'Interrogating core premise originality, hook pitchability, and emotional engine...',
  },
  {
    id: 'audience',
    label: '03 Mapping audience',
    description: 'Segmenting primary demographic cohorts, diaspora reach, and cultural resonance...',
  },
  {
    id: 'commercial',
    label: '04 Assessing commercial potential',
    description: 'Benchmarking theatrical viability, SVOD licensing demand, and domestic streaming appetite...',
  },
  {
    id: 'production',
    label: '05 Testing production feasibility',
    description: 'Stress-testing physical location constraints, cast requirements, and budget realism...',
  },
  {
    id: 'festival',
    label: '06 Evaluating festival positioning',
    description: 'Assessing festival programming niches, premiere circuits, and curated film opportunities...',
  },
  {
    id: 'risks',
    label: '07 Identifying risks',
    description: 'Evaluating probability and severity across story, market, execution, and distribution...',
  },
  {
    id: 'executive',
    label: '08 Building executive dossier',
    description: 'Synthesizing scores, generating Path to 95, and formulating final greenlight verdict...',
  },
];

const AMBIENT_PHRASES = [
  'Reading project materials...',
  'Evaluating creative premise & market dynamics...',
  'Interrogating production feasibility & budget bounds...',
  'Synthesizing intelligence into executive development dossier...',
];

export const InvestigationProgress: React.FC<InvestigationProgressProps> = ({
  project,
  onAnimationComplete,
  isBackendReady,
  error,
  onRetry,
  onCancel,
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [progressPercent, setProgressPercent] = useState(12);

  // Rotate ambient thinking phrases
  useEffect(() => {
    if (error) return;
    const textTimer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % AMBIENT_PHRASES.length);
    }, 2200);
    return () => clearInterval(textTimer);
  }, [error]);

  // Sequential progression through stages
  useEffect(() => {
    if (error) return;
    const stageInterval = setInterval(() => {
      setCurrentStageIndex((prev) => {
        if (prev < ANALYSIS_STAGES.length - 1) {
          const next = prev + 1;
          setProgressPercent(Math.round(((next + 1) / ANALYSIS_STAGES.length) * 92));
          return next;
        } else {
          if (isBackendReady) {
            setProgressPercent(100);
            if (onAnimationComplete) {
              setTimeout(onAnimationComplete, 600);
            }
          }
          return prev;
        }
      });
    }, 1350);

    return () => clearInterval(stageInterval);
  }, [isBackendReady, onAnimationComplete, error]);

  // When backend signals completion
  useEffect(() => {
    if (error) return;
    if (isBackendReady && currentStageIndex >= ANALYSIS_STAGES.length - 2) {
      setCurrentStageIndex(ANALYSIS_STAGES.length - 1);
      setProgressPercent(100);
      const timer = setTimeout(() => {
        if (onAnimationComplete) onAnimationComplete();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [isBackendReady, currentStageIndex, onAnimationComplete, error]);

  if (error) {
    return (
      <div className="max-w-xl mx-auto px-4 sm:px-6 py-12 sm:py-20 animate-fade-in" id="investigation-error-view">
        <div className="p-6 sm:p-8 rounded-2xl bg-[#0E111A] border border-rose-500/40 shadow-2xl shadow-rose-950/30 text-center space-y-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs font-tech font-semibold">
              INVESTIGATION STATUS
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#F1EDE4] font-cinematic tracking-tight">
              {error.title || 'Investigation interrupted'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-tech leading-relaxed max-w-md mx-auto">
              {error.message || 'CineScout could not complete the intelligence room synthesis. Please try again.'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-black/50 border border-zinc-800/80 text-left text-xs font-tech space-y-1">
            <div className="text-zinc-400">Project Target:</div>
            <div className="text-[#F1EDE4] font-semibold flex items-center gap-2">
              <Film className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>{project.title || 'Untitled Project'}</span>
              <span className="text-zinc-400">• {project.genre}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D6A84F] to-[#E5B75E] hover:brightness-110 text-[#08090D] font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#D6A84F]/20 font-tech transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#08090D]" />
                <span>Try Again</span>
              </button>
            )}

            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold text-xs border border-zinc-700 font-tech transition-all"
              >
                <span>Edit Project Details</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 animate-fade-in" id="investigation-progress-view">
      {/* Header Banner */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12141C] border border-[#D6A84F]/30 text-[#D6A84F] text-xs font-tech font-semibold mb-3.5 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CINESCOUT AI ROOM</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-bold text-[#F1EDE4] font-cinematic tracking-tight">
          CINESCOUT IS INVESTIGATING
        </h1>

        <p className="text-xs sm:text-sm text-[#D6A84F] font-tech mt-2 tracking-wide flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F] animate-ping" />
          <span>&ldquo;{AMBIENT_PHRASES[phraseIndex]}&rdquo;</span>
        </p>

        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/50 border border-zinc-800 text-zinc-300 text-xs font-tech">
          <Film className="w-3 h-3 text-[#D6A84F]" />
          <span className="font-semibold text-white">{project.title || 'Untitled Film'}</span>
          <span className="text-zinc-400">• {project.genre}</span>
          <span className="text-zinc-400">• {project.budget}</span>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#0E111A] border border-zinc-800/90 shadow-xl mb-6">
        <div className="flex items-center justify-between text-xs font-tech mb-2">
          <div className="flex items-center gap-2 text-zinc-300 font-semibold">
            <Loader2 className="w-3.5 h-3.5 text-[#D6A84F] animate-spin" />
            <span className="text-[#D6A84F]">{ANALYSIS_STAGES[currentStageIndex]?.label}</span>
          </div>
          <span className="text-zinc-200 font-mono font-bold">{progressPercent}%</span>
        </div>

        {/* Elegant Progress Track */}
        <div className="w-full h-2 bg-[#08090D] rounded-full overflow-hidden border border-zinc-800 p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#D6A84F] to-[#E5B75E] transition-all duration-700 ease-out shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Structured Analysis Stages Checklist */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[#0E111A] border border-zinc-800/80 shadow-xl space-y-3">
        <div className="text-[11px] font-tech font-bold uppercase tracking-widest text-zinc-400 pb-2 border-b border-zinc-800 flex items-center justify-between">
          <span>DEVELOPMENT ROOM PIPELINE</span>
          <span className="text-[#D6A84F]">8-SCOUT CONSENSUS</span>
        </div>

        <div className="space-y-2.5">
          {ANALYSIS_STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex || (idx === ANALYSIS_STAGES.length - 1 && isBackendReady);
            const isWorking = idx === currentStageIndex && !isCompleted;
            const isPending = idx > currentStageIndex;

            return (
              <div
                key={stage.id}
                className={`p-3 sm:p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-3 ${
                  isWorking
                    ? 'bg-[#141724] border-[#D6A84F]/60 shadow-md shadow-[#D6A84F]/10 scale-[1.005]'
                    : isCompleted
                    ? 'bg-black/40 border-emerald-500/30 text-zinc-300'
                    : 'bg-black/20 border-zinc-800/60 opacity-40'
                }`}
              >
                {/* Icon / Checkmark Indicator */}
                <div className="mt-0.5 shrink-0">
                  {isCompleted && (
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </div>
                  )}
                  {isWorking && (
                    <div className="w-5 h-5 rounded-full bg-[#D6A84F]/20 text-[#D6A84F] border border-[#D6A84F] flex items-center justify-center animate-pulse">
                      <CircleDot className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  )}
                  {isPending && (
                    <div className="w-5 h-5 rounded-full bg-zinc-800/60 text-zinc-600 border border-zinc-700 flex items-center justify-center">
                      <Circle className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {/* Stage Label & Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`text-xs font-tech font-bold tracking-wide ${
                        isWorking
                          ? 'text-[#F1EDE4]'
                          : isCompleted
                          ? 'text-zinc-200'
                          : 'text-zinc-400'
                      }`}
                    >
                      {stage.label}
                    </h3>
                    <span className="text-[10px] font-tech font-semibold">
                      {isCompleted && <span className="text-emerald-400">COMPLETE</span>}
                      {isWorking && <span className="text-[#D6A84F] animate-pulse">EVALUATING</span>}
                      {isPending && <span className="text-zinc-400">QUEUED</span>}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-400 font-sans mt-0.5 leading-snug">
                    {stage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
