import { useEffect, useState } from "react";

export const PhoneMockup = ({ showPhone }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Medytacja",
      mockup: (
        <div className="text-center h-full flex flex-col justify-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-cyan-400 to-lime-400 rounded-full flex items-center justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          <h3 className="text-white text-lg font-semibold mb-2">5-minutowa medytacja</h3>
          <p className="text-gray-300 text-xs mb-4">Oddychaj spokojnie i skoncentruj się na chwili obecnej</p>
          <button className="w-full py-2 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-lg text-white font-semibold text-sm">
            Rozpocznij
          </button>
        </div>
      )
    },
    {
      title: "Statystyki",
      mockup: (
        <div className="h-full flex flex-col">
          <h3 className="text-white text-lg font-semibold mb-4">Twój postęp</h3>
          <div className="space-y-3 flex-1">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Dzisiejsze sesje</span>
                <span className="text-cyan-400 font-bold">3</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-400 to-lime-400 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm">Seria dni</span>
                <span className="text-lime-400 font-bold">12</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-lime-400 to-cyan-400 h-2 rounded-full w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Przypomnienia",
      mockup: (
        <div className="h-full flex flex-col">
          <h3 className="text-white text-lg font-semibold mb-4">Powiadomienia</h3>
          <div className="space-y-2 flex-1">
            <div className="bg-white/10 rounded-lg p-3 border-l-4 border-cyan-400">
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Poranna medytacja</span>
                <span className="text-gray-400 text-xs">8:00</span>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border-l-4 border-lime-400">
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Oddech w pracy</span>
                <span className="text-gray-400 text-xs">12:00</span>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 border-l-4 border-purple-400">
              <div className="flex justify-between items-center">
                <span className="text-white text-sm">Wieczorna relaksacja</span>
                <span className="text-gray-400 text-xs">21:00</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    if (showPhone) {
      const interval = setInterval(() => {
        setActiveFeature(prev => (prev + 1) % features.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [showPhone, features.length]);

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className={`transition-all duration-700 ease-out ${
        showPhone 
          ? 'opacity-100 translate-x-0 scale-100' 
          : 'opacity-0 -translate-x-full scale-95 pointer-events-none'
      }`}>
        {/* Phone frame - dopasowana do wielkości chatu */}
        <div className="w-80 sm:w-96 bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-emerald-400/30 shadow-2xl">
          {/* App header */}
          <div className="flex items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-cyan-400 to-lime-400 rounded-full flex items-center justify-center mr-3 sm:mr-4 relative flex-shrink-0">
              <span className="text-white font-bold text-base sm:text-lg"></span>
              <div className="absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-base sm:text-lg truncate">Echo App</h3>
              <p className="text-emerald-300 text-xs sm:text-sm">Funkcje aplikacji</p>
            </div>
          </div>

          {/* Dynamic content based on active feature */}
          <div className="h-64 sm:h-72 md:h-80 relative">
            <div className={`transition-all duration-500 absolute inset-0 ${activeFeature === 0 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="p-3">{features[0].mockup}</div>
            </div>
            <div className={`transition-all duration-500 absolute inset-0 ${activeFeature === 1 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="p-3">{features[1].mockup}</div>
            </div>
            <div className={`transition-all duration-500 absolute inset-0 ${activeFeature === 2 ? 'opacity-100' : 'opacity-0'}`}>
              <div className="p-3">{features[2].mockup}</div>
            </div>
          </div>

          {/* Feature indicator */}
          <div className="flex justify-center space-x-2 mt-4">
            {features.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  index === activeFeature ? 'bg-emerald-400' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

