import React from 'react';
import { BattleArena, BattlePhase } from '../types';

interface AnimatedArenaBackgroundProps {
  arena: BattleArena;
  phase?: BattlePhase;
  screenShake?: boolean;
}

export const AnimatedArenaBackground: React.FC<AnimatedArenaBackgroundProps> = ({
  arena,
  phase,
  screenShake = false
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      
      {/* 1. Base Animated Arena Image Layer (Smooth Ken Burns Zoom & Pan) */}
      {arena.image ? (
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-transform duration-1000 animate-arena-pan ${
            screenShake ? 'scale-110' : 'scale-105'
          }`}
          style={{
            backgroundImage: `url(${arena.image})`,
            filter: 'brightness(0.75) contrast(1.15) saturate(1.2)'
          }}
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-b ${arena.bgClass}`} />
      )}

      {/* 2. Arena Specific Atmospheric Animated Effects */}

      {/* VOLCANO / FIREBIRD PEAK FX */}
      {arena.id === 'volcanic_caldera' && (
        <div className="absolute inset-0">
          {/* Pulsing Lava Glow Gradient */}
          <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-red-600/40 via-amber-500/20 to-transparent animate-pulse" />
          
          {/* Animated Rising Flame Embers */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-[15%] bottom-0 w-2.5 h-2.5 rounded-full bg-amber-400 blur-[1px] animate-ember-1 shadow-lg shadow-amber-400" />
            <div className="absolute left-[28%] bottom-0 w-3 h-3 rounded-full bg-red-500 blur-[1px] animate-ember-2 shadow-lg shadow-red-500" />
            <div className="absolute left-[45%] bottom-0 w-2 h-2 rounded-full bg-orange-400 blur-[1px] animate-ember-3 shadow-lg shadow-orange-400" />
            <div className="absolute left-[62%] bottom-0 w-3.5 h-3.5 rounded-full bg-amber-300 blur-[1px] animate-ember-1 shadow-lg shadow-amber-300" />
            <div className="absolute left-[78%] bottom-0 w-2 h-2 rounded-full bg-rose-500 blur-[1px] animate-ember-2 shadow-lg shadow-rose-500" />
            <div className="absolute left-[88%] bottom-0 w-3 h-3 rounded-full bg-amber-500 blur-[1px] animate-ember-3 shadow-lg shadow-amber-500" />
          </div>

          {/* Heat distortion glow */}
          <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent opacity-60 mix-blend-screen" />
        </div>
      )}

      {/* OCEANIC / TIDAL REEF FX */}
      {arena.id === 'oceanic_maelstrom' && (
        <div className="absolute inset-0">
          {/* Surging Wave Ripple Currents */}
          <div className="absolute inset-x-0 bottom-0 h-80 bg-gradient-to-t from-cyan-600/30 via-blue-500/15 to-transparent animate-wave-ripple" />
          
          {/* Sunlight Rays / Storm Light Flares */}
          <div className="absolute -top-20 left-1/4 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -top-10 right-1/4 w-80 h-80 bg-blue-400/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

          {/* Oceanic Mist Spray floating particles */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-[20%] bottom-0 w-3 h-3 rounded-full bg-cyan-200/60 blur-[2px] animate-ember-2" />
            <div className="absolute left-[50%] bottom-0 w-4 h-4 rounded-full bg-blue-200/50 blur-[2px] animate-ember-1" />
            <div className="absolute left-[75%] bottom-0 w-3 h-3 rounded-full bg-teal-200/60 blur-[2px] animate-ember-3" />
          </div>
        </div>
      )}

      {/* UNDERGROUND FIGHT CLUB FX */}
      {arena.id === 'underground_championship' && (
        <div className="absolute inset-0">
          {/* Neon Sign Flickering Pulse */}
          <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-red-600/20 blur-3xl animate-neon-pulse" />
          <div className="absolute top-20 right-20 w-48 h-48 bg-amber-500/15 blur-2xl animate-neon-pulse" />

          {/* Spectator Camera Flash Simulation */}
          <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-white/40 rounded-full blur-xl animate-ping" style={{ animationDuration: '4s' }} />
          <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-white/30 rounded-full blur-xl animate-ping" style={{ animationDuration: '5.5s', animationDelay: '1.5s' }} />

          {/* Drifting Haze / Fog */}
          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-zinc-950/80 via-zinc-900/40 to-transparent" />
        </div>
      )}

      {/* FRAT COURTYARD ARENA FX */}
      {arena.id === 'frat_courtyard' && (
        <div className="absolute inset-0">
          {/* Sweeping Party Concert Spotlights */}
          <div className="absolute bottom-0 left-10 w-48 h-[600px] bg-gradient-to-t from-amber-500/30 via-orange-400/10 to-transparent animate-spotlight-left" />
          <div className="absolute bottom-0 right-10 w-48 h-[600px] bg-gradient-to-t from-rose-500/30 via-purple-400/10 to-transparent animate-spotlight-right" />

          {/* Bonfire Glow */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-amber-600/30 via-orange-500/10 to-transparent animate-pulse" />
          
          {/* Floating Party Sparkles */}
          <div className="absolute left-[30%] bottom-0 w-2 h-2 rounded-full bg-amber-300 blur-[1px] animate-ember-1" />
          <div className="absolute left-[70%] bottom-0 w-2 h-2 rounded-full bg-orange-300 blur-[1px] animate-ember-2" />
        </div>
      )}

      {/* BIO-MECH FACILITY Z FX */}
      {arena.id === 'cyber_facility' && (
        <div className="absolute inset-0">
          {/* Cyber Scanline */}
          <div className="absolute inset-x-0 h-2 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent blur-[1px] animate-scanline" />

          {/* Toxic Reactor Green/Purple Glow */}
          <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-emerald-600/30 via-purple-600/15 to-transparent animate-pulse" />
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-emerald-500/20 blur-3xl animate-pulse" />

          {/* Radioactive Bubbles / Particles */}
          <div className="absolute left-[25%] bottom-0 w-3 h-3 rounded-full bg-emerald-400 blur-[1px] animate-ember-1" />
          <div className="absolute left-[65%] bottom-0 w-3 h-3 rounded-full bg-emerald-300 blur-[1px] animate-ember-3" />
        </div>
      )}

      {/* 3. Universal High-Contrast Dark Overlay Gradients for Pristine UI Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/80" />
      <div className="absolute inset-0 bg-radial from-transparent via-zinc-950/40 to-zinc-950/90" />

      {/* Subtle Halftone Grid Overlay */}
      <div className="absolute inset-0 comic-dots opacity-15 mix-blend-overlay" />
    </div>
  );
};
