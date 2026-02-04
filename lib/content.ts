import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

interface PostFrontmatter {
  title: string
  description: string
  date?: string
  targetKeywords?: string[]
  ideaName?: string
  status?: string
}

export interface Post {
  slug: string
  title: string
  description: string
  type: string
  date?: string
  content: string
  targetKeywords?: string[]
  ideaName?: string
  status?: string
}

const typeToDirectoryMap = {
  'blog-post': 'content/blog',
  'comparison': 'content/comparison',
  'faq': 'content/faq'
}

export function getAllPosts(type: keyof typeof typeToDirectoryMap): Post[] {
  try {
    const contentDirectory = typeToDirectoryMap[type]
    const fullPath = path.join(process.cwd(), contentDirectory)
    
    if (!fs.existsSync(fullPath)) {
      return []
    }
    
    const fileNames = fs.readdirSync(fullPath)
    const posts = fileNames
      .filter(name => name.endsWith('.md'))
      .map(name => {
        const slug = name.replace(/\.md$/, '')
        return getPostBySlug(type, slug)
      })
      .filter(Boolean)
      .sort((a, b) => {
        if (!a.date || !b.date) return 0
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    
    return posts
  } catch (error) {
    console.warn(`Failed to read posts of type ${type}:`, error)
    return []
  }
}

export function getPostBySlug(type: keyof typeof typeToDirectoryMap, slug: string): Post | null {
  try {
    const contentDirectory = typeToDirectoryMap[type]
    const fullPath = path.join(process.cwd(), contentDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    const frontmatter = data as PostFrontmatter
    
    const processedContent = remark()
      .use(remarkHtml)
      .processSync(content)
      .toString()
    
    return {
      slug,
      title: frontmatter.title,
      description: frontmatter.description,
      type,
      date: frontmatter.date,
      content: processedContent,
      targetKeywords: frontmatter.targetKeywords,
      ideaName: frontmatter.ideaName,
      status: frontmatter.status
    }
  } catch (error) {
    console.warn(`Failed to read post ${slug} of type ${type}:`, error)
    return null
  }
}