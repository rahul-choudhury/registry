import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SubmitButton({
  children,
  className,
  isPending,
}: {
  children: string;
  className?: string;
  isPending?: boolean;
}) {
  return (
    <Button type="submit" className={className}>
      <Loader
        className={cn(
          "absolute size-4 animate-spin",
          isPending === undefined && "group-enabled:opacity-0",
          isPending !== undefined && (isPending ? "opacity-100" : "opacity-0"),
        )}
      />
      <span
        className={cn(
          isPending === undefined && "group-disabled:opacity-0",
          isPending !== undefined && (isPending ? "opacity-0" : "opacity-100"),
        )}
      >
        {children}
      </span>
    </Button>
  );
}
