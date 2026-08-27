import { CombatCard } from '../types';

import chadJabArt from '../assets/images/chad_jab_art_1787803054148.jpg';
import chadHookArt from '../assets/images/chad_hook_art_1787803068647.jpg';
import chadFrontKickArt from '../assets/images/chad_front_kick_1787803083400.jpg';
import chadRoundhouseArt from '../assets/images/chad_roundhouse_1787803099918.jpg';
import chadHighBlockArt from '../assets/images/chad_high_block_1787803118052.jpg';
import chadLowBlockArt from '../assets/images/chad_low_block_1787803133304.jpg';
import chadJumpArt from '../assets/images/chad_jump_art_1787803148590.jpg';
import chadReverseArt from '../assets/images/chad_reverse_art_1787803162859.jpg';
import chadCardSheet from '../assets/images/chad_card_sheet_1787803038926.jpg';

export {
  chadJabArt,
  chadHookArt,
  chadFrontKickArt,
  chadRoundhouseArt,
  chadHighBlockArt,
  chadLowBlockArt,
  chadJumpArt,
  chadReverseArt,
  chadCardSheet
};

export const UNIVERSAL_BASIC_MOVES: CombatCard[] = [
  {
    id: 'basic_jab',
    moveNumber: 1,
    name: 'Jab',
    type: 'basic',
    category: 'strike',
    speed: 5,
    damage: 2,
    power: 2,
    beats: ['Low Block', 'Reverse'],
    ties: ['Jab'],
    losesTo: ['Hook', 'High Block', 'Jump', 'Front Kick', 'Roundhouse Kick'],
    cardImage: chadJabArt,
    description: 'Fastest straight punch. Punishes low guards and catches reversal attempts off guard.',
    flavor: 'Lightning fast straight punch. Snaps out quickly to beat low defenses and reversals.',
    iconName: 'Zap',
    comboStarter: true,
    effectTags: ['Speed 5', 'Power 2', 'Beats: Low Block, Reverse']
  },
  {
    id: 'basic_hook',
    moveNumber: 2,
    name: 'Hook',
    type: 'basic',
    category: 'strike',
    speed: 3,
    damage: 3,
    power: 3,
    beats: ['High Block', 'Jump', 'Reverse'],
    ties: ['Hook'],
    losesTo: ['Jab', 'Low Block', 'Front Kick', 'Roundhouse Kick'],
    cardImage: chadHookArt,
    description: 'Heavy looping punch. Swats jumpers out of the air and cracks open high guards.',
    flavor: 'Devastating looping blow aimed around high defenses.',
    iconName: 'Flame',
    effectTags: ['Speed 3', 'Power 3', 'Beats: High Block, Jump, Reverse']
  },
  {
    id: 'basic_front_kick',
    moveNumber: 3,
    name: 'Front Kick',
    type: 'basic',
    category: 'kick',
    speed: 4,
    damage: 3,
    power: 3,
    isLowAttack: true,
    beats: ['Low Block', 'Jab', 'Reverse'],
    ties: ['Front Kick'],
    losesTo: ['High Block', 'Hook', 'Roundhouse Kick', 'Jump'],
    cardImage: chadFrontKickArt,
    description: 'Direct linear kick. Out-ranges quick jabs and smashes low blockers.',
    flavor: 'Straight push kick to keep spacing and punish rushers.',
    iconName: 'Footprints',
    effectTags: ['Speed 4', 'Power 3', 'Beats: Low Block, Jab, Reverse']
  },
  {
    id: 'basic_roundhouse',
    moveNumber: 4,
    name: 'Roundhouse Kick',
    type: 'basic',
    category: 'kick',
    speed: 2,
    damage: 4,
    power: 4,
    beats: ['High Block', 'Hook', 'Reverse'],
    ties: ['Roundhouse Kick'],
    losesTo: ['Jab', 'Low Block', 'Front Kick', 'Jump'],
    cardImage: chadRoundhouseArt,
    description: 'Maximum power spin kick. Crushes high guards, overpowers hooks, and breaks reversals.',
    flavor: 'Full hip rotation strike that knocks opponents off balance with massive impact.',
    iconName: 'Swords',
    effectTags: ['Speed 2', 'Power 4 (Max Damage)', 'Beats: High Block, Hook, Reverse']
  },
  {
    id: 'basic_high_block',
    moveNumber: 5,
    name: 'High Block',
    type: 'basic',
    category: 'defense',
    speed: 6,
    damage: 0,
    power: 2,
    blockValue: 100,
    beats: ['Jab', 'Hook', 'Front Kick'],
    ties: ['High Block'],
    losesTo: ['Low Block', 'Roundhouse Kick', 'Jump', 'Reverse'],
    cardImage: chadHighBlockArt,
    description: 'Upper guard. Completely shuts down Jabs, Hooks, and Front Kicks, building +1 Super Meter.',
    flavor: 'Crossed arms high guard. Smothers incoming punches and high attacks.',
    iconName: 'Shield',
    effectTags: ['Speed 6', 'Guard Power 2', 'Beats: Jab, Hook, Front Kick']
  },
  {
    id: 'basic_low_block',
    moveNumber: 6,
    name: 'Low Block',
    type: 'basic',
    category: 'defense',
    speed: 6,
    damage: 0,
    power: 2,
    blockValue: 100,
    beats: ['Roundhouse Kick', 'Jump', 'Reverse'],
    ties: ['Low Block'],
    losesTo: ['Jab', 'Hook', 'Front Kick', 'High Block'],
    cardImage: chadLowBlockArt,
    description: 'Crouched low guard. Shuts down heavy Roundhouse Kicks, airborne Jumps, and Reversals.',
    flavor: 'Drop low to absorb sweeping attacks and aerial dives.',
    iconName: 'ShieldAlert',
    effectTags: ['Speed 6', 'Guard Power 2', 'Beats: Roundhouse Kick, Jump, Reverse']
  },
  {
    id: 'basic_jump',
    moveNumber: 7,
    name: 'Jump',
    type: 'basic',
    category: 'aerial',
    speed: 4,
    damage: 3,
    power: 3,
    beats: ['Jab', 'Low Block', 'Reverse'],
    ties: ['Jump'],
    losesTo: ['Hook', 'High Block', 'Front Kick', 'Roundhouse Kick'],
    cardImage: chadJumpArt,
    description: 'Airborne vault. Leaps over low blocks, avoids jabs, and drops down on reversals.',
    flavor: 'Vault into the air to dodge low defenses and crash down with retribution.',
    iconName: 'ArrowUp',
    effectTags: ['Speed 4', 'Power 3', 'Beats: Jab, Low Block, Reverse']
  },
  {
    id: 'basic_reverse',
    moveNumber: 8,
    name: 'Reverse',
    type: 'basic',
    category: 'counter',
    speed: 6,
    damage: 2,
    power: 2,
    countersCategories: ['strike', 'kick'],
    beats: ['Jab', 'Hook', 'Roundhouse Kick'],
    ties: ['Reverse'],
    losesTo: ['Front Kick', 'High Block', 'Low Block', 'Jump'],
    cardImage: chadReverseArt,
    description: 'Tactical parry. Catches high-aggression Jabs, Hooks, and Roundhouse Kicks to turn momentum.',
    flavor: 'Read the aggression. Turn the opponent\'s own strength into their downfall.',
    iconName: 'RotateCcw',
    effectTags: ['Speed 6', 'Power 2 (Reflect)', 'Beats: Jab, Hook, Roundhouse Kick']
  }
];
