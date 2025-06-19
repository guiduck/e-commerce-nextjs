"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useMemo } from "react";

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

  const title = useMemo(() => pathname.split("/")[1], [pathname]);

  return (
    <header className="w-full border-b bg-white dark:bg-zinc-950">
      <div className="flex items-center justify-between px-6 py-4 relative">
        {/* MOBILE */}
        <div className="block md:hidden absolute left-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => window.history.back()}
          >
            ← Back
          </Button>
        </div>
        <h1 className="w-full text-center capitalize font-bold md:hidden">
          {title}
        </h1>
        <div className="block md:hidden ml-auto absolute right-0">
          <FullScreenMenu />
        </div>

        {/* DESKTOP*/}
        <nav className="hidden md:flex w-full gap-6 items-center text-sm font-medium md:justify-center relative">
          <Link
            href="/warehouses"
            className={cn(
              "transition hover:text-primary",
              pathname === "/warehouses"
                ? "text-primary font-semibold underline underline-offset-4"
                : "text-muted-foreground"
            )}
          >
            Warehouses
          </Link>
          <Link
            href="/produtos"
            className={cn(
              "transition hover:text-primary",
              pathname === "/produtos"
                ? "text-primary font-semibold underline underline-offset-4"
                : "text-muted-foreground"
            )}
          >
            Produtos
          </Link>

          <div className="ml-auto md:absolute md:right-0">
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
