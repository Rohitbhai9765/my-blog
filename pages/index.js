import Link from "next/link";
import { getSortedPostsData } from "../lib/posts";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return { props: { allPostsData } };
}

export default function Home({ allPostsData }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-fuchsia-600">
              Blogs by RSB
            </span>
          </h1>
          <p className="mt-2 text-slate-600">
            Fresh posts, bite-sized excerpts, and quick reads.
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-2">
          {allPostsData.map(({ id, title, date, excerpt }) => {
            const prettyDate = date
              ? new Date(date).toLocaleDateString("en-IN", { dateStyle: "medium" })
              : "";
            return (
              <li key={id}>
                <Link
                  href={`/posts/${id}`}
                  className="group block h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium tracking-wide text-slate-500">
                      {prettyDate}
                    </span>
                    <span className="text-[10px] uppercase rounded-full border px-2 py-0.5 text-slate-500 bg-slate-50">
                      Read
                    </span>
                  </div>

                  <h2 className="mt-3 text-lg font-semibold leading-snug text-slate-900 group-hover:text-indigo-600">
                    {title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm text-slate-600">
                    {excerpt}
                  </p>

                  <div className="mt-4 inline-flex items-center text-sm font-medium text-indigo-600">
                    Read more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M13.22 5.47a.75.75 0 011.06 0l5.25 5.25a.75.75 0 010 1.06l-5.25 5.25a.75.75 0 11-1.06-1.06l3.97-3.97H4.5a.75.75 0 010-1.5h12.69l-3.97-3.97a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
