const GetNavigationQuery = 
`query GetNavigation {
  navigations(where: {navigationId: "products"}, stage: DRAFT) {
    navigationLinks {
      productPage {
        title
        slug
      }
    }
    navigationId
  }
}`

export default GetNavigationQuery;
