import { cn } from "@/lib/utils/cn";
import Link from "next/link";
import { ComponentProps } from "react";

export function ViewModeButton({
  children,
  className,
  href,
  ...props
}: ComponentProps<typeof Link>) {
  {
    return (
        <Link href={href}
          className={cn(
            "fixed bottom-[28] right-[28] z-30 px-[18px] py-[10px] bg-[rgba(255,255,255,0.08)] border-[1px] border-[rgba(255,255,255,0.18)] rounded-[8px] text-[#fff] text-[13px] font-[500] cursor-pointer backdrop-blur-[8px] letter-spacing-[0.2px]",
            "hover:bg-[rgba(255,255,255,0.12)] hover:border-[rgba(255,255,255,0.28)]",
            className,
          )}
          {...props}
        >
          {children}
        </Link>
    );
  }
}
