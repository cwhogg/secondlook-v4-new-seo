import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '../../../lib/content'

interface FaqPageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts('faq')
  return posts.map((post) => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }: FaqPageProps) {
  const post = getPostBySlug('faq', params.slug)
  
  if (!post) {
    return {
      title: 'FAQ Not Found - SecondLook'
    }
  }
  
  return {
    title: `${post.title} - SecondLook`,
    description: post.description,
    keywords: post.targetKeywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article'
    }
  }
}

export default function FaqPage({ params }: FaqPageProps) {
  const post = getPostBySlug('faq', params.slug)
  
  if (!post) {
    notFound()
  }
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: post.title,
    description: post.description
  }
  
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        <nav className="mb-8">
          <Link href="/" className="text-primary hover:text-primary-light transition-colors font-medium">
            ← Back to home
          </Link>
        </nav>
        
        <article>
          <header className="mb-12">
            <h1 className="text-hero font-heading text-text-primary mb-6">
              {post.title}
            </h1>
            <p className="text-body-lg text-text-secondary mb-6 leading-relaxed">
              {post.description}
            </p>
          </header>
          
          <div 
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-heading prose-headings:text-text-primary
              prose-p:text-text-secondary prose-p:leading-relaxed
              prose-a:text-primary hover:prose-a:text-primary-light
              prose-strong:text-text-primary
              prose-code:text-accent prose-code:bg-background-elevated prose-code:px-1 prose-code:rounded
              prose-pre:bg-background-elevated prose-pre:border prose-pre:border-border
              prose-blockquote:border-l-primary prose-blockquote:text-text-secondary
              prose-li:text-text-secondary
            "
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </div>
  )
}