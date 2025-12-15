import { getAllPosts } from '@/lib/blog';

export default async function sitemap() {
  const baseUrl = 'https://lovebae.app';
  
  // Static routes with priority levels
  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/waitlist', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
    { path: '/support', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/creators', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/creators/apply', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/cookies', priority: 0.4, changeFrequency: 'yearly' },
  ].map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Blog posts from MDX files
  const posts = getAllPosts();
  const blogRoutes = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.frontmatter.date || new Date()),
    changeFrequency: 'weekly',
    priority: post.frontmatter.featured ? 0.8 : 0.7,
  }));

  return [
    ...staticRoutes,
    ...blogRoutes,
  ];
}
