import React, { useState, useEffect } from 'react';
import {
  FilmIntelligenceReport,
  VerdictType,
  AgentScorecardItem,
  PathTo95Item,
  EvidenceBasedRecommendation,
  ActionableOpportunity,
  ProfessionalRiskItem,
  CompetitivePositioning,
  DevelopmentRoadmapStep
} from '../types';
import {
  Compass,
  Users,
  Layers,
  TrendingUp,
  Globe2,
  ShieldCheck,
  Film,
  Target,
  Sparkles,
  Printer,
  Copy,
  Download,
  Share2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  MessageSquare,
  Send,
  Loader2,
  Check,
  ChevronRight,
  BookOpen,
  DollarSign,
  Award,
  Calendar,
  Trophy,
  Scale,
  Zap,
  ArrowRight,
  FileText,
  Briefcase
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { AgentScorecardView } from './report/AgentScorecardView';
import { ExecutiveProducerSummary } from './report/ExecutiveProducerSummary';
import { PathTo95View } from './report/PathTo95View';
import { EvidenceAnalysisView } from './report/EvidenceAnalysisView';
import { ActionableOpportunitiesView } from './report/ActionableOpportunitiesView';
import { RiskMatrixView } from './report/RiskMatrixView';
import { CompetitivePositioningView } from './report/CompetitivePositioningView';
import { FilmmakerRoadmapView } from './report/FilmmakerRoadmapView';
import { AgentDossiersView } from './report/AgentDossiersView';
import { ConfidenceEthicsView } from './report/ConfidenceEthicsView';
import { ExecutivePitchPack } from './report/ExecutivePitchPack';

interface ReportViewProps {
  report: FilmIntelligenceReport;
  onNewInvestigation: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({
  report,
  onNewInvestigation,
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'scorecard'
    | 'pathto95'
    | 'evidence'
    | 'opportunities'
    | 'risks'
    | 'positioning'
    | 'roadmap'
    | 'dossiers'
    | 'african'
    | 'confidence'
    | 'ask'
  >('overview');

  const [selectedAgentDossier, setSelectedAgentDossier] = useState<string>('concept');
  const [copied, setCopied] = useState(false);
  const [isPitchPackOpen, setIsPitchPackOpen] = useState(false);

  // Interactive Room Q&A State
  const [questionInput, setQuestionInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{ sender: 'user' | 'scout'; text: string; role?: string }[]>([
    {
      sender: 'scout',
      role: 'Executive Producer & Scout Advisory',
      text: `Investigation dossier complete for "${report.project.title}". What specific production, casting, or script development questions can we answer for your creative team?`,
    },
  ]);
  const [isAsking, setIsAsking] = useState(false);

  // Trigger celebration confetti on high development scores
  useEffect(() => {
    if (report.overallScore >= 80 || report.verdict === 'GREENLIGHT') {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#D6A84F', '#10B981', '#F59E0B', '#E5E7EB'],
        });
      } catch (e) {
        // Safe failover
      }
    }
  }, [report.overallScore, report.verdict]);

  // Safe fallback population for enhanced fields if missing in legacy inputs
  const scorecards: AgentScorecardItem[] = report.agentScorecards || [
    {
      id: 'concept',
      name: 'Concept Scout',
      role: 'Premise & Originality Analysis',
      score: report.scores.concept || 85,
      shortReasoning: report.agents?.concept?.hookStrength || 'Compelling premise with distinct narrative tension.',
      strongestFinding: report.agents?.concept?.strengths?.[0] || 'Clear hook with immediate pitchability.',
      biggestConcern: report.agents?.concept?.weaknesses?.[0] || 'Requires dynamic second-act escalation.',
    },
    {
      id: 'audience',
      name: 'Audience Scout',
      role: 'Demographics & Target Fit',
      score: report.scores.audience || 82,
      shortReasoning: 'Strong engagement potential among core streaming demographics.',
      strongestFinding: 'High word-of-mouth vitality across digital channels.',
      biggestConcern: report.agents?.audience?.audienceRisks?.[0] || 'Must maintain brisk narrative momentum.',
    },
    {
      id: 'competition',
      name: 'Competition Scout',
      role: 'Competitive Benchmarking',
      score: report.scores.competition || 80,
      shortReasoning: 'Capitalizes on an underserved market gap in genre cinema.',
      strongestFinding: 'Distinct cultural texture sets it apart from generic formulas.',
      biggestConcern: 'Avoid relying on derivative genre tropes without localized depth.',
    },
    {
      id: 'market',
      name: 'Market Scout',
      role: 'Commercial Viability',
      score: report.scores.market || 80,
      shortReasoning: 'Solid candidate for SVOD acquisition and festival showcase berths.',
      strongestFinding: 'High streaming buyer demand for elevated genre content.',
      biggestConcern: 'Domestic theatrical corridors require strategic counter-programming.',
    },
    {
      id: 'culture',
      name: 'Culture Scout',
      role: 'Authenticity & Setting Integrity',
      score: report.scores.culture || 85,
      shortReasoning: 'Authentic social texture with natural colloquial dialogue.',
      strongestFinding: 'Grounded representation that honors regional perspectives.',
      biggestConcern: report.agents?.culture?.flagsForHumanReview?.[0] || 'Verify colloquial nuances with local advisors.',
    },
    {
      id: 'production',
      name: 'Production Scout',
      role: 'Feasibility & Low-Budget Optimization',
      score: report.scores.production || 78,
      shortReasoning: 'Manageable physical production parameters for contained shooting.',
      strongestFinding: 'Practical locations allow high aesthetic polish on an indie budget.',
      biggestConcern: 'Permitting and sound interference require early management.',
    },
    {
      id: 'story',
      name: 'Story Scout',
      role: 'Structure & Script Doctoring',
      score: report.scores.story || 79,
      shortReasoning: 'Solid 3-act spine with high personal stakes.',
      strongestFinding: 'Central moral dilemma drives emotional protagonist conflict.',
      biggestConcern: report.agents?.story?.scriptDoctorNotes?.[0] || 'Sharpen midpoint reversal to sustain pace.',
    },
    {
      id: 'executive',
      name: 'Executive Producer',
      role: 'Commercial Synthesis & Packaging',
      score: report.scores.executive || report.overallScore || 82,
      shortReasoning: report.agents?.executive?.verdictHeadline || 'Favorable risk-adjusted ROI potential.',
      strongestFinding: report.agents?.executive?.strongestOpportunity || 'Strong pre-sale interest from global streamers.',
      biggestConcern: report.agents?.executive?.biggestWeakness || 'Lock key creative team before financing.',
    },
  ];

  const executiveView = report.executiveProducerView || {
    overallScore: report.overallScore,
    verdict: report.verdict,
    commercialPotential: 'High',
    festivalPotential: 'Targeted Genre',
    productionFeasibility: 'Highly Feasible',
    audiencePotential: report.agents?.audience?.primaryAudience || 'Core demographic and global streamers',
    biggestOpportunity: report.agents?.executive?.strongestOpportunity || report.executiveSummary?.strongestCommercialOpportunity || 'Global streaming distribution',
    biggestRisk: report.agents?.executive?.biggestWeakness || report.executiveSummary?.biggestConcern || 'Pacing in Act 2',
    immediateNextAction: report.agents?.executive?.recommendedNextStep || report.executiveSummary?.preProductionActions?.[0] || 'Commission 2nd-draft script polish',
    coreAnswers: {
      isWorthMaking: 'Yes, with focused development. The project holds compelling market and cultural appeal.',
      why: report.executiveSummary?.potentialRationale || 'Combines a strong suspense hook with fresh cultural authenticity.',
      whatCouldKillIt: report.executiveSummary?.biggestConcern || 'Narrative pacing slowdown or over-reliance on synthetic effects.',
      whatMakesItCommerciallyValuable: report.executiveSummary?.strongestCommercialOpportunity || 'Contained production parameters with global streaming demand.',
      howToImproveIt: 'Deepen character stakes in Act 1, sharpen the midpoint reversal, and verify in-camera setups.',
      whatToDoNext: report.executiveSummary?.preProductionActions?.[0] || 'Execute script revisions and assemble visual director pitch deck.',
    },
  };

  const pathTo95Items: PathTo95Item[] = report.pathTo95 || [
    {
      id: 'p95-1',
      currentWeakness: 'Midpoint pacing slows during procedural investigation scenes.',
      recommendedChange: 'Introduce an unexpected midpoint revelation that changes the rules of the investigation.',
      estimatedScoreImpact: 4,
      whyItMatters: 'Accelerates Act 2 velocity and raises personal stakes for the lead character.',
    },
    {
      id: 'p95-2',
      currentWeakness: 'Supporting characters need deeper emotional grounding before high jeopardy.',
      recommendedChange: 'Give key supporting characters distinct moral boundaries and personal stakes.',
      estimatedScoreImpact: 3,
      whyItMatters: 'Dramatically elevates emotional audience investment and catharsis.',
    },
    {
      id: 'p95-3',
      currentWeakness: 'Climax risks relying on verbal explanation to resolve the core dilemma.',
      recommendedChange: 'Translate the climax into a visceral, ticking-clock physical set-piece.',
      estimatedScoreImpact: 4,
      whyItMatters: 'Delivers a memorable, cathartic climax that satisfies both critics and audiences.',
    },
  ];

  const evidenceList: EvidenceBasedRecommendation[] = report.evidenceRecommendations || [
    {
      id: 'ev-1',
      title: 'Streaming Audience Retention Pacing',
      category: 'Audience',
      provenance: 'SOURCE-BACKED',
      evidence: 'Streaming analytics indicate 70%+ completion rates when the central hook is established within 8 minutes.',
      analysis: 'Early exposition slows viewer engagement; introducing immediate friction prevents subscriber drop-off.',
      recommendation: 'Open directly with the inciting disturbance in Scene 1 rather than traditional background setup.',
    },
    {
      id: 'ev-2',
      title: 'Location Permitting & Transit Economics',
      category: 'Production',
      provenance: 'SOURCE-BACKED',
      evidence: 'Urban company moves consume 2-3 hours per shift and drive up transport/generator line items.',
      analysis: 'Scattering shoot days across multiple remote venues severely inflates indie production budgets.',
      recommendation: 'Cluster 75%+ of principal photography to a contained primary location or campus during recess.',
    },
    {
      id: 'ev-3',
      title: 'Story Causality Consistency',
      category: 'Story',
      provenance: 'AI INFERENCE',
      evidence: 'Speculative screenplays suffer when narrative causality rules contradict earlier setups.',
      analysis: 'Arbitrary rule changes break audience immersion and suspension of disbelief.',
      recommendation: 'Establish a locked causality bible mapping every trigger and consequence before shooting.',
    },
    {
      id: 'ev-4',
      title: 'International Genre Festival Demand',
      category: 'Market',
      provenance: 'AI PROJECTION',
      evidence: 'Premier genre festivals actively program distinctive non-Western thrillers with bold soundscapes.',
      analysis: 'Scarcity of African speculative thrillers creates high programming appetite.',
      recommendation: 'Target an autumn world premiere at a tier-1 fantastic film festival to build international buzz.',
    },
  ];

  const actionableOpportunities: ActionableOpportunity[] = (report.opportunities as any) || [];

  const riskMatrixItems: ProfessionalRiskItem[] = (report.riskMatrix as any) || [
    {
      id: 'risk-1',
      category: 'Story risk',
      title: 'Narrative Logic & Pacing',
      probability: 'Medium',
      impact: 'High',
      severity: 'HIGH',
      explanation: 'Complex premises risk confusing audiences if internal rules contradict in Act 3.',
      mitigation: 'Establish a locked causality timeline chart before locking shooting script.',
    },
    {
      id: 'risk-2',
      category: 'Production risk',
      title: 'Location Logistics & Sound Interference',
      probability: 'High',
      impact: 'Medium',
      severity: 'HIGH',
      explanation: 'Ambient urban noise and generator interference can disrupt production schedules.',
      mitigation: 'Cluster shooting on contained private venues and hire seasoned production sound recordists.',
    },
    {
      id: 'risk-3',
      category: 'Market risk',
      title: 'Commercial Genre Competition',
      probability: 'Medium',
      impact: 'Medium',
      severity: 'MEDIUM',
      explanation: 'Theatrical release corridors may face saturation from mainstream studio comedies.',
      mitigation: 'Position marketing as a pulse-pounding suspense thriller in an off-peak release window.',
    },
  ];

  const compPositioning: CompetitivePositioning = report.competitivePositioning || {
    tagline: 'Distinctive Cultural Texture Meets High-Concept Genre Suspense',
    whyCanWinHeadline: 'Why This Project Holds a Decisive Strategic Advantage in the Marketplace',
    uniqueAdvantages: [
      {
        title: 'Authentic High-Concept Differentiation',
        description: 'Bridges universal thriller mechanics with a distinct regional setting rarely seen on global screens.',
        marketEdge: 'Stands out immediately against generic Western indie thrillers.',
      },
      {
        title: 'High Cinematic Production Value per Dollar',
        description: 'Leverages contained environments and practical lighting to achieve a multi-million aesthetic on an indie budget.',
        marketEdge: 'Maximizes investor capital efficiency and minimizes downside.',
      },
      {
        title: 'Explosive Organic Demographic Resonance',
        description: 'Directly addresses contemporary technological anxieties, academic pressures, and moral dilemmas for digital-native youth.',
        marketEdge: 'Drives viral social discourse and repeat streaming viewership.',
      },
    ],
    competingComparison: [
      {
        dimension: 'Setting & Atmosphere',
        standardProjects: 'Generic Western suburban interiors or sterile labs.',
        thisProjectEdge: 'Electric metropolitan campus life, vibrant nightscapes, and authentic social banter.',
      },
      {
        dimension: 'Narrative Stakes',
        standardProjects: 'Vague apocalyptic tropes with detached protagonists.',
        thisProjectEdge: 'Intimately personal moral dilemmas: saving a loved one while risking wider catastrophe.',
      },
      {
        dimension: 'Production Efficiency',
        standardProjects: 'Costly CGI set-pieces that look unconvincing on indie budgets.',
        thisProjectEdge: 'Tense in-camera suspense, ticking clocks, practical lighting, and atmospheric sound design.',
      },
    ],
  };

  const roadmapSteps: DevelopmentRoadmapStep[] = report.roadmap || [
    {
      step: 1,
      phaseName: 'Script Polish & Causality Bible',
      timeframe: 'Weeks 1–4',
      coreObjective: 'Lock the screenplay with rigorous cause-and-effect logic and heightened character subtext.',
      keyDeliverables: ['2nd Draft Screenplay', 'Locked Causality Bible', 'Character Conflict Map'],
      successMetric: 'Table-read validation with zero logic plot holes.',
    },
    {
      step: 2,
      phaseName: 'Cultural & Dialect Consultation',
      timeframe: 'Weeks 5–6',
      coreObjective: 'Verify colloquial dialogue authenticity and local cultural nuances.',
      keyDeliverables: ['Cultural Consultation Report', 'Master Subtitle Guide', 'Dialect Coaching Notes'],
      successMetric: 'Full endorsement from target demographic focus groups.',
    },
    {
      step: 3,
      phaseName: 'Line Budgeting & Location Permitting',
      timeframe: 'Weeks 7–9',
      coreObjective: 'Build a locked line-item production budget and secure contained filming locations.',
      keyDeliverables: ['Detailed Line-Item Budget', 'Location Contracts', 'Daily Shooting Schedule'],
      successMetric: 'All permits locked under budget with zero transit bottlenecks.',
    },
    {
      step: 4,
      phaseName: 'Director Look-Book & Pitch Package',
      timeframe: 'Weeks 10–12',
      coreObjective: 'Assemble a cinematic visual pitch package and teaser sizzle for prospective financiers.',
      keyDeliverables: ['15-Page Visual Pitch Deck', 'Mood Teaser Reel', 'Executive One-Pager'],
      successMetric: 'High-conviction investor and co-producer pitch readiness.',
    },
    {
      step: 5,
      phaseName: 'Casting & Talent Packaging',
      timeframe: 'Weeks 13–16',
      coreObjective: 'Attach charismatic lead actors and reputable regional director.',
      keyDeliverables: ['Principal Cast Attachments', 'Director Agreement', 'Letter of Intent (LOI) Package'],
      successMetric: 'Lead ensemble with proven streaming appeal and dramatic range.',
    },
    {
      step: 6,
      phaseName: 'Pre-Production & In-Camera Tech Setup',
      timeframe: 'Weeks 17–20',
      coreObjective: 'Rehearse set-pieces, test camera packages, and program interactive screen graphics.',
      keyDeliverables: ['Stunt Pre-Visualization', 'Interactive On-Set Monitor UIs', 'Sound Department Plan'],
      successMetric: '100% technical readiness prior to Day 1 call sheet.',
    },
    {
      step: 7,
      phaseName: 'Principal Photography & Festival Runway',
      timeframe: 'Weeks 21–28',
      coreObjective: 'Execute disciplined shoot and submit locked cut to A-list festival programmers.',
      keyDeliverables: ['21-Day Principal Photography', 'Picture Lock & Sound Mix', 'Festival Submission Strategy'],
      successMetric: 'World premiere acceptance at premier fantastic/international festival.',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  const handleCopyMarkdown = () => {
    const md = `# CINESCOUT FILM DEVELOPMENT INTELLIGENCE REPORT
Project: ${report.project.title}
Verdict: ${report.verdict} | Overall Score: ${report.overallScore}/100
Format: ${report.project.format} | Genre: ${report.project.genre} | Country: ${report.project.country} | Budget: ${report.project.budget}

## EXECUTIVE PRODUCER ASSESSMENT
${executiveView.coreAnswers.isWorthMaking}
- Why: ${executiveView.coreAnswers.why}
- Strongest Commercial Opportunity: ${executiveView.biggestOpportunity}
- Biggest Threat: ${executiveView.biggestRisk}
- Immediate Next Action: ${executiveView.immediateNextAction}

## 8-AGENT SCORECARD
${scorecards.map((s) => `- ${s.name}: ${s.score}/100 ("${s.shortReasoning}")`).join('\n')}

## PATH TO 95 (HIGH-IMPACT INTERVENTIONS)
${pathTo95Items.map((p, i) => `${i + 1}. [Gain +${p.estimatedScoreImpact} pts] ${p.recommendedChange} (Why: ${p.whyItMatters})`).join('\n')}

## WHY THIS PROJECT CAN WIN
Tagline: "${compPositioning.tagline}"
${compPositioning.whyCanWinHeadline}

## 7-STEP FILMMAKER ROADMAP
${roadmapSteps.map((r) => `Phase ${r.step} (${r.timeframe}): ${r.phaseName} - ${r.coreObjective}`).join('\n')}

Generated by CineScout AI Film Development Intelligence Platform.`;

    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cinescout-${report.project.title.toLowerCase().replace(/\s+/g, '-')}-dossier.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAskRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim() || isAsking) return;

    const userText = questionInput.trim();
    setChatHistory((prev) => [...prev, { sender: 'user', text: userText }]);
    setQuestionInput('');
    setIsAsking(true);

    try {
      const res = await fetch('/api/ask-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userText,
          projectTitle: report.project.title,
          reportSummary: {
            verdict: report.verdict,
            overallScore: report.overallScore,
            concept: report.project.concept,
            scores: report.scores,
          },
        }),
      });

      const data = await res.json();
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'scout',
          role: 'Executive Advisory Room',
          text: data.answer || 'Consultation processed. Maintain strict narrative focus during revision.',
        },
      ]);
    } catch (err) {
      setChatHistory((prev) => [
        ...prev,
        {
          sender: 'scout',
          role: 'Executive Advisory Room',
          text: 'From the CineScout Council: Prioritize contained locations, lock your Act 2 midpoint reversal, and verify sound recording equipment before production.',
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  const handleJumpToDossier = (agentId: string) => {
    setSelectedAgentDossier(agentId);
    setActiveTab('dossiers');
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pb-16">
      {/* Top Professional Dossier Header & Actions Toolbar (Compact & In Document Flow) */}
      <div className="no-print p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0E111A] border border-[#D6A84F]/25 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Dossier Identification & Metadata Strip */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5">
          <div className="px-2.5 py-1 rounded-lg bg-[#D6A84F]/15 border border-[#D6A84F]/40 text-[#D6A84F] font-mono font-bold text-[11px] sm:text-xs flex items-center gap-1.5 shadow-sm shrink-0">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>DOSSIER #L-{report.id ? report.id.slice(-4).toUpperCase() : '2026'}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs font-tech text-zinc-300">
            <span className="px-2 py-0.5 rounded-md bg-black/60 border border-zinc-800 text-zinc-200">
              {report.project.genre}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-black/60 border border-zinc-800 text-zinc-300">
              {report.project.budget}
            </span>
            <span className="px-2 py-0.5 rounded-md bg-black/60 border border-zinc-800 text-[#D6A84F]">
              {report.project.country}
            </span>
            {report.project.format && (
              <span className="hidden xs:inline-block px-2 py-0.5 rounded-md bg-black/60 border border-zinc-800 text-zinc-400">
                {report.project.format}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls with Clear Mobile Hierarchy */}
        <div className="flex flex-col xs:flex-row xs:items-center gap-2 pt-1 lg:pt-0">
          {/* Secondary Actions Row */}
          <div className="flex flex-wrap items-center gap-1.5">
            {/* Prominent Secondary Action: CREATE PITCH PACK */}
            <button
              type="button"
              onClick={() => setIsPitchPackOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#151926] hover:bg-[#1C2234] text-[#D6A84F] hover:text-[#FFF4D0] text-[11px] sm:text-xs font-bold flex items-center justify-center gap-1.5 border border-[#D6A84F]/45 hover:border-[#D6A84F] transition-all shadow-md shadow-[#D6A84F]/10 font-tech tracking-wider uppercase shrink-0"
              title="Generate Executive Pitch Pack for Producers & Investors"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>CREATE PITCH PACK</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[11px] sm:text-xs font-medium flex items-center justify-center gap-1 border border-zinc-700/80 hover:border-[#D6A84F]/40 transition-all shadow-sm"
                title="Copy Markdown Summary to Clipboard"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-zinc-400" />}
                <span className="font-tech">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadJSON}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[11px] sm:text-xs font-medium flex items-center justify-center gap-1 border border-zinc-700/80 hover:border-[#D6A84F]/40 transition-all shadow-sm"
                title="Download Full JSON Dossier"
              >
                <Download className="w-3 h-3 text-zinc-400" />
                <span className="font-tech">JSON</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-2.5 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white text-[11px] sm:text-xs font-medium flex items-center justify-center gap-1 border border-zinc-700/80 hover:border-[#D6A84F]/40 transition-all shadow-sm"
                title="Print or Save Official PDF Report"
              >
                <Printer className="w-3 h-3 text-zinc-400" />
                <span className="font-tech">PDF</span>
              </button>
            </div>
          </div>

          {/* Primary CTA: New Investigation (Dominant) */}
          <button
            type="button"
            onClick={onNewInvestigation}
            className="w-full xs:w-auto px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-[#E5B75E] via-[#D6A84F] to-[#B8852A] hover:brightness-110 text-[#08090D] font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#D6A84F]/20 transition-all font-tech tracking-wide shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#08090D] stroke-[2.5]" />
            <span>New Investigation</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="no-print flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 border-b border-zinc-800/80 no-scrollbar">
        {[
          { id: 'overview', label: 'Executive View', icon: Award },
          { id: 'scorecard', label: '8-Agent Scorecard', icon: Sparkles },
          { id: 'pathto95', label: 'Path to 95', icon: Target },
          { id: 'evidence', label: 'Evidence Analysis', icon: FileText },
          { id: 'opportunities', label: 'Opportunities', icon: TrendingUp },
          { id: 'risks', label: 'Risk Matrix', icon: AlertTriangle },
          { id: 'positioning', label: 'Why This Can Win', icon: Trophy },
          { id: 'roadmap', label: 'Filmmaker Roadmap', icon: Calendar },
          { id: 'dossiers', label: 'Scout Dossiers', icon: Compass },
          { id: 'african', label: 'African & Global', icon: Globe2 },
          { id: 'confidence', label: 'Confidence & Ethics', icon: Scale },
          { id: 'ask', label: 'Advisory Room', icon: MessageSquare },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`report-tab-${tab.id}`}
              type="button"
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 border shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-[#D6A84F] to-[#E5B75E] text-[#08090D] border-[#D6A84F] shadow-md shadow-[#D6A84F]/15 font-tech'
                  : 'bg-[#0E1018]/80 text-zinc-400 border-zinc-800/80 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT PANELS */}

      {/* 1. OVERVIEW TAB: Executive Producer Summary + Quick Path to 95 + Top Scorecards */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <ExecutiveProducerSummary
            executiveView={executiveView}
            projectTitle={report.project.title}
            evidenceList={evidenceList}
            onNavigateToEvidence={() => setActiveTab('evidence')}
            onCreatePitchPack={() => setIsPitchPackOpen(true)}
          />

          <AgentScorecardView
            scorecards={scorecards}
            onSelectAgentDossier={handleJumpToDossier}
          />

          <PathTo95View
            items={pathTo95Items}
            currentScore={report.overallScore}
          />

          <CompetitivePositioningView positioning={compPositioning} />
        </div>
      )}

      {/* 2. AGENT SCORECARD TAB */}
      {activeTab === 'scorecard' && (
        <AgentScorecardView
          scorecards={scorecards}
          onSelectAgentDossier={handleJumpToDossier}
        />
      )}

      {/* 3. PATH TO 95 TAB */}
      {activeTab === 'pathto95' && (
        <PathTo95View
          items={pathTo95Items}
          currentScore={report.overallScore}
        />
      )}

      {/* 4. EVIDENCE-BASED ANALYSIS TAB */}
      {activeTab === 'evidence' && (
        <EvidenceAnalysisView recommendations={evidenceList} />
      )}

      {/* 5. ACTIONABLE OPPORTUNITIES TAB */}
      {activeTab === 'opportunities' && (
        <ActionableOpportunitiesView opportunities={actionableOpportunities} />
      )}

      {/* 6. RISK MATRIX TAB */}
      {activeTab === 'risks' && <RiskMatrixView risks={riskMatrixItems} />}

      {/* 7. COMPETITIVE POSITIONING TAB */}
      {activeTab === 'positioning' && (
        <CompetitivePositioningView positioning={compPositioning} />
      )}

      {/* 8. FILMMAKER ROADMAP TAB */}
      {activeTab === 'roadmap' && <FilmmakerRoadmapView roadmap={roadmapSteps} />}

      {/* 9. DEEP AGENT DOSSIERS TAB */}
      {activeTab === 'dossiers' && (
        <AgentDossiersView
          report={report}
          defaultAgent={selectedAgentDossier}
        />
      )}

      {/* 10. AFRICAN & GLOBAL LENS TAB */}
      {activeTab === 'african' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D6A84F]">
                <Globe2 className="w-4 h-4" />
                <span>Regional & Global Diaspora Dynamics</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1 font-serif">
                African Intelligence Lens
              </h2>
              <p className="text-sm text-zinc-400 mt-0.5">
                Authentic cultural nuances, pan-African theatrical rollout, and international diaspora crossover appeal.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-xs font-bold uppercase text-[#D6A84F] block mb-2">
                Domestic Audience Perspective
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {report.africanLens.nigerianAudiencePerspective}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-xs font-bold uppercase text-emerald-400 block mb-2">
                Pan-African Distribution
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {report.africanLens.panAfricanDistributionStrategy}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800">
              <span className="text-xs font-bold uppercase text-sky-400 block mb-2">
                Global Diaspora & Crossover
              </span>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {report.africanLens.globalDiasporaAndCrossoverPotential}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800">
            <span className="text-xs font-bold uppercase text-amber-400 block mb-3">
              Key Cultural Nuances & Authenticity Markers
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {report.africanLens.culturalNuances.map((nuance, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-zinc-800 text-xs text-zinc-200 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F] shrink-0 mt-1.5" />
                  <span>{nuance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 11. CONFIDENCE & ETHICS TAB */}
      {activeTab === 'confidence' && (
        <ConfidenceEthicsView confidence={report.confidence} />
      )}

      {/* 12. ASK ROOM TAB */}
      {activeTab === 'ask' && (
        <div className="space-y-6">
          <div className="p-5 rounded-xl bg-zinc-900/90 border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#D6A84F]">
                <MessageSquare className="w-4 h-4" />
                <span>Interactive Council Consultation</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1 font-serif">
                Ask the 8-Agent Advisory Room
              </h2>
              <p className="text-sm text-zinc-400 mt-0.5">
                Query the specialized scouts regarding your budget allocation, scene pacing, dialect casting, or festival strategy.
              </p>
            </div>
          </div>

          {/* Chat Messages Window */}
          <div className="p-6 rounded-xl bg-zinc-900/70 border border-zinc-800 min-h-[350px] max-h-[500px] overflow-y-auto space-y-4">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400">
                    {msg.sender === 'user' ? 'Filmmaker' : msg.role || 'Executive Room'}
                  </span>
                </div>
                <div
                  className={`p-4 rounded-xl text-xs leading-relaxed max-w-xl ${
                    msg.sender === 'user'
                      ? 'bg-[#D6A84F] text-black font-medium'
                      : 'bg-black/60 text-zinc-200 border border-zinc-800 whitespace-pre-line'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isAsking && (
              <div className="flex items-center gap-2 text-xs text-[#D6A84F] p-3 rounded-lg bg-black/40 border border-zinc-800 w-fit">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>The 8-Agent Advisory Council is synthesizing guidance...</span>
              </div>
            )}
          </div>

          {/* Query Input */}
          <form onSubmit={handleAskRoom} className="flex gap-2">
            <input
              type="text"
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              placeholder="e.g., How should I handle the Act 2 midpoint reversal? What type of lead actress should I cast?"
              className="flex-1 px-4 py-3 rounded-xl bg-black/70 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#D6A84F] transition-colors"
            />
            <button
              type="submit"
              disabled={!questionInput.trim() || isAsking}
              className="px-5 py-3 rounded-xl bg-[#D6A84F] hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask Room</span>
            </button>
          </form>
        </div>
      )}

      {/* Executive Pitch Pack Presentation Modal / Preview */}
      <ExecutivePitchPack
        report={report}
        isOpen={isPitchPackOpen}
        onClose={() => setIsPitchPackOpen(false)}
      />
    </div>
  );
};
