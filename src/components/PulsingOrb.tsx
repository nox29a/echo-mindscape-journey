export const PulsingOrb = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 ${className}`}>
      <div className="pulse-orb animate-pulse-glow"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-32 h-32 bg-gradient-to-r from-mystical-purple to-mystical-teal rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
};