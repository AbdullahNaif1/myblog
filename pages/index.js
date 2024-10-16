// pages/index.js
import client from '../lib/contentful';
import Link from 'next/link';
import Image from 'next/image';

export async function getStaticProps() {
  const res = await client.getEntries({ content_type: 'blogPost' });
  console.log('Fetched entries:', res.items);

  return {
    props: {
      posts: res.items,
    },
  };
}


export default function Home({ posts }) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>blog simple</h1>
      {posts.map((post) => (
        <div key={post.sys.id} style={{ marginBottom: '40px' }}>
          <h2>
            <Link href={`/posts/${post.fields.slug}`}>
              {post.fields.title}
            </Link>
          </h2>
          {post.fields.thumbnail && (
            <Image
              src={post.fields.thumbnail.fields.file.url}
              alt={post.fields.title}
              width={300}
              height={200}
            />
          )}
          <p>{post.fields.content.content[0].content[0].value.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}

