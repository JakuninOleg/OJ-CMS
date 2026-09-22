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
        <div style={{ width: 96, height: 96, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #111210', borderRadius: 999, fontSize: 36 }}>OJ</div>
        <div style={{ display: 'flex', flexDirection: 'column', fontSize: 22, letterSpacing: 4, textTransform: 'uppercase' }}>Content workspace</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ maxWidth: 900, fontSize: 74, fontWeight: 700, lineHeight: 1.02 }}>Управление сайтом без лишней сложности.</div>
        <div style={{ fontSize: 27, color: '#555a55' }}>OJ CMS · авторский продукт Олега Якунина</div>
      </div>
    </div>,
    size,
  )
}
