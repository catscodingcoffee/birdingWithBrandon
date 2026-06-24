import type { Metadata } from "next";

export const metadata: Metadata = { title: "Auditory ID — Birding with Brandon" };

// Bird sounds grouped by family. Two ways to give each bird audio:
//   1. Self-host: download a CC clip from xeno-canto.org into public/sounds/ and
//      set `src` to the local path → the card embeds an <audio> player.
//   2. Link out: skip the file and just set `url` to the recording's xeno-canto
//      page → the card renders a "Listen on Xeno-canto" link instead.
// Either way set `by` (recordist) + `url` for CC-BY attribution.
// Add a bird under the right family; add a family by pushing a new { label, birds }.
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
      { name: "Purple Finch", src: "/sounds/lesser-goldfinch.mp3", by: "Ed Pandolfino", url: "https://xeno-canto.org/807064" },
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
      { name: "American Crow", src: "/sounds/american-crow.mp3", by: "Thomas Magarian", url: "https://xeno-canto.org/543338" },
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
              // TODO (Brandon): build the card. key={b.name}, show b.name as a label,
              // then ONE of these for the audio:
              //   self-hosted player:
              //     {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              //     <audio controls src={b.src} className="w-full" />
              //   or link out (no hosted file needed):
              //     <a href={b.url} target="_blank" rel="noopener noreferrer" className="underline">
              //       Listen on Xeno-canto →
              //     </a>
              <div key={b.name}>{
                <label>
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{b.name}</p>
                  {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                  <audio controls src={b.src} className="w-full" />
                </label>

              }</div>
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
        {/* TODO (Brandon): list each recordist credit. Flatten the groups and map, e.g.:
              {groups.flatMap((g) => g.birds).map((b) => (
                <span key={b.name}>{b.name}: <a href={b.url} ...>{b.by}</a></span>
              ))}
            Uses b.by (recordist) and b.url (xeno-canto page) from the data above. */}
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
