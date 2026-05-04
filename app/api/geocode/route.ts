import { NextRequest } from "next/server";

interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

export async function GET(request: NextRequest) {
  const q = new URL(request.url).searchParams.get("q");
  if (!q) return Response.json({ error: "q is required" }, { status: 400 });

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`,
    { headers: { "User-Agent": "BirdingWithBrandon/1.0 (birdingwithbrandon.com)" } }
  );

  if (!res.ok) return Response.json({ error: "Geocoding failed" }, { status: 502 });

  const results: NominatimResult[] = await res.json();
  if (results.length === 0)
    return Response.json({ error: "Location not found" }, { status: 404 });

  const { lat, lon, display_name } = results[0];
  return Response.json({ lat: parseFloat(lat), lng: parseFloat(lon), displayName: display_name });
}
