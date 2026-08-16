export type BudgetLevel = 
  | 'Micro (<$50k)' 
  | 'Low ($50k–$250k)' 
  | 'Low ($50k-$250k)' 
  | 'Medium ($250k–$1M)' 
  | 'Medium ($250k-$1M)' 
  | 'High ($1M+)' 
  | 'Unknown';

export type FilmFormat = 
  | 'Feature Film' 
  | 'Short Film' 
  | 'Series' 
  | 'Limited Series' 
  | 'Documentary' 
  | 'Other';

export type IntelligenceDepth = 'quick' | 'dossier' | 'room';

export type AnalysisDimensionId = 
  | 'concept'
  | 'story'
  | 'character'
  | 'commercial'
  | 'audience'
  | 'production'
  | 'festival'
  | 'market'
  | 'risks';

export type VerdictType = 'GREENLIGHT' | 'DEVELOP' | 'REVISE' | 'REWORK' | 'PASS';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export type EvidenceCategory = 'Audience' | 'Market' | 'Production' | 'Cultural' | 'Competition' | 'Story' | 'Distribution';

export type PriorityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export type ProvenanceType = 'SOURCE-BACKED' | 'AI INFERENCE' | 'AI PROJECTION';
export type ClaimBasisType = 'SOURCE' | 'INFERENCE' | 'PROJECTION';

export interface EvidenceSourceDetails {
  sourceTitle: string;
  sourceType: 'Industry Benchmark' | 'Audience Research' | 'Festival Guidelines' | 'Box Office Data' | 'Trade Publication' | 'Production Logistics' | 'Film Policy' | string;
  organization?: string;
  publication?: string;
  date?: string;
  url?: string;
}

export interface VerdictReasonItem {
  type: 'positive' | 'warning' | 'negative';
  text: string;
  basis?: ClaimBasisType;
  provenance?: ProvenanceType;
  sourceDetails?: EvidenceSourceDetails;
}

export type RiskCategoryType = 
  | 'Story risk'
  | 'Production risk'
  | 'Market risk'
  | 'Audience risk'
  | 'Cultural authenticity risk'
  | 'Technical/VFX risk'
  | 'Distribution risk';

export interface FilmProjectInput {
  title: string;
  genre: string;
  genres?: string[];
  country: string;
  targetAudience: string;
  budget: BudgetLevel;
  format: FilmFormat;
  concept: string; // Logline
  themes?: string;
  comparableFilms?: string;
  directorVision?: string;
  culturalContext?: string;
  intelligenceDepth?: IntelligenceDepth;
  selectedDimensions?: string[];
  materialFileName?: string;
  materialFileSize?: string;
  materialFileContent?: string;
}

export interface AgentScorecardItem {
  id: string;
  name: string;
  role: string;
  score: number;
  shortReasoning: string;
  strongestFinding: string;
  biggestConcern: string;
  recommendation?: string;
}

export interface EvidenceBasedRecommendation {
  id: string;
  title: string;
  category: EvidenceCategory;
  provenance: ProvenanceType;
  basis?: ClaimBasisType;
  evidence: string;
  analysis: string;
  recommendation: string;
  sourceDetails?: EvidenceSourceDetails;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  isExternalUnavailable?: boolean;
}

export interface PathTo95Item {
  id: string;
  currentWeakness: string;
  recommendedChange: string;
  estimatedScoreImpact: number;
  whyItMatters: string;
}

export interface CoreExecutiveAnswers {
  isWorthMaking: string;
  why: string;
  whatCouldKillIt: string;
  whatMakesItCommerciallyValuable: string;
  howToImproveIt: string;
  whatToDoNext: string;
}

export interface ExecutiveProducerSummaryView {
  overallScore: number;
  verdict: VerdictType;
  commercialPotential: 'Very High' | 'High' | 'Moderate' | 'Niche' | 'Low' | 'Medium' | string;
  festivalPotential: 'Premier A-List' | 'Targeted Genre' | 'Regional Circuit' | 'Niche' | 'Low' | 'Medium' | 'High' | string;
  productionFeasibility: 'Highly Feasible' | 'Manageable' | 'Complex' | 'High Risk' | 'Low' | 'Medium' | 'High' | string;
  audiencePotential: string;
  biggestOpportunity: string;
  biggestRisk: string;
  immediateNextAction: string;
  coreAnswers: CoreExecutiveAnswers;
  whyThisVerdict?: VerdictReasonItem[] | string[];
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  commercialForecastDisclaimer?: string;
}

export interface ActionableOpportunity {
  id: string;
  category: 'Audience' | 'International' | 'Festival' | 'Streaming' | 'Production' | 'Commercial';
  title: string;
  opportunity: string;
  whyItMatters: string;
  recommendedAction: string;
  expectedImpact: string;
  priority: PriorityLevel;
}

export interface ProfessionalRiskItem {
  id: string;
  category: RiskCategoryType;
  title: string;
  probability: 'High' | 'Medium' | 'Low';
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  explanation: string;
  mitigation: string;
}

export interface CompetitiveAdvantageItem {
  title: string;
  description: string;
  marketEdge: string;
}

export interface CompetingComparisonItem {
  dimension: string;
  standardProjects: string;
  thisProjectEdge: string;
}

export interface CompetitivePositioning {
  tagline: string;
  whyCanWinHeadline: string;
  uniqueAdvantages: CompetitiveAdvantageItem[];
  competingComparison: CompetingComparisonItem[];
}

export interface DevelopmentRoadmapStep {
  step: number;
  phaseName: string;
  timeframe: string;
  coreObjective: string;
  keyDeliverables: string[];
  successMetric: string;
}

export interface ConceptScoutReport {
  score: number;
  premiseAnalysis: string;
  hookStrength: 'Exceptional' | 'Strong' | 'Moderate' | 'Weak';
  originalityIndex: string;
  emotionalEngine: string;
  narrativePotential: string;
  strengths: string[];
  weaknesses: string[];
}

export interface AudienceScoutReport {
  score: number;
  primaryAudience: string;
  secondaryAudience: string;
  ageDemographics: string;
  geographicMarkets: string[];
  audienceMotivations: string[];
  audienceRisks: string[];
}

export interface ComparableFilmItem {
  title: string;
  yearOrContext: string;
  genre: string;
  origin: 'African/Nigerian' | 'International' | 'Independent';
  whyComparable: string;
  whatItDidSuccessfully: string;
  howConceptDiffers: string;
}

export interface CompetitionScoutReport {
  score: number;
  comparableFilms: ComparableFilmItem[];
  competitiveLandscape: string;
  marketGapOpportunity: string;
  factualIntegrityNotice: string;
}

export interface MarketScoutReport {
  score: number;
  marketDemandRating: 'Very High' | 'High' | 'Moderate' | 'Niche';
  genrePopularityContext: string;
  theatricalPotential: string;
  streamingPotential: string;
  festivalPotential: string;
  africanMarketOutlook: string;
  internationalCrossover: string;
  verifiedInformation?: string;
  aiEstimate?: string;
  externalEvidenceStatus?: string;
  confidence?: 'HIGH' | 'MEDIUM' | 'LOW';
  commercialDisclaimer?: string;
}

export interface CultureScoutReport {
  score: number;
  culturalAuthenticityAnalysis: string;
  representationAssessment: string;
  languageAndSettingContext: string;
  culturalOpportunities: string[];
  flagsForHumanReview: string[];
}

export interface ProductionScoutReport {
  score: number;
  feasibilityRating: 'Highly Feasible' | 'Manageable' | 'Complex' | 'High Risk';
  locationsRequired: string[];
  castRequirements: string;
  vfxAndPracticalBalance: string;
  productionBottlenecks: string[];
  lowBudgetHacks: string[];
}

export interface StoryScoutReport {
  score: number;
  protagonistAnalysis: string;
  conflictAndStakes: string;
  structuralNotes: string;
  emotionalClimaxPayoff: string;
  franchiseOrSequelPotential: string;
  scriptDoctorNotes: string[];
}

export interface ExecutiveProducerReport {
  score: number;
  verdict: VerdictType;
  verdictHeadline: string;
  executiveRationale: string;
  strongestOpportunity: string;
  biggestWeakness: string;
  financialProductionRisk: string;
  creativeRisk: string;
  recommendedNextStep: string;
  investorPitchHook: string;
}

export interface AfricanIntelligenceLens {
  isApplicable: boolean;
  nigerianAudiencePerspective: string;
  panAfricanDistributionStrategy: string;
  globalDiasporaAndCrossoverPotential: string;
  culturalNuances: string[];
}

export interface AIConfidenceReport {
  level: 'HIGH' | 'MEDIUM' | 'LOW';
  confidenceScore: number;
  reasoning: string;
  inferencesVsFactsNotice: string;
  humanReviewRecommendations: string[];
}

export type ConfidenceAnalysis = AIConfidenceReport;

export interface FilmIntelligenceReport {
  id: string;
  createdAt: string;
  project: FilmProjectInput;
  overallScore: number;
  verdict: VerdictType;
  scores: {
    concept: number;
    audience: number;
    competition: number;
    market: number;
    culture: number;
    production: number;
    story: number;
    executive: number;
  };
  executiveProducerView: ExecutiveProducerSummaryView;
  agentScorecards: AgentScorecardItem[];
  evidenceRecommendations: EvidenceBasedRecommendation[];
  pathTo95: PathTo95Item[];
  competitivePositioning: CompetitivePositioning;
  roadmap: DevelopmentRoadmapStep[];
  opportunities: ActionableOpportunity[];
  riskMatrix: ProfessionalRiskItem[];
  // Legacy / Deep Scout agent dossiers for full drill-down
  agents: {
    concept: ConceptScoutReport;
    audience: AudienceScoutReport;
    competition: CompetitionScoutReport;
    market: MarketScoutReport;
    culture: CultureScoutReport;
    production: ProductionScoutReport;
    story: StoryScoutReport;
    executive: ExecutiveProducerReport;
  };
  africanLens: AfricanIntelligenceLens;
  confidence: AIConfidenceReport;
  whyThisVerdict?: VerdictReasonItem[] | string[];
  isDemo?: boolean;
}

export interface SavedProjectSummary {
  id: string;
  title: string;
  genre: string;
  country: string;
  budget: string;
  score: number;
  verdict: VerdictType;
  createdAt: string;
  isDemo?: boolean;
}
