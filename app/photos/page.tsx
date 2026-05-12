import PhotoGrid from "../components/PhotoGrid";

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
}

export default async function PhotosPage() {
    const res = await fetch(
      "https://res.cloudinary.com/dl8hrku6q/image/list/bird.json",
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) return <p>Failed to load photos.</p>;

    const data = await res.json();

    const photos = (data.resources as CloudinaryResource[]).map((item) => ({
      title: (item.public_id.split("/").pop() ?? item.public_id)
        .replace(/[-_]\d+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      imageUrl: item.secure_url,
      link: item.secure_url,
    }));

    return (
        <div className = "">
            <PhotoGrid photos={photos} />
        </div>
    );
  }