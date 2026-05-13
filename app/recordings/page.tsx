import type { Metadata } from "next";

export const metadata: Metadata = { title: "Bird Sounds — Birding with Brandon" };

const PNW_BIRDS = [
  { en: "American Robin",       gen: "Turdus",       sp: "migratorius" },
  { en: "Red-winged Blackbird", gen: "Agelaius",     sp: "phoeniceus"  },
  { en: "Rufous Hummingbird",   gen: "Selasphorus",  sp: "rufus"       },
  { en: "Dark-eyed Junco",      gen: "Junco",        sp: "hyemalis"    },
  { en: "Song Sparrow",         gen: "Melospiza",    sp: "melodia"     },
  { en: "Steller's Jay",        gen: "Cyanocitta",   sp: "stelleri"    },
  { en: "Pacific Wren",         gen: "Troglodytes",  sp: "pacificus"   },
  { en: "Spotted Towhee",       gen: "Pipilo",       sp: "maculatus"   },
];

interface XCRecording {
  id: string;
  en: string;   // English name
  rec: string;  // recordist name
  loc: string;  // location description
  cnt: string;  // country
  type: string; // "song", "call", etc.
  file: string; // full https:// audio file URL
  url: string;  // full https:// xeno-canto page URL
  q: string;    // quality rating: A (best) – E
  date: string;
}

async function fetchRecording(bird: typeof PNW_BIRDS[number]): Promise<XCRecording | null> {
  const key = process.env.XENO_CANTO;
  const query = encodeURIComponent(`gen:${bird.gen} sp:${bird.sp} q:A cnt:"united states"`);
  const res = await fetch(
    `https://xeno-canto.org/api/3/recordings?key=${key}&query=${query}&page=1`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return (data.recordings as XCRecording[])?.[0] ?? null;
}

export default async function RecordingsPage() {
  const results = await Promise.all(PNW_BIRDS.map(fetchRecording));
  const recordings = results.filter((r): r is XCRecording => r !== null);

  return (
    <div className="space-y-12">
      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">PNW Bird Sounds</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          {/* TODO: write a short description — something like "Common PNW birds, one representative call each. Sourced from Xeno-canto." */}
        </p>
      </div>

      {/* Recordings list */}
      <section className="space-y-4">
        {recordings.map((r) => (
          <div 
          key={r.id}
          className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-3"
          >
            <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">{r.en}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{r.loc}</p>
              </div>
            {/*
              TODO: build a card for each recording. You have access to:
                r.en      — bird name, e.g. "American Robin"
                r.type    — call type, e.g. "song" or "call"
                r.loc     — location, e.g. "Willamette Valley, Oregon"
                r.cnt     — country
                r.rec     — recordist name
                r.date    — date recorded
                r.url     — full URL to the xeno-canto page (use directly as href)
                r.file    — full URL to the audio file (use directly as src)

              Look at app/auditory/page.tsx for a card + <audio> pattern you can adapt.
              Credit the recordist with a link: <a href={r.url}>{r.rec}</a>
            */}
            <audio controls src={r.file} className="w-full" />
            <p>Recordist: <a href={r.url} target="_blank" rel="noopener noreferrer" className="underline">
              {r.rec}
            </a></p>
          </div>
        ))}
      </section>

      {/* Attribution */}
      <p className="text-xs text-gray-400">
        Recordings sourced from{" "}
        <a
          href="https://xeno-canto.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          Xeno-canto
        </a>
        . Licenses vary by recording — click any recordist name to view the original.
      </p>
    </div>
  );
}
