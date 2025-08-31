import { useState, useCallback, memo } from 'react';
import Countdown from '@/components/Countdown';
import BirthdayWishes from '@/components/BirthdayWishes';
import FloatingHearts from '@/components/FloatingHearts';

const Index = memo(() => {
  const [showWishes, setShowWishes] = useState(false);

  const handleCountdownComplete = useCallback(() => {
    setShowWishes(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-romantic-soft/30 to-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      <FloatingHearts />
      
      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-6 sm:py-8 md:py-16">
        <header className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-gradient mb-4 sm:mb-6 leading-tight">
            Happy Birthday
          </h1>
          <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-playfair text-romantic mb-3 sm:mb-4">
            My Beautiful Angel
          </div>
          <div className="w-20 sm:w-32 h-1 bg-gradient-romantic rounded-full mx-auto mb-6 sm:mb-8"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
            A special website created with love, just for you. 
            Because you deserve all the beauty in the world. ✨
          </p>
        </header>

        <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
          <section className="animate-fade-in-up">
            <Countdown onComplete={handleCountdownComplete} />
          </section>
          {showWishes && (
            <section className="animate-fade-in-up">
              <BirthdayWishes />
            </section>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-12 sm:mt-16 space-y-3 sm:space-y-4 px-4">
          <div className="flex justify-center items-center space-x-3 sm:space-x-4">
            <div className="w-8 sm:w-16 h-px bg-gradient-romantic"></div>
            <span className="text-xs sm:text-sm text-muted-foreground font-medium text-center">
              Made with 💖 for my one and only
            </span>
            <div className="w-8 sm:w-16 h-px bg-gradient-romantic"></div>
          </div>
          <p className="text-xs text-muted-foreground/70">
            October 16th • A day to remember forever
          </p>
        </footer>
      </main>

      {/* Romantic Glow Effects - optimized for mobile */}
      <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-32 sm:w-64 h-32 sm:h-64 bg-primary/10 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 sm:bottom-20 right-4 sm:right-10 w-40 sm:w-80 h-40 sm:h-80 bg-romantic/10 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-accent/5 rounded-full blur-2xl sm:blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div>
  );
});

Index.displayName = 'Index';

export default Index;