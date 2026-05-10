import type { Metadata } from "next";

export const metadata: Metadata = { title: "Auditory ID — Birding with Brandon" };

const birds = [
  {
    name: "Red-winged Blackbird",
    src: "https://www.allaboutbirds.org/guide/assets/sound/551159.mp3",
    note: "One of the most common and distinct songs to learn first — a raspy, liquid conk-la-ree.",
  },
  {
    name: "American Crow",
    src: "https://www.allaboutbirds.org/guide/assets/sound/549833.mp3",
    note: "The classic caw — once you know it you'll hear crows everywhere.",
  },
  {
    name: "Lesser Goldfinch",
    src: "https://www.allaboutbirds.org/guide/assets/sound/550617.mp3",
    note: "A high, sweet warble often heard in open shrubby areas and backyards.",
  },
];

export default function AuditoryPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Auditory Identification</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Birding by ear can be one of the most difficult skills to develop — or
          the most natural, depending on the person. A good starting point is
          learning a handful of songs that are common and distinct enough that
          you'll have plenty of chances to hear and reinforce them.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Starter Songs
        </h2>
        <div className="space-y-4">
          {birds.map((b) => (
            <div
              key={b.name}
              className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-3"
            >
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{b.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{b.note}</p>
              </div>
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <audio controls src={b.src} className="w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
