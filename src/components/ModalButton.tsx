import React, { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const ModalButton: React.FC<ModalButtonProps> = ({
  variant = "primary",
  children,
  className,
  ...props
}) => {
  const outerClip =
    "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)";
  const innerClip =
    "polygon(calc(12px + 1px) 1px, calc(100% - 1px) 1px, calc(100% - 1px) calc(100% - 12px - 1px), calc(100% - 12px - 1px) calc(100% - 1px), 1px calc(100% - 1px), 1px calc(12px + 1px))";

  // Base classes to ensure they grow equally in a flex container
  const baseClasses =
    "flex-1 transition-transform active:scale-[0.98] outline-none cursor-pointer";

  if (variant === "secondary") {
    return (
      <button
        className={cn(baseClasses, "group relative", className)}
        {...props}
      >
        {/* Outer border - now has w-full and h-full */}
        <div
          className="bg-zinc-700 group-hover:bg-zinc-500 transition-colors w-full h-full"
          style={{ clipPath: outerClip }}
        >
          {/* Inner background - now has w-full and h-full */}
          <span
            className="flex items-center justify-center w-full h-full px-8 py-3 bg-black text-zinc-400 group-hover:text-zinc-100 transition-colors"
            style={{ clipPath: innerClip }}
          >
            {children}
          </span>
        </div>
      </button>
    );
  }

  return (
    <button
      className={cn(
        baseClasses,
        "px-8 py-3 text-white font-medium hover:brightness-110",
        className,
      )}
      style={{
        background:
          "linear-gradient(90deg, #32e6ff 0%, #928dab 50%, #b392f0 100%)",
        clipPath: outerClip,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default ModalButton;
