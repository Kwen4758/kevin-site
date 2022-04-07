import { useEffect } from 'react';

interface SwipeFunctions {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
}

const useSwipeEvents = ({
  onSwipeUp,
  onSwipeDown,
  onSwipeLeft,
  onSwipeRight,
}: SwipeFunctions) => {
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
  }, [onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight]);
};

export default useSwipeEvents;
