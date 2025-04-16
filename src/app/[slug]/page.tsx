'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';
import GetProductPageQuery from '@/lib/queries/product-page';
import { fetcher } from '@/lib/utils';
import { ContextSelector } from '@/components/context-selector';
import HeroBanner from '@/components/hero-banner';
import Gallery from '@/components/gallery';
import FeatureHighlight from '@/components/feature-highlight';
import Specifications from '@/components/specifications';
import RecyclingInfo from '@/components/recycling-info';
import Footer from '@/components/footer';
import Downloads from '@/components/downloads';

// Bosch logo (hosted externally or locally in your project)
const BOSCH_LOGO = "Bosch-logo-simple.svg";
const SUPERGRAPHIC = "supergraphic.svg";


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
const [navigationLabel, setNavigationLabel] = useState<string>('');
  const [navigationLinks, setNavigationLinks] = useState<{ title: string; slug: string }[]>([]);

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



  useEffect(() => {
    async function fetchNavigation() {
      const navRes = await fetch('https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/cm9bjc5my00jg07w0pzg0dv0x/master', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NDQzOTM5MzAsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY205YmpjNW15MDBqZzA3dzBwemcwZHYweC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vIiwic3ViIjoiMWQ0NTJlNWYtMDhjZi00YjEyLTg2NGYtYjIxZjYzMmYyOWVlIiwianRpIjoiY205ZDMzdjE2MGEyZjA3dzgyemkwNnp2biJ9.hPQdcohced4nSRFLjmBDsEm6QMWJDEWZJQw4ResPHW8rNwblCYOp4EXH367AS2UBJ8YJrsSZzAeQoUdQkUW8d0FzUz95ZebTuypTF8FRf9iBzKRpzop-MctgUqA7XrNaURhSYlRK9CwjIVcjO8QsCnDLf5XBodOTuQiDYEzKQWoazenRpwKyr7my6z-8pT7Mt4XxvUekT4ukYsXsT25r7DalQsCGC-1jhgnkBG_2jJ336LPCbztQpJ0rx2DVbW_b8oFwgZWQowfZ6S0eHJAcYhKMX6i273xVk7dGK7JxWo7b_IznaqncwEY2-tJ-2R_qNmnv11hj520shHAjf_zZsIGbdjrm_y8_Gzh-yg_Smx58LbYdZnGFcsa-edowGrfbtHNjLXVaA5Pvh4BMENWMbnlFR6QKw0YVDJnKPQktq2-fCWitEEt151tmWsOYiOWNnWY4BKmlQ3Gkzymntnt-4b6WtbP6Hh3aXCZrc-U80BSeibvxmW8OpIqCNgEY1hjGkoX_YpZVHmF4d-7s-kj1MmDqizEal2WNrKf4dmrt-gOABrObs5eAzwYpWx7ZX-mVCKTo-Fengm4trAA-_pIHx6JIoC2123UB8-uH6beO52ry1cQhj73k1TzrPYrX1P0rcZQ6b-fHqzzWpV1SsWpJcliV_19QPe_IqcFjIGjxWag',
        },
        body: JSON.stringify({
          query: `
            query MyQuery {
              navigations(where: {navigationId: "products"}, stage: DRAFT) {
                navigationLinks {
                  productPage {
                    title
                    slug
                  }
                }
                navigationId
              }
            }
          `,
        }),
      });

      const navJson = await navRes.json();
      console.log("Navigation Query Response:", navJson);
      const navigation = navJson.data?.navigations?.[0];

      if (navigation) {
        setNavigationLabel(navigation.navigationId);
        setNavigationLinks(
          navigation.navigationLinks.map((link: any) => link.productPage)
        );
      }
    }

    fetchNavigation();
  }, []);

  const NavigationBar = () => {
    return (
      <header className="p-6 flex items-center justify-between max-w-screen-2xl mx-auto relative">
        <img src={SUPERGRAPHIC} alt="Bosch Supergraphic" className="h-2 w-full absolute top-0 left-0 " />
        <div className="flex items-center space-x-4 max-w-[150px] z-10">
          <a href="/">
            <img src={BOSCH_LOGO} alt="Bosch Logo" className="h-10" />
          </a>
        </div>
<nav className="flex gap-6 font-medium z-10">
  <div className="relative group">
    <span className="text-gray-700 font-bold cursor-pointer">{navigationLabel}</span>
    <div className="absolute left-0 mt-2 hidden group-hover:flex flex-col bg-white shadow-lg rounded z-20">
      {navigationLinks.map((link, i) => (
        <Link
          key={i}
          href={`/${link.slug}`}
          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          {link.title}
        </Link>
      ))}
    </div>
  </div>
  <Link href="#" className="text-gray-700 hover:text-black">Technology</Link>
</nav>

      </header>
    );
  };



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
