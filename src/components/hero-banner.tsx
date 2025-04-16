interface HeroBannerProps {
  heroTitle: string;
  heroText: string;
  heroImage?: {
    url: string;
  };
}

export default function HeroBanner({ heroTitle, heroText, heroImage }: HeroBannerProps) {
  return (
    <section className="bg-black text-white py-20 px-6 text-center">
      <h1 className="text-4xl font-bold mb-2">{heroTitle}</h1>
      <p className="text-lg max-w-3xl mx-auto mb-6">{heroText}</p>
      {heroImage?.url && (
        <div className="mx-auto w-full max-w-3xl h-72 overflow-hidden rounded shadow-lg">
          <img src={heroImage.url} alt="Hero" className="w-full h-full object-cover" />
        </div>
      )}
    </section>
  );
}
