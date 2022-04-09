import { useEffect } from 'react';

interface SwipeFunctions {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

interface SwipeOptions {
  minDistance?: number;
}

const useSwipeEvents = (
  {
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    minDistance = 0,
  }: SwipeFunctions & SwipeOptions,
  dependencies?: any[]
) => {
  const myDependencies = dependencies ?? [
    onSwipeUp,
    onSwipeDown,
    onSwipeLeft,
    onSwipeRight,
    minDistance,
  ];

  useEffect(() => {
    let startX: number | null = null;
    let startY: number | null = null;
    const handleTouchStart = (event: TouchEvent) => {
      const touchStart = event.touches[0];
      startX = touchStart.clientX;
      startY = touchStart.clientY;
    };
    const handleTouchEnd = (event: TouchEvent) => {
      const touchEnd = event.changedTouches[0];

      if (!startX || !startY) return;

      const xDiff = startX - touchEnd.clientX;
      const yDiff = startY - touchEnd.clientY;

      const distanceMoved = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));

      if (distanceMoved < minDistance) return;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          onSwipeRight && onSwipeRight();
        } else {
          onSwipeLeft && onSwipeLeft();
        }
      } else {
        if (yDiff > 0) {
          onSwipeUp && onSwipeUp();
        } else {
          onSwipeDown && onSwipeDown();
        }
      }

      startX = null;
      startY = null;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...myDependencies]);
};

export default useSwipeEvents;
