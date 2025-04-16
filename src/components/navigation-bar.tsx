'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetcher } from '@/lib/utils';
import GetNavigationQuery from '@/lib/queries/navigation';

const BOSCH_LOGO = "Bosch-logo-simple.svg";
const SUPERGRAPHIC = "supergraphic.svg";

export const NavigationBar = () => {
  const [navigationLabel, setNavigationLabel] = useState<string>('');
  const [navigationLinks, setNavigationLinks] = useState<{ title: string; slug: string }[]>([]);

  useEffect(() => {
    async function fetchNavigation() {
      const response = await fetcher<{ navigations: { navigationId: string; navigationLinks: { productPage: { title: string; slug: string } }[] }[] }>(GetNavigationQuery, {});
      const navigation = response.navigations?.[0];

      if (navigation) {
        setNavigationLabel(navigation.navigationId);
        setNavigationLinks(
          navigation.navigationLinks.map((link) => link.productPage)
        );
      }
    }

    fetchNavigation();
  }, []);

  return (
    <div className="relative z-20 bg-white">
      <header className="p-6 flex items-center justify-between max-w-screen-2xl mx-auto">
        <img src={SUPERGRAPHIC} alt="Bosch Supergraphic" className="h-2 w-screen absolute top-0 left-0 right-0" />
        <div className="flex items-center space-x-4 max-w-[150px]">
          <a href="/">
            <img src={BOSCH_LOGO} alt="Bosch Logo" className="h-10" />
          </a>
        </div>
        <nav className="flex gap-6 font-medium">
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
    </div>
  );
};

export default NavigationBar;
