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
    const [selectedCountry, setSelectedCountry] = useState<'fr' | 'de'>('fr');

    const [data, setData] = useState<HomePageData | null>(null);

    useEffect(() => {
        async function fetchData() {
          const response = await fetcher<HomePage>(GetHomePageQuery, { locale });
          setData(response.homePages[0]);
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