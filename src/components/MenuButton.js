'use client'

import { useEffect } from "react";

export default function MenuButton({ isOpen, toggleMenu }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <button
      className="p-2 rounded-full bg-gray-400 dark:bg-gray-800 text-gray-800 dark:text-gray-400"
      onClick={() => toggleMenu(!isOpen)}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
        />
      </svg>
    </button>
  );
}