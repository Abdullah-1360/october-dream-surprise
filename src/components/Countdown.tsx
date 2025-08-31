import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { Card } from '@/components/ui/card';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownProps {
  onComplete: () => void;
}

// Constants for better performance
const TARGET_DATE = new Date('2024-10-16T00:00:00').getTime();
const CELEBRATION_EMOJIS = ['🎉', '🎊', '✨', '💖', '🌟', '💕', '🎂', '🥳'];
const TIME_UNITS = [
  { key: 'days', label: 'Days', emoji: '💕' },
  { key: 'hours', label: 'Hours', emoji: '✨' },
  { key: 'minutes', label: 'Minutes', emoji: '🌟' },
  { key: 'seconds', label: 'Seconds', emoji: '💖' }
] as const;

const Countdown = memo(({ onComplete }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  const calculateTimeLeft = useCallback((): TimeLeft => {
    const now = new Date().getTime();
    const difference = TARGET_DATE - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000)
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      
      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        setIsComplete(true);
        onComplete();
        clearInterval(timer);
        return;
      }

      setTimeLeft(newTimeLeft);
      setPulseKey(prev => prev + 1);
    }, 1000);

    // Initial calculation
    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);

    return () => clearInterval(timer);
  }, [onComplete, calculateTimeLeft]);

  // Memoized celebration particles for better performance
  const celebrationParticles = useMemo(() => 
    Array.from({ length: window.innerWidth < 768 ? 15 : 25 }).map((_, i) => ({
      id: i,
      emoji: CELEBRATION_EMOJIS[Math.floor(Math.random() * CELEBRATION_EMOJIS.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 1.5 + Math.random() * 2
    })), [isComplete]
  );

  if (isComplete) {
    return (
      <div className="text-center animate-fade-in-up">
        <div className="relative overflow-hidden rounded-3xl p-4 sm:p-8">
          {/* Celebration particles - reduced for mobile */}
          <div className="absolute inset-0 pointer-events-none">
            {celebrationParticles.map((particle) => (
              <div
                key={particle.id}
                className="absolute animate-bounce text-xl sm:text-2xl md:text-3xl"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              >
                {particle.emoji}
              </div>
            ))}
          </div>
          
          <div className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-gradient mb-4 sm:mb-8 animate-pulse relative z-10 leading-tight">
            🎉 It's Your Special Day! 🎂
          </div>
          <p className="text-lg sm:text-2xl md:text-3xl text-romantic animate-bounce relative z-10">
            Happy Birthday, Beautiful Angel! 💖
          </p>
        </div>
      </div>
    );
  }

  // Memoized sparkles for better performance
  const sparkles = useMemo(() => 
    Array.from({ length: window.innerWidth < 768 ? 8 : 15 }).map((_, i) => ({
      id: i,
      left: 5 + (i * (window.innerWidth < 768 ? 12 : 6)),
      top: 15 + Math.sin(i) * 40,
      delay: i * 0.4
    })), []
  );

  return (
    <div className="text-center space-y-6 sm:space-y-8">
      <div className="relative mb-6 sm:mb-8 px-4">
        {/* Magical sparkles - reduced for mobile */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute animate-pulse text-romantic opacity-60 text-lg sm:text-xl md:text-2xl"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                animationDelay: `${sparkle.delay}s`,
                animationDuration: '3s'
              }}
            >
              ✨
            </div>
          ))}
        </div>
        
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gradient relative z-10 leading-tight">
          Countdown to Your Special Day
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mt-2 sm:mt-4 relative z-10">
          October 16th • The day an angel was born ✨
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto px-4">
        {TIME_UNITS.map((unit, index) => (
          <Card 
            key={unit.key}
            className="card-romantic text-center p-3 sm:p-4 md:p-6 hover:scale-105 sm:hover:scale-110 transition-all duration-300 sm:duration-500 relative overflow-hidden group touch-manipulation"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-romantic/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div 
              key={`${unit.key}-${pulseKey}`}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gradient mb-1 sm:mb-2 relative z-10 animate-pulse leading-none"
              style={{ 
                animationDuration: unit.key === 'seconds' ? '1s' : '2s',
                fontSize: 'clamp(1.5rem, 4vw + 0.5rem, 4rem)' 
              }}
            >
              {timeLeft[unit.key as keyof TimeLeft]}
            </div>
            <div className="text-xs sm:text-sm md:text-base text-muted-foreground uppercase tracking-wide relative z-10 font-medium">
              {unit.label}
            </div>
            <div 
              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-romantic opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce text-lg sm:text-xl md:text-2xl"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {unit.emoji}
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 sm:mt-12 relative px-4">
        <p className="text-sm sm:text-lg md:text-xl text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
          Until the most beautiful angel celebrates another year of magic ✨
        </p>
        
        {/* Floating message with enhanced animation */}
        <div className="animate-float" style={{ animationDuration: '4s' }}>
          <div className="inline-flex items-center space-x-2 sm:space-x-3 text-sm sm:text-base md:text-lg text-romantic bg-romantic/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-romantic/20 max-w-full">
            <span className="heart-pulse text-lg sm:text-xl md:text-2xl flex-shrink-0">💖</span>
            <span className="font-medium text-center">Every second brings us closer to your special day!</span>
            <span className="heart-pulse text-lg sm:text-xl md:text-2xl flex-shrink-0">💖</span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Countdown;