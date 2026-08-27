import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
  type SetStateAction
} from 'react';

type PopoverContextValue = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopover() {
  const context = useContext(PopoverContext);

  if (!context) {
    throw new Error('Popover components must be used within Popover');
  }

  return context;
}

type PopoverProps = {
  children: ReactNode;
};

function Popover({ children }: PopoverProps) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open]);

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-flex" ref={popoverRef}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
}

type PopoverTriggerProps = {
  children: ReactElement<{
    onClick?: MouseEventHandler;
    'aria-expanded'?: boolean;
  }>;
};

function PopoverTrigger({ children }: PopoverTriggerProps) {
  const { open, setOpen } = usePopover();

  if (!isValidElement(children)) return null;

  return cloneElement(children, {
    'aria-expanded': open,
    onClick: (e) => {
      children.props.onClick?.(e);
      setOpen((prev) => !prev);
    }
  });
}

type PopoverContentProps = {
  children: ReactNode;
};

function PopoverContent({ children }: PopoverContentProps) {
  const { open } = usePopover();
  if (!open) return null;

  return (
    <div className="border-border bg-background absolute top-full left-0 z-50 mt-2 rounded-lg border shadow-lg">
      {children}
    </div>
  );
}

export { Popover, PopoverTrigger, PopoverContent };
