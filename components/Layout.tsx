import { MDXProvider } from '@mdx-js/react'
import '../styles/main.scss'
import type { Metadata } from 'next'
import { League_Spartan, Maven_Pro } from 'next/font/google'
import Head from 'next/head'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navigation from '@/components/Navigation/Navigation'

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-primary',
  display: 'swap',
  fallback: ['sans-serif'],
})

const mavenPro = Maven_Pro({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-secondary',
  display: 'swap',
  fallback: ['sans-serif'],
})

export const metadata: Metadata = {
  title: 'Oskari Map Application Platform',
  description:
    'Oskari is a framework for easily building multipurpose web mapping applications utilizing distributed Spatial Data Infrastructures like INSPIRE.',
}

interface LayoutProps {
  children: React.ReactNode
  meta: { title: string; description: string }
}

export default function Layout({ children, ...props }: LayoutProps) {
  return (
    <MDXProvider
    // components={components}
    >
      <Head>
        <html lang='en' />
        <body className={`${mavenPro.variable} ${leagueSpartan.variable}`} />
        <title>{props.meta.title}</title>
        <meta name='description' content={props.meta.description} />
      </Head>
      <Navigation />
      <Hero />
      <main>{children}</main>
      <Footer />
    </MDXProvider>
  )
}