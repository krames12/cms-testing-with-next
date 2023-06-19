import { getAllProducts } from '../../lib/productApi'

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.id, preview)

  return {
    props: {
      preview,
      post: data?.post ?? null,
      morePosts: data?.morePosts ?? null,
    },
  }
}