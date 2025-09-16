"use client"

import { createContext, useContext, useState, useEffect } from 'react'

const FiltersContext = createContext()

export function FiltersProvider({ children }) {
  const [search, setSearch] = useState('')
  const [make, setMake] = useState('')
  const [category, setCategory] = useState('')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState('featured')

  // Load filters from URL on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setSearch(params.get('search') || '')
      setMake(params.get('make') || '')
      setCategory(params.get('category') || '')
      
      const minPrice = parseFloat(params.get('minPrice'))
      const maxPrice = parseFloat(params.get('maxPrice'))
      if (!isNaN(minPrice) && !isNaN(maxPrice)) {
        setPriceRange([minPrice, maxPrice])
      }
      
      if (params.get('sort')) {
        setSortBy(params.get('sort'))
      }
    }
  }, [])

  // Update URL when filters change
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const params = new URLSearchParams()
    if (search) params.set('search', search)
    if (make) params.set('make', make)
    if (category) params.set('category', category)
    if (priceRange[0] > 0) params.set('minPrice', priceRange[0])
    if (priceRange[1] < 1000) params.set('maxPrice', priceRange[1])
    if (sortBy !== 'featured') params.set('sort', sortBy)
    
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`
    window.history.replaceState({}, '', newUrl)
  }, [search, make, category, priceRange, sortBy])

  const clearFilters = () => {
    setSearch('')
    setMake('')
    setCategory('')
    setPriceRange([0, 1000])
    setSortBy('featured')
  }

  return (
    <FiltersContext.Provider
      value={{
        // State
        search,
        make,
        category,
        priceRange,
        sortBy,
        
        // Actions
        setSearch,
        setMake,
        setCategory,
        setPriceRange,
        setSortBy,
        clearFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  )
}

export const useFilters = () => {
  const context = useContext(FiltersContext)
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider')
  }
  return context
}
