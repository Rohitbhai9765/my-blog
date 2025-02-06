import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
    const allPostsData = getSortedPostsData();
    return {
        props: { allPostsData },
    };
}

export default function Home({ allPostsData }) {
    return (
        <div>
            <h1>Blogs by RSB</h1>
            <ul>
                {allPostsData.map(({ id, title, date, excerpt }) => (
                    <li key={id}>
                        <Link href={`/posts/${id}`}>
                            <h2>{title}</h2>
                        </Link>
                        <small>{date}</small>
                        <p>{excerpt}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
