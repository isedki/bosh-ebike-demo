interface GalleryImage {
  url: string;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
}

export default function Gallery({ images, title = "Gallery" }: GalleryProps) {
  if (images.length === 0) return null;

  return (
    <section className="bg-gray-100 py-12 px-6">
      <h2 className="text-2xl font-semibold text-center mb-6">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={`Gallery ${i + 1}`}
            className="rounded-lg shadow object-cover h-64 w-full"
          />
        ))}
      </div>
    </section>
  );
}
