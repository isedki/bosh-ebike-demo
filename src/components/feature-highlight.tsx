import React from 'react';

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
}

export default function FeatureHighlight({ features }: FeatureHighlightProps) {
  if (features.length === 0) return null;

  return (
    <section className="py-20 px-6 bg-gradient-to-r from-green-200 via-white to-green-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-900">Highlights</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feat, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-6 gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-green-800 mb-2">{feat.title || 'Default Feature Title'}</h3>
                <div
                  className="prose prose-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: feat.text?.html || '<p>Default description goes here.</p>' }}
                />
                {feat.ctatext && feat.ctalink && (
                  <a
                    href={feat.ctalink}
                    className="inline-block mt-4 px-4 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {feat.ctatext}
                  </a>
                )}
              </div>
              {feat.image?.url && (
                <img src={feat.image.url} alt={`Feature ${i}`} className="rounded-lg shadow-md w-48 h-36 object-cover" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
