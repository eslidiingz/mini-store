import type { Metadata } from 'next'
import { Prompt } from 'next/font/google'
import './globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import MainLayout from '@/components/Layout/MainLayout'


const prompt = Prompt({ weight: ['400', '500'], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mini Store',
  description: 'Mini Store for small businesses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={prompt.className}>
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}
