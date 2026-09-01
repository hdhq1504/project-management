import { useCallback, useMemo, useState } from 'react';
import { useKeyboard } from '@/hooks/use-keyboard';
import { useScrollLock } from '@/hooks/use-scroll-lock';

export type UseModalProps = {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onClose?: () => void;
};

export function useModal({ open: controlledOpen, defaultOpen = false, onOpenChange, onClose }: UseModalProps = {}) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : uncontrolledOpen;

  const close = useCallback(() => {
    if (!isControlled) {
      setUncontrolledOpen(false);
    }
    onOpenChange?.(false);
    onClose?.();
  }, [isControlled, onClose, onOpenChange]);

  const toggle = useCallback(() => {
    const next = !isOpen;
    if (!isControlled) {
      setUncontrolledOpen(next);
    }
    onOpenChange?.(next);
    if (!next) onClose?.();
  }, [isControlled, isOpen, onClose, onOpenChange]);

  useScrollLock(isOpen);

  const escShortcut = useMemo(() => [{ key: 'Escape', handler: close }], [close]);
  useKeyboard(escShortcut, isOpen);

  return {
    isOpen,
    close,
    toggle
  };
}
