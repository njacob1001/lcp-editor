import { Button } from "@/components/atoms/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/atoms/ui/command";
import { cn } from "@/utils/tailwind";
import { useState } from "react";

export const SearchButton = () => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <>
      <Button
        onClick={() => setDropdown(true)}
        variant="outline"
        className={cn(
          "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        )}
      >
        <span className="hidden lg:inline-flex">Search</span>
        <kbd className="pointer-events-none absolute right-[9px] top-[9px] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={dropdown} onOpenChange={setDropdown}>
        <CommandInput placeholder="search something" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
