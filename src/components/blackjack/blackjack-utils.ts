export type Suit = '♠' | '♥' | '♦' | '♣';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface PlayingCard {
  suit: Suit;
  rank: Rank;
}

export const createDeck = (): PlayingCard[] => {
  const suits: Suit[] = ['♠', '♥', '♦', '♣'];
  const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const deck: PlayingCard[] = [];
  
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ suit, rank });
    }
  }
  
  return deck.sort(() => Math.random() - 0.5);
};

export const getCardValue = (card: PlayingCard, currentTotal: number): number => {
  if (card.rank === 'A') {
    return currentTotal + 11 > 21 ? 1 : 11;
  }
  if (['J', 'Q', 'K'].includes(card.rank)) {
    return 10;
  }
  return parseInt(card.rank);
};

export const calculateHandValue = (hand: PlayingCard[]): number => {
  let total = 0;
  let aces = 0;
  
  for (const card of hand) {
    if (card.rank === 'A') {
      aces += 1;
      total += 11;
    } else if (['J', 'Q', 'K'].includes(card.rank)) {
      total += 10;
    } else {
      total += parseInt(card.rank);
    }
  }
  
  while (total > 21 && aces > 0) {
    total -= 10;
    aces -= 1;
  }
  
  return total;
};
