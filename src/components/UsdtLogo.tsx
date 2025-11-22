const UsdtLogo = () => {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      <div className="absolute inset-0 animate-pulse">
        <div className="w-full h-full rounded-full bg-gradient-to-br from-green-700 to-green-900 opacity-30 blur-sm"></div>
      </div>
      
      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-green-800 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="usdt-fragments">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="usdt-icon">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" fill="white" fillOpacity="0.95" className="fragment-1"/>
              <path d="M13 8H15V11H16V13H15V14.5C15 15.3 15.5 15.5 16 15.5V17C14.3 17 13 16.2 13 14.5V13H11V14.5C11 16.2 9.7 17 8 17V15.5C8.5 15.5 9 15.3 9 14.5V13H8V11H9V8H11V11H13V8Z" fill="#26a17b" className="fragment-2"/>
            </svg>
          </div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-50"></div>
      </div>

      <style>{`
        @keyframes glitch {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          10% {
            transform: translate(-2px, -1px) scale(1.02);
            opacity: 0.9;
          }
          20% {
            transform: translate(2px, 1px) scale(0.98);
            opacity: 1;
          }
          30% {
            transform: translate(-1px, 2px) scale(1.01);
            opacity: 0.95;
          }
          40% {
            transform: translate(1px, -2px) scale(0.99);
            opacity: 1;
          }
          50% {
            transform: translate(-2px, 1px) scale(1.02) rotate(1deg);
            opacity: 0.9;
          }
          60% {
            transform: translate(2px, -1px) scale(0.98) rotate(-1deg);
            opacity: 1;
          }
        }

        @keyframes fragment-break-1 {
          0%, 90%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          92% {
            transform: translate(-1px, -1px) rotate(-2deg);
            opacity: 0.8;
          }
          94% {
            transform: translate(1px, 1px) rotate(2deg);
            opacity: 0.9;
          }
          96% {
            transform: translate(-0.5px, 0.5px) rotate(-1deg);
            opacity: 0.95;
          }
        }

        @keyframes fragment-break-2 {
          0%, 90%, 100% {
            transform: translate(0, 0) rotate(0deg) scale(1);
            opacity: 1;
          }
          92% {
            transform: translate(1px, -1px) rotate(3deg) scale(1.05);
            opacity: 0.7;
          }
          94% {
            transform: translate(-1px, 1px) rotate(-3deg) scale(0.95);
            opacity: 0.85;
          }
          96% {
            transform: translate(0.5px, -0.5px) rotate(1deg) scale(1.02);
            opacity: 0.9;
          }
        }

        .usdt-icon {
          animation: glitch 4s ease-in-out infinite;
          transform-origin: center;
        }

        .fragment-1 {
          animation: fragment-break-1 4s ease-in-out infinite;
          transform-origin: center;
        }

        .fragment-2 {
          animation: fragment-break-2 4s ease-in-out infinite;
          transform-origin: center;
        }

        .usdt-fragments:hover .usdt-icon {
          animation: glitch 0.8s ease-in-out infinite;
        }

        .usdt-fragments:hover .fragment-1 {
          animation: fragment-break-1 0.8s ease-in-out infinite;
        }

        .usdt-fragments:hover .fragment-2 {
          animation: fragment-break-2 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default UsdtLogo;