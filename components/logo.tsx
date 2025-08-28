import { cn } from "@/lib/utils";
import Image from "next/image";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Image
      src="/tekimax-logo.png"
      alt="Tekimax Logo"
      width={24}
      height={24}
      className={cn("bg-transparent", className)}
    />
  );
}
