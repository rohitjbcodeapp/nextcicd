import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';

export default async function PostsPage() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  const posts = filenames.map((filename) => {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.mdx$/, '');

    return {
      slug,
      frontMatter: data,
    };
  });

  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center'>
      <h1 className='text-3xl mb-4'>All Blog Posts</h1>
      <ul className='flex flex-col items-center'>
        {posts.map((post) => (
          <li key={post.slug} className='text-2xl mb-2'>
            <Link href={`/posts/${post.slug}`}>
              {post.frontMatter.title} - {post.frontMatter.date}
            </Link>
          </li>
        ))}
      </ul>
    </div>

  );
}
