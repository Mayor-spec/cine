import { FilmIntelligenceReport, SavedProjectSummary } from '../types';
import { DEMO_INTELLIGENCE_REPORT } from '../data/demoData';

const STORAGE_KEY = 'cinescout_saved_reports_v1';

export function getSavedReports(): FilmIntelligenceReport[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed with demo report on first load so user has an immediate sample
      const initial = [DEMO_INTELLIGENCE_REPORT];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [DEMO_INTELLIGENCE_REPORT];
  } catch (e) {
    console.error('Error loading saved reports from localStorage:', e);
    return [DEMO_INTELLIGENCE_REPORT];
  }
}

export function saveReport(report: FilmIntelligenceReport): void {
  try {
    const existing = getSavedReports();
    const filtered = existing.filter((r) => r.id !== report.id);
    const updated = [report, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving report to localStorage:', e);
  }
}

export function deleteReport(reportId: string): FilmIntelligenceReport[] {
  try {
    const existing = getSavedReports();
    const updated = existing.filter((r) => r.id !== reportId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Error deleting report:', e);
    return [];
  }
}

export function getProjectSummaries(): SavedProjectSummary[] {
  const reports = getSavedReports();
  return reports.map((r) => ({
    id: r.id,
    title: r.project.title,
    genre: r.project.genre,
    country: r.project.country,
    budget: r.project.budget,
    score: r.overallScore,
    verdict: r.verdict,
    createdAt: r.createdAt,
    isDemo: r.isDemo,
  }));
}
