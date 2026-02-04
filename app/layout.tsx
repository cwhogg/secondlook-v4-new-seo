import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'SecondLook - AI-powered guidance for complex medical mysteries',
  description: 'When 5 doctors can\'t diagnose you, SecondLook\'s AI analyzes complex symptoms and medical records to guide your diagnostic journey toward answers.',
  keywords: [
    'what to do when 5 doctors can\'t diagnose you',
    'ai symptom checker for complex medical cases',
    'diagnostic odyssey support tools',
    'complex symptom pattern recognition',
    'rare disease pathway navigation',
    'medical record intelligence',
    'physician communication tools'
  ],
  authors: [{ name: 'SecondLook' }],
  creator: 'SecondLook',
  publisher: 'SecondLook',
  metadataBase: new URL('https://secondlook.ai'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'SecondLook - AI-powered guidance for complex medical mysteries',
    description: 'When 5 doctors can\'t diagnose you, SecondLook\'s AI analyzes complex symptoms and medical records to guide your diagnostic journey toward answers.',
    url: 'https://secondlook.ai',
    siteName: 'SecondLook',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SecondLook - AI-powered guidance for complex medical mysteries',
    description: 'When 5 doctors can\'t diagnose you, SecondLook\'s AI analyzes complex symptoms and medical records to guide your diagnostic journey toward answers.'
  },
  viewport: 'width=device-width, initial-scale=1'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-background text-text-primary">
        {children}
      </body>
    </html>
  )
}