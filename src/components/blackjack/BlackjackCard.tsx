import { PlayingCard } from './blackjack-utils';

interface BlackjackCardProps {
  card: PlayingCard;
  hidden?: boolean;
}

export const BlackjackCard = ({ card, hidden = false }: BlackjackCardProps) => {
  const isRed = card.suit === '♥' || card.suit === '♦';
  
  return (
    <div className={`
      w-14 h-20 sm:w-16 sm:h-24 md:w-20 md:h-28 
      bg-white rounded-lg shadow-lg 
      flex flex-col items-center justify-between 
      p-1 sm:p-1.5 md:p-2
      ${hidden ? 'bg-gradient-to-br from-primary to-primary/80' : ''}
    `}>
      {hidden ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-10 sm:w-10 sm:h-12 border-2 border-white/30 rounded"></div>
        </div>
      ) : (
        <>
          <div className={`text-base sm:text-lg md:text-xl font-bold ${isRed ? 'text-red-500' : 'text-gray-900'}`}>
            {card.rank}
          </div>
          <div className={`text-xl sm:text-2xl md:text-3xl ${isRed ? 'text-red-500' : 'text-gray-900'}`}>
            {card.suit}
          </div>
          <div className={`text-base sm:text-lg md:text-xl font-bold ${isRed ? 'text-red-500' : 'text-gray-900'}`}>
            {card.rank}
          </div>
        </>
      )}
    </div>
  );
};
