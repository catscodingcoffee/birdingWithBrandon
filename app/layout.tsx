import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";

export const metadata: Metadata = {
  title: "Birding with Brandon",
  description:
    "Oregon birding tips, identification guides, and eBird hotspot flashcard tools",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f4ebd4] text-gray-900 antialiased">
        <Nav />
        <main className="max-w-5xl mx-auto px-4 py-10">{children}</main>
        <footer className="border-t border-[#a5b9e2] mt-20">
          <div className="max-w-5xl mx-auto px-4 py-8 flex justify-between items-center text-sm text-[#2c5fca]/70">
            <span>&copy; Brandon Smith</span>
            <a
              href="https://www.instagram.com/birding_with_brandon/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2c5fca] transition-colors"
            >
              @birding_with_brandon
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
