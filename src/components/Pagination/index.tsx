"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useProductsStore } from "@/stores/useProductsStore";
import { cn } from "@/lib/utils";
import { useEffect, useMemo } from "react";

export function Pagination() {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");
  const { totalPages, setCurrentPage } = useProductsStore();

  const router = useRouter();

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
    setCurrentPage(page);
  };

  const pages = useMemo(() => {
    const visible: (number | string)[] = [];

    visible.push(1);

    if (currentPage > 3) {
      visible.push("...");
    }

    if (currentPage - 1 > 1) {
      visible.push(currentPage - 1);
    }

    if (currentPage !== 1) {
      visible.push(currentPage);
    }

    if (currentPage < totalPages) {
      visible.push(currentPage + 1);
    }

    return visible;
  }, [currentPage, totalPages]);

  useEffect(() => {
    setCurrentPage(currentPage);
  }, []);

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className={cn(
          "px-2 py-1 rounded hover:bg-muted",
          currentPage === 1 && "opacity-50 cursor-not-allowed"
        )}
      >
        ←
      </button>

      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <button
            key={`page-${p}`}
            onClick={() => goToPage(p)}
            className={cn(
              "px-3 py-1 rounded-full text-sm",
              currentPage === p
                ? "bg-primary text-white"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            {p}
          </button>
        ) : (
          <span
            key={`ellipsis-${idx * 1}`}
            className="px-2 text-sm text-muted-foreground"
          >
            ...
          </span>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className={cn(
          "px-2 py-1 rounded hover:bg-muted",
          currentPage === totalPages && "opacity-50 cursor-not-allowed"
        )}
      >
        →
      </button>
    </div>
  );
}
