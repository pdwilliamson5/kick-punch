/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Fighter, GameMode, AIDifficulty, BattleArena, CombatCard } from './types';
import { FIGHTERS, ARENAS } from './data/fighters';
import { Navbar, ActiveTab } from './components/Navbar';
import { ArcadeCabinet } from './components/ArcadeCabinet';
import { FighterSelect } from './components/FighterSelect';
import { ArenaBattle } from './components/ArenaBattle';
import { RosterShowcase } from './components/RosterShowcase';
import { CombatMatrixRules } from './components/CombatMatrixRules';
import { DeckBuilder } from './components/DeckBuilder';
import { PracticeDojo } from './components/PracticeDojo';
import { sound } from './utils/soundEffects';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('battle');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isCrtEnabled, setIsCrtEnabled] = useState<boolean>(true);

  // Battle Configuration State
  const [p1Fighter, setP1Fighter] = useState<Fighter>(FIGHTERS[0]); // Firebird
  const [p2Fighter, setP2Fighter] = useState<Fighter>(FIGHTERS[1]); // Tidal Wave
  const [gameMode, setGameMode] = useState<GameMode>('vs_ai');
  const [aiDifficulty, setAiDifficulty] = useState<AIDifficulty>('medium');
  const [selectedArena, setSelectedArena] = useState<BattleArena>(ARENAS[0]);
  
  // Fight State (select vs in-battle)
  const [isBattling, setIsBattling] = useState<boolean>(false);

  const handleStartBattle = () => {
    setIsBattling(true);
  };

  const handleExitToSelect = () => {
    sound.playCardSelect();
    setIsBattling(false);
  };

  const handleGoHome = () => {
    sound.playCardSelect();
    setActiveTab('battle');
    setIsBattling(false);
  };

  const handleEquipLoadout = (fighterId: string, specials: CombatCard[], finisher: CombatCard) => {
    if (p1Fighter.id === fighterId) {
      setP1Fighter(prev => ({
        ...prev,
        specials: specials,
        finishers: [finisher, ...prev.finishers.filter(f => f.id !== finisher.id)]
      }));
    }
    if (p2Fighter.id === fighterId) {
      setP2Fighter(prev => ({
        ...prev,
        specials: specials,
        finishers: [finisher, ...prev.finishers.filter(f => f.id !== finisher.id)]
      }));
    }
  };

  return (
    <ArcadeCabinet
      isMuted={isMuted}
      setIsMuted={setIsMuted}
      isCrtEnabled={isCrtEnabled}
      setIsCrtEnabled={setIsCrtEnabled}
      onGoHome={handleGoHome}
    >
      {/* Top On-Screen Navigation & Channel Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
        onGoHome={handleGoHome}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        isCrtEnabled={isCrtEnabled}
        setIsCrtEnabled={setIsCrtEnabled}
      />

      {/* Main Interactive Screen Content */}
      <div className="flex-1 w-full">
        {activeTab === 'battle' && (
          <div>
            {!isBattling ? (
              <FighterSelect
                p1Fighter={p1Fighter}
                setP1Fighter={setP1Fighter}
                p2Fighter={p2Fighter}
                setP2Fighter={setP2Fighter}
                gameMode={gameMode}
                setGameMode={setGameMode}
                aiDifficulty={aiDifficulty}
                setAiDifficulty={setAiDifficulty}
                selectedArena={selectedArena}
                setSelectedArena={setSelectedArena}
                onStartBattle={handleStartBattle}
              />
            ) : (
              <ArenaBattle
                p1Fighter={p1Fighter}
                p2Fighter={p2Fighter}
                gameMode={gameMode}
                aiDifficulty={aiDifficulty}
                arena={selectedArena}
                onExitToSelect={handleExitToSelect}
              />
            )}
          </div>
        )}

        {activeTab === 'roster' && (
          <RosterShowcase />
        )}

        {activeTab === 'matrix' && (
          <CombatMatrixRules />
        )}

        {activeTab === 'deck' && (
          <DeckBuilder onEquipLoadout={handleEquipLoadout} />
        )}

        {activeTab === 'dojo' && (
          <PracticeDojo />
        )}
      </div>

      {/* In-Screen CRT Status / Bottom Border Bar */}
      <div className="border-t border-zinc-800 bg-black/90 py-2.5 px-4 flex flex-col sm:flex-row items-center justify-between text-[8px] font-pixel text-zinc-500 gap-2">
        <button
          onClick={handleGoHome}
          className="text-amber-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
          title="Return to Home / Character Select"
        >
          <span className="text-white font-bold">◄</span>
          <span>KICK PUNCH • ARCADE VER 2.4.0 (HOME)</span>
        </button>
        <span className="text-amber-400/90">CREDIT 02 • FREE PLAY READY</span>
        <span>© 1994 ALL RIGHTS RESERVED</span>
      </div>
    </ArcadeCabinet>
  );
}
