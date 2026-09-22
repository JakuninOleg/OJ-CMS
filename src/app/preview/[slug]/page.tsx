import { PageRenderer } from '@/components/site/page-renderer'

export default async function PreviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <PageRenderer slug={slug} mode="preview" />
}
