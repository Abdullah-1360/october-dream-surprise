import { useEffect, useState, memo, useCallback, useMemo } from 'react';

interface Heart {
  id: number;
  left: number;
  animationDuration: number;
  size: number;
}

const FloatingHearts = memo(() => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  // Safe mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduced hearts count for mobile
  const heartsCount = isMobile ? 4 : 8;
  const maxHearts = isMobile ? 4 : 8;
  const heartInterval = isMobile ? 4000 : 3000;

  const createHeart = useCallback((): Heart => ({
    id: Date.now() + Math.random(),
    left: Math.random() * 100,
    animationDuration: isMobile ? 4 + Math.random() * 2 : 3 + Math.random() * 2,
    size: isMobile ? 16 + Math.random() * 8 : 20 + Math.random() * 15,
  }), [isMobile]);

  const createInitialHearts = useCallback(() => 
    Array.from({ length: heartsCount }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDuration: isMobile ? 4 + Math.random() * 2 : 3 + Math.random() * 2,
      size: isMobile ? 16 + Math.random() * 8 : 20 + Math.random() * 15,
    })), [heartsCount, isMobile]
  );

  useEffect(() => {
    // Create initial hearts
    setHearts(createInitialHearts());

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts(prev => {
        const newHeart = createHeart();
        return [...prev.slice(-maxHearts + 1), newHeart];
      });
    }, heartInterval);

    return () => clearInterval(interval);
  }, [createInitialHearts, createHeart, maxHearts, heartInterval]);

  // Use CSS modules style for better performance
  const floatingKeyframes = useMemo(() => ({
    __html: `
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
        will-change: transform, opacity;
      }
      /* Reduce motion for users who prefer it */
      @media (prefers-reduced-motion: reduce) {
        .floating-heart {
          animation-duration: 6s !important;
          transform: translateY(-50vh) !important;
        }
      }
    `
  }), []);

  return (
    <>
      <style dangerouslySetInnerHTML={floatingKeyframes} />
      <div 
        className="fixed inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
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
});

FloatingHearts.displayName = 'FloatingHearts';

export default FloatingHearts;