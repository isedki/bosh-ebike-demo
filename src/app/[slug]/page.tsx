"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { RichTextContent } from "@graphcms/rich-text-types";
import GetProductPageQuery from "@/lib/queries/product-page";
import { fetcher } from "@/lib/utils";
import { ContextSelector } from "@/components/context-selector";
import HeroBanner from "@/components/hero-banner";
import Gallery from "@/components/gallery";
import FeatureHighlight from "@/components/feature-highlight";
import Specifications from "@/components/specifications";
import RecyclingInfo from "@/components/recycling-info";
import Footer from "@/components/footer";
import Downloads from "@/components/downloads";
import { RichTextWrapper } from "@/components/rich-text-wrapper";
import NavigationBar from "@/components/navigation-bar";

// Bosch logo (hosted externally or locally in your project)
const BOSCH_LOGO = "bosch-logo-simple.svg";
const SUPERGRAPHIC = "supergraphic.svg";

type ProductPage = {
  productPage: ProductPageData;
};

type ProductPageData = {
  id: string;
  title: string;
  heroTitle: string;
  heroText: string;
  heroImage: { url: string };
  body: { raw: RichTextContent; text: string };
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
    flag: { url: string };
    recyclingSchedule:
      | string
      | {
          title: string;
          note: string;
          schedule: { item: string; day: string }[];
        };
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
  const [locale, setLocale] = useState<"en" | "de" | "fr" | "it">("en");
  const [selectedCountry, setSelectedCountry] = useState<"france" | "germany">(
    "france"
  );
  const [data, setData] = useState<ProductPageData | null>(null);

  // Unwrap the params promise using React.use()
  const { slug } = React.use(params);

  useEffect(() => {
    async function fetchData() {
      const response = await fetcher<ProductPage>(GetProductPageQuery, {
        locale,
        slug,
      });
      setData(response.productPage);
    }
    fetchData();
  }, [locale, slug]);

  if (!data) return <div className="p-10 text-center">Loading preview…</div>;

  return (
    <>
      <NavigationBar />
      <ContextSelector
        onCountryChange={setSelectedCountry}
        onLanguageChange={setLocale}
      />
      <div className="font-sans text-gray-900">
        <HeroBanner
          entryId={data.id}
          heroTitle={data.heroTitle}
          heroText={data.heroText}
          heroImage={data.heroImage}
        />

        {data.body?.raw &&
          Object.keys(data.body.raw).length > 0 &&
          data.body.text !== "" && (
            <section
              className="py-12 px-6 max-w-3xl mx-auto"
              data-hygraph-entry-id={data.id}
              data-hygraph-field-api-id="body"
              data-hygraph-entry-locale="en"
            >
              <RichTextWrapper content={data.body.raw} />
            </section>
          )}

        <Gallery entryId={data.id} images={data.gallery} />

        <FeatureHighlight entryId={data.id} features={data.featureHighlight} />

        <Specifications
          entryId={data.id}
          specifications={data.productSpecification}
        />

        <RecyclingInfo
          entryId={data.id}
          sharedRecyclingInfo={data.sharedRecyclingInfo}
          countryVariants={data.countryVariants}
          selectedCountry={selectedCountry}
        />

        <Downloads entryId={data.id} downloads={data.downloads} />
      </div>

      <Footer />
    </>
  );
}
