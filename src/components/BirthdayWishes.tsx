import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useCallback, memo, useMemo, useEffect } from 'react';
import ImageCollage from './ImageCollage';

const wishes = [
  {
    title: "My Dearest Love",
    message: "Happy Birthday to the most amazing person in my life! Every moment with you is a treasure, and I'm so grateful to celebrate another year of your beautiful existence. You bring so much joy, laughter, and love into my world. 💕",
    emoji: "🌹"
  },
  {
    title: "You Are My Everything", 
    message: "On your special day, I want you to know how much you mean to me. Your smile brightens my darkest days, your laugh is my favorite melody, and your love is my greatest blessing. Here's to many more birthdays together! 🎂",
    emoji: "✨"
  },
  {
    title: "A Year More Beautiful",
    message: "Another year around the sun for the most incredible woman I know! You've grown more beautiful, wise, and amazing with each passing day. I love watching you shine and can't wait to see all the wonderful things this new year brings you. 🌟",
    emoji: "🦋"
  },
  {
    title: "My Heart's Song",
    message: "Happy Birthday, my love! You are the poetry in my life, the song in my heart, and the dream I never want to wake up from. Thank you for being you - perfect, wonderful, irreplaceable you. 💖",
    emoji: "🎵"
  }
];

const BirthdayWishes = memo(() => {
  const [currentWish, setCurrentWish] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Safe mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Example images - replace these with your actual imported images
  const collageImages = [
    // Add your images here like this:
    // { src: memory1, alt: "Beautiful memory 1" },
    // { src: memory2, alt: "Special moment" },
    // For now, we'll show placeholders
  ];

  const nextWish = useCallback(() => {
    setCurrentWish((prev) => (prev + 1) % wishes.length);
  }, []);

  const prevWish = useCallback(() => {
    setCurrentWish((prev) => (prev - 1 + wishes.length) % wishes.length);
  }, []);

  // Memoized sparkles for performance
  const sparkles = useMemo(() => 
    Array.from({ length: isMobile ? 6 : 8 }).map((_, i) => ({
      id: i,
      left: 10 + i * 12,
      top: 15 + i * 10,
      delay: i * 0.3
    })), [isMobile]
  );

  // Memoized heart particles
  const heartParticles = useMemo(() =>
    Array.from({ length: isMobile ? 6 : 10 }).map((_, i) => ({
      id: i,
      left: 10 + i * 8,
      top: 10 + (i % 4) * 20,
      delay: i * 0.2,
      duration: 2.5 + Math.random() * 1.5
    })), [isMobile]
  );

  return (
    <div className="space-y-8 sm:space-y-12 animate-fade-in-up px-4">
      <div className="text-center space-y-3 sm:space-y-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-gradient leading-tight">
          Happy Birthday, Beautiful! 
        </h2>
        <div className="text-xl sm:text-2xl md:text-3xl text-romantic mb-3 sm:mb-4">
          🎉 October 16th - Your Special Day 🎉
        </div>
        <div className="w-20 sm:w-32 h-1 bg-gradient-romantic rounded-full mx-auto"></div>
      </div>

      {/* Image Collage Section */}
      <ImageCollage images={collageImages} />

      <div className="text-center space-y-3 sm:space-y-4">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gradient">
          Birthday Wishes
        </h3>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
          From my heart to yours
        </p>
      </div>

      <Card className="card-romantic max-w-4xl mx-auto relative overflow-hidden group">
        {/* Magical background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-romantic/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating sparkles - reduced for mobile */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 text-romantic animate-pulse text-lg md:text-xl"
              style={{
                left: `${sparkle.left}%`,
                top: `${sparkle.top}%`,
                animationDelay: `${sparkle.delay}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>

        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-3xl sm:text-4xl md:text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-bounce">
          {wishes[currentWish].emoji}
        </div>
        
        <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 relative z-10">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair font-semibold text-romantic mb-3 sm:mb-4 leading-tight">
              {wishes[currentWish].title}
            </h3>
            <div className="w-16 sm:w-20 h-1 bg-gradient-romantic rounded-full mx-auto"></div>
          </div>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-foreground/90 text-center max-w-3xl mx-auto">
            {wishes[currentWish].message}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pt-2 sm:pt-4">
            <div className="flex items-center space-x-4">
              <Button 
                onClick={prevWish}
                variant="outline" 
                size="sm"
                className="btn-soft hover:scale-105 transition-transform duration-200 text-xs sm:text-sm px-3 sm:px-4"
              >
                Previous
              </Button>
              
              <Button 
                onClick={nextWish}
                variant="outline" 
                size="sm" 
                className="btn-soft hover:scale-105 transition-transform duration-200 text-xs sm:text-sm px-3 sm:px-4"
              >
                Next
              </Button>
            </div>
            
            <div className="flex space-x-2">
              {wishes.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentWish(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 touch-manipulation ${
                    index === currentWish 
                      ? 'bg-primary scale-125 animate-pulse' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                  aria-label={`Go to wish ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <Card className="card-romantic inline-block p-6 sm:p-8 relative group overflow-hidden max-w-md mx-auto">
          {/* Romantic glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-romantic/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 animate-pulse group-hover:scale-110 transition-transform duration-300">💕</div>
            <p className="text-lg sm:text-xl font-playfair text-gradient mb-3 sm:mb-4 leading-tight">
              "Every moment with you is a gift"
            </p>
            <p className="text-sm sm:text-base text-muted-foreground">
              With all my love, forever and always ✨
            </p>
          </div>
          
          {/* Heart particles - reduced for mobile */}
          <div className="absolute inset-0 pointer-events-none">
            {heartParticles.map((particle) => (
              <div
                key={particle.id}
                className="absolute opacity-0 group-hover:opacity-100 transition-all duration-1000 text-romantic/60 animate-float text-sm sm:text-base md:text-lg"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`
                }}
              >
                💖
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
});

BirthdayWishes.displayName = 'BirthdayWishes';

export default BirthdayWishes;