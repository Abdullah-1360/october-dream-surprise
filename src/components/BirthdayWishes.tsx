import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
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

const BirthdayWishes = () => {
  const [currentWish, setCurrentWish] = useState(0);

  // Example images - replace these with your actual imported images
  const collageImages = [
    // Add your images here like this:
    // { src: memory1, alt: "Beautiful memory 1" },
    // { src: memory2, alt: "Special moment" },
    // For now, we'll show placeholders
  ];

  const nextWish = () => {
    setCurrentWish((prev) => (prev + 1) % wishes.length);
  };

  const prevWish = () => {
    setCurrentWish((prev) => (prev - 1 + wishes.length) % wishes.length);
  };

  return (
    <div className="space-y-12 animate-fade-in-up">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-gradient">
          Happy Birthday, Beautiful! 
        </h2>
        <div className="text-2xl md:text-3xl text-romantic mb-4">
          🎉 October 16th - Your Special Day 🎉
        </div>
        <div className="w-32 h-1 bg-gradient-romantic rounded-full mx-auto"></div>
      </div>

      {/* Image Collage Section */}
      <ImageCollage images={collageImages} />

      <div className="text-center space-y-4">
        <h3 className="text-3xl md:text-4xl font-playfair font-bold text-gradient">
          Birthday Wishes
        </h3>
        <p className="text-lg md:text-xl text-muted-foreground">
          From my heart to yours
        </p>
      </div>

      <Card className="card-romantic max-w-4xl mx-auto relative overflow-hidden group">
        {/* Magical background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-romantic/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Floating sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, sparkleIndex) => (
            <div
              key={sparkleIndex}
              className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 text-romantic animate-pulse text-xl"
              style={{
                left: `${10 + sparkleIndex * 12}%`,
                top: `${15 + sparkleIndex * 10}%`,
                animationDelay: `${sparkleIndex * 0.3}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>

        <div className="absolute top-4 right-4 text-5xl opacity-20 group-hover:opacity-40 transition-opacity duration-300 animate-bounce">
          {wishes[currentWish].emoji}
        </div>
        
        <div className="space-y-6 relative z-10">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-romantic mb-4">
              {wishes[currentWish].title}
            </h3>
            <div className="w-20 h-1 bg-gradient-romantic rounded-full mx-auto"></div>
          </div>

          <p className="text-base md:text-lg leading-relaxed text-foreground/90 text-center px-4">
            {wishes[currentWish].message}
          </p>

          <div className="flex justify-center items-center space-x-4 pt-4">
            <Button 
              onClick={prevWish}
              variant="outline" 
              size="sm"
              className="btn-soft hover:scale-105 transition-transform duration-200"
            >
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {wishes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentWish 
                      ? 'bg-primary scale-125 animate-pulse' 
                      : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <Button 
              onClick={nextWish}
              variant="outline" 
              size="sm" 
              className="btn-soft hover:scale-105 transition-transform duration-200"
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <Card className="card-romantic inline-block p-8 relative group overflow-hidden">
          {/* Romantic glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-romantic/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="text-4xl mb-4 animate-pulse group-hover:scale-110 transition-transform duration-300">💕</div>
            <p className="text-xl font-playfair text-gradient mb-4">
              "Every moment with you is a gift"
            </p>
            <p className="text-muted-foreground">
              With all my love, forever and always ✨
            </p>
          </div>
          
          {/* Heart particles */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 10 }).map((_, heartIndex) => (
              <div
                key={heartIndex}
                className="absolute opacity-0 group-hover:opacity-100 transition-all duration-1000 text-romantic/60 animate-float text-lg"
                style={{
                  left: `${10 + heartIndex * 8}%`,
                  top: `${10 + (heartIndex % 4) * 20}%`,
                  animationDelay: `${heartIndex * 0.2}s`,
                  animationDuration: `${2.5 + Math.random() * 1.5}s`
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
};

export default BirthdayWishes;