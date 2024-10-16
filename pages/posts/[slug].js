// pages/posts/[slug].js
import client from '../../lib/contentful';
import Image from 'next/image';
import Link from 'next/link';

export async function getStaticPaths() {
  const res = await client.getEntries({ content_type: 'blogPost' });
  
  const paths = res.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug,
  });

  return {
    props: {
      post: res.items[0],
    },
  };
}

export default function Post({ post }) {
  return (
    <div style={{ padding: '20px' }}>
      <Link href="/">← العودة إلى الصفحة الرئيسية</Link>
      <h1>{post.fields.title}</h1>
      {post.fields.thumbnail && (
        <Image
          src={post.fields.thumbnail.fields.file.url}
          alt={post.fields.title}
          width={600}
          height={400}
        />
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: post.fields.content.content.map((block) => {
            if (block.nodeType === 'paragraph') {
              return `<p>${block.content[0].value}</p>`;
            }
            return '';
          }).join(''),
        }}
      ></div>
    </div>
  );
}

