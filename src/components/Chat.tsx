import { useEffect, useRef, useState } from "react";

export const ChatInterface = ({ showChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  const webhookUrl = 'https://lukasz29a.app.n8n.cloud/webhook/chat';

  // Generuj unikalne sessionId przy pierwszym renderowaniu
  useEffect(() => {
    // Sprawdź czy mamy już sessionId w localStorage
    const savedSessionId = localStorage.getItem('chatSessionId');
    
    if (savedSessionId) {
      setSessionId(savedSessionId);
    } else {
      // Generuj nowe sessionId
      const newSessionId = generateSessionId();
      localStorage.setItem('chatSessionId', newSessionId);
      setSessionId(newSessionId);
    }
  }, []);

  // Funkcja do generowania unikalnego sessionId
  const generateSessionId = () => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isTyping]);

  useEffect(() => {
    if (showChat && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [showChat]);

  const handleSendMessage = () => {
    if (currentMessage.trim() && sessionId) {
      const userMessage = currentMessage;
      
      // Dodaj wiadomość użytkownika
      setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
      setCurrentMessage('');
      setIsTyping(true);

      console.log('Wysyłanie wiadomości:', userMessage, 'Session ID:', sessionId);

      // Wyślij do webhooka z sessionId
      fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({ 
          message: userMessage,
          sessionId: sessionId 
        })
      })
        .then(response => {
          console.log('Status odpowiedzi:', response.status);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Otrzymana odpowiedź:', data);
          
          let responseMessage = '';
          
          if (data && typeof data === 'object') {
            if (data.message) {
              responseMessage = data.message;
            } else if (data.response && data.response.message) {
              responseMessage = data.response.message;
            } else if (data.data && data.data.message) {
              responseMessage = data.data.message;
            } else {
              responseMessage = JSON.stringify(data);
            }
          } else if (typeof data === 'string') {
            responseMessage = data;
          } else {
            responseMessage = 'Brak odpowiedzi od serwera';
          }
          
          setChatMessages(prev => [...prev, { 
            sender: 'echo', 
            text: responseMessage
          }]);
          setIsTyping(false);
        })
        .catch(error => {
          console.error('Błąd podczas komunikacji:', error);
          setChatMessages(prev => [...prev, { 
            sender: 'echo', 
            text: `Przepraszam, wystąpił błąd: ${error.message}. Spróbuj ponownie.` 
          }]);
          setIsTyping(false);
        });
    } else if (!sessionId) {
      console.error('Brak sessionId - nie można wysłać wiadomości');
      setChatMessages(prev => [...prev, { 
        sender: 'echo', 
        text: 'Błąd inicjalizacji czatu. Proszę odśwież stronę.' 
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Funkcja do resetowania sesji (opcjonalnie)
  const resetSession = () => {
    const newSessionId = generateSessionId();
    localStorage.setItem('chatSessionId', newSessionId);
    setSessionId(newSessionId);
    setChatMessages([]);
    console.log('Nowa sesja:', newSessionId);
  };

  if (!showChat) {
    return null;
  }

  return (
    <div 
      style={{
        position: 'fixed',
        left: '32px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 9999,
        pointerEvents: 'auto'
      }}
    >
      <div 
        style={{
          width: '384px',
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          backdropFilter: 'blur(12px)',
          borderRadius: '24px',
          padding: '24px',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          pointerEvents: 'auto'
        }}
      >
        {/* Chat Header z informacją o sesji */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            background: 'linear-gradient(to bottom right, #10b981, #06b6d4)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '16px',
            position: 'relative'
          }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>E</span>
            <div style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-4px',
              width: '16px',
              height: '16px',
              backgroundColor: '#10b981',
              borderRadius: '50%',
              border: '2px solid #0f172a'
            }}></div>
          </div>
          <div>
            <h3 style={{ color: 'white', fontWeight: 'bold', fontSize: '18px', margin: 0 }}>Echo AI</h3>
            <p style={{ color: '#6ee7b7', fontSize: '14px', margin: 0 }}>Online • Sesja aktywna</p>
          </div>
          
          {/* Przycisk resetowania sesji (opcjonalnie) */}
          <button 
            onClick={resetSession}
            style={{
              position: 'absolute',
              top: '0',
              right: '0',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '8px',
              padding: '4px 8px',
              color: '#e5e7eb',
              fontSize: '12px',
              cursor: 'pointer'
            }}
            title="Rozpocznij nową sesję"
          >
            🔄
          </button>
        </div>

        {/* Chat Messages */}
        <div 
          style={{
            height: '320px',
            overflowY: 'auto',
            marginBottom: '16px',
            padding: '4px',
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(16, 185, 129, 0.3) rgba(255, 255, 255, 0.1)'
          }}
        >
          {chatMessages.map((message, index) => (
            <div 
              key={index} 
              style={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '16px'
              }}
            >
              <div style={{
                maxWidth: '85%',
                padding: '12px',
                borderRadius: '16px',
                backgroundColor: message.sender === 'user' 
                  ? 'rgba(16, 185, 129, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)',
                color: message.sender === 'user' ? '#a7f3d0' : '#e5e7eb',
                border: message.sender === 'user' 
                  ? '1px solid rgba(16, 185, 129, 0.3)' 
                  : '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <p style={{ fontSize: '14px', lineHeight: '1.5', margin: 0, wordBreak: 'break-words' }}>
                  {message.text}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#e5e7eb',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '12px',
                borderRadius: '16px',
                maxWidth: '200px'
              }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite ease-in-out',
                    animationDelay: '0s'
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite ease-in-out',
                    animationDelay: '0.2s'
                  }}></div>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    backgroundColor: '#10b981',
                    borderRadius: '50%',
                    animation: 'bounce 1.4s infinite ease-in-out',
                    animationDelay: '0.4s'
                  }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div style={{
          display: 'flex',
          gap: '12px',
          pointerEvents: 'auto'
        }}>
          <input 
            ref={inputRef}
            type="text" 
            placeholder="Napisz wiadomość" 
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '16px',
              color: 'white',
              outline: 'none',
              pointerEvents: 'auto'
            }}
            autoComplete="off"
          />
          <button 
            onClick={handleSendMessage}
            disabled={!sessionId}
            style={{
              padding: '12px 24px',
              background: sessionId 
                ? 'linear-gradient(to right, #10b981, #06b6d4)'
                : 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '500',
              cursor: sessionId ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '16px',
              pointerEvents: 'auto',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => sessionId && (e.target.style.transform = 'scale(1.05)')}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            <span>Wyślij</span>
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          } 40% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};