import Link from "next/link";
import Logo from "@/components/logo";

export default function Navigation() {
  return (
    <nav className="border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Logo className="h-6 w-6" />
          </Link>
          <div className="hidden md:flex gap-6">
            <Link href="/features" className="text-sm font-medium">
              Features
            </Link>
            <Link href="/pricing" className="text-sm font-medium">
              Pricing
            </Link>
            <Link href="/docs" className="text-sm font-medium">
              Documentation
            </Link>
          </div>
        </div>
        {/* <div className="flex items-center gap-4">
          <UserMenu />
        </div> */}
      </div>
    </nav>
  );
}
