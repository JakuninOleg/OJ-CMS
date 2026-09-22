import '@fontsource-variable/manrope'
import '@fontsource-variable/inter'
import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { DemoProvider } from '@/components/demo/demo-provider'
import './globals.css'

export const metadata: Metadata = {
  title: { default: 'OJ CMS', template: '%s · OJ CMS' },
  description: 'Интерактивный прототип клиентской CMS на Payload.',
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
