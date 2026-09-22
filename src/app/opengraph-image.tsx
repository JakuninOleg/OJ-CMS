import { ImageResponse } from 'next/og'

export const alt = 'OJ CMS — управление контентом без лишней сложности'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#f8f7f3',
        color: '#111210',
        padding: '64px 72px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <svg width="100" height="76" viewBox="0 0 50 38" fill="none"><ellipse cx="17" cy="19" rx="15" ry="16" stroke="#121516" strokeWidth="3.2" /><path d="M46 2.8v24.7c0 5.9-2.9 8.3-8.5 6.9" stroke="#121516" strokeWidth="3.2" /></svg>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 14, letterSpacing: 5, textTransform: 'uppercase' }}><span>Content</span><span>Management</span></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ maxWidth: 900, fontSize: 74, fontWeight: 400, lineHeight: 1.05, letterSpacing: -3 }}>Управление сайтом без лишней сложности.</div>
        <div style={{ fontSize: 27, color: '#555a55' }}>OJ CMS · авторский продукт Олега Якунина</div>
      </div>
    </div>,
    size,
  )
}
