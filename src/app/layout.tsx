import '@fontsource-variable/inter'
import '@fontsource-variable/caveat'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DemoProvider } from '@/components/demo/demo-provider'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://oj-cms.vercel.app'),
  title: { default: 'OJ CMS — управление контентом без лишней сложности', template: '%s · OJ CMS' },
  description: 'Авторская CMS Олега Якунина: понятный интерфейс управления сайтами на базе Payload.',
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'OJ CMS',
    title: 'OJ CMS — управление контентом без лишней сложности',
    description: 'Понятная и красивая CMS для сайтов, которыми удобно управлять каждый день.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OJ CMS',
    description: 'Авторский интерфейс управления сайтами от Олега Якунина.',
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ru" data-theme="light">
      <body>
        <DemoProvider>{children}</DemoProvider>
      </body>
    </html>
  )
}
