import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface GalleryImage {
  url: string;
  alt?: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: GalleryImage[];
  title?: string;
}

export default function Gallery({ images, title }: GalleryProps) {
  const [index, setIndex] = useState(-1);

  if (images.length === 0) return null;

  const slides = images.map((image) => ({
    src: image.url,
    alt: image.alt,
    width: image.width,
    height: image.height,
  }));

  return (
    <section className="bg-white py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {title && <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{title}</h2>}
        <div className="grid grid-cols-4 gap-4">
          {/* First image spanning two columns */}
          <div
            className="col-span-2 row-span-2 relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setIndex(0)}
          >
            <img
              src={images[0].url}
              alt={images[0].alt || "Gallery image 1"}
              width={images[0].width}
              height={images[0].height}
              className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
              loading="eager"
              decoding="async"
              style={{ 
                WebkitFontSmoothing: 'antialiased',
                backfaceVisibility: 'hidden'
              }}
            />
          </div>
          
          {/* Rest of the images */}
          {images.slice(1).map((image, idx) => (
            <div
              key={idx + 1}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => setIndex(idx + 1)}
            >
              <img
                src={image.url}
                alt={image.alt || `Gallery image ${idx + 2}`}
                width={image.width}
                height={image.height}
                className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                loading="lazy"
                decoding="async"
                style={{ 
                  imageRendering: 'smooth',
                  WebkitFontSmoothing: 'antialiased',
                  backfaceVisibility: 'hidden'
                }}
              />
            </div>
          ))}
        </div>

        <Lightbox
          slides={slides}
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          carousel={{
            preload: 3,
            imageFit: "contain"
          }}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null
          }}
        />
      </div>
    </section>
  );
}
