import React from 'react';

const BOSCH_LOGO = "Bosch-logo-simple.svg";
const SUPERGRAPHIC = "supergraphic.svg";

 useEffect(() => {
    async function fetchNavigation() {
      const navRes = await fetch(HYGRAPH_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer YOUR_HYGRAPH_TOKEN',
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
