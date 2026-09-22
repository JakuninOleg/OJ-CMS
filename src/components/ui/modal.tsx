'use client'

import { X } from '@phosphor-icons/react'
import { useEffect, useRef, type ReactNode } from 'react'
import styles from './modal.module.css'

export function Modal({ open, onClose, title, description, children, footer }: { open: boolean; onClose: () => void; title: string; description?: string; children: ReactNode; footer?: ReactNode }) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    closeButtonRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previousFocusRef.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.backdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className={styles.dialog} role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby={description ? 'modal-description' : undefined}>
        <header className={styles.header}>
          <div>
            <h2 id="modal-title">{title}</h2>
            {description ? <p id="modal-description">{description}</p> : null}
          </div>
          <button ref={closeButtonRef} className={styles.close} type="button" onClick={onClose} aria-label="Закрыть окно">
            <X aria-hidden="true" />
          </button>
        </header>
        <div className={styles.body}>{children}</div>
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </section>
    </div>
  )
}
