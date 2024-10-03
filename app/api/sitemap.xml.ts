import { NextResponse } from 'next/server';
import { getServerSideSitemap } from 'next-sitemap';
import type { ISitemapField } from 'next-sitemap';

export const revalidate = 10;

export async function GET() {
  const response = await fetch(`http://jsonapi.test/api.php`);
  
  if (!response.ok) {
    return NextResponse.error(); // Return an error response if fetching fails
  }

  const blogs: { page_title: string }[] = await response.json();

  const fields: ISitemapField[] = blogs.map((blog) => ({
    loc: `https://mdxdemo.test/updatedblog/${encodeURIComponent(blog.page_title), { next: { revalidate: 10 } }}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 1,
  }));

  // Add other static URLs if needed
  fields.push({
    loc: 'https://mdxdemo.test/',
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 1.0,
  });

  return getServerSideSitemap(fields);
}

// Default export is required for it to work
export default function Sitemap() {}
