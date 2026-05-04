"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

type NavChild = { label: string; href: string; external?: boolean };
type NavItem =
  | { label: string; href: string; highlight?: boolean }
  | { label: string; children: NavChild[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Identification",
    children: [
      { label: "Equipment", href: "/equipment" },
      { label: "Visual", href: "/visual" },
      { label: "Auditory", href: "/auditory" },
    ],
  },
  {
    label: "Common Birds",
    children: [
      { label: "Backyard", href: "/backyard-birds" },
      { label: "Wild", href: "/wild-birds" },
    ],
  },
  { label: "Flashcards", href: "/flashcards", highlight: true },
  {
    label: "Resources",
    children: [
      { label: "Merlin", href: "https://merlin.allaboutbirds.org", external: true },
      { label: "eBird", href: "https://ebird.org", external: true },
      { label: "ODFW", href: "https://myodfw.com/wildlife-viewing/species/birds", external: true },
      { label: "Audubon", href: "https://www.audubon.org", external: true },
      { label: "OBA", href: "https://oregonbirding.org", external: true },
    ],
  },
  {
    label: "My Birding",
    children: [
      { label: "eBird List", href: "https://ebird.org/profile/MzU0MTIwNw", external: true },
      { label: "Photos", href: "/photos" },
      { label: "Recordings", href: "/recordings" },
    ],
  },
];

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 opacity-50" strokeLinecap="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" strokeLinecap="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  function toggleDropdown(label: string) {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }

  const linkBase =
    "px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-semibold text-sky-700 dark:text-sky-400 text-base shrink-0"
          >
            Birding with Brandon
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => {
              if ("children" in item) {
                return (
                  <div key={item.label} className="relative group">
                    <button className={`${linkBase} flex items-center gap-1`}>
                      {item.label}
                      <ChevronDown />
                    </button>
                    <div className="absolute top-full left-0 pt-1 hidden group-hover:block">
                      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-1.5 min-w-36">
                        {item.children.map((child) =>
                          child.external ? (
                            <a
                              key={child.label}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${linkBase} ${
                    item.highlight
                      ? "text-sky-600 dark:text-sky-400 font-medium"
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-gray-200 dark:border-gray-800 py-3">
          <div className="max-w-5xl mx-auto px-4 space-y-1">
            {navItems.map((item) => {
              if ("children" in item) {
                const isOpen = openDropdown === item.label;
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="w-full flex justify-between items-center px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      {item.label}
                      <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        <ChevronDown />
                      </span>
                    </button>
                    {isOpen && (
                      <div className="ml-4 mt-1 space-y-1">
                        {item.children.map((child) =>
                          child.external ? (
                            <a
                              key={child.label}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            >
                              {child.label}
                            </Link>
                          )
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                    item.highlight ? "text-sky-600 dark:text-sky-400 font-medium" : ""
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
