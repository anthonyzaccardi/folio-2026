import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Anthony Zaccardi — Product Designer',
  description:
    'Product Design Manager at Sweep. Previously Pennylane & Qonto. I design products that make complex things feel simple.',
  openGraph: {
    title: 'Anthony Zaccardi — Product Designer',
    description: 'Product Design Manager at Sweep. Previously Pennylane & Qonto.',
    url: 'https://tonyz.cc',
    siteName: 'tonyz.cc',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Anthony Zaccardi — Product Designer',
    description: 'Product Design Manager at Sweep. Previously Pennylane & Qonto.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
