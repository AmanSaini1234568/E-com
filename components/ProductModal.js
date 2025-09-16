export default function ProductModal({ product, onClose, onAdd }) {
    if (!product) return null;
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg max-w-4xl w-full mx-4 overflow-auto max-h-[90vh]">
                <div className="flex">
                    <div className="w-1/2 p-4">
                        <img src={product.images[0]} alt={product.title} className="w-full h-96 object-cover rounded" />
                    </div>
                    <div className="w-1/2 p-6 flex flex-col">
                        <div className="flex justify-between">
                            <div>
                                <h2 className="text-2xl font-bold">{product.title}</h2>
                                <div className="text-sm text-slate-600 mt-1">SKU: {product.sku}</div>
                                <div className="mt-2 text-lg font-semibold">${product.price.toFixed(2)}</div>
                            </div>
                            <button onClick={onClose} className="text-slate-500">Close ✕</button>
                        </div>


                        <div className="mt-4 text-sm text-slate-700 flex-1">
                            <h4 className="font-semibold">Specifications</h4>
                            <ul className="list-disc ml-5 mt-2 text-sm">
                                {Object.entries(product.specs).map(([k, v]) => <li key={k} className="capitalize">{k}: {v}</li>)}
                            </ul>


                            <h4 className="font-semibold mt-4">Reviews</h4>
                            <div className="mt-2">
                                {product.reviews.length === 0 && <div className="text-slate-500">No reviews yet.</div>}
                                {product.reviews.map(r => (
                                    <div key={r.id} className="border-b py-2">
                                        <div className="text-sm font-semibold">{r.author}</div>
                                        <div className="text-sm text-slate-700">{r.text}</div>
                                        <div className="text-xs text-slate-500">{r.stars}★</div>
                                    </div>
                                ))}
                            </div>


                            <h4 className="font-semibold mt-4">Availability</h4>
                        </div>    
                    </div>
                </div>
            </div>
        </div>
    );
}
