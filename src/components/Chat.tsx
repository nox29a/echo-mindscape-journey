import { useEffect, useState } from "react";
export const ChatInterface = ({ showChat }) => {

  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Cześć! Jestem Echo AI. Jak mogę Ci dziś pomóc?' },
    { sender: 'user', text: 'Cześć! Chciałbym poznać więcej o mindfulness.' },
    { sender: 'bot', text: 'Świetnie! Mindfulness to praktyka świadomego bycia w chwili obecnej. Czy chciałbyś spróbować krótkiej sesji medytacji?' }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (currentMessage.trim()) {
      setChatMessages(prev => [...prev, { sender: 'user', text: currentMessage }]);
      setCurrentMessage('');
      setIsTyping(true);
      
      // Symulacja odpowiedzi bota
      setTimeout(() => {
        setIsTyping(false);
        setChatMessages(prev => [...prev, { 
          sender: 'bot', 
          text: 'To świetne pytanie! Pozwól mi pomóc Ci z tym...' 
        }]);
      }, 1500);
    }
  };

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
      <div className={`transition-all duration-700 ease-out ${
        showChat 
          ? 'opacity-100 translate-x-0 scale-100' 
          : 'opacity-0 -translate-x-full scale-95 pointer-events-none'
      }`}>
        <div className="w-80 sm:w-96 bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-emerald-400/30 shadow-2xl">
          {/* Header */}
          <div className="flex items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mr-3 sm:mr-4 relative flex-shrink-0">
              <span className="text-white font-bold text-base sm:text-lg">E</span>
              <div className="absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-base sm:text-lg truncate">Echo AI</h3>
              <p className="text-emerald-300 text-xs sm:text-sm">Online • Gotowy do rozmowy</p>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-64 sm:h-72 md:h-80 overflow-y-auto mb-3 sm:mb-4 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-emerald-400/20 px-1">
            {chatMessages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                <div className={`max-w-[85%] sm:max-w-xs lg:max-w-sm p-2.5 sm:p-3 rounded-xl sm:rounded-2xl ${
                  message.sender === 'user' 
                    ? 'bg-emerald-400/20 text-emerald-100 border border-emerald-400/30' 
                    : 'bg-white/10 text-gray-200 border border-white/10'
                }`}>
                  <p className="text-xs sm:text-sm leading-relaxed break-words">{message.text}</p>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-white/10 text-gray-200 border border-white/10 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl max-w-xs">
                  <div className="flex space-x-1">
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-emerald-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <input 
              type="text" 
              placeholder="Napisz wiadomość" 
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              className="flex-1 bg-white/5 border border-white/20 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/50 transition-all"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button 
              onClick={handleSendMessage}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-white rounded-lg sm:rounded-xl font-medium hover:from-emerald-500 hover:to-cyan-500 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <span>Wyślij</span>
              <svg className="w-3 sm:w-4 h-3 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};