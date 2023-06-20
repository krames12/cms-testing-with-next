import Image from 'next/image';
import Link from 'next/link'

export default function ProductCard({product, quickBuy = false}) {
  const {name, price, productId, productImagesCollection} = product
  const firstImage = productImagesCollection?.items[0];

  return (
    <Link href={`/products/${productId}`} className="flex flex-wrap p-4 m-2 rounded-lg bg-white hover:shadow-md border border-white hover:border-gray-100 transition-all">
      <>
        <Image
          loader={() => firstImage.url}
          src={firstImage.fileName}
          width={firstImage.width}
          height={firstImage.height}
          alt={firstImage.description}
          />
        <p className="text-bold my-2">{name}</p>
      </>
      {quickBuy ? (
        <div className="self-end w-full">
          <p className="mb-3">${price?.toFixed(2)}</p>
          <button className="w-full border border-red-700 text-red-700 hover:text-white hover:bg-red-700 px-6 py-3 transition-all">
            Add to cart
          </button>
        </div>
      ) : null}
    </Link>
  )
}