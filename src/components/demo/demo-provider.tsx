'use client'

import { createContext, useContext, useEffect, useMemo, useReducer, useState, type Dispatch, type ReactNode } from 'react'
import { z } from 'zod'
import { initialDemoState, type DemoState } from '@/lib/demo-data'
import { demoReducer, type DemoAction } from '@/lib/demo-reducer'

const storageKey = 'oj-cms-demo-v1'

const persistedStateSchema = z.object({
  role: z.enum(['administrator', 'editor']),
  pages: z.array(z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    status: z.enum(['published', 'draft', 'changed']),
    updatedAt: z.string(),
    author: z.string(),
    seoDescription: z.string(),
    draft: z.object({
      heading: z.string(),
      intro: z.string(),
      body: z.string(),
      ctaLabel: z.string(),
      ctaUrl: z.string(),
      mediaId: z.string().nullable(),
    }),
    published: z.object({
      heading: z.string(),
      intro: z.string(),
      body: z.string(),
      ctaLabel: z.string(),
      ctaUrl: z.string(),
      mediaId: z.string().nullable(),
    }).nullable(),
  })),
  news: z.array(z.object({
    id: z.string(),
    title: z.string(),
    slug: z.string(),
    status: z.enum(['published', 'draft', 'changed']),
    updatedAt: z.string(),
    author: z.string(),
    excerpt: z.string(),
    body: z.string(),
    publicationDate: z.string(),
  })),
  media: z.array(z.object({
    id: z.string(),
    title: z.string(),
    alt: z.string(),
    url: z.string(),
    kind: z.literal('image'),
    size: z.string(),
    usedBy: z.array(z.string()),
  })),
  settings: z.object({
    siteName: z.string(),
    phone: z.string(),
    email: z.string(),
    address: z.string(),
    navigation: z.string(),
  }),
})

type DemoContextValue = {
  state: DemoState
  dispatch: Dispatch<DemoAction>
  hydrated: boolean
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey)
    if (stored) {
      try {
        const parsed = persistedStateSchema.safeParse(JSON.parse(stored))
        if (parsed.success) {
          dispatch({ type: 'state.restored', state: parsed.data })
        }
      } catch {
        window.localStorage.removeItem(storageKey)
      }
    }
    queueMicrotask(() => setHydrated(true))
  }, [])

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(storageKey, JSON.stringify(state))
  }, [hydrated, state])

  const value = useMemo(() => ({ state, dispatch, hydrated }), [state, hydrated])
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

export function useDemo(): DemoContextValue {
  const context = useContext(DemoContext)
  if (!context) throw new Error('useDemo must be used within DemoProvider')
  return context
}
