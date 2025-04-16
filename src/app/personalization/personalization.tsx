'use client';

import React, { useEffect, useState } from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';
import { RichTextContent } from '@graphcms/rich-text-types';

const BOSCH_LOGO = "/bosch-logo.png";

type RecyclingContent = {
  sharedRecyclingInfo: { raw: RichTextContent };
  countryVariants: {
    country: string;
    localizedContent: { html: string };
    recyclingSchedule: string | {
      title: string;
      note: string;
      schedule: { item: string; day: string }[];
    };
  }[];
};

export default function PersonalizationPage() {
  const [selectedCountry, setSelectedCountry] = useState<'fr' | 'de' | 'ch'>('de');
  const [userGroup, setUserGroup] = useState<'commuter' | 'athlete' | 'senior'>('commuter');
  const [data, setData] = useState<RecyclingContent | null>(null);

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
              query GetPersonalizationData($locale: Locale!) {
                productPage(where: { slug: "purion-400" }, stage: DRAFT, locales: [$locale]) {
                  sharedRecyclingInfo { raw }
                  countryVariants {
                    country
                    localizedContent { html }
                    recyclingSchedule
                  }
                }
              }
            `,
            variables: { locale: selectedCountry },
          }),
        }
      );

      const json = await res.json();
      setData(json.data?.productPage);
    }

    fetchData();
  }, [selectedCountry]);

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <header className="bg-white shadow py-4 px-6 flex items-center justify-between">
        <img src={BOSCH_LOGO} alt="Bosch Logo" className="h-10" />
        <nav className="space-x-6 font-medium">
          <a href="#" className="text-gray-700 hover:text-black">Home</a>
          <a href="#" className="text-gray-700 hover:text-black">Products</a>
          <a href="#" className="text-gray-700 hover:text-black">Support</a>
        </nav>
      </header>

      <main className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-10">Personalized Experience</h1>

        <div className="mb-6">
          <label className="mr-3 font-medium text-gray-700">Select Country:</label>
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value as 'fr' | 'de' | 'ch')}
            className="border px-3 py-2 rounded shadow-sm"
          >
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="ch">Switzerland</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="mr-3 font-medium text-gray-700">Select User Group:</label>
          <select
            value={userGroup}
            onChange={(e) => setUserGroup(e.target.value as 'commuter' | 'athlete' | 'senior')}
            className="border px-3 py-2 rounded shadow-sm"
          >
            <option value="commuter">Commuter</option>
            <option value="athlete">Athlete</option>
            <option value="senior">Senior</option>
          </select>
        </div>

        {data && (
          <div className="mt-12 text-left">
            <h2 className="text-xl font-semibold mb-4">Recycling Information</h2>
            <div className="prose max-w-none mb-8">
              <RichText content={data.sharedRecyclingInfo?.raw || []} />
            </div>

            {data.countryVariants
              .filter((v) => v.country.toLowerCase().includes(selectedCountry))
              .map((v, i) => (
                <div key={i} className="bg-gray-50 p-6 rounded-lg shadow mb-6">
                  <div dangerouslySetInnerHTML={{ __html: v.localizedContent?.html || '' }} />
                  {typeof v.recyclingSchedule === 'string' ? (
                    <p className="mt-2 text-gray-500">Schedule: {v.recyclingSchedule}</p>
                  ) : (
                    <div className="mt-2 text-gray-500">
                      <strong>{v.recyclingSchedule.title}</strong>
                      <ul className="list-disc list-inside">
                        {v.recyclingSchedule.schedule.map((item, j) => (
                          <li key={j}>{item.item}: {item.day}</li>
                        ))}
                      </ul>
                      <p className="italic text-sm mt-1">{v.recyclingSchedule.note}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </main>

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
    </div>
  );
}
