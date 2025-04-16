'use client';

import React, { useEffect, useState } from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';
import GetProductPageQuery from '@/lib/queries/product-page';
import { fetcher } from '@/lib/utils';
import NavigationBar from '@/components/navigation-bar';
import { ContextSelector } from '@/components/context-selector';
import HeroBanner from '@/components/hero-banner';
import Gallery from '@/components/gallery';
import FeatureHighlight from '@/components/feature-highlight';
import Specifications from '@/components/specifications';
import RecyclingInfo from '@/components/recycling-info';
import Footer from '@/components/footer';
import Downloads from '@/components/downloads';

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
  const [locale, setLocale] = useState<'en' | 'de' | 'fr' | 'it'>('en');
  const [selectedCountry, setSelectedCountry] = useState<'fr' | 'de'>('fr');
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


    console.log(data);


  if (!data) return <div className="p-10 text-center">Loading preview…</div>;

  return (
    <>
      <NavigationBar />
      <ContextSelector onCountryChange={setSelectedCountry} onLanguageChange={setLocale}/>
      <div className="font-sans text-gray-900">
        <HeroBanner heroTitle={data.heroTitle} heroText={data.heroText} heroImage={data.heroImage} />

        {data.body?.raw && Object.keys(data.body.raw).length > 0 && (
          <section className="py-12 px-6 max-w-3xl mx-auto">
            <div className="prose prose-lg">
              <RichText content={data.body.raw} />
            </div>
          </section>
        )}

        <Gallery images={data.gallery} />

        <FeatureHighlight features={data.featureHighlight} />

        <Specifications specifications={data.productSpecification} />

        <RecyclingInfo 
          sharedRecyclingInfo={data.sharedRecyclingInfo}
          countryVariants={data.countryVariants}
          selectedCountry={selectedCountry}
        />

        <Downloads downloads={data.downloads} />
      </div>
      
      <Footer />



    </>
  );
}
