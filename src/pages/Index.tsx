import { useEffect, useState } from 'react';
import { ScrollingText } from '@/components/ScrollingText';
import { PulsingOrb } from '@/components/PulsingOrb';
import { TrialForm } from '@/components/TrialForm';
import heroImage from '@/assets/hero-cosmic.jpg';

const mentalHealthTexts = [
  "Your mind is a garden, tend it with kindness",
  "Healing begins with a single breath",
  "You are stronger than your thoughts",
  "Peace lives within you, waiting to be discovered",
  "Every moment is a new beginning",
  "Your journey matters, you matter"
];

const Index = () => {
  const [showEcho, setShowEcho] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowEcho(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="cosmic-background min-h-screen">
      <PulsingOrb />
      <ScrollingText texts={mentalHealthTexts} />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative z-20">
        <div className="text-center px-6 max-w-4xl mx-auto">
          <div 
            className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
          
          <div className="relative z-10">
            <h1 className={`text-6xl md:text-8xl font-bold mb-8 transition-all duration-1000 ${
              showEcho ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <span className="text-mystical animate-float">Echo</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-ethereal mb-12 font-light animate-fade-up animation-delay-500">
              A gentle companion for your mental wellness journey
            </p>
            
            <div className="animate-fade-up animation-delay-1000">
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Discover inner peace through personalized guidance, mindful conversations, 
                and evidence-based mental health support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer sections for scroll effect */}
      <section className="h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl text-mystical mb-6 font-light">
            Listen to Your Inner Voice
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Echo helps you navigate life's challenges with compassion and understanding. 
            Our AI companion learns your unique patterns and provides personalized support.
          </p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl text-mystical mb-6 font-light">
            Find Your Balance
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Through guided meditations, mood tracking, and gentle check-ins, 
            Echo becomes your trusted partner in building lasting mental wellness habits.
          </p>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl text-mystical mb-6 font-light">
            You're Not Alone
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Join thousands who have found comfort, clarity, and growth through Echo's 
            supportive presence. Your mental health journey deserves gentle, expert guidance.
          </p>
        </div>
      </section>

      {/* Trial Form Section */}
      <section className="relative z-20">
        <TrialForm />
      </section>
    </div>
  );
};

export default Index;