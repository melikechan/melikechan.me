'use client'

import Link from 'next/link';
import ThemeToggle from './ThemeToggler';
import { useEffect } from 'react';

export default function MobileMenu({ isOpen, closeMenu, navLinks }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      onClick={closeMenu}
    >
      <div
        className="bg-white dark:bg-gray-900 w-64 h-full p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="space-y-4">
          {navLinks.map((item) => (
            <li key={item}>
              <Link href={`/${item}`} onClick={closeMenu} className="capitalize">
                {item}
              </Link>
            </li>
          ))}
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </div>
  );
}