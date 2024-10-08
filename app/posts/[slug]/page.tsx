import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote/rsc';

interface Params {
  slug: string; 
}

export const metadata = {
  title:
    "Blog Preview Page",
  description:
    "Blog View page",
};

export default async function PostPage({ params }: { params: Params }) {
  const { slug } = params;
  const postsDirectory = path.join(process.cwd(), 'posts');
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { content, data } = matter(fileContents);

  const mdxSource = await serialize(content);

  return (
    <div className='flex items-center justify-center min-h-screen text-center'>
      <div>
        <p className='text-xl py-2'>{data.date}</p>
        <h1 className='text-3xl'>{data.title}</h1>
        <p className='text-xl py-2'>{data.description}</p>
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
