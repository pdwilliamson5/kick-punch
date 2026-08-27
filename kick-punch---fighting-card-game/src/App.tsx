/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Fighter, GameMode, AIDifficulty, BattleArena, CombatCard } from './types';
import { FIGHTERS, ARENAS } from './data/fighters';
import { Navbar, ActiveTab } from './components/Navbar';
import { FighterSelect } from './components/FighterSelect';
import { ArenaBattle } from './components/ArenaBattle';
import { RosterShowcase } from './components/RosterShowcase';
import { CombatMatrixRules } from './components/CombatMatrixRules';
import { DeckBuilder } from './components/DeckBuilder';
import { PracticeDojo } from './components/PracticeDojo';
import { sound } from './utils/soundEffects';
import { Swords, Shield, Users, Trophy, Sparkles, Play, BookOpen } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('battle');
  const [isMuted, setIsMuted] = useState<boolean>(false);

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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-amber-500 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'battle') {
            // Keep battle state or allow switching back
          }
        }}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Main Content Area */}
      <main className="flex-1">
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
      </main>

      {/* Arcade Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-arcade text-lg font-bold text-amber-400 tracking-wider">
              KICK / PUNCH
            </span>
            <span className="text-zinc-600">|</span>
            <span>The Strategic Fighting Card Game • 2 Players • Ages 13+</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-zinc-400 font-medium">
            <span>Jab • Hook • Front Kick • Roundhouse • Block • Jump • Reverse</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
