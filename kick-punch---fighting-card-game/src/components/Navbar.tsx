import React from 'react';
import { Swords, Users, BookOpen, Layers, Volume2, VolumeX, Shield, Play } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export type ActiveTab = 'battle' | 'roster' | 'matrix' | 'deck' | 'dojo';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  isMuted,
  setIsMuted
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
    <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => handleTab('battle')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-red-600 to-rose-700 flex items-center justify-center shadow-lg shadow-red-600/30 border border-amber-400 group-hover:scale-105 transition-transform">
            <Swords className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-arcade text-2xl sm:text-3xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-red-500 to-rose-500 uppercase text-shadow-arcade">
                KICK / PUNCH
              </span>
            </div>
            <span className="text-[10px] text-zinc-400 font-semibold tracking-widest uppercase block -mt-1 font-display">
              The Strategic Fighting Card Game
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/90 p-1.5 rounded-xl border border-zinc-800">
          <button
            id="nav-tab-battle"
            onClick={() => handleTab('battle')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'battle'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-500/20'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Fight Arena</span>
          </button>

          <button
            id="nav-tab-roster"
            onClick={() => handleTab('roster')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'roster'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-500/20'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Fighters Roster</span>
          </button>

          <button
            id="nav-tab-deck"
            onClick={() => handleTab('deck')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'deck'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-500/20'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Deck Loadout</span>
          </button>

          <button
            id="nav-tab-matrix"
            onClick={() => handleTab('matrix')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'matrix'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-500/20'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Rules & Mindgames</span>
          </button>

          <button
            id="nav-tab-dojo"
            onClick={() => handleTab('dojo')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'dojo'
                ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md shadow-red-500/20'
                : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Practice Dojo</span>
          </button>
        </nav>

        {/* Right Tools: Sound FX Toggle */}
        <div className="flex items-center gap-3">
          <button
            id="sound-toggle-btn"
            onClick={toggleAudio}
            title={isMuted ? "Unmute Arcade Audio" : "Mute Audio"}
            className={`p-2 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
              isMuted
                ? 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300'
                : 'bg-amber-500/10 border-amber-500/40 text-amber-400 hover:bg-amber-500/20 shadow-lg shadow-amber-500/10'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            <span className="hidden sm:inline">{isMuted ? 'MUTED' : 'ARCADE SFX'}</span>
          </button>
        </div>

      </div>

      {/* Mobile Navigation Bar */}
      <div className="flex md:hidden border-t border-zinc-800 bg-zinc-950 px-2 py-1.5 overflow-x-auto gap-1">
        <button
          onClick={() => handleTab('battle')}
          className={`flex-1 py-1 px-2 rounded text-[11px] font-bold uppercase tracking-wider whitespace-nowrap text-center ${
            activeTab === 'battle' ? 'bg-red-600 text-white' : 'text-zinc-400'
          }`}
        >
          Arena
        </button>
        <button
          onClick={() => handleTab('roster')}
          className={`flex-1 py-1 px-2 rounded text-[11px] font-bold uppercase tracking-wider whitespace-nowrap text-center ${
            activeTab === 'roster' ? 'bg-red-600 text-white' : 'text-zinc-400'
          }`}
        >
          Roster
        </button>
        <button
          onClick={() => handleTab('deck')}
          className={`flex-1 py-1 px-2 rounded text-[11px] font-bold uppercase tracking-wider whitespace-nowrap text-center ${
            activeTab === 'deck' ? 'bg-red-600 text-white' : 'text-zinc-400'
          }`}
        >
          Deck
        </button>
        <button
          onClick={() => handleTab('matrix')}
          className={`flex-1 py-1 px-2 rounded text-[11px] font-bold uppercase tracking-wider whitespace-nowrap text-center ${
            activeTab === 'matrix' ? 'bg-red-600 text-white' : 'text-zinc-400'
          }`}
        >
          Rules
        </button>
        <button
          onClick={() => handleTab('dojo')}
          className={`flex-1 py-1 px-2 rounded text-[11px] font-bold uppercase tracking-wider whitespace-nowrap text-center ${
            activeTab === 'dojo' ? 'bg-red-600 text-white' : 'text-zinc-400'
          }`}
        >
          Dojo
        </button>
      </div>
    </header>
  );
};
