import React from "react";

interface FeatureHighlight {
  title?: string;
  text?: {
    html: string;
  };
  ctatext?: string;
  ctalink?: string;
  image?: {
    url: string;
  };
}

interface FeatureHighlightProps {
  features: FeatureHighlight[];
  entryId: string;
}

export default function FeatureHighlight({
  features,
  entryId,
}: FeatureHighlightProps) {
  if (features.length === 0) return null;

  return (
    <section className="py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">Highlights</h2>
        <div
          className="grid md:grid-cols-2 gap-12"
          data-hygraph-entry-id={entryId}
          data-hygraph-field-api-id="featureHighlight"
          data-hygraph-entry-locale="en"
        >
          {features.map((feat, i) => (
            <div key={i} className="flex gap-6 bg-gray-50 p-6 rounded-lg">
              {feat.image?.url && (
                <div className="w-24 h-24 flex-shrink-0 text-gray-900">
                  <img
                    src={feat.image.url}
                    alt={feat.title}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {feat.title}
                </h3>
                <div
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: feat.text?.html || "" }}
                />
                {feat.ctatext && feat.ctalink && (
                  <div className="mt-4 flex justify-start">
                    <a
                      href={feat.ctalink}
                      className="px-3 py-1.5 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                      {feat.ctatext}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
