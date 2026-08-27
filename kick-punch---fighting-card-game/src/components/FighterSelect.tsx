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
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      {/* 90s Arcade Marquee Header Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 bg-zinc-950 p-4 rounded-2xl border-2 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.2)] relative overflow-hidden">
        
        {/* Animated Background Laser Grid Line */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/40 via-amber-950/30 to-zinc-950 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[10px] text-white animate-pulse bg-red-600 px-2 py-0.5 rounded border border-amber-400">
              ★ CPS-II ARCADE ★
            </span>
            <span className="font-pixel text-[9px] text-white/90">
              CHOOSE YOUR FIGHTER
            </span>
          </div>
          <h2 className="font-arcade text-3xl sm:text-5xl font-black uppercase tracking-wider text-white text-shadow-arcade mt-0.5">
            BATTLE CHARACTER SELECT
          </h2>
        </div>

        {/* Mode Selector - Arcade Push Button Style */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 bg-black p-1.5 rounded-xl border border-zinc-700">
          <button
            id="mode-vs-ai"
            onClick={() => {
              sound.playCardSelect();
              setGameMode('vs_ai');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-arcade-action uppercase tracking-wider transition-all border ${
              gameMode === 'vs_ai'
                ? 'bg-gradient-to-b from-amber-400 to-amber-600 text-black border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.6)] font-black'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>1P VS CPU</span>
          </button>

          <button
            id="mode-pass-play"
            onClick={() => {
              sound.playCardSelect();
              setGameMode('pass_and_play');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-arcade-action uppercase tracking-wider transition-all border ${
              gameMode === 'pass_and_play'
                ? 'bg-gradient-to-b from-red-500 to-red-700 text-white border-red-400 shadow-[0_0_12px_rgba(239,68,68,0.6)] font-black'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-zinc-200'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>2P VERSUS BRAWL</span>
          </button>
        </div>
      </div>

      {/* Main Selection Area: Player 1 / Fighter Cards / Player 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: P1 & P2 Slots Summary */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Player 1 Card Slot (Arcade P1 Blue/Gold Glow) */}
          <div 
            onClick={() => {
              setActiveSlot('p1');
              setPreviewFighter(p1Fighter);
            }}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
              activeSlot === 'p1'
                ? 'border-amber-400 bg-zinc-900 shadow-[0_0_20px_rgba(245,158,11,0.35)] ring-2 ring-amber-400/50'
                : 'border-zinc-800 bg-black/80 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-1 rounded bg-amber-500 text-black font-pixel text-[9px] font-black uppercase tracking-wider shadow-md">
                1P SELECT
              </span>
              {activeSlot === 'p1' && (
                <span className="font-pixel text-[8px] text-amber-400 animate-pulse">
                  ► CHOOSING ◄
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <img
                src={p1Fighter.image}
                alt={p1Fighter.name}
                className="w-16 h-20 object-cover rounded-lg border-2 border-amber-400 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-arcade-action text-xl sm:text-2xl font-black uppercase text-amber-300 truncate text-shadow-arcade">
                  {p1Fighter.name}
                </h3>
                <span className="font-pixel text-[9px] text-zinc-300 block truncate mt-0.5">
                  {p1Fighter.title}
                </span>
                <span className="text-xs text-amber-400 font-bold uppercase block mt-1">
                  TYPE: {p1Fighter.archetype}
                </span>
              </div>
            </div>
          </div>

          {/* 90s Arcade VS Lightning Emblem */}
          <div className="flex items-center justify-center gap-3 my-1">
            <div className="h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent flex-1" />
            <div className="w-10 h-10 rounded-full bg-black border-2 border-red-500 flex items-center justify-center font-arcade-action text-red-500 font-black text-lg shadow-[0_0_15px_rgba(239,68,68,0.7)]">
              VS
            </div>
            <div className="h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent flex-1" />
          </div>

          {/* Player 2 / AI Card Slot (Arcade P2 Red/Crimson Glow) */}
          <div 
            onClick={() => {
              setActiveSlot('p2');
              setPreviewFighter(p2Fighter);
            }}
            className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden ${
              activeSlot === 'p2'
                ? 'border-red-500 bg-zinc-900 shadow-[0_0_20px_rgba(239,68,68,0.35)] ring-2 ring-red-500/50'
                : 'border-zinc-800 bg-black/80 hover:border-zinc-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-1 rounded bg-red-600 text-white font-pixel text-[9px] font-black uppercase tracking-wider shadow-md">
                {gameMode === 'vs_ai' ? 'CPU FOE' : '2P SELECT'}
              </span>
              {activeSlot === 'p2' && (
                <span className="font-pixel text-[8px] text-red-400 animate-pulse">
                  ► CHOOSING ◄
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <img
                src={p2Fighter.image}
                alt={p2Fighter.name}
                className="w-16 h-20 object-cover rounded-lg border-2 border-red-500 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-arcade-action text-xl sm:text-2xl font-black uppercase text-red-400 truncate text-shadow-arcade">
                  {p2Fighter.name}
                </h3>
                <span className="font-pixel text-[9px] text-zinc-300 block truncate mt-0.5">
                  {p2Fighter.title}
                </span>
                <span className="text-xs text-red-400 font-bold uppercase block mt-1">
                  TYPE: {p2Fighter.archetype}
                </span>
              </div>
            </div>
          </div>

          {/* AI Difficulty Selector with 90s Arcade Star Ratings */}
          {gameMode === 'vs_ai' && (
            <div className="p-3.5 rounded-xl bg-black border-2 border-zinc-800 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-pixel text-[9px] uppercase text-zinc-400 block">
                  CPU DIFFICULTY:
                </label>
                <span className="font-pixel text-[8px] text-amber-400">
                  {aiDifficulty === 'arcade_boss' ? '★★★ MAX BOSS' : aiDifficulty === 'hard' ? '★★ EXPERT' : '★ NORMAL'}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {(['easy', 'medium', 'hard', 'arcade_boss'] as AIDifficulty[]).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => {
                      sound.playCardSelect();
                      setAiDifficulty(diff);
                    }}
                    className={`py-2 px-1 rounded text-[9px] uppercase font-arcade-action tracking-wider transition-all text-center border ${
                      aiDifficulty === diff
                        ? 'bg-gradient-to-b from-red-600 to-amber-600 text-white font-black border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                        : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border-zinc-800'
                    }`}
                  >
                    {diff === 'arcade_boss' ? 'BOSS' : diff}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Arena Stage Selection with Visual Preview */}
          <div className="p-3.5 rounded-xl bg-black border-2 border-zinc-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-pixel text-[9px] uppercase text-amber-400 block tracking-wider">
                STAGE SELECTION:
              </label>
              <span className="font-pixel text-[8px] text-zinc-300 uppercase">
                {selectedArena.name.split('(')[0]}
              </span>
            </div>

            {/* Visual Arena Card Selector */}
            <div className="relative h-24 rounded-lg overflow-hidden border-2 border-zinc-700 group">
              {selectedArena.image && (
                <img 
                  src={selectedArena.image} 
                  alt={selectedArena.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 flex items-end justify-between">
                <div>
                  <h4 className="font-arcade-action text-base font-black text-amber-300 uppercase leading-none">
                    {selectedArena.name}
                  </h4>
                  <p className="text-[10px] text-zinc-300 line-clamp-1 mt-0.5">
                    {selectedArena.description}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {ARENAS.map(arena => (
                <button
                  key={arena.id}
                  onClick={() => {
                    sound.playCardSelect();
                    setSelectedArena(arena);
                  }}
                  className={`px-2 py-1.5 rounded-md text-[9px] font-arcade-action uppercase tracking-wider transition-all text-left truncate border ${
                    selectedArena.id === arena.id
                      ? 'bg-amber-500 text-black border-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)] font-black'
                      : 'bg-zinc-950 text-zinc-400 hover:text-zinc-200 border-zinc-800'
                  }`}
                >
                  {arena.name}
                </button>
              ))}
            </div>
          </div>

          {/* Big Start Fight Button (Arcade Cabinet 'CHALLENGER' Glow) */}
          <button
            id="start-fight-btn"
            onClick={handleStart}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-red-600 to-rose-600 text-white font-arcade-action text-2xl font-black uppercase tracking-wider shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 border-2 border-amber-300 text-shadow-arcade"
          >
            <Swords className="w-7 h-7 animate-bounce" />
            <span>FIGHT! — START MATCH</span>
          </button>
        </div>

        {/* Center / Right: Roster Grid + Fighter Deep Dive Preview */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 4 Fighter Grid Selection with 90s Arcade Portrait Framing */}
          <div className="bg-black p-4 rounded-2xl border-2 border-zinc-800 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="font-pixel text-[10px] uppercase tracking-wider text-amber-400">
                ► ROSTER SELECT: {activeSlot === 'p1' ? 'PLAYER 1' : gameMode === 'vs_ai' ? 'CPU FOE' : 'PLAYER 2'}
              </span>
              <span className="font-pixel text-[8px] text-zinc-400">
                PRESS TO PICK
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {FIGHTERS.map((fighter) => {
                const isSelectedP1 = p1Fighter.id === fighter.id;
                const isSelectedP2 = p2Fighter.id === fighter.id;
                const isCurrentActive = activeSlot === 'p1' ? isSelectedP1 : isSelectedP2;

                return (
                  <div
                    key={fighter.id}
                    id={`fighter-card-${fighter.id}`}
                    onClick={() => handleSelectFighter(fighter)}
                    className={`relative rounded-xl border-4 overflow-hidden cursor-pointer group transition-all duration-200 ${
                      isCurrentActive
                        ? activeSlot === 'p1'
                          ? 'border-amber-400 ring-4 ring-amber-400/50 -translate-y-1 shadow-[0_0_20px_rgba(245,158,11,0.6)]'
                          : 'border-red-500 ring-4 ring-red-500/50 -translate-y-1 shadow-[0_0_20px_rgba(239,68,68,0.6)]'
                        : 'border-zinc-800 hover:border-amber-400/60 hover:-translate-y-0.5'
                    }`}
                  >
                    <div className="h-48 sm:h-56 w-full overflow-hidden relative bg-zinc-950">
                      <img
                        src={fighter.image}
                        alt={fighter.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                      
                      {/* Name Overlay in 90s Street Fighter Arcade Font */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <h4 className="font-arcade-action text-xl sm:text-2xl font-black uppercase text-white tracking-wide text-shadow-arcade">
                          {fighter.name}
                        </h4>
                        <span className="font-pixel text-[8px] text-amber-300 font-bold uppercase block mt-0.5">
                          {fighter.archetype.split(' ')[0]}
                        </span>
                      </div>

                      {/* Arcade P1 / P2 Badges */}
                      <div className="absolute top-2 left-2 flex gap-1">
                        {isSelectedP1 && (
                          <div className="px-2 py-0.5 rounded bg-amber-400 text-black font-pixel font-black text-[8px] uppercase tracking-wider shadow-md">
                            1P
                          </div>
                        )}
                        {isSelectedP2 && (
                          <div className="px-2 py-0.5 rounded bg-red-600 text-white font-pixel font-black text-[8px] uppercase tracking-wider shadow-md">
                            2P
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Fighter Detailed Stats & Specials Preview */}
          <div className="p-5 rounded-2xl bg-black border-2 border-zinc-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b-2 border-zinc-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-arcade-action text-3xl sm:text-4xl font-black uppercase text-amber-400 text-shadow-arcade">
                    {previewFighter.name}
                  </h3>
                  <span className="px-2.5 py-1 rounded text-xs font-arcade-action bg-red-950 text-red-300 border border-red-600">
                    {previewFighter.archetype}
                  </span>
                </div>
                <p className="font-pixel text-[9px] text-zinc-300 mt-1">
                  "{previewFighter.quote}"
                </p>
              </div>

              {/* Passive Badge */}
              <div className="px-3.5 py-2 rounded-xl bg-zinc-950 border-2 border-amber-500/50 max-w-sm">
                <span className="font-pixel text-[9px] uppercase font-black text-amber-400 block tracking-wider">
                  ★ SPECIAL ABILITY: {previewFighter.passiveName}
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
