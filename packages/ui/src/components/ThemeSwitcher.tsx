"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const THEME_ICONS: Record<string, string> = {
  light: "light_mode",
  dark: "dark_mode",
  system: "computer",
};

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const icon = mounted
    ? (THEME_ICONS[theme ?? "system"] ?? "computer")
    : "computer";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger aria-label="Open theme menu" asChild>
        <Button
          variant="ghost"
          className="text-center"
          size="sm"
          suppressHydrationWarning
        >
          <span className="material-symbols-outlined text-muted-foreground">
            {icon}
          </span>
        </Button>
      </DropdownMenuTrigger>
      {mounted && (
        <DropdownMenuContent className="w-content" align="start">
          <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
            {Object.entries(THEME_ICONS).map(([value, iconName]) => (
              <DropdownMenuRadioItem
                key={value}
                className="flex items-center gap-2"
                value={value}
              >
                <span className="material-symbols-outlined text-muted-foreground">
                  {iconName}
                </span>
                <span className="capitalize">{value}</span>
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}
