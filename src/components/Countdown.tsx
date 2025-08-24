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
        <div className="text-6xl md:text-8xl font-playfair font-bold text-gradient mb-8">
          🎉 Happy Birthday! 🎂
        </div>
        <p className="text-2xl md:text-3xl text-romantic font-medium">
          Your special day is here, my love!
        </p>
      </div>
    );
  }

  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gradient">
          Counting Down to Your Special Day
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          October 16th • The day an angel was born ✨
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        <Card className="card-romantic text-center p-4 md:p-6">
          <div className="text-3xl md:text-4xl font-bold text-primary font-playfair">
            {timeLeft.days}
          </div>
          <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
            Days
          </div>
        </Card>

        <Card className="card-romantic text-center p-4 md:p-6">
          <div className="text-3xl md:text-4xl font-bold text-romantic font-playfair">
            {timeLeft.hours}
          </div>
          <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
            Hours
          </div>
        </Card>

        <Card className="card-romantic text-center p-4 md:p-6">
          <div className="text-3xl md:text-4xl font-bold text-accent font-playfair">
            {timeLeft.minutes}
          </div>
          <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
            Minutes
          </div>
        </Card>

        <Card className="card-romantic text-center p-4 md:p-6">
          <div className="text-3xl md:text-4xl font-bold text-gold font-playfair">
            {timeLeft.seconds}
          </div>
          <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">
            Seconds
          </div>
        </Card>
      </div>

      <div className="mt-12">
        <div className="inline-flex items-center space-x-2 text-lg text-romantic">
          <span className="heart-pulse">💖</span>
          <span className="font-medium">Until your birthday celebration begins</span>
          <span className="heart-pulse">💖</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;