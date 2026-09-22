import Link from 'next/link'
import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react'
import type { DocumentStatus } from '@/lib/demo-data'
import styles from './ui.module.css'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'quiet' | 'danger'
  icon?: ReactNode
}

export function Button({ children, className = '', variant = 'primary', icon, type = 'button', ...props }: ButtonProps) {
  return (
    <button className={`${styles.button} ${styles[variant]} ${className}`} type={type} {...props}>
      {icon ? <span className={styles.buttonIcon} aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </button>
  )
}

export function ActionLink({ href, children, variant = 'primary', icon }: { href: string; children: ReactNode; variant?: 'primary' | 'secondary' | 'quiet'; icon?: ReactNode }) {
  return (
    <Link className={`${styles.button} ${styles[variant]}`} href={href}>
      {icon ? <span className={styles.buttonIcon} aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </Link>
  )
}

export function StatusBadge({ status }: { status: DocumentStatus }) {
  const labels: Record<DocumentStatus, string> = {
    published: 'Опубликовано',
    draft: 'Черновик',
    changed: 'Есть изменения',
  }
  return <span className={`${styles.badge} ${styles[`badge-${status}`]}`}>{labels[status]}</span>
}

export function Notice({ tone = 'info', title, children, live = false }: { tone?: 'info' | 'success' | 'warning' | 'error'; title: string; children?: ReactNode; live?: boolean }) {
  return (
    <div className={`${styles.notice} ${styles[`notice-${tone}`]}`} role={tone === 'error' ? 'alert' : 'status'} aria-live={live ? 'polite' : undefined}>
      <strong>{title}</strong>
      {children ? <div>{children}</div> : null}
    </div>
  )
}

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  hint?: string | undefined
  error?: string | undefined
}

export function Field({ label, hint, error, id, className = '', ...props }: FieldProps) {
  const inputId = id ?? props.name
  const descriptionId = `${inputId}-description`
  return (
    <label className={`${styles.field} ${className}`} htmlFor={inputId}>
      <span className={styles.fieldLabel}>{label}</span>
      {hint ? <span className={styles.fieldHint} id={descriptionId}>{hint}</span> : null}
      <input
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        id={inputId}
        aria-describedby={hint || error ? descriptionId : undefined}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error ? <span className={styles.fieldError} id={descriptionId}>{error}</span> : null}
    </label>
  )
}

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  hint?: string | undefined
  error?: string | undefined
}

export function Textarea({ label, hint, error, id, className = '', ...props }: TextareaProps) {
  const inputId = id ?? props.name
  const descriptionId = `${inputId}-description`
  return (
    <label className={`${styles.field} ${className}`} htmlFor={inputId}>
      <span className={styles.fieldLabel}>{label}</span>
      {hint ? <span className={styles.fieldHint} id={descriptionId}>{hint}</span> : null}
      <textarea
        className={`${styles.input} ${styles.textarea} ${error ? styles.inputError : ''}`}
        id={inputId}
        aria-describedby={hint || error ? descriptionId : undefined}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error ? <span className={styles.fieldError} id={descriptionId}>{error}</span> : null}
    </label>
  )
}

export function PageHeader({ eyebrow, title, description, actions }: { eyebrow?: string; title: string; description?: string; actions?: ReactNode }) {
  return (
    <header className={styles.pageHeader}>
      <div>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className={styles.pageDescription}>{description}</p> : null}
      </div>
      {actions ? <div className={styles.headerActions}>{actions}</div> : null}
    </header>
  )
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className={styles.empty}>
      <span className={styles.emptyMark} aria-hidden="true">OJ</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {action}
    </div>
  )
}
