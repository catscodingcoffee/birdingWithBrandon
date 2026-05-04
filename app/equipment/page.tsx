import type { Metadata } from "next";

export const metadata: Metadata = { title: "Equipment — Birding with Brandon" };

const binoculars = [
  {
    brand: "Vortex",
    model: "Viper HD",
    mag: "8x",
    lens: "42mm",
    price: "$640",
    pros: ["Very bright image", "Feel solid", "Waterproof/fogproof", "Unlimited lifetime warranty"],
    cons: ["Top of entry price range", "Stiff focus wheel"],
  },
  {
    brand: "Maven",
    model: "C1",
    mag: "8x",
    lens: "42mm",
    price: "$400",
    pros: ["Great image, bright and detailed", "Excellent close-focus", "Waterproof/fogproof", "Unlimited lifetime warranty"],
    cons: ["Narrow field of view"],
  },
  {
    brand: "Maven",
    model: "B1",
    mag: "8x",
    lens: "42mm",
    price: "$900",
    pros: ["Great image, bright and detailed", "Excellent close-focus", "Waterproof/fogproof", "Unlimited lifetime warranty"],
    cons: ["Larger — can be unwieldy for smaller hands", "Very expensive for entry level"],
  },
  {
    brand: "Nikon",
    model: "Monarch M7",
    mag: "10x",
    lens: "42mm",
    price: "$500",
    pros: ["Well constructed", "Good close-focus", "Great clarity"],
    cons: ["Heavy", "10x amplifies hand shake"],
  },
];

export default function EquipmentPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Equipment</h1>
        <p className="text-gray-600 dark:text-gray-400">
          A comparison of entry-level binoculars worth considering for birding.
          All are 8x42 or 10x42 — the standard for most birders.
        </p>
      </div>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
          Entry-Level Binoculars
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Brand</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Model</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Magnification</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Objective</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Price</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Pros</th>
                <th className="text-left px-4 py-3 font-medium text-gray-700 dark:text-gray-300">Cons</th>
              </tr>
            </thead>
            <tbody>
              {binoculars.map((b, i) => (
                <tr
                  key={`${b.brand}-${b.model}`}
                  className={`border-b border-gray-100 dark:border-gray-800 last:border-0 ${
                    i % 2 === 1 ? "bg-gray-50/50 dark:bg-gray-900/30" : ""
                  }`}
                >
                  <td className="px-4 py-4 font-medium">{b.brand}</td>
                  <td className="px-4 py-4">{b.model}</td>
                  <td className="px-4 py-4">{b.mag}</td>
                  <td className="px-4 py-4">{b.lens}</td>
                  <td className="px-4 py-4 font-medium text-sky-700 dark:text-sky-400">{b.price}</td>
                  <td className="px-4 py-4">
                    <ul className="space-y-0.5">
                      {b.pros.map((p) => (
                        <li key={p} className="flex gap-1.5 text-gray-700 dark:text-gray-300">
                          <span className="text-emerald-500 mt-0.5">+</span> {p}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-4">
                    <ul className="space-y-0.5">
                      {b.cons.map((c) => (
                        <li key={c} className="flex gap-1.5 text-gray-500 dark:text-gray-400">
                          <span className="text-red-400 mt-0.5">−</span> {c}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
