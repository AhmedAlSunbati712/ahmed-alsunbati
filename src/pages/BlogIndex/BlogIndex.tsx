import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { writingEntries } from "@/data/writing";
import { usePageMeta } from "@/hooks/use-page-meta";

export const BlogIndex = () => {
  usePageMeta({
    title: "Writing — Ahmed Al Sunbati",
    description:
      "Notes by Ahmed Al Sunbati on storage engines, distributed systems, backend infrastructure, and computational research.",
    path: "/writing",
  });

  return (
    <>
      <SiteHeader />
      <main className="site-shell writing-index">
        <header className="writing-hero">
          <p className="eyebrow">Writing</p>
          <h1>Notes from the workbench.</h1>
          <p>
            Longer-form thinking about storage, infrastructure, distributed
            systems, and the experiments that sharpen how I build.
          </p>
        </header>

        <section className="writing-list" aria-label="Articles">
          {writingEntries.map((entry) => (
            <Link
              className="writing-row"
              key={entry.slug}
              to={`/writing/${entry.slug}`}
            >
              <div className="writing-row-main">
                <p className="writing-row-meta">
                  <time dateTime={entry.date}>{entry.displayDate}</time>
                  <span>{entry.readingTime}</span>
                </p>
                <h2>{entry.title}</h2>
                <p>{entry.description}</p>
                <ul aria-label="Topics">
                  {entry.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </Link>
          ))}
        </section>

        <aside className="writing-outro">
          <p className="eyebrow">What’s next</p>
          <p>
            Future notes will unpack production failure diagnosis, memory
            systems, and the design decisions behind my current projects.
          </p>
        </aside>
      </main>
      <SiteFooter />
    </>
  );
};
