import { NextRequest } from "next/server";

interface EBirdObs {
  speciesCode: string;
  comName: string;
  sciName: string;
}

interface WikiSummary {
  extract?: string;
  thumbnail?: { source: string };
  content_urls?: { desktop: { page: string } };
}

async function fetchWikiInfo(comName: string) {
  // Strip parenthetical qualifiers like "(Audubon's)" that break title lookup
  const cleanName = comName.replace(/\s*\(.*?\)\s*/g, "").trim();
  const namesToTry = Array.from(new Set([cleanName, comName]));

  for (const name of namesToTry) {
    try {
      const title = encodeURIComponent(name.replace(/ /g, "_"));
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`,
        {
          headers: { "User-Agent": "BirdingWithBrandon/1.0 (birdingwithbrandon.com)" },
          next: { revalidate: 86400 },
        }
      );
      if (!res.ok) continue;
      const data: WikiSummary = await res.json();
      return {
        imageUrl: data.thumbnail?.source ?? null,
        description: data.extract ?? null,
        wikiUrl: data.content_urls?.desktop.page ?? null,
      };
    } catch {
      continue;
    }
  }
  return { imageUrl: null, description: null, wikiUrl: null };
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
      const wiki = await fetchWikiInfo(bird.comName);
      return { ...bird, ...wiki };
    })
  );

  return Response.json(birds);
}
