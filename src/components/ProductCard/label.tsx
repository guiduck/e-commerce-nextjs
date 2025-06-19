import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface LabelProps extends React.ComponentProps<"span"> {
  children: ReactNode;
}

export const Label = ({ className, children, ...props }: LabelProps) => {
  return (
    <span
      className={cn(
        "flex items-center h-fit px-2 py-1 rounded-lg bg-foreground text-background w-fit",
        className
      )}
      {...props}
    >
      <p className="font-bold text-[10px]">{children}</p>
    </span>
  );
};
