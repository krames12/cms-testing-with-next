import Image from 'next/image';
import Link from 'next/link'

export default function ProductCard({product, quickBuy = false}) {
  const {name, productId, productImagesCollection} = product
  const firstImage = productImagesCollection?.items[0];

  return (
    <Link href={`/products/${productId}`}>
      <div className="p-4 m-2 rounded-lg bg-white hover:shadow-md border-white hover:border-gray-500 transition-all">
        <Image
          loader={() => firstImage.url}
          src={firstImage.fileName}
          width={firstImage.width}
          height={firstImage.height}
          alt={firstImage.description}
        />
        <p>{name}</p>
        {quickBuy ? (
          <button className="w-full border-red-700 text-red-700 px-6 py-3 transition-all">
            Add to cart
          </button>
        ) : null}
      </div>
    </Link>
  )
}