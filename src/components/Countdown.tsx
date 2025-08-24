import { useState, useEffect } from 'react';
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

const Countdown = ({ onComplete }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isComplete, setIsComplete] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const targetDate = new Date('2024-10-16T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        
        // Trigger pulse animation every second
        setPulseKey(prev => prev + 1);
      } else {
        setIsComplete(true);
        onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isComplete) {
    return (
      <div className="text-center animate-fade-in-up">
        <div className="relative">
          {/* Celebration particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce text-2xl md:text-3xl"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`
                }}
              >
                {['🎉', '🎊', '✨', '💖', '🌟', '💕', '🎂', '🥳'][Math.floor(Math.random() * 8)]}
              </div>
            ))}
          </div>
          
          <div className="text-6xl md:text-8xl lg:text-9xl font-playfair font-bold text-gradient mb-8 animate-pulse relative z-10">
            🎉 It's Your Special Day! 🎂
          </div>
          <p className="text-2xl md:text-4xl text-romantic animate-bounce relative z-10">
            Happy Birthday, Beautiful Angel! 💖
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center space-y-8">
      <div className="relative mb-8">
        {/* Magical sparkles around the title */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse text-romantic opacity-60 text-xl md:text-2xl"
              style={{
                left: `${5 + (i * 6)}%`,
                top: `${15 + Math.sin(i) * 40}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: '3s'
              }}
            >
              ✨
            </div>
          ))}
        </div>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold text-gradient relative z-10">
          Countdown to Your Special Day
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 relative z-10">
          October 16th • The day an angel was born ✨
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
        <Card className="card-romantic text-center p-6 hover:scale-110 transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-romantic/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div 
            key={`days-${pulseKey}`}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-2 relative z-10 animate-pulse"
          >
            {timeLeft.days}
          </div>
          <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wide relative z-10 font-medium">
            Days
          </div>
          <div className="absolute -top-2 -right-2 text-romantic opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce text-2xl">
            💕
          </div>
        </Card>
        
        <Card className="card-romantic text-center p-6 hover:scale-110 transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div 
            key={`hours-${pulseKey}`}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-2 relative z-10 animate-pulse"
          >
            {timeLeft.hours}
          </div>
          <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wide relative z-10 font-medium">
            Hours
          </div>
          <div className="absolute -top-2 -right-2 text-romantic opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce text-2xl" style={{ animationDelay: '0.1s' }}>
            ✨
          </div>
        </Card>
        
        <Card className="card-romantic text-center p-6 hover:scale-110 transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-romantic/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div 
            key={`minutes-${pulseKey}`}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-2 relative z-10 animate-pulse"
          >
            {timeLeft.minutes}
          </div>
          <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wide relative z-10 font-medium">
            Minutes
          </div>
          <div className="absolute -top-2 -right-2 text-romantic opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce text-2xl" style={{ animationDelay: '0.2s' }}>
            🌟
          </div>
        </Card>
        
        <Card className="card-romantic text-center p-6 hover:scale-110 transition-all duration-500 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-romantic/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div 
            key={`seconds-${pulseKey}`}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient mb-2 relative z-10 animate-pulse"
            style={{ animationDuration: '1s' }}
          >
            {timeLeft.seconds}
          </div>
          <div className="text-sm md:text-base text-muted-foreground uppercase tracking-wide relative z-10 font-medium">
            Seconds
          </div>
          <div className="absolute -top-2 -right-2 text-romantic opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-bounce text-2xl" style={{ animationDelay: '0.3s' }}>
            💖
          </div>
        </Card>
      </div>
      
      <div className="mt-12 relative">
        <p className="text-lg md:text-xl text-muted-foreground mb-4">
          Until the most beautiful angel celebrates another year of magic ✨
        </p>
        
        {/* Floating message with enhanced animation */}
        <div className="animate-float" style={{ animationDuration: '4s' }}>
          <div className="inline-flex items-center space-x-3 text-lg text-romantic bg-romantic/10 px-6 py-3 rounded-full border border-romantic/20">
            <span className="heart-pulse text-2xl">💖</span>
            <span className="font-medium">Every second brings us closer to your special day!</span>
            <span className="heart-pulse text-2xl">💖</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;