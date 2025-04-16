'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetcher } from '@/lib/utils';
import GetNavigationQuery from '@/lib/queries/navigation';

const BOSCH_LOGO = "bosch-logo-simple.svg";
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
          navigation.navigationLinks.map((link) => ({
            ...link.productPage,
            title: link.productPage.title.charAt(0).toUpperCase() + link.productPage.title.slice(1)
          }))
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
            <div className="flex items-center">
              <span className="text-gray-700 font-bold cursor-pointer group-hover:text-[#E2001A] transition-colors duration-200">{navigationLabel.charAt(0).toUpperCase() + navigationLabel.slice(1)}</span>
            </div>
            <div className="absolute left-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col bg-white shadow-lg rounded-lg z-20 min-w-[200px] border border-black overflow-hidden">
              {navigationLinks.map((link, i) => (
                <Link
                  key={i}
                  href={`/${link.slug}`}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-[#E2001A] hover:bg-gray-50 transition-colors duration-200"
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
          <Link href="#" className="text-gray-700 hover:text-[#E2001A] transition-colors duration-200">Technology</Link>
        </nav>
      </header>
    </div>
  );
};

export default NavigationBar;
