import { cn } from "app/utils/radix";

interface Props {
  className: string;
}

function Skeleton({ className, ...props }: Props) {
  return <div className={cn("animate-pulse rounded-md bg-slate-100 dark:bg-slate-800", className)} {...props} />;
}

export { Skeleton };
