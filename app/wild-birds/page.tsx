import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Wild Birds — Birding with Brandon" };

const birds = [
  {
    name: "Red-tailed Hawk",
    image: "/images/red-tailed-hawk.jpg",
    audio: "https://www.allaboutbirds.org/guide/assets/sound/549134.mp3",
  },
  {
    name: "Ring-billed Gull",
    image: "/images/ring-billed-gull.jpg",
    audio: "https://www.allaboutbirds.org/guide/assets/sound/548839.mp3",
  },
  {
    name: "Great Horned Owl",
    image: "/images/great-horned-owl.jpg",
    audio: "https://www.allaboutbirds.org/guide/assets/sound/549166.mp3",
  },
];

export default function WildBirdsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Wild Birds</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Birds you're more likely to spot out in the field — in open country, wetlands, and forests across Oregon.
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
