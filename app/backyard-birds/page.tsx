import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Backyard Birds — Birding with Brandon" };

const birds = [
  {
    name: "Song Sparrow",
    image: "/images/song_sparrow.jpg",
    audio: "https://www.allaboutbirds.org/guide/assets/sound/550973.mp3",
  },
  {
    name: "Lesser Goldfinch",
    image: "/images/lesser_gold_finch.jpg",
    audio: "https://www.allaboutbirds.org/guide/assets/sound/550617.mp3",
  },
  {
    name: "European Starling",
    image: "/images/starling.jpg",
    audio: "https://www.allaboutbirds.org/guide/assets/sound/543795.mp3",
  },
];

export default function BackyardBirdsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Backyard Birds</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Common birds you're likely to see and hear right outside your window in Oregon.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {birds.map((b) => (
          <div
            key={b.name}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-900">
              <Image
                src={b.image}
                alt={b.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="p-4 space-y-3">
              <p className="font-medium text-gray-900 dark:text-gray-100">{b.name}</p>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio controls src={b.audio} className="w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
