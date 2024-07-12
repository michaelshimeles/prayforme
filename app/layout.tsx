import { Manrope } from 'next/font/google'
import { cn } from '@/lib/utils'
import './globals.css'
import { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "@/components/ui/sonner"

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
  openGraph: {
    description: 'Need prayer? Let us know. Want to pray for others? Scroll below.',
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
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}