'use client'

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import ThemeToggle from './ThemeToggler';
import MenuButton from './MenuButton';
import MobileMenu from './MobileMenu';

const NAV_ITEMS = ['about', 'projects', 'blog', 'contact'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="flex justify-between items-center py-4 w-full px-4">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="melikechan-logo"
          width={64}
          height={64}
          priority
        />
      </Link>
      <div className="flex items-center space-x-4">
        <div className="lg:hidden">
          <MenuButton isOpen={menuOpen} toggleMenu={toggleMenu} />
        </div>
        <ul className="hidden lg:flex space-x-4 items-center">
          <li>
            <ThemeToggle />
          </li>
          {NAV_ITEMS.map((item) => (
            <li key={item}>
              <Link href={`/${item}`} className="capitalize">{item}</Link>
            </li>
          ))}
        </ul>
      </div>
      <MobileMenu isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
    </nav>
  );
}