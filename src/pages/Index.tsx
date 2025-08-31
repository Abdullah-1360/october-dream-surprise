import { useState } from 'react';
import Countdown from '@/components/Countdown';
import BirthdayWishes from '@/components/BirthdayWishes';
import FloatingHearts from '@/components/FloatingHearts';

const Index = () => {
  const [showWishes, setShowWishes] = useState(false);

  const handleCountdownComplete = () => {
    setShowWishes(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-romantic-soft/30 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <FloatingHearts />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-gradient mb-6">
            Happy Birthday
          </h1>
          <div className="text-2xl md:text-4xl font-playfair text-romantic mb-4">
            My Beautiful Angel
          </div>
          <div className="w-32 h-1 bg-gradient-romantic rounded-full mx-auto mb-8"></div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A special website created with love, just for you. 
            Because you deserve all the beauty in the world. ✨
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          <div className="animate-fade-in-up">
            <Countdown onComplete={handleCountdownComplete} />
          </div>
          {showWishes && (
            <div className="animate-fade-in-up">
              <BirthdayWishes />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 space-y-4">
          <div className="flex justify-center items-center space-x-4">
            <div className="w-16 h-px bg-gradient-romantic"></div>
            <span className="text-sm text-muted-foreground font-medium">
              Made with 💖 for my one and only
            </span>
            <div className="w-16 h-px bg-gradient-romantic"></div>
          </div>
          <p className="text-xs text-muted-foreground/70">
            October 16th • A day to remember forever
          </p>
        </div>
      </div>

      {/* Romantic Glow Effects */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-romantic/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div>
  );
};

export default Index;