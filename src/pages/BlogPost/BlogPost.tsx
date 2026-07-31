import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  articleHeadingsFromMarkdown,
  MarkdownArticle,
} from "@/components/writing/MarkdownArticle";
import { WritingSidebar } from "@/components/writing/WritingSidebar";
import articleMarkdown from "@/content/stoneleafdb/b-trees-and-on-disk-data.md?raw";
import { findWritingEntry } from "@/data/writing";
import { usePageMeta } from "@/hooks/use-page-meta";

const articleHeadings = articleHeadingsFromMarkdown(articleMarkdown);

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = findWritingEntry(slug);

  usePageMeta({
    title: entry
      ? `${entry.title} — Ahmed Al Sunbati`
      : "Writing — Ahmed Al Sunbati",
    description:
      entry?.description ??
      "Writing about databases, distributed systems, and infrastructure.",
    path: entry ? `/writing/${entry.slug}` : "/writing",
  });

  if (slug === "building-a-crash-safe-storage-engine") {
    return <Navigate replace to="/writing/b-trees-and-on-disk-data" />;
  }
  if (!entry) return <Navigate replace to="/writing" />;

  return (
    <>
      <SiteHeader />
      <main className="article-shell">
        <Link className="article-back" to="/writing">
          <ArrowLeft aria-hidden="true" />
          All writing
        </Link>

        <article>
          <header className="article-header">
            <p className="eyebrow">
              <Link to="/writing/series/stoneleafdb">StoneleafDB</Link>
            </p>
            <h1>{entry.title}</h1>
            <p className="article-deck">{entry.description}</p>
            <div className="article-byline">
              <span>Ahmed Al Sunbati</span>
              <span>{entry.readingTime}</span>
            </div>
          </header>

          <div className="article-layout">
            <WritingSidebar articleHeadings={articleHeadings} />
            <MarkdownArticle markdown={articleMarkdown} />
          </div>

          <footer className="article-footer">
            <div>
              <p className="eyebrow">StoneleafDB</p>
              <p>
                More notes on building a database from its pages upward will
                live in this series.
              </p>
            </div>
            <Link to="/writing/series/stoneleafdb">
              View the series
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </footer>
        </article>
      </main>
      <SiteFooter />
    </>
  );
};
