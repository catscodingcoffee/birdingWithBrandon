import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Birding with Brandon",
  description:
    "Oregon birding tips, identification guides, and eBird hotspot flashcard tools",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable} suppressHydrationWarning>
      <head>
        {/* Runs before paint to prevent dark-mode flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 antialiased font-[var(--font-geist-sans)]">
        <Nav />
        <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-20">
          <div className="max-w-5xl mx-auto px-4 py-8 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
            <span>&copy; Brandon Smith</span>
            <a
              href="https://www.instagram.com/birding_with_brandon/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
            >
              @birding_with_brandon
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
