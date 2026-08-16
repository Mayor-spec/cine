import React, { useState } from 'react';
import {
  FilmIntelligenceReport,
  VerdictType,
  ClaimBasisType
} from '../../types';
import {
  Sparkles,
  Award,
  TrendingUp,
  Film,
  Users,
  Target,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Printer,
  Copy,
  Download,
  Check,
  X,
  Edit3,
  RotateCcw,
  ShieldAlert,
  Calendar,
  Compass,
  Globe2,
  FileText,
  Briefcase,
  ChevronRight,
  Share2,
  Eye
} from 'lucide-react';
import { EvidenceBadge, ConfidenceBadge } from '../common/EvidenceBadge';

interface ExecutivePitchPackProps {
  report: FilmIntelligenceReport;
  isOpen: boolean;
  onClose: () => void;
}

interface EditablePitchData {
  logline: string;
  hook: string;
  whyThisProject: string[];
  primaryAudience: string;
  secondaryAudience: string;
  marketPositioning: string;
  festivalPositioning: string;
  productionConsiderations: string;
  biggestOpportunity: string;
  biggestRisk: string;
  developmentPriorities: string[];
  producerPitch: string;
  recommendationNote: string;
}

export const ExecutivePitchPack: React.FC<ExecutivePitchPackProps> = ({
  report,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Initialize editable fields with smart extractions from the intelligence dossier
  const defaultWhyReasons: string[] = (() => {
    if (report.executiveProducerView?.whyThisVerdict && report.executiveProducerView.whyThisVerdict.length > 0) {
      return report.executiveProducerView.whyThisVerdict.slice(0, 3).map(r => typeof r === 'string' ? r : r.text);
    }
    if (report.competitivePositioning?.uniqueAdvantages && report.competitivePositioning.uniqueAdvantages.length > 0) {
      return report.competitivePositioning.uniqueAdvantages.slice(0, 3).map(a => `${a.title}: ${a.marketEdge || a.description}`);
    }
    return [
      `High-concept premise with distinct dramatic engine and sharp narrative momentum.`,
      `Contained production profile optimized for high production value and capital efficiency.`,
      `Underserved market corridor with strong international streaming and festival appetite.`
    ];
  })();

  const defaultPriorities: string[] = (() => {
    if (report.pathTo95 && report.pathTo95.length > 0) {
      return report.pathTo95.slice(0, 3).map(p => `${p.recommendedChange} (${p.whyItMatters})`);
    }
    if (report.agents?.story?.scriptDoctorNotes && report.agents.story.scriptDoctorNotes.length > 0) {
      return report.agents.story.scriptDoctorNotes.slice(0, 3);
    }
    return [
      'Sharpen Act 2 midpoint reversal to accelerate personal protagonist stakes.',
      'Refine supporting character subplots to amplify emotional catharsis in Act 3.',
      'Lock location parameters and sound recording protocol during pre-production.'
    ];
  })();

  const defaultProducerPitch: string = (() => {
    if (report.agents?.executive?.investorPitchHook) {
      return report.agents.executive.investorPitchHook;
    }
    if (report.competitivePositioning?.whyCanWinHeadline) {
      return `${report.competitivePositioning.whyCanWinHeadline} This project delivers high-tension storytelling with contained budget exposure, targeting an established appetite across streaming acquisitions and international festival circuits.`;
    }
    return `"${report.project.title}" represents a high-conviction development opportunity: pairing an immediate, relatable central conflict with rigorous physical containment. It provides distributors with high-appeal genre tension while protecting production capital with disciplined single-hub filming.`;
  })();

  const initialPitchData: EditablePitchData = {
    logline: report.project.concept || 'A gripping dramatic thriller navigating high moral stakes and personal survival.',
    hook: report.agents?.concept?.hookStrength 
      ? `${report.agents.concept.hookStrength}: ${report.agents.concept.premiseAnalysis || report.competitivePositioning?.tagline || 'Intense premise built around immediate dramatic tension.'}`
      : (report.competitivePositioning?.tagline || 'A distinctive high-concept cinematic premise.'),
    whyThisProject: defaultWhyReasons,
    primaryAudience: report.agents?.audience?.primaryAudience || report.project.targetAudience || 'Core demographic aged 18-35 and prestige drama enthusiasts.',
    secondaryAudience: report.agents?.audience?.secondaryAudience 
      ? `${report.agents.audience.secondaryAudience} • Demographic: ${report.agents.audience.ageDemographics || 'Broad cross-generational appeal'}`
      : 'International festival audiences and global diaspora streaming subscribers.',
    marketPositioning: report.agents?.market?.streamingPotential 
      ? `Primary SVOD / Streaming Acquisition: ${report.agents.market.streamingPotential}. Theatrical footprint: ${report.agents.market.theatricalPotential || 'Targeted regional release'}. Pan-African & Global Crossover: ${report.agents.market.internationalCrossover || 'High digital export potential'}.`
      : `High-value genre positioning tailored for global streaming licensing and counter-programmed regional theatrical distribution.`,
    festivalPositioning: report.agents?.market?.festivalPotential
      ? `${report.agents.market.festivalPotential}. Target submission window for tier-1 genre and international discovery berths (e.g. TIFF, AFRIFF, BFI London). Note: Strategic targeting — not a guaranteed selection.`
      : `Targeted genre festival circuit with international premiere strategy across premier independent and regional discovery festivals.`,
    productionConsiderations: report.agents?.production?.feasibilityRating
      ? `Feasibility: ${report.agents.production.feasibilityRating}. Primary Locations: ${(report.agents.production.locationsRequired || ['Contained metropolitan and interior setups']).join(', ')}. VFX/Practical: ${report.agents.production.vfxAndPracticalBalance || 'In-camera practical approach'}.`
      : `Contained physical scope with low-overhead practical locations, minimizing transit bottlenecks and maximizing on-screen production value.`,
    biggestOpportunity: report.executiveProducerView?.biggestOpportunity || report.agents?.executive?.strongestOpportunity || report.executiveSummary?.strongestCommercialOpportunity || 'Global streaming acquisition across tier-1 subscription platforms.',
    biggestRisk: report.executiveProducerView?.biggestRisk || report.agents?.executive?.biggestWeakness || report.executiveSummary?.biggestConcern || 'Pacing deceleration in the second act requiring script doctoring.',
    developmentPriorities: defaultPriorities,
    producerPitch: defaultProducerPitch,
    recommendationNote: report.executiveProducerView?.coreAnswers?.why || report.agents?.executive?.recommendedNextStep || 'Proceed with targeted script revisions to solidify midpoint causality and assemble key creative attachments.'
  };

  const [pitchData, setPitchData] = useState<EditablePitchData>(initialPitchData);

  if (!isOpen) return null;

  const handleReset = () => {
    setPitchData(initialPitchData);
    setIsEditMode(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `==================================================
CINESCOUT EXECUTIVE PITCH PACK
Confidential Development Intelligence Brief
==================================================

PROJECT TITLE: ${report.project.title.toUpperCase()}
FORMAT: ${report.project.format || 'Feature Film'}
GENRE: ${report.project.genre}
LOCATION / MARKET: ${report.project.country}
BUDGET RANGE: ${report.project.budget}

--------------------------------------------------
DEVELOPMENT VERDICT: ${report.verdict} (${report.overallScore} / 100)
--------------------------------------------------

LOGLINE:
${pitchData.logline}

THE HOOK:
${pitchData.hook}

WHY THIS PROJECT?
${pitchData.whyThisProject.map((r, i) => `${i + 1}. ${r}`).join('\n')}

PRODUCER PITCH:
"${pitchData.producerPitch}"

TARGET AUDIENCE:
- Primary Audience: ${pitchData.primaryAudience}
- Secondary Audience: ${pitchData.secondaryAudience}

MARKET POSITIONING:
${pitchData.marketPositioning}
[Basis: SOURCE & PROJECTION • Note: AI projection — not a financial guarantee]

FESTIVAL POSITIONING:
${pitchData.festivalPositioning}
[Basis: PROJECTION • Strategic positioning — no festival selection guarantee]

PRODUCTION CONSIDERATIONS:
${pitchData.productionConsiderations}
[Basis: INFERENCE]

KEY STRATEGIC METRICS:
- Biggest Opportunity: ${pitchData.biggestOpportunity}
- Biggest Risk: ${pitchData.biggestRisk}

DEVELOPMENT PRIORITIES (PATH TO PRODUCTION):
${pitchData.developmentPriorities.map((p, i) => `${i + 1}. ${p}`).join('\n')}

CINESCOUT RECOMMENDATION:
Verdict: ${report.verdict}
${pitchData.recommendationNote}

==================================================
Generated by CineScout AI Film Development Intelligence Platform
==================================================`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadMarkdown = () => {
    const md = `# CINESCOUT EXECUTIVE PITCH PACK
**Confidential Film Development Intelligence Brief**

---

### **${report.project.title.toUpperCase()}**
* **Format:** ${report.project.format || 'Feature Film'}
* **Genre:** ${report.project.genre}
* **Market / Territory:** ${report.project.country}
* **Budget Level:** ${report.project.budget}

---

## 🎯 DEVELOPMENT VERDICT
**Score:** ${report.overallScore} / 100  
**Verdict:** **${report.verdict}**

---

### 📖 LOGLINE
> ${pitchData.logline}

---

### ⚡ THE HOOK
${pitchData.hook}

---

### 🏆 WHY THIS PROJECT?
${pitchData.whyThisProject.map((r, i) => `${i + 1}. ${r}`).join('\n')}

---

### 🎬 PRODUCER PITCH
> "${pitchData.producerPitch}"

---

### 👥 TARGET AUDIENCE
* **Primary Audience:** ${pitchData.primaryAudience}
* **Secondary Audience:** ${pitchData.secondaryAudience}

---

### 📊 MARKET POSITIONING
${pitchData.marketPositioning}  
*(Claim Basis: PROJECTION • Note: AI projection — not a financial guarantee)*

---

### 🎪 FESTIVAL POSITIONING
${pitchData.festivalPositioning}  
*(Claim Basis: PROJECTION • Strategic festival positioning — no selection guarantee)*

---

### 🛠️ PRODUCTION CONSIDERATIONS
${pitchData.productionConsiderations}  
*(Claim Basis: INFERENCE)*

---

### 💡 STRATEGIC METRICS
* **Biggest Opportunity:** ${pitchData.biggestOpportunity}
* **Biggest Risk:** ${pitchData.biggestRisk}

---

### 🚀 DEVELOPMENT PRIORITIES
${pitchData.developmentPriorities.map((p, i) => `${i + 1}. ${p}`).join('\n')}

---

### 📋 CINESCOUT RECOMMENDATION
**Verdict: ${report.verdict}**  
${pitchData.recommendationNote}

---
*Generated by CineScout AI Film Development Intelligence Platform*
`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cinescout-pitch-pack-${report.project.title.toLowerCase().replace(/\s+/g, '-')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getVerdictStyle = (v: VerdictType) => {
    switch (v) {
      case 'GREENLIGHT':
        return {
          bg: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400',
          badge: 'bg-emerald-500 text-black',
          scoreText: 'text-emerald-400',
          title: 'GREENLIGHT FOR PACKAGING',
          border: 'border-emerald-500/40',
        };
      case 'DEVELOP':
        return {
          bg: 'bg-[#D6A84F]/15 border-[#D6A84F]/40 text-[#D6A84F]',
          badge: 'bg-[#D6A84F] text-black',
          scoreText: 'text-[#D6A84F]',
          title: 'DEVELOPMENT ASSET',
          border: 'border-[#D6A84F]/40',
        };
      case 'REVISE':
      case 'REWORK':
        return {
          bg: 'bg-amber-500/15 border-amber-500/40 text-amber-400',
          badge: 'bg-amber-400 text-black',
          scoreText: 'text-amber-400',
          title: 'REVISE BEFORE FINANCING',
          border: 'border-amber-500/40',
        };
      case 'PASS':
        return {
          bg: 'bg-rose-500/15 border-rose-500/40 text-rose-400',
          badge: 'bg-rose-500 text-white',
          scoreText: 'text-rose-400',
          title: 'HIGH RISK PROFILE / PASS',
          border: 'border-rose-500/40',
        };
      default:
        return {
          bg: 'bg-zinc-800 border-zinc-700 text-zinc-300',
          badge: 'bg-zinc-600 text-white',
          scoreText: 'text-zinc-200',
          title: 'DEVELOPMENT REVIEW',
          border: 'border-zinc-700',
        };
    }
  };

  const verdictStyle = getVerdictStyle(report.verdict);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fade-in">
      <div className="relative w-full max-w-5xl bg-[#090B10] border border-[#D6A84F]/30 rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden">
        
        {/* Top Control Bar (Non-Print) */}
        <div className="no-print p-3 sm:p-4 bg-[#0D101A] border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D6A84F]/15 border border-[#D6A84F]/40 flex items-center justify-center text-[#D6A84F]">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#D6A84F] font-tech">
                CINESCOUT EXECUTIVE PRESENTATION
              </div>
              <h2 className="text-sm sm:text-base font-bold text-white font-cinematic">
                Executive Pitch Pack Preview
              </h2>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setIsEditMode(!isEditMode)}
              className={`px-3 py-1.5 rounded-lg text-xs font-tech font-bold uppercase transition-all flex items-center gap-1.5 border ${
                isEditMode
                  ? 'bg-[#D6A84F] text-black border-[#D6A84F] shadow-sm'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-700 hover:border-[#D6A84F]/50 hover:text-white'
              }`}
              title="Toggle Edit Mode"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditMode ? 'Done Editing' : 'Edit'}</span>
            </button>

            {isEditMode && (
              <button
                type="button"
                onClick={handleReset}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800 text-xs font-tech flex items-center gap-1"
                title="Reset to Original Intelligence"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden xs:inline">Reset</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 text-xs font-tech font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Copy Pitch Pack to Clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadMarkdown}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700 text-xs font-tech font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              title="Download Markdown Executive Brief"
            >
              <Download className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden xs:inline">Export</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-[#D6A84F] hover:text-white border border-[#D6A84F]/40 text-xs font-tech font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title="Print / Save Clean PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 ml-1"
              aria-label="Close Pitch Pack Preview"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Pitch Pack Document Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 bg-[#090B10] text-[#F1EDE4] selection:bg-[#D6A84F]/30">
          
          {/* Executive Document Header Banner */}
          <div className="border-b border-zinc-800 pb-5 sm:pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-400 font-tech">
              <div className="flex items-center gap-2">
                <span className="font-cinematic font-bold text-[#D6A84F] tracking-widest text-sm sm:text-base">
                  CINESCOUT
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300 font-bold uppercase tracking-wider text-[11px]">
                  EXECUTIVE PITCH PACK
                </span>
              </div>
              <div className="text-[11px] text-zinc-400 flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-black/60 border border-zinc-800 text-[#D6A84F]">
                  CONFIDENTIAL DEVELOPMENT BRIEF
                </span>
                <span>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>

            {/* Title & Metadata Strip */}
            <div className="pt-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-cinematic tracking-tight leading-tight">
                {report.project.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 pt-3 border-t border-zinc-850 font-tech text-xs">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#121520] border border-zinc-800">
                  <span className="text-zinc-400 uppercase text-[10px]">FORMAT:</span>
                  <span className="font-semibold text-white">{report.project.format || 'Feature Film'}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#121520] border border-zinc-800">
                  <span className="text-zinc-400 uppercase text-[10px]">GENRE:</span>
                  <span className="font-semibold text-[#D6A84F]">{report.project.genre}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#121520] border border-zinc-800">
                  <span className="text-zinc-400 uppercase text-[10px]">LOCATION / MARKET:</span>
                  <span className="font-semibold text-white">{report.project.country}</span>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#121520] border border-zinc-800">
                  <span className="text-zinc-400 uppercase text-[10px]">BUDGET RANGE:</span>
                  <span className="font-semibold text-emerald-400">{report.project.budget}</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 1: DEVELOPMENT VERDICT & SCORE CARD */}
          <div className={`p-4 sm:p-5 rounded-2xl ${verdictStyle.bg} border ${verdictStyle.border} flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg`}>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-tech font-extrabold uppercase tracking-wider ${verdictStyle.badge}`}>
                  {report.verdict}
                </span>
                <span className="text-xs font-tech uppercase tracking-wider text-zinc-300">
                  {verdictStyle.title}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200 max-w-xl leading-relaxed pt-1 font-sans">
                {pitchData.recommendationNote}
              </p>
            </div>

            <div className="flex items-center gap-3 sm:border-l sm:border-zinc-800 sm:pl-6 shrink-0">
              <div className="text-right">
                <div className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 font-tech">
                  DEVELOPMENT SCORE
                </div>
                <div className="flex items-baseline gap-1 justify-end">
                  <span className={`text-3xl sm:text-4xl font-extrabold font-mono ${verdictStyle.scoreText}`}>
                    {report.overallScore}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">/ 100</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: LOGLINE & THE HOOK */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {/* Logline Box */}
            <div className="md:col-span-7 p-5 rounded-2xl bg-[#0D0F18] border border-zinc-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84F] font-tech">
                  <Film className="w-3.5 h-3.5" />
                  <span>LOGLINE</span>
                </div>
                <span className="text-[10px] text-zinc-400 font-tech uppercase">Core Premise</span>
              </div>

              {isEditMode ? (
                <textarea
                  rows={3}
                  value={pitchData.logline}
                  onChange={(e) => setPitchData({ ...pitchData, logline: e.target.value })}
                  className="w-full p-2.5 rounded-lg bg-black/60 border border-[#D6A84F]/40 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D6A84F]"
                />
              ) : (
                <p className="text-sm sm:text-base text-zinc-100 font-serif italic leading-relaxed">
                  "{pitchData.logline}"
                </p>
              )}
            </div>

            {/* The Hook Box */}
            <div className="md:col-span-5 p-5 rounded-2xl bg-[#0D0F18] border border-zinc-800 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84F] font-tech">
                    <Zap className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>THE HOOK</span>
                  </div>
                  <EvidenceBadge basis="INFERENCE" size="xs" showIcon={false} />
                </div>

                {isEditMode ? (
                  <textarea
                    rows={3}
                    value={pitchData.hook}
                    onChange={(e) => setPitchData({ ...pitchData, hook: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-black/60 border border-[#D6A84F]/40 text-white text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#D6A84F]"
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                    {pitchData.hook}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 3: PRODUCER PITCH (HERO CALLOUT) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#131724] to-[#0A0D15] border border-[#D6A84F]/35 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84F] font-tech">
                <Sparkles className="w-4 h-4 text-[#D6A84F]" />
                <span>PRODUCER PITCH • WHY SHOULD A PRODUCER CARE?</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-tech uppercase px-2 py-0.5 rounded bg-black/40 border border-zinc-800">
                Executive Synthesis
              </span>
            </div>

            {isEditMode ? (
              <textarea
                rows={4}
                value={pitchData.producerPitch}
                onChange={(e) => setPitchData({ ...pitchData, producerPitch: e.target.value })}
                className="w-full p-3 rounded-xl bg-black/70 border border-[#D6A84F]/50 text-white text-xs sm:text-sm leading-relaxed focus:outline-none"
              />
            ) : (
              <blockquote className="text-sm sm:text-base text-zinc-100 font-sans leading-relaxed border-l-2 border-[#D6A84F] pl-4 italic">
                "{pitchData.producerPitch}"
              </blockquote>
            )}
          </div>

          {/* SECTION 4: WHY THIS PROJECT? (3 CONCISE REASONS) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0D0F18] border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white font-tech">
                <Target className="w-4 h-4 text-[#D6A84F]" />
                <span>WHY THIS PROJECT? (3 CONCISE DRIVERS)</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-tech uppercase">Core Conviction</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {pitchData.whyThisProject.map((reason, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/45 border border-zinc-800 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-[#D6A84F]/15 text-[#D6A84F] font-mono font-bold text-xs flex items-center justify-center border border-[#D6A84F]/30">
                        {idx + 1}
                      </span>
                      <EvidenceBadge basis={idx === 0 ? 'INFERENCE' : idx === 1 ? 'INFERENCE' : 'PROJECTION'} size="xs" showIcon={false} />
                    </div>

                    {isEditMode ? (
                      <textarea
                        rows={3}
                        value={reason}
                        onChange={(e) => {
                          const updated = [...pitchData.whyThisProject];
                          updated[idx] = e.target.value;
                          setPitchData({ ...pitchData, whyThisProject: updated });
                        }}
                        className="w-full p-2 rounded bg-zinc-950 border border-zinc-700 text-xs text-zinc-200"
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                        {reason}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5: TARGET AUDIENCE & MARKET POSITIONING */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Target Audience */}
            <div className="p-5 rounded-2xl bg-[#0D0F18] border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400 font-tech">
                  <Users className="w-4 h-4" />
                  <span>TARGET AUDIENCE</span>
                </div>
                <EvidenceBadge basis="INFERENCE" size="xs" />
              </div>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 font-tech block mb-1">
                    PRIMARY DEMOGRAPHIC
                  </span>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={pitchData.primaryAudience}
                      onChange={(e) => setPitchData({ ...pitchData, primaryAudience: e.target.value })}
                      className="w-full p-1.5 rounded bg-zinc-950 border border-zinc-700 text-xs text-white"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-zinc-200 font-sans">{pitchData.primaryAudience}</p>
                  )}
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800">
                  <span className="text-[10px] font-bold uppercase text-zinc-400 font-tech block mb-1">
                    SECONDARY & CROSSOVER AUDIENCE
                  </span>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={pitchData.secondaryAudience}
                      onChange={(e) => setPitchData({ ...pitchData, secondaryAudience: e.target.value })}
                      className="w-full p-1.5 rounded bg-zinc-950 border border-zinc-700 text-xs text-white"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans">{pitchData.secondaryAudience}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Market Positioning */}
            <div className="p-5 rounded-2xl bg-[#0D0F18] border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 font-tech">
                  <TrendingUp className="w-4 h-4" />
                  <span>MARKET POSITIONING</span>
                </div>
                <EvidenceBadge basis="PROJECTION" size="xs" />
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 space-y-2">
                {isEditMode ? (
                  <textarea
                    rows={4}
                    value={pitchData.marketPositioning}
                    onChange={(e) => setPitchData({ ...pitchData, marketPositioning: e.target.value })}
                    className="w-full p-2 rounded bg-zinc-950 border border-zinc-700 text-xs text-white"
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                    {pitchData.marketPositioning}
                  </p>
                )}
                <div className="pt-2 text-[10px] text-zinc-400 font-tech border-t border-zinc-850 flex items-center justify-between">
                  <span>Buyer demand modeling & territory fit</span>
                  <span className="text-amber-400/80">AI projection — not a financial guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6: FESTIVAL POSITIONING & PRODUCTION CONSIDERATIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Festival Positioning */}
            <div className="p-5 rounded-2xl bg-[#0D0F18] border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 font-tech">
                  <Award className="w-4 h-4" />
                  <span>FESTIVAL POSITIONING</span>
                </div>
                <EvidenceBadge basis="PROJECTION" size="xs" />
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 space-y-2">
                {isEditMode ? (
                  <textarea
                    rows={3}
                    value={pitchData.festivalPositioning}
                    onChange={(e) => setPitchData({ ...pitchData, festivalPositioning: e.target.value })}
                    className="w-full p-2 rounded bg-zinc-950 border border-zinc-700 text-xs text-white"
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                    {pitchData.festivalPositioning}
                  </p>
                )}
                <div className="pt-1.5 text-[10px] text-zinc-400 font-tech border-t border-zinc-850">
                  Strategic festival positioning — selection cannot be guaranteed.
                </div>
              </div>
            </div>

            {/* Production Considerations */}
            <div className="p-5 rounded-2xl bg-[#0D0F18] border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 font-tech">
                  <Compass className="w-4 h-4" />
                  <span>PRODUCTION CONSIDERATIONS</span>
                </div>
                <EvidenceBadge basis="INFERENCE" size="xs" />
              </div>

              <div className="p-3.5 rounded-xl bg-black/40 border border-zinc-800 space-y-2">
                {isEditMode ? (
                  <textarea
                    rows={3}
                    value={pitchData.productionConsiderations}
                    onChange={(e) => setPitchData({ ...pitchData, productionConsiderations: e.target.value })}
                    className="w-full p-2 rounded bg-zinc-950 border border-zinc-700 text-xs text-white"
                  />
                ) : (
                  <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed font-sans">
                    {pitchData.productionConsiderations}
                  </p>
                )}
                <div className="pt-1.5 text-[10px] text-zinc-400 font-tech border-t border-zinc-850">
                  Optimized for physical containment and line-item efficiency.
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 7: BIGGEST OPPORTUNITY & BIGGEST RISK */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Opportunity */}
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/15 border border-emerald-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 font-tech">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>BIGGEST OPPORTUNITY</span>
                </div>
                <span className="text-[10px] text-emerald-400/80 font-tech uppercase font-bold">Highest Upside</span>
              </div>
              {isEditMode ? (
                <input
                  type="text"
                  value={pitchData.biggestOpportunity}
                  onChange={(e) => setPitchData({ ...pitchData, biggestOpportunity: e.target.value })}
                  className="w-full p-2 rounded bg-zinc-950 border border-zinc-700 text-xs text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm text-zinc-100 font-semibold font-sans">
                  {pitchData.biggestOpportunity}
                </p>
              )}
            </div>

            {/* Risk */}
            <div className="p-4 sm:p-5 rounded-2xl bg-rose-950/15 border border-rose-500/30 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-400 font-tech">
                  <ShieldAlert className="w-4 h-4" />
                  <span>BIGGEST RISK</span>
                </div>
                <span className="text-[10px] text-rose-400/80 font-tech uppercase font-bold">Primary Threat</span>
              </div>
              {isEditMode ? (
                <input
                  type="text"
                  value={pitchData.biggestRisk}
                  onChange={(e) => setPitchData({ ...pitchData, biggestRisk: e.target.value })}
                  className="w-full p-2 rounded bg-zinc-950 border border-zinc-700 text-xs text-white"
                />
              ) : (
                <p className="text-xs sm:text-sm text-zinc-200 font-sans">
                  {pitchData.biggestRisk}
                </p>
              )}
            </div>
          </div>

          {/* SECTION 8: DEVELOPMENT PRIORITIES (TOP 3 IMPROVEMENTS) */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0D0F18] border border-zinc-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white font-tech">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>DEVELOPMENT PRIORITIES • 3 HIGHEST-PRIORITY ACTIONS</span>
              </div>
              <span className="text-[10px] text-zinc-400 font-tech uppercase">Path to Production</span>
            </div>

            <div className="space-y-2.5">
              {pitchData.developmentPriorities.map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/45 border border-zinc-800 flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-amber-400/15 border border-amber-400/40 text-amber-400 font-mono font-bold text-xs shrink-0 mt-0.5">
                    Priority #{idx + 1}
                  </span>
                  {isEditMode ? (
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...pitchData.developmentPriorities];
                        updated[idx] = e.target.value;
                        setPitchData({ ...pitchData, developmentPriorities: updated });
                      }}
                      className="w-full p-1.5 rounded bg-zinc-950 border border-zinc-700 text-xs text-white"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-zinc-200 font-sans leading-relaxed">
                      {item}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 9: CINESCOUT RECOMMENDATION FOOTER */}
          <div className="p-4 sm:p-5 rounded-xl bg-black/60 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400 font-tech">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white uppercase">CineScout Intelligence Summary:</span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-extrabold uppercase ${verdictStyle.badge}`}>
                {report.verdict}
              </span>
            </div>
            <div className="text-zinc-400 text-[11px]">
              Platform standard: Anti-fabrication integrity • All claims classified by basis
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
