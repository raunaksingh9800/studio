"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const routes = [
  { href: "/", label: "Upload" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icon.svg" alt="PrintConnect Logo" width={24} height={24} />
          <span className="font-headline text-xl font-bold">PrintConnect</span>
        </Link>
        <nav className="flex items-center gap-4">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant="ghost"
              asChild
              className={cn(
                "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                pathname === route.href && "text-foreground"
              )}
            >
              <Link href={route.href}>{route.label}</Link>
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
}
