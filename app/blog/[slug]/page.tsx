import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getAllPosts, getPostBySlug } from '../../../lib/content'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts('blog-post')
  return posts.map((post) => ({
    slug: post.slug
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug('blog-post', slug)
  
  if (!post) {
    return {
      title: 'Article Not Found - SecondLook'
    }
  }
  
  return {
    title: `${post.title} - SecondLook`,
    description: post.description,
    keywords: post.targetKeywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug('blog-post', slug)
  
  if (!post) {
    notFound()
  }
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'SecondLook'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SecondLook'
    }
  }
  
  return (
    <div className="min-h-screen bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl mx-auto px-6 py-16">
        <nav className="mb-8">
          <Link href="/blog" className="text-primary hover:text-primary-light transition-colors font-medium">
            ← Back to articles
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
            {post.date && (
              <time className="text-body-sm text-text-muted font-mono">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            )}
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