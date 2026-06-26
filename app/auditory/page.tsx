import type { Metadata } from "next";

export const metadata: Metadata = { title: "Auditory ID — Birding with Brandon" };

const groups = [
  {
    label: "Owls",
    birds: [
      { name: "Great Horned Owl",   src: "/sounds/great-horned-owl.wav",   by: "Jeff Stewart", url: "https://xeno-canto.org/805489" },
      { name: "Barred Owl",  src: "/sounds/barred-owl.mp3", by: "Kayla Brown", url: "https://xeno-canto.org/749432" },
      { name: "Western Screech Owl",  src: "/sounds/western-screech-owl.mp3", by: "Lance A. M. Benner", url: "https://xeno-canto.org/542612" },
    ],
  },
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
      { name: "Pine Siskin", src: "/sounds/pine-siskin.mp3", by: "Greg Irving", url: "https://xeno-canto.org/1097600" },
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
    label: "Woodpeckers",
    birds: [
      { name: "Northern Flicker", src: "/sounds/northern-flicker.wav", by: "David Darrell-Lambert", url: "https://xeno-canto.org/1062459" },
      { name: "Downy Wookpecker", src: "/sounds/downy-woodpecker.mp3", by: "Thomas Magarian", url: "https://xeno-canto.org/531283" },
      { name: "Hairy Woodpecker", src: "/sounds/hairy-woodpecker.mp3", by: "Ed Pandolfino", url: "https://xeno-canto.org/1139592" },
      { name: "Pileated Woodpecker", src: "/sounds/pileated-woodpecker.mp3", by: "Jeff Stewart", url: "https://xeno-canto.org/1135618" },
    ],
  },
  {
    label: "Thrushes",
    birds: [
      { name: "American Robin", src: "/sounds/american-robin.wav", by: "David Darrell-Lambert", url: "https://xeno-canto.org/1139952" },
      { name: "Varied Thrush", src: "/sounds/varied-thrush.mp3", by: "AUDEVARD Aurélien", url: "https://xeno-canto.org/1048897" },
      { name: "Swainson's Thrush", src: "/sounds/swainsons-thrush.mp3", by: "Denis Dujardin", url: "https://xeno-canto.org/1056038" },
    ],
  },
  {
    label: "Jays & Crows",
    birds: [
      { name: "Scrub Jay", src: "/sounds/cali-scrub-jay.wav", by: "Paul Marvin", url: "https://xeno-canto.org/812841" },
      { name: "Steller's Jay", src: "/sounds/stellers-jay.mp3", by: "Thomas Magarian", url: "https://xeno-canto.org/540290" },
      { name: "American Crow", src: "/sounds/american-crow.mp3", by: "Thomas Magarian", url: "https://xeno-canto.org/462767" },
      { name: "Common (Northern) Raven",src:"/sounds/raven.wav",by:"Grzegorz Lorek",url:"https://xeno-canto.org/1144239"},
    ],
  },
  {
    label: "Raptors",
    birds: [
      { name: "Red-tailed Hawk", src: "/sounds/red-tailed-hawk.wav", by: "Manuel Grosselet", url: "https://xeno-canto.org/1090861" },
      { name: "Bald Eagle", src: "/sounds/bald-eagle.mp3", by: "Greg Irving", url: "https://xeno-canto.org/1048352" },
      { name: "Western Osprey", src: "/sounds/western-osprey.mp3", by: "Paul Marvin", url: "https://xeno-canto.org/225658" },
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

      {/* One collapsible <details> per family. Native HTML accordion —
          no client JS, keeps this a server component. First family open by
          default so the page isn't a wall of closed headers. */}
      <div className="space-y-3">
        {groups.map((g, i) => (
          <details
            key={g.label}
            open={i === 0}
            className="group rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <summary className="flex cursor-pointer select-none items-center justify-between gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
              <span className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                {g.label}
              </span>
              <span className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                {g.birds.length}
                <svg
                  className="h-4 w-4 transition-transform group-open:rotate-180"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </summary>
            <div className="grid grid-cols-2 gap-3 px-4 pb-4 sm:grid-cols-3">
              {g.birds.map((b) => (
                <div key={b.name}>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{b.name}</p>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <audio controls src={b.src} className="w-full" />
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>

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
