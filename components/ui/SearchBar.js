import { useState } from "react";
import { useRouter } from "next/router";
import Input from "./Input";
import Button from "./Button";

export default function SearchBar({ initialValue = "", compact = false }) {
  const router = useRouter();
  const [keyword, setKeyword] = useState(initialValue);

  const submitSearch = (e) => {
    e.preventDefault();
    const search = keyword.trim();
    if (!search) return;
    router.push(`/search?search=${encodeURIComponent(search)}`);
  };

  return (
    <form
      onSubmit={submitSearch}
      className={`flex w-full items-center gap-2 ${compact ? "" : "mb-6"}`}
      role="search"
      aria-label="Site search"
    >
      <Input
        type="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search articles..."
        className="dark:border-slate-700"
      />
      <Button type="submit" className="shrink-0">
        Search
      </Button>
    </form>
  );
}
