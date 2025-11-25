import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Dialog = (props: React.ComponentProps<typeof DialogPrimitive.Root>) => {
  const { open, ...restProps } = props;

  React.useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const bodyWidth = document.body.offsetWidth;
    
    document.body.style.setProperty('overflow', 'hidden', 'important');
    document.body.style.setProperty('position', 'fixed', 'important');
    document.body.style.setProperty('top', `-${scrollY}px`, 'important');
    document.body.style.setProperty('width', `${bodyWidth}px`, 'important');
    document.body.style.setProperty('left', '0', 'important');
    document.body.style.setProperty('right', '0', 'important');
    document.body.dataset.scrollY = String(scrollY);
    
    document.documentElement.style.setProperty('overflow', 'hidden', 'important');

    return () => {
      const savedScrollY = parseInt(document.body.dataset.scrollY || '0');
      
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');
      document.body.style.removeProperty('left');
      document.body.style.removeProperty('right');
      delete document.body.dataset.scrollY;
      
      document.documentElement.style.removeProperty('overflow');
      
      window.scrollTo(0, savedScrollY);
    };
  }, [open]);

  return <DialogPrimitive.Root open={open} {...restProps} />;
}

const DialogTrigger = DialogPrimitive.Trigger

const DialogPortal = DialogPrimitive.Portal

const DialogClose = DialogPrimitive.Close

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-gradient-to-br from-purple-900/40 via-blue-900/40 to-indigo-900/40 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay 
      onClick={(e) => {
        e.stopPropagation();
      }}
    />
    <DialogPrimitive.Content
      ref={ref}
      aria-describedby={props["aria-describedby"] || undefined}
      onPointerDownOutside={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          e.preventDefault();
        }
      }}
      onInteractOutside={(e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          e.preventDefault();
        }
      }}
      className={cn(
        "fixed left-[50%] top-[50%] z-[9999] grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state-closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      style={{ position: 'fixed', contain: 'layout style paint' }}
      {...props}
    >
      {children}
      <DialogPrimitive.Close 
        className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-sm opacity-70 ring-offset-background transition-all duration-200 hover:opacity-100 active:scale-95 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-[99999] touch-manipulation cursor-pointer"
        style={{ position: 'absolute', pointerEvents: 'auto' }}
      >
        <X className="h-5 w-5 sm:h-4 sm:w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}