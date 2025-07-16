import React from "react";
import { useRouter } from "next/router";

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
    <div className="flex gap-2 justify-center my-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border border-blue-500 rounded text-blue-500 hover:bg-blue-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          className={`px-3 py-1 border border-blue-500 rounded transition
            ${page === currentPage
              ? "bg-blue-500 text-white font-semibold cursor-default"
              : "text-blue-500 hover:bg-blue-100 hover:text-blue-700"}
          `}
          disabled={page === currentPage}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border border-blue-500 rounded text-blue-500 hover:bg-blue-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
} 