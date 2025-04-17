"use client"
import { ContextSelector } from '@/components/context-selector';
import NavigationBar from '@/components/navigation-bar';
import GetHomePageQuery from '@/lib/queries/home-page';
import React, { useState, useEffect } from 'react';
import { fetcher } from '@/lib/utils';
import HeroBannerFullScreen from '@/components/hero-banner-full-screen';

type HomePageData = {
  heroBanner: {
    description: string;
    title: string;
    picture: {
      url: string;
      fileName: string;
      mimeType: string;
    };
  };
};

type HomePage = {
    homePages: Array<HomePageData>;
};

export default function Home() {

    const [locale, setLocale] = useState<'en' | 'de' | 'fr' | 'it'>('en');
    const [selectedCountry, setSelectedCountry] = useState<'france' | 'germany'>('france');

    const [data, setData] = useState<HomePageData | null>(null);

useEffect(() => {
  console.log('useEffect triggered with locale:', locale);
  async function fetchData() {
    try {
      console.log('Starting fetch from Hygraph...');
      const response = await fetcher<HomePage>(GetHomePageQuery, { locale });
      console.log('Fetched data:', response);
      setData(response.homePages[0]);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  }

  fetchData();
}, [locale]);

      console.log(data);

    return (
        <div>
            <NavigationBar />
            <ContextSelector onCountryChange={setSelectedCountry} onLanguageChange={setLocale} />
            <HeroBannerFullScreen 
                heroTitle={data?.heroBanner.title || ''} 
                heroText={data?.heroBanner.description || ''} 
                heroImage={data?.heroBanner.picture ? { url: data.heroBanner.picture.url } : undefined}
                mimeType={data?.heroBanner.picture?.mimeType}
            />
            <div>aslkdhjads</div>
        </div>
    );
}
