import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WritingSidebar } from "@/components/writing/WritingSidebar";
import { entriesForSeries, writingSeries } from "@/data/writing";
import { usePageMeta } from "@/hooks/use-page-meta";

export const SeriesIndex = () => {
  usePageMeta({
    title: "Writing Series — Ahmed Al Sunbati",
    description:
      "Related collections of Ahmed Al Sunbati's writing about systems and infrastructure.",
    path: "/writing/series",
  });

  return (
    <>
      <SiteHeader />
      <main className="site-shell writing-index">
        <header className="writing-hero writing-hero-compact">
          <p className="eyebrow">Writing</p>
          <h1>Series.</h1>
        </header>
        <div className="writing-page-grid">
          <WritingSidebar />
          <section className="series-list" aria-label="Writing series">
            {writingSeries.map((series) => (
              <Link
                className="series-card"
                key={series.slug}
                to={`/writing/series/${series.slug}`}
              >
                <div>
                  <p className="writing-row-meta">
                    <span>{series.status}</span>
                    <span>
                      {entriesForSeries(series.slug).length} article
                    </span>
                  </p>
                  <h2>{series.title}</h2>
                  <p>{series.description}</p>
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
