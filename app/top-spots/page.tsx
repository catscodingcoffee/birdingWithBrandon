import type { Metadata } from "next";
import Image from "next/image";
import { describe } from "node:test";

export const metadata: Metadata = { title: "Top Oregon Birding Spots" };
const ebird_hotspot_stub = "https://ebird.org/hotspot/";

const locations = [
  {
    name: "Fern Hill Wetlands",
    location: "Forest Grove",
    location_link: "https://maps.app.goo.gl/rwCzB6MweLtnY5C57",
    image: "/images/fernhill.webp",
    description: "A renowned destination for shorebirds, herons, and rare migrating ducks.",
    more_info: "https://fernhillnts.org/birding",
    ebird_id: "L163529",
  },
  {
    name: "Oaks Bottom Wildlife Refuge",
    location: "Portland",
    location_link: "https://maps.app.goo.gl/C6Le1Unzg37cpdgEA",
    image: "/images/oaks-bottom.avif",
    description: "Spans 163 acres right in the city and supports over 175 bird species, including peregrine falcons.",
    more_info: "https://www.portland.gov/parks/oaks-bottom-wildlife-refuge",
    ebird_id: "L453974",
  },
  {
    name: "Yaquina Head Outstanding Natural Area",
    location: "Newport",
    location_link: "https://maps.app.goo.gl/1XZ66nmtsGKmSCpo6",
    image: "/images/yaquina-tour-hero.jpg",
    description: "A designated global Important Bird Area on the coast. Perfect for viewing nesting colonies of common murres, Brandt's cormorants, and pigeon guillemots",
    more_info: "https://www.blm.gov/programs/national-conservation-lands/oregon-washington/yaquina-head-ona",
    ebird_id: "L156941",
  },
  {
    name: "William L. Finley National Wildlife Refuge",
    location: "Corvallis",
    location_link: "https://maps.app.goo.gl/NNxj6s6SdoSiPGhVA",
    image: "/images/finley.webp",
    description: "Established to protect the dusky Canada goose, it features diverse habitats that host thousands of wintering birds and rare species",
    more_info:"https://www.fws.gov/refuge/william-l-finley",
    ebird_id: "L159617",
  },
  {
    name: "Tualatin River National Wildlife Refuge",
    location: "Sherwood",
    location_link: "https://maps.app.goo.gl/RZLeYjSqgSRd1jXF9",
    image:"/images/trnwr.jpg",
    description: "Just a few minutes from Tigard, this urban refuge is fantastic for waterfowl, herons, and bald eagles. You can bird-watch easily from the visitor center’s viewing areas",
    more_info:"https://www.fws.gov/refuge/tualatin-river",
    ebird_id: "L498314",
  },
  {
    name: "Malheur National Wildlife Refuge",
    location: "Harney County",
    location_link: "https://maps.app.goo.gl/ULZA3u3MQkmcNvW59",
    image: "/images/malheur.jpg",
    description: "Often called the crown jewel of Oregon birding. This massive eastern oasis attracts over 320 species, including sandhill cranes, waterfowl, and massive flocks of migrating songbirds",
    more_info: "https://www.fws.gov/refuge/malheur",
    ebird_id: "L742936"
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
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <a className="text-sm text-[#2c5fca] hover:underline" href={locs.location_link}> 
                  Location: {locs.location}
                </a>
                </p>
              <p>
                <a className="text-sm text-[#2c5fca] hover:underline" href={locs.more_info}>
                  Website
                </a>
              </p>
              <p>
                <a className="text-sm text-[#2c5fca] hover:underline" href={ebird_hotspot_stub+locs.ebird_id}>
                  eBird Hotspot
                </a>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
