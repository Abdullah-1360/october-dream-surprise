import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

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

  const nextWish = () => {
    setCurrentWish((prev) => (prev + 1) % wishes.length);
  };

  const prevWish = () => {
    setCurrentWish((prev) => (prev - 1 + wishes.length) % wishes.length);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl md:text-6xl font-playfair font-bold text-gradient">
          Birthday Wishes
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          From my heart to yours
        </p>
      </div>

      <Card className="card-romantic max-w-3xl mx-auto relative overflow-hidden">
        <div className="absolute top-4 right-4 text-4xl opacity-20">
          {wishes[currentWish].emoji}
        </div>
        
        <div className="space-y-6">
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
              className="btn-soft"
            >
              Previous
            </Button>
            
            <div className="flex space-x-2">
              {wishes.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentWish 
                      ? 'bg-primary scale-125' 
                      : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <Button 
              onClick={nextWish}
              variant="outline" 
              size="sm" 
              className="btn-soft"
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      <div className="text-center">
        <div className="inline-flex items-center space-x-3 text-lg">
          <span className="text-2xl">💝</span>
          <span className="text-romantic font-medium">
            With all my love, forever and always
          </span>
          <span className="text-2xl">💝</span>
        </div>
      </div>
    </div>
  );
};

export default BirthdayWishes;