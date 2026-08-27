import React, { useState } from 'react';
import { Flame, Sparkles, Volume2, VolumeX, Tv, Coins } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface ArcadeCabinetProps {
  children: React.ReactNode;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isCrtEnabled: boolean;
  setIsCrtEnabled: (crt: boolean) => void;
}

export const ArcadeCabinet: React.FC<ArcadeCabinetProps> = ({
  children,
  isMuted,
  setIsMuted,
  isCrtEnabled,
  setIsCrtEnabled,
}) => {
  const [credits, setCredits] = useState<number>(2);
  const [activeStickDir, setActiveStickDir] = useState<string | null>(null);
  const [pressedButton, setPressedButton] = useState<number | null>(null);

  const handleInsertCoin = () => {
    sound.playCoinInsert();
    setCredits((prev) => prev + 1);
  };

  const handleJoystickMove = (dir: string) => {
    sound.playCabinetClick();
    setActiveStickDir(dir);
    setTimeout(() => setActiveStickDir(null), 180);
  };

  const handleButtonClick = (btnIndex: number) => {
    sound.playCabinetClick();
    setPressedButton(btnIndex);
    setTimeout(() => setPressedButton(null), 150);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col items-center justify-start p-0 sm:p-3 md:p-6 select-none overflow-x-hidden relative">
      
      {/* Ambient Arcade Room Lighting (Background Neon Reflection) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-950/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-950/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-amber-950/20 rounded-full blur-3xl" />
      </div>

      {/* Main Arcade Cabinet Housing */}
      <div className="relative z-10 w-full max-w-[1440px] flex flex-col items-center">
        
        {/* ========================================================= */}
        {/* 1. TOP CABINET MARQUEE (BACKLIT WITH KICK PUNCH LOGO)     */}
        {/* ========================================================= */}
        <div className="w-full relative px-2 sm:px-6 pt-2">
          
          {/* Cabinet Top Header Slanted Frame */}
          <div className="relative w-full rounded-t-2xl sm:rounded-t-3xl bg-zinc-950 border-t-4 border-x-4 border-zinc-800 shadow-[0_-8px_30px_rgba(0,0,0,0.9)] overflow-hidden">
            
            {/* Outer Red/Orange Rubber T-Molding Top Edge */}
            <div className="h-3 w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 shadow-[0_0_15px_rgba(239,68,68,0.7)] border-b border-black" />

            {/* Cabinet Top Cap Texture with Rivets */}
            <div className="h-4 bg-gradient-to-b from-zinc-900 to-zinc-950 flex items-center justify-between px-4 sm:px-12 border-b border-zinc-800">
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 shadow-inner border border-zinc-900" />
              <div className="flex gap-4 sm:gap-16">
                <div className="w-2 h-2 rounded-full bg-zinc-700 shadow-inner" />
                <div className="w-2 h-2 rounded-full bg-zinc-700 shadow-inner" />
                <div className="w-2 h-2 rounded-full bg-zinc-700 shadow-inner" />
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-zinc-700 shadow-inner border border-zinc-900" />
            </div>

            {/* MARQUEE SIGN HOUSING (Backlit Translucent Glow Box) */}
            <div className="relative p-2 sm:p-4 bg-black/90">
              
              {/* Backlit Illumination Panel */}
              <div className="relative w-full rounded-xl marquee-diffuser border-4 border-zinc-900 shadow-[0_0_40px_rgba(255,230,170,0.45),inset_0_0_30px_rgba(255,255,255,0.9)] overflow-hidden py-4 sm:py-6 px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Fluorescent Light Glow Behind Graphics */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-200/40 via-white/80 to-amber-200/40 pointer-events-none" />
                
                {/* Left Side: Arcade Sub-Badge */}
                <div className="relative z-10 flex items-center gap-3">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-b from-red-600 via-amber-600 to-zinc-950 p-[2px] shadow-[0_0_20px_rgba(239,68,68,0.8)]">
                    <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-red-900/60 to-amber-500/40" />
                      <Flame className="w-8 h-8 text-amber-400 animate-pulse drop-shadow-[0_0_10px_#f59e0b]" />
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col">
                    <span className="font-pixel text-[9px] text-zinc-900 font-bold uppercase tracking-widest bg-amber-400/90 px-2 py-0.5 rounded border border-amber-600 shadow-sm">
                      ★ CPS-II ARCADE ★
                    </span>
                    <span className="font-pixel text-[8px] text-zinc-800 font-bold mt-1">
                      COIN-OP TURBO SYSTEM
                    </span>
                  </div>
                </div>

                {/* CENTER: MASSIVE 1980S / 90S ACTION MOVIE KICK PUNCH LOGO */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="flex items-center justify-center gap-2 sm:gap-3 leading-none drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                    <span className="action-logo-kick text-4xl sm:text-6xl md:text-7xl font-black tracking-tight select-none">
                      KICK
                    </span>
                    <span className="action-logo-slash text-3xl sm:text-5xl md:text-6xl font-black mx-0.5 select-none">
                      ⚡
                    </span>
                    <span className="action-logo-punch text-4xl sm:text-6xl md:text-7xl font-black tracking-tight select-none">
                      PUNCH
                    </span>
                  </div>

                  {/* Marquee Banner Subtitle */}
                  <div className="flex items-center gap-2 sm:gap-3 mt-1.5">
                    <div className="h-0.5 w-6 sm:w-12 bg-gradient-to-r from-transparent to-red-600" />
                    <span className="font-pixel text-[9px] sm:text-[11px] font-black text-black uppercase tracking-widest bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 px-3 py-1 rounded shadow-md border border-amber-600">
                      TURBO ARCADE '94 • 2-PLAYER SIMULTANEOUS VERSUS
                    </span>
                    <div className="h-0.5 w-6 sm:w-12 bg-gradient-to-l from-transparent to-red-600" />
                  </div>
                </div>

                {/* Right Side: Free Play / Insert Coin & Controls */}
                <div className="relative z-10 flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={handleInsertCoin}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/90 hover:bg-black text-amber-300 border-2 border-amber-500/80 shadow-[0_0_12px_rgba(245,158,11,0.4)] active:scale-95 transition-all cursor-pointer"
                    title="Insert 25¢ Token"
                  >
                    <Coins className="w-4 h-4 text-amber-400 animate-bounce" />
                    <span className="font-pixel text-[9px] font-bold">
                      CREDITS: {credits < 10 ? `0${credits}` : credits}
                    </span>
                  </button>
                </div>

              </div>

              {/* Lower Bezel Trim with Acrylic Mount Screws */}
              <div className="flex items-center justify-between px-3 pt-1.5 text-zinc-600">
                <span className="text-[10px]">●</span>
                <span className="font-pixel text-[8px] text-zinc-500 uppercase tracking-widest">
                  ★ LICENSED BY CAPCOM CPS-II / TAITO SOUND ENGINE ★
                </span>
                <span className="text-[10px]">●</span>
              </div>
            </div>

            {/* Overhang Hood Shadow (Casts shadow downward onto CRT Bezel) */}
            <div className="h-5 bg-gradient-to-b from-black via-zinc-950 to-zinc-900 border-b-2 border-zinc-800 shadow-[inset_0_10px_20px_rgba(0,0,0,0.9)]" />
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. RECESSED CRT MONITOR BEZEL (THE BORDERS OF THE SCREEN)  */}
        {/* ========================================================= */}
        <div className="w-full relative px-0 sm:px-4 md:px-6">
          
          {/* Outer Side Cabinet Wings with Authentic Orange/Red T-Molding */}
          <div className="relative bg-zinc-950 border-x-4 sm:border-x-8 border-zinc-900 shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
            
            {/* Left T-Molding Strip */}
            <div className="absolute top-0 bottom-0 left-0 w-2.5 sm:w-3.5 cabinet-t-molding-left z-30 pointer-events-none" />
            
            {/* Right T-Molding Strip */}
            <div className="absolute top-0 bottom-0 right-0 w-2.5 sm:w-3.5 cabinet-t-molding-right z-30 pointer-events-none" />

            {/* Recessed CRT Monitor Molded Bezel Frame */}
            <div className="p-2 sm:p-4 md:p-6 bg-gradient-to-b from-zinc-950 via-[#0d0e12] to-zinc-950">
              
              {/* Molded Outer Bezel Plastic with Curved Inner Corners */}
              <div className="relative rounded-2xl sm:rounded-3xl border-4 sm:border-8 border-zinc-900 bg-black p-1 sm:p-3 shadow-[inset_0_0_50px_rgba(0,0,0,0.9),0_0_0_2px_rgba(255,255,255,0.06)] overflow-hidden">
                
                {/* Top Bezel Speaker Grille Texture */}
                <div className="h-2 w-full flex items-center justify-center gap-1.5 opacity-30 mb-1">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="w-1 h-1 rounded-full bg-zinc-600" />
                  ))}
                </div>

                {/* CRT Screen Display Container */}
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-black crt-bezel-shadow border border-zinc-800/80">
                  
                  {/* CRT Glass Reflection Glare (Curved top-left gloss) */}
                  <div className="absolute inset-0 crt-glass-glare z-30 pointer-events-none" />
                  
                  {/* CRT Scanline & Phosphor Grid Overlay (if enabled) */}
                  {isCrtEnabled && (
                    <div className="absolute inset-0 crt-overlay z-30 pointer-events-none" />
                  )}

                  {/* VIGNETTE / CURVED PHOSPHOR TUBE SHADOW */}
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.75)] z-20 pointer-events-none" />

                  {/* ACTUAL SCREEN CONTENT (Everything inside the CRT monitor) */}
                  <div className="relative z-10 min-h-[600px] flex flex-col bg-zinc-950/95">
                    {children}
                  </div>

                </div>

                {/* Bottom Bezel Model & Brand Marking */}
                <div className="flex items-center justify-between px-3 pt-2 text-zinc-500 font-pixel text-[7px] sm:text-[8px]">
                  <span className="text-zinc-600">NANAO DUAL-SYNC 29" CRT TUBE</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
                    <span className="text-emerald-400">15KHz RGB ACTIVE</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ========================================================= */}
        {/* 3. LOWER CABINET CONTROL PANEL (JOYSTICK & 6-BUTTON DECK) */}
        {/* ========================================================= */}
        <div className="w-full relative px-2 sm:px-6 pb-6">
          
          <div className="relative rounded-b-2xl sm:rounded-b-3xl bg-zinc-950 border-b-4 border-x-4 border-zinc-800 shadow-[0_20px_40px_rgba(0,0,0,0.9)] overflow-hidden">
            
            {/* Control Panel Metal/Textured Shelf */}
            <div className="arcade-panel-texture p-4 sm:p-6 border-t-2 border-zinc-800 relative">
              
              {/* Subtle metal glare line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />

              <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                
                {/* 1P Controls: Joystick & Start Button */}
                <div className="flex items-center gap-6">
                  
                  {/* 1P Start Button */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleButtonClick(99)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-zinc-100 to-zinc-400 border-2 border-zinc-900 shadow-[0_4px_8px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.9)] flex items-center justify-center active:translate-y-0.5 active:shadow-inner transition-all cursor-pointer ${
                        pressedButton === 99 ? 'scale-95 shadow-inner' : ''
                      }`}
                    >
                      <span className="font-pixel text-[8px] text-zinc-900 font-bold">1P</span>
                    </button>
                    <span className="font-pixel text-[7px] text-zinc-400 uppercase mt-1">
                      START
                    </span>
                  </div>

                  {/* 8-Way Ball-Top Arcade Joystick */}
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    
                    {/* Joystick Black Base Washer */}
                    <div className="w-16 h-16 rounded-full bg-zinc-900 border-2 border-zinc-950 shadow-inner flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-black/80 shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)]" />
                    </div>

                    {/* Ball Top Handle */}
                    <button
                      onClick={() => handleJoystickMove('up')}
                      className={`absolute w-10 h-10 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-red-900 border-2 border-red-950 shadow-[0_8px_16px_rgba(0,0,0,0.8),inset_0_3px_6px_rgba(255,255,255,0.6)] cursor-pointer transition-transform ${
                        activeStickDir ? '-translate-y-1 scale-95 shadow-md' : 'hover:scale-105'
                      }`}
                      title="Arcade Joystick (Click to toggle)"
                    >
                      {/* Highlight reflection */}
                      <div className="absolute top-1.5 left-2 w-3 h-2 rounded-full bg-white/40 blur-[0.5px]" />
                    </button>
                  </div>

                  <span className="hidden sm:inline font-pixel text-[8px] text-zinc-400">
                    PLAYER 1
                  </span>
                </div>

                {/* 6 Action Pushbuttons (3 Red Top Row, 3 Blue Bottom Row) */}
                <div className="flex flex-col gap-2.5">
                  
                  {/* Top Row: Red Punch Buttons (LP, MP, HP) */}
                  <div className="flex items-center gap-3">
                    {['LP', 'MP', 'HP'].map((label, idx) => (
                      <div key={label} className="flex flex-col items-center">
                        <button
                          onClick={() => handleButtonClick(idx)}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-red-500 to-red-800 border-2 border-zinc-900 shadow-[0_5px_10px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.7)] flex items-center justify-center active:translate-y-0.5 active:shadow-inner transition-all cursor-pointer ${
                            pressedButton === idx ? 'scale-95 shadow-inner bg-red-900' : ''
                          }`}
                        >
                          <span className="font-pixel text-[7px] text-white font-bold">{label}</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Row: Blue Kick Buttons (LK, MK, HK) */}
                  <div className="flex items-center gap-3">
                    {['LK', 'MK', 'HK'].map((label, idx) => (
                      <div key={label} className="flex flex-col items-center">
                        <button
                          onClick={() => handleButtonClick(idx + 3)}
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-blue-500 to-blue-800 border-2 border-zinc-900 shadow-[0_5px_10px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.7)] flex items-center justify-center active:translate-y-0.5 active:shadow-inner transition-all cursor-pointer ${
                            pressedButton === idx + 3 ? 'scale-95 shadow-inner bg-blue-900' : ''
                          }`}
                        >
                          <span className="font-pixel text-[7px] text-white font-bold">{label}</span>
                        </button>
                      </div>
                    ))}
                  </div>

                </div>

                {/* 2P Start Button & Coin Slot Housing */}
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => handleButtonClick(98)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-zinc-100 to-zinc-400 border-2 border-zinc-900 shadow-[0_4px_8px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.9)] flex items-center justify-center active:translate-y-0.5 active:shadow-inner transition-all cursor-pointer ${
                        pressedButton === 98 ? 'scale-95 shadow-inner' : ''
                      }`}
                    >
                      <span className="font-pixel text-[8px] text-zinc-900 font-bold">2P</span>
                    </button>
                    <span className="font-pixel text-[7px] text-zinc-400 uppercase mt-1">
                      START
                    </span>
                  </div>

                  {/* Coin Reject / Return Slot Button */}
                  <div 
                    onClick={handleInsertCoin}
                    className="p-2 rounded-lg bg-black border border-amber-500/60 shadow-inner flex flex-col items-center cursor-pointer hover:border-amber-400"
                    title="Insert 25¢ Coin"
                  >
                    <div className="w-1.5 h-6 bg-zinc-900 border border-zinc-700 rounded-sm mb-1" />
                    <span className="font-pixel text-[7px] text-amber-400 animate-pulse">
                      25¢ COIN
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* Bottom Cabinet Rubber T-Molding Edge */}
            <div className="h-3 w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 shadow-[0_0_15px_rgba(239,68,68,0.7)] border-t border-black" />

          </div>

        </div>

      </div>

    </div>
  );
};
