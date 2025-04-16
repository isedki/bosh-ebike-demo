interface HeroBannerFullScreenProps {
  heroTitle: string;
  heroText: string;
  heroImage?: {
    url: string;
  };
  mimeType?: string;
}

export default function HeroBannerFullScreen({ heroTitle, heroText, heroImage, mimeType }: HeroBannerFullScreenProps) {
  
  const isVideo = mimeType && mimeType.includes('video');
  
  return (
    <>
      <section className="w-screen h-screen bg-black absolute top-0 left-0 z-0">
        {isVideo ? (
          <video 
            src={heroImage?.url} 
            className="w-full h-full object-cover" 
            muted 
            autoPlay 
            loop
          />
        ) : (
          <img 
            src={heroImage?.url} 
            alt="Hero" 
            className="w-screen h-screen object-cover" 
          />
        )}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-5xl font-bold mb-2">{heroTitle}</h1>
          <p className="text-lg max-w-3xl mx-auto mb-6">{heroText}</p>
        </div>
      </section>
      <div className="w-screen h-screen bg-black relative hidden top-0 left-0 z-0">
      </div>
    </>
  );
}
