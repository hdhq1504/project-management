import {
  type ComponentProps,
  type ReactNode,
  forwardRef,
  useMemo,
  useRef,
  useEffect,
  cloneElement,
  isValidElement
} from 'react';
import { Portal } from '@/components/atoms/portal';
import { useFocusTrap } from '@/hooks/use-focus-trap';
import { useModal, type UseModalProps } from '@/hooks/use-modal';
import { cn } from '@/libs/utils';
import { ModalContext, useModalContext, type ModalContextValue } from './modal-context';

type ModalBackdropProps = ComponentProps<'div'>;

const ModalBackdrop = forwardRef<HTMLDivElement, ModalBackdropProps>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    {...props}
    className={cn('fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4', className)}
  >
    {children}
  </div>
));
ModalBackdrop.displayName = 'ModalBackdrop';

type ModalDialogProps = ComponentProps<'dialog'>;

const ModalDialog = forwardRef<HTMLDialogElement, ModalDialogProps>(({ className, children, ...props }, ref) => (
  <dialog
    ref={ref}
    open
    tabIndex={-1}
    {...props}
    className={cn(
      'border-border bg-background text-foreground outline-none',
      'relative m-0 flex w-full flex-col rounded-xl border p-0 shadow-2xl',
      className
    )}
  >
    {children}
  </dialog>
));
ModalDialog.displayName = 'ModalDialog';

export type ModalRenderProps = {
  open: boolean;
  close: () => void;
};

export type ModalProps = UseModalProps & {
  maxWidth?: string;
  children?: ReactNode | ((props: ModalRenderProps) => ReactNode);
  'aria-labelledby'?: string;
};

function Modal({
  open,
  defaultOpen = false,
  onOpenChange,
  onClose,
  maxWidth = 'max-w-[750px]',
  children,
  'aria-labelledby': labelledBy
}: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { isOpen, close, toggle } = useModal({ open, defaultOpen, onOpenChange, onClose });

  useFocusTrap(dialogRef, isOpen);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
      }
    };

    dialog.addEventListener('keydown', handleKeyDown);
    return () => dialog.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close]);

  useEffect(() => {
    const backdrop = backdropRef.current;
    if (!backdrop || !isOpen) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (e.target === backdrop) {
        close();
      }
    };

    backdrop.addEventListener('mousedown', handleMouseDown);
    return () => backdrop.removeEventListener('mousedown', handleMouseDown);
  }, [isOpen, close]);

  const contextValue = useMemo<ModalContextValue>(
    () => ({
      open: isOpen,
      close,
      toggle
    }),
    [isOpen, close, toggle]
  );

  const renderedContent = typeof children === 'function' ? children({ open: isOpen, close }) : children;

  return (
    <ModalContext.Provider value={contextValue}>
      {isOpen && (
        <Portal>
          <ModalBackdrop ref={backdropRef}>
            <ModalDialog ref={dialogRef} aria-labelledby={labelledBy} className={cn('w-full', maxWidth)}>
              {renderedContent}
            </ModalDialog>
          </ModalBackdrop>
        </Portal>
      )}
    </ModalContext.Provider>
  );
}

type ModalCloseProps = {
  children: ReactNode;
  asChild?: boolean;
};

function ModalClose({ children, asChild = false }: ModalCloseProps) {
  const { close } = useModalContext();

  if (asChild && isValidElement<{ onClick?: (e: React.MouseEvent) => void }>(children)) {
    return cloneElement(children, {
      onClick: (e: React.MouseEvent) => {
        children.props.onClick?.(e);
        close();
      }
    });
  }

  return (
    <button type="button" onClick={close}>
      {children}
    </button>
  );
}

type ModalHeaderProps = ComponentProps<'header'>;

function ModalHeader({ className, children, ...props }: ModalHeaderProps) {
  return (
    <header
      {...props}
      className={cn('border-border/30 flex h-11 items-center justify-between border-b px-3', className)}
    >
      {children}
    </header>
  );
}

type ModalContentProps = ComponentProps<'main'>;

function ModalContent({ className, children, ...props }: ModalContentProps) {
  return (
    <main {...props} className={cn('flex flex-1 flex-col gap-3 p-4', className)}>
      {children}
    </main>
  );
}

type ModalFooterProps = ComponentProps<'footer'>;

function ModalFooter({ className, children, ...props }: ModalFooterProps) {
  return (
    <footer
      {...props}
      className={cn('border-border/40 flex h-[52px] items-center justify-end gap-2 border-t px-4', className)}
    >
      {children}
    </footer>
  );
}

export { Modal, ModalHeader, ModalContent, ModalFooter, ModalBackdrop, ModalDialog, ModalClose };
