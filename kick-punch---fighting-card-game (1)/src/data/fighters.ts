import { Fighter, BattleArena } from '../types';
import heroFirebirdImg from '../assets/images/hero_firebird_card_1787802354201.jpg';
import heroTidalImg from '../assets/images/hero_tidal_card_1787802366091.jpg';
import heroChadImg from '../assets/images/hero_chad_card_1787802377914.jpg';
import heroWeaponZImg from '../assets/images/hero_weapon_z_1787802402729.jpg';
import battleArenaBgImg from '../assets/images/battle_arena_bg_1787802415818.jpg';
import arenaVolcanoImg from '../assets/images/arena_firebird_volcano_1787805501943.jpg';
import arenaTidalReefImg from '../assets/images/arena_tidal_reef_1787805515918.jpg';
import firebirdSunbirdFinisher from '../assets/images/firebird_sunbird_finisher_1787804970707.jpg';


export const FIGHTERS: Fighter[] = [
  {
    id: 'firebird',
    name: 'Firebird',
    title: 'The Blazing Phoenix',
    archetype: 'Combo Rushdown & Burn Speedster',
    quote: 'From the ashes of every clash, my flame burns brighter!',
    backstory: 'A fiery warrior whose combat instincts were forged in ancient volcanic trials. Firebird overwhelms opponents with blistering pace, blazing feather flurries, and chained combo pressure that leaves enemies no room to breathe.',
    strategy: 'Use superior speed (Speed 5-7) and Combo Starters to chain hits. Keep constant pressure with Ember Sweep against turtling blockers, and trap jumping opponents with Flame Uppercut.',
    themeColor: 'from-amber-600 via-red-600 to-rose-700',
    badgeColor: 'bg-red-600 border-amber-400 text-amber-100',
    accentHex: '#ef4444',
    image: heroFirebirdImg,
    stats: {
      speed: 9,
      power: 7,
      defense: 5,
      mindgames: 8,
      difficulty: 'Medium'
    },
    passiveName: 'Combustion Rhythm',
    passiveDescription: 'Landing 2 consecutive successful attacks ignites the opponent with Burn (deals 1 bonus damage next turn and grants Firebird +1 Priority Speed).',
    specials: [
      {
        id: 'fb_phoenix_dash',
        fighterId: 'firebird',
        name: 'Phoenix Dash',
        type: 'special',
        category: 'strike',
        speed: 6,
        damage: 3,
        description: 'Blazing forward burst punch. Blindingly fast and inflicts 1 stack of Burn on contact.',
        flavor: 'A comet of fire crashes through the opening.',
        iconName: 'Zap',
        comboStarter: true,
        effectTags: ['Speed 6', '+1 Burn Stack', 'High Priority']
      },
      {
        id: 'fb_flame_uppercut',
        fighterId: 'firebird',
        name: 'Flame Uppercut',
        type: 'special',
        category: 'strike',
        speed: 4,
        damage: 4,
        isAntiAir: true,
        description: 'Rising fire uppercut. If the opponent jumps or attacks from the air, deals CRITICAL 7 DAMAGE!',
        flavor: 'Skyward strike that turns aerial foes into falling cinders.',
        iconName: 'Flame',
        effectTags: ['Anti-Air', '7 Dmg vs Jumps', 'Anti-Aerial Punish']
      },
      {
        id: 'fb_ember_sweep',
        fighterId: 'firebird',
        name: 'Ember Sweep',
        type: 'special',
        category: 'kick',
        speed: 4,
        damage: 3,
        isLowAttack: true,
        description: 'Low fiery slide kick. Slips right beneath standing Blocks and knocks opponent off balance.',
        flavor: 'Sliding arc of embers that sweeps the legs out.',
        iconName: 'Flame',
        effectTags: ['Speed 4', 'Bypasses Normal Block', 'Low Sweep']
      },
      {
        id: 'fb_feather_flurry',
        fighterId: 'firebird',
        name: 'Feather Flurry',
        type: 'special',
        category: 'strike',
        speed: 5,
        damage: 4,
        description: 'Rapid multi-hit flurry. If this attack hits, steals 1 Super Meter pip from the opponent!',
        flavor: 'A whirlwind of ember-tipped strikes that saps fighting spirit.',
        iconName: 'Wind',
        effectTags: ['Speed 5', 'Steals 1 Super Meter', 'Rapid Strike']
      },
      {
        id: 'fb_blazing_parry',
        fighterId: 'firebird',
        name: 'Blazing Parry',
        type: 'special',
        category: 'counter',
        speed: 7,
        damage: 0,
        countersCategories: ['strike'],
        description: 'Flame defensive counter. If opponent plays a Strike, deflects it completely and inflicts 4 Fire counter damage + Burn.',
        flavor: 'Catch the incoming fist in a burst of searing heat.',
        iconName: 'ShieldAlert',
        effectTags: ['Speed 7', 'Counters Strikes', '4 Dmg Counter + Burn']
      },
      {
        id: 'fb_inferno_step',
        fighterId: 'firebird',
        name: 'Inferno Step',
        type: 'special',
        category: 'tech',
        speed: 6,
        damage: 0,
        description: 'Evasive flash step. Completely evades all attacks this turn and empowers your next attack with +3 Damage!',
        flavor: 'Vanish into smoke and re-emerge primed for lethal impact.',
        iconName: 'Sparkles',
        effectTags: ['Speed 6', 'Full Evasion', '+3 Dmg Next Turn']
      }
    ],
    finishers: [
      {
        id: 'fb_finisher_wrath',
        fighterId: 'firebird',
        name: 'Wrath of the Sunbird',
        type: 'finisher',
        category: 'strike',
        speed: 5,
        damage: 10,
        superCost: 3,
        isUnblockable: true,
        cardImage: firebirdSunbirdFinisher,
        description: 'CINEMATIC FINISHER: Unleashes the full spirit of the flaming phoenix. Unblockable 10 Damage that scorches the battlefield!',
        flavor: 'The sky ignites with incandescent fury. Total devastation.',
        iconName: 'Flame',
        effectTags: ['Cost: 3 Super', 'Unblockable 10 Dmg', 'Cinematic Finisher']
      },
      {
        id: 'fb_finisher_supernova',
        fighterId: 'firebird',
        name: 'Supernova Dragon Spiral',
        type: 'finisher',
        category: 'kick',
        speed: 6,
        damage: 8,
        superCost: 3,
        description: 'CINEMATIC FINISHER: High-speed ascending spiral kick. Deals 8 Damage, or 13 DAMAGE if the opponent attempted an attack!',
        flavor: 'A spinning pillar of fire that consumes the opponent\'s offense.',
        iconName: 'Zap',
        effectTags: ['Cost: 3 Super', '13 Dmg Counter-Hit', 'High Priority']
      }
    ],
    taunts: [
      'You are playing with real fire now!',
      'Too slow! My sparks are already ahead of you!',
      'Feel the heat of the Sunbird!'
    ]
  },
  {
    id: 'tidal_wave',
    name: 'Tidal Wave',
    title: 'The Oceanic Sovereign',
    archetype: 'Unyielding Tank & Grapple Juggernaut',
    quote: 'The ocean does not negotiate with the shore. It crashes!',
    backstory: 'A towering warrior blessed with the indomitable power of tidal storms. Tidal Wave absorbs staggering punishment, builds protective water barriers, and breaks through opponent defenses with crushing throws and seismic momentum.',
    strategy: 'Outlast aggressive fighters by building shields with Block and Tidal Shield. Use Undertow Grab and Crashing Breaker to punish predictable blocks, then drown foes in high-damage finishers.',
    themeColor: 'from-cyan-600 via-blue-600 to-indigo-800',
    badgeColor: 'bg-blue-600 border-cyan-300 text-cyan-100',
    accentHex: '#0ea5e9',
    image: heroTidalImg,
    stats: {
      speed: 4,
      power: 9,
      defense: 9,
      mindgames: 7,
      difficulty: 'Easy'
    },
    passiveName: 'Iron Tide',
    passiveDescription: 'Takes 1 less damage from all attacks (minimum 1). Whenever Tidal Wave blocks or uses a defensive skill, he gains +2 Shield.',
    specials: [
      {
        id: 'tw_riptide_smash',
        fighterId: 'tidal_wave',
        name: 'Riptide Smash',
        type: 'special',
        category: 'strike',
        speed: 2,
        damage: 6,
        description: 'Colossal two-handed hammer punch. Stuns the opponent on hit, reducing their speed next turn by -2.',
        flavor: 'Like a rogue wave hitting the hull of a ship.',
        iconName: 'Dumbbell',
        effectTags: ['Speed 2', '6 Heavy Dmg', 'Stuns foe (-2 Speed)']
      },
      {
        id: 'tw_undertow_grab',
        fighterId: 'tidal_wave',
        name: 'Undertow Grab',
        type: 'special',
        category: 'grapple',
        speed: 4,
        damage: 4,
        isUnblockable: true,
        description: 'Crushing command grab. Completely ignores opponent Block and Reverse, slamming them to the ground!',
        flavor: 'Pulls the foe beneath the surface where no defense works.',
        iconName: 'Hand',
        effectTags: ['Speed 4', 'Unblockable Grapple', 'Beats Block & Reverse']
      },
      {
        id: 'tw_crashing_breaker',
        fighterId: 'tidal_wave',
        name: 'Crashing Breaker',
        type: 'special',
        category: 'kick',
        speed: 3,
        damage: 4,
        description: 'Heavy jumping heel stomp. If the opponent is Blocking, shatters their guard for DOUBLE (8) DAMAGE!',
        flavor: 'Brings down titanic weight from above to shatter shields.',
        iconName: 'Hammer',
        effectTags: ['Speed 3', 'Guard Break', '8 Dmg vs Block']
      },
      {
        id: 'tw_tidal_shield',
        fighterId: 'tidal_wave',
        name: 'Tidal Barrier',
        type: 'special',
        category: 'defense',
        speed: 7,
        damage: 0,
        blockValue: 100,
        description: 'Swirling vortex of water. Completely absorbs up to 6 damage and converts 100% of absorbed damage into Super Meter!',
        flavor: 'Water flows around all force, absorbing energy effortlessly.',
        iconName: 'Shield',
        effectTags: ['Speed 7', 'Converts Dmg to Super Meter', '+2 Shield']
      },
      {
        id: 'tw_maelstrom_hook',
        fighterId: 'tidal_wave',
        name: 'Maelstrom Hook',
        type: 'special',
        category: 'strike',
        speed: 4,
        damage: 4,
        description: 'Surging horizontal punch with water vortex. Pushes opponent back and gives Tidal Wave initiative next turn.',
        flavor: 'The vortex drags the opponent into close-quarters peril.',
        iconName: 'Waves',
        effectTags: ['Speed 4', '4 Damage', 'Controls Momentum']
      },
      {
        id: 'tw_current_stance',
        fighterId: 'tidal_wave',
        name: 'Ocean Calm Stance',
        type: 'special',
        category: 'tech',
        speed: 6,
        damage: 0,
        description: 'Meditative ocean stance. Restores 3 HP and immediately builds +1 Super Meter pip.',
        flavor: 'The calm before the hurricane gathers unstoppable vigor.',
        iconName: 'HeartPulse',
        effectTags: ['Speed 6', 'Heals 3 HP', '+1 Super Meter']
      }
    ],
    finishers: [
      {
        id: 'tw_finisher_tsunami',
        fighterId: 'tidal_wave',
        name: 'Tsunami Cataclysm',
        type: 'finisher',
        category: 'strike',
        speed: 4,
        damage: 11,
        superCost: 3,
        isUnblockable: true,
        description: 'CINEMATIC FINISHER: Summons an all-consuming 50-foot wave of pure ocean power that obliterates the arena for 11 Damage!',
        flavor: 'The whole ocean crashes down in a terrifying roar.',
        iconName: 'Waves',
        effectTags: ['Cost: 3 Super', 'Unblockable 11 Dmg', 'Cinematic Finisher']
      },
      {
        id: 'tw_finisher_kraken',
        fighterId: 'tidal_wave',
        name: 'Kraken\'s Deep Lock',
        type: 'finisher',
        category: 'grapple',
        speed: 5,
        damage: 9,
        superCost: 3,
        description: 'CINEMATIC FINISHER: Subjugating deep-sea submission. Deals 9 Damage, steals 2 Super Meter from enemy, and heals Tidal Wave for 4 HP!',
        flavor: 'The crushing pressure of the oceanic abyss.',
        iconName: 'HandMetal',
        effectTags: ['Cost: 3 Super', '9 Dmg + Steals 2 Meter', 'Heals 4 HP']
      }
    ],
    taunts: [
      'You are a pebble against a tidal wave!',
      'Stand firm or be swept into the abyss!',
      'Your punches are as weak as morning foam!'
    ]
  },
  {
    id: 'chad',
    name: 'Chad',
    title: 'The Frat Boy',
    archetype: 'Hype Brawler & Chaos Punisher',
    quote: 'Sigma Kappa never backs down! Hold my cup, it is knockout time!',
    backstory: 'The legendary champion of the fraternity row brawl circuit. Armed with his signature pink polo, sunglasses, sweater-around-the-neck swag, and an ever-present red solo cup, Chad generates overwhelming momentum with every punch, kick, block, and reverse.',
    strategy: 'Master the 8 core matrix moves—especially using Jab and Hook to pressure high and low guards, and crushing predictable aggression with Reverse. Stack Hype by landing hits to boost all attack power!',
    themeColor: 'from-amber-500 via-orange-600 to-red-700',
    badgeColor: 'bg-amber-500 border-red-500 text-black',
    accentHex: '#f59e0b',
    image: heroChadImg,
    stats: {
      speed: 7,
      power: 8,
      defense: 7,
      mindgames: 9,
      difficulty: 'Easy'
    },
    passiveName: 'Frat House Hype',
    passiveDescription: 'Whenever Chad lands a hit, he gains 1 Hype Stack (Max 3). At 3 Hype, all his attacks gain +2 Bonus Damage and Super Armor against light attacks.',
    specials: [
      {
        id: 'chad_solo_splash',
        fighterId: 'chad',
        name: 'Solo Cup Splash',
        type: 'special',
        category: 'tech',
        speed: 5,
        damage: 2,
        description: 'Splashes mysterious punch in the opponent\'s eyes. Blinds them, reducing their next card\'s speed by -3!',
        flavor: 'A face full of mystery party punch breaks all concentration.',
        iconName: 'Wine',
        effectTags: ['Speed 5', 'Blinds Opponent (-3 Speed)', '+1 Hype']
      },
      {
        id: 'chad_bouncer_tackle',
        fighterId: 'chad',
        name: 'Bouncer Tackle',
        type: 'special',
        category: 'grapple',
        speed: 3,
        damage: 5,
        isUnblockable: true,
        description: 'Unceremonious rugby tackle that throws opponent out of the venue. Bypasses standard block.',
        flavor: 'You are on the guest list for the pavement outside.',
        iconName: 'ShieldOff',
        effectTags: ['Speed 3', 'Unblockable 5 Dmg', 'High Impact']
      },
      {
        id: 'chad_tailgate_hammer',
        fighterId: 'chad',
        name: 'Tailgate Haymaker',
        type: 'special',
        category: 'strike',
        speed: 2,
        damage: 7,
        description: 'Wild, unrestrained roundhouse punch with maximum swagger. Slow, but hits like a freight truck!',
        flavor: 'Wound up all the way from the alumni tailgate.',
        iconName: 'Hammer',
        effectTags: ['Speed 2', 'Massive 7 Dmg', 'Crushing Power']
      },
      {
        id: 'chad_rush_swagger',
        fighterId: 'chad',
        name: 'Rush Week Swagger',
        type: 'special',
        category: 'tech',
        speed: 7,
        damage: 0,
        description: 'Flexes sunglasses and hypes up the crowd. Instantly gains +2 Super Meter and +2 Hype Stacks!',
        flavor: 'The crowd chants your name. Pure momentum.',
        iconName: 'Trophy',
        effectTags: ['Speed 7', '+2 Super Meter', '+2 Hype Stacks']
      },
      {
        id: 'chad_keg_toss',
        fighterId: 'chad',
        name: 'Keg Toss',
        type: 'special',
        category: 'strike',
        speed: 3,
        damage: 4,
        isAntiAir: true,
        description: 'Heaves an empty stainless steel keg across the arena. Hits grounded and airborne jumping foes alike!',
        flavor: 'Catch this keg! Hits anything in the air or ground.',
        iconName: 'Package',
        effectTags: ['Speed 3', 'Anti-Air Punish', '4 Solid Dmg']
      },
      {
        id: 'chad_beer_reverse',
        fighterId: 'chad',
        name: 'Bro Parry Reverse',
        type: 'special',
        category: 'counter',
        speed: 6,
        damage: 0,
        countersCategories: ['kick', 'strike'],
        description: 'Casually side-steps an incoming attack while taking a sip, dealing 5 Counter Damage with a wicked backhand!',
        flavor: 'Didn\'t even spill a drop.',
        iconName: 'RotateCcw',
        effectTags: ['Speed 6', 'Counters Kicks & Strikes', '5 Counter Dmg']
      }
    ],
    finishers: [
      {
        id: 'chad_finisher_knockout',
        fighterId: 'chad',
        name: 'Rush Week Knockout',
        type: 'finisher',
        category: 'strike',
        speed: 5,
        damage: 12,
        superCost: 3,
        description: 'CINEMATIC FINISHER: A 100% full-body running sprint haymaker that sends the opponent spinning into the stratosphere for 12 Damage!',
        flavor: 'Lights out! Time to head back to the party.',
        iconName: 'Trophy',
        effectTags: ['Cost: 3 Super', '12 Brutal Dmg', 'Cinematic Finisher']
      },
      {
        id: 'chad_finisher_piledriver',
        fighterId: 'chad',
        name: 'Chug Championship Piledriver',
        type: 'finisher',
        category: 'grapple',
        speed: 4,
        damage: 10,
        superCost: 3,
        isUnblockable: true,
        description: 'CINEMATIC FINISHER: Hoists opponent high overhead and slams them into the mat. Disables enemy specials next round!',
        flavor: 'An unforgettable display of raw frat dominance.',
        iconName: 'Flame',
        effectTags: ['Cost: 3 Super', 'Unblockable 10 Dmg', 'Disables Enemy Specials']
      }
    ],
    taunts: [
      'Did someone order a double knockout on the rocks?',
      'You are definitely not on the VIP guest list!',
      'Sigma Kappa rules the fight!'
    ]
  },
  {
    id: 'weapon_z',
    name: 'Weapon Z',
    title: 'The Mutagen Anomaly',
    archetype: 'Toxic Attrition & Cyber Horror',
    quote: 'System error. Biological contagion... engaged.',
    backstory: 'An escaped bio-mechanical super-soldier experiment infected with glowing purple mutagen and cybernetic hydraulic conduits. Weapon Z dissolves opponent vitality with toxic leaks, bleeding rends, and insidious cybernetic overrides.',
    strategy: 'Infect the opponent with Corrosive Poison through Mutagen Spit and passive leaks. Wear down their HP while using Neurotoxin Vapour to shut down their high-damage specials.',
    themeColor: 'from-emerald-600 via-purple-700 to-purple-950',
    badgeColor: 'bg-emerald-600 border-purple-400 text-purple-100',
    accentHex: '#a855f7',
    image: heroWeaponZImg,
    stats: {
      speed: 7,
      power: 8,
      defense: 6,
      mindgames: 8,
      difficulty: 'Hard'
    },
    passiveName: 'Corrosive Mutagen Leaks',
    passiveDescription: 'Whenever Weapon Z takes damage from an opponent\'s attack, the attacker is contaminated with 1 Poison stack (dealing 1 damage at the start of each turn).',
    specials: [
      {
        id: 'wz_mutagen_spit',
        fighterId: 'weapon_z',
        name: 'Mutagen Spit',
        type: 'special',
        category: 'strike',
        speed: 5,
        damage: 2,
        description: 'Corrosive biological projectile. Inflicts 2 Poison Stacks that tick away opponent health every turn.',
        flavor: 'A glob of acidic purple ooze hisses upon flesh.',
        iconName: 'Skull',
        effectTags: ['Speed 5', '+2 Poison Stacks', 'Corrosive DoT']
      },
      {
        id: 'wz_cyber_rend',
        fighterId: 'weapon_z',
        name: 'Cyber Claw Rend',
        type: 'special',
        category: 'strike',
        speed: 4,
        damage: 4,
        description: 'Titanium claws rake across the chest. Inflicts bleed, dealing +2 bonus damage if the target was already poisoned.',
        flavor: 'Hydraulic steel claws tear through synthetic and organic armor.',
        iconName: 'Scissors',
        effectTags: ['Speed 4', '4 Base Dmg', '+2 Dmg vs Poisoned']
      },
      {
        id: 'wz_overclock_conduit',
        fighterId: 'weapon_z',
        name: 'Overclock Conduit',
        type: 'special',
        category: 'tech',
        speed: 7,
        damage: 0,
        description: 'Sacrifices 2 HP to inject pure mutagen fuel. Immediately grants +2 Super Meter and +3 Speed to all moves next turn!',
        flavor: 'Push the cybernetic core beyond safe operating thresholds.',
        iconName: 'Cpu',
        effectTags: ['Cost: 2 HP', '+2 Super Meter', '+3 Speed Next Turn']
      },
      {
        id: 'wz_piston_slam',
        fighterId: 'weapon_z',
        name: 'Hydraulic Piston Slam',
        type: 'special',
        category: 'strike',
        speed: 2,
        damage: 6,
        description: 'Heavy pressurized cybernetic slam. Pierces right through 3 points of enemy shield and armor.',
        flavor: 'A multi-ton hydraulic fist strikes like a pile driver.',
        iconName: 'Hammer',
        effectTags: ['Speed 2', '6 Heavy Dmg', 'Armor Piercing']
      },
      {
        id: 'wz_neurotoxin_vapour',
        fighterId: 'weapon_z',
        name: 'Neurotoxin Cloud',
        type: 'special',
        category: 'defense',
        speed: 6,
        damage: 0,
        blockValue: 50,
        description: 'Releases a thick cloud of paralyzing purple mist. Reduces incoming damage by 50% and disables opponent specials next turn.',
        flavor: 'Paralyzes nervous system receptors in a single breath.',
        iconName: 'Cloud',
        effectTags: ['Speed 6', '50% Damage Reduction', 'Silences Specials']
      },
      {
        id: 'wz_bio_regen',
        fighterId: 'weapon_z',
        name: 'Mutagen Syphon',
        type: 'special',
        category: 'tech',
        speed: 4,
        damage: 3,
        description: 'Drains vitality from the opponent, dealing 3 Damage and healing Weapon Z for 3 HP.',
        flavor: 'Converts the adversary\'s biomatter into regenerative fuel.',
        iconName: 'Syringe',
        effectTags: ['Speed 4', 'Deals 3 Dmg', 'Heals 3 HP']
      }
    ],
    finishers: [
      {
        id: 'wz_finisher_meltdown',
        fighterId: 'weapon_z',
        name: 'Reactor Meltdown Eruption',
        type: 'finisher',
        category: 'strike',
        speed: 5,
        damage: 10,
        superCost: 3,
        description: 'CINEMATIC FINISHER: Overheats the chest reactor and detonates all enemy poison stacks for massive +2 bonus damage per stack!',
        flavor: 'A catastrophic nuclear bio-hazard explosion cleanses the arena.',
        iconName: 'Biohazard',
        effectTags: ['Cost: 3 Super', '10 Dmg + Explodes Poison', 'Cinematic Finisher']
      },
      {
        id: 'wz_finisher_decapitation',
        fighterId: 'weapon_z',
        name: 'Cybernetic Zero Execution',
        type: 'finisher',
        category: 'strike',
        speed: 6,
        damage: 11,
        superCost: 3,
        isUnblockable: true,
        description: 'CINEMATIC FINISHER: High-speed hydraulic guillotine claw assault. Unblockable 11 Damage with glitch screen FX!',
        flavor: 'Target verified. Termination protocol completed.',
        iconName: 'Zap',
        effectTags: ['Cost: 3 Super', 'Unblockable 11 Dmg', 'Instant Execution']
      }
    ],
    taunts: [
      'Bio-signature unstable. You will be recycled.',
      'Infection rate at 100%. Surrender now.',
      'My reactor thirsts for more combatants!'
    ]
  }
];

export const ARENAS: BattleArena[] = [
  {
    id: 'volcanic_caldera',
    name: 'Firebird Peak (Volcano)',
    description: 'Blazing volcanic shrine surrounded by lava fissures, flying embers, and ancient fiery pillars.',
    bgClass: 'from-amber-950/60 via-red-900/40 to-zinc-950',
    theme: 'amber',
    image: arenaVolcanoImg
  },
  {
    id: 'oceanic_maelstrom',
    name: 'Tidal Reef Coliseum',
    description: 'Ocean sea stacks amidst crashing tidal waves, sea spray, and golden storm light.',
    bgClass: 'from-cyan-950/60 via-blue-900/40 to-zinc-950',
    theme: 'cyan',
    image: arenaTidalReefImg
  },
  {
    id: 'underground_championship',
    name: 'Underground Fight Club',
    description: 'A neon-lit subterranean fight cage with roaring spectators and electric tension.',
    bgClass: 'from-zinc-950 via-red-950/40 to-zinc-950',
    theme: 'red',
    image: battleArenaBgImg
  },
  {
    id: 'frat_courtyard',
    name: 'Sigma Kappa Courtyard',
    description: 'Backyard arena with red solo cups, party banners, sweeping spotlights, and booming sound.',
    bgClass: 'from-amber-950/40 via-orange-950/30 to-zinc-950',
    theme: 'orange',
    image: battleArenaBgImg
  },
  {
    id: 'cyber_facility',
    name: 'Bio-Mech Facility Z',
    description: 'Industrial mutagen reactor bathed in toxic green luminescence, laser grids, and warning sirens.',
    bgClass: 'from-emerald-950/50 via-purple-950/40 to-zinc-950',
    theme: 'emerald',
    image: heroWeaponZImg
  }
];
