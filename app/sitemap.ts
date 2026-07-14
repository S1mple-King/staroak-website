import type { MetadataRoute } from 'next';

const routes = ['', '/about', '/ai-engine', '/industries', '/intelligence', '/ecosystem', '/contact', '/privacy', '/disclaimer'];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.staroakx.com';
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8
  }));
}
