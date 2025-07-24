"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size={"sm"}>
          {theme === "light" ? (
            <span className="material-symbols-outlined w-5 h-5 text-muted-foreground">
              light_mode
            </span>
          ) : theme === "dark" ? (
            <span className="material-symbols-outlined w-5 h-5 text-muted-foreground">
              dark_mode
            </span>
          ) : (
            <span className="material-symbols-outlined w-5 h-5 text-muted-foreground">
              computer
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-content" align="start">
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(e) => setTheme(e)}
        >
          <DropdownMenuRadioItem
            className="flex items-center gap-2"
            value="light"
          >
            <span className="material-symbols-outlined text-base text-muted-foreground">
              light_mode
            </span>{" "}
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="flex items-center gap-2"
            value="dark"
          >
            <span className="material-symbols-outlined text-base text-muted-foreground">
              dark_mode
            </span>{" "}
            <span>Dark</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="flex items-center gap-2"
            value="system"
          >
            <span className="material-symbols-outlined text-base text-muted-foreground">
              computer
            </span>{" "}
            <span>System</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
