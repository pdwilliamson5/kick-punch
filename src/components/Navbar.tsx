import React from 'react';
import { Swords, Users, BookOpen, Layers, Volume2, VolumeX, Shield, Play, Tv, Sparkles, Flame } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export type ActiveTab = 'battle' | 'roster' | 'matrix' | 'deck' | 'dojo';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isCrtEnabled: boolean;
  setIsCrtEnabled: (crt: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted,
  isCrtEnabled,
  setIsCrtEnabled
}) => {
  const toggleAudio = () => {
    const nextState = sound.toggleMute();
    setIsMuted(nextState);
    if (!nextState) {
      sound.playCardSelect();
    }
  };

  const handleTab = (tab: ActiveTab) => {
    sound.playCardSelect();
    setActiveTab(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b-2 border-amber-500/60 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      
      {/* Top Arcade CRT Glass RGB Line */}
      <div className="h-0.5 bg-gradient-to-r from-red-600 via-amber-400 to-cyan-500" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
        
        {/* Left Side: On-Screen Game Title Status */}
        <div 
          onClick={() => handleTab('battle')}
          className="flex items-center gap-2 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 rounded-lg bg-black border border-amber-500/80 flex items-center justify-center shadow-[0_0_8px_rgba(245,158,11,0.4)] group-hover:scale-105 transition-transform">
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="font-arcade-action text-base sm:text-lg text-amber-300 tracking-wider">
              KICK ⚡ PUNCH
            </span>
            <span className="font-pixel text-[7px] text-zinc-400">
              CPS-II TURBO SYSTEM
            </span>
          </div>
        </div>

        {/* 90s Arcade In-Screen Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-black/90 p-1 rounded-xl border border-zinc-800 shadow-inner">
          <button
            id="nav-tab-battle"
            onClick={() => handleTab('battle')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-arcade-action uppercase tracking-wider transition-all border ${
              activeTab === 'battle'
                ? 'bg-gradient-to-b from-red-500 to-red-700 text-white border-amber-400 shadow-[0_0_10px_rgba(239,68,68,0.6)] text-shadow-arcade scale-105'
                : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:text-amber-400 hover:border-amber-500/50'
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>FIGHT ARENA</span>
          </button>

          <button
            id="nav-tab-roster"
            onClick={() => handleTab('roster')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-arcade-action uppercase tracking-wider transition-all border ${
              activeTab === 'roster'
                ? 'bg-gradient-to-b from-amber-500 to-amber-700 text-black border-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.6)] font-black scale-105'
                : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:text-amber-400 hover:border-amber-500/50'
            }`}
          >
            <Users className="w-3 h-3" />
            <span>ROSTER</span>
          </button>

          <button
            id="nav-tab-deck"
            onClick={() => handleTab('deck')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-arcade-action uppercase tracking-wider transition-all border ${
              activeTab === 'deck'
                ? 'bg-gradient-to-b from-blue-500 to-blue-700 text-white border-cyan-400 shadow-[0_0_10px_rgba(59,130,246,0.6)] text-shadow-arcade scale-105'
                : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:text-amber-400 hover:border-amber-500/50'
            }`}
          >
            <Layers className="w-3 h-3" />
            <span>LOADOUT</span>
          </button>

          <button
            id="nav-tab-matrix"
            onClick={() => handleTab('matrix')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-arcade-action uppercase tracking-wider transition-all border ${
              activeTab === 'matrix'
                ? 'bg-gradient-to-b from-emerald-500 to-emerald-700 text-white border-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.6)] text-shadow-arcade scale-105'
                : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:text-amber-400 hover:border-amber-500/50'
            }`}
          >
            <BookOpen className="w-3 h-3" />
            <span>RULES MATRIX</span>
          </button>

          <button
            id="nav-tab-dojo"
            onClick={() => handleTab('dojo')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-arcade-action uppercase tracking-wider transition-all border ${
              activeTab === 'dojo'
                ? 'bg-gradient-to-b from-purple-500 to-purple-700 text-white border-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.6)] text-shadow-arcade scale-105'
                : 'bg-zinc-900/90 text-zinc-300 border-zinc-800 hover:text-amber-400 hover:border-amber-500/50'
            }`}
          >
            <Shield className="w-3 h-3" />
            <span>DOJO</span>
          </button>
        </nav>

        {/* Right Arcade On-Screen Controls: CRT Filter & Sound Toggle */}
        <div className="flex items-center gap-2">
          
          {/* CRT Scanline Toggle */}
          <button
            id="crt-toggle-btn"
            onClick={() => {
              sound.playCardSelect();
              setIsCrtEnabled(!isCrtEnabled);
            }}
            title={isCrtEnabled ? "Disable 90s CRT Monitor Effect" : "Enable 90s CRT Monitor Effect"}
            className={`px-2 py-1 rounded-lg border flex items-center gap-1 transition-all ${
              isCrtEnabled 
                ? 'bg-emerald-950 border-emerald-500 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4)]'
                : 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Tv className="w-3.5 h-3.5" />
            <span className="font-pixel text-[8px] uppercase">
              CRT {isCrtEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Audio FX Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={toggleAudio}
            title={isMuted ? "Unmute Arcade SFX" : "Mute Audio"}
            className={`p-1.5 sm:px-2 sm:py-1 rounded-lg border transition-all flex items-center gap-1 text-xs font-bold ${
              isMuted
                ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                : 'bg-gradient-to-b from-amber-500 to-amber-700 border-amber-400 text-black font-black shadow-[0_0_8px_rgba(245,158,11,0.4)]'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline font-arcade-action text-[10px]">
              {isMuted ? 'MUTE' : 'SFX'}
            </span>
          </button>
        </div>

      </div>

      {/* Mobile Navigation Bar with 90s Arcade Styling */}
      <div className="flex lg:hidden border-t border-amber-500/30 bg-black px-2 py-1.5 overflow-x-auto gap-1">
        <button
          onClick={() => handleTab('battle')}
          className={`flex-1 py-1.5 px-2 rounded text-[10px] font-arcade-action uppercase tracking-wider whitespace-nowrap text-center border ${
            activeTab === 'battle' ? 'bg-red-600 border-amber-400 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
          }`}
        >
          Arena
        </button>
        <button
          onClick={() => handleTab('roster')}
          className={`flex-1 py-1.5 px-2 rounded text-[10px] font-arcade-action uppercase tracking-wider whitespace-nowrap text-center border ${
            activeTab === 'roster' ? 'bg-amber-600 border-amber-300 text-black font-black' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
          }`}
        >
          Roster
        </button>
        <button
          onClick={() => handleTab('deck')}
          className={`flex-1 py-1.5 px-2 rounded text-[10px] font-arcade-action uppercase tracking-wider whitespace-nowrap text-center border ${
            activeTab === 'deck' ? 'bg-blue-600 border-cyan-400 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
          }`}
        >
          Loadout
        </button>
        <button
          onClick={() => handleTab('matrix')}
          className={`flex-1 py-1.5 px-2 rounded text-[10px] font-arcade-action uppercase tracking-wider whitespace-nowrap text-center border ${
            activeTab === 'matrix' ? 'bg-emerald-600 border-emerald-400 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
          }`}
        >
          Rules
        </button>
        <button
          onClick={() => handleTab('dojo')}
          className={`flex-1 py-1.5 px-2 rounded text-[10px] font-arcade-action uppercase tracking-wider whitespace-nowrap text-center border ${
            activeTab === 'dojo' ? 'bg-purple-600 border-purple-400 text-white' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
          }`}
        >
          Dojo
        </button>
      </div>
    </header>
  );
};

