import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SubmitButton({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <Button type="submit" className={className}>
      <Loader className="absolute size-4 animate-spin group-enabled:opacity-0" />
      <span className="group-disabled:opacity-0">{children}</span>
    </Button>
  );
}
