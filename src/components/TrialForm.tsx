import { useState, useRef } from "react";
export const TrialForm = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [goals, setGoals] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [audioError, setAudioError] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [customGoal, setCustomGoal] = useState('');
  const chunks = useRef<Blob[]>([]);
  const [showAudioInfo, setShowAudioInfo] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunks.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setAudioError("");
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      setAudioError("Nie udało się uzyskać dostępu do mikrofonu");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleGoalChange = (goal) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else if (goals.length < 3) {
      setGoals([...goals, goal]);
    }
  };

  const addCustomGoal = () => {
    if (customGoal.trim() !== '' && goals.length < 3 && !goals.includes(customGoal.trim())) {
      setGoals([...goals, customGoal.trim()]);
      setCustomGoal('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Usunięto wymaganie nagrania audio - teraz jest opcjonalne
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("goals", JSON.stringify(goals));
    formData.append("notes", notes);

    if (chunks.current.length > 0) {
      const blob = new Blob(chunks.current, { type: "audio/mp3" });
      formData.append("file", blob, "recording.mp3");
    }

    try {
      await fetch("https://lukasz29a.app.n8n.cloud/webhook/coaching-form", {
        method: "POST",
        body: formData,
      });
      alert("Formularz wysłany ✅");
    } catch (err) {
      console.error("Błąd wysyłki:", err);
      alert("Nie udało się wysłać formularza ❌");
    }
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center relative ">
      {/* Neural Network Background Elements */}



      {/* Main Form Content */}
      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 drop-shadow-2xl mb-4">
            Rozpocznij swoją podróż
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Wypełnij formularz, a stworzymy dla Ciebie idealny plan na początek.
          </p>
          
        </div>

        <div className="flex flex-col space-y-6 p-8 bg-slate-800/40 backdrop-blur-xl rounded-3xl border border-emerald-400/20 shadow-2xl">
          {/* Dane kontaktowe */}
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Imię"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-4 border border-slate-600/50 bg-slate-700/50 backdrop-blur-sm rounded-xl w-full focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400/50 transition-all duration-300 text-white placeholder-gray-400"
              required
            />
            
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-4 border border-slate-600/50 bg-slate-700/50 backdrop-blur-sm rounded-xl w-full focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400/50 transition-all duration-300 text-white placeholder-gray-400"
              required
            />
          </div>

          {/* Cele - Interactive Cards */}


          {/* Notatki */}
          <div>
            <textarea
              placeholder="Opisz jak się czujesz..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="p-4 border border-slate-600/50 bg-slate-700/50 backdrop-blur-sm rounded-xl w-full focus:ring-2 focus:ring-emerald-400/30 focus:border-emerald-400/50 transition-all duration-300 text-white placeholder-gray-400 resize-none"
            />
          </div>

          {/* Nagrywanie audio - Opcjonalne */}
          <div 
            id="recording-section"
            className="space-y-4 p-6 bg-gradient-to-r from-cyan-400/5 to-blue-400/5 backdrop-blur-sm rounded-xl border border-cyan-400/20"
          >
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <p className="font-medium text-lg text-cyan-300">Wiadomość głosowa</p>
                <span className="px-2 py-1 text-xs bg-cyan-400/20 text-cyan-300 rounded-full">opcjonalne</span>
              </div>
              <p className="text-sm text-gray-400">Nagraj krótką wiadomość, aby lepiej wyrazić swoje uczucia</p>
            </div>

            <div className="flex justify-center">
              {!recording ? (
                <button
                  type="button"
                  onClick={startRecording}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl shadow-lg hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-cyan-400/25 flex items-center gap-3"
                >
                 
                  <span className="font-medium">Rozpocznij nagrywanie</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={stopRecording}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl shadow-lg hover:from-red-400 hover:to-pink-400 transition-all duration-300 hover:scale-105 hover:shadow-red-400/25 flex items-center gap-3 animate-pulse"
                >
                 
                  <span className="font-medium">Zatrzymaj nagrywanie</span>
                </button>
              )}
            </div>

            {/* Info expandable */}
            <div className="flex justify-center">
              <button 
                type="button" 
                onClick={() => setShowAudioInfo(!showAudioInfo)}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-sm"
              >
               
                <span>{showAudioInfo ? 'Ukryj' : 'Pokaż'} szczegóły</span>
              </button>
            </div>

            {showAudioInfo && (
              <div className="mt-4 p-4 bg-cyan-400/10 backdrop-blur-sm rounded-lg border border-cyan-400/20">
                <p className="text-sm text-cyan-200 mb-2">
                  <strong>Dlaczego warto nagrać wiadomość?</strong>
                </p>
                <ul className="text-sm text-cyan-200 space-y-1 ml-4">
                  <li>• Lepsze zrozumienie Twojego stanu emocjonalnego</li>
                  <li>• Możliwość dostosowania pomocy do Twojego tonu głosu</li>
                  <li>• Bardziej personalne podejście do Twoich potrzeb</li>
                </ul>
              </div>
            )}

            {audioError && (
              <div className="p-4 bg-red-400/10 backdrop-blur-sm rounded-lg border border-red-400/20">
                <p className="text-red-300 font-medium text-center">{audioError}</p>
              </div>
            )}

            {audioURL && (
              <div className="mt-4 w-full">
                <div className="text-center mb-3">
                  <p className="text-emerald-300 font-medium flex items-center justify-center gap-2">
                    Nagranie gotowe!
                  </p>
                </div>
                <div className="bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border border-emerald-400/20">
                  <audio controls src={audioURL} className="w-full rounded-lg mb-3" />
                  <div className="flex justify-center">
                    <a
                      href={audioURL}
                      download="recording.webm"
                      className="text-emerald-400 hover:text-emerald-300 transition-colors duration-200 text-sm flex items-center gap-1"
                    >
                      Pobierz nagranie
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="relative px-8 py-4 bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 text-slate-900 rounded-xl shadow-2xl hover:shadow-emerald-400/25 hover:scale-105 transition-all duration-300 text-lg font-bold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
          >
            <span className="relative z-10">Wyślij formularz</span>
            
            
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </div>

      {/* Floating particles for extra atmosphere */}
      <div className="absolute w-2 h-2 bg-emerald-400/20 rounded-full animate-bounce" style={{ top: '20%', left: '10%', animationDelay: '0s', animationDuration: '4s' }} />
      <div className="absolute w-2 h-2 bg-cyan-400/20 rounded-full animate-bounce" style={{ top: '70%', right: '10%', animationDelay: '2s', animationDuration: '4s' }} />
      <div className="absolute w-1 h-1 bg-emerald-400/30 rounded-full animate-ping" style={{ top: '30%', right: '20%', animationDelay: '1s' }} />
      <div className="absolute w-1 h-1 bg-cyan-400/30 rounded-full animate-ping" style={{ bottom: '30%', left: '20%', animationDelay: '3s' }} />
    </section>
  );
}