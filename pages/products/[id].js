import {useState} from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link'
import { Swiper, SwiperSlide } from "swiper/react"
import { Thumbs } from 'swiper'
import 'swiper/css'

import { StoryblokComponent, useStoryblokState } from "@storyblok/react"

import PostTitle from '../../components/post-title'
import ProductCard from '../../components/ProductCard'
import SectionSeparator from '../../components/section-separator'

import { getProductBySlug } from '../../lib/productApi'

export default function Product({product, preview}) {
  const router = useRouter()
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  product = useStoryblokState(product);

  const {name, content} = product.story;

  console.log(content);

  // const productImages = product?.productImagesCollection?.items ?? [];

  if (!router.isFallback && !product) {
    return <ErrorPage statusCode={404} />
  }

  return router.isFallback ?  (
    <PostTitle>Loading…</PostTitle>
  ) : (
    <div className="px-14 py-10">
      <article>
        <Head>
          <title>
            {`${name}`}
          </title>
          <meta property="og:image" content={content?.images[0]?.filename} />
        </Head>
        <Link href='/products' className="text-gray-500">
          // All Products
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 mt-6">
          {content?.images ? (
            <div className="col-span-1">
              <Swiper
                modules={[Thumbs]}
                thumbs={{ swiper: thumbsSwiper }}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
              >
                {content.images.map( ({alt, filename}) => (
                  <SwiperSlide>
                    <Image 
                      loader={() => filename}
                      src={filename}
                      width="750"
                      height="750"
                      alt={alt}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>

              <Swiper
                modules={[Thumbs]}
                watchSlidesProgress
                onSwiper={setThumbsSwiper}
                slidesPerView={6}
              >
                {content.images.map( ({alt, filename}) => (
                  <SwiperSlide>
                    <Image 
                      loader={() => filename}
                      src={filename}
                      width="750"
                      height="750"
                      alt={alt}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : null}
          <BuyBox name={name} price={product.price} />
        </div>
      </article>
      <SectionSeparator />
      <article>
      <p>{content.description}</p>
      </article>
      <SectionSeparator />
      <RelatedProducts products={product?.recommendedProductsCollection?.items} />
    </div>
  )
}

export async function getServerSideProps({ params, preview = false, query }) {
  // const data = await getProductByProductId(params.id, preview)
  // const price = Math.floor(Math.random() * 100);

  // return {
  //   props: {
  //     preview,
  //     product: data ? {...data, price} : null
  //   },
  // }

  const data = await getProductBySlug(params.id, query);

  return {
    props: {
      product: data ?? null,
    }
  }
}

const BuyBox = ({name, price}) => (
  <div className="col-span-1">
    <h1 className="text-2xl my-3">{name}</h1>
    <p className="text-2xl my-3">${price?.toFixed(2)}</p>
    <div className="flex my-6">
      <label className="flex items-center border px-2 mr-4">
        Qty
        <select className="px-1 ml-2">
          <option value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </label>
      <button className="w-full bg-red-700 hover:bg-red-800 text-white px-6 py-3 transition-all">
        Add to cart
      </button>
    </div>
  </div>
)

const RelatedProducts = ({products}) => {
  return (
    <>
      <h2 className="text-2xl my-3">Related Products</h2>
      <Swiper
        slidesPerView={4}
      >
        {products?.map( (product, index) => (
          <SwiperSlide key={`recommended-product-${index}`}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}