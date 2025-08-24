import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface CollageImage {
  src: string;
  alt: string;
  className?: string;
}

interface ImageCollageProps {
  images: CollageImage[];
}

const ImageCollage = ({ images }: ImageCollageProps) => {
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setVisibleImages(prev => {
        const newVisible = [...prev];
        if (!newVisible.includes(currentIndex)) {
          newVisible.push(currentIndex);
        }
        return newVisible;
      });
      
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, 800);

    return () => clearInterval(interval);
  }, [images.length, currentIndex]);

  if (images.length === 0) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {/* Placeholder cards for when no images are added yet */}
        {Array.from({ length: 6 }).map((_, index) => (
          <Card 
            key={index}
            className="aspect-square bg-gradient-to-br from-romantic/20 to-primary/20 border-romantic/30 rounded-2xl flex items-center justify-center"
          >
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-romantic/30 flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Add your special photos here
              </p>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gradient mb-4">
          Our Beautiful Memories
        </h2>
        <div className="w-24 h-1 bg-gradient-romantic rounded-full mx-auto"></div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <Card
            key={index}
            className={`
              aspect-square overflow-hidden rounded-2xl border-romantic/30 
              transform transition-all duration-1000 hover:scale-105 hover:z-10
              ${visibleImages.includes(index) 
                ? 'opacity-100 translate-y-0 scale-100' 
                : 'opacity-0 translate-y-8 scale-95'
              }
              ${index % 3 === 0 ? 'md:rotate-1' : index % 3 === 1 ? 'md:-rotate-1' : ''}
            `}
            style={{
              animationDelay: `${index * 200}ms`
            }}
          >
            <div className="relative group h-full">
              <img
                src={image.src}
                alt={image.alt}
                className={`
                  w-full h-full object-cover transition-all duration-500
                  group-hover:scale-110 filter group-hover:brightness-110
                  ${image.className || ''}
                `}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-romantic/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute inset-0 border-2 border-romantic/0 group-hover:border-romantic/50 rounded-2xl transition-all duration-300" />
              
              {/* Floating hearts on hover */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 3 }).map((_, heartIndex) => (
                  <div
                    key={heartIndex}
                    className="absolute opacity-0 group-hover:opacity-100 transition-all duration-500 text-romantic animate-bounce"
                    style={{
                      left: `${20 + heartIndex * 30}%`,
                      top: `${20 + heartIndex * 20}%`,
                      animationDelay: `${heartIndex * 0.2}s`
                    }}
                  >
                    💕
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add more photos prompt */}
      <div className="text-center mt-8">
        <p className="text-muted-foreground/70 text-sm">
          Add more photos to src/assets/ to create an even more beautiful collage ✨
        </p>
      </div>
    </div>
  );
};

export default ImageCollage;