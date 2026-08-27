import React, { useState, useEffect } from 'react';
import { 
  PlayerBattleState, Fighter, CombatCard, GameMode, AIDifficulty, 
  BattleArena, TurnResolution, BattlePhase 
} from '../types';
import { UNIVERSAL_BASIC_MOVES, getFighterMoves } from '../data/moves';
import { resolveCombatTurn } from '../utils/combatEngine';
import { selectAIMove } from '../utils/aiOpponent';
import { sound } from '../utils/soundEffects';
import { CardItem } from './CardItem';
import { AnimatedArenaBackground } from './AnimatedArenaBackground';
import confetti from 'canvas-confetti';
import { 
  Swords, Shield, Zap, Sparkles, Trophy, RotateCcw, AlertTriangle, 
  Flame, Skull, Volume2, Bot, Users, Eye, Play, ArrowRight, CornerDownRight
} from 'lucide-react';

interface ArenaBattleProps {
  p1Fighter: Fighter;
  p2Fighter: Fighter;
  gameMode: GameMode;
  aiDifficulty: AIDifficulty;
  arena: BattleArena;
  onExitToSelect: () => void;
}

export const ArenaBattle: React.FC<ArenaBattleProps> = ({
  p1Fighter,
  p2Fighter,
  gameMode,
  aiDifficulty,
  arena,
  onExitToSelect
}) => {
  const MAX_HP = 20;

  // Deck initialization
  const getInitialPlayerState = (fighter: Fighter): PlayerBattleState => ({
    fighter,
    maxHp: MAX_HP,
    currentHp: MAX_HP,
    superMeter: 0,
    maxSuperMeter: 3,
    shield: 0,
    selectedCard: null,
    hasLockedIn: false,
    activeBuffs: {
      burnStacks: 0,
      poisonStacks: 0,
      hypeStacks: 0,
      stunned: false,
      speedBonus: 0,
      damageBonus: 0
    },
    customDeckSpecials: fighter.specials.slice(0, 4),
    customFinisher: fighter.finishers[0],
    roundWins: 0
  });

  const [p1State, setP1State] = useState<PlayerBattleState>(getInitialPlayerState(p1Fighter));
  const [p2State, setP2State] = useState<PlayerBattleState>(getInitialPlayerState(p2Fighter));
  
  const [turnCount, setTurnCount] = useState<number>(1);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [phase, setPhase] = useState<BattlePhase>('select');
  const [passAndPlayTurn, setPassAndPlayTurn] = useState<'p1' | 'p2'>('p1');
  const [isPassModalOpen, setIsPassModalOpen] = useState<boolean>(false);
  
  const [lastResolution, setLastResolution] = useState<TurnResolution | null>(null);
  const [battleLog, setBattleLog] = useState<TurnResolution[]>([]);
  const [winner, setWinner] = useState<'p1' | 'p2' | 'draw' | null>(null);

  // FX state
  const [screenShake, setScreenShake] = useState<boolean>(false);
  const [flashColor, setFlashColor] = useState<string | null>(null);
  const [activeTabHand, setActiveTabHand] = useState<'all' | 'basics' | 'specials' | 'finisher'>('all');

  // Trigger round start gong
  useEffect(() => {
    sound.playRoundStart();
  }, [currentRound]);

  // Combine fighter-specific basic moves + player specials + finisher
  const getPlayerHand = (player: PlayerBattleState): CombatCard[] => {
    const basicMoves = getFighterMoves(player.fighter.id);
    const all = [
      ...basicMoves,
      ...player.customDeckSpecials,
      player.customFinisher
    ];
    return all;
  };

  // Select card for Player 1
  const handleP1CardSelect = (card: CombatCard) => {
    if (phase !== 'select') return;
    if (card.superCost && card.superCost > p1State.superMeter) {
      sound.playBlock();
      return;
    }
    sound.playCardSelect();
    setP1State(prev => ({ ...prev, selectedCard: card }));
  };

  // Select card for Player 2 (in Pass & Play mode)
  const handleP2CardSelect = (card: CombatCard) => {
    if (phase !== 'select') return;
    if (card.superCost && card.superCost > p2State.superMeter) {
      sound.playBlock();
      return;
    }
    sound.playCardSelect();
    setP2State(prev => ({ ...prev, selectedCard: card }));
  };

  // Lock In Card (handles vs AI and Pass & Play)
  const handleLockIn = () => {
    if (gameMode === 'vs_ai') {
      if (!p1State.selectedCard) return;

      // Select AI card
      const p2Hand = getPlayerHand(p2State);
      const aiChosen = selectAIMove(p2State, p1State, p2Hand, aiDifficulty, {
        playerLastCard: lastResolution?.p1Card,
        aiLastCard: lastResolution?.p2Card
      });

      setP2State(prev => ({ ...prev, selectedCard: aiChosen }));
      executeClash(p1State.selectedCard, aiChosen);
    } else {
      // Pass & Play Mode
      if (passAndPlayTurn === 'p1') {
        if (!p1State.selectedCard) return;
        setP1State(prev => ({ ...prev, hasLockedIn: true }));
        setIsPassModalOpen(true);
      } else {
        if (!p2State.selectedCard) return;
        setP2State(prev => ({ ...prev, hasLockedIn: true }));
        if (p1State.selectedCard) {
          executeClash(p1State.selectedCard, p2State.selectedCard);
        }
      }
    }
  };

  const handleContinuePassAndPlay = () => {
    setIsPassModalOpen(false);
    setPassAndPlayTurn('p2');
  };

  // Execute simultaneous clash
  const executeClash = (card1: CombatCard, card2: CombatCard) => {
    setPhase('reveal');

    // Play clash audio based on card types
    setTimeout(() => {
      if (card1.type === 'finisher' || card2.type === 'finisher') {
        sound.playFinisher();
        setFlashColor('rgba(239, 68, 68, 0.4)');
      } else if (card1.category === 'counter' || card2.category === 'counter') {
        sound.playReverse();
        setFlashColor('rgba(52, 211, 153, 0.3)');
      } else if (card1.category === 'defense' || card2.category === 'defense') {
        sound.playBlock();
      } else if (card1.category === 'kick' || card2.category === 'kick') {
        sound.playKick();
      } else {
        sound.playPunch();
      }

      setScreenShake(true);
      setTimeout(() => {
        setScreenShake(false);
        setFlashColor(null);
      }, 400);

      // Resolve turn calculations
      const resolution = resolveCombatTurn(turnCount, p1State, p2State, card1, card2);
      setLastResolution(resolution);
      setBattleLog(prev => [resolution, ...prev]);

      // Apply HP, Meters & Buffs
      setP1State(prev => {
        let newHp = Math.max(0, prev.currentHp - resolution.p1DamageTaken);
        let newMeter = Math.min(prev.maxSuperMeter, prev.superMeter + resolution.p1MeterDelta);
        if (card1.superCost) newMeter = Math.max(0, newMeter - card1.superCost);

        // Passive triggers
        const buffs = { ...prev.activeBuffs };
        // Reset single-turn speed/damage bonuses
        buffs.speedBonus = 0;
        buffs.damageBonus = 0;

        if (prev.fighter.id === 'chad' && resolution.p2DamageTaken > 0) {
          buffs.hypeStacks = Math.min(3, (buffs.hypeStacks || 0) + 1);
        }
        if (card1.id === 'fb_inferno_step') {
          buffs.damageBonus = 3;
        }

        // Apply Poison / Burn DoT at start of next round
        if ((buffs.poisonStacks || 0) > 0) {
          newHp = Math.max(0, newHp - (buffs.poisonStacks || 0));
        }
        if ((buffs.burnStacks || 0) > 0) {
          newHp = Math.max(0, newHp - 1);
          buffs.burnStacks = Math.max(0, (buffs.burnStacks || 0) - 1);
        }

        return {
          ...prev,
          currentHp: newHp,
          superMeter: newMeter,
          activeBuffs: buffs,
          selectedCard: null,
          hasLockedIn: false
        };
      });

      setP2State(prev => {
        let newHp = Math.max(0, prev.currentHp - resolution.p2DamageTaken);
        let newMeter = Math.min(prev.maxSuperMeter, prev.superMeter + resolution.p2MeterDelta);
        if (card2.superCost) newMeter = Math.max(0, newMeter - card2.superCost);

        const buffs = { ...prev.activeBuffs };
        buffs.speedBonus = 0;
        buffs.damageBonus = 0;

        if (prev.fighter.id === 'chad' && resolution.p1DamageTaken > 0) {
          buffs.hypeStacks = Math.min(3, (buffs.hypeStacks || 0) + 1);
        }
        if (card2.id === 'fb_inferno_step') {
          buffs.damageBonus = 3;
        }

        if ((buffs.poisonStacks || 0) > 0) {
          newHp = Math.max(0, newHp - (buffs.poisonStacks || 0));
        }
        if ((buffs.burnStacks || 0) > 0) {
          newHp = Math.max(0, newHp - 1);
          buffs.burnStacks = Math.max(0, (buffs.burnStacks || 0) - 1);
        }

        return {
          ...prev,
          currentHp: newHp,
          superMeter: newMeter,
          activeBuffs: buffs,
          selectedCard: null,
          hasLockedIn: false
        };
      });

      setTurnCount(prev => prev + 1);
      setPhase('resolving');

    }, 800);
  };

  // Check victory condition
  useEffect(() => {
    if (phase === 'resolving') {
      if (p1State.currentHp <= 0 && p2State.currentHp <= 0) {
        sound.playKO();
        setWinner('draw');
        setPhase('match_end');
      } else if (p1State.currentHp <= 0) {
        sound.playKO();
        setWinner('p2');
        setPhase('match_end');
      } else if (p2State.currentHp <= 0) {
        sound.playKO();
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setWinner('p1');
        setPhase('match_end');
      }
    }
  }, [p1State.currentHp, p2State.currentHp, phase]);

  // Next Turn
  const handleNextTurn = () => {
    sound.playCardSelect();
    setLastResolution(null);
    setPhase('select');
    setPassAndPlayTurn('p1');
  };

  // Restart match
  const handleRematch = () => {
    sound.playRoundStart();
    setP1State(getInitialPlayerState(p1Fighter));
    setP2State(getInitialPlayerState(p2Fighter));
    setTurnCount(1);
    setPhase('select');
    setPassAndPlayTurn('p1');
    setLastResolution(null);
    setBattleLog([]);
    setWinner(null);
  };

  // Current active player in Pass & Play
  const activeViewingPlayer = gameMode === 'pass_and_play' && passAndPlayTurn === 'p2' ? p2State : p1State;
  const currentHand = getPlayerHand(activeViewingPlayer);
  const filteredHand = currentHand.filter(card => {
    if (activeTabHand === 'basics') return card.type === 'basic';
    if (activeTabHand === 'specials') return card.type === 'special';
    if (activeTabHand === 'finisher') return card.type === 'finisher';
    return true;
  });

  return (
    <div className={`relative min-h-[calc(100vh-4rem)] p-4 sm:p-6 transition-all duration-300 overflow-hidden ${screenShake ? 'translate-x-1 translate-y-1' : ''}`}>
      
      {/* Animated Arena Background of the Picked Stage */}
      <AnimatedArenaBackground 
        arena={arena}
        phase={phase}
        screenShake={screenShake}
      />

      {/* Screen Flash FX */}
      {flashColor && (
        <div 
          className="fixed inset-0 pointer-events-none z-50 transition-opacity"
          style={{ backgroundColor: flashColor }}
        />
      )}

      {/* Foreground UI Container */}
      <div className="relative z-10">

      {/* Arena Title & Mode Info */}
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 mb-2 sm:mb-4 px-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onExitToSelect}
            className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-black hover:bg-zinc-900 border-2 border-zinc-700 text-[9px] sm:text-[10px] font-pixel font-bold text-white uppercase tracking-wider shadow-md hover:border-amber-400 transition-all active:scale-95"
          >
            ◄ EXIT
          </button>
          <span className="text-[9px] sm:text-[10px] font-pixel text-white bg-black/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border-2 border-amber-500/60 uppercase shadow-md truncate max-w-[130px] sm:max-w-none">
            STAGE: {arena.name}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2 sm:px-3 py-1 rounded-lg bg-black border-2 border-red-500 text-white font-pixel text-[9px] sm:text-[10px] font-bold shadow-[0_0_10px_rgba(239,68,68,0.5)]">
            ROUND {currentRound} • TURN {turnCount}
          </span>
        </div>
      </div>

      {/* 90s ARCADE HEALTH BARS & FIGHTERS HEADS-UP DISPLAY (PHONE RESPONSIVE) */}
      <div className="max-w-7xl mx-auto mb-3 sm:mb-6">
        
        {/* Mobile Unified 2-Fighter HUD (< md screen) */}
        <div className="md:hidden bg-black/95 p-2 rounded-xl border-2 border-amber-500/80 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
          <div className="grid grid-cols-12 gap-1.5 items-center">
            
            {/* P1 Mobile Column */}
            <div className="col-span-5 flex flex-col">
              <div className="flex items-center gap-1.5 mb-1">
                <img
                  src={p1State.fighter.image}
                  alt={p1State.fighter.name}
                  className="w-8 h-9 object-cover rounded border border-amber-400 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1">
                  <span className="font-arcade-action text-xs font-black uppercase text-white truncate block leading-tight text-shadow-arcade">
                    {p1State.fighter.name}
                  </span>
                  <span className="font-pixel text-[8px] text-amber-300 block">
                    {p1State.currentHp}/{p1State.maxHp} HP
                  </span>
                </div>
              </div>

              {/* P1 HP Bar */}
              <div className="h-3 bg-zinc-950 rounded border border-amber-500/80 overflow-hidden relative shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-amber-300 via-yellow-400 to-red-500 transition-all duration-300"
                  style={{ width: `${(p1State.currentHp / p1State.maxHp) * 100}%` }}
                />
              </div>

              {/* P1 Super Meter */}
              <div className="flex items-center justify-between mt-1">
                <span className="font-pixel text-[6px] text-purple-400 uppercase">SUPER</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((pip) => (
                    <div
                      key={pip}
                      className={`w-3.5 h-1.5 rounded-xs border transition-all ${
                        p1State.superMeter >= pip
                          ? 'bg-purple-500 border-purple-300 shadow-[0_0_6px_rgba(168,85,247,0.8)]'
                          : 'bg-zinc-900 border-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* P1 Buffs */}
              <div className="flex flex-wrap gap-0.5 mt-0.5">
                {(p1State.activeBuffs.hypeStacks || 0) > 0 && (
                  <span className="font-pixel text-[6px] bg-amber-950 text-amber-300 px-1 rounded border border-amber-600">
                    🔥x{p1State.activeBuffs.hypeStacks}
                  </span>
                )}
                {(p1State.activeBuffs.poisonStacks || 0) > 0 && (
                  <span className="font-pixel text-[6px] bg-purple-950 text-purple-300 px-1 rounded border border-purple-600">
                    ☣x{p1State.activeBuffs.poisonStacks}
                  </span>
                )}
                {(p1State.activeBuffs.burnStacks || 0) > 0 && (
                  <span className="font-pixel text-[6px] bg-red-950 text-red-300 px-1 rounded border border-red-600">
                    ♨x{p1State.activeBuffs.burnStacks}
                  </span>
                )}
              </div>
            </div>

            {/* Center VS Badge */}
            <div className="col-span-2 flex flex-col items-center justify-center text-center">
              <div className="w-7 h-7 rounded-full bg-black border border-red-500 flex items-center justify-center font-arcade-action text-red-500 font-black text-xs shadow-[0_0_8px_rgba(239,68,68,0.7)]">
                VS
              </div>
            </div>

            {/* P2 Mobile Column */}
            <div className="col-span-5 flex flex-col">
              <div className="flex items-center gap-1.5 mb-1 flex-row-reverse">
                <img
                  src={p2State.fighter.image}
                  alt={p2State.fighter.name}
                  className="w-8 h-9 object-cover rounded border border-red-500 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0 flex-1 text-right">
                  <span className="font-arcade-action text-xs font-black uppercase text-white truncate block leading-tight text-shadow-arcade">
                    {p2State.fighter.name}
                  </span>
                  <span className="font-pixel text-[8px] text-red-400 block">
                    {p2State.currentHp}/{p2State.maxHp} HP
                  </span>
                </div>
              </div>

              {/* P2 HP Bar */}
              <div className="h-3 bg-zinc-950 rounded border border-red-500/80 overflow-hidden relative shadow-inner">
                <div 
                  className="h-full bg-gradient-to-l from-red-500 via-amber-400 to-yellow-300 transition-all duration-300 ml-auto"
                  style={{ width: `${(p2State.currentHp / p2State.maxHp) * 100}%` }}
                />
              </div>

              {/* P2 Super Meter */}
              <div className="flex items-center justify-between mt-1 flex-row-reverse">
                <span className="font-pixel text-[6px] text-purple-400 uppercase">SUPER</span>
                <div className="flex gap-1">
                  {[1, 2, 3].map((pip) => (
                    <div
                      key={pip}
                      className={`w-3.5 h-1.5 rounded-xs border transition-all ${
                        p2State.superMeter >= pip
                          ? 'bg-purple-500 border-purple-300 shadow-[0_0_6px_rgba(168,85,247,0.8)]'
                          : 'bg-zinc-900 border-zinc-700'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* P2 Buffs */}
              <div className="flex flex-wrap justify-end gap-0.5 mt-0.5">
                {(p2State.activeBuffs.hypeStacks || 0) > 0 && (
                  <span className="font-pixel text-[6px] bg-amber-950 text-amber-300 px-1 rounded border border-amber-600">
                    🔥x{p2State.activeBuffs.hypeStacks}
                  </span>
                )}
                {(p2State.activeBuffs.poisonStacks || 0) > 0 && (
                  <span className="font-pixel text-[6px] bg-purple-950 text-purple-300 px-1 rounded border border-purple-600">
                    ☣x{p2State.activeBuffs.poisonStacks}
                  </span>
                )}
                {(p2State.activeBuffs.burnStacks || 0) > 0 && (
                  <span className="font-pixel text-[6px] bg-red-950 text-red-300 px-1 rounded border border-red-600">
                    ♨x{p2State.activeBuffs.burnStacks}
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Desktop Detailed HUD (>= md screen) */}
        <div className="hidden md:grid grid-cols-12 gap-3 items-center">
          
          {/* P1 HUD */}
          <div className="col-span-5 bg-black/95 p-3.5 rounded-2xl border-2 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <div className="flex items-center gap-3 mb-1">
              <img
                src={p1State.fighter.image}
                alt={p1State.fighter.name}
                className="w-14 h-16 object-cover rounded-lg border-2 border-amber-400 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-arcade-action text-2xl sm:text-3xl font-black uppercase text-white tracking-wide truncate text-shadow-arcade">
                    {p1State.fighter.name}
                  </span>
                  <span className="font-pixel text-[11px] font-bold text-amber-300">
                    {p1State.currentHp} / {p1State.maxHp} HP
                  </span>
                </div>
                
                {/* HP Bar */}
                <div className="h-5 bg-zinc-950 rounded border-2 border-amber-500/80 overflow-hidden relative mt-1 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-amber-300 via-yellow-400 to-red-500 transition-all duration-300"
                    style={{ width: `${(p1State.currentHp / p1State.maxHp) * 100}%` }}
                  />
                </div>

                {/* Super Meter (3 Pips) */}
                <div className="flex items-center justify-between mt-2">
                  <span className="font-pixel text-[8px] uppercase font-bold text-purple-400">
                    SUPER METER
                  </span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3].map((pip) => (
                      <div
                        key={pip}
                        className={`w-6 h-3 rounded-sm border transition-all ${
                          p1State.superMeter >= pip
                            ? 'bg-purple-500 border-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse'
                            : 'bg-zinc-900 border-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Active Buff Badges */}
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {(p1State.activeBuffs.hypeStacks || 0) > 0 && (
                    <span className="font-pixel text-[8px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500 font-bold">
                      🔥 HYPE x{p1State.activeBuffs.hypeStacks}
                    </span>
                  )}
                  {(p1State.activeBuffs.poisonStacks || 0) > 0 && (
                    <span className="font-pixel text-[8px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500 font-bold">
                      ☣ POISON x{p1State.activeBuffs.poisonStacks}
                    </span>
                  )}
                  {(p1State.activeBuffs.burnStacks || 0) > 0 && (
                    <span className="font-pixel text-[8px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded border border-red-500 font-bold">
                      ♨ BURN x{p1State.activeBuffs.burnStacks}
                    </span>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* Center Versus Indicator */}
          <div className="col-span-2 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-black border-2 border-red-500 flex items-center justify-center font-arcade-action text-white font-black text-xl shadow-[0_0_15px_rgba(239,68,68,0.7)] text-shadow-arcade">
              VS
            </div>
            <span className="font-pixel text-[8px] uppercase text-zinc-300 tracking-widest mt-1">
              SIMULTANEOUS
            </span>
          </div>

          {/* P2 HUD */}
          <div className="col-span-5 bg-black/95 p-3.5 rounded-2xl border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <div className="flex items-center gap-3 mb-1 flex-row-reverse">
              <img
                src={p2State.fighter.image}
                alt={p2State.fighter.name}
                className="w-14 h-16 object-cover rounded-lg border-2 border-red-500 shadow-md"
                referrerPolicy="no-referrer"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-pixel text-[11px] font-bold text-red-400">
                    {p2State.currentHp} / {p2State.maxHp} HP
                  </span>
                  <span className="font-arcade-action text-2xl sm:text-3xl font-black uppercase text-white tracking-wide truncate text-shadow-arcade">
                    {p2State.fighter.name} {gameMode === 'vs_ai' ? '(CPU)' : '(P2)'}
                  </span>
                </div>
                
                {/* HP Bar */}
                <div className="h-5 bg-zinc-950 rounded border-2 border-red-500/80 overflow-hidden relative mt-1 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-l from-red-500 via-amber-400 to-yellow-300 transition-all duration-300 ml-auto"
                    style={{ width: `${(p2State.currentHp / p2State.maxHp) * 100}%` }}
                  />
                </div>

                {/* Super Meter (3 Pips) */}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3].map((pip) => (
                      <div
                        key={pip}
                        className={`w-6 h-3 rounded-sm border transition-all ${
                          p2State.superMeter >= pip
                            ? 'bg-purple-500 border-purple-300 shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse'
                            : 'bg-zinc-900 border-zinc-700'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-pixel text-[8px] uppercase font-bold text-purple-400">
                    SUPER METER
                  </span>
                </div>

                {/* Active Buff Badges */}
                <div className="flex flex-wrap justify-end gap-1 mt-1.5">
                  {(p2State.activeBuffs.hypeStacks || 0) > 0 && (
                    <span className="font-pixel text-[8px] bg-amber-950 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500 font-bold">
                      🔥 HYPE x{p2State.activeBuffs.hypeStacks}
                    </span>
                  )}
                  {(p2State.activeBuffs.poisonStacks || 0) > 0 && (
                    <span className="font-pixel text-[8px] bg-purple-950 text-purple-300 px-1.5 py-0.5 rounded border border-purple-500 font-bold">
                      ☣ POISON x{p2State.activeBuffs.poisonStacks}
                    </span>
                  )}
                  {(p2State.activeBuffs.burnStacks || 0) > 0 && (
                    <span className="font-pixel text-[8px] bg-red-950 text-red-300 px-1.5 py-0.5 rounded border border-red-500 font-bold">
                      ♨ BURN x{p2State.activeBuffs.burnStacks}
                    </span>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>

      {/* CENTER CLASH STAGE (During Reveal / Resolving Phase) */}
      {(phase === 'reveal' || phase === 'resolving') && lastResolution && (
        <div className="max-w-4xl mx-auto my-6 p-6 rounded-3xl bg-zinc-950/95 border-2 border-amber-500/60 shadow-2xl shadow-amber-500/20 comic-dots">
          
          <div className="text-center mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-white/90 block font-display">
              RESOLUTION — TURN {lastResolution.turnNumber}
            </span>
            <h3 className="font-arcade text-3xl sm:text-5xl font-black uppercase text-white text-shadow-arcade">
              {lastResolution.headline}
            </h3>
          </div>

          {/* Cards In Duel */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 my-4">
            
            {/* P1 Revealed Card */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase text-amber-400 mb-2">
                {p1State.fighter.name}'s Move:
              </span>
              <CardItem
                card={lastResolution.p1Card}
                size="md"
                fighterColor={p1State.fighter.accentHex}
              />
              {lastResolution.p1DamageTaken > 0 && (
                <span className="mt-2 text-base font-bold text-red-400 font-arcade">
                  Took -{lastResolution.p1DamageTaken} DMG
                </span>
              )}
            </div>

            {/* Clash Icon in Middle */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-red-600 border-2 border-amber-300 flex items-center justify-center animate-bounce shadow-xl shadow-red-500/40">
                <Swords className="w-7 h-7 text-white" />
              </div>
              <span className="font-arcade text-base text-zinc-300 uppercase mt-1">
                {lastResolution.outcome.replace(/_/g, ' ')}
              </span>
            </div>

            {/* P2 Revealed Card */}
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold uppercase text-red-400 mb-2">
                {p2State.fighter.name}'s Move:
              </span>
              <CardItem
                card={lastResolution.p2Card}
                size="md"
                fighterColor={p2State.fighter.accentHex}
              />
              {lastResolution.p2DamageTaken > 0 && (
                <span className="mt-2 text-base font-bold text-red-400 font-arcade">
                  Took -{lastResolution.p2DamageTaken} DMG
                </span>
              )}
            </div>

          </div>

          {/* Commentary Breakdown */}
          <div className="mt-6 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800 text-center space-y-1">
            {lastResolution.details.map((detail, idx) => (
              <p key={idx} className="text-sm text-zinc-200 font-medium">
                {detail}
              </p>
            ))}
          </div>

          {/* Next Turn Button */}
          {phase === 'resolving' && (
            <div className="mt-6 flex justify-center">
              <button
                id="next-turn-btn"
                onClick={handleNextTurn}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-red-600 to-rose-600 text-white font-arcade text-2xl font-black uppercase tracking-wider shadow-lg shadow-red-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 border border-amber-300"
              >
                <span>NEXT CLASH →</span>
              </button>
            </div>
          )}

        </div>
      )}

      {/* MATCH END SCREEN (K.O. & Victory Fanfare) */}
      {phase === 'match_end' && (
        <div className="max-w-2xl mx-auto my-8 p-8 rounded-3xl bg-zinc-950 border-4 border-amber-400 shadow-2xl text-center space-y-6 animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
            <Trophy className="w-10 h-10 text-amber-400" />
          </div>

          <div>
            <span className="font-arcade text-4xl sm:text-6xl font-black uppercase text-red-500 block text-shadow-arcade">
              K. O. !
            </span>
            <h2 className="font-arcade text-3xl sm:text-5xl font-bold uppercase text-white tracking-wider mt-2">
              {winner === 'p1'
                ? `${p1State.fighter.name} WINS THE MATCH!`
                : winner === 'p2'
                ? `${p2State.fighter.name} WINS THE MATCH!`
                : 'DOUBLE KNOCKOUT — DRAW!'}
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              {winner === 'p1' ? `"${p1State.fighter.quote}"` : winner === 'p2' ? `"${p2State.fighter.quote}"` : "Both fighters fell simultaneously in an epic clash."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleRematch}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-red-600 text-white font-arcade text-2xl font-bold uppercase tracking-wider hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Rematch</span>
            </button>

            <button
              onClick={onExitToSelect}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-200 font-arcade text-2xl font-bold uppercase tracking-wider hover:bg-zinc-800 transition-all"
            >
              Fighter Select
            </button>
          </div>
        </div>
      )}

      {/* SELECTION PHASE: Hand & Card Selector */}
      {phase === 'select' && (
        <div className="max-w-7xl mx-auto space-y-3 sm:space-y-4 pb-28 sm:pb-32">
          
          {/* Action Instruction Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 p-2.5 sm:p-4 rounded-xl sm:rounded-2xl bg-zinc-900/90 border border-zinc-800">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping shrink-0" />
                <h3 className="font-arcade text-lg sm:text-3xl font-black uppercase text-white tracking-wide truncate text-shadow-arcade">
                  {gameMode === 'pass_and_play' 
                    ? passAndPlayTurn === 'p1' ? `${p1State.fighter.name} (P1): SELECT MOVE` : `${p2State.fighter.name} (P2): SELECT MOVE`
                    : `${p1State.fighter.name}: SELECT MOVE`}
                </h3>
              </div>
              <p className="text-[10px] sm:text-xs text-zinc-300 mt-0.5">
                Tap card to select • Tap again or tap Lock button below to confirm!
              </p>
            </div>

            {/* Hand Filter Tabs */}
            <div className="flex items-center gap-1 bg-zinc-950 p-1 rounded-lg sm:rounded-xl border border-zinc-800 text-[10px] sm:text-xs font-bold overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveTabHand('all')}
                className={`px-2 sm:px-2.5 py-1 rounded transition-all shrink-0 ${
                  activeTabHand === 'all' ? 'bg-amber-500 text-black font-black' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                ALL ({currentHand.length})
              </button>
              <button
                onClick={() => setActiveTabHand('basics')}
                className={`px-2 sm:px-2.5 py-1 rounded transition-all shrink-0 ${
                  activeTabHand === 'basics' ? 'bg-amber-500 text-black font-black' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                BASICS
              </button>
              <button
                onClick={() => setActiveTabHand('specials')}
                className={`px-2 sm:px-2.5 py-1 rounded transition-all shrink-0 ${
                  activeTabHand === 'specials' ? 'bg-amber-500 text-black font-black' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                SPECIALS
              </button>
              <button
                onClick={() => setActiveTabHand('finisher')}
                className={`px-2 sm:px-2.5 py-1 rounded transition-all shrink-0 ${
                  activeTabHand === 'finisher' ? 'bg-amber-500 text-black font-black' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                FINISHER
              </button>
            </div>
          </div>

          {/* Player's Available Hand of Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-4 justify-items-center">
            {filteredHand.map((card) => {
              const activePlayerState = (gameMode === 'pass_and_play' && passAndPlayTurn === 'p2' ? p2State : p1State);
              const isSelected = activePlayerState.selectedCard?.id === card.id;
              const hasMeter = !card.superCost || activePlayerState.superMeter >= card.superCost;
              return (
                <CardItem
                  key={card.id}
                  card={card}
                  isSelected={isSelected}
                  isDisabled={!hasMeter}
                  size="md"
                  onClick={() => {
                    if (isSelected) {
                      // Second tap on already selected card locks it in immediately!
                      handleLockIn();
                    } else {
                      if (gameMode === 'pass_and_play' && passAndPlayTurn === 'p2') {
                        handleP2CardSelect(card);
                      } else {
                        handleP1CardSelect(card);
                      }
                    }
                  }}
                  onQuickLock={() => {
                    handleLockIn();
                  }}
                  fighterColor={activeViewingPlayer.fighter.accentHex}
                />
              );
            })}
          </div>

          {/* ZERO-SCROLL FIXED FLOATING LOCK IN ACTION DOCK */}
          {(() => {
            const currentSelectedCard = (gameMode === 'pass_and_play' && passAndPlayTurn === 'p2' ? p2State : p1State).selectedCard;
            return (
              <div className="fixed bottom-2 sm:bottom-4 left-2 right-2 sm:left-1/2 sm:-translate-x-1/2 sm:w-[540px] z-50 p-2 sm:p-3 rounded-2xl bg-zinc-950/95 border-2 border-amber-400 shadow-[0_0_30px_rgba(0,0,0,0.95),0_0_15px_rgba(245,158,11,0.5)] backdrop-blur-lg flex items-center justify-between gap-2 sm:gap-4 animate-fade-in">
                
                {/* Selected Card Status Info */}
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center font-arcade text-base sm:text-lg font-bold shrink-0 transition-colors ${
                    currentSelectedCard ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-zinc-900 border-zinc-700 text-zinc-600'
                  }`}>
                    {currentSelectedCard ? '⚡' : '—'}
                  </div>
                  
                  <div className="leading-tight min-w-0">
                    <span className="text-[8px] sm:text-[9px] uppercase font-pixel tracking-wider text-zinc-400 block truncate">
                      {currentSelectedCard ? 'READY TO LOCK:' : 'SELECT A MOVE'}
                    </span>
                    <span className={`font-arcade text-sm sm:text-xl font-black uppercase truncate block ${
                      currentSelectedCard ? 'text-white text-shadow-arcade' : 'text-zinc-500'
                    }`}>
                      {currentSelectedCard ? currentSelectedCard.name : 'Tap any card above'}
                    </span>
                  </div>
                </div>

                {/* Lock In Button (Always visible on screen without scrolling) */}
                <button
                  id="lock-in-move-btn"
                  disabled={!currentSelectedCard}
                  onClick={handleLockIn}
                  className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-arcade text-base sm:text-2xl font-black uppercase tracking-wider transition-all flex items-center gap-1.5 sm:gap-2 shrink-0 ${
                    currentSelectedCard
                      ? 'bg-gradient-to-r from-amber-400 via-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(239,68,68,0.8)] hover:scale-105 active:scale-95 cursor-pointer border-2 border-yellow-200 animate-pulse'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700 opacity-60'
                  }`}
                >
                  <span>LOCK IN</span>
                  <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                </button>
              </div>
            );
          })()}

        </div>
      )}

      {/* PASS & PLAY HANDOFF MODAL */}
      {isPassModalOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="max-w-md w-full p-8 rounded-3xl bg-zinc-900 border-2 border-red-500 shadow-2xl text-center space-y-6 animate-scale-up">
            <div className="w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center mx-auto">
              <Users className="w-8 h-8 text-red-400" />
            </div>

            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 font-display">
                PLAYER 1 LOCKED IN
              </span>
              <h3 className="font-arcade text-3xl font-bold uppercase text-white mt-1">
                PASS CONTROLS TO PLAYER 2 ({p2State.fighter.name})
              </h3>
              <p className="text-xs text-zinc-400 mt-2">
                Make sure Player 1 does not peek! Player 2 will now select their secret move.
              </p>
            </div>

            <button
              onClick={handleContinuePassAndPlay}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-arcade text-2xl font-bold uppercase tracking-wider shadow-lg shadow-red-600/40 hover:scale-105 transition-all"
            >
              I AM PLAYER 2 — READY!
            </button>
          </div>
        </div>
      )}

      {/* BATTLE LOG DRAWER (Collapsible at bottom) */}
      {battleLog.length > 0 && (
        <div className="max-w-7xl mx-auto mt-8 p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 block mb-2 font-display">
            CLASH HISTORY & ACTION REPLAY ({battleLog.length} TURNS):
          </span>
          <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
            {battleLog.map((log, idx) => (
              <div key={idx} className="p-2.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 font-bold font-arcade">
                    T{log.turnNumber}
                  </span>
                  <span className="font-bold text-amber-400">{log.p1Card.name}</span>
                  <span className="text-zinc-500 font-arcade">VS</span>
                  <span className="font-bold text-red-400">{log.p2Card.name}</span>
                </div>
                <span className="text-zinc-300 font-medium truncate max-w-sm">
                  {log.headline}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      </div>
    </div>
  );
};
