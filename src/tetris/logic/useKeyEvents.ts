import { useEffect } from 'react';

interface KeyFunctions {
  [keyName: string]: () => void;
}

const useKeyEvents = (keyFunctions: KeyFunctions) => {
  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      const keyPressed = event.key.toLocaleUpperCase();
      Object.entries(keyFunctions).forEach(([keyName, onKeyPress]) => {
        const upperKeyName = keyName.toLocaleUpperCase();
        const resolvedKeyMatch = upperKeyName === 'SPACE' ? ' ' : upperKeyName;
        if (resolvedKeyMatch === keyPressed) onKeyPress();
      });
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  }, [keyFunctions]);
};

export default useKeyEvents;
