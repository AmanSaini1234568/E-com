"use client"
import Link from 'next/link'
import { useCart } from './CartContext'
import { useFilters } from './FiltersContext'
import { PRODUCTS } from '../lib/products.js';

export default function Header({ categories = [], makes = [] }) {
  const { totalItems } = useCart()
  const { setSearch, setMake } = useFilters()

  return (
    <header className="bg-white shadow sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold">
            AutoPartsPro
          </Link>

          <nav className="hidden md:flex gap-2">
            {categories.slice(0, 5).map((c) => (
              <button
                key={c}
                onClick={() => setSearch(c)}
                className="px-3 py-1 rounded text-slate-700"
              >
                {c}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Search */}
          <input
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search parts..."
            className="border rounded px-3 py-1 w-80"
          />

  // Update the select:
          <select
            onChange={(e) => onMakeChange(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">All makes</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>

          {/* Cart */}
          <Link href="/cart" className="px-3 py-2 border rounded">
            Cart ({totalItems})
          </Link>
        </div>
      </div>
    </header>
  )
}
