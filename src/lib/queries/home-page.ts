const GetHomePageQuery = 
`query GetHomePage($locale: Locale!) {
    homePages(stage: DRAFT, locales: [$locale]) {
      heroBanner {
        description
        title
        picture {
          fileName
          url
          mimeType
        }
      }
    }
  }`

export default GetHomePageQuery;