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
`;

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
        }
      }
    }
  `);
  
  return extractProduct(product)
}

export async function getAllProducts() {
  const entries = await fetchGraphQL(
    `query {
      productCollection(order: date_DESC) {
        items {
          ${PRODUCT_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractProductEntries(entries)
}