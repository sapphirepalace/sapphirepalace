import type { Metadata } from 'next'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sapphire Palace Event Complex – Where Luxury Meets Celebration | Lahore',
  description:
    "Sapphire Palace Event Complex – Lahore's most prestigious luxury wedding and event venue. Book your dream wedding, mehndi, walima, corporate & birthday events in Nasheman-e-Iqbal.",
  keywords:
    'luxury wedding venue Lahore, best event complex Lahore, mehndi hall Lahore, walima venue Lahore, wedding palace Pakistan, Sapphire Palace Event Complex',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body>
        {children}
        <Toaster
          theme="dark"
          toastOptions={{
            style: {
              background: 'rgba(10,22,40,0.95)',
              border: '1px solid rgba(201,168,76,0.3)',
              color: '#FEFEFE',
            },
          }}
        />
      </body>
    </html>
  )
}
