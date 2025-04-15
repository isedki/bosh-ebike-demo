'use client';

import React, { useEffect, useState } from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';

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
  countryVariants: {
    country: string;
    recyclingSchedule: string | { title: string; note: string; schedule: { item: string; day: string }[] };
    localizedContent: {
      html: string;
    };
  }[];
};

export default function ProductPage() {
  const [locale, setLocale] = useState<'en' | 'de' | 'fr' | 'it'>('de');
  const [data, setData] = useState<ProductPageData | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/cm9bjc5my00jg07w0pzg0dv0x/master',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NDQzOTM5MzAsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY205YmpjNW15MDBqZzA3dzBwemcwZHYweC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vIiwic3ViIjoiMWQ0NTJlNWYtMDhjZi00YjEyLTg2NGYtYjIxZjYzMmYyOWVlIiwianRpIjoiY205ZDMzdjE2MGEyZjA3dzgyemkwNnp2biJ9.hPQdcohced4nSRFLjmBDsEm6QMWJDEWZJQw4ResPHW8rNwblCYOp4EXH367AS2UBJ8YJrsSZzAeQoUdQkUW8d0FzUz95ZebTuypTF8FRf9iBzKRpzop-MctgUqA7XrNaURhSYlRK9CwjIVcjO8QsCnDLf5XBodOTuQiDYEzKQWoazenRpwKyr7my6z-8pT7Mt4XxvUekT4ukYsXsT25r7DalQsCGC-1jhgnkBG_2jJ336LPCbztQpJ0rx2DVbW_b8oFwgZWQowfZ6S0eHJAcYhKMX6i273xVk7dGK7JxWo7b_IznaqncwEY2-tJ-2R_qNmnv11hj520shHAjf_zZsIGbdjrm_y8_Gzh-yg_Smx58LbYdZnGFcsa-edowGrfbtHNjLXVaA5Pvh4BMENWMbnlFR6QKw0YVDJnKPQktq2-fCWitEEt151tmWsOYiOWNnWY4BKmlQ3Gkzymntnt-4b6WtbP6Hh3aXCZrc-U80BSeibvxmW8OpIqCNgEY1hjGkoX_YpZVHmF4d-7s-kj1MmDqizEal2WNrKf4dmrt-gOABrObs5eAzwYpWx7ZX-mVCKTo-Fengm4trAA-_pIHx6JIoC2123UB8-uH6beO52ry1cQhj73k1TzrPYrX1P0rcZQ6b-fHqzzWpV1SsWpJcliV_19QPe_IqcFjIGjxWag',
          },
          body: JSON.stringify({
            query: `
              query GetProductPage($locale: Locale!) {
                productPage(where: { slug: "purion-400" }, stage: DRAFT, locales: [$locale]) {
                  title
                  heroTitle
                  heroText
                  heroImage { url }
                  body { raw }
                  gallery { url }
                  featureHighlight {
                    title
                    text { html }
                    ctatext
                    ctalink
                    image { url }
                  }
                  countryVariants {
                    country
                    recyclingSchedule
                    localizedContent { html }
                  }
                  downloads {
                    label
                    file { url }
                    language
                  }
                  productSpecification {
                    icon { url }
                    label
                    valueImperial
                    valueMetric
                  }
                }
              }
            `,
            variables: { locale }
          }),
        }
      );

      const json = await res.json();
      console.log(json);
      if (json.data?.productPage) {
        setData(json.data.productPage as ProductPageData);
      }
    }

    fetchData();
 }, [locale]);

  if (!data) return <div className="p-10 text-center">Loading preview…</div>;

  return (
    <>
      <div className="text-center py-4">
        <label className="mr-2 font-medium">Select Language:</label>
        <select
          value={locale}
          onChange={(e) => setLocale(e.target.value as any)}
          className="border px-2 py-1 rounded"
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="fr">Français</option>
          <option value="it">Italiano</option>
        </select>
      </div>
      <div className="font-sans text-gray-900">
      <section className="bg-black text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">{data.heroTitle}</h1>
        <p className="text-lg max-w-3xl mx-auto mb-6">{data.heroText}</p>
        {data.heroImage?.url && (
          <div className="mx-auto w-full max-w-3xl h-72 overflow-hidden rounded shadow-lg">
  <img src={data.heroImage.url} alt="Hero" className="w-full h-full object-cover" />
</div>
        )}
      </section>

      <section className="py-12 px-6 max-w-3xl mx-auto">
  <div className="prose prose-lg">
    <RichText content={data.body.raw} />
  </div>
</section>

      {data.gallery?.length > 0 && (
        <section className="bg-gray-100 py-12 px-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.gallery.map((img, i) => (
              <img key={i} src={img.url} alt={`Gallery ${i + 1}`} className="rounded-lg shadow object-cover h-64 w-full" />
            ))}
          </div>
        </section>
      )}

      {data.featureHighlight?.length > 0 && (
        <section className="py-20 px-6 bg-gradient-to-r from-green-200 via-white to-green-100">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-900">Highlights</h2>
            <div className="grid md:grid-cols-2 gap-12">
              {data.featureHighlight.map((feat, i) => (
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
      )}

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

      <section className="py-16 px-6 bg-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-8">Recycling Info by Region</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.countryVariants.map((v, i) => (
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
    </>
  );
}
