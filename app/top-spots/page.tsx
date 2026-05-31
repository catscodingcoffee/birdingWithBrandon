import type { Metadata } from "next";
import Image from "next/image";
import { describe } from "node:test";

export const metadata: Metadata = { title: "Top Oregon Birding Spots" };

const locations = [
  {
    name: "Fern Hill Wetlands",
    location: "Forest Grove",
    image: "/images/fernhill.webp",
    description: "A renowned destination for shorebirds, herons, and rare migrating ducks.",
    more_info: "https://fernhillnts.org/birding",
  },
  {
    name: "Oaks Bottom Wildlife Refuge",
    location: "Portland",
    image: "/images/oaks-bottom.avif",
    description: "Spans 163 acres right in the city and supports over 175 bird species, including peregrine falcons.",
    more_info: "https://www.portland.gov/parks/oaks-bottom-wildlife-refuge",
  },
  {
    name: "Yaquina Head Outstanding Natural Area",
    location: "Newport",
    image: "/images/yaquina-tour-hero.jpg",
    description: "A designated global Important Bird Area on the coast. Perfect for viewing nesting colonies of common murres, Brandt's cormorants, and pigeon guillemots",
    more_info: "https://www.blm.gov/programs/national-conservation-lands/oregon-washington/yaquina-head-ona",
  },
  {
    name: "William L. Finley National Wildlife Refuge",
    location: "Corvallis",
    image: "/images/finley.webp",
    description: "Established to protect the dusky Canada goose, it features diverse habitats that host thousands of wintering birds and rare species",
    more_info:"https://www.fws.gov/refuge/william-l-finley",
  },
  {
    name: "Tualatin River National Wildlife Refuge",
    location: "Sherwood",
    image:"/images/trnwr.jpg",
    description: "Just a few minutes from Tigard, this urban refuge is fantastic for waterfowl, herons, and bald eagles. You can bird-watch easily from the visitor center’s viewing areas",
    more_info:"https://www.fws.gov/refuge/tualatin-river",
  },
  {
    name: "Malheur National Wildlife Refuge",
    location: "Harney County",
    image: "/images/malheur.jpg",
    description: "Often called the crown jewel of Oregon birding. This massive eastern oasis attracts over 320 species, including sandhill cranes, waterfowl, and massive flocks of migrating songbirds",
    more_info: "https://www.fws.gov/refuge/malheur",
  }
];

export default function TopSpotsPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Oregon Birding</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Some great birding spots in Oregon
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.map((locs) => (
          <div
            key={locs.name}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="relative aspect-[4/3] bg-gray-100 dark:bg-gray-900">
            <Image
                src={locs.image}
                alt={locs.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            </div>
            <div className="p-4">
              <h2 className="font-semibold mb-1">{locs.name}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">{locs.description}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Location: {locs.location}</p>
              <a className="text-sm text-[#2c5fca] hover:underline" href={locs.more_info}>Website</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
