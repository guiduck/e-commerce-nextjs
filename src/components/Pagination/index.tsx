"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
}

export function Pagination({ currentPage, hasNextPage }: PaginationProps) {
  const searchParams = useSearchParams();

  const generatePageLink = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `?${params.toString()}`;
  };

  const pages: (number | string)[] = [];

  // Always show first page
  pages.push(1);

  // Show ellipsis if currentPage is far from beginning
  if (currentPage > 3) {
    pages.push("...");
  }

  // Add previous page if it's not 1
  if (currentPage - 1 > 1) {
    pages.push(currentPage - 1);
  }

  // Add current page if it's not 1
  if (currentPage !== 1) {
    pages.push(currentPage);
  }

  // Add next page if we know one exists
  if (hasNextPage) {
    pages.push(currentPage + 1);
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-4">
      <Link
        href={generatePageLink(currentPage - 1)}
        aria-disabled={currentPage === 1}
        className={cn(
          "px-2 py-1 rounded-full hover:bg-muted transition",
          currentPage === 1 && "pointer-events-none opacity-50"
        )}
      >
        ←
      </Link>

      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <Link
            key={idx}
            href={generatePageLink(page)}
            className={cn(
              "px-3 py-1 rounded-full text-sm",
              currentPage === page
                ? "bg-primary text-white"
                : "hover:bg-muted text-muted-foreground"
            )}
          >
            {page}
          </Link>
        ) : (
          <span key={idx} className="px-2 text-sm text-muted-foreground">
            ...
          </span>
        )
      )}

      {hasNextPage && (
        <Link
          href={generatePageLink(currentPage + 1)}
          className="px-2 py-1 rounded-full hover:bg-muted transition"
        >
          →
        </Link>
      )}
    </div>
  );
}
