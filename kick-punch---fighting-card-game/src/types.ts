export type MoveCategory = 'strike' | 'kick' | 'defense' | 'counter' | 'aerial' | 'grapple' | 'tech';

export type MoveType = 'basic' | 'special' | 'finisher';

export interface CombatCard {
  id: string;
  name: string;
  moveNumber?: number; // 1 to 8 for core moves
  fighterId?: string; // empty for universal basics
  type: MoveType;
  category: MoveCategory;
  speed: number; // 1 (slow) to 7 (instant)
  damage: number;
  power?: number; // Core Power stat from official card rules (2, 3, 4)
  beats?: string[]; // Official matrix beats list
  ties?: string[]; // Official matrix ties list
  losesTo?: string[]; // Official matrix loses to list
  cardImage?: string; // Card artwork illustration
  blockValue?: number; // percentage or flat reduction
  superCost?: number; // For finishers or powerful specials
  description: string;
  flavor?: string;
  iconName?: string;
  isUnblockable?: boolean;
  isAntiAir?: boolean;
  isLowAttack?: boolean;
  countersCategories?: MoveCategory[];
  comboStarter?: boolean;
  effectTags?: string[];
}

export interface FighterStats {
  speed: number; // 1-10
  power: number; // 1-10
  defense: number; // 1-10
  mindgames: number; // 1-10
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface Fighter {
  id: string;
  name: string;
  title: string;
  archetype: string;
  quote: string;
  backstory: string;
  strategy: string;
  themeColor: string; // Tailwind class & hex
  badgeColor: string;
  accentHex: string;
  image: string;
  bannerImage?: string;
  stats: FighterStats;
  passiveName: string;
  passiveDescription: string;
  specials: CombatCard[];
  finishers: CombatCard[];
  taunts: string[];
}

export interface PlayerBattleState {
  fighter: Fighter;
  maxHp: number;
  currentHp: number;
  superMeter: number; // 0 to 3
  maxSuperMeter: number; // 3
  shield: number;
  selectedCard: CombatCard | null;
  hasLockedIn: boolean;
  activeBuffs: {
    burnStacks?: number;
    poisonStacks?: number;
    hypeStacks?: number;
    stunned?: boolean;
    speedBonus?: number;
    damageBonus?: number;
  };
  customDeckSpecials: CombatCard[];
  customFinisher: CombatCard;
  roundWins: number;
}

export type ClashOutcome = 
  | 'P1_HIT' 
  | 'P2_HIT' 
  | 'TRADE' 
  | 'P1_BLOCKED' 
  | 'P2_BLOCKED' 
  | 'P1_REVERSED' 
  | 'P2_REVERSED' 
  | 'P1_DODGED' 
  | 'P2_DODGED' 
  | 'DOUBLE_BLOCK' 
  | 'DOUBLE_DODGE'
  | 'MUTUAL_WHIFF';

export interface TurnResolution {
  turnNumber: number;
  p1Card: CombatCard;
  p2Card: CombatCard;
  p1DamageTaken: number;
  p2DamageTaken: number;
  p1MeterDelta: number;
  p2MeterDelta: number;
  outcome: ClashOutcome;
  headline: string;
  details: string[];
  animationTrigger?: 'p1_attack' | 'p2_attack' | 'clash' | 'block' | 'counter' | 'finisher';
}

export type GameMode = 'vs_ai' | 'pass_and_play' | 'practice_dojo';
export type AIDifficulty = 'easy' | 'medium' | 'hard' | 'arcade_boss';
export type BattlePhase = 'select' | 'reveal' | 'resolving' | 'round_end' | 'match_end';

export interface BattleArena {
  id: string;
  name: string;
  description: string;
  bgClass: string;
  theme: string;
  image?: string;
}
