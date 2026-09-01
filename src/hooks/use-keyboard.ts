import { useEffect } from 'react';

type KeyboardShortcut = {
  key: string;
  handler: (e: KeyboardEvent) => void;
};

export function useKeyboard(shortcuts: KeyboardShortcut[], enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const onKeyDown = (e: KeyboardEvent) => {
      for (const { key, handler } of shortcuts) {
        if (e.key === key) handler(e);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [shortcuts, enabled]);
}
