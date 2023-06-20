import { getAllProducts } from '../../lib/productApi'

import ProductCard from '../../components/ProductCard'

export default function ProductLandingPage({products}) {
  return (
    <div className="px-14 py-10">
      <h1 className="text-2xl m-3">All Products</h1>
      <ul className="grid grid-cols-4 gap-2">
        {products.map( product => (
          <ProductCard product={product} quickBuy />
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps({ preview = false }) {
  const data = await getAllProducts(preview)

  const products = data.map( product => ({...product, price: Math.floor(Math.random() * 100)}))

  return {
    props: {
      preview,
      products,
    },
  }
}