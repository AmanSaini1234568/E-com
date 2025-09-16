"use client";
import React from 'react';
import { useState } from 'react';
import Header from '../../components/Header';
import { PRODUCTS } from '../../lib/products';
import ProductCard from "../../components/ProductCard"

// Extract unique categories and makes from PRODUCTS
const categories = [...new Set(PRODUCTS.map(p => p.category))];
const makes = [...new Set(PRODUCTS.flatMap(p => p.makes))];

export default function Page() {
  const [search, setSearch] = useState('');
  const [make, setMake] = useState('');

  // Simple filtering logic
  const filteredProducts = PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(search.toLowerCase()) || 
                         product.category.toLowerCase().includes(search.toLowerCase());
    const matchesMake = !make || product.makes.includes(make);
    return matchesSearch && matchesMake;
  });

  return (
    <>
      <Header 
        categories={categories} 
        makes={makes} 
        onSearchChange={setSearch}
        onMakeChange={setMake}
      />
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </>
  )
}