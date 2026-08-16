import React, { useState } from 'react';
import { FilmIntelligenceReport, VerdictType } from '../types';
import {
  FolderArchive,
  Film,
  Award,
  Sparkles,
  Trash2,
  ExternalLink,
  Search,
  Copy,
  Plus,
  Compass,
  ArrowRight
} from 'lucide-react';

interface SavedProjectsProps {
  reports: FilmIntelligenceReport[];
  onOpenReport: (report: FilmIntelligenceReport) => void;
  onDuplicateReport: (report: FilmIntelligenceReport) => void;
  onDeleteReport: (reportId: string) => void;
  onStartNew: () => void;
  onLoadDemo: () => void;
}

export const SavedProjects: React.FC<SavedProjectsProps> = ({
  reports,
  onOpenReport,
  onDuplicateReport,
  onDeleteReport,
  onStartNew,
  onLoadDemo,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerdict, setFilterVerdict] = useState<string>('ALL');

  const filteredReports = reports.filter((r) => {
    const matchesSearch =
      r.project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.project.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.project.country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesVerdict = filterVerdict === 'ALL' || r.verdict === filterVerdict;

    return matchesSearch && matchesVerdict;
  });

  const getVerdictBadge = (verdict: VerdictType) => {
    switch (verdict) {
      case 'GREENLIGHT':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'DEVELOP':
        return 'bg-[#D6A84F]/20 text-[#D6A84F] border-[#D6A84F]/40';
      case 'REWORK':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'PASS':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D6A84F]/10 border border-[#D6A84F]/30 text-[#D6A84F] text-xs font-tech font-semibold mb-2">
            <FolderArchive className="w-3.5 h-3.5" />
            <span>Local Intelligence Archive</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#F1EDE4] font-cinematic">
            My Film Dossiers ({reports.length})
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Access, review, or duplicate previously scouted film projects.
          </p>
        </div>

        <button
          onClick={onStartNew}
          className="px-4 py-2.5 rounded-xl bg-[#D6A84F] hover:bg-[#E5B75E] text-[#08090D] font-tech font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Investigation</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      {reports.length > 0 && (
        <div className="mb-6 p-3.5 rounded-xl glass-panel flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search title, genre, country..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-[#0D0F17] border border-zinc-800 focus:border-[#D6A84F] text-xs text-[#F1EDE4] outline-none"
            />
          </div>

          {/* Verdict Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            <span className="text-[11px] font-tech text-zinc-400 font-bold uppercase mr-1">
              Verdict:
            </span>
            {['ALL', 'GREENLIGHT', 'DEVELOP', 'REWORK', 'PASS'].map((v) => (
              <button
                key={v}
                onClick={() => setFilterVerdict(v)}
                className={`px-2.5 py-1 rounded text-[11px] font-tech font-bold transition-all border ${
                  filterVerdict === v
                    ? 'bg-[#D6A84F]/20 text-[#D6A84F] border-[#D6A84F]'
                    : 'bg-[#11131A] text-zinc-400 border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {reports.length === 0 && (
        <div className="text-center py-16 px-4 rounded-2xl glass-panel-glow border-zinc-800">
          <div className="w-16 h-16 rounded-2xl bg-[#171A24] border border-[#D6A84F]/30 flex items-center justify-center mx-auto mb-4 text-[#D6A84F]">
            <FolderArchive className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-[#F1EDE4] font-cinematic mb-2">
            Your intelligence room is empty.
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md mx-auto mb-6">
            Investigate your first film concept to generate an evidence-informed film strategy, audience viability score, and executive producer verdict.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onStartNew}
              className="px-5 py-2.5 rounded-xl bg-[#D6A84F] hover:bg-[#E5B75E] text-[#08090D] font-tech font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Start your first investigation</span>
            </button>
            <button
              onClick={onLoadDemo}
              className="px-4 py-2.5 rounded-xl bg-[#11131A] hover:bg-[#171A24] border border-[#D6A84F]/40 text-[#F1EDE4] font-tech text-xs flex items-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Load Demo Case</span>
            </button>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      {filteredReports.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReports.map((r) => (
            <div
              key={r.id}
              className="p-5 rounded-xl glass-panel hover:border-[#D6A84F]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header with Verdict & Demo tag */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-tech font-extrabold px-2 py-0.5 rounded border ${getVerdictBadge(r.verdict)}`}>
                    {r.verdict}
                  </span>
                  {r.isDemo ? (
                    <span className="text-[10px] font-tech text-[#D6A84F] bg-[#D6A84F]/10 px-2 py-0.5 rounded border border-[#D6A84F]/30">
                      DEMO
                    </span>
                  ) : (
                    <span className="text-[10px] font-tech text-zinc-500">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Title & Concept */}
                <h3 className="text-base font-tech font-bold text-[#F1EDE4] group-hover:text-[#D6A84F] transition-colors line-clamp-1 mb-1">
                  {r.project.title}
                </h3>
                <p className="text-xs text-zinc-400 mb-2">
                  {r.project.genre} • {r.project.country}
                </p>
                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed mb-4">
                  {r.project.concept}
                </p>
              </div>

              {/* Score & Actions Footer */}
              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-tech uppercase tracking-wider text-zinc-500 block">
                    Overall Score
                  </span>
                  <span className="text-xl font-cinematic font-bold text-[#D6A84F]">
                    {r.overallScore}<span className="text-xs text-zinc-400">/100</span>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onDuplicateReport(r)}
                    className="p-2 rounded-lg bg-[#141722] hover:bg-[#1C2030] text-zinc-400 hover:text-white border border-zinc-700 transition-colors"
                    title="Duplicate Project"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onDeleteReport(r.id)}
                    className="p-2 rounded-lg bg-[#141722] hover:bg-rose-950/40 text-zinc-400 hover:text-rose-400 border border-zinc-700 hover:border-rose-500/40 transition-colors"
                    title="Delete Report"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenReport(r)}
                    className="px-3 py-1.5 rounded-lg bg-[#D6A84F] hover:bg-[#E5B75E] text-[#08090D] font-tech font-bold text-xs flex items-center gap-1 transition-all"
                  >
                    <span>Open</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
