"use client";

import { Search } from "lucide-react";
import { Button, Input } from "@/components/atoms";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = "Suchen...",
  onSearch,
  className,
}: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.querySelector('input[name="search"]') as HTMLInputElement;
    if (input?.value && onSearch) {
      onSearch(input.value);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("flex gap-2", className)}
      role="search"
    >
      <Input
        name="search"
        type="search"
        placeholder={placeholder}
        className="flex-1"
        aria-label="Suchbegriff"
      />
      <Button type="submit" variant="primary" icon={Search} size="md">
        Suchen
      </Button>
    </form>
  );
}
