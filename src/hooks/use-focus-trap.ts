import { type RefObject, useEffect, useRef } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
    (el) => el.offsetParent !== null || el.offsetWidth > 0 || el.offsetHeight > 0
  );
}

export function useFocusTrap<T extends HTMLElement>(containerRef: RefObject<T | null>, enabled = true) {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;

    const container = containerRef.current;
    if (!container) return;

    const autoFocusEl = container.querySelector<HTMLElement>('[autofocus], [data-autofocus]');
    const focusableElements = getFocusableElements(container);
    const firstElement = autoFocusEl ?? focusableElements[0];

    const frameId = requestAnimationFrame(() => {
      if (firstElement) {
        firstElement.focus();
      } else {
        container.focus();
      }
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const currentFocusables = getFocusableElements(container);
      if (currentFocusables.length === 0) {
        e.preventDefault();
        return;
      }

      const firstFocusable = currentFocusables[0];
      const lastFocusable = currentFocusables[currentFocusables.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable || !container.contains(document.activeElement)) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable || !container.contains(document.activeElement)) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('keydown', handleKeyDown);

      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    };
  }, [containerRef, enabled]);
}
