import { useNavigate, useLocation } from 'react-router-dom';

const FloatingChristmasButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === '/christmas-tree') {
    return null;
  }

  return (
    <button
      onClick={() => navigate('/christmas-tree')}
      className="fixed top-20 right-4 sm:top-24 sm:right-6 z-50 group cursor-pointer"
      title="Новогодняя акция! Получите бонус до 100%"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/30 via-yellow-500/30 to-green-500/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full"></div>
      
      <div className="relative bg-gradient-to-r from-red-600/30 to-green-600/30 hover:from-red-600/40 hover:to-green-600/40 border-2 border-yellow-500/50 hover:border-yellow-400/70 rounded-full p-2 sm:p-3 transition-all duration-200 group-hover:scale-110 backdrop-blur-md shadow-lg hover:shadow-2xl hover:shadow-yellow-500/30">
        <div className="flex items-center gap-2 sm:gap-2.5">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-red-500 to-green-500 flex items-center justify-center shadow-md p-1 sm:p-1.5 animate-pulse">
              <span className="text-xl sm:text-2xl">🎄</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-400 flex items-center justify-center shadow-md border-2 border-background animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-yellow-400 flex items-center justify-center shadow-md border-2 border-background">
              <span className="text-[10px] sm:text-xs">🔥</span>
            </div>
          </div>
          <div className="pr-2 sm:pr-3">
            <p className="text-[8px] sm:text-[9px] text-yellow-300/90 font-bold uppercase tracking-wider leading-none mb-0.5">
              🎁 до 10.01
            </p>
            <p className="text-sm sm:text-base font-black bg-gradient-to-r from-yellow-200 to-yellow-400 bg-clip-text text-transparent leading-none">
              до 100%
            </p>
          </div>
        </div>
      </div>
    </button>
  );
};

export default FloatingChristmasButton;
