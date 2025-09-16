import { Inter } from 'next/font/google'
import './globals.css'
import { CartProvider } from '../../components/CartContext'
import { FiltersProvider } from '../../components/FiltersContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AutoPartsPro - Your Auto Parts Store',
  description: 'Find the best auto parts and accessories for your vehicle',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <FiltersProvider>
            {children}
          </FiltersProvider>
        </CartProvider>
      </body>
    </html>
  )
}
