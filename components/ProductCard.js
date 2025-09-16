"use client"

import { useCart } from './CartContext'
import Link from 'next/link'
import { FiShoppingCart, FiStar } from 'react-icons/fi'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()
  const { id, title, price, images, category, makes, rating, specs } = product

  // Handle add to cart with quantity
  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id,
      title,
      price,
      image: images[0],
      category,
    })
  }

  // Format price with 2 decimal places
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)

  return (
    <Link 
      href={`/products/${id}`}
      className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
    >
      {/* Product Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={images[0] || '/placeholder-product.jpg'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null
            e.target.src = '/placeholder-product.jpg'
          }}
        />
        
        {/* Quick Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-blue-50"
          aria-label="Add to cart"
        >
          <FiShoppingCart className="h-5 w-5 text-blue-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category and Rating */}
        <div className="flex justify-between items-start mb-1">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
            {category}
          </span>
          {rating > 0 && (
            <div className="flex items-center text-amber-400">
              <FiStar className="h-3.5 w-3.5 fill-current" />
              <span className="ml-0.5 text-xs font-medium text-gray-700">
                {rating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2 h-10">
          {title}
        </h3>

        {/* Makes */}
        {makes && makes.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1 mb-2">
            {makes.slice(0, 3).map((make) => (
              <span 
                key={make} 
                className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
              >
                {make}
              </span>
            ))}
            {makes.length > 3 && (
              <span className="text-xs text-gray-500 self-center">
                +{makes.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            {formattedPrice}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Add to Cart
          </button>
        </div>

        {/* Key Specs */}
        {specs && Object.keys(specs).length > 0 && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <ul className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              {Object.entries(specs)
                .slice(0, 2)
                .map(([key, value]) => (
                  <li key={key} className="truncate">
                    <span className="font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>{' '}
                    {value}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </Link>
  )
}
