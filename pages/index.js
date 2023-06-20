import Link from 'next/link'
import Head from 'next/head'

import Container from '../components/container'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'

export default function Index({ preview, allPosts }) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Head>
        <title>{`Next.js CMS Prototype`}</title>
      </Head>
      <div className="flex justify-center	items-center w-full h-screen">
        <h1 className="text-4xl text-bold">Head to <Link href="/products" className="text-red-700 underline">All Products</Link></h1>
      </div>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? []
  return {
    props: { preview, allPosts },
  }
}
