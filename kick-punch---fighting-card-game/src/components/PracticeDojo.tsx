import React, { useState } from 'react';
import { Fighter, CombatCard, PlayerBattleState } from '../types';
import { FIGHTERS } from '../data/fighters';
import { UNIVERSAL_BASIC_MOVES, getFighterMoves } from '../data/moves';
import { resolveCombatTurn } from '../utils/combatEngine';
import { sound } from '../utils/soundEffects';
import { CardItem } from './CardItem';
import { Swords, Play, Sparkles, Zap, Shield, RotateCcw, ArrowRight } from 'lucide-react';

export const PracticeDojo: React.FC = () => {
  const [f1, setF1] = useState<Fighter>(FIGHTERS[0]); // Firebird
  const [f2, setF2] = useState<Fighter>(FIGHTERS[1]); // Tidal Wave

  const getAllMovesForFighter = (fighter: Fighter): CombatCard[] => [
    ...getFighterMoves(fighter.id),
    ...fighter.specials,
    ...fighter.finishers
  ];

  const [p1Move, setP1Move] = useState<CombatCard>(getFighterMoves(FIGHTERS[0].id)[0]); // Firebird Jab
  const [p2Move, setP2Move] = useState<CombatCard>(getFighterMoves(FIGHTERS[1].id)[1]); // Tidal Hook

  const [simResult, setSimResult] = useState<ReturnType<typeof resolveCombatTurn> | null>(null);

  const handleTestClash = () => {
    // Play SFX
    if (p1Move.type === 'finisher' || p2Move.type === 'finisher') {
      sound.playFinisher();
    } else if (p1Move.category === 'counter' || p2Move.category === 'counter') {
      sound.playReverse();
    } else if (p1Move.category === 'defense' || p2Move.category === 'defense') {
      sound.playBlock();
    } else if (p1Move.category === 'kick' || p2Move.category === 'kick') {
      sound.playKick();
    } else {
      sound.playPunch();
    }

    const dummyP1State: PlayerBattleState = {
      fighter: f1,
      maxHp: 20,
      currentHp: 20,
      superMeter: 3,
      maxSuperMeter: 3,
      shield: 0,
      selectedCard: p1Move,
      hasLockedIn: true,
      activeBuffs: {},
      customDeckSpecials: f1.specials.slice(0, 4),
      customFinisher: f1.finishers[0],
      roundWins: 0
    };

    const dummyP2State: PlayerBattleState = {
      fighter: f2,
      maxHp: 20,
      currentHp: 20,
      superMeter: 3,
      maxSuperMeter: 3,
      shield: 0,
      selectedCard: p2Move,
      hasLockedIn: true,
      activeBuffs: {},
      customDeckSpecials: f2.specials.slice(0, 4),
      customFinisher: f2.finishers[0],
      roundWins: 0
    };

    const res = resolveCombatTurn(1, dummyP1State, dummyP2State, p1Move, p2Move);
    setSimResult(res);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-display">
          MOVE INTERACTION LAB
        </span>
        <h2 className="font-arcade text-4xl sm:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-rose-500 text-shadow-arcade">
          PRACTICE DOJO & SIMULATOR
        </h2>
        <p className="text-sm text-zinc-400">
          Pit any move against another to immediately test priority calculations, block mechanics, counters, anti-airs, and damage math in real time.
        </p>
      </div>

      {/* Duel Setup Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Fighter 1 Move Picker */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-zinc-900 border-2 border-amber-500/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider font-display">
              FIGHTER 1
            </span>
            <select
              value={f1.id}
              onChange={(e) => {
                const found = FIGHTERS.find(f => f.id === e.target.value);
                if (found) {
                  sound.playCardSelect();
                  setF1(found);
                  setP1Move(UNIVERSAL_BASIC_MOVES[0]);
                }
              }}
              className="bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs font-bold text-amber-300"
            >
              {FIGHTERS.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.archetype.split(' ')[0]})</option>
              ))}
            </select>
          </div>

          {/* Selected Card Preview */}
          <div className="flex justify-center my-2">
            <CardItem card={p1Move} size="md" fighterColor={f1.accentHex} />
          </div>

          {/* Move Selector List */}
          <div>
            <span className="text-[11px] uppercase font-bold text-zinc-400 block mb-2">
              Select P1 Move:
            </span>
            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {getAllMovesForFighter(f1).map(card => (
                <button
                  key={card.id}
                  onClick={() => {
                    sound.playCardSelect();
                    setP1Move(card);
                  }}
                  className={`p-2 rounded-lg text-left text-xs font-bold transition-all truncate border ${
                    p1Move.id === card.id
                      ? 'bg-amber-500 text-black border-amber-300'
                      : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  <span className="block truncate">{card.name}</span>
                  <span className="text-[9px] opacity-75">SPD {card.speed} • {card.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Execute Button */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-3 py-6">
          <div className="w-14 h-14 rounded-full bg-zinc-900 border-2 border-red-500 flex items-center justify-center shadow-xl shadow-red-500/20">
            <Swords className="w-7 h-7 text-red-400" />
          </div>

          <button
            onClick={handleTestClash}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-red-600 to-rose-600 text-white font-arcade text-2xl font-black uppercase tracking-wider shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all text-center border border-amber-300"
          >
            TEST CLASH!
          </button>
        </div>

        {/* Right: Fighter 2 Move Picker */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-zinc-900 border-2 border-red-500/50 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-400 uppercase tracking-wider font-display">
              FIGHTER 2
            </span>
            <select
              value={f2.id}
              onChange={(e) => {
                const found = FIGHTERS.find(f => f.id === e.target.value);
                if (found) {
                  sound.playCardSelect();
                  setF2(found);
                  setP2Move(UNIVERSAL_BASIC_MOVES[1]);
                }
              }}
              className="bg-zinc-950 border border-zinc-700 rounded-lg px-2.5 py-1 text-xs font-bold text-red-300"
            >
              {FIGHTERS.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.archetype.split(' ')[0]})</option>
              ))}
            </select>
          </div>

          {/* Selected Card Preview */}
          <div className="flex justify-center my-2">
            <CardItem card={p2Move} size="md" fighterColor={f2.accentHex} />
          </div>

          {/* Move Selector List */}
          <div>
            <span className="text-[11px] uppercase font-bold text-zinc-400 block mb-2">
              Select P2 Move:
            </span>
            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
              {getAllMovesForFighter(f2).map(card => (
                <button
                  key={card.id}
                  onClick={() => {
                    sound.playCardSelect();
                    setP2Move(card);
                  }}
                  className={`p-2 rounded-lg text-left text-xs font-bold transition-all truncate border ${
                    p2Move.id === card.id
                      ? 'bg-red-600 text-white border-red-400'
                      : 'bg-zinc-950 text-zinc-300 border-zinc-800 hover:bg-zinc-800'
                  }`}
                >
                  <span className="block truncate">{card.name}</span>
                  <span className="text-[9px] opacity-75">SPD {card.speed} • {card.category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Simulator Resolution Output Panel */}
      {simResult && (
        <div className="p-6 rounded-3xl bg-zinc-950 border-2 border-amber-500/80 shadow-2xl space-y-4 animate-scale-up">
          <div className="text-center">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-display">
              SIMULATED CLASH OUTCOME
            </span>
            <h3 className="font-arcade text-3xl sm:text-4xl font-black uppercase text-white mt-1">
              {simResult.headline}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center my-4">
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-xs uppercase text-zinc-400 font-bold block">P1 ({f1.name}) EFFECT</span>
              <span className="font-arcade text-2xl font-bold text-amber-400 block mt-1">
                Took {simResult.p1DamageTaken} DMG
              </span>
              <span className="text-xs text-purple-300 font-bold">
                +{simResult.p1MeterDelta} Super Meter
              </span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center">
              <span className="text-xs uppercase text-zinc-400 font-bold">OUTCOME TYPE</span>
              <span className="font-arcade text-2xl font-black uppercase text-red-400 mt-1">
                {simResult.outcome.replace(/_/g, ' ')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
              <span className="text-xs uppercase text-zinc-400 font-bold block">P2 ({f2.name}) EFFECT</span>
              <span className="font-arcade text-2xl font-bold text-red-400 block mt-1">
                Took {simResult.p2DamageTaken} DMG
              </span>
              <span className="text-xs text-purple-300 font-bold">
                +{simResult.p2MeterDelta} Super Meter
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 space-y-1">
            <span className="text-xs font-bold text-amber-400 uppercase block font-display">
              FRAME & MECHANIC BREAKDOWN:
            </span>
            {simResult.details.map((detail, idx) => (
              <p key={idx} className="text-xs sm:text-sm text-zinc-200">
                • {detail}
              </p>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
