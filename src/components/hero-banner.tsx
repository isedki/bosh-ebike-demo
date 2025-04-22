interface HeroBannerProps {
  heroTitle: string;
  heroText: string;
  heroImage?: {
    url: string;
  };
  entryId: string;
}

export default function HeroBanner({
  heroTitle,
  heroText,
  heroImage,
  entryId,
}: HeroBannerProps) {
  return (
    <section className="relative bg-white text-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1
            className="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900"
            data-hygraph-entry-id={entryId}
            data-hygraph-field-api-id="heroTitle"
            data-hygraph-entry-locale="en"
          >
            {heroTitle}
          </h1>
          <p
            className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            data-hygraph-entry-id={entryId}
            data-hygraph-field-api-id="heroText"
            data-hygraph-entry-locale="en"
          >
            {heroText}
          </p>
        </div>
        {heroImage?.url && (
          <div
            className="mx-auto w-full max-w-4xl h-96 overflow-hidden rounded-2xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300"
            data-hygraph-entry-id={entryId}
            data-hygraph-field-api-id="heroImage"
            data-hygraph-entry-locale="en"
          >
            <img
              src={heroImage.url}
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
    </section>
  );
}
