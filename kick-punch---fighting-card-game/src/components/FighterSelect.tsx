import React, { useState } from 'react';
import { Fighter, GameMode, AIDifficulty, BattleArena } from '../types';
import { FIGHTERS, ARENAS } from '../data/fighters';
import { Swords, Bot, Users, Sparkles, Shield, Flame, Play, ChevronRight, Volume2 } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface FighterSelectProps {
  p1Fighter: Fighter;
  setP1Fighter: (fighter: Fighter) => void;
  p2Fighter: Fighter;
  setP2Fighter: (fighter: Fighter) => void;
  gameMode: GameMode;
  setGameMode: (mode: GameMode) => void;
  aiDifficulty: AIDifficulty;
  setAiDifficulty: (diff: AIDifficulty) => void;
  selectedArena: BattleArena;
  setSelectedArena: (arena: BattleArena) => void;
  onStartBattle: () => void;
}

export const FighterSelect: React.FC<FighterSelectProps> = ({
  p1Fighter,
  setP1Fighter,
  p2Fighter,
  setP2Fighter,
  gameMode,
  setGameMode,
  aiDifficulty,
  setAiDifficulty,
  selectedArena,
  setSelectedArena,
  onStartBattle
}) => {
  const [activeSlot, setActiveSlot] = useState<'p1' | 'p2'>('p1');
  const [previewFighter, setPreviewFighter] = useState<Fighter>(p1Fighter);

  const handleSelectFighter = (fighter: Fighter) => {
    sound.playCardSelect();
    setPreviewFighter(fighter);
    if (activeSlot === 'p1') {
      setP1Fighter(fighter);
      if (gameMode === 'vs_ai') {
        // Auto cycle preview or switch slot
      }
    } else {
      setP2Fighter(fighter);
    }
  };

  const handleStart = () => {
    sound.playRoundStart();
    onStartBattle();
  };

  const playTaunt = (fighter: Fighter) => {
    sound.playPunch();
    // Synth audio feedback
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Banner / Match Mode Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800">
        <div>
          <h2 className="font-arcade text-3xl sm:text-4xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-rose-500 text-shadow-arcade">
            CHOOSE YOUR FIGHTER
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Select two combatants, tune fight settings, and step into the arena.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap items-center gap-2 bg-zinc-950 p-1.5 rounded-xl border border-zinc-800">
          <button
            id="mode-vs-ai"
            onClick={() => {
              sound.playCardSelect();
              setGameMode('vs_ai');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              gameMode === 'vs_ai'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Solo vs AI</span>
          </button>

          <button
            id="mode-pass-play"
            onClick={() => {
              sound.playCardSelect();
              setGameMode('pass_and_play');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              gameMode === 'pass_and_play'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>2-Player Pass & Play</span>
          </button>
        </div>
      </div>

      {/* Main Selection Area: Player 1 / Fighter Cards / Player 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: P1 & P2 Slots Summary */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Player 1 Card Slot */}
          <div 
            onClick={() => {
              setActiveSlot('p1');
              setPreviewFighter(p1Fighter);
            }}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
              activeSlot === 'p1'
                ? 'border-amber-400 bg-zinc-900 shadow-xl shadow-amber-500/20 ring-2 ring-amber-400/50'
                : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-arcade text-base font-bold uppercase tracking-wider">
                PLAYER 1
              </span>
              {activeSlot === 'p1' && (
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 animate-pulse">
                  [SELECTING]
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <img
                src={p1Fighter.image}
                alt={p1Fighter.name}
                className="w-16 h-20 object-cover rounded-lg border border-zinc-700 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-arcade text-2xl font-bold uppercase text-zinc-100 truncate">
                  {p1Fighter.name}
                </h3>
                <span className="text-xs text-amber-400 font-medium block truncate">
                  {p1Fighter.title}
                </span>
                <span className="text-[11px] text-zinc-400 block mt-1">
                  {p1Fighter.archetype}
                </span>
              </div>
            </div>
          </div>

          {/* VS Divider */}
          <div className="flex items-center justify-center gap-3 my-2">
            <div className="h-px bg-zinc-800 flex-1" />
            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-red-500/50 flex items-center justify-center font-arcade text-red-400 font-bold text-sm">
              VS
            </div>
            <div className="h-px bg-zinc-800 flex-1" />
          </div>

          {/* Player 2 / AI Card Slot */}
          <div 
            onClick={() => {
              setActiveSlot('p2');
              setPreviewFighter(p2Fighter);
            }}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
              activeSlot === 'p2'
                ? 'border-red-500 bg-zinc-900 shadow-xl shadow-red-500/20 ring-2 ring-red-500/50'
                : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-arcade text-base font-bold uppercase tracking-wider">
                {gameMode === 'vs_ai' ? 'CPU OPPONENT' : 'PLAYER 2'}
              </span>
              {activeSlot === 'p2' && (
                <span className="text-[10px] uppercase font-bold tracking-widest text-red-400 animate-pulse">
                  [SELECTING]
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <img
                src={p2Fighter.image}
                alt={p2Fighter.name}
                className="w-16 h-20 object-cover rounded-lg border border-zinc-700 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-arcade text-2xl font-bold uppercase text-zinc-100 truncate">
                  {p2Fighter.name}
                </h3>
                <span className="text-xs text-red-400 font-medium block truncate">
                  {p2Fighter.title}
                </span>
                <span className="text-[11px] text-zinc-400 block mt-1">
                  {p2Fighter.archetype}
                </span>
              </div>
            </div>
          </div>

          {/* AI Difficulty Selector if Mode is vs AI */}
          {gameMode === 'vs_ai' && (
            <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
              <label className="text-xs uppercase font-bold text-zinc-400 block">
                AI Difficulty:
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['easy', 'medium', 'hard', 'arcade_boss'] as AIDifficulty[]).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => {
                      sound.playCardSelect();
                      setAiDifficulty(diff);
                    }}
                    className={`py-1.5 px-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all text-center ${
                      aiDifficulty === diff
                        ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white font-black shadow-md'
                        : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
                    }`}
                  >
                    {diff.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Arena Stage Selection */}
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-2">
            <label className="text-xs uppercase font-bold text-zinc-400 block">
              Battle Stage / Arena:
            </label>
            <select
              value={selectedArena.id}
              onChange={(e) => {
                const found = ARENAS.find(a => a.id === e.target.value);
                if (found) {
                  sound.playCardSelect();
                  setSelectedArena(found);
                }
              }}
              className="w-full bg-zinc-950 border border-zinc-700 rounded-lg p-2 text-xs font-semibold text-zinc-200 focus:outline-none focus:border-amber-400"
            >
              {ARENAS.map(arena => (
                <option key={arena.id} value={arena.id}>
                  {arena.name}
                </option>
              ))}
            </select>
          </div>

          {/* Big Start Fight Button */}
          <button
            id="start-fight-btn"
            onClick={handleStart}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-red-600 to-rose-600 text-white font-arcade text-3xl font-black uppercase tracking-wider shadow-2xl shadow-red-600/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 border-2 border-amber-300"
          >
            <Swords className="w-8 h-8" />
            <span>ENTER THE ARENA — FIGHT!</span>
          </button>
        </div>

        {/* Center / Right: Roster Grid + Fighter Deep Dive Preview */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 4 Fighter Grid Selection */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-3">
              SELECT FOR {activeSlot === 'p1' ? 'PLAYER 1' : gameMode === 'vs_ai' ? 'CPU' : 'PLAYER 2'}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {FIGHTERS.map((fighter) => {
                const isSelected = activeSlot === 'p1' ? p1Fighter.id === fighter.id : p2Fighter.id === fighter.id;
                return (
                  <div
                    key={fighter.id}
                    id={`fighter-card-${fighter.id}`}
                    onClick={() => handleSelectFighter(fighter)}
                    className={`relative rounded-xl border-2 overflow-hidden cursor-pointer group transition-all duration-200 ${
                      isSelected
                        ? 'border-amber-400 ring-4 ring-amber-400/40 -translate-y-1 shadow-xl'
                        : 'border-zinc-800 hover:border-zinc-600 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="h-44 sm:h-52 w-full overflow-hidden relative">
                      <img
                        src={fighter.image}
                        alt={fighter.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
                      
                      {/* Name Overlay */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="font-arcade text-xl sm:text-2xl font-bold uppercase text-white tracking-wide text-shadow-arcade">
                          {fighter.name}
                        </h4>
                        <span className="text-[10px] text-amber-300 font-bold uppercase block -mt-1">
                          {fighter.archetype.split(' ')[0]}
                        </span>
                      </div>

                      {/* Active Tag */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-amber-400 text-black font-black text-[10px] uppercase tracking-wider">
                          READY
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Fighter Detailed Stats & Specials Preview */}
          <div className="p-5 rounded-2xl bg-zinc-900/90 border border-zinc-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-arcade text-3xl sm:text-4xl font-bold uppercase text-zinc-100">
                    {previewFighter.name}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {previewFighter.archetype}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 italic mt-0.5">
                  "{previewFighter.quote}"
                </p>
              </div>

              {/* Passive Badge */}
              <div className="px-3 py-2 rounded-xl bg-zinc-950 border border-amber-500/30 max-w-sm">
                <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                  PASSIVE: {previewFighter.passiveName}
                </span>
                <p className="text-xs text-zinc-300 mt-0.5 line-clamp-2">
                  {previewFighter.passiveDescription}
                </p>
              </div>
            </div>

            {/* Combat Ratings */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">SPEED</span>
                <div className="flex items-center justify-between mt-1">
                  <div className="h-2 flex-1 bg-zinc-800 rounded-full overflow-hidden mr-2">
                    <div 
                      className="h-full bg-amber-400 rounded-full" 
                      style={{ width: `${previewFighter.stats.speed * 10}%` }} 
                    />
                  </div>
                  <span className="text-xs font-bold text-amber-300 font-display">{previewFighter.stats.speed}/10</span>
                </div>
              </div>

              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">POWER</span>
                <div className="flex items-center justify-between mt-1">
                  <div className="h-2 flex-1 bg-zinc-800 rounded-full overflow-hidden mr-2">
                    <div 
                      className="h-full bg-red-500 rounded-full" 
                      style={{ width: `${previewFighter.stats.power * 10}%` }} 
                    />
                  </div>
                  <span className="text-xs font-bold text-red-400 font-display">{previewFighter.stats.power}/10</span>
                </div>
              </div>

              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">DEFENSE</span>
                <div className="flex items-center justify-between mt-1">
                  <div className="h-2 flex-1 bg-zinc-800 rounded-full overflow-hidden mr-2">
                    <div 
                      className="h-full bg-blue-400 rounded-full" 
                      style={{ width: `${previewFighter.stats.defense * 10}%` }} 
                    />
                  </div>
                  <span className="text-xs font-bold text-blue-300 font-display">{previewFighter.stats.defense}/10</span>
                </div>
              </div>

              <div className="bg-zinc-950 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-400 uppercase font-semibold">MINDGAMES</span>
                <div className="flex items-center justify-between mt-1">
                  <div className="h-2 flex-1 bg-zinc-800 rounded-full overflow-hidden mr-2">
                    <div 
                      className="h-full bg-purple-400 rounded-full" 
                      style={{ width: `${previewFighter.stats.mindgames * 10}%` }} 
                    />
                  </div>
                  <span className="text-xs font-bold text-purple-300 font-display">{previewFighter.stats.mindgames}/10</span>
                </div>
              </div>
            </div>

            {/* Quick Preview of 6 Specials & 2 Finishers */}
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2">
                FIGHTER'S ARSENAL ({previewFighter.specials.length} Specials + {previewFighter.finishers.length} Finishers):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {previewFighter.specials.slice(0, 4).map((special) => (
                  <div key={special.id} className="p-2 rounded-lg bg-zinc-950 border border-zinc-800 text-xs">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-zinc-200 truncate">{special.name}</span>
                      <span className="text-[10px] text-amber-400 font-bold">SPD {special.speed}</span>
                    </div>
                    <span className="text-[10px] text-zinc-400 block truncate">{special.description}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
