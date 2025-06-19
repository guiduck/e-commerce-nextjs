"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

const FullScreenMenu = dynamic(() => import("@/components/FullScreenMenu"), {
  ssr: false,
});
const ThemeToggle = dynamic(() => import("@/components/ui/theme-toggle"), {
  ssr: false,
});

export function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    fetch("/api/auth/logout", { method: "POST" }).then(() => {
      router.push("/login");
    });
  };

  return (
    <header className="w-full border-b bg-white dark:bg-zinc-950">
      <div className="flex items-center justify-between px-6 py-4">
        {/* MOBILE */}
        <div className="block md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
          >
            ← Back
          </Button>
        </div>
        <h1 className="w-full text-center capitalize font-bold">
          {pathname.split("/")}
        </h1>
        <div className="block md:hidden ml-auto">
          <FullScreenMenu />
        </div>

        {/* DESKTOP*/}
        <nav className="hidden md:flex w-full gap-6 items-center text-sm font-medium">
          <Link
            href="/locations"
            className={cn(
              "transition hover:text-primary",
              pathname === "/locations"
                ? "text-primary font-semibold underline underline-offset-4"
                : "text-muted-foreground"
            )}
          >
            Locations
          </Link>
          <Link
            href="/products"
            className={cn(
              "transition hover:text-primary",
              pathname === "/products"
                ? "text-primary font-semibold underline underline-offset-4"
                : "text-muted-foreground"
            )}
          >
            Products
          </Link>

          <div className=" ml-auto">
            <ThemeToggle small />
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-foreground hover:text-destructive"
            >
              Logout
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
