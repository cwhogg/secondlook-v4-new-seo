import Link from 'next/link'
import { getAllPosts } from '../../lib/content'

export default function BlogPage() {
  const posts = getAllPosts('blog-post')

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <header className="mb-16">
          <h1 className="text-hero font-heading text-text-primary mb-6">
            Medical Insights & Research
          </h1>
          <p className="text-body-lg text-text-secondary max-w-3xl">
            In-depth analysis of diagnostic challenges, medical research breakthroughs, 
            and practical guidance for navigating complex health conditions.
          </p>
        </header>

        {posts.length > 0 ? (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-background-elevated border border-border rounded-lg p-8 hover:border-primary-light transition-colors">
                <Link href={`/blog/${post.slug}`} className="block">
                  <h2 className="text-xl-heading font-heading text-text-primary mb-4 hover:text-primary-light transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-body text-text-secondary mb-4 leading-relaxed">
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
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-lg-heading font-heading text-text-primary mb-4">
              No articles yet
            </h2>
            <p className="text-body text-text-secondary">
              We're working on comprehensive content to support your diagnostic journey. 
              Check back soon for expert insights and practical guidance.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}