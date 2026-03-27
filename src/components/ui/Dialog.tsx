"use client";

import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils/cn";

const DialogContext = createContext<{ open: boolean }>({ open: false });

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
  preventOverlayClose?: boolean;
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const handleOpenChange = (value: boolean) => {
    if (!isControlled) {
      setInternalOpen(value);
    }
    onOpenChange?.(value);
  };

  return (
    <DialogContext.Provider value={{ open: isOpen }}>
      <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
        {children}
      </DialogPrimitive.Root>
    </DialogContext.Provider>
  );
};

export const DialogTrigger = DialogPrimitive.Trigger;

export const DialogContent = ({
  children,
  className,
  preventOverlayClose,
}: DialogContentProps) => {
  const { open } = useContext(DialogContext);

  return (
    <AnimatePresence>
      {open && (
        <DialogPrimitive.Portal forceMount>
          <DialogPrimitive.Overlay asChild forceMount>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/10 backdrop-blur-xs"
            />
          </DialogPrimitive.Overlay>

          <DialogPrimitive.Content
            asChild
            forceMount
            onInteractOutside={
              preventOverlayClose ? (e) => e.preventDefault() : undefined
            }
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 outline-none",
                "w-[calc(100vw-2rem)] sm:w-full lg:max-w-6xl",
                className,
              )}
            >
              {children}
            </motion.div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      )}
    </AnimatePresence>
  );
};

export const DialogTitle = ({ children, className }: DialogTitleProps) => {
  return (
    <DialogPrimitive.Title
      className={cn("text-lg font-semibold text-white", className)}
    >
      {children}
    </DialogPrimitive.Title>
  );
};

export const DialogDescription = ({
  children,
  className,
}: DialogDescriptionProps) => {
  return (
    <DialogPrimitive.Description
      className={cn("mt-2 text-sm text-neutral-400", className)}
    >
      {children}
    </DialogPrimitive.Description>
  );
};

export const DialogClose = DialogPrimitive.Close;
