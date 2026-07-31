import { ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WritingSidebar } from "@/components/writing/WritingSidebar";
import {
  entriesForSeries,
  findWritingSeries,
} from "@/data/writing";
import { usePageMeta } from "@/hooks/use-page-meta";

export const SeriesDetail = () => {
  const { seriesSlug } = useParams<{ seriesSlug: string }>();
  const series = findWritingSeries(seriesSlug);
  const entries = series ? entriesForSeries(series.slug) : [];

  usePageMeta({
    title: series
      ? `${series.title} — Writing by Ahmed Al Sunbati`
      : "Writing Series — Ahmed Al Sunbati",
    description: series?.description ?? "Writing series by Ahmed Al Sunbati.",
    path: series ? `/writing/series/${series.slug}` : "/writing/series",
  });

  if (!series) return <Navigate replace to="/writing/series" />;

  return (
    <>
      <SiteHeader />
      <main className="site-shell writing-index">
        <header className="series-hero">
          <div>
            <p className="eyebrow">
              Writing series <span>{series.status}</span>
            </p>
            <h1>{series.title}</h1>
          </div>
          <p>{series.description}</p>
        </header>
        <div className="writing-page-grid">
          <WritingSidebar />
          <section className="writing-list" aria-label={`${series.title} articles`}>
            <header className="writing-list-header">
              <h2>Articles</h2>
              <span>{entries.length} published</span>
            </header>
            {entries.map((entry) => (
              <Link
                className="writing-row"
                key={entry.slug}
                to={`/writing/${entry.slug}`}
              >
                <div className="writing-row-main">
                  <p className="writing-row-meta">
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
        </div>
      </main>
      <SiteFooter />
    </>
  );
};
