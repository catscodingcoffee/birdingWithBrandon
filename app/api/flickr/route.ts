interface FlickrResult {
  title: string;
  link: string;
  media: { m: string };
}

export async function GET() {
    const res = await
  fetch("https://api.flickr.com/services/feeds/photos_public.gne?id=201004382@N04&format=json&nojsoncallback=1",
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) return Response.json({ error: "Picture not found" }, { status: 502 });

    const data = await res.json();

    const photos = data.items.map((item: FlickrResult) => ({
      title: item.title,
      imageUrl: item.media.m.replace("_m.", "_b."),  // upgrade to large size
      link: item.link
    }));

    return Response.json(photos);
  }