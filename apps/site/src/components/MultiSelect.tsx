"use client";

import * as React from "react";
import { ChevronsUpDown, X, Check } from "lucide-react";
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

  const handleUnselect = React.useCallback(
    (tag: string) => onTagsChange(selectedTags.filter((t) => t !== tag)),
    [onTagsChange, selectedTags],
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
          className={cn("w-full justify-between h-auto", className)}
        >
          <div className="flex gap-1 flex-wrap">
            {selectedTags.length > 0 ? (
              selectedTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="mr-1">
                  {tag}
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={`Remove ${tag}`}
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUnselect(tag);
                      }
                    }}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleUnselect(tag);
                    }}
                  >
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </span>
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">Select tags...</span>
            )}
          </div>
          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <div className="flex flex-col gap-2 p-2">
          <Input
            placeholder="Search tags..."
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
                    {isSelected && <Check className="h-4 w-4" />}
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
