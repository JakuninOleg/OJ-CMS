'use client'

import {
  ArrowSquareOut,
  FileText,
  Gear,
  House,
  ImageSquare,
  List,
  Newspaper,
  Question,
  UserCircle,
  Users,
  X,
} from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useDemo } from '@/components/demo/demo-provider'
import styles from './admin-shell.module.css'

const navigation = [
  { href: '/admin', label: 'Обзор', icon: House, exact: true },
  { href: '/admin/pages', label: 'Страницы', icon: FileText },
  { href: '/admin/news', label: 'Новости', icon: Newspaper },
  { href: '/admin/media', label: 'Медиа', icon: ImageSquare },
  { href: '/admin/settings', label: 'Настройки сайта', icon: Gear },
] as const

export function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { state, dispatch } = useDemo()
  const [mobileOpen, setMobileOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!mobileOpen) return
    closeButtonRef.current?.focus()

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [mobileOpen])

  const closeMobileMenu = () => {
    setMobileOpen(false)
    menuButtonRef.current?.focus()
  }

  const renderNavigation = (mobile = false) => (
    <>
      <div className={styles.brandRow}>
        <Link className={styles.brand} href="/admin" aria-label="OJ CMS — обзор">
          <span className={styles.brandMark}>OJ</span>
          <span><strong>OJ CMS</strong><small>Content workspace</small></span>
        </Link>
        {mobile ? <button ref={closeButtonRef} className={styles.mobileClose} type="button" onClick={closeMobileMenu} aria-label="Закрыть меню"><X /></button> : null}
      </div>

      <nav className={styles.navigation} aria-label="Основная навигация">
        {navigation.map((item) => {
          const active = 'exact' in item && item.exact ? pathname === item.href : pathname.startsWith(item.href)
          const Icon = item.icon
          return (
            <Link className={`${styles.navLink} ${active ? styles.navLinkActive : ''}`} href={item.href} key={item.href} aria-current={active ? 'page' : undefined} onClick={() => setMobileOpen(false)}>
              <Icon aria-hidden="true" weight={active ? 'fill' : 'regular'} />
              <span>{item.label}</span>
            </Link>
          )
        })}
        {state.role === 'administrator' ? (
          <Link className={`${styles.navLink} ${pathname.startsWith('/admin/users') ? styles.navLinkActive : ''}`} href="/admin/users" aria-current={pathname.startsWith('/admin/users') ? 'page' : undefined} onClick={() => setMobileOpen(false)}>
            <Users aria-hidden="true" />
            <span>Пользователи</span>
          </Link>
        ) : null}
      </nav>

      <div className={styles.sidebarFooter}>
        <a className={styles.utilityLink} href="/site/home" target="_blank" rel="noreferrer"><ArrowSquareOut aria-hidden="true" />Открыть сайт</a>
        <a className={styles.utilityLink} href="https://payloadcms.com/docs" target="_blank" rel="noreferrer"><Question aria-hidden="true" />Помощь</a>
        <Link className={styles.profileLink} href="/admin/profile">
          <span className={styles.avatar}>ОЯ</span>
          <span><strong>Олег Якунин</strong><small>{state.role === 'administrator' ? 'Администратор' : 'Редактор'}</small></span>
          <UserCircle aria-hidden="true" />
        </Link>
        <div className={styles.demoControls}>
          <span>Демо-режим · данные в браузере</span>
          <label>
            Роль
            <select value={state.role} onChange={(event) => dispatch({ type: 'role.changed', role: event.target.value as 'administrator' | 'editor' })}>
              <option value="administrator">Администратор</option>
              <option value="editor">Редактор</option>
            </select>
          </label>
          <button type="button" onClick={() => dispatch({ type: 'demo.reset' })}>Сбросить демо-данные</button>
        </div>
      </div>
    </>
  )

  return (
    <div className={styles.app}>
      <aside className={styles.sidebar} aria-label="Навигация CMS">{renderNavigation()}</aside>
      {mobileOpen ? <div className={styles.mobileBackdrop} onClick={() => setMobileOpen(false)} aria-hidden="true" /> : null}
      {mobileOpen ? <aside className={`${styles.mobileSidebar} ${styles.mobileSidebarOpen}`} role="dialog" aria-modal="true" aria-label="Навигация">{renderNavigation(true)}</aside> : null}
      <div className={styles.mainColumn}>
        <header className={styles.mobileHeader}>
          <button ref={menuButtonRef} type="button" onClick={() => setMobileOpen(true)} aria-label="Открыть меню" aria-expanded={mobileOpen}><List /></button>
          <span className={styles.mobileLogo}>OJ CMS</span>
          <Link href="/admin/profile" aria-label="Открыть профиль"><span className={styles.avatar}>ОЯ</span></Link>
        </header>
        <main className={styles.main} id="main-content">{children}</main>
      </div>
    </div>
  )
}
