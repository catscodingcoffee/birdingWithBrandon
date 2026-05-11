"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";


type NavChild = { label: string; href: string; external?: boolean };
type NavItem =
  | { label: string; href: string; highlight?: boolean }
  | { label: string; children: NavChild[] };


const navItems: NavItem[] = [
  {
    label: "Identification",
    children: [
      { label: "Equipment", href: "/equipment" },
      { label: "Visual", href: "/visual" },
      { label: "Auditory", href: "/auditory" },
    ],
  },
  {
    label: "PNW Birds",
    children: [
      { label: "Feeder Birds", href: "/backyard-birds" },
      { label: "Field Birds", href: "/wild-birds" },
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 opacity-60" strokeLinecap="round">
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
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  function toggleDropdown(label: string) {
    setOpenDropdown((prev) => (prev === label ? null : label));
  }

  const linkBase =
    "px-3 py-2 text-sm font-bold text-[#2c5fca] rounded-lg hover:bg-[#a5b9e2]/40 transition-colors";

  return (
    <header className="sticky top-0 z-50 bg-[#C8D4E3] border-b border-[#a5b9e2]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold text-[#2c5fca] text-base shrink-0"
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
                      <div className="bg-[#C8D4E3] rounded-xl shadow-lg border border-[#a5b9e2] py-1.5 min-w-36">
                        {item.children.map((child) =>
                          child.external ? (
                            <a
                              key={child.label}
                              href={child.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block px-4 py-1.5 text-sm font-bold text-[#2c5fca] hover:bg-[#a5b9e2]/40 transition-colors"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="block px-4 py-1.5 text-sm font-bold text-[#2c5fca] hover:bg-[#a5b9e2]/40 transition-colors"
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
                  className={`${linkBase} ${item.highlight ? "underline underline-offset-4" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-1">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(o => !o)}
                  className="px-3 py-1.5 text-sm font-bold rounded-lg hover:bg-[#a5b9e2]/40 transition-colors text-[#2c5fca] flex items-center gap-1"
                >
                  {"Account"}
                  <ChevronDown />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full pt-1 z-50">
                    <div className="bg-steel rounded-xl shadow-lg border border-steel-dark py-1.5 min-w-36">
                      <Link
                        href="/progress"
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-1.5 text-sm font-bold text-[#2c5fca] hover:bg-[#a5b9e2]/40 transition-colors"
                      >
                        My Progress
                      </Link>
                      <button
                        onClick={async () => {
                          const supabase = createClient();
                          await supabase.auth.signOut();
                          setUser(null);
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-1.5 text-sm font-bold text-[#2c5fca] hover:bg-[#a5b9e2]/40 transition-colors"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="px-3 py-1.5 text-sm font-bold rounded-lg text-[#2c5fca] hover:bg-[#a5b9e2]/40 transition-colors">
                Log in
              </Link>
            )}

            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="md:hidden p-2 rounded-lg hover:bg-[#a5b9e2]/40 transition-colors text-[#2c5fca]"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-[#a5b9e2] py-3">
          <div className="max-w-5xl mx-auto px-4 space-y-1">
            {navItems.map((item) => {
              if ("children" in item) {
                const isOpen = openDropdown === item.label;
                return (
                  <div key={item.label}>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="w-full flex justify-between items-center px-3 py-2 text-sm font-bold text-[#2c5fca] rounded-lg hover:bg-[#a5b9e2]/40 transition-colors"
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
                              className="block px-3 py-2 text-sm font-bold text-[#2c5fca] hover:bg-[#a5b9e2]/40 rounded-lg transition-colors"
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              key={child.label}
                              href={child.href}
                              onClick={() => setMobileOpen(false)}
                              className="block px-3 py-2 text-sm font-bold text-[#2c5fca] hover:bg-[#a5b9e2]/40 rounded-lg transition-colors"
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
                  className={`block px-3 py-2 text-sm font-bold text-[#2c5fca] rounded-lg hover:bg-[#a5b9e2]/40 transition-colors ${item.highlight ? "underline underline-offset-4" : ""}`}
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
