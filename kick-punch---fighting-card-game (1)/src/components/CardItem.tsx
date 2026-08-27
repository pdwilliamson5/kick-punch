import React from 'react';
import { CombatCard } from '../types';
import { 
  Zap, Flame, Shield, RotateCcw, ArrowUp, Footprints, Swords, 
  Sparkles, Trophy, Wine, Skull, Scissors, Cpu, Biohazard, 
  Hand, Waves, Dumbbell, Hammer, ShieldOff, HeartPulse, 
  Package, ShieldAlert, Wind, HandMetal, Syringe, Cloud, Check, X, Minus
} from 'lucide-react';

interface CardItemProps {
  card: CombatCard;
  isSelected?: boolean;
  isDisabled?: boolean;
  isRevealed?: boolean;
  isFaceDown?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  showCost?: boolean;
  fighterColor?: string;
  showMatrixBreakdown?: boolean;
}

export const CardItem: React.FC<CardItemProps> = ({
  card,
  isSelected = false,
  isDisabled = false,
  isFaceDown = false,
  onClick,
  size = 'md',
  showCost = true,
  fighterColor = '#ef4444',
  showMatrixBreakdown = false
}) => {
  const getIcon = (name?: string, category?: string) => {
    const iconProps = { className: size === 'sm' ? "w-3.5 h-3.5" : size === 'lg' ? "w-6 h-6" : "w-4 h-4" };
    switch (name) {
      case 'Zap': return <Zap {...iconProps} />;
      case 'Flame': return <Flame {...iconProps} />;
      case 'Shield': return <Shield {...iconProps} />;
      case 'RotateCcw': return <RotateCcw {...iconProps} />;
      case 'ArrowUp': return <ArrowUp {...iconProps} />;
      case 'Footprints': return <Footprints {...iconProps} />;
      case 'Swords': return <Swords {...iconProps} />;
      case 'Sparkles': return <Sparkles {...iconProps} />;
      case 'Trophy': return <Trophy {...iconProps} />;
      case 'Wine': return <Wine {...iconProps} />;
      case 'Skull': return <Skull {...iconProps} />;
      case 'Scissors': return <Scissors {...iconProps} />;
      case 'Cpu': return <Cpu {...iconProps} />;
      case 'Biohazard': return <Biohazard {...iconProps} />;
      case 'Hand': return <Hand {...iconProps} />;
      case 'Waves': return <Waves {...iconProps} />;
      case 'Dumbbell': return <Dumbbell {...iconProps} />;
      case 'Hammer': return <Hammer {...iconProps} />;
      case 'ShieldOff': return <ShieldOff {...iconProps} />;
      case 'HeartPulse': return <HeartPulse {...iconProps} />;
      case 'Package': return <Package {...iconProps} />;
      case 'ShieldAlert': return <ShieldAlert {...iconProps} />;
      case 'Wind': return <Wind {...iconProps} />;
      case 'HandMetal': return <HandMetal {...iconProps} />;
      case 'Syringe': return <Syringe {...iconProps} />;
      case 'Cloud': return <Cloud {...iconProps} />;
      default:
        if (category === 'defense') return <Shield {...iconProps} />;
        if (category === 'counter') return <RotateCcw {...iconProps} />;
        if (category === 'aerial') return <ArrowUp {...iconProps} />;
        if (category === 'kick') return <Footprints {...iconProps} />;
        return <Zap {...iconProps} />;
    }
  };

  const getBadgeStyle = () => {
    if (card.type === 'finisher') {
      return 'bg-gradient-to-r from-amber-500 via-red-500 to-purple-600 text-white border-amber-300 shadow-lg shadow-red-500/30 animate-pulse';
    }
    if (card.type === 'special') {
      return 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-indigo-400';
    }
    return 'bg-zinc-800 text-zinc-200 border-zinc-600';
  };

  const getCategoryColor = () => {
    switch (card.category) {
      case 'strike': return 'text-amber-400 bg-amber-950/70 border-amber-800/80';
      case 'kick': return 'text-orange-400 bg-orange-950/70 border-orange-800/80';
      case 'defense': return 'text-blue-400 bg-blue-950/70 border-blue-800/80';
      case 'counter': return 'text-emerald-400 bg-emerald-950/70 border-emerald-800/80';
      case 'aerial': return 'text-purple-400 bg-purple-950/70 border-purple-800/80';
      case 'grapple': return 'text-red-400 bg-red-950/70 border-red-800/80';
      case 'tech': return 'text-teal-400 bg-teal-950/70 border-teal-800/80';
      default: return 'text-zinc-300 bg-zinc-800 border-zinc-700';
    }
  };

  // Face Down Back of Card
  if (isFaceDown) {
    return (
      <div 
        className={`relative rounded-xl border-2 border-zinc-700 bg-zinc-900 shadow-2xl flex flex-col items-center justify-center p-4 transition-transform ${
          size === 'sm' ? 'w-24 h-36' : size === 'lg' ? 'w-56 h-84' : 'w-36 sm:w-44 h-56 sm:h-68'
        }`}
      >
        <div className="absolute inset-1.5 rounded-lg border border-amber-500/40 bg-zinc-950 flex flex-col items-center justify-center p-2 text-center comic-dots">
          <div className="w-10 h-10 rounded-full border-2 border-amber-500/80 flex items-center justify-center bg-amber-500/10 mb-2">
            <Swords className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <span className="font-arcade text-lg tracking-wider text-amber-400 uppercase font-bold text-shadow-arcade">KICK / PUNCH</span>
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">HIDDEN MOVE</span>
        </div>
      </div>
    );
  }

  const sizeClasses = {
    sm: 'w-28 h-44 text-xs p-2',
    md: 'w-40 sm:w-48 h-64 sm:h-76 text-sm p-2.5',
    lg: 'w-60 sm:w-72 h-96 sm:h-[420px] text-base p-3.5'
  }[size];

  const displayPower = card.power !== undefined ? card.power : (card.damage || 0);

  return (
    <div
      id={`card-${card.id}`}
      onClick={isDisabled ? undefined : onClick}
      className={`relative select-none group rounded-xl border-2 transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer ${sizeClasses} ${
        isSelected
          ? 'ring-4 ring-amber-400 -translate-y-2.5 shadow-[0_0_25px_rgba(245,158,11,0.6)] border-amber-300 bg-zinc-950'
          : isDisabled
          ? 'opacity-40 grayscale cursor-not-allowed border-zinc-800 bg-black'
          : 'border-zinc-700 hover:border-amber-400 hover:-translate-y-1.5 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] bg-zinc-950'
      }`}
      style={{
        boxShadow: isSelected ? `0 0 25px ${fighterColor}99` : undefined
      }}
    >
      {/* Top Header: Move #, Title, Speed, Power */}
      <div>
        <div className="flex items-center justify-between gap-1 mb-1">
          {/* Move Number / Title Badge */}
          <div className="flex items-center gap-1">
            {card.moveNumber && (
              <span className="font-pixel text-[8px] px-1 py-0.5 rounded bg-zinc-900 text-amber-400 border border-zinc-700">
                #{card.moveNumber}
              </span>
            )}
            <span className={`font-pixel text-[7px] uppercase tracking-wider px-1.5 py-0.5 rounded border ${getCategoryColor()}`}>
              {card.category}
            </span>
          </div>

          {/* Super Meter Cost if applicable */}
          {showCost && card.superCost ? (
            <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-purple-950 border border-purple-400 text-purple-300 font-pixel text-[8px] shadow-[0_0_8px_rgba(168,85,247,0.5)]">
              <Sparkles className="w-2.5 h-2.5 text-purple-300" />
              <span>{card.superCost} SUPER</span>
            </div>
          ) : (
            <div 
              title={`Speed: ${card.speed} (Higher priority acts first)`}
              className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-950 border border-amber-400 text-amber-300 font-pixel text-[8px]"
            >
              <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400" />
              <span>SPD {card.speed}</span>
            </div>
          )}
        </div>

        {/* Card Title in Action Font */}
        <div className="flex items-center justify-between gap-1 mt-0.5 mb-1.5">
          <h4 className="font-arcade-action text-sm sm:text-base font-black tracking-wide text-zinc-100 uppercase truncate text-shadow-arcade">
            {card.moveNumber ? `${card.moveNumber}. ` : ''}{card.name}
          </h4>
          <div className="px-1.5 py-0.5 rounded bg-red-950 border border-red-600 text-red-300 font-pixel text-[8px] whitespace-nowrap">
            PWR {displayPower}
          </div>
        </div>
      </div>

      {/* Card Artwork Image Container */}
      <div className="relative w-full flex-1 rounded-lg overflow-hidden border-2 border-zinc-800 bg-black flex items-center justify-center my-1 group-hover:border-amber-400/70 transition-colors">
        {card.cardImage ? (
          <img
            src={card.cardImage}
            alt={card.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-2 text-center">
            <div className={`p-2.5 rounded-full border ${getBadgeStyle()} mb-1`}>
              {getIcon(card.iconName, card.category)}
            </div>
            <span className="font-arcade-action text-xs text-zinc-400">{card.name}</span>
          </div>
        )}

        {/* Floating Power Pill on bottom-right of image */}
        <div className="absolute bottom-1 right-1 bg-black/95 border border-amber-400 rounded px-1.5 py-0.5 text-[8px] font-pixel text-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]">
          PWR {displayPower}
        </div>
      </div>

      {/* Matrix Breakdown tags (Beats / Loses To) */}
      {(showMatrixBreakdown || size === 'lg') && card.beats && (
        <div className="my-1 space-y-0.5 text-[9px] leading-tight font-pixel text-[8px]">
          <div className="flex items-center gap-1 text-emerald-400 truncate">
            <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
            <span className="font-bold shrink-0">BEATS:</span>
            <span className="text-zinc-300 truncate">{card.beats.join(', ')}</span>
          </div>
          {card.losesTo && (
            <div className="flex items-center gap-1 text-red-400 truncate">
              <X className="w-2.5 h-2.5 text-red-400 shrink-0" />
              <span className="font-bold shrink-0">LOSES:</span>
              <span className="text-zinc-400 truncate">{card.losesTo.join(', ')}</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom Description / Effect Tags */}
      <div className="mt-0.5">
        <p className="text-[10px] sm:text-[11px] text-zinc-300 line-clamp-2 leading-tight">
          {card.description}
        </p>

        {card.effectTags && card.effectTags.length > 0 && size !== 'sm' && !showMatrixBreakdown && (
          <div className="mt-1 flex flex-wrap gap-1">
            {card.effectTags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="text-[8px] bg-zinc-900 text-amber-300 px-1.5 py-0.5 rounded border border-zinc-700 truncate max-w-full font-pixel text-[7px]">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Finisher Glow Accents */}
      {card.type === 'finisher' && (
        <div className="absolute inset-0 border-2 border-amber-400 rounded-xl pointer-events-none shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-pulse" />
      )}
    </div>
  );
};

