import { CombatCard, PlayerBattleState, AIDifficulty } from '../types';

export function selectAIMove(
  aiState: PlayerBattleState,
  playerState: PlayerBattleState,
  availableCards: CombatCard[],
  difficulty: AIDifficulty,
  history: { playerLastCard?: CombatCard; aiLastCard?: CombatCard }
): CombatCard {
  // Filter out cards we don't have enough Super Meter for
  const validCards = availableCards.filter(card => {
    if (card.superCost && card.superCost > aiState.superMeter) {
      return false;
    }
    return true;
  });

  if (validCards.length === 0) {
    return availableCards[0];
  }

  // If AI has 3 Super Meter and finisher is available:
  const finisher = validCards.find(c => c.type === 'finisher');
  if (finisher && aiState.superMeter >= 3) {
    // High difficulty will unleash finisher when player HP is low or when AI can seal the match
    if (difficulty === 'hard' || difficulty === 'arcade_boss') {
      if (playerState.currentHp <= 12) {
        return finisher;
      }
    } else if (Math.random() < 0.75) {
      return finisher;
    }
  }

  if (difficulty === 'easy') {
    // Mostly random selection with slight preference for basic attacks
    return validCards[Math.floor(Math.random() * validCards.length)];
  }

  if (difficulty === 'medium') {
    // If player just attacked, AI might Reverse or Block
    if (history.playerLastCard && (history.playerLastCard.category === 'strike' || history.playerLastCard.category === 'kick')) {
      if (Math.random() < 0.45) {
        const defensive = validCards.find(c => c.category === 'counter' || c.category === 'defense');
        if (defensive) return defensive;
      }
    }
    // Otherwise pick a special or high speed strike
    const specials = validCards.filter(c => c.type === 'special');
    if (specials.length > 0 && Math.random() < 0.6) {
      return specials[Math.floor(Math.random() * specials.length)];
    }
    return validCards[Math.floor(Math.random() * validCards.length)];
  }

  // HARD & ARCADE BOSS: Tactical prediction
  const pId = aiState.fighter.id;

  // 1. If player is likely to block (e.g. low HP or after taking damage):
  if (playerState.currentHp <= 6) {
    // Use unblockables or guard breaks
    const unblockable = validCards.find(c => c.isUnblockable || c.category === 'grapple' || c.isLowAttack);
    if (unblockable) return unblockable;
  }

  // 2. Fighter specific smart behaviors
  if (pId === 'firebird') {
    // Firebird loves fast strikes & Phoenix Dash
    const fastMoves = validCards.filter(c => c.speed >= 5);
    if (fastMoves.length > 0 && Math.random() < 0.7) {
      return fastMoves[Math.floor(Math.random() * fastMoves.length)];
    }
  }

  if (pId === 'tidal_wave') {
    // If player has high HP, build shield/meter or throw
    if (aiState.currentHp < 10) {
      const defensive = validCards.find(c => c.id === 'tw_tidal_shield' || c.id === 'tw_current_stance' || c.id === 'basic_block');
      if (defensive && Math.random() < 0.6) return defensive;
    }
    const grapple = validCards.find(c => c.id === 'tw_undertow_grab' || c.id === 'tw_crashing_breaker');
    if (grapple && Math.random() < 0.5) return grapple;
  }

  if (pId === 'chad') {
    // If at 3 hype, smash with huge attacks
    if ((aiState.activeBuffs.hypeStacks || 0) >= 2) {
      const bigSmash = validCards.find(c => c.damage >= 5 || c.id === 'chad_tailgate_hammer');
      if (bigSmash) return bigSmash;
    }
    if (aiState.superMeter < 2 && Math.random() < 0.4) {
      const swagger = validCards.find(c => c.id === 'chad_rush_swagger');
      if (swagger) return swagger;
    }
  }

  if (pId === 'weapon_z') {
    // Apply poison if player has 0 stacks
    if ((playerState.activeBuffs.poisonStacks || 0) === 0) {
      const spit = validCards.find(c => c.id === 'wz_mutagen_spit');
      if (spit) return spit;
    }
  }

  // Default smart fallback
  return validCards[Math.floor(Math.random() * validCards.length)];
}
