import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = new URL(request.url).searchParams;
  const lat = params.get("lat");
  const lng = params.get("lng");
  const dist = params.get("dist") ?? "25";

  if (!lat || !lng)
    return Response.json({ error: "lat and lng are required" }, { status: 400 });

  const apiKey = process.env.EBIRD_API_KEY;
  if (!apiKey)
    return Response.json({ error: "eBird API key not configured" }, { status: 500 });

  const res = await fetch(
    `https://api.ebird.org/v2/ref/hotspot/geo?lat=${lat}&lng=${lng}&dist=${dist}&back=30&fmt=json`,
    { headers: { "X-eBirdApiToken": apiKey } }
  );

  if (!res.ok)
    return Response.json({ error: "Failed to fetch hotspots from eBird" }, { status: 502 });

  const hotspots = await res.json();
  return Response.json(hotspots);
}
