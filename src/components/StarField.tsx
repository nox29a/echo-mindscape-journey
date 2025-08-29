import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: 'small' | 'medium' | 'large';
  duration: number;
}

interface ConstellationLine {
  id: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  width: number;
  angle: number;
  duration: number;
}

export const StarField = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [lines, setLines] = useState<ConstellationLine[]>([]);

  useEffect(() => {
    // Generate stars
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 100;

      for (let i = 0; i < starCount; i++) {
        const sizeRandom = Math.random();
        let size: 'small' | 'medium' | 'large';
        
        if (sizeRandom < 0.7) size = 'small';
        else if (sizeRandom < 0.9) size = 'medium';
        else size = 'large';

        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size,
          duration: 2 + Math.random() * 4, // 2-6 seconds
        });
      }
      setStars(newStars);
    };

    // Generate constellation lines
    const generateLines = () => {
      const newLines: ConstellationLine[] = [];
      const lineCount = 15;

      for (let i = 0; i < lineCount; i++) {
        const x1 = Math.random() * 100;
        const y1 = Math.random() * 100;
        const x2 = x1 + (Math.random() - 0.5) * 30; // Lines up to 30% width
        const y2 = y1 + (Math.random() - 0.5) * 20; // Lines up to 20% height
        
        const width = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        newLines.push({
          id: i,
          x1,
          y1,
          x2,
          y2,
          width,
          angle,
          duration: 6 + Math.random() * 8, // 6-14 seconds
        });
      }
      setLines(newLines);
    };

    generateStars();
    generateLines();
  }, []);

  return (
    <div className="starfield">
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className={`star star-${star.size}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            '--duration': `${star.duration}s`,
            animationDelay: `${Math.random() * 3}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Constellation Lines */}
      {lines.map((line) => (
        <div
          key={line.id}
          className="constellation-line"
          style={{
            left: `${line.x1}%`,
            top: `${line.y1}%`,
            width: `${line.width}%`,
            transform: `rotate(${line.angle}deg)`,
            '--duration': `${line.duration}s`,
            animationDelay: `${Math.random() * 5}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};