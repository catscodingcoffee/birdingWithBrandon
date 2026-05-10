import { NextRequest } from "next/server";
  import { createServerSupabaseClient } from "@/lib/supabase-server";

  export async function POST(request: NextRequest) {
    const supabase = await createServerSupabaseClient();
    const response = await supabase.auth.getUser();
    const user = response.data.user;

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { hotspotId, hotspotName, results, speciesNames } = await request.json();

    const { error } = await supabase.from("study_results").insert({
      user_id: user.id,
      hotspot_id: hotspotId,
      hotspot_name: hotspotName,
      species_names: speciesNames,
      results,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ ok: true });
  }

  export async function DELETE() {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

    const { error } = await supabase
      .from("study_results")
      .delete()
      .eq("user_id", user.id);

    if (error) return Response.json({ error: error.message }, { status: 500 });

    return Response.json({ ok: true });
  }
