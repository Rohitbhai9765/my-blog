import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getStaticPaths() {
    const files = fs.readdirSync('posts');
    const paths = files.map((fileName) => ({
        params: { id: fileName.replace('.md', '') },
    }));
    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const filePath = path.join('posts', `${params.id}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return { props: { post: { ...data, contentHtml } } };
}

export default function Post({ post }) {
    return (
        <article>
            <h1>{post.title}</h1>
            <p>{post.date}</p>
            <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
        </article>
    );
}
