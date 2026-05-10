interface WikiSummary {
  extract?: string;
  thumbnail?: { source: string };
  content_urls?: { desktop: { page: string } };
  title?: string;
}

interface WikiPageImages {
  query?: {
    pages?: Record<string, { thumbnail?: { source: string } }>;
  };
}

export async function fetchWikiPageImage(title: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=500&origin=*`,
      {
        headers: { "User-Agent": "BirdingWithBrandon/1.0 (birdingwithbrandon.com)" },
        next: { revalidate: 86400 },
      }
    );
    if (!res.ok) return null;
    const data: WikiPageImages = await res.json();
    const pages = data.query?.pages ?? {};
    const page = Object.values(pages)[0];
    return page?.thumbnail?.source ?? null;
  } catch {
    return null;
  }
}

export async function fetchWikiInfo(comName: string, sciName: string) {
  // Strip parenthetical qualifiers like "(Audubon's)" that break title lookup
  const cleanName = comName.replace(/\s*\(.*?\)\s*/g, "").trim();
  const namesToTry = Array.from(new Set([cleanName, comName, sciName]));

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
      const resolvedTitle = data.title ?? title;
      const imageUrl = data.thumbnail?.source ?? await fetchWikiPageImage(resolvedTitle);
      return {
        imageUrl,
        description: data.extract ?? null,
        wikiUrl: data.content_urls?.desktop.page ?? null,
      };
    } catch {
      continue;
    }
  }
  return { imageUrl: null, description: null, wikiUrl: null };
}