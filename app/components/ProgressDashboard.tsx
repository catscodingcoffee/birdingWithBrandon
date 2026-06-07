"use client";
import Link from "next/link";
import { useState } from "react";
import ClearProgressButton from "./ClearProgressButton";

interface Summary {
  totalSessions: number;
  uniqueHotspots: number;
  uniqueSpecies: number;
  overallAccuracy: number;
}

interface SpeciesStat {
  name: string;
  gotIt: number;
  notYet: number;
}

interface HotspotStat {
  name: string;
  sessions: number;
  gotIt: number;
  total: number;
}

interface Props {
  summary: Summary;
  speciesStats: SpeciesStat[];
  hotspotStats: HotspotStat[];
}

type Tab = "species" | "hotspots";

export default function ProgressDashboard({ summary, speciesStats, hotspotStats }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("species");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Progress</h1>
      </div>

      {/* TODO: Summary stats row — render 4 stat cards using summary.totalSessions,
          summary.uniqueHotspots, summary.uniqueSpecies, summary.overallAccuracy.
          Look at how the home page renders its two-column section cards for a style reference. */}
      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-800 dark:text-gray-500 mb-5">
          Explore
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
        </div>
      </section>











      {/* Tab switcher */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab("species")}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "species"
              ? "border-[#2c5fca] text-[#2c5fca]"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          By Species
        </button>
        <button
          onClick={() => setActiveTab("hotspots")}
          className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "hotspots"
              ? "border-[#2c5fca] text-[#2c5fca]"
              : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          By Hotspot
        </button>
      </div>

      {/* Species tab */}
      {activeTab === "species" && (
        <div className="space-y-3">
          {speciesStats.length === 0 ? (
            <p className="text-sm text-gray-500">No missed birds yet — keep studying!</p>
          ) : (
            speciesStats.map((s) => {
              const total = s.gotIt + s.notYet;
              const accuracy = Math.round((s.gotIt / total) * 100);
              return (
                <div key={s.name}>
                  {/* TODO: render a row/card for each species. You have access to:
                      s.name       — common name, e.g. "American Robin"
                      s.notYet     — times missed
                      s.gotIt      — times correct
                      total        — total attempts (already computed above)
                      accuracy     — accuracy % (already computed above)

                      Suggestion: show the name on the left, a small progress bar in the
                      middle, and "X missed / Y%" on the right. */}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Hotspots tab */}
      {activeTab === "hotspots" && (
        <div className="space-y-3">
          {hotspotStats.length === 0 ? (
            <p className="text-sm text-gray-500">No hotspot sessions yet.</p>
          ) : (
            hotspotStats.map((h) => {
              const accuracy = h.total > 0 ? Math.round((h.gotIt / h.total) * 100) : 0;
              return (
                <div key={h.name}>
                  {/* TODO: render a row/card for each hotspot. You have access to:
                      h.name       — hotspot name, e.g. "Fernhill Wetlands"
                      h.sessions   — number of times you've studied here
                      h.total      — total bird attempts across all sessions here
                      h.gotIt      — correct answers
                      accuracy     — accuracy % (already computed above)

                      Suggestion: hotspot name + "X sessions" on the left,
                      accuracy % on the right. */}
                </div>
              );
            })
          )}
        </div>
      )}

      <ClearProgressButton />
    </div>
  );
}
