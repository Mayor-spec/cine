import React, { useState, useRef } from 'react';
import { FilmProjectInput, BudgetLevel, FilmFormat, IntelligenceDepth } from '../types';
import { FILM_PRESETS } from '../data/presets';
import {
  Sparkles,
  ArrowRight,
  UploadCloud,
  FileText,
  Check,
  CheckCircle2,
  X,
  AlertCircle,
  Clapperboard,
  Film,
  Globe,
  DollarSign,
  ChevronDown,
  Layers,
  ShieldAlert,
  Compass,
  FileCheck2,
  RotateCcw,
  SlidersHorizontal,
  ArrowLeft
} from 'lucide-react';

interface InputPanelProps {
  initialData?: FilmProjectInput;
  onSubmit: (data: FilmProjectInput) => void;
  onLaunchDemo: () => void;
  isLoading: boolean;
  onCancel?: () => void;
}

const FORMAT_OPTIONS: FilmFormat[] = [
  'Feature Film',
  'Short Film',
  'Series',
  'Documentary',
  'Other',
];

const GENRE_CHIPS = [
  'Drama',
  'Thriller',
  'Horror',
  'Sci-Fi',
  'Comedy',
  'Romance',
  'Crime',
  'Action',
  'Documentary',
  'Other',
];

const BUDGET_OPTIONS: BudgetLevel[] = [
  'Micro (<$50k)',
  'Low ($50k–$250k)',
  'Medium ($250k–$1M)',
  'High ($1M+)',
  'Unknown',
];

interface IntelligenceTier {
  id: IntelligenceDepth;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
}

const INTELLIGENCE_TIERS: IntelligenceTier[] = [
  {
    id: 'quick',
    title: 'QUICK SCOUT',
    badge: 'Fast',
    badgeColor: 'bg-zinc-800 text-zinc-300 border-zinc-700',
    description: 'Fast concept and market assessment',
  },
  {
    id: 'dossier',
    title: 'DEVELOPMENT DOSSIER',
    badge: 'Recommended',
    badgeColor: 'bg-[#D6A84F]/20 text-[#D6A84F] border-[#D6A84F]/40',
    description: 'Deep creative, commercial and production analysis',
  },
  {
    id: 'room',
    title: 'INDUSTRY ROOM',
    badge: 'Deepest',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Maximum-depth analysis across creative, market, audience, production and festival strategy',
  },
];

const ANALYSIS_DIMENSIONS = [
  { id: 'concept', label: 'Concept & Originality' },
  { id: 'story', label: 'Story & Structure' },
  { id: 'character', label: 'Character Potential' },
  { id: 'commercial', label: 'Commercial Potential' },
  { id: 'audience', label: 'Audience' },
  { id: 'production', label: 'Production Feasibility' },
  { id: 'festival', label: 'Festival Viability' },
  { id: 'market', label: 'Market Positioning' },
  { id: 'risks', label: 'Risks & Opportunities' },
];

export const InputPanel: React.FC<InputPanelProps> = ({
  initialData,
  onSubmit,
  onLaunchDemo,
  isLoading,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FilmProjectInput>(
    initialData || {
      title: '',
      genre: 'Sci-Fi',
      genres: ['Sci-Fi'],
      country: 'Nigeria',
      targetAudience: 'Urban African Youth (18-35) & Global Streamers',
      budget: 'Low ($50k–$250k)',
      format: 'Feature Film',
      concept: '',
      themes: '',
      comparableFilms: '',
      directorVision: '',
      culturalContext: '',
      intelligenceDepth: 'dossier',
      selectedDimensions: ANALYSIS_DIMENSIONS.map((d) => d.id),
    }
  );

  const [selectedGenres, setSelectedGenres] = useState<string[]>(() => {
    if (formData.genres && formData.genres.length > 0) return formData.genres;
    if (formData.genre) {
      const match = GENRE_CHIPS.filter((g) => formData.genre.includes(g));
      return match.length > 0 ? match : [formData.genre];
    }
    return ['Drama'];
  });

  const [customGenre, setCustomGenre] = useState(
    selectedGenres.find((g) => !GENRE_CHIPS.includes(g) && g !== 'Other') || ''
  );

  const [selectedDepth, setSelectedDepth] = useState<IntelligenceDepth>(
    formData.intelligenceDepth || 'dossier'
  );

  const [selectedDimensions, setSelectedDimensions] = useState<string[]>(
    formData.selectedDimensions || ANALYSIS_DIMENSIONS.map((d) => d.id)
  );

  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    type: string;
    extractedContent?: string;
  } | null>(
    formData.materialFileName
      ? {
          name: formData.materialFileName,
          size: formData.materialFileSize || 'Uploaded document',
          type: 'document',
          extractedContent: formData.materialFileContent,
        }
      : null
  );

  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Genre Toggle
  const handleToggleGenre = (genre: string) => {
    setSelectedGenres((prev) => {
      let updated: string[];
      if (prev.includes(genre)) {
        if (prev.length === 1) return prev; // Keep at least one
        updated = prev.filter((g) => g !== genre);
      } else {
        updated = [...prev, genre];
      }
      return updated;
    });
    if (validationError) setValidationError(null);
  };

  // Dimension Toggle
  const handleToggleDimension = (id: string) => {
    setSelectedDimensions((prev) => {
      if (prev.includes(id)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((d) => d !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Select all or reset dimensions
  const handleSelectAllDimensions = () => {
    setSelectedDimensions(ANALYSIS_DIMENSIONS.map((d) => d.id));
  };

  // Process uploaded file helper
  const processUploadedFile = (file: File) => {
    const sizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    // Check if plain text readable
    const isTextReadable = file.type.startsWith('text/') || 
      file.name.endsWith('.txt') || 
      file.name.endsWith('.md') || 
      file.name.endsWith('.json');

    if (isTextReadable) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const textContent = (event.target?.result as string) || '';
        // Truncate to first 30,000 characters if huge to prevent token overflows
        const trimmedContent = textContent.slice(0, 30000);
        setUploadedFile({
          name: file.name,
          size: sizeStr,
          type: file.type || 'Text Document',
          extractedContent: trimmedContent,
        });
      };
      reader.readAsText(file);
    } else {
      setUploadedFile({
        name: file.name,
        size: sizeStr,
        type: file.type || 'Document',
        extractedContent: undefined,
      });
    }
  };

  // File Upload Handlers
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 1-Click Presets Quick Fill
  const handleApplyPreset = (index: number) => {
    const preset = FILM_PRESETS[index];
    if (preset) {
      const pData = preset.data;
      setFormData(pData);
      
      const genreMatches = GENRE_CHIPS.filter((g) => pData.genre.includes(g));
      if (genreMatches.length > 0) {
        setSelectedGenres(genreMatches);
      } else {
        setSelectedGenres(['Other']);
        setCustomGenre(pData.genre);
      }

      setValidationError(null);
    }
  };

  const handleResetForm = () => {
    setFormData({
      title: '',
      genre: 'Drama',
      genres: ['Drama'],
      country: '',
      targetAudience: '',
      budget: 'Low ($50k–$250k)',
      format: 'Feature Film',
      concept: '',
      themes: '',
      comparableFilms: '',
      directorVision: '',
      culturalContext: '',
      intelligenceDepth: 'dossier',
      selectedDimensions: ANALYSIS_DIMENSIONS.map((d) => d.id),
    });
    setSelectedGenres(['Drama']);
    setCustomGenre('');
    setSelectedDepth('dossier');
    setSelectedDimensions(ANALYSIS_DIMENSIONS.map((d) => d.id));
    setUploadedFile(null);
    setValidationError(null);
  };

  // Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanTitle = formData.title.trim();
    const cleanLogline = formData.concept.trim();

    if (!cleanTitle && !cleanLogline) {
      setValidationError('Please provide a Project Title and Logline to begin the investigation.');
      return;
    }

    if (!cleanTitle) {
      setValidationError('Project Title is required.');
      return;
    }

    if (!cleanLogline) {
      setValidationError('Logline is required so CineScout can evaluate the core premise.');
      return;
    }

    setValidationError(null);

    // Format final genres
    let finalGenres = [...selectedGenres];
    if (selectedGenres.includes('Other') && customGenre.trim()) {
      finalGenres = finalGenres.filter((g) => g !== 'Other').concat(customGenre.trim());
    }
    const primaryGenre = finalGenres.join(' / ') || 'Drama';

    const payload: FilmProjectInput = {
      ...formData,
      title: cleanTitle,
      concept: cleanLogline,
      genre: primaryGenre,
      genres: finalGenres,
      country: formData.country.trim() || 'Nigeria / Global',
      intelligenceDepth: selectedDepth,
      selectedDimensions: selectedDimensions,
      materialFileName: uploadedFile ? uploadedFile.name : undefined,
      materialFileSize: uploadedFile ? uploadedFile.size : undefined,
      materialFileContent: uploadedFile ? uploadedFile.extractedContent : undefined,
    };

    onSubmit(payload);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in" id="new-investigation-screen">
      {/* 2. HERO SECTION */}
      <div className="relative text-center mb-8 sm:mb-12">
        {/* Subtle cinematic decorative motif background */}
        <div className="absolute inset-0 -top-6 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-80 sm:w-[500px] h-32 sm:h-44 rounded-full bg-gradient-to-r from-[#D6A84F]/20 via-[#E5B75E]/30 to-transparent blur-3xl" />
        </div>

        {/* Eyebrow */}
        <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12141C] border border-[#D6A84F]/30 text-[#D6A84F] text-[11px] sm:text-xs font-tech font-bold uppercase tracking-widest mb-3.5 shadow-sm">
          <Clapperboard className="w-3.5 h-3.5 text-[#D6A84F]" />
          <span>NEW INVESTIGATION</span>
        </div>

        {/* Large Headline */}
        <h1 className="relative text-2xl sm:text-4xl lg:text-5xl font-bold text-[#F1EDE4] font-cinematic tracking-tight max-w-3xl mx-auto leading-tight sm:leading-tight">
          Turn a film idea into an industry intelligence report.
        </h1>

        {/* Supporting Text */}
        <p className="relative text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto mt-3 font-sans leading-relaxed">
          Submit your concept, screenplay, treatment, or pitch and let CineScout evaluate its creative, commercial, production and festival potential.
        </p>

        {/* Subtle Film Frame / Aspect Motif */}
        <div className="mt-4 flex items-center justify-center gap-2 opacity-60">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#D6A84F]" />
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F]/60" />
          </div>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#D6A84F]" />
        </div>
      </div>

      {/* Quick-Fill Presets Bar */}
      <div className="mb-8 p-3.5 sm:p-4 rounded-2xl bg-[#0E111A]/90 border border-zinc-800/90 shadow-lg">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 text-xs font-tech font-bold text-zinc-300 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D6A84F]" />
            <span>Try an Example Film Project (1-Click Fill)</span>
          </div>
          <button
            type="button"
            onClick={handleResetForm}
            className="text-[11px] font-tech text-zinc-400 hover:text-zinc-200 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-zinc-800"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {FILM_PRESETS.map((preset, index) => (
            <button
              key={preset.name}
              type="button"
              id={`input-preset-card-${index}`}
              onClick={() => handleApplyPreset(index)}
              className="p-2 sm:p-2.5 rounded-xl bg-black/40 hover:bg-[#141724] border border-zinc-800 hover:border-[#D6A84F]/50 text-left transition-all group shadow-sm"
            >
              <div className="text-xs font-tech font-bold text-[#F1EDE4] group-hover:text-[#D6A84F] truncate">
                {preset.name}
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-400 truncate mt-0.5">
                {preset.tag}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Form Submission */}
      <form onSubmit={handleSubmit} className="space-y-8" noValidate>
        {/* 7. VALIDATION ERROR MESSAGE */}
        {validationError && (
          <div
            id="investigation-validation-error"
            className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-3 shadow-lg animate-fade-in"
          >
            <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
            <span className="font-sans font-medium flex-1">{validationError}</span>
            <button
              type="button"
              onClick={() => setValidationError(null)}
              className="text-rose-400 hover:text-rose-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* 3. PROJECT INPUT CARD */}
        <div className="p-5 sm:p-8 rounded-3xl bg-[#0E111A] border border-zinc-800/90 shadow-2xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800/80">
            <div>
              <h2 className="text-lg sm:text-xl font-cinematic font-bold text-[#F1EDE4] tracking-wide">
                Tell us about the project
              </h2>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Core premise, format, and creative footprint
              </p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-[#12141C] border border-[#D6A84F]/30 flex items-center justify-center">
              <Film className="w-4 h-4 text-[#D6A84F]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* PROJECT TITLE */}
            <div className="space-y-2">
              <label
                htmlFor="film-title-input"
                className="block text-xs font-tech font-bold text-zinc-200 uppercase tracking-wider"
              >
                PROJECT TITLE <span className="text-[#D6A84F]">*</span>
              </label>
              <input
                id="film-title-input"
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (validationError) setValidationError(null);
                }}
                placeholder="e.g. The Last Signal"
                className="w-full px-4 py-3 rounded-xl bg-[#08090D] border border-zinc-700/80 focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] text-[#F1EDE4] placeholder-zinc-500 text-sm font-medium outline-none transition-all"
              />
            </div>

            {/* FORMAT DROPDOWN */}
            <div className="space-y-2">
              <label
                htmlFor="film-format-select"
                className="block text-xs font-tech font-bold text-zinc-200 uppercase tracking-wider"
              >
                FORMAT
              </label>
              <div className="relative">
                <select
                  id="film-format-select"
                  value={formData.format}
                  onChange={(e) =>
                    setFormData({ ...formData, format: e.target.value as FilmFormat })
                  }
                  className="w-full appearance-none px-4 py-3 rounded-xl bg-[#08090D] border border-zinc-700/80 focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] text-[#F1EDE4] text-sm font-medium outline-none transition-all pr-10 cursor-pointer"
                >
                  {FORMAT_OPTIONS.map((fmt) => (
                    <option key={fmt} value={fmt} className="bg-[#08090D] text-zinc-200">
                      {fmt}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* GENRE (Multi-Select Chips) */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-tech font-bold text-zinc-200 uppercase tracking-wider">
                GENRE <span className="text-zinc-500 text-[10px] lowercase">(select one or more)</span>
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              {GENRE_CHIPS.map((genre) => {
                const isSelected = selectedGenres.includes(genre);
                return (
                  <button
                    key={genre}
                    type="button"
                    id={`genre-chip-${genre.toLowerCase()}`}
                    onClick={() => handleToggleGenre(genre)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-tech font-semibold transition-all border shrink-0 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#D6A84F] text-[#08090D] border-[#D6A84F] shadow-sm font-bold'
                        : 'bg-[#08090D] text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    <span>{genre}</span>
                  </button>
                );
              })}
            </div>

            {selectedGenres.includes('Other') && (
              <div className="pt-1 animate-fade-in">
                <input
                  type="text"
                  value={customGenre}
                  onChange={(e) => {
                    setCustomGenre(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder="Specify custom genre (e.g. Afrofuturism / Neo-Noir / Folk Horror)"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#08090D] border border-zinc-700 focus:border-[#D6A84F] text-xs text-[#F1EDE4] placeholder-zinc-500 outline-none"
                />
              </div>
            )}
          </div>

          {/* LOCATION / MARKET & BUDGET RANGE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* LOCATION / MARKET */}
            <div className="space-y-2">
              <label
                htmlFor="film-location-input"
                className="block text-xs font-tech font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5"
              >
                <Globe className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>LOCATION / MARKET</span>
              </label>
              <input
                id="film-location-input"
                type="text"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="Nigeria, Ghana, South Africa, Global…"
                className="w-full px-4 py-3 rounded-xl bg-[#08090D] border border-zinc-700/80 focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] text-[#F1EDE4] placeholder-zinc-500 text-sm font-medium outline-none transition-all"
              />
            </div>

            {/* BUDGET RANGE (Dropdown) */}
            <div className="space-y-2">
              <label
                htmlFor="film-budget-select"
                className="block text-xs font-tech font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5"
              >
                <DollarSign className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>BUDGET RANGE</span>
              </label>
              <div className="relative">
                <select
                  id="film-budget-select"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value as BudgetLevel })
                  }
                  className="w-full appearance-none px-4 py-3 rounded-xl bg-[#08090D] border border-zinc-700/80 focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] text-[#F1EDE4] text-sm font-medium outline-none transition-all pr-10 cursor-pointer"
                >
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b} className="bg-[#08090D] text-zinc-200">
                      {b}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* LOGLINE (Large Textarea) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="film-logline-textarea"
                className="block text-xs font-tech font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5"
              >
                <FileText className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>LOGLINE <span className="text-[#D6A84F]">*</span></span>
              </label>
              <span className="text-[10px] font-tech text-zinc-400">
                {formData.concept.length} characters
              </span>
            </div>
            <textarea
              id="film-logline-textarea"
              rows={4}
              value={formData.concept}
              onChange={(e) => {
                setFormData({ ...formData, concept: e.target.value });
                if (validationError) setValidationError(null);
              }}
              placeholder="Describe the story in one or two compelling sentences…"
              className="w-full px-4 py-3 rounded-xl bg-[#08090D] border border-zinc-700/80 focus:border-[#D6A84F] focus:ring-1 focus:ring-[#D6A84F] text-[#F1EDE4] placeholder-zinc-500 text-xs sm:text-sm leading-relaxed outline-none transition-all resize-y"
            />
          </div>

          {/* PROJECT MATERIAL (Drag-and-Drop / Upload Area) */}
          <div className="space-y-2">
            <label className="block text-xs font-tech font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
              <UploadCloud className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>PROJECT MATERIAL</span>
            </label>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf,.docx,.doc,.txt"
              className="hidden"
              id="project-material-file-input"
            />

            {!uploadedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all text-center cursor-pointer ${
                  isDragging
                    ? 'border-[#D6A84F] bg-[#D6A84F]/10'
                    : 'border-zinc-800 hover:border-[#D6A84F]/50 bg-[#08090D]/60 hover:bg-[#08090D]'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#12141C] border border-[#D6A84F]/30 text-[#D6A84F] flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div className="text-xs sm:text-sm font-tech font-bold text-[#F1EDE4] mb-1">
                  Drop screenplay, treatment, pitch deck or project document
                </div>
                <p className="text-[11px] text-zinc-400 font-sans mb-3">
                  PDF, DOCX, TXT — optional
                </p>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-[#D6A84F] text-xs font-tech font-semibold transition-all inline-flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Browse files</span>
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 animate-fade-in">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-tech font-bold text-[#F1EDE4] truncate">
                      {uploadedFile.name}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono">
                      {uploadedFile.size} • Attached to investigation
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-rose-400 transition-colors"
                  title="Remove attached file"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4. ANALYSIS OPTIONS */}
        <div className="p-5 sm:p-8 rounded-3xl bg-[#0E111A] border border-zinc-800/90 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
            <div>
              <h2 className="text-lg sm:text-xl font-cinematic font-bold text-[#F1EDE4] tracking-wide">
                Choose your intelligence depth
              </h2>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Select the calibration level for the AI advisory room
              </p>
            </div>
            <div className="w-8 h-8 rounded-xl bg-[#12141C] border border-[#D6A84F]/30 flex items-center justify-center">
              <Layers className="w-4 h-4 text-[#D6A84F]" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {INTELLIGENCE_TIERS.map((tier) => {
              const isSelected = selectedDepth === tier.id;
              return (
                <button
                  key={tier.id}
                  type="button"
                  id={`depth-tier-${tier.id}`}
                  onClick={() => setSelectedDepth(tier.id)}
                  className={`p-4 rounded-2xl text-left border transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#141724] border-[#D6A84F] shadow-lg shadow-[#D6A84F]/10 ring-1 ring-[#D6A84F]'
                      : 'bg-[#08090D] border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/40'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`text-[10px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tier.badgeColor}`}>
                        {tier.badge}
                      </span>
                      {isSelected && (
                        <div className="w-4 h-4 rounded-full bg-[#D6A84F] text-[#08090D] flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="text-xs sm:text-sm font-cinematic font-bold text-[#F1EDE4] tracking-wider mb-1">
                      {tier.title}
                    </div>
                    <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                      {tier.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. ANALYSIS DIMENSIONS */}
        <div className="p-5 sm:p-8 rounded-3xl bg-[#0E111A] border border-zinc-800/90 shadow-2xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80">
            <div>
              <h2 className="text-base sm:text-lg font-cinematic font-bold text-[#F1EDE4] tracking-wide">
                Analysis Dimensions
              </h2>
              <p className="text-xs text-zinc-400 font-sans mt-0.5">
                Included perspectives in your executive synthesis
              </p>
            </div>
            <button
              type="button"
              onClick={handleSelectAllDimensions}
              className="text-[11px] font-tech text-[#D6A84F] hover:underline"
            >
              Select All
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {ANALYSIS_DIMENSIONS.map((dim) => {
              const isSelected = selectedDimensions.includes(dim.id);
              return (
                <button
                  key={dim.id}
                  type="button"
                  id={`dimension-chip-${dim.id}`}
                  onClick={() => handleToggleDimension(dim.id)}
                  className={`p-2.5 rounded-xl text-left border text-xs font-tech font-semibold transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#141724] border-[#D6A84F]/60 text-[#F1EDE4]'
                      : 'bg-[#08090D] border-zinc-800 text-zinc-400 hover:border-zinc-700'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? 'bg-[#D6A84F] border-[#D6A84F] text-[#08090D]'
                        : 'border-zinc-700 bg-zinc-900'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span className="truncate">{dim.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 6. PRIMARY CTA */}
        <div className="pt-2 text-center space-y-3">
          <button
            type="submit"
            id="run-investigation-btn"
            disabled={isLoading}
            className="w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-[#E5B75E] via-[#D6A84F] to-[#B8852A] hover:brightness-110 active:scale-[0.99] text-[#08090D] font-tech font-extrabold text-base sm:text-lg tracking-wider uppercase flex items-center justify-center gap-3 shadow-xl shadow-[#D6A84F]/25 hover:shadow-2xl hover:shadow-[#D6A84F]/40 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-3 border-[#08090D] border-t-transparent rounded-full animate-spin" />
                <span>INITIALIZING SCOUT ADVISORY ROOM...</span>
              </>
            ) : (
              <>
                <span>RUN INVESTIGATION</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform stroke-[2.5]" />
              </>
            )}
          </button>

          <p className="text-center text-[11px] sm:text-xs text-zinc-400 font-sans max-w-md mx-auto">
            CineScout will generate an AI development dossier from your submitted material.
          </p>

          {/* Cancel / Return Button */}
          {onCancel && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="text-xs font-tech text-zinc-400 hover:text-zinc-200 inline-flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to previous screen</span>
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
