import { cn } from "@/lib/utils/cn";
import { ComponentProps } from "react";

export function AppBackground({
  children,
  className,
  ...props
}: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-black bg-[url('/background_mobile.png')] md:bg-[url('/background.jpg')] bg-center bg-cover bg-no-repeat",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
