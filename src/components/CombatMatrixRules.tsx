import React, { useState } from 'react';
import { 
  UNIVERSAL_BASIC_MOVES, 
  FIREBIRD_BASIC_MOVES, 
  TIDAL_BASIC_MOVES, 
  CHAD_BASIC_MOVES,
  chadCardSheet,
  firebirdCardSheet,
  tidalCardSheet,
  firebirdSunbirdFinisher
} from '../data/moves';
import { CardItem } from './CardItem';
import { CombatCard } from '../types';
import { 
  Zap, Shield, RotateCcw, ArrowUp, Footprints, Swords, Flame, 
  Sparkles, CheckCircle2, AlertTriangle, Play, HelpCircle, Check, X, Minus, Eye, User
} from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const CombatMatrixRules: React.FC = () => {
  const [selectedRuleTab, setSelectedRuleTab] = useState<'sheet' | 'matrix' | 'simulator' | 'turn_order' | 'faq'>('sheet');
  const [selectedFighterSheet, setSelectedFighterSheet] = useState<'chad' | 'firebird' | 'tidal_wave'>('firebird');
  
  const currentDeck = selectedFighterSheet === 'firebird' 
    ? FIREBIRD_BASIC_MOVES 
    : selectedFighterSheet === 'tidal_wave' 
    ? TIDAL_BASIC_MOVES 
    : CHAD_BASIC_MOVES;

  const currentSheetArt = selectedFighterSheet === 'firebird'
    ? firebirdCardSheet
    : selectedFighterSheet === 'tidal_wave'
    ? tidalCardSheet
    : chadCardSheet;

  const currentFighterMeta = {
    chad: {
      name: 'Chad the Frat Boy',
      title: 'The Party Bro Striker',
      badge: 'STRIKE & HYPE AGGRESSOR',
      color: 'from-amber-600 via-zinc-900 to-amber-950',
      border: 'border-amber-500/50',
      textAccent: 'text-amber-400',
      desc: 'Balanced bruiser with explosive punches and stacking Frat Hype momentum.'
    },
    firebird: {
      name: 'Firebird',
      title: 'The Blazing Phoenix',
      badge: 'COMBO RUSHDOWN & BURN SPEEDSTER',
      color: 'from-red-600 via-amber-950 to-rose-950',
      border: 'border-red-500/50',
      textAccent: 'text-red-400',
      desc: 'Indigenous warrior woman with blistering speed, flaming wings, and Combustion Rhythm passives.'
    },
    tidal_wave: {
      name: 'Tidal Wave',
      title: 'The Oceanic Sovereign',
      badge: 'UNYIELDING TANK & GRAPPLE JUGGERNAUT',
      color: 'from-cyan-600 via-blue-950 to-indigo-950',
      border: 'border-cyan-500/50',
      textAccent: 'text-cyan-400',
      desc: 'Polynesian colossus absorbing massive damage and crushing opponents with tidal momentum.'
    }
  }[selectedFighterSheet];

  const [inspectedCard, setInspectedCard] = useState<CombatCard>(FIREBIRD_BASIC_MOVES[0]);
  const [simP1Card, setSimP1Card] = useState<CombatCard>(FIREBIRD_BASIC_MOVES[0]);
  const [simP2Card, setSimP2Card] = useState<CombatCard>(TIDAL_BASIC_MOVES[1]);

  const getMatchupOutcome = (cardA: CombatCard, cardB: CombatCard) => {
    if (cardA.beats && cardA.beats.some(b => b.toLowerCase() === cardB.name.toLowerCase())) {
      return { status: 'win', text: `${cardA.name} BEATS ${cardB.name}! Deals ${cardA.power || cardA.damage} Damage.` };
    }
    if (cardB.beats && cardB.beats.some(b => b.toLowerCase() === cardA.name.toLowerCase())) {
      return { status: 'lose', text: `${cardA.name} LOSES TO ${cardB.name}! Takes ${cardB.power || cardB.damage} Damage.` };
    }
    return { status: 'tie', text: `${cardA.name} TIES ${cardB.name}! Neutral clash or mutual trade.` };
  };

  const simResult = getMatchupOutcome(simP1Card, simP2Card);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-display">
          OFFICIAL TABLETOP CARD GAME RULEBOOK
        </span>
        <h2 className="font-arcade text-4xl sm:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-rose-500 text-shadow-arcade">
          KICK / PUNCH COMBAT MATRIX
        </h2>
        <p className="text-sm text-zinc-400">
          "Kick Punch takes the mind games of a classic arcade fighter and puts them on the tabletop. Two players choose fighters and battle head-to-head using character cards."
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        <div className="flex bg-zinc-900 p-1.5 rounded-xl border border-zinc-800 shrink-0">
          <button
            onClick={() => {
              sound.playCardSelect();
              setSelectedRuleTab('sheet');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              selectedRuleTab === 'sheet' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Official Character Card Sheets
          </button>
          <button
            onClick={() => {
              sound.playCardSelect();
              setSelectedRuleTab('simulator');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              selectedRuleTab === 'simulator' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Matchup Calculator
          </button>
          <button
            onClick={() => {
              sound.playCardSelect();
              setSelectedRuleTab('matrix');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              selectedRuleTab === 'matrix' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            8x8 Clash Table
          </button>
          <button
            onClick={() => {
              sound.playCardSelect();
              setSelectedRuleTab('turn_order');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              selectedRuleTab === 'turn_order' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Turn Sequence
          </button>
          <button
            onClick={() => {
              sound.playCardSelect();
              setSelectedRuleTab('faq');
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              selectedRuleTab === 'faq' ? 'bg-amber-500 text-black shadow-md' : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            Strategy FAQ
          </button>
        </div>
      </div>

      {/* TAB 1: OFFICIAL FIGHTER CARD SHEETS & INTERACTIVE INSPECTOR */}
      {selectedRuleTab === 'sheet' && (
        <div className="space-y-8 animate-fade-in">
          
          {/* Fighter Switcher Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase text-zinc-400 mr-2">CHOOSE FIGHTER ART SHEET:</span>
            <button
              onClick={() => {
                sound.playCardSelect();
                setSelectedFighterSheet('firebird');
                setInspectedCard(FIREBIRD_BASIC_MOVES[0]);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                selectedFighterSheet === 'firebird' 
                  ? 'bg-red-600 text-white border-red-400 shadow-lg shadow-red-600/30' 
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-red-500/50'
              }`}
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>Firebird</span>
            </button>
            <button
              onClick={() => {
                sound.playCardSelect();
                setSelectedFighterSheet('tidal_wave');
                setInspectedCard(TIDAL_BASIC_MOVES[0]);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                selectedFighterSheet === 'tidal_wave' 
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/30' 
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-cyan-500/50'
              }`}
            >
              <Shield className="w-4 h-4 text-cyan-200" />
              <span>Tidal Wave</span>
            </button>
            <button
              onClick={() => {
                sound.playCardSelect();
                setSelectedFighterSheet('chad');
                setInspectedCard(CHAD_BASIC_MOVES[0]);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                selectedFighterSheet === 'chad' 
                  ? 'bg-amber-500 text-black border-amber-300 shadow-lg shadow-amber-500/30' 
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-amber-500/50'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Chad</span>
            </button>
          </div>

          {/* Card Sheet Header */}
          <div className={`p-6 rounded-3xl bg-gradient-to-r ${currentFighterMeta.color} border ${currentFighterMeta.border} flex flex-col md:flex-row items-center justify-between gap-6`}>
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/20 text-zinc-100 font-bold text-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentFighterMeta.badge}</span>
              </div>
              <h3 className="font-arcade text-3xl sm:text-4xl font-bold uppercase text-zinc-100">
                {currentFighterMeta.name.toUpperCase()} • 8 MOVE ROSTER
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl">
                {currentFighterMeta.desc} Every move features illustrated combat art, deterministic Power ratings, and matrix resolution priority.
              </p>
            </div>

            {/* Quick Card Sheet Poster */}
            <div className="relative group shrink-0 w-44 sm:w-56 rounded-2xl overflow-hidden border-2 border-white/30 shadow-2xl">
              <img
                src={currentSheetArt}
                alt={`${currentFighterMeta.name} Card Sheet`}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center p-2">
                <span className="font-arcade text-[10px] text-amber-300 font-bold uppercase">OFFICIAL MOVE SHEET ART</span>
              </div>
            </div>
          </div>

          {/* Interactive 8-Card Grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-arcade text-xl font-bold uppercase text-zinc-200">
                SELECT A CARD TO INSPECT MATCHUPS:
              </h4>
              <span className={`text-xs ${currentFighterMeta.textAccent} font-bold`}>
                Inspecting: #{inspectedCard.moveNumber} {inspectedCard.name} (PWR {inspectedCard.power || inspectedCard.damage})
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {currentDeck.map((card) => {
                const isCurrent = inspectedCard.name === card.name;
                const isBeatenByInspected = inspectedCard.beats && inspectedCard.beats.includes(card.name);
                const beatsInspected = card.beats && card.beats.includes(inspectedCard.name);
                const isTiedWithInspected = inspectedCard.name === card.name || (inspectedCard.ties && inspectedCard.ties.includes(card.name));

                return (
                  <div key={card.id} className="relative flex flex-col">
                    <CardItem
                      card={card}
                      size="sm"
                      isSelected={isCurrent}
                      onClick={() => {
                        sound.playCardSelect();
                        setInspectedCard(card);
                      }}
                    />

                    {/* Matchup pill against current inspected card */}
                    {!isCurrent && (
                      <div className="mt-1 text-center">
                        {isBeatenByInspected && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-700/80 block truncate">
                            BEATEN BY #{inspectedCard.moveNumber}
                          </span>
                        )}
                        {beatsInspected && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-red-950/90 text-red-300 border border-red-700/80 block truncate">
                            BEATS #{inspectedCard.moveNumber}
                          </span>
                        )}
                        {isTiedWithInspected && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-950/90 text-amber-300 border border-amber-700/80 block truncate">
                            TIES #{inspectedCard.moveNumber}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Deep Inspection Panel for Selected Card */}
          <div className="p-6 rounded-3xl bg-zinc-900 border-2 border-amber-500/50 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            
            {/* Card Preview */}
            <div className="flex flex-col items-center justify-center">
              <CardItem
                card={inspectedCard}
                size="md"
                showMatrixBreakdown={true}
              />
            </div>

            {/* Matchup Breakdown Details */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <span className="text-xs uppercase font-bold text-amber-400">
                    CARD PROFILE #{inspectedCard.moveNumber} • {currentFighterMeta.name.toUpperCase()}
                  </span>
                  <h3 className="font-arcade text-3xl font-black text-zinc-100 uppercase">
                    {inspectedCard.name}
                  </h3>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-red-950 border border-red-700 text-red-300 font-arcade text-xl font-bold">
                  POWER: {inspectedCard.power || inspectedCard.damage}
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {inspectedCard.description}
              </p>

              {/* Matrix Lists */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                
                {/* BEATS LIST */}
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800/60 space-y-2">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs uppercase">
                    <Check className="w-4 h-4" />
                    <span>BEATS ({inspectedCard.beats?.length || 0})</span>
                  </div>
                  <div className="space-y-1">
                    {inspectedCard.beats?.map((move, i) => (
                      <div key={i} className="text-xs font-semibold text-emerald-200 bg-emerald-900/40 px-2 py-1 rounded truncate">
                        ✓ {move}
                      </div>
                    ))}
                  </div>
                </div>

                {/* TIES LIST */}
                <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/60 space-y-2">
                  <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase">
                    <Minus className="w-4 h-4" />
                    <span>TIES ({inspectedCard.ties?.length || 0})</span>
                  </div>
                  <div className="space-y-1">
                    {inspectedCard.ties?.map((move, i) => (
                      <div key={i} className="text-xs font-semibold text-amber-200 bg-amber-900/40 px-2 py-1 rounded truncate">
                        = {move}
                      </div>
                    ))}
                  </div>
                </div>

                {/* LOSES TO LIST */}
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 space-y-2">
                  <div className="flex items-center gap-1.5 text-red-400 font-bold text-xs uppercase">
                    <X className="w-4 h-4" />
                    <span>LOSES TO ({inspectedCard.losesTo?.length || 0})</span>
                  </div>
                  <div className="space-y-1">
                    {inspectedCard.losesTo?.map((move, i) => (
                      <div key={i} className="text-xs font-semibold text-red-200 bg-red-900/40 px-2 py-1 rounded truncate">
                        ✗ {move}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* TAB 2: INTERACTIVE MATCHUP CALCULATOR */}
      {selectedRuleTab === 'simulator' && (
        <div className="space-y-6 max-w-4xl mx-auto animate-fade-in">
          <div className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-6">
            <div className="text-center space-y-1">
              <h3 className="font-arcade text-3xl font-bold uppercase text-amber-400">
                HEAD-TO-HEAD MATCHUP CALCULATOR
              </h3>
              <p className="text-xs text-zinc-400">
                Select any two character cards to simulate the Kick/Punch resolution outcome!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              
              {/* Player 1 Card Picker */}
              <div className="space-y-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <label className="block text-xs font-bold uppercase text-amber-400">
                  PLAYER 1 (FIREBIRD) MOVE
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {FIREBIRD_BASIC_MOVES.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => {
                        sound.playCardSelect();
                        setSimP1Card(card);
                      }}
                      className={`p-2 rounded-lg text-xs font-bold uppercase transition-all truncate ${
                        simP1Card.id === card.id 
                          ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30' 
                          : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      {card.moveNumber}. {card.name}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center pt-2">
                  <CardItem card={simP1Card} size="sm" />
                </div>
              </div>

              {/* Player 2 Card Picker */}
              <div className="space-y-3 p-4 rounded-2xl bg-zinc-950 border border-zinc-800">
                <label className="block text-xs font-bold uppercase text-cyan-400">
                  PLAYER 2 (TIDAL WAVE) MOVE
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {TIDAL_BASIC_MOVES.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => {
                        sound.playCardSelect();
                        setSimP2Card(card);
                      }}
                      className={`p-2 rounded-lg text-xs font-bold uppercase transition-all truncate ${
                        simP2Card.id === card.id 
                          ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/30' 
                          : 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800'
                      }`}
                    >
                      {card.moveNumber}. {card.name}
                    </button>
                  ))}
                </div>
                <div className="flex justify-center pt-2">
                  <CardItem card={simP2Card} size="sm" />
                </div>
              </div>

            </div>

            {/* Resolution Banner */}
            <div className={`p-5 rounded-2xl border-2 text-center space-y-2 ${
              simResult.status === 'win' 
                ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200' 
                : simResult.status === 'lose'
                ? 'bg-red-950/60 border-red-500 text-red-200'
                : 'bg-amber-950/60 border-amber-500 text-amber-200'
            }`}>
              <span className="font-arcade text-xs uppercase tracking-widest font-bold block">
                RESOLVED CLASH
              </span>
              <h4 className="font-arcade text-2xl sm:text-3xl font-black uppercase">
                {simResult.text}
              </h4>
            </div>

          </div>
        </div>
      )}

      {/* TAB 3: 8x8 COMPLETE CLASH TABLE */}
      {selectedRuleTab === 'matrix' && (
        <div className="space-y-6 animate-fade-in overflow-x-auto">
          <div className="min-w-[700px] p-6 rounded-3xl bg-zinc-900 border border-zinc-800 space-y-4">
            <div className="text-center space-y-1">
              <h3 className="font-arcade text-2xl sm:text-3xl font-bold uppercase text-amber-400">
                THE COMPLETE 8×8 INTERACTION MATRIX
              </h3>
              <p className="text-xs text-zinc-400">
                Green Check = Row Beats Column • Red Cross = Row Loses To Column • Minus = Tie
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-center text-xs border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 border border-zinc-800 bg-zinc-950 text-zinc-400 font-arcade">MOVE</th>
                    {UNIVERSAL_BASIC_MOVES.map((m) => (
                      <th key={m.id} className="p-2 border border-zinc-800 bg-zinc-950 text-amber-400 font-bold uppercase">
                        {m.moveNumber}. {m.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {UNIVERSAL_BASIC_MOVES.map((rowMove) => (
                    <tr key={rowMove.id} className="hover:bg-zinc-800/50 transition-colors">
                      <td className="p-2.5 border border-zinc-800 bg-zinc-950 text-zinc-100 font-bold text-left font-arcade whitespace-nowrap">
                        {rowMove.moveNumber}. {rowMove.name} (PWR {rowMove.power || rowMove.damage})
                      </td>
                      {UNIVERSAL_BASIC_MOVES.map((colMove) => {
                        const isWin = rowMove.beats?.some(b => b.toLowerCase() === colMove.name.toLowerCase());
                        const isLoss = colMove.beats?.some(b => b.toLowerCase() === rowMove.name.toLowerCase());
                        const isTie = rowMove.id === colMove.id;

                        return (
                          <td key={colMove.id} className="p-2 border border-zinc-800 text-center">
                            {isWin ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-700 font-bold">
                                ✓
                              </span>
                            ) : isLoss ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-950 text-red-400 border border-red-700 font-bold">
                                ✗
                              </span>
                            ) : isTie ? (
                              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-950 text-amber-400 border border-amber-700 font-bold">
                                =
                              </span>
                            ) : (
                              <span className="text-zinc-600">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: TURN SEQUENCE */}
      {selectedRuleTab === 'turn_order' && (
        <div className="space-y-4 max-w-4xl mx-auto animate-fade-in">
          
          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-arcade text-xl flex items-center justify-center font-bold shrink-0">
              1
            </div>
            <div>
              <h4 className="font-arcade text-2xl font-bold uppercase text-zinc-100">
                PLANNING & METER EVALUATION
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                Both players examine their HP, Super Meter gauges, active buffs (Burn, Poison, Hype, Shield), and available cards in hand.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-arcade text-xl flex items-center justify-center font-bold shrink-0">
              2
            </div>
            <div>
              <h4 className="font-arcade text-2xl font-bold uppercase text-zinc-100">
                SECRET MOVE SELECTION
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                Both players secretly pick one card from their hand and place it face down on the tabletop.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-arcade text-xl flex items-center justify-center font-bold shrink-0">
              3
            </div>
            <div>
              <h4 className="font-arcade text-2xl font-bold uppercase text-zinc-100">
                THE SIMULTANEOUS REVEAL (3 - 2 - 1)
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                Both players flip their cards simultaneously! The suspense peaks as the selected moves are revealed head-to-head.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-arcade text-xl flex items-center justify-center font-bold shrink-0">
              4
            </div>
            <div>
              <h4 className="font-arcade text-2xl font-bold uppercase text-zinc-100">
                MATRIX PRIORITY & CLASH RESOLUTION
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                The Kick/Punch matrix determines the winner. If Move A beats Move B, Player A inflicts their move's Power. Ties result in mutual damage or meter gain.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 font-arcade text-xl flex items-center justify-center font-bold shrink-0">
              5
            </div>
            <div>
              <h4 className="font-arcade text-2xl font-bold uppercase text-zinc-100">
                DAMAGE, METER & PASSIVES
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 mt-1">
                HP is deducted from the recipient, Super Meter is awarded for successful clashes/blocks, and passives (Chad's Frat Hype, Firebird's Combustion, Tidal Wave's Iron Tide) trigger!
              </p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: FAQ & STRATEGY TIPS */}
      {selectedRuleTab === 'faq' && (
        <div className="space-y-4 max-w-3xl mx-auto animate-fade-in">
          
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="font-bold text-amber-400 text-sm">Q: How do High Block and Low Block differ?</span>
            <p className="text-xs text-zinc-300">
              High Block beats high aggression moves (Jab, Hook, Front Kick). Low Block crouches to absorb Roundhouse Kick, Jump aerials, and Reverse attempts!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="font-bold text-amber-400 text-sm">Q: Why use Roundhouse Kick if it's slow?</span>
            <p className="text-xs text-zinc-300">
              Roundhouse Kick possesses the highest raw Power in the core set (Power 4!). It crushes High Block, Hook, and Reverse.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="font-bold text-amber-400 text-sm">Q: How do Super Finishers interact with the matrix?</span>
            <p className="text-xs text-zinc-300">
              Finishers cost 3 Super Meter and inflict 8–13 massive damage. They override normal basic move priority, crushing regular strikes unless stopped by unblockable counters.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-1">
            <span className="font-bold text-amber-400 text-sm">Q: What are the character passives?</span>
            <p className="text-xs text-zinc-300">
              • <strong>Firebird:</strong> Combustion Rhythm ignites foes with Burn after consecutive hits.<br />
              • <strong>Tidal Wave:</strong> Iron Tide grants +2 Shield whenever he defends or counters.<br />
              • <strong>Chad:</strong> Frat House Hype gains +2 Damage when maxed at 3 stacks.
            </p>
          </div>

        </div>
      )}

    </div>
  );
};
