import React, { useEffect, useState } from 'react';

const BOSCH_LOGO = "Bosch-logo-simple.svg";
const SUPERGRAPHIC = "supergraphic.svg";

 useEffect(() => {
    async function fetchNavigation() {
      const navRes = await fetch('https://eu-central-1-staging.cdn.hygraph.com/content/cm67q55n501yi08uvx7k6atmu/master', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE3Mzc1Mzk1NDksImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEtc3RhZ2luZy5oeWdyYXBoLmNvbS92Mi9jbTY3cTU1bjUwMXlpMDh1dng3azZhdG11L21hc3RlciIsIm1hbmFnZW1lbnQtbmV4dC5ncmFwaGNtcy5jb20iXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LWV1LWNlbnRyYWwtMS1zdGFnaW5nLmh5Z3JhcGguY29tLyIsInN1YiI6IjViMzYzYmM0LWU1ODItNGVjOC1hNGI4LTU2YmVmZTQxOWM3ZCIsImp0aSI6ImNseG40cGV6djA1d3gwN3c3OHljOTlka3AifQ.tLHkS64U438lFv5hF97UcW6KjIzsTghtkk2Lmc7HtrVYuEzVGymQ798DDUkxbw3K_VOyFl43Tby85nSJUa9gzjlyqbfo6rMdJv9kqWBQ5Mc4MZUNj8C8GvpTgPiyIEo5fpmxqCAk9EkG3jKO1wEBlyTkPoFerP7Z4yeSk-YfUuhDQXVZWmK9XU80JhHUrNyaCFNG_sawdpuoixof9s9wKNc6_UPvNS3KH6pCx60dITrErk6Q1p3C3TpAw7A4audTAjmozyLD-swoL0L5JfgxA-lhPvYQr-hy8W7Lx_RGl0seBNe4dLOoPjsElDvNTQbiuQL_hLKKSFJi2NnBtQ4HogzVw463hfHjXlnGizewmDwh1cQYogbTDld2rpOPN_ivdJT7eG7FMV4RQ6fdU7I4S7M0Ol1bobbgfVKxE7XUR7Sy6BkFqNzwEqOtt3bZICEqJE9D6szhrY42e_-uFMM88LU-gv5LcfiR12OaX93UcwXrQMmuig_Q1XqxWbujSzV4nTV28qktPBFgXPtuQlksfyAdSFzZAR76PZ-J6tL7dXcOGmZjxZGpP33WYT0wvvm2EUBv2nrQHgpWbuZaFDoTpY1XcCbnCwgIZbJepPxyCbt5EUsofPznK5OL-BvNr2fWp6o4xs4543IY_AyCkFHGTlDo9TeJECnGi0z6yzxzrZk',
        },
        body: JSON.stringify({
          query: `
            query MyQuery {
              navigations(where: {navigationId: "products"}) {
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
      const navItems = navJson.data?.navigations?.[0]?.navigationLinks || [];
      setNavigationLinks(navItems.map((link: any) => link.productPage));
    }
    fetchNavigation();
  }, []);

export const NavigationBar = () => {
  return (
    <header className="p-6 flex items-center justify-between max-w-screen-2xl mx-auto">
      <img src={SUPERGRAPHIC} alt="Bosch Supergraphic" className="h-2 w-full absolute top-0 left-0 " />
      <div className="flex items-center space-x-4 max-w-[150px]">
        <a href="/">
          <img src={BOSCH_LOGO} alt="Bosch Logo" className="h-10" />
        </a>


      </div>
      <nav className="flex gap-6 font-medium">
        <span className="text-gray-700 font-bold">{navigationLabel}</span>
        {navigationLinks.map((link, i) => (
          <Link
            key={i}
            href={`/${link.slug}`}
            className="text-gray-700 hover:text-blue-600"
          >
            {link.title}
          </Link>
        ))}
        <Link href="#" className="text-gray-700 hover:text-black">Technology</Link>
      </nav>
    </header>
  );
};

export default NavigationBar;
