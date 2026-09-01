import { type RefObject, useEffect } from 'react';

export function useClickOutside<T extends HTMLElement>(ref: RefObject<T | null>, handler: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    window.addEventListener('mousedown', onMouseDown);
    return () => window.removeEventListener('mousedown', onMouseDown);
  }, [ref, handler, enabled]);
}
