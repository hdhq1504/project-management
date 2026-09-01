import { createContext, useContext } from 'react';

export type ModalContextValue = {
  open: boolean;
  close: () => void;
  toggle: () => void;
};

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a Modal component');
  }
  return context;
}
