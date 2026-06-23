"use client";
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

      <section>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-800 dark:text-gray-500 mb-5">
          Overview
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="group flex flex-col gap-3 p-5 border rounded-2xl border-[#e6d2b9] transition-all h-full">
            <p className="text-3xl font-bold">{summary.totalSessions}</p>
            <p className="text-sm text-gray-500 ">Sessions</p>
          </div>
          <div className="group flex flex-col gap-3 p-5 border rounded-2xl border-[#e6d2b9] transition-all h-full">
            <p className="text-3xl font-bold">{summary.uniqueHotspots}</p>
            <p className="text-sm text-gray-500 ">Unique Hot Spots</p>
          </div>
          <div className="group flex flex-col gap-3 p-5 border rounded-2xl border-[#e6d2b9] transition-all h-full">
            <p className="text-3xl font-bold">{summary.uniqueSpecies}</p>
            <p className="text-sm text-gray-500 ">Unique Species</p>
          </div>
          <div className="group flex flex-col gap-3 p-5 border rounded-2xl border-[#e6d2b9] transition-all h-full">
            <p className="text-3xl font-bold">{summary.overallAccuracy}%</p>
            <p className="text-sm text-gray-500 ">Overall Accuracy</p>
          </div>
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
            <p className="text-sm text-gray-500">No birds studied yet!</p>
          ) : (
            <>
              {/* Header — rendered once, above the rows */}
              <div className="flex items-center gap-4 px-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
                <span className="w-40 shrink-0">Species</span>
                <span className="flex-1">Accuracy</span>
                <span className="w-28 shrink-0 text-right">Missed</span>
              </div>

              {/* Rows */}
              {speciesStats.map((s) => {
                const total = s.gotIt + s.notYet;
                const accuracy = Math.round((s.gotIt / total) * 100);
                return (
                  <div
                    key={s.name}
                    className="flex items-center gap-4 p-4 border rounded-2xl border-[#e6d2b9]"
                  >
                    <p className="font-medium w-40 shrink-0 truncate">{s.name}</p>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2c5fca] rounded-full"
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 w-28 shrink-0 text-right">
                      {s.notYet} missed · {accuracy}%
                    </p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      {/* Hotspots tab */}
      {activeTab === "hotspots" && (
        <div className="space-y-3">
          {hotspotStats.length === 0 ? (
            <p className="text-sm text-gray-500">No hotspot sessions yet.</p>
          ) : (
            <>
              {/* Header — rendered once, above the rows */}
              <div className="flex items-start gap-4 px-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
                <span className="w-40 shrink-0">Hotspot</span>
                <span className="flex-1">Accuracy</span>
                <span className="w-28 shrink-0 text-right">Missed</span>
              </div>

              {/* Rows */}
              {hotspotStats.map((h) => {
                const accuracy = h.total > 0 ? Math.round((h.gotIt / h.total) * 100) : 0;
                const missed = h.total - h.gotIt;
                return (
                  <div
                    key={h.name}
                    className="flex items-center gap-4 p-4 border rounded-2xl border-[#e6d2b9]"
                  >
                    <p className="font-medium w-40 shrink-0">{h.name}</p>
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#2c5fca] rounded-full"
                        style={{ width: `${accuracy}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 w-28 shrink-0 text-right">
                      {missed} missed · {accuracy}%
                    </p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}

      <ClearProgressButton />
    </div>
  );
}
