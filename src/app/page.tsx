'use client';

import React, { useEffect, useState } from 'react';

export default function ProductPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/cm9bjc5my00jg07w0pzg0dv0x/master',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3NDQzOTM5MzAsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vdjIvY205YmpjNW15MDBqZzA3dzBwemcwZHYweC9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC1ldS1jZW50cmFsLTEtc2hhcmVkLWV1YzEtMDIuaHlncmFwaC5jb20vIiwic3ViIjoiMWQ0NTJlNWYtMDhjZi00YjEyLTg2NGYtYjIxZjYzMmYyOWVlIiwianRpIjoiY205ZDMzdjE2MGEyZjA3dzgyemkwNnp2biJ9.hPQdcohced4nSRFLjmBDsEm6QMWJDEWZJQw4ResPHW8rNwblCYOp4EXH367AS2UBJ8YJrsSZzAeQoUdQkUW8d0FzUz95ZebTuypTF8FRf9iBzKRpzop-MctgUqA7XrNaURhSYlRK9CwjIVcjO8QsCnDLf5XBodOTuQiDYEzKQWoazenRpwKyr7my6z-8pT7Mt4XxvUekT4ukYsXsT25r7DalQsCGC-1jhgnkBG_2jJ336LPCbztQpJ0rx2DVbW_b8oFwgZWQowfZ6S0eHJAcYhKMX6i273xVk7dGK7JxWo7b_IznaqncwEY2-tJ-2R_qNmnv11hj520shHAjf_zZsIGbdjrm_y8_Gzh-yg_Smx58LbYdZnGFcsa-edowGrfbtHNjLXVaA5Pvh4BMENWMbnlFR6QKw0YVDJnKPQktq2-fCWitEEt151tmWsOYiOWNnWY4BKmlQ3Gkzymntnt-4b6WtbP6Hh3aXCZrc-U80BSeibvxmW8OpIqCNgEY1hjGkoX_YpZVHmF4d-7s-kj1MmDqizEal2WNrKf4dmrt-gOABrObs5eAzwYpWx7ZX-mVCKTo-Fengm4trAA-_pIHx6JIoC2123UB8-uH6beO52ry1cQhj73k1TzrPYrX1P0rcZQ6b-fHqzzWpV1SsWpJcliV_19QPe_IqcFjIGjxWag',
          },
          body: JSON.stringify({
            query: `
              query GetProductPage {
                productPage(where: { slug: "purion-400" }, stage: DRAFT) {
  title
  heroTitle
  heroText
  heroImage {
    url
  }
  body {
    html
  }
  gallery {
    url
  }
  featureHighlight {
    title
    text {
      html
    }
    ctatext
    ctalink
    image {
      url
    }
  }
  countryVariants {
    country
    localizedContent {
      html
    }
    recyclingSchedule
  }
  downloads {
    label
    file {
      url
    }
    language
  }
  productSpecification {
    icon {
      url
    }
    label
    valueImperial
    valueMetric
  }
  downloads {
                    label
                    file { url }
                    language
                  }
                }
              }
            `,
          }),
        }
      );

      const json = await res.json();
      setData(json.data?.productPage);
    }

    fetchData();
  }, []);

  if (!data) return <div className="p-10 text-center">Loading preview…</div>;

  return (
    <div className="font-sans text-gray-900">
      <section className="bg-black text-white py-20 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">{data.heroTitle}</h1>
        <p className="text-lg max-w-3xl mx-auto mb-6">{data.heroText}</p>
        {data.heroImage?.url && (
          <img
            src={data.heroImage.url}
            alt="Hero"
            className="mx-auto max-w-4xl rounded shadow-lg"
          />
        )}
      </section>

      <section className="py-12 px-6 max-w-3xl mx-auto">
        <div
          className="prose prose-lg"
          dangerouslySetInnerHTML={{ __html: data.body?.html || '' }}
        />
      </section>

      {data.gallery?.length > 0 && (
        <section className="bg-gray-100 py-12 px-6">
          <h2 className="text-2xl font-semibold text-center mb-6">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.gallery.map((img, i) => (
              <img
                key={i}
                src={img.url}
                alt={`Gallery ${i + 1}`}
                className="rounded-lg shadow object-cover h-64 w-full"
              />
            ))}
          </div>
        </section>
      )}

      {data.featureHighlight && (
        <section className="py-20 px-6 bg-gradient-to-r from-green-200 via-white to-green-100">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-10">
            <div className="text-left">
              <h3 className="text-3xl font-extrabold mb-4 text-green-900">
                {data.featureHighlight.title}
              </h3>
              <div
                className="prose prose-lg text-gray-700"
                dangerouslySetInnerHTML={{ __html: data.featureHighlight?.text?.html || '' }}
              />
              {data.featureHighlight.ctatext && data.featureHighlight.ctalink && (
                <a
                  href={data.featureHighlight.ctalink}
                  className="inline-block mt-6 px-5 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.featureHighlight.ctatext}
                </a>
              )}
            </div>
            <div className="text-center">
              {data.featureHighlight.image?.url && (
                <img
                  src={data.featureHighlight.image.url}
                  alt="Feature"
                  className="rounded-xl shadow-2xl max-w-md mx-auto"
                />
              )}
            </div>
          </div>
        </section>
      )}

<section className="py-16 px-6 bg-white">
        <h2 className="text-2xl font-semibold text-center mb-8">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {data.productSpecification?.map((spec, i) => (
            <div key={i} className="flex items-center bg-gray-50 rounded-lg shadow-sm p-4">
              {spec.icon?.url && (
                <img src={spec.icon.url} alt="icon" className="w-12 h-12 mr-4" />
              )}
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
              <p className="mt-2 text-gray-500">Schedule: {v.recyclingSchedule}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8">Downloads</h2>
        <ul className="space-y-4 text-center">
          {data.downloads.map((doc, i) => (
            <li key={i} className="text-blue-700 hover:underline">
              <a href={doc.file?.url || '#'} target="_blank" rel="noopener noreferrer">
                {doc.label} ({doc.language})
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}