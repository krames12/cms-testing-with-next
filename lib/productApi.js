import { getStoryblokApi } from "@storyblok/react"

const PRODUCT_GRAPHQL_FIELDS = `
  productId
  name
  expirationDate
  productImagesCollection {
    items {
      url
      fileName
      width
      height
      description
    }
  }
  description {
    json
  }
`;

const RECOMMENDED_PRODUCTS_GRAPH_FIELDS = `
  recommendedProductsCollection {
    items {
      ... on Product {
        productId
        name
        productImagesCollection {
          items {
            url
            fileName
            width
            height
            description
          }
        }
      }
    }
  }
`

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
}

function extractProduct(fetchResponse) {
  return fetchResponse?.data?.productCollection?.items?.[0]
}

function extractProductEntries(fetchResponse) {
  return fetchResponse?.data?.productCollection?.items
}

export async function getProductByProductId(productId) {
  const product = await fetchGraphQL(`
    query {
      productCollection(where: {productId: ${productId}}, limit: 1) {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
          ${RECOMMENDED_PRODUCTS_GRAPH_FIELDS}
        }
      }
    }
  `);

  return extractProduct(product)
}

export async function getAllProducts() {
  const entries = await fetchGraphQL(
    `query {
      productCollection {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  
  return extractProductEntries(entries)
}

export async function getProductBySlug(slug, query) {
  let sbParams = {
    version: "published",
  }

  if(query._storyblok) {
    sbParams.version = "draft"
  }

  const storyblokApi = getStoryblokApi();
  let { data } = await storyblokApi.get(`cdn/stories/products/${slug}`, sbParams);

  console.log(data);

  return data
}