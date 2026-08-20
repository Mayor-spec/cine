import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroLanding } from './components/HeroLanding';
import { InputPanel } from './components/InputPanel';
import { InvestigationProgress } from './components/InvestigationProgress';
import { ReportView } from './components/ReportView';
import { SavedProjects } from './components/SavedProjects';
import { AboutView } from './components/AboutView';
import { FilmProjectInput, FilmIntelligenceReport } from './types';
import { DEMO_PROJECT_INPUT, DEMO_INTELLIGENCE_REPORT } from './data/demoData';
import { FILM_PRESETS } from './data/presets';
import { getSavedReports, saveReport, deleteReport } from './utils/storage';
import confetti from 'canvas-confetti';
import { AlertCircle, X, Sparkles } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'input' | 'progress' | 'report' | 'saved' | 'about'>('home');
  const [currentProjectInput, setCurrentProjectInput] = useState<FilmProjectInput | null>(null);
  const [currentReport, setCurrentReport] = useState<FilmIntelligenceReport | null>(null);
  const [savedReports, setSavedReports] = useState<FilmIntelligenceReport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBackendReady, setIsBackendReady] = useState(false);
  const [investigationError, setInvestigationError] = useState<{ title: string; message: string } | null>(null);
  const [notification, setNotification] = useState<{ type: 'error' | 'info'; message: string } | null>(null);

  // Initialize saved reports from localStorage
  useEffect(() => {
    const list = getSavedReports();
    setSavedReports(list);
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D6A84F', '#FFF4D0', '#B8852A', '#10B981'],
      });
    } catch (e) {
      // ignore
    }
  };

  const handleStartNew = () => {
    setCurrentProjectInput(null);
    setActiveView('input');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPreset = (index: number) => {
    const preset = FILM_PRESETS[index];
    if (preset) {
      setCurrentProjectInput(preset.data);
      setActiveView('input');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLaunchDemo = () => {
    setCurrentProjectInput(DEMO_PROJECT_INPUT);
    setCurrentReport(DEMO_INTELLIGENCE_REPORT);
    setActiveView('progress');
    setIsLoading(false);
    setIsBackendReady(true);
    saveReport(DEMO_INTELLIGENCE_REPORT);
    setSavedReports(getSavedReports());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProgressComplete = () => {
    if (currentReport) {
      setActiveView('report');
      triggerConfetti();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInvestigationSubmit = async (formData: FilmProjectInput) => {
    setCurrentProjectInput(formData);
    setActiveView('progress');
    setIsLoading(true);
    setIsBackendReady(false);
    setInvestigationError(null);
    setNotification(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await fetch('/api/scout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        if (errorData.message?.includes('GEMINI_KEY_MISSING') || errorData.error === 'GEMINI_KEY_MISSING') {
          setInvestigationError({
            title: 'Google Gemini API Key Required',
            message: 'To synthesize real intelligence with the 8-agent AI studio room, please add your GEMINI_API_KEY to your environment variables or Vercel Settings.',
          });
          setIsLoading(false);
          return;
        }

        setInvestigationError({
          title: 'Investigation Error',
          message: errorData.message || 'CineScout was unable to complete the AI investigation. Please verify your GEMINI_API_KEY.',
        });
        setIsLoading(false);
        return;
      }

      const generatedReport: FilmIntelligenceReport = await response.json();
      setCurrentReport(generatedReport);
      saveReport(generatedReport);
      setSavedReports(getSavedReports());
      setIsBackendReady(true);
    } catch (err: any) {
      console.error('Investigation error:', err);
      setInvestigationError({
        title: 'Connection Error',
        message: err.message || 'Unable to connect to CineScout AI backend. Please verify your network and GEMINI_API_KEY.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenSavedReport = (report: FilmIntelligenceReport) => {
    setCurrentReport(report);
    setCurrentProjectInput(report.project);
    setActiveView('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDuplicateReport = (report: FilmIntelligenceReport) => {
    setCurrentProjectInput({
      ...report.project,
      title: `${report.project.title} (Draft 2)`,
    });
    setActiveView('input');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteSavedReport = (reportId: string) => {
    const updated = deleteReport(reportId);
    setSavedReports(updated);
    if (currentReport && currentReport.id === reportId) {
      setCurrentReport(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#08090D] text-[#F1EDE4]">
      {/* Navigation Header */}
      <Navbar
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onLaunchDemo={handleLaunchDemo}
        savedCount={savedReports.length}
      />

      {/* Floating Notification Toast */}
      {notification && (
        <div className="max-w-md mx-auto fixed top-20 right-4 z-50 animate-fade-in">
          <div className="p-3.5 rounded-xl glass-panel-glow border-[#D6A84F]/40 flex items-center justify-between gap-3 text-xs text-zinc-200 shadow-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#D6A84F] shrink-0" />
              <span>{notification.message}</span>
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Primary Content Router */}
      <main className="flex-1">
        {activeView === 'home' && (
          <HeroLanding
            onStart={handleStartNew}
            onExploreDemo={handleLaunchDemo}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {activeView === 'input' && (
          <InputPanel
            initialData={currentProjectInput || undefined}
            onSubmit={handleInvestigationSubmit}
            onLaunchDemo={handleLaunchDemo}
            isLoading={isLoading}
            onCancel={() => {
              setActiveView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeView === 'progress' && currentProjectInput && (
          <InvestigationProgress
            project={currentProjectInput}
            onAnimationComplete={handleProgressComplete}
            isBackendReady={isBackendReady}
            error={investigationError}
            onRetry={() => {
              if (currentProjectInput) {
                handleInvestigationSubmit(currentProjectInput);
              }
            }}
            onCancel={() => {
              setInvestigationError(null);
              setActiveView('input');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeView === 'report' && currentReport && (
          <ReportView
            report={currentReport}
            onNewInvestigation={handleStartNew}
          />
        )}

        {activeView === 'saved' && (
          <SavedProjects
            reports={savedReports}
            onOpenReport={handleOpenSavedReport}
            onDuplicateReport={handleDuplicateReport}
            onDeleteReport={handleDeleteSavedReport}
            onStartNew={handleStartNew}
            onLoadDemo={handleLaunchDemo}
          />
        )}

        {activeView === 'about' && (
          <AboutView
            onStart={handleStartNew}
            onExploreDemo={handleLaunchDemo}
          />
        )}
      </main>

      {/* Cinematic Footer */}
      <footer className="no-print border-t border-zinc-800/80 bg-[#06070A] py-8 text-center text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-cinematic font-bold text-[#F1EDE4] tracking-wider">CINESCOUT</span>
            <span>•</span>
            <span className="font-tech text-zinc-400">Your AI Film Intelligence Room</span>
          </div>
          <div className="font-tech text-zinc-400">
            "Before you shoot, scout." • Built with Google Gemini
          </div>
        </div>
      </footer>
    </div>
  );
}
