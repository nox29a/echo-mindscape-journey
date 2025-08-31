import { useEffect, useState } from "react";

const VoiceTalk = ({ showVoice }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [userEnteredCode, setUserEnteredCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verificationError, setVerificationError] = useState("");

  useEffect(() => {
    // Ładowanie widgetu ElevenLabs
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    document.head.appendChild(script);

    const timer = setTimeout(() => setIsVisible(true), 300);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      clearTimeout(timer);
    };
  }, []);

  // Funkcja do wysyłania danych do webhooka
  const sendToWebhook = async (email, code) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("verificationCode", code);
      formData.append("timestamp", new Date().toISOString());
      formData.append("source", "echo-ai-verification");

      const response = await fetch(
        "https://lukasz29a.app.n8n.cloud/webhook-test/a975ecce-4571-40be-b813-0ebe7bd294c6",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      return true;
    } catch (error) {
      console.error("Błąd podczas wysyłania do webhooka:", error);
      return true; // fallback dla demo
    }
  };

  // Obsługa wysyłania kodu
  const handleSendVerification = async () => {
    setVerificationError("");
    if (!email) {
      setVerificationError("Proszę wprowadzić adres email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setVerificationError("Proszę wprowadzić poprawny adres email");
      return;
    }

    setIsLoading(true);
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setVerificationCode(generatedCode);

    try {
      await sendToWebhook(email, generatedCode);
      setIsVerificationSent(true);
      alert(`Kod weryfikacyjny wysłany na ${email}.`);
    } catch {
      setVerificationError("Błąd podczas wysyłania kodu.");
    }
    setIsLoading(false);
  };

  // Weryfikacja kodu
  const handleVerifyCode = () => {
    if (userEnteredCode === verificationCode) {
      setIsEmailVerified(true);
      setVerificationError("");
      alert("Email zweryfikowany pomyślnie!");
    } else {
      setVerificationError("Nieprawidłowy kod weryfikacyjny.");
    }
  };

  const resetVerification = () => {
    setIsVerificationSent(false);
    setUserEnteredCode("");
    setVerificationError("");
  };

  return (
    <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-40">
      <div
        className={`transition-all duration-700 ease-out ${
          showVoice
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 -translate-x-full scale-95 pointer-events-none"
        }`}
      >
        {/* Panel główny */}
        <div className="w-80 sm:w-96 bg-slate-900/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 border border-emerald-400/30 shadow-2xl">
          {/* Nagłówek */}
          <div className="flex items-center mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-white/10">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-emerald-400 to-yellow-400 rounded-full flex items-center justify-center mr-3 sm:mr-4 relative flex-shrink-0">
              <span className="text-white font-bold text-base sm:text-lg">V</span>
              <div className="absolute -bottom-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-base sm:text-lg truncate">
                Echo Voice
              </h3>
              <p className="text-emerald-300 text-xs sm:text-sm">
                {isEmailVerified ? "Online • Gotowy do rozmowy" : "Wymagana weryfikacja email"}
              </p>
            </div>
          </div>

          {/* Weryfikacja emaila */}
          {!isEmailVerified ? (
            <div className="bg-black/50 rounded-xl p-6 mb-6 border border-emerald-400/30">
              <h4 className="text-lg font-semibold text-white mb-4">
                Weryfikacja emaila
              </h4>

              {!isVerificationSent ? (
                <div className="space-y-4">
                  <input
                    type="email"
                    placeholder="Twój adres email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/50"
                  />
                  {verificationError && (
                    <p className="text-red-400 text-sm">{verificationError}</p>
                  )}
                  <button
                    onClick={handleSendVerification}
                    disabled={isLoading}
                    className="w-full px-6 py-3 bg-gradient-to-r from-emerald-400 to-yellow-400 text-white rounded-xl font-medium hover:from-emerald-500 hover:to-yellow-500 transition-all"
                  >
                    {isLoading ? "Wysyłanie..." : "Wyślij kod weryfikacyjny"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-emerald-300 mb-2">
                    Kod weryfikacyjny został wysłany na adres: {email}
                  </p>
                  <input
                    type="text"
                    placeholder="Wprowadź kod"
                    value={userEnteredCode}
                    onChange={(e) => setUserEnteredCode(e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400/50"
                  />
                  {verificationError && (
                    <p className="text-red-400 text-sm">{verificationError}</p>
                  )}
                  <div className="flex gap-3">
                    <button
                      onClick={handleVerifyCode}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-400 to-yellow-400 text-white rounded-xl font-medium hover:from-emerald-500 hover:to-yellow-500"
                    >
                      Zweryfikuj kod
                    </button>
                    <button
                      onClick={resetVerification}
                      className="px-4 py-3 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700"
                    >
                      Zmień email
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-emerald-300 mb-6">
              ✅ Email zweryfikowany! Możesz teraz korzystać z rozmowy głosowej.
            </p>
          )}

          {/* Kontener ElevenLabs */}
            {isEmailVerified ? (
          <div className="bg-black/70 rounded-lg p-6 h-[650px] w-auto border border-emerald-400/30">
              <div className="elevenlabs-convai-container">
                <elevenlabs-convai agent-id="agent_5501k3tx0sj4exe8xg5hx1vrwsqt"></elevenlabs-convai>
              </div>
          </div>
            ) : (
                <div className="bg-black/70 rounded-lg p-6  border border-emerald-400/30">
              <p className="text-gray-400 text-center">
                Rozmowa głosowa będzie dostępna po weryfikacji adresu email.
              </p>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default VoiceTalk;
