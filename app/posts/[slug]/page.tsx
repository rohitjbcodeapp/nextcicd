import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function PostPage({ params }) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  const mdxSource = await serialize(content);

  return (
    <div className='flex items-center justify-center min-h-screen text-center'>
      <div>
        <h1 className='text-3xl'>{data.title}</h1>
        <p className='text-xl'>{data.date}</p>
        <MDXRemote source={mdxSource} />
      </div>
    </div>

  );
}

// Optional: If you need dynamic paths for SSG
export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filenames = fs.readdirSync(postsDirectory);

  return filenames.map((filename) => {
    return {
      slug: filename.replace(/\.mdx$/, ''),
    };
  });
}
