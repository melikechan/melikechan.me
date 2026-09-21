"use client";

import * as React from "react";
import {
  cn,
  Badge,
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@melikechan/ui";

interface MultiSelectProps {
  allTags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  className?: string;
}

export function MultiSelect({
  allTags,
  selectedTags,
  onTagsChange,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredTags = React.useMemo(
    () =>
      allTags.filter((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [allTags, searchTerm],
  );

  const toggleTag = React.useCallback(
    (tag: string) =>
      selectedTags.includes(tag)
        ? onTagsChange(selectedTags.filter((t) => t !== tag))
        : onTagsChange([...selectedTags, tag]),
    [onTagsChange, selectedTags],
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select tags"
          className={cn("w-full justify-between h-auto", className)}
        >
          <div className="flex gap-1 flex-wrap">
            {selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="mr-1">
                  {tag}
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">Select tags...</span>
            )}
          </div>
          <span
            aria-hidden
            className="material-symbols-outlined shrink-0 text-base! leading-none opacity-50"
          >
            unfold_more
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <div className="flex flex-col gap-2 p-2">
          <Input
            placeholder="Search tags..."
            aria-label="Search tags"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <Button
                    key={tag}
                    variant="ghost"
                    className="w-full justify-between font-normal"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    {isSelected && (
                      <span
                        aria-hidden
                        className="material-symbols-outlined text-base! leading-none"
                      >
                        check
                      </span>
                    )}
                  </Button>
                );
              })
            ) : (
              <p className="text-center text-sm text-muted-foreground py-4">
                No tag found.
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
