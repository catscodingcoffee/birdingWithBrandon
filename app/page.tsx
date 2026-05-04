import Link from "next/link";

const features = [
  {
    title: "Equipment",
    description: "Binoculars, scopes, and field guides for every budget and experience level.",
    href: "/equipment",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="13" r="4" />
        <circle cx="17" cy="13" r="4" />
        <path d="M11 13h2M3 13H1M23 13h-2M7 9V7M17 9V7M11 7h2" />
      </svg>
    ),
  },
  {
    title: "Identification Tips",
    description: "Visual and auditory cues to confidently identify birds in the field.",
    href: "/identification",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12C2 6.48 6.48 2 12 2c3.5 0 6.5 1.8 8.3 4.5" />
        <path d="M22 12c0 5.52-4.48 10-10 10" />
        <path d="M15 9l-6 6M9 9l6 6" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Rare Oregon Sightings",
    description: "Live rare bird alerts for Oregon, powered by eBird.",
    href: "https://ebird.org/alert/summary?sid=SN35555",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17.3l-6.2 4.1 2.4-7.4L2 9.4h7.6z" />
      </svg>
    ),
  },
  {
    title: "Top Oregon Spots",
    description: "The best birding locations across the Pacific Northwest.",
    href: "/locations",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
  },
  {
    title: "My eBird List",
    description: "A running log of every species I've recorded in the field.",
    href: "https://ebird.org/profile/MzU0MTIwNw",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Hotspot Flashcards",
    description: "Enter any location to study the birds at nearby eBird hotspots.",
    href: "/flashcards",
    highlight: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M12 10v4M10 12h4" />
      </svg>
    ),
  },
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="pt-8 pb-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-4">
          Birding with Brandon
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
          Oregon birding guides, identification tips, and tools built around the
          eBird database — for beginners and listers alike.
        </p>
      </section>

      {/* Feature grid */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
          Explore
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => {
            const inner = (
              <div
                className={`group flex flex-col gap-3 p-5 rounded-2xl border transition-all h-full ${
                  f.highlight
                    ? "border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40 hover:border-sky-400 dark:hover:border-sky-600"
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900/50"
                }`}
              >
                <span
                  className={
                    f.highlight
                      ? "text-sky-600 dark:text-sky-400"
                      : "text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors"
                  }
                >
                  {f.icon}
                </span>
                <div>
                  <h3
                    className={`font-semibold mb-1 ${
                      f.highlight
                        ? "text-sky-700 dark:text-sky-300"
                        : "text-gray-900 dark:text-gray-100"
                    }`}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            );

            return "external" in f && f.external ? (
              <a
                key={f.title}
                href={f.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex"
              >
                {inner}
              </a>
            ) : (
              <Link key={f.title} href={f.href} className="flex">
                {inner}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Bird of the week */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
          Bird of the Week
        </h2>
        <div className="flex gap-6 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-1">
              Spotted Towhee
            </h3>
            <p className="text-sm italic text-gray-500 dark:text-gray-400 mb-3">
              Pipilo maculatus
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              One of Oregon&apos;s most recognizable backyard birds. Listen for its
              distinctive <em>drink-your-teeeea</em> song in brushy thickets and
              forest edges. The male&apos;s bold black, white, and rufous plumage
              makes it easy to identify.
            </p>
            <a
              href="https://www.audubon.org/field-guide/bird/spotted-towhee"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-sky-600 dark:text-sky-400 hover:underline"
            >
              Audubon field guide &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
