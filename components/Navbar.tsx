"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const activeClasses = "block py-2 px-3 text-white bg-neutral-950 rounded md:bg-transparent md:text-neutral-950 md:p-0 dark:text-white md:dark:text-blue-500";
  const inactiveClasses = "block py-2 px-3 text-neutral-950 rounded  md:hover:bg-transparent md:border-0 md:hover:text-neutral-700 md:p-0 dark:text-white md:dark:hover:text-neutral-950 dark:hover:bg-neutral-950 dark:hover:text-white md:dark:hover:bg-transparent";

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">E-Commerce</span>
        </Link>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={pathname === '/' ? activeClasses : inactiveClasses}
                aria-current={pathname === '/' ? 'page' : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/poke-list"
                className={pathname === '/poke-list' ? activeClasses : inactiveClasses}
                aria-current={pathname === '/poke-list' ? 'page' : undefined}
              >
                Pokemon List
              </Link>
            </li>
            <li>
              <Link
                href="/poke-ability"
                className={pathname === '/poke-ability' ? activeClasses : inactiveClasses}
                aria-current={pathname === '/poke-ability' ? 'page' : undefined}
              >
                Pokemon Ability
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}