'use client';

import * as React from 'react';
import { ChevronsUpDown, X, Check } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export function MultiSelect({ allTags, selectedTags, onTagsChange, className }) {
  const [open, setOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredTags = allTags.filter(tag => 
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUnselect = (tag) => {
    onTagsChange(selectedTags.filter((t) => t !== tag));
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      handleUnselect(tag);
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

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
                <Badge
                  key={tag}
                  variant="secondary"
                  className="mr-1"
                >
                  {tag}
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label={`Remove ${tag}`}
                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === "Space") {
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
        <div className="flex flex-col space-y-2 p-2">
            <Input
              placeholder="Search tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <div className="max-h-60 overflow-y-auto">
              {filteredTags.length > 0 ? (
                filteredTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <Button
                      key={tag}
                      variant="ghost"
                      className="w-full justify-start font-normal"
                      onClick={() => toggleTag(tag)}
                    >
                      <div className="flex items-center justify-between w-full">
                          <span>{tag}</span>
                          {isSelected && <Check className="h-4 w-4" />}
                      </div>
                    </Button>
                  );
                })
              ) : (
                <p className="text-center text-sm text-muted-foreground py-4">No tag found.</p>
              )}
            </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}