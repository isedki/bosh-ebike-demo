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
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          {features.map((feat, i) => (
            <div key={i} className="flex items-start gap-6 bg-gray-50 p-6 rounded-lg">
              {feat.image?.url && (
                <div className="w-12 h-12 flex-shrink-0 text-gray-900">
                  <img src={feat.image.url} alt={feat.title} className="w-full h-full" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{feat.title}</h3>
                <div
                  className="text-gray-600"
                  dangerouslySetInnerHTML={{ __html: feat.text?.html || '' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
