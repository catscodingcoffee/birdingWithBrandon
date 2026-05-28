import { NextRequest } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase-server";

interface Detection {
  common_name: string;
  scientific_name: string;
  confidence: number;
}

export async function POST(request: NextRequest) {
  // 1. Check that ?token= matches process.env.BIRDNET_WEBHOOK_SECRET
  //    Return 401 if not
  // Token is gone now


  // 2. Parse the request body as JSON
  //    The field you want is called "message"
  const body = await request.json();
  const appriseResp = body.message;


  // 3. Regex the message to extract comon_name, scientific_name, confidence
  //    Format: "A Orange-crowned Warbler (Leiothlypis celata) was just detected with a confidence of 0.7101"
  //    Return 400 if the regex doesn't match
  
  const match = appriseResp.match(/^A (.+?) \((.+?)\)\s+was just detected with a confidence of ([\d.]+)/)

  if (!match) {
    return Response.json({ error: "Could not parse message" }, { status: 400 })
  }

  const commonName = match[1]
  const sciName = match[2]
  const confidenceLevel = parseFloat(match[3])

  // 4. Create a Supabase client and insert a Detection into the "detections" table
  //    confidence needs parseFloat() since regex gives you a string
  //    Return 500 if there's a Supabase error
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("detections").insert({
    common_name: commonName,
    scientific_name: sciName,
    confidence:confidenceLevel,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }

  // 5. Return a success response
  return Response.json({ ok: true });
}

export async function GET() {
  // 1. Create a Supabase client
  const supabase = await createServerSupabaseClient();

  // 2. Select all columns from "detections", order by detected_at descending, limit 5
  const { data,error } = await supabase
  .from("detections")
  .select("*")
  .order("detected_at",{ascending:false})
  .limit(5);

  // 3. Return 500 if error, otherwise return the data as JSON
  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

 
  return Response.json(data);
}
