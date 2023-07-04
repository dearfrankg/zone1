import { ReactNode } from "react";

interface TitleProps {
  children: ReactNode;
}

export default function Title({ children }: TitleProps) {
  return <h1 className="text-2xl font-medium pb-4">{children}</h1>;
}
