"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("@/components/ui/theme-toggle"), {
  ssr: false,
});

export function FullScreenMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const close = () => setOpen(false);

  const navItems = [
    { label: "Warehouses", href: "/warehouses" },
    { label: "Produtos", href: "/produtos" },
  ];

  const logout = () => fetch("/api/auth/logout", { method: "POST" });

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="ghost"
        size="sm"
        aria-label="Menu"
        className="rounded-full text-right justify-end text-xl font-bold px-3 py-2 md:hidden"
      >
        ≡
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTitle />
        <SheetContent
          side="left"
          className={cn(
            "w-full h-full flex flex-col justify-between",
            "bg-background text-foreground px-8 py-10"
          )}
        >
          <div>
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-bold">Menu</h2>
              <ThemeToggle small />
            </div>

            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={cn(
                    "text-lg font-medium hover:underline",
                    pathname === item.href &&
                      "underline underline-offset-4 text-primary"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <Button
            variant="ghost"
            onClick={logout}
            className="w-full justify-start hover:bg-muted"
          >
            Logout
          </Button>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default FullScreenMenu;
