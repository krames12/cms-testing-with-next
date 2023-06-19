import {useState} from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Head from 'next/head'
import Image from 'next/image';
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from 'swiper';
import 'swiper/css';

import Container from '../../components/container'
import Header from '../../components/header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import SectionSeparator from '../../components/section-separator'

import { getProductByProductId } from '../../lib/productApi'

export default function Product({product, preview}) {
  const router = useRouter()
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const productImages = product?.productImagesCollection?.items ?? [];

  if (!router.isFallback && !product) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${product.name}`}
                </title>
                <meta property="og:image" content={product?.productImagesCollection?.items[0]?.url} />
              </Head>
              <div className="grid-cols-1 lg:grid-cols-2">
                {productImages ? (
                  <>
                    <Swiper
                      modules={[Thumbs]}
                      thumbs={{ swiper: thumbsSwiper }}
                      spaceBetween={50}
                      slidesPerView={1}
                      onSlideChange={() => console.log('slide change')}
                      onSwiper={(swiper) => console.log(swiper)}
                    >
                      {productImages.map( ({description, fileName, url, height, width}) => (
                        <SwiperSlide>
                          <Image 
                            loader={() => url}
                            src={fileName}
                            width={width}
                            height={height}
                            alt={description}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    
                    {/* Thumbnails */}
                    <Swiper
                    modules={[Thumbs]}
                    watchSlidesProgress
                    onSwiper={setThumbsSwiper}
                    slidesPerView={6}
                  >
                    {productImages.map( ({description, fileName, url, height, width}) => (
                      <SwiperSlide>
                        <Image 
                          loader={() => url}
                          src={fileName}
                          width={width}
                          height={height}
                          alt={description}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </>
                ) : null}
                <h1 className="text-2xl">{product.name}</h1>
              </div>
            </article>
            <SectionSeparator />
          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getServerSideProps({ params, preview = false }) {
  const data = await getProductByProductId(params.id, preview)

  return {
    props: {
      preview,
      product: data ?? null
    },
  }
}