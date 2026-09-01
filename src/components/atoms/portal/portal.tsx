import { type ReactNode } from 'react';
import { createPortal } from 'react-dom';

type PortalProps = {
  children: ReactNode;
};

function Portal({ children }: PortalProps) {
  return createPortal(children, document.body);
}

export { Portal };
