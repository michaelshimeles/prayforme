// This is the root layout component for your Next.js app.
// Learn more: https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required
import { Manrope } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Metadata } from 'next'

const fontHeading = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-heading',
})

const fontBody = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
})


export const metadata: Metadata = {
  title: 'Pray For Me',
  description: 'Need prayer? Let us know. Want to pray for others? Scroll below.',
  openGraph: {
    images: ['https://utfs.io/f/ff3f6d07-5add-4c4e-9f21-9604f758cc7f-pwwvmb.png']
  },
}

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'antialiased',
          fontHeading.variable,
          fontBody.variable
        )}
      >
        {children}
      </body>
    </html>
  )
}