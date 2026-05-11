import { createServerSupabaseClient } from "@/lib/supabase-server";
  import { redirect } from "next/navigation";
import ClearProgressButton from "../components/ClearProgressButton";

  export default async function ProgressPage() {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    

    if (!user) redirect("/login");

    const { data: sessions } = await supabase
      .from("study_results")
      .select("*")
      .order("studied_at", { ascending: false });
      
      const missedCount: Record<string, number> = {};

    for(const session of sessions ?? []){
        for(const [speciesCode, status] of Object.entries(session.results)){
            if(status === "not_yet"){
                // increment missed count for this speciesCode
                const commonName = session.species_names?.[speciesCode]?? speciesCode;
                missedCount[commonName] = (missedCount[commonName] ?? 0) + 1;
            }
    }
}
    const sortedMissed = Object.entries(missedCount).sort((a, b) => b[1] - a[1]);

    return (
        <div>
            <p>Sessions studied: {sessions?.length ?? 0}</p>
            <p>Hotspots visited: {new Set(sessions?.map(s => s.hotspot_id)).size}</p>
            {sortedMissed.map(([name, count]) => (
                <div key={name}>
                <h3>{name}</h3>
                <p>Missed: {count}</p>
                </div>
            ))}
            <ClearProgressButton />
        </div>
  );
  }