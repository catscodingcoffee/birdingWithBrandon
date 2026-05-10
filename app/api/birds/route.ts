import { NextRequest } from "next/server";
import { fetchWikiInfo } from "@/lib/wiki";

interface EBirdObs {
  speciesCode: string;
  comName: string;
  sciName: string;
}


export async function GET(request: NextRequest) {
  const locId = new URL(request.url).searchParams.get("locId");
  if (!locId)
    return Response.json({ error: "locId is required" }, { status: 400 });

  const apiKey = process.env.EBIRD_API_KEY;
  if (!apiKey)
    return Response.json({ error: "eBird API key not configured" }, { status: 500 });

  const eBirdRes = await fetch(
    `https://api.ebird.org/v2/data/obs/${locId}/recent?maxResults=100&back=30`,
    { headers: { "X-eBirdApiToken": apiKey } }
  );

  if (!eBirdRes.ok)
    return Response.json({ error: "Failed to fetch birds from eBird" }, { status: 502 });

  const obs: EBirdObs[] = await eBirdRes.json();

  // Deduplicate by speciesCode, cap at 30 cards
  const seen = new Set<string>();
  const unique = obs.filter((o) => {
    if (seen.has(o.speciesCode)) return false;
    seen.add(o.speciesCode);
    return true;
  }).slice(0, 30);

  const birds = await Promise.all(
    unique.map(async (bird) => {
      const wiki = await fetchWikiInfo(bird.comName, bird.sciName);
      return { ...bird, ...wiki };
    })
  );

  return Response.json(birds.filter(b => b.imageUrl !== null));
}
