import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = { title: "Visual ID — Birding with Brandon" };

const groups = [
  {
    name: "Swans, ducks, and geese",
    species: ["Mallard", "Canada Goose", "Cackling Goose", "Tundra Swan"],
  },
  {
    name: "Chickadees and nuthatches",
    species: ["Black-capped Chickadee", "Bushtit", "White-breasted Nuthatch"],
  },
  {
    name: "Wrens and kinglets",
    species: ["Bewick's Wren", "Ruby-crowned Kinglet"],
  },
  {
    name: "Bitterns, herons, and egrets",
    species: ["Great Blue Heron", "Great Egret"],
  },
];

const videos = [
  {
    src: "https://www.youtube.com/embed/y_1gnGXJiX4?si=NBA-SKUphcDlPZTJ",
    title: "Bird identification video 1",
  },
  {
    src: "https://www.youtube.com/embed/FmgcpEC3Dw4?si=ywdJwkCImUd7GBPv",
    title: "Bird identification video 2",
  },
];

export default function VisualPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Visual Identification</h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Color is where many people start, but it can be tricky — plumage changes
          throughout the year. Here are some more reliable approaches picked up from
          the National Audubon Society.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Groups
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          For a beginning birder, I suggest learning a few birds in the basic groups
          we see in Oregon and looking for commonalities and differences between
          birds in the same group.
        </p>
        <ul className="space-y-3 pt-1">
          {groups.map((g) => (
            <li key={g.name}>
              <span className="font-medium text-gray-900 dark:text-gray-100">{g.name}</span>
              <div className="mt-1 ml-5 flex flex-wrap gap-x-4 gap-y-1">
                {g.species.map((s) => (
                  <span key={s} className="text-sm text-gray-500 dark:text-gray-400">
                    {s}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Size &amp; Shape
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          Within these groups, features like size, body shape, and beak shape can
          help. Once you see enough wrens, you notice they all have long beaks that
          are straight or curve slightly down. Nuthatches, on the other hand, have
          straight, almost chisel-shaped beaks — easy to confuse at first, but
          distinct once you know what to look for.
        </p>
        <div className="grid grid-cols-2 gap-6 max-w-xl pt-2">
          {[
            { src: "/images/marsh_wren.jpg", caption: "Marsh Wren" },
            { src: "/images/white-breasted-nuthatch.jpg", caption: "White-breasted Nuthatch" },
          ].map(({ src, caption }) => (
            <figure key={caption} className="space-y-2">
              <div className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900">
                <Image src={src} alt={caption} fill className="object-cover" sizes="(max-width: 640px) 50vw, 288px" />
              </div>
              <figcaption className="text-sm text-center text-gray-500 dark:text-gray-400">
                {caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
          Behavior
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
          When groups and field marks aren't enough, behavior can clinch an ID.
          Chickadees are busy and acrobatic in the canopy of deciduous trees.
          Wrens are equally active but tend to stay low — in shrubs and the
          lower branches where chickadees rarely venture.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {videos.map((v) => (
            <div key={v.src} className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 aspect-video">
              <iframe
                src={v.src}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
