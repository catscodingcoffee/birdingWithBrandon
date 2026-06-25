import type { Metadata } from "next";

export const metadata: Metadata = { title: "Auditory ID — Birding with Brandon" };

const groups = [
  {
    label: "Sparrows & Towhees",
    birds: [
      { name: "Song Sparrow",   src: "/sounds/song-sparrow.mp3",   by: "Mark Nenadov", url: "https://xeno-canto.org/550704" },
      { name: "Spotted Towhee",  src: "/sounds/spotted-towhee.mp3", by: "Thomas Magarian", url: "https://xeno-canto.org/545912" },
    ],
  },
  {
    label: "Finches",
    birds: [
      { name: "Lesser Goldfinch", src: "/sounds/lesser-goldfinch.mp3", by: "Thomas Magarian", url: "https://xeno-canto.org/545809" },
      { name: "House Finch", src: "/sounds/house-finch.wav", by: "Manuel Grosselet", url: "https://xeno-canto.org/1089801" },
      { name: "Purple Finch", src: "/sounds/purple-finch.mp3", by: "Ed Pandolfino", url: "https://xeno-canto.org/807064" },
    ],
  },
  {
    label: "Blackbirds",
    birds: [
      { name: "Red-winged Blackbird", src: "/sounds/red-winged-blackbird.mp3", by: "Ed Pandolfino", url: "https://xeno-canto.org/1136859" },
      { name: "Brown-headed Cowbird", src: "/sounds/cowbird.mp3", by: "Thomas Magarian", url: "https://xeno-canto.org/527674" },
    ],
  },
  {
    label: "Jays & Crows",
    birds: [
      { name: "American Crow", src: "/sounds/american-crow.mp3", by: "Thomas Magarian", url: "https://xeno-canto.org/462767" },
      { name: "Common (Northern) Raven",src:"/sounds/raven.wav",by:"Grzegorz Lorek",url:"https://xeno-canto.org/1144239"},
    ],
  },
];

export default function AuditoryPage() {
  return (
    <div className="space-y-10">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Auditory Identification</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Common Pacific Northwest birds and their songs, grouped by family —
          related birds often sound alike, so studying them together makes the
          differences click faster.
        </p>
      </div>

      {/* One section per family, each with its own grid of cards */}
      {groups.map((g) => (
        <section key={g.label} className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            {g.label}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {g.birds.map((b) => (
              <div key={b.name}>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{b.name}</p>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <audio controls src={b.src} className="w-full" />
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Attribution footer — required for CC-BY clips from Xeno-canto */}
      <footer className="text-xs text-gray-400 dark:text-gray-500 space-y-1">
        <p>
          Recordings sourced from{" "}
          <a href="https://xeno-canto.org" target="_blank" rel="noopener noreferrer" className="underline">
            Xeno-canto
          </a>{" "}
          under Creative Commons licenses.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1">
        {groups.flatMap((g) => g.birds).map((b) => (
                <p key={b.name}>
                  {b.name}:{" "}
                  <a href={b.url} target="_blank" rel="noopener noreferrer" className="underline">
                    {b.by}
                  </a>
                </p>
              ))}
        </div>
      </footer>
    </div>
  );
}
