'use client'

import { ArrowRight, FileText, ImageSquare, Newspaper, Plus, Wrench } from '@phosphor-icons/react'
import Link from 'next/link'
import { useDemo } from '@/components/demo/demo-provider'
import { ActionLink, PageHeader, StatusBadge } from '@/components/ui/ui'
import styles from './dashboard.module.css'

export default function DashboardPage() {
  const { state } = useDemo()
  const drafts = [...state.pages, ...state.news].filter((item) => item.status !== 'published')
  const recent = [...state.pages, ...state.news].slice(0, 5)

  return (
    <>
      <PageHeader
        eyebrow="Управление контентом"
        title="Добрый день, Олег"
        description="Продолжите работу с черновиками или быстро перейдите к нужному разделу сайта."
        actions={<ActionLink href="/admin/pages/home" icon={<FileText />}>Открыть главную</ActionLink>}
      />

      <section className={styles.hero} aria-labelledby="today-title">
        <div>
          <span className={styles.heroMark}>OJ</span>
          <h2 id="today-title">Сегодня в работе</h2>
          <p>{drafts.length} материала ждут просмотра или публикации.</p>
        </div>
        <div className={styles.heroActions}>
          <ActionLink href="/admin/news/new" variant="secondary" icon={<Plus />}>Добавить новость</ActionLink>
          <ActionLink href="/preview/home" variant="secondary">Предпросмотр сайта</ActionLink>
        </div>
      </section>

      <section className={styles.quick} aria-labelledby="quick-title">
        <h2 id="quick-title">Быстрые действия</h2>
        <div className={styles.quickGrid}>
          <QuickLink href="/admin/pages" icon={<FileText />} title="Страницы" detail={`${state.pages.length} материалов`} />
          <QuickLink href="/admin/news" icon={<Newspaper />} title="Новости" detail={`${state.news.length} публикации`} />
          <QuickLink href="/admin/media" icon={<ImageSquare />} title="Медиа" detail={`${state.media.length} файла`} />
          <QuickLink href="/admin/settings" icon={<Wrench />} title="Контакты и меню" detail="Настройки сайта" />
        </div>
      </section>

      <div className={styles.columns}>
        <section className={styles.panel} aria-labelledby="drafts-title">
          <header><div><h2 id="drafts-title">Черновики</h2><p>Материалы с неопубликованными изменениями</p></div><Link href="/admin/pages">Все страницы</Link></header>
          <div className={styles.rows}>
            {drafts.map((item) => (
              <Link className={styles.row} href={item.id.startsWith('news-') ? `/admin/news/${item.id}` : `/admin/pages/${item.id}`} key={item.id}>
                <div><strong>{item.title}</strong><span>{item.author} · {item.updatedAt}</span></div>
                <StatusBadge status={item.status} />
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>

        <aside className={styles.siteCard} aria-label="Состояние публичного сайта">
          <div className={styles.sitePreview}><span>OJ</span></div>
          <div><span className={styles.liveDot} aria-hidden="true" /> Публичная версия доступна</div>
          <h2>{state.settings.siteName}</h2>
          <p>Последняя публикация — сегодня, 09:40</p>
          <ActionLink href="/site/home" variant="secondary">Открыть сайт</ActionLink>
        </aside>
      </div>

      <section className={styles.panel} aria-labelledby="recent-title">
        <header><div><h2 id="recent-title">Недавние изменения</h2><p>Последние документы, доступные вашей роли</p></div></header>
        <div className={styles.rows}>
          {recent.map((item) => (
            <div className={styles.rowStatic} key={item.id}>
              <div><strong>{item.title}</strong><span>{item.author} · {item.updatedAt}</span></div>
              <StatusBadge status={item.status} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function QuickLink({ href, icon, title, detail }: { href: string; icon: React.ReactNode; title: string; detail: string }) {
  return (
    <Link className={styles.quickLink} href={href}>
      <span className={styles.quickIcon}>{icon}</span>
      <span><strong>{title}</strong><small>{detail}</small></span>
      <ArrowRight aria-hidden="true" />
    </Link>
  )
}
