import { useEffect, useState } from 'react';

interface ScrollingTextProps {
  texts: string[];
  className?: string;
}

export const ScrollingText = ({ texts, className = "" }: ScrollingTextProps) => {
  const [visibleTexts, setVisibleTexts] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Calculate which texts should be visible based on scroll position
      const scrollProgress = scrollY / (documentHeight - windowHeight);
      const newVisibleTexts = new Set<number>();
      
      texts.forEach((_, index) => {
        const showAt = (index + 1) / (texts.length + 1);
        const hideAt = (index + 2) / (texts.length + 1);
        
        if (scrollProgress >= showAt && scrollProgress < hideAt) {
          newVisibleTexts.add(index);
        }
      });
      
      setVisibleTexts(newVisibleTexts);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [texts.length]);

  return (
    <div className={`fixed inset-0 pointer-events-none z-10 ${className}`}>
      {texts.map((text, index) => {
        const isVisible = visibleTexts.has(index);
        const positions = [
          'top-1/4 left-1/4',
          'top-1/3 right-1/4',
          'top-1/2 left-1/3',
          'top-2/3 right-1/3',
          'top-3/4 left-1/2',
          'top-1/6 right-1/2',
        ];
        
        return (
          <div
            key={index}
            className={`absolute ${positions[index % positions.length]} floating-text ${
              isVisible ? 'visible' : ''
            }`}
          >
            <p className="text-ethereal text-lg md:text-xl font-light max-w-xs text-center">
              {text}
            </p>
          </div>
        );
      })}
    </div>
  );
};