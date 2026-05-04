import type { Metadata } from "next";
import FlashcardDeck from "../components/FlashcardDeck";

export const metadata: Metadata = {
  title: "Hotspot Flashcards — Birding with Brandon",
  description:
    "Study the birds at any eBird hotspot near you with interactive flashcards.",
};

export default function FlashcardsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Hotspot Flashcards</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl">
          Enter a location to find nearby eBird hotspots, then study the species
          recently observed there — perfect prep before a birding trip.
        </p>
      </div>
      <FlashcardDeck />
    </div>
  );
}
