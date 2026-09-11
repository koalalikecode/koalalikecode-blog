import React from "react";
import { useRouter } from "next/router";
import Button from "./ui/Button";

export default function Pagination({ currentPage, totalPages }) {
  const router = useRouter();

  const goToPage = (page) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    });
  };

  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav
      className="flex gap-2 justify-center my-8 flex-wrap"
      aria-label="Pagination Navigation"
    >
      <Button
        variant="outline"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-1.5 rounded-full text-sm"
      >
        ← Prev
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-4 py-1.5 rounded-full text-sm ${
            page === currentPage
              ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white font-semibold border-transparent cursor-default"
              : ""
          }`}
          disabled={page === currentPage}
          variant={page === currentPage ? "primary" : "outline"}
          aria-current={page === currentPage ? "page" : undefined}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-1.5 rounded-full text-sm"
      >
        Next →
      </Button>
    </nav>
  );
}
