const GetProductPageQuery = `
  query GetProductPage($locale: Locale!, $slug: String!) {
    productPage(where: { slug: $slug }, stage: DRAFT, locales: [$locale]) {
      title
      heroTitle
      heroText
      heroImage {
        url
      }
      body {
        json
        html
        markdown
        raw
        text
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
        recyclingSchedule
        localizedContent {
          html
        }
	flag {url}
      }
      downloads {
        label
        file {
          url
        }
        language
      }
      sharedRecyclingInfo {
        raw
        text
      }
      productSpecification {
        icon {
          url
        }
        label
        valueImperial
        valueMetric
      }
    }
  }
`;

export default GetProductPageQuery;