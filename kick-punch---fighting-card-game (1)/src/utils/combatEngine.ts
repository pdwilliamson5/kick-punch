import { CombatCard, PlayerBattleState, TurnResolution, ClashOutcome } from '../types';

export function resolveCombatTurn(
  turnNumber: number,
  p1State: PlayerBattleState,
  p2State: PlayerBattleState,
  p1Card: CombatCard,
  p2Card: CombatCard
): TurnResolution {
  let p1Dmg = 0;
  let p2Dmg = 0;
  let p1MeterDelta = 0;
  let p2MeterDelta = 0;
  let outcome: ClashOutcome = 'MUTUAL_WHIFF';
  let headline = '';
  const details: string[] = [];
  let animTrigger: TurnResolution['animationTrigger'] = 'clash';

  // Base Effective Speed
  const p1Speed = p1Card.speed + (p1State.activeBuffs.speedBonus || 0);
  const p2Speed = p2Card.speed + (p2State.activeBuffs.speedBonus || 0);

  // Base Damages + Buffs
  let p1PotentialDmg = p1Card.damage + (p1State.activeBuffs.damageBonus || 0);
  let p2PotentialDmg = p2Card.damage + (p2State.activeBuffs.damageBonus || 0);

  // Passive Modifiers: Chad 3 Hype = +2 Damage
  if (p1State.fighter.id === 'chad' && (p1State.activeBuffs.hypeStacks || 0) >= 3) {
    p1PotentialDmg += 2;
  }
  if (p2State.fighter.id === 'chad' && (p2State.activeBuffs.hypeStacks || 0) >= 3) {
    p2PotentialDmg += 2;
  }

  // Fighter Passive: Tidal Wave Iron Tide (-1 incoming damage)
  const applyTidalDefense = (dmg: number, fighterId: string) => {
    if (dmg <= 0) return 0;
    if (fighterId === 'tidal_wave') {
      return Math.max(1, dmg - 1);
    }
    return dmg;
  };

  // MATRIX CHECK: First check if one card explicitly BEATS the other based on official Kick/Punch rules
  const p1CardBeatsP2 = p1Card.beats && p1Card.beats.some(b => b.toLowerCase() === p2Card.name.toLowerCase());
  const p2CardBeatsP1 = p2Card.beats && p2Card.beats.some(b => b.toLowerCase() === p1Card.name.toLowerCase());
  const cardsTie = (p1Card.ties && p1Card.ties.some(t => t.toLowerCase() === p2Card.name.toLowerCase())) || 
                   (p1Card.name.toLowerCase() === p2Card.name.toLowerCase());

  // If both cards have explicit matrix rules and neither is a Finisher
  if (p1Card.type !== 'finisher' && p2Card.type !== 'finisher') {
    if (p1CardBeatsP2 && !p2CardBeatsP1) {
      // P1 clearly beats P2!
      p2Dmg = applyTidalDefense(p1PotentialDmg, p2State.fighter.id);
      p1MeterDelta += 1;

      if (p1Card.category === 'counter') {
        outcome = 'P1_REVERSED';
        headline = `REVERSED! ${p1State.fighter.name}'s Reverse Counters ${p2Card.name}!`;
        details.push(`${p1State.fighter.name} anticipated ${p2Card.name} and reversed the momentum for ${p2Dmg} damage!`);
        animTrigger = 'counter';
      } else if (p1Card.category === 'defense') {
        outcome = 'P1_BLOCKED';
        headline = `${p1State.fighter.name}'s ${p1Card.name} Shuts Down ${p2Card.name}!`;
        details.push(`${p1State.fighter.name} blocked ${p2Card.name} perfectly and countered for ${p2Dmg} damage!`);
        animTrigger = 'block';
      } else if (p1Card.category === 'aerial') {
        outcome = 'P1_HIT';
        headline = `${p1State.fighter.name}'s Jump Evades and Punishes ${p2Card.name}!`;
        details.push(`${p1State.fighter.name} vaulted cleanly over ${p2Card.name} and struck down for ${p2Dmg} damage!`);
        animTrigger = 'p1_attack';
      } else {
        outcome = 'P1_HIT';
        headline = `CLEAN HIT! ${p1Card.name} Beats ${p2Card.name}!`;
        details.push(`${p1Card.name} (Power ${p1Card.power || p1Card.damage}) defeated ${p2Card.name} on the combat matrix for ${p2Dmg} damage!`);
        animTrigger = 'p1_attack';
      }

      return {
        turnNumber,
        p1Card,
        p2Card,
        p1DamageTaken: p1Dmg,
        p2DamageTaken: p2Dmg,
        p1MeterDelta,
        p2MeterDelta,
        outcome,
        headline,
        details,
        animationTrigger: animTrigger
      };
    } else if (p2CardBeatsP1 && !p1CardBeatsP2) {
      // P2 clearly beats P1!
      p1Dmg = applyTidalDefense(p2PotentialDmg, p1State.fighter.id);
      p2MeterDelta += 1;

      if (p2Card.category === 'counter') {
        outcome = 'P2_REVERSED';
        headline = `REVERSED! ${p2State.fighter.name}'s Reverse Counters ${p1Card.name}!`;
        details.push(`${p2State.fighter.name} anticipated ${p1Card.name} and reversed the momentum for ${p1Dmg} damage!`);
        animTrigger = 'counter';
      } else if (p2Card.category === 'defense') {
        outcome = 'P2_BLOCKED';
        headline = `${p2State.fighter.name}'s ${p2Card.name} Shuts Down ${p1Card.name}!`;
        details.push(`${p2State.fighter.name} blocked ${p1Card.name} perfectly and countered for ${p1Dmg} damage!`);
        animTrigger = 'block';
      } else if (p2Card.category === 'aerial') {
        outcome = 'P2_HIT';
        headline = `${p2State.fighter.name}'s Jump Evades and Punishes ${p1Card.name}!`;
        details.push(`${p2State.fighter.name} vaulted cleanly over ${p1Card.name} and struck down for ${p1Dmg} damage!`);
        animTrigger = 'p2_attack';
      } else {
        outcome = 'P2_HIT';
        headline = `CLEAN HIT! ${p2Card.name} Beats ${p1Card.name}!`;
        details.push(`${p2Card.name} (Power ${p2Card.power || p2Card.damage}) defeated ${p1Card.name} on the combat matrix for ${p1Dmg} damage!`);
        animTrigger = 'p2_attack';
      }

      return {
        turnNumber,
        p1Card,
        p2Card,
        p1DamageTaken: p1Dmg,
        p2DamageTaken: p2Dmg,
        p1MeterDelta,
        p2MeterDelta,
        outcome,
        headline,
        details,
        animationTrigger: animTrigger
      };
    } else if (cardsTie) {
      // Tie between identical moves or matched category
      if (p1Card.category === 'defense' && p2Card.category === 'defense') {
        outcome = 'DOUBLE_BLOCK';
        headline = 'Mirror Guard Clash!';
        details.push('Both fighters maintained defensive stances, studying each other. +1 Super Meter to both!');
        p1MeterDelta += 1;
        p2MeterDelta += 1;
      } else if (p1Card.category === 'aerial' && p2Card.category === 'aerial') {
        outcome = 'DOUBLE_DODGE';
        headline = 'Simultaneous Mid-Air Leap!';
        details.push('Both fighters leapt into the air at once, landing back in neutral.');
      } else if (p1Card.category === 'counter' && p2Card.category === 'counter') {
        outcome = 'MUTUAL_WHIFF';
        headline = 'Counter Stand-Off!';
        details.push('Both fighters prepared parries, but neither committed to an offensive strike.');
      } else {
        // Attack trade!
        p1Dmg = applyTidalDefense(p2PotentialDmg, p1State.fighter.id);
        p2Dmg = applyTidalDefense(p1PotentialDmg, p2State.fighter.id);
        outcome = 'TRADE';
        headline = `CLASH TRADE! (${p1Card.name} vs ${p2Card.name})`;
        details.push(`Both ${p1Card.name} attacks collided head-to-head! Both fighters take full impact!`);
        p1MeterDelta += 1;
        p2MeterDelta += 1;
        animTrigger = 'clash';
      }

      return {
        turnNumber,
        p1Card,
        p2Card,
        p1DamageTaken: p1Dmg,
        p2DamageTaken: p2Dmg,
        p1MeterDelta,
        p2MeterDelta,
        outcome,
        headline,
        details,
        animationTrigger: animTrigger
      };
    }
  }

  const isP1Attack = p1Card.category === 'strike' || p1Card.category === 'kick' || p1Card.type === 'finisher';
  const isP2Attack = p2Card.category === 'strike' || p2Card.category === 'kick' || p2Card.type === 'finisher';

  // CASE 1: DOUBLE DEFENSIVE / TECH / REVERSE (No attacks)
  if (!isP1Attack && !isP2Attack) {
    if (p1Card.category === 'defense' && p2Card.category === 'defense') {
      outcome = 'DOUBLE_BLOCK';
      headline = 'Both Fighters Guard!';
      details.push('Both fighters maintained defensive postures, gauging distance and studying each other.');
      p1MeterDelta += 1;
      p2MeterDelta += 1;
    } else if (p1Card.category === 'aerial' && p2Card.category === 'aerial') {
      outcome = 'DOUBLE_DODGE';
      headline = 'Mid-Air Evasion!';
      details.push('Both combatants leapt into the air simultaneously, resetting neutral footing.');
    } else {
      outcome = 'MUTUAL_WHIFF';
      headline = 'Mind Games Neutral!';
      details.push(`${p1State.fighter.name} played ${p1Card.name} while ${p2State.fighter.name} played ${p2Card.name}.`);
    }
  }
  
  // CASE 2: P1 REVERSE vs P2 ATTACK
  else if (p1Card.category === 'counter' && isP2Attack) {
    // Check if P2 used an unblockable finisher or grapple
    if (p2Card.isUnblockable && p2Card.category === 'grapple') {
      p1Dmg = applyTidalDefense(p2PotentialDmg, p1State.fighter.id);
      outcome = 'P2_HIT';
      headline = `${p2State.fighter.name}'s Unblockable Grab Crushes Reverse!`;
      details.push(`${p1State.fighter.name} tried to Reverse, but ${p2Card.name} is a Grapple and cannot be parried!`);
      p2MeterDelta += 1;
      animTrigger = 'p2_attack';
    } else {
      p2Dmg = applyTidalDefense(p2PotentialDmg + 2, p2State.fighter.id);
      outcome = 'P1_REVERSED';
      headline = `REVERSED! ${p1State.fighter.name} Counters ${p2Card.name}!`;
      details.push(`${p1State.fighter.name} read the attack perfectly! Caught ${p2State.fighter.name}'s ${p2Card.name} and dealt ${p2Dmg} Counter Damage!`);
      p1MeterDelta += 2;
      animTrigger = 'counter';
    }
  }

  // CASE 3: P2 REVERSE vs P1 ATTACK
  else if (p2Card.category === 'counter' && isP1Attack) {
    if (p1Card.isUnblockable && p1Card.category === 'grapple') {
      p2Dmg = applyTidalDefense(p1PotentialDmg, p2State.fighter.id);
      outcome = 'P1_HIT';
      headline = `${p1State.fighter.name}'s Command Grab Blows Through Reverse!`;
      details.push(`${p2State.fighter.name} set up a Reverse, but ${p1Card.name} cannot be countered!`);
      p1MeterDelta += 1;
      animTrigger = 'p1_attack';
    } else {
      p1Dmg = applyTidalDefense(p1PotentialDmg + 2, p1State.fighter.id);
      outcome = 'P2_REVERSED';
      headline = `REVERSED! ${p2State.fighter.name} Parries ${p1Card.name}!`;
      details.push(`${p2State.fighter.name} read the strike! Reversed ${p1Card.name} back for ${p1Dmg} Counter Damage!`);
      p2MeterDelta += 2;
      animTrigger = 'counter';
    }
  }

  // CASE 4: ATTACK VS BLOCK / DEFENSE
  else if (isP1Attack && p2Card.category === 'defense') {
    if (p1Card.isUnblockable || p1Card.id === 'tw_crashing_breaker' || p1Card.isLowAttack && p2Card.id === 'basic_block') {
      // Guard Break or Low slip or Unblockable Finisher
      const bonus = p1Card.id === 'tw_crashing_breaker' ? 4 : 0;
      p2Dmg = applyTidalDefense(p1PotentialDmg + bonus, p2State.fighter.id);
      outcome = 'P1_HIT';
      headline = `GUARD BREAK! ${p1Card.name} Smashes Defense!`;
      details.push(`${p1Card.name} broke through ${p2State.fighter.name}'s guard cleanly for ${p2Dmg} damage!`);
      p1MeterDelta += 1;
      animTrigger = 'p1_attack';
    } else {
      // Clean block
      outcome = 'P2_BLOCKED';
      headline = `${p2State.fighter.name} Blocks ${p1Card.name}!`;
      details.push(`${p2State.fighter.name} braced and completely negated ${p1Card.name}, gaining +1 Super Meter!`);
      p2MeterDelta += 1;
      animTrigger = 'block';
    }
  }
  else if (isP2Attack && p1Card.category === 'defense') {
    if (p2Card.isUnblockable || p2Card.id === 'tw_crashing_breaker' || p2Card.isLowAttack && p1Card.id === 'basic_block') {
      const bonus = p2Card.id === 'tw_crashing_breaker' ? 4 : 0;
      p1Dmg = applyTidalDefense(p2PotentialDmg + bonus, p1State.fighter.id);
      outcome = 'P2_HIT';
      headline = `GUARD BREAK! ${p2Card.name} Smashes Guard!`;
      details.push(`${p2Card.name} smashed through ${p1State.fighter.name}'s defense for ${p1Dmg} damage!`);
      p2MeterDelta += 1;
      animTrigger = 'p2_attack';
    } else {
      outcome = 'P1_BLOCKED';
      headline = `${p1State.fighter.name} Solidly Blocks ${p2Card.name}!`;
      details.push(`${p1State.fighter.name} absorbed the impact with a rock-solid guard, gaining +1 Super Meter!`);
      p1MeterDelta += 1;
      animTrigger = 'block';
    }
  }

  // CASE 5: ATTACK VS JUMP / AERIAL EVASION
  else if (isP1Attack && p2Card.category === 'aerial') {
    if (p1Card.isAntiAir) {
      p2Dmg = applyTidalDefense(p1PotentialDmg + 3, p2State.fighter.id);
      outcome = 'P1_HIT';
      headline = `ANTI-AIR CRUSH! ${p1Card.name} Swats Jump!`;
      details.push(`${p1State.fighter.name} predicted the aerial dodge and punished it out of the air for ${p2Dmg} Critical Damage!`);
      p1MeterDelta += 2;
      animTrigger = 'p1_attack';
    } else if (p1Card.isLowAttack) {
      p1Dmg = applyTidalDefense(2, p1State.fighter.id);
      outcome = 'P2_DODGED';
      headline = `${p2State.fighter.name} Leaps Over ${p1Card.name}!`;
      details.push(`${p2State.fighter.name} jumped over the low attack and punished ${p1State.fighter.name} on the way down for 2 damage!`);
      p2MeterDelta += 1;
      animTrigger = 'p2_attack';
    } else {
      // Normal attack vs jump (speed compare)
      if (p1Speed > p2Speed) {
        p2Dmg = applyTidalDefense(p1PotentialDmg, p2State.fighter.id);
        outcome = 'P1_HIT';
        headline = `${p1Card.name} Catches ${p2State.fighter.name} in Startup!`;
        details.push(`${p1State.fighter.name}'s speed caught the opponent before full airborne evasion.`);
        p1MeterDelta += 1;
        animTrigger = 'p1_attack';
      } else {
        outcome = 'P2_DODGED';
        headline = `${p2State.fighter.name} Evaded in Mid-Air!`;
        details.push(`${p2State.fighter.name} leaped out of the attack cone cleanly.`);
      }
    }
  }
  else if (isP2Attack && p1Card.category === 'aerial') {
    if (p2Card.isAntiAir) {
      p1Dmg = applyTidalDefense(p2PotentialDmg + 3, p1State.fighter.id);
      outcome = 'P2_HIT';
      headline = `ANTI-AIR CRUSH! ${p2Card.name} Destroys Jump!`;
      details.push(`${p2State.fighter.name} intercepted ${p1State.fighter.name}'s jump with an anti-air strike for ${p1Dmg} damage!`);
      p2MeterDelta += 2;
      animTrigger = 'p2_attack';
    } else if (p2Card.isLowAttack) {
      p2Dmg = applyTidalDefense(2, p2State.fighter.id);
      outcome = 'P1_DODGED';
      headline = `${p1State.fighter.name} Jumps Over ${p2Card.name}!`;
      details.push(`${p1State.fighter.name} vaulted over the low attack and delivered a falling strike for 2 damage!`);
      p1MeterDelta += 1;
      animTrigger = 'p1_attack';
    } else {
      if (p2Speed > p1Speed) {
        p1Dmg = applyTidalDefense(p2PotentialDmg, p1State.fighter.id);
        outcome = 'P2_HIT';
        headline = `${p2Card.name} Catches Jump in Mid-Air!`;
        p2MeterDelta += 1;
        animTrigger = 'p2_attack';
      } else {
        outcome = 'P1_DODGED';
        headline = `${p1State.fighter.name} Dodged Aerial!`;
      }
    }
  }

  // CASE 6: ATTACK VS ATTACK (SPEED & PRIORITY RESOLUTION)
  else if (isP1Attack && isP2Attack) {
    // Check for Finishers
    if (p1Card.type === 'finisher' && p2Card.type === 'finisher') {
      p1Dmg = applyTidalDefense(p2PotentialDmg, p1State.fighter.id);
      p2Dmg = applyTidalDefense(p1PotentialDmg, p2State.fighter.id);
      outcome = 'TRADE';
      headline = 'CLASH OF ULTIMATE FINISHERS!';
      details.push('Both fighters unleashed their supreme techniques! A seismic collision shakes the arena!');
      animTrigger = 'finisher';
    } else if (p1Card.type === 'finisher' && p2Card.type !== 'finisher') {
      p2Dmg = applyTidalDefense(p1PotentialDmg, p2State.fighter.id);
      outcome = 'P1_HIT';
      headline = `CINEMATIC FINISHER! ${p1Card.name}!`;
      details.push(`${p1State.fighter.name} unleashed ${p1Card.name} for a staggering ${p2Dmg} DAMAGE!`);
      animTrigger = 'finisher';
    } else if (p2Card.type === 'finisher' && p1Card.type !== 'finisher') {
      p1Dmg = applyTidalDefense(p2PotentialDmg, p1State.fighter.id);
      outcome = 'P2_HIT';
      headline = `CINEMATIC FINISHER! ${p2Card.name}!`;
      details.push(`${p2State.fighter.name} detonated ${p2Card.name} for ${p1Dmg} massive DAMAGE!`);
      animTrigger = 'finisher';
    }
    // Standard Speed Priority
    else if (p1Speed > p2Speed) {
      p2Dmg = applyTidalDefense(p1PotentialDmg, p2State.fighter.id);
      outcome = 'P1_HIT';
      headline = `INTERRUPT! ${p1Card.name} Beats ${p2Card.name}!`;
      details.push(`${p1State.fighter.name}'s ${p1Card.name} (Speed ${p1Speed}) was faster than ${p2State.fighter.name}'s ${p2Card.name} (Speed ${p2Speed}), interrupting the attack cleanly for ${p2Dmg} damage!`);
      p1MeterDelta += 1;
      animTrigger = 'p1_attack';
    } else if (p2Speed > p1Speed) {
      p1Dmg = applyTidalDefense(p2PotentialDmg, p1State.fighter.id);
      outcome = 'P2_HIT';
      headline = `INTERRUPT! ${p2Card.name} Beats ${p1Card.name}!`;
      details.push(`${p2State.fighter.name}'s ${p2Card.name} (Speed ${p2Speed}) interrupted ${p1State.fighter.name}'s ${p1Card.name} (Speed ${p1Speed}) for ${p1Dmg} damage!`);
      p2MeterDelta += 1;
      animTrigger = 'p2_attack';
    } else {
      // Speed Tie -> TRADE!
      p1Dmg = applyTidalDefense(p2PotentialDmg, p1State.fighter.id);
      p2Dmg = applyTidalDefense(p1PotentialDmg, p2State.fighter.id);
      outcome = 'TRADE';
      headline = `CLASH TRADE! (${p1Card.name} vs ${p2Card.name})`;
      details.push(`Both attacks connected at the exact same instant (Speed ${p1Speed})! ${p1State.fighter.name} took ${p1Dmg} and ${p2State.fighter.name} took ${p2Dmg}!`);
      p1MeterDelta += 1;
      p2MeterDelta += 1;
      animTrigger = 'clash';
    }
  }

  // Handle tech moves (Inferno Step, Swagger, Overclock, etc.)
  if (p1Card.id === 'fb_inferno_step') {
    p1Dmg = 0;
    headline = `${p1State.fighter.name} Vanishes in Inferno Step!`;
    details.push('Firebird stepped into the flame smoke, evading all damage and priming +3 damage!');
  }
  if (p2Card.id === 'fb_inferno_step') {
    p2Dmg = 0;
    headline = `${p2State.fighter.name} Vanishes in Inferno Step!`;
    details.push('Firebird stepped into the flame smoke, evading all damage and priming +3 damage!');
  }
  if (p1Card.id === 'chad_rush_swagger') {
    p1MeterDelta += 2;
    headline = `${p1State.fighter.name} Hyped Up the Crowd!`;
  }
  if (p2Card.id === 'chad_rush_swagger') {
    p2MeterDelta += 2;
    headline = `${p2State.fighter.name} Hyped Up the Crowd!`;
  }
  if (p1Card.id === 'tw_current_stance') {
    p1MeterDelta += 1;
  }
  if (p2Card.id === 'tw_current_stance') {
    p2MeterDelta += 1;
  }

  return {
    turnNumber,
    p1Card,
    p2Card,
    p1DamageTaken: p1Dmg,
    p2DamageTaken: p2Dmg,
    p1MeterDelta,
    p2MeterDelta,
    outcome,
    headline,
    details,
    animationTrigger: animTrigger
  };
}
