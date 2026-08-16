import React from 'react';
import { CheckCircle2, BrainCircuit, TrendingUp, Info, ShieldCheck } from 'lucide-react';
import { ClaimBasisType, ProvenanceType } from '../../types';

interface EvidenceBadgeProps {
  basis?: ClaimBasisType | ProvenanceType | string;
  variant?: 'badge' | 'pill' | 'tag' | 'inline';
  size?: 'xs' | 'sm' | 'md';
  showIcon?: boolean;
  className?: string;
}

export const normalizeClaimType = (raw?: string): {
  type: 'SOURCE' | 'INFERENCE' | 'PROJECTION';
  label: string;
  definition: string;
} => {
  if (!raw) {
    return {
      type: 'INFERENCE',
      label: 'INFERENCE',
      definition: 'CineScout interpretation',
    };
  }

  const upper = raw.toUpperCase();
  if (upper.includes('SOURCE') || upper === 'VERIFIED') {
    return {
      type: 'SOURCE',
      label: 'SOURCE',
      definition: 'Verified external information',
    };
  }
  if (upper.includes('PROJECTION') || upper.includes('FORECAST') || upper.includes('ESTIMATE')) {
    return {
      type: 'PROJECTION',
      label: 'PROJECTION',
      definition: 'Forward-looking AI estimate',
    };
  }
  return {
    type: 'INFERENCE',
    label: 'INFERENCE',
    definition: 'CineScout interpretation',
  };
};

export const EvidenceBadge: React.FC<EvidenceBadgeProps> = ({
  basis,
  variant = 'badge',
  size = 'xs',
  showIcon = true,
  className = '',
}) => {
  const { type, label, definition } = normalizeClaimType(basis);

  const getStyle = () => {
    switch (type) {
      case 'SOURCE':
        return {
          container: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/35 hover:bg-emerald-500/20',
          dot: 'bg-emerald-400',
          icon: <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />,
        };
      case 'PROJECTION':
        return {
          container: 'bg-amber-500/15 text-amber-400 border-amber-500/35 hover:bg-amber-500/20',
          dot: 'bg-amber-400',
          icon: <TrendingUp className="w-3 h-3 text-amber-400 shrink-0" />,
        };
      case 'INFERENCE':
      default:
        return {
          container: 'bg-sky-500/15 text-sky-400 border-sky-500/35 hover:bg-sky-500/20',
          dot: 'bg-sky-400',
          icon: <BrainCircuit className="w-3 h-3 text-sky-400 shrink-0" />,
        };
    }
  };

  const style = getStyle();
  const sizeClasses =
    size === 'xs'
      ? 'text-[10px] px-1.5 py-0.5 tracking-wider'
      : size === 'sm'
      ? 'text-xs px-2 py-0.5 tracking-wide'
      : 'text-xs px-2.5 py-1 tracking-wide';

  if (variant === 'inline') {
    return (
      <span
        title={`${label}: ${definition}`}
        className={`inline-flex items-center gap-1 font-tech font-bold uppercase rounded border ${style.container} ${sizeClasses} ${className}`}
      >
        {showIcon && style.icon}
        <span>{label}</span>
      </span>
    );
  }

  if (variant === 'tag') {
    return (
      <span
        title={`${label}: ${definition}`}
        className={`inline-flex items-center gap-1 font-tech font-semibold uppercase text-[10px] tracking-wider px-1.5 py-0.2 rounded border ${style.container} ${className}`}
      >
        <span>[{label}]</span>
      </span>
    );
  }

  return (
    <span
      title={`${label}: ${definition}`}
      className={`inline-flex items-center gap-1.5 font-tech font-bold uppercase rounded-md border shadow-sm transition-colors ${style.container} ${sizeClasses} ${className}`}
    >
      {showIcon && style.icon}
      <span>{label}</span>
    </span>
  );
};

export const EvidenceLegend: React.FC<{ className?: string; compact?: boolean }> = ({
  className = '',
  compact = false,
}) => {
  if (compact) {
    return (
      <div
        className={`flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-tech text-zinc-400 p-2.5 rounded-lg bg-black/40 border border-zinc-800/80 ${className}`}
      >
        <span className="text-zinc-500 font-semibold uppercase tracking-wider text-[10px]">
          Evidence Standard:
        </span>
        <div className="flex items-center gap-1.5">
          <EvidenceBadge basis="SOURCE" size="xs" />
          <span className="text-zinc-300">Verified external info</span>
        </div>
        <div className="flex items-center gap-1.5">
          <EvidenceBadge basis="INFERENCE" size="xs" />
          <span className="text-zinc-300">CineScout interpretation</span>
        </div>
        <div className="flex items-center gap-1.5">
          <EvidenceBadge basis="PROJECTION" size="xs" />
          <span className="text-zinc-300">Forward-looking AI estimate</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-xl bg-[#090B10] border border-zinc-800 space-y-2 shadow-inner ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D6A84F] font-tech">
        <Info className="w-3.5 h-3.5" />
        <span>EVIDENCE & TRANSPARENCY LEGEND</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        <div className="p-2.5 rounded-lg bg-emerald-950/20 border border-emerald-500/25 flex items-start gap-2">
          <EvidenceBadge basis="SOURCE" size="xs" className="mt-0.5 shrink-0" />
          <div className="text-[11px] leading-snug">
            <span className="font-semibold text-emerald-300 block">SOURCE</span>
            <span className="text-zinc-400">Verified external information (e.g. historical data, archives, policy)</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-sky-950/20 border border-sky-500/25 flex items-start gap-2">
          <EvidenceBadge basis="INFERENCE" size="xs" className="mt-0.5 shrink-0" />
          <div className="text-[11px] leading-snug">
            <span className="font-semibold text-sky-300 block">INFERENCE</span>
            <span className="text-zinc-400">CineScout interpretation from filmmaker inputs & structural analysis</span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-amber-950/20 border border-amber-500/25 flex items-start gap-2">
          <EvidenceBadge basis="PROJECTION" size="xs" className="mt-0.5 shrink-0" />
          <div className="text-[11px] leading-snug">
            <span className="font-semibold text-amber-300 block">PROJECTION</span>
            <span className="text-zinc-400">Forward-looking AI estimate — not a guaranteed outcome</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ConfidenceBadge: React.FC<{
  level?: 'HIGH' | 'MEDIUM' | 'LOW' | string;
  reason?: string;
  className?: string;
}> = ({ level = 'HIGH', reason, className = '' }) => {
  const upper = (level || 'HIGH').toUpperCase();
  const isHigh = upper === 'HIGH';
  const isMed = upper === 'MEDIUM' || upper === 'MED';
  const isLow = upper === 'LOW';

  const badgeClass = isHigh
    ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/35'
    : isMed
    ? 'bg-[#D6A84F]/15 text-[#D6A84F] border-[#D6A84F]/35'
    : 'bg-rose-500/15 text-rose-400 border-rose-500/35';

  return (
    <div
      title={reason || `Analytical Confidence: ${upper}`}
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[10px] font-tech font-bold uppercase tracking-wider ${badgeClass} ${className}`}
    >
      <ShieldCheck className="w-3 h-3 shrink-0" />
      <span>{upper} CONFIDENCE</span>
    </div>
  );
};
