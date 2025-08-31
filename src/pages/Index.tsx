import { useEffect, useState } from 'react';
import { ScrollingText } from '@/components/ScrollingText';
import { PulsingOrb } from '@/components/PulsingOrb';
import { TrialForm } from '@/components/TrialForm';
import { GalaxyBackground } from '@/components/StarField';
import heroImage from '@/assets/hero-cosmic.jpg';
import { ArrowBigRight , Headset, Mail, Layers, Smartphone  } from 'lucide-react';
import VoiceTalk from '@/components/VoiceTalk';

import { ChatInterface } from '@/components/Chat';
import { PhoneMockup } from '@/components/PhoneMockup';

  const sections = [
    { id: 'hero', icon: Mail , text: "Otrzymaj natychmiastowe wsparcie i techniki mindfulness."},
    { id: 'explore', icon: Smartphone, text:"Odkryj setki ćwiczeń i śledź swoje postępy." },
    { id: 'planets', icon: Headset, text:"Wygadaj się i odetnij od natrętnych myśli."},

  ];

const mentalHealthTexts = [
  "",
  "Codzienna medytacja",
  "Twój prywatny przewodnik",
  "",
  "Odkryj wewnętrzny spokój",
  ""
];





// Komponent Chat Interface


const Index = () => {
  const [showEcho, setShowEcho] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowEcho(true), 1000);
    return () => clearTimeout(timer);
  }, []);


const handleSectionClick = (sectionId) => {
  if (sectionId === 'hero') {
    setShowChat(!showChat);
    setShowPhone(false);
    setShowVoice(false);
  } else if (sectionId === 'explore') {
    setShowPhone(!showPhone);
    setShowChat(false);
    setShowVoice(false);
  } else if (sectionId === 'planets') { // ← 3 ikona
    setShowVoice(!showVoice);
    setShowChat(false);
    setShowPhone(false);
  }
};

  return (
    <div className="bg-black text-white">
      <GalaxyBackground />
      <PulsingOrb />
      <ScrollingText texts={mentalHealthTexts} />
      
      <div className="fixed right-8 top-3/4  transform -translate-y-1/2 z-30">
        <div className="flex flex-col space-y-4">
          {sections.map((section, index) => {
            const IconComponent = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className="p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/20 hover:bg-purple-500/30 transition-all group"
              >
                <IconComponent className="w-5 h-5 text-white group-hover:text-purple-300" />
              </button>
            );
          })}
        </div>
      </div>
           <ChatInterface showChat={showChat} />

      {/* Phone Mockup po lewej stronie */}
      <PhoneMockup showPhone={showPhone} />
      <VoiceTalk showVoice={showVoice} />
      

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-20">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <div className="relative z-10">
            <h1 className={`text-6xl md:text-8xl font-bold mb-8 animate-pulse `}>
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ">
                Echo
              </span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-purple-200 mb-8 font-light transition-all duration-1000   ${
              showEcho ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              Twój codzienny trener mindfulness
            </p>
            



          </div>
        </div>
      </section>


            <section className="h-screen flex items-center justify-center relative z-20">
        <div className="text-center max-w-3xl mx-auto px-6">


          
          <p className="text-2xl text-purple-300 mt-8 font-light">
            Echo to różnica między <span className="line-through text-white/50">chcieć</span> a <span className="text-green-400">robić</span>
          </p>
        </div>
      </section>

  <section className="h-screen flex items-center justify-center relative z-20">
  <div className="text-center max-w-3xl mx-auto px-6">
    
    <p className="text-3xl text-white mt-8 font-light leading-relaxed">
      Jak Echo <span className="text-green-400 font-medium">pomaga Ci </span>
      osiągnąć spokój?
    </p>

    <div className="p-6">
      <div className="flex flex-col space-y-4">
        {sections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className="flex items-center space-x-3 px-6 py-4 rounded-2xl 
                         bg-black/30 backdrop-blur-md border border-white/20 
                         hover:bg-purple-500/40 transition-all duration-300 
                         shadow-lg group text-left"
            >
              <IconComponent className="w-6 h-6 text-white group-hover:text-purple-300" />
              <span className="text-white text-base group-hover:text-purple-200">
                {section.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>

  </div>
</section>



      {/* Trial Form Section */}
      <section className="h-screen relative z-20 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light mb-80 text-white">
              Jesteś o krok od <span className="text-green-400">zmiany</span>
            </h2>
 
          </div>
 
          <TrialForm />
        </div>
      </section>
    </div>
  );
};

export default Index;