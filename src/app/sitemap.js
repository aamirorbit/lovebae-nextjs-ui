import { getAllPosts } from '@/lib/blog';

export default async function sitemap() {
  const baseUrl = 'https://lovebae.app';
  
  // Use actual last modified dates for better SEO
  // Google prefers accurate lastModified dates over always-new dates
  const staticRoutes = [
    { 
      path: '', 
      priority: 1.0, 
      changeFrequency: 'weekly',
      // Homepage - update this date when you make significant changes
      lastModified: '2026-01-27',
    },
    { 
      path: '/waitlist', 
      priority: 0.9, 
      changeFrequency: 'weekly',
      lastModified: '2026-01-27',
    },
    { 
      path: '/blog', 
      priority: 0.9, 
      changeFrequency: 'daily',
      lastModified: '2026-01-27', // Updated with new blog posts
    },
    { 
      path: '/support', 
      priority: 0.7, 
      changeFrequency: 'monthly',
      lastModified: '2025-12-15',
    },
    { 
      path: '/creators', 
      priority: 0.8, 
      changeFrequency: 'weekly',
      lastModified: '2026-01-15',
    },
    { 
      path: '/creators/apply', 
      priority: 0.7, 
      changeFrequency: 'monthly',
      lastModified: '2026-01-15',
    },
    { 
      path: '/privacy', 
      priority: 0.5, 
      changeFrequency: 'yearly',
      lastModified: '2025-12-15', // Match the date in the page
    },
    { 
      path: '/terms', 
      priority: 0.5, 
      changeFrequency: 'yearly',
      lastModified: '2025-12-15', // Match the date in the page
    },
    { 
      path: '/cookies', 
      priority: 0.4, 
      changeFrequency: 'yearly',
      lastModified: '2025-12-15', // Match the date in the page
    },
  ].map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(route.lastModified),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog posts from MDX files with accurate dates
  let posts = [];
  try {
    posts = getAllPosts();
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
  }
  
  const blogRoutes = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date || '2025-12-01'),
    changeFrequency: 'monthly', // Blog posts don't change as frequently after publishing
    priority: post.frontmatter.featured ? 0.8 : 0.7,
  }));

  // Combine and sort by priority for cleaner sitemap
  const allRoutes = [...staticRoutes, ...blogRoutes].sort((a, b) => b.priority - a.priority);

  return allRoutes;
}
