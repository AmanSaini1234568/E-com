import ProductCard from './ProductCard';


export default function ProductGrid({ products, onView, onAdd }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(p => <ProductCard key={p.id} p={p} onView={onView} onAdd={onAdd} />)}
        </div>
    );
}