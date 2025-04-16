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
import Specifications from '@/components/specifications';
import RecyclingInfo from '@/components/recycling-info';
import Footer from '@/components/footer';

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

        <Specifications specifications={data.productSpecification} />

        <RecyclingInfo 
          sharedRecyclingInfo={data.sharedRecyclingInfo}
          countryVariants={data.countryVariants}
          selectedCountry={selectedCountry}
        />

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
      
      <Footer />



    </>
  );
}
