'use client';

import React, { useEffect, useState } from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';
import GetProductPageQuery from '@/lib/queries/product-page.gql';
import { fetcher } from '@/lib/utils';
import NavigationBar from '@/components/navigation-bar';
import { ContextSelector } from '@/components/context-selector';
import HeroBanner from '@/components/hero-banner';
import Gallery from '@/components/gallery';
import FeatureHighlight from '@/components/feature-highlight';

// Bosch logo (hosted externally or locally in your project)



type ProductPage = {
  productPage: ProductPageData;
}

type ProductPageData = {
  title: string;
  heroTitle: string;
  heroText: string;
  heroImage: { url: string };
  body: { raw: RichTextContent };
  gallery: { url: string }[];
  featureHighlight: {
    title: string;
    text: { html: string };
    ctatext?: string;
    ctalink?: string;
    image?: { url: string };
  }[];
  productSpecification: {
    label: string;
    icon?: { url: string };
    valueImperial: string;
    valueMetric: string;
  }[];
  downloads: {
    label: string;
    file: { url: string };
    language: string;
  }[];
  sharedRecyclingInfo: { raw: RichTextContent };
  countryVariants: {
    country: string;
    recyclingSchedule: string | { title: string; note: string; schedule: { item: string; day: string }[] };
    localizedContent: {
      html: string;
    };
  }[];
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default function ProductPage({ params }: Props) {
  const [locale, setLocale] = useState<'en' | 'de' | 'fr' | 'it'>('de');
  const [selectedCountry, setSelectedCountry] = useState<'fr' | 'de'>('de');
  const [data, setData] = useState<ProductPageData | null>(null);

  // Unwrap the params promise using React.use()
  const { slug } = React.use(params);

  console.log(slug);

  useEffect(() => {
    async function fetchData() {
      const response = await fetcher<ProductPage>(GetProductPageQuery, { locale, slug });
      setData(response.productPage);
    }
    fetchData();
  }, [locale, slug]);




  if (!data) return <div className="p-10 text-center">Loading preview…</div>;

  return (
    <>
      <NavigationBar />
      <ContextSelector onCountryChange={setSelectedCountry} onLanguageChange={setLocale}/>
      <div className="font-sans text-gray-900">
        <HeroBanner heroTitle={data.heroTitle} heroText={data.heroText} heroImage={data.heroImage} />

        <section className="py-12 px-6 max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <RichText content={data.body.raw} />
          </div>
        </section>

        <Gallery images={data.gallery} />

        <FeatureHighlight features={data.featureHighlight} />

        <section className="py-16 px-6 bg-white">
          <h2 className="text-2xl font-semibold text-center mb-8">Specifications</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {data.productSpecification?.map((spec, i) => (
              <div key={i} className="flex items-center bg-gray-50 rounded-lg shadow-sm p-4">
                {spec.icon?.url && <img src={spec.icon.url} alt="icon" className="w-12 h-12 mr-4" />}
                <div>
                  <p className="text-sm text-gray-600">{spec.label}</p>
                  <p className="text-md font-semibold">
                    {spec.valueMetric} <span className="text-gray-400">/ {spec.valueImperial}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="font-sans text-gray-900">
          <section className="py-16 px-6 bg-gray-100">
            <h2 className="text-2xl font-semibold text-center mb-8">Recycling Info by Region</h2>


            <div className="prose text-sm max-w-4xl mx-auto mb-10">
              <RichText content={data.sharedRecyclingInfo.raw} />
            </div>


            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {data.countryVariants
                .filter((v) => v.country.toLowerCase().includes(selectedCountry))
                .map((v, i) => (
                  <div key={i} className="bg-white p-6 rounded shadow text-sm">
                    <h4 className="text-lg font-bold mb-2 uppercase">{v.country}</h4>
                    <div
                      className="prose text-sm"
                      dangerouslySetInnerHTML={{ __html: v.localizedContent?.html || '' }}
                    />
                    {typeof v.recyclingSchedule === 'string' ? (
                      <p className="mt-2 text-gray-500">Schedule: {v.recyclingSchedule}</p>
                    ) : (
                      <div className="mt-2 text-gray-500">
                        <h5 className="font-semibold">{v.recyclingSchedule.title}</h5>
                        <ul className="list-disc list-inside">
                          {v.recyclingSchedule.schedule.map((entry, idx) => (
                            <li key={idx}>
                              {entry.item}: {entry.day}
                            </li>
                          ))}
                        </ul>
                        <p className="text-sm italic mt-2">{v.recyclingSchedule.note}</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </section>
        </div>

        {data.downloads?.length > 0 && (
          <section className="py-16 px-6 max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8">Downloads</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {data.downloads.map((doc, i) => (
                <a
                  key={i}
                  href={doc.file?.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 rounded-lg bg-white shadow text-center hover:shadow-md border border-gray-100 transition"
                >
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-blue-500 mb-2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4m-8 6h8a2 2 0 002-2V7a2 2 0 00-2-2h-1" />
                    </svg>
                    <p className="font-medium text-blue-700 mb-1">{doc.label}</p>
                    <p className="text-xs text-gray-500">{doc.language}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
      {/* Footer */}
      <footer className="bg-gray-900 text-white text-sm py-6 px-6 mt-16">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Bosch eBike Systems. All rights reserved.</p>
          <div className="space-x-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>

    </>
  );
}
