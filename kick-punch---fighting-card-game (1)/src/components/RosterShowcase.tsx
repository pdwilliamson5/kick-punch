import React, { useState } from 'react';
import { Fighter, CombatCard } from '../types';
import { FIGHTERS } from '../data/fighters';
import { CardItem } from './CardItem';
import { sound } from '../utils/soundEffects';
import { 
  Zap, Flame, Shield, Swords, Sparkles, Trophy, Heart, Volume2, 
  ArrowRight, ShieldCheck, Skull, ChevronRight 
} from 'lucide-react';

export const RosterShowcase: React.FC = () => {
  const [selectedFighter, setSelectedFighter] = useState<Fighter>(FIGHTERS[0]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'specials' | 'finishers'>('all');

  const handleSelectFighter = (fighter: Fighter) => {
    sound.playCardSelect();
    setSelectedFighter(fighter);
  };

  const playTaunt = () => {
    sound.playPunch();
  };

  const cardsToShow = activeFilter === 'specials' 
    ? selectedFighter.specials 
    : activeFilter === 'finishers' 
    ? selectedFighter.finishers 
    : [...selectedFighter.specials, ...selectedFighter.finishers];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-display">
          TABLETOP FIGHTER CODEX
        </span>
        <h2 className="font-arcade text-4xl sm:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-rose-500 text-shadow-arcade">
          HEROES & COMBAT DECKS
        </h2>
        <p className="text-sm text-zinc-400">
          Every fighter brings six unique Special Moves and two devastating Finishers, giving each character their own unique tabletop playstyle, combo synergies, and mindgames.
        </p>
      </div>

      {/* Hero Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {FIGHTERS.map((fighter) => {
          const isSelected = selectedFighter.id === fighter.id;
          return (
            <div
              key={fighter.id}
              onClick={() => handleSelectFighter(fighter)}
              className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3 ${
                isSelected
                  ? 'border-amber-400 bg-zinc-900 shadow-xl shadow-amber-500/20 ring-2 ring-amber-400/50 -translate-y-1'
                  : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900/50'
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

      {/* Fighter Profile Spotlight Banner */}
      <div className="rounded-3xl bg-zinc-900 border-2 border-zinc-800 p-6 sm:p-8 overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Fighter Character Portrait Art */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative w-64 sm:w-72 h-80 sm:h-96 rounded-2xl overflow-hidden border-4 border-amber-400/80 shadow-2xl shadow-amber-500/20">
              <img
                src={selectedFighter.image}
                alt={selectedFighter.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="font-arcade text-3xl font-bold uppercase text-white tracking-wide text-shadow-arcade block">
                  {selectedFighter.name}
                </span>
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">
                  {selectedFighter.title}
                </span>
              </div>
            </div>
          </div>

          {/* Fighter Lore, Archetype, Strategy & Combat Stats */}
          <div className="lg:col-span-8 space-y-6">
            
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white uppercase tracking-wider">
                  {selectedFighter.archetype}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-800 text-zinc-300 border border-zinc-700 uppercase">
                  DIFFICULTY: {selectedFighter.stats.difficulty}
                </span>
              </div>

              <h3 className="font-arcade text-4xl sm:text-5xl font-black uppercase text-zinc-100">
                {selectedFighter.name}
              </h3>
              <p className="text-base text-amber-400 italic font-serif mt-1">
                "{selectedFighter.quote}"
              </p>
            </div>

            {/* Backstory & Strategic Philosophy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
                <span className="text-xs uppercase font-bold text-zinc-400 block mb-1 font-display">
                  HERO BACKSTORY:
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedFighter.backstory}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800">
                <span className="text-xs uppercase font-bold text-amber-400 block mb-1 font-display">
                  COMBAT STRATEGY & TACTICS:
                </span>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedFighter.strategy}
                </p>
              </div>
            </div>

            {/* Passive Trait */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-red-950/30 to-zinc-950 border border-amber-500/40">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                  PASSIVE TRAIT: {selectedFighter.passiveName}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-200">
                {selectedFighter.passiveDescription}
              </p>
            </div>

            {/* Combat Stats Ratings */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">SPEED</span>
                <div className="flex items-center justify-between mt-1">
                  <div className="h-2 flex-1 bg-zinc-800 rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: `${selectedFighter.stats.speed * 10}%` }} />
                  </div>
                  <span className="text-xs font-bold text-amber-300 font-display">{selectedFighter.stats.speed}/10</span>
                </div>
              </div>

              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">POWER</span>
                <div className="flex items-center justify-between mt-1">
                  <div className="h-2 flex-1 bg-zinc-800 rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${selectedFighter.stats.power * 10}%` }} />
                  </div>
                  <span className="text-xs font-bold text-red-400 font-display">{selectedFighter.stats.power}/10</span>
                </div>
              </div>

              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">DEFENSE</span>
                <div className="flex items-center justify-between mt-1">
                  <div className="h-2 flex-1 bg-zinc-800 rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-blue-400 rounded-full" style={{ width: `${selectedFighter.stats.defense * 10}%` }} />
                  </div>
                  <span className="text-xs font-bold text-blue-300 font-display">{selectedFighter.stats.defense}/10</span>
                </div>
              </div>

              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">MINDGAMES</span>
                <div className="flex items-center justify-between mt-1">
                  <div className="h-2 flex-1 bg-zinc-800 rounded-full overflow-hidden mr-2">
                    <div className="h-full bg-purple-400 rounded-full" style={{ width: `${selectedFighter.stats.mindgames * 10}%` }} />
                  </div>
                  <span className="text-xs font-bold text-purple-300 font-display">{selectedFighter.stats.mindgames}/10</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Fighter Moveset Deck Showcase (6 Specials + 2 Finishers) */}
      <div className="space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
          <div>
            <h3 className="font-arcade text-3xl font-bold uppercase text-zinc-100">
              {selectedFighter.name}'S UNIQUE COMBAT DECK
            </h3>
            <p className="text-xs text-zinc-400">
              Explore all 6 signature special moves and 2 ultimate finishers for this hero.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-zinc-900 p-1.5 rounded-xl border border-zinc-800">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'all' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              ALL ({selectedFighter.specials.length + selectedFighter.finishers.length})
            </button>
            <button
              onClick={() => setActiveFilter('specials')}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'specials' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              6 SPECIALS
            </button>
            <button
              onClick={() => setActiveFilter('finishers')}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'finishers' ? 'bg-amber-500 text-black' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              2 FINISHERS
            </button>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {cardsToShow.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              size="md"
              fighterColor={selectedFighter.accentHex}
            />
          ))}
        </div>

      </div>

    </div>
  );
};
