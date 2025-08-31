import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: 3 + Math.random() * 2,
      size: 20 + Math.random() * 15,
    }));
    setHearts(initialHearts);

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts(prev => {
        const newHeart = {
          id: Date.now(),
          left: Math.random() * 100,
          animationDuration: 3 + Math.random() * 2,
          size: 20 + Math.random() * 15,
        };
        return [...prev.slice(-7), newHeart]; // Keep only last 8 hearts
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .floating-heart {
          animation: floatUp linear infinite;
        }
      `}</style>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {hearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-romantic/30 floating-heart select-none"
            style={{
              left: `${heart.left}%`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.animationDuration}s`,
              top: '100%',
            }}
          >
            💖
          </div>
        ))}
      </div>
    </>
  );
};

export default FloatingHearts;