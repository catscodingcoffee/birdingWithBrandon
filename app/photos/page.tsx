import PhotoGrid from "../components/PhotoGrid";

interface FlickrResult {
  title: string;
  link: string;
  media: { m: string };
}

export default async function PhotosPage() {
    const res = await
  fetch("https://api.flickr.com/services/feeds/photos_public.gne?id=201004382@N04&set=72177720333606519&format=json&nojsoncallback=1&set=72177720333606519",
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) return <p>Failed to load photos.</p>;

    const data = await res.json();

    const photos = data.items.map((item: FlickrResult) => ({
      title: item.title,
      imageUrl: item.media.m.replace("_m.", "_b."),  // upgrade to large size
      link: item.link
    }));

    return (
        <div className = "">
            <PhotoGrid photos={photos} />
        </div>
    );
  }