import React, { useState } from 'react';
import { Fighter, CombatCard } from '../types';
import { FIGHTERS } from '../data/fighters';
import { CardItem } from './CardItem';
import { sound } from '../utils/soundEffects';
import { Layers, Sparkles, Check, Plus, Trash2, ArrowRight } from 'lucide-react';

interface DeckBuilderProps {
  onEquipLoadout?: (fighterId: string, specials: CombatCard[], finisher: CombatCard) => void;
}

export const DeckBuilder: React.FC<DeckBuilderProps> = ({ onEquipLoadout }) => {
  const [activeFighter, setActiveFighter] = useState<Fighter>(FIGHTERS[0]);
  const [selectedSpecials, setSelectedSpecials] = useState<CombatCard[]>(FIGHTERS[0].specials.slice(0, 4));
  const [selectedFinisher, setSelectedFinisher] = useState<CombatCard>(FIGHTERS[0].finishers[0]);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSelectFighter = (fighter: Fighter) => {
    sound.playCardSelect();
    setActiveFighter(fighter);
    setSelectedSpecials(fighter.specials.slice(0, 4));
    setSelectedFinisher(fighter.finishers[0]);
    setIsSaved(false);
  };

  const toggleSpecial = (card: CombatCard) => {
    sound.playCardSelect();
    setIsSaved(false);
    if (selectedSpecials.some(c => c.id === card.id)) {
      // Remove
      if (selectedSpecials.length <= 1) return; // Keep at least 1
      setSelectedSpecials(prev => prev.filter(c => c.id !== card.id));
    } else {
      // Add up to 4
      if (selectedSpecials.length < 4) {
        setSelectedSpecials(prev => [...prev, card]);
      }
    }
  };

  const handleSelectFinisher = (card: CombatCard) => {
    sound.playCardSelect();
    setIsSaved(false);
    setSelectedFinisher(card);
  };

  const handleSaveDeck = () => {
    sound.playRoundStart();
    setIsSaved(true);
    if (onEquipLoadout) {
      onEquipLoadout(activeFighter.id, selectedSpecials, selectedFinisher);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-display">
          TACTICAL LOADOUT CUSTOMIZATION
        </span>
        <h2 className="font-arcade text-4xl sm:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-rose-500 text-shadow-arcade">
          DECK BUILDER & COMBAT LOADOUT
        </h2>
        <p className="text-sm text-zinc-400">
          Tailor your battle strategy! Select 4 Special Moves and 1 Devastating Finisher to complement your universal 7 basics in combat.
        </p>
      </div>

      {/* Hero Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {FIGHTERS.map((fighter) => {
          const isSelected = activeFighter.id === fighter.id;
          return (
            <div
              key={fighter.id}
              onClick={() => handleSelectFighter(fighter)}
              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                isSelected
                  ? 'border-amber-400 bg-zinc-900 shadow-xl shadow-amber-500/20 ring-2 ring-amber-400/50'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
              }`}
            >
              <img
                src={fighter.image}
                alt={fighter.name}
                className="w-12 h-14 object-cover rounded-lg border border-zinc-700"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0">
                <h4 className="font-arcade text-xl font-bold uppercase text-zinc-100 truncate">
                  {fighter.name}
                </h4>
                <span className="text-[11px] text-amber-400 font-medium truncate block">
                  {fighter.archetype.split(' ')[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Loadout Summary Bar */}
      <div className="p-4 rounded-2xl bg-zinc-900 border-2 border-amber-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center">
            <Layers className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-arcade text-2xl font-bold uppercase text-zinc-100">
              {activeFighter.name}'S ACTIVE BATTLE DECK
            </h3>
            <span className="text-xs text-zinc-400">
              {selectedSpecials.length}/4 Special Moves Selected • 1 Finisher Selected
            </span>
          </div>
        </div>

        <button
          onClick={handleSaveDeck}
          className={`px-6 py-2.5 rounded-xl font-arcade text-xl font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
            isSaved
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-gradient-to-r from-amber-500 to-red-600 text-white shadow-lg shadow-red-600/30 hover:scale-105'
          }`}
        >
          <Check className="w-5 h-5" />
          <span>{isSaved ? 'LOADOUT EQUIPPED' : 'SAVE TO COMBAT DECK'}</span>
        </button>
      </div>

      {/* SPECIAL MOVES (Pick 4 of 6) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
          <span className="text-sm font-bold uppercase tracking-wider text-amber-400 font-display">
            AVAILABLE SPECIALS (CHOOSE 4):
          </span>
          <span className="text-xs text-zinc-400 font-semibold">
            {selectedSpecials.length} / 4 Slots Filled
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {activeFighter.specials.map((card) => {
            const isEquipped = selectedSpecials.some(c => c.id === card.id);
            return (
              <div
                key={card.id}
                onClick={() => toggleSpecial(card)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isEquipped
                    ? 'border-amber-400 bg-zinc-900 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10'
                    : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-arcade text-2xl font-bold uppercase text-zinc-100">
                        {card.name}
                      </h4>
                      <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 border border-zinc-700">
                        SPD {card.speed}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 font-semibold uppercase">
                      {card.category} • {card.damage > 0 ? `${card.damage} DMG` : 'SPECIAL EFFECT'}
                    </span>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    isEquipped ? 'bg-amber-400 border-amber-300 text-black font-bold' : 'border-zinc-700 text-zinc-500'
                  }`}>
                    {isEquipped ? <Check className="w-4 h-4" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <p className="text-xs text-zinc-300 mb-3">
                  {card.description}
                </p>

                {card.effectTags && (
                  <div className="flex flex-wrap gap-1">
                    {card.effectTags.map((tag, i) => (
                      <span key={i} className="text-[9px] bg-zinc-950 text-amber-300 px-1.5 py-0.5 rounded border border-zinc-800 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* FINISHERS (Pick 1 of 2) */}
      <div className="space-y-4">
        <div className="border-b border-zinc-800 pb-2">
          <span className="text-sm font-bold uppercase tracking-wider text-purple-400 font-display">
            ULTIMATE FINISHER (CHOOSE 1):
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeFighter.finishers.map((card) => {
            const isEquipped = selectedFinisher.id === card.id;
            return (
              <div
                key={card.id}
                onClick={() => handleSelectFinisher(card)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer relative flex flex-col justify-between ${
                  isEquipped
                    ? 'border-purple-400 bg-zinc-900 ring-2 ring-purple-400/40 shadow-xl shadow-purple-500/20'
                    : 'border-zinc-800 bg-zinc-950/80 hover:border-zinc-700 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-400" />
                      <h4 className="font-arcade text-2xl font-bold uppercase text-zinc-100">
                        {card.name}
                      </h4>
                    </div>
                    <span className="text-xs text-purple-300 font-bold uppercase">
                      Cost: 3 Super Meter • {card.damage} DAMAGE
                    </span>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                    isEquipped ? 'bg-purple-500 border-purple-300 text-white font-bold' : 'border-zinc-700 text-zinc-500'
                  }`}>
                    {isEquipped ? <Check className="w-4 h-4" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 my-2">
                  {card.description}
                </p>

                {card.flavor && (
                  <span className="text-xs text-zinc-500 italic">
                    "{card.flavor}"
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
