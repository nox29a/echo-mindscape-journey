import { useEffect, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: 'tiny' | 'small' | 'medium' | 'large';
  brightness: number;
  duration: number;
  color: string;
}

interface NebulaCloud {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  blur: number;
}

interface Planet {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rings: boolean;
  duration: number;
}

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  duration: number;
  delay: number;
}

export const GalaxyBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [nebulaClouds, setNebulaClouds] = useState<NebulaCloud[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);

  useEffect(() => {
    // Generowanie gwiazd z różnymi kolorami
    const generateStars = () => {
      const newStars: Star[] = [];
      const starCount = 1000;
      const starColors = ['#ffffff', '#fff8dc', '#87ceeb', '#ffd700', '#ff6347', '#dda0dd'];

      for (let i = 0; i < starCount; i++) {
        const sizeRandom = Math.random();
        let size: 'tiny' | 'small' | 'medium' | 'large';
        
        if (sizeRandom < 0.6) size = 'tiny';
        else if (sizeRandom < 0.8) size = 'small';
        else if (sizeRandom < 0.95) size = 'medium';
        else size = 'large';

        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size,
          brightness: 0.3 + Math.random() * 0.7,
          duration: 3 + Math.random() * 8,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        });
      }
      setStars(newStars);
    };

    // Generowanie mgławic
    const generateNebulaClouds = () => {
      const newClouds: NebulaCloud[] = [];
      const cloudCount = 8;
      const nebulaColors = [
        'rgba(138, 43, 226, 0.3)',
        'rgba(75, 0, 130, 0.3)',
        'rgba(220, 20, 60, 0.3)',
        'rgba(255, 140, 0, 0.3)',
        'rgba(30, 144, 255, 0.3)',
        'rgba(147, 112, 219, 0.3)'
      ];

      for (let i = 0; i < cloudCount; i++) {
        newClouds.push({
          id: i,
          x: Math.random() * 120 - 10,
          y: Math.random() * 120 - 10,
          size: 30 + Math.random() * 40,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          opacity: 0.2 + Math.random() * 0.3,
          duration: 15 + Math.random() * 25,
          blur: 20 + Math.random() * 30,
        });
      }
      setNebulaClouds(newClouds);
    };

    // Generowanie planet
    const generatePlanets = () => {
      const newPlanets: Planet[] = [];
      const planetCount = 6;
      const planetColors = ['#ff6b47', '#4ecdc4', '#45b7d1', '#f9ca24', '#eb4d4b', '#6c5ce7'];

      for (let i = 0; i < planetCount; i++) {
        newPlanets.push({
          id: i,
          x: Math.random() * 80 + 10,
          y: Math.random() * 80 + 10,
          size: 15 + Math.random() * 25,
          color: planetColors[Math.floor(Math.random() * planetColors.length)],
          rings: Math.random() > 0.7,
          duration: 20 + Math.random() * 30,
        });
      }
      setPlanets(newPlanets);
    };

    // Generowanie spadających gwiazd
    const generateShootingStars = () => {
      const newShootingStars: ShootingStar[] = [];
      const shootingStarCount = 5;

      for (let i = 0; i < shootingStarCount; i++) {
        const startX = Math.random() * 50;
        const startY = Math.random() * 30;
        const endX = startX + 30 + Math.random() * 40;
        const endY = startY + 20 + Math.random() * 30;

        newShootingStars.push({
          id: i,
          startX,
          startY,
          endX,
          endY,
          duration: 2 + Math.random() * 3,
          delay: Math.random() * 10,
        });
      }
      setShootingStars(newShootingStars);
    };

    generateStars();
    generateNebulaClouds();
    generatePlanets();
    generateShootingStars();

    // Regenerowanie spadających gwiazd co jakiś czas
    const shootingStarInterval = setInterval(() => {
      generateShootingStars();
    }, 15000);

    return () => clearInterval(shootingStarInterval);
  }, []);

  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '460vh',
      background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 30%, #0f0f23 70%, #000000 100%)',
      overflow: 'hidden',
    }}>
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }

        @keyframes drift {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(5px, -10px) rotate(90deg); }
          50% { transform: translate(-5px, 5px) rotate(180deg); }
          75% { transform: translate(-10px, -5px) rotate(270deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        @keyframes nebulaPulse {
          0%, 100% { opacity: var(--base-opacity); transform: scale(1); }
          50% { opacity: calc(var(--base-opacity) * 1.5); transform: scale(1.05); }
        }

        @keyframes planetRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes shootingStarMove {
          0% {
            opacity: 0;
            transform: translate(var(--start-x), var(--start-y)) scale(0);
          }
          10% {
            opacity: 1;
            transform: translate(var(--start-x), var(--start-y)) scale(1);
          }
          90% {
            opacity: 1;
            transform: translate(var(--end-x), var(--end-y)) scale(1);
          }
          100% {
            opacity: 0;
            transform: translate(var(--end-x), var(--end-y)) scale(0);
          }
        }

        @keyframes blackHoleSwirl {
          0% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(360deg) scale(1.1); }
        }

        .star {
          position: absolute;
          border-radius: 50%;
          animation: twinkle var(--duration) infinite ease-in-out;
          box-shadow: 0 0 3px currentColor;
        }

        .star-tiny {
          width: 1px;
          height: 1px;
        }

        .star-small {
          width: 2px;
          height: 2px;
        }

        .star-medium {
          width: 3px;
          height: 3px;
          box-shadow: 0 0 6px currentColor;
        }

        .star-large {
          width: 4px;
          height: 4px;
          box-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
        }

        .nebula-cloud {
          position: absolute;
          border-radius: 50%;
          animation: nebulaPulse var(--duration) infinite ease-in-out, drift calc(var(--duration) * 2) infinite linear;
          filter: blur(var(--blur-amount));
        }

        .planet {
          position: absolute;
          border-radius: 50%;
          animation: planetRotate var(--duration) infinite linear;
          filter: drop-shadow(0 0 10px rgba(255,255,255,0.3));
        }

        .planet-rings::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 150%;
          height: 20%;
          border: 2px solid rgba(255,255,255,0.4);
          border-radius: 50%;
          transform: translate(-50%, -50%) rotateX(70deg);
        }

        .shooting-star {
          position: absolute;
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
          animation: shootingStarMove var(--duration) infinite linear;
          box-shadow: 0 0 10px white, -50px -10px 20px rgba(255,255,255,0.5);
        }

        .shooting-star::before {
          content: '';
          position: absolute;
          top: 0;
          left: -50px;
          width: 50px;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), white);
          border-radius: 50%;
        }

        .black-hole {
          position: absolute;
          top: 70%;
          right: 15%;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: radial-gradient(circle, transparent 30%, rgba(0,0,0,0.9) 40%, transparent 70%);
          border: 1px solid rgba(138, 43, 226, 0.8);
          animation: blackHoleSwirl 20s infinite linear;
          box-shadow: 
            0 0 20px rgba(138, 43, 226, 0.6),
            inset 0 0 20px rgba(138, 43, 226, 0.3);
        }

        .galaxy-center {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100px;
          height: 100px;
          transform: translate(-50%, -50%);
          background: radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, rgba(138, 43, 226, 0.3) 50%, transparent 100%);
          border-radius: 50%;
          animation: drift 60s infinite linear;
          filter: blur(2px);
        }
      `}</style>

      {/* Centrum galaktyki */}
      <div className="galaxy-center" />

      {/* Czarna dziura */}
      <div className="black-hole" />

      {/* Mgławice */}
      {nebulaClouds.map((cloud) => (
        <div
          key={`nebula-${cloud.id}`}
          className="nebula-cloud"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}%`,
            height: `${cloud.size * 0.6}%`,
            backgroundColor: cloud.color,
            '--duration': `${cloud.duration}s`,
            '--base-opacity': cloud.opacity,
            '--blur-amount': `${cloud.blur}px`,
            animationDelay: `${Math.random() * 10}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Planety */}
      {planets.map((planet) => (
        <div
          key={`planet-${planet.id}`}
          className={`planet ${planet.rings ? 'planet-rings' : ''}`}
          style={{
            left: `${planet.x}%`,
            top: `${planet.y}%`,
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            backgroundColor: planet.color,
            '--duration': `${planet.duration}s`,
            animationDelay: `${Math.random() * 20}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Gwiazdy */}
      {stars.map((star) => (
        <div
          key={`star-${star.id}`}
          className={`star star-${star.size}`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            backgroundColor: star.color,
            color: star.color,
            '--duration': `${star.duration}s`,
            animationDelay: `${Math.random() * 5}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Spadające gwiazdy */}
      {shootingStars.map((shootingStar) => (
        <div
          key={`shooting-star-${shootingStar.id}`}
          className="shooting-star"
          style={{
            '--start-x': `${shootingStar.startX}%`,
            '--start-y': `${shootingStar.startY}%`,
            '--end-x': `${shootingStar.endX}%`,
            '--end-y': `${shootingStar.endY}%`,
            '--duration': `${shootingStar.duration}s`,
            animationDelay: `${shootingStar.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};