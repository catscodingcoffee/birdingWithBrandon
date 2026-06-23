import { createServerSupabaseClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import ProgressDashboard from "../components/ProgressDashboard";

export default async function ProgressPage() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: sessions } = await supabase
    .from("study_results")
    .select("*")
    .order("studied_at", { ascending: false });

  const allSessions = sessions ?? [];

  // --- Summary stats ---
  const totalSessions = allSessions.length;
  const uniqueHotspots = new Set(allSessions.map((s) => s.hotspot_id)).size;

  const allAttempts = allSessions.flatMap((s) => Object.values(s.results) as string[]);
  const totalAttempts = allAttempts.length;
  const totalGotIt = allAttempts.filter((r) => r === "got_it").length;
  const overallAccuracy = totalAttempts > 0
    ? Math.round((totalGotIt / totalAttempts) * 100)
    : 0;

  // --- Species aggregation ---
  const speciesMap: Record<string, { name: string; gotIt: number; notYet: number }> = {};

  for (const session of allSessions) {
    for (const [code, status] of Object.entries(session.results as Record<string, string>)) {
      const name = session.species_names?.[code] ?? code;
      if (!speciesMap[code]) speciesMap[code] = { name, gotIt: 0, notYet: 0 };
      if (status === "got_it") speciesMap[code].gotIt++;
      else speciesMap[code].notYet++;
    }
  }

  const uniqueSpecies = Object.keys(speciesMap).length;

  const speciesStats = Object.values(speciesMap)
    //.filter((s) => s.notYet > 0)
    .sort((a, b) => b.notYet - a.notYet);

  // --- Hotspot aggregation ---
  const hotspotMap: Record<string, { name: string; sessions: number; gotIt: number; total: number }> = {};

  for (const session of allSessions) {
    const id = session.hotspot_id;
    const name = session.hotspot_name ?? id;
    if (!hotspotMap[id]) hotspotMap[id] = { name, sessions: 0, gotIt: 0, total: 0 };
    hotspotMap[id].sessions++;
    for (const status of Object.values(session.results as Record<string, string>)) {
      hotspotMap[id].total++;
      if (status === "got_it") hotspotMap[id].gotIt++;
    }
  }

  const hotspotStats = Object.values(hotspotMap).sort((a, b) => b.sessions - a.sessions);

  return (
    <ProgressDashboard
      summary={{ totalSessions, uniqueHotspots, uniqueSpecies, overallAccuracy }}
      speciesStats={speciesStats}
      hotspotStats={hotspotStats}
    />
  );
}
