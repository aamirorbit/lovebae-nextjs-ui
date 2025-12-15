import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

/**
 * Get all blog post slugs
 */
export function getPostSlugs() {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    return fs.readdirSync(postsDirectory).filter((file) => file.endsWith('.mdx'));
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
}

/**
 * Get a single post by slug
 */
export function getPostBySlug(slug) {
  try {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);
    
    return {
      slug: realSlug,
      frontmatter: {
        ...data,
        date: data.date ? new Date(data.date).toISOString() : null,
      },
      content,
      readingTime: stats.text,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Get all posts sorted by date (newest first)
 */
export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post !== null)
    .sort((post1, post2) => {
      const date1 = new Date(post1.frontmatter.date || 0);
      const date2 = new Date(post2.frontmatter.date || 0);
      return date2 - date1;
    });
  
  return posts;
}

/**
 * Get all unique categories from posts
 */
export function getAllCategories() {
  const posts = getAllPosts();
  const categories = new Set();
  
  posts.forEach((post) => {
    if (post.frontmatter.category) {
      categories.add(post.frontmatter.category);
    }
  });
  
  return Array.from(categories).sort();
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category) {
  const posts = getAllPosts();
  
  if (!category || category === 'All') {
    return posts;
  }
  
  return posts.filter(
    (post) => post.frontmatter.category?.toLowerCase() === category.toLowerCase()
  );
}

/**
 * Search posts by title and description
 */
export function searchPosts(query) {
  const posts = getAllPosts();
  
  if (!query || query.trim() === '') {
    return posts;
  }
  
  const searchTerm = query.toLowerCase().trim();
  
  return posts.filter((post) => {
    const title = post.frontmatter.title?.toLowerCase() || '';
    const description = post.frontmatter.description?.toLowerCase() || '';
    const category = post.frontmatter.category?.toLowerCase() || '';
    const tags = post.frontmatter.tags?.map((t) => t.toLowerCase()).join(' ') || '';
    
    return (
      title.includes(searchTerm) ||
      description.includes(searchTerm) ||
      category.includes(searchTerm) ||
      tags.includes(searchTerm)
    );
  });
}

/**
 * Get featured posts
 */
export function getFeaturedPosts() {
  const posts = getAllPosts();
  return posts.filter((post) => post.frontmatter.featured === true);
}

/**
 * Get related posts (same category, excluding current post)
 */
export function getRelatedPosts(currentSlug, limit = 3) {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];
  
  const posts = getAllPosts();
  const category = currentPost.frontmatter.category;
  
  return posts
    .filter((post) => post.slug !== currentSlug && post.frontmatter.category === category)
    .slice(0, limit);
}
