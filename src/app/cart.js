
import { useCart } from '../../components/CartContext';
import { getProductById } from '../../lib/products';
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

export default function CartPage() {
    const { cart, updateQty, removeFromCart } = useCart()

    const items = Object.entries(cart).map(([id, qty]) => {
        const product = getProductById(id)
        return { ...product, qty }
    })

    const total = items.reduce((s, i) => s + i.price * i.qty, 0)

    async function handleCheckout() {
        const stripe = await stripePromise
        const res = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items: items.map(it => ({ name: it.title, price: it.price, quantity: it.qty })),
                successUrl: window.location.origin + '/success',
                cancelUrl: window.location.origin + '/cart'
            })
        })
        const { id } = await res.json()
        await stripe.redirectToCheckout({ sessionId: id })
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            {items.length === 0 && <p>Your cart is empty.</p>}

            {items.map(it => (
                <div key={it.id} className="flex justify-between items-center py-2 border-b">
                    <div>
                        <div className="font-semibold">{it.title}</div>
                        <input
                            type="number" value={it.qty} min="1"
                            onChange={(e) => updateQty(it.id, parseInt(e.target.value))}
                            className="w-16 border rounded ml-2"
                        />
                    </div>
                    <div>${(it.price * it.qty).toFixed(2)}</div>
                    <button onClick={() => removeFromCart(it.id)} className="text-red-600 ml-4">Remove</button>
                </div>
            ))}

            {items.length > 0 && (
                <div className="mt-6 text-right">
                    <div className="font-bold text-xl mb-2">Total: ${total.toFixed(2)}</div>
                    <button onClick={handleCheckout} className="px-4 py-2 rounded bg-slate-800 text-white">
                        Checkout
                    </button>
                </div>
            )}
        </div>
    )
}
