import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { findWritingEntry } from "@/data/writing";
import { usePageMeta } from "@/hooks/use-page-meta";

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = findWritingEntry(slug);

  usePageMeta({
    title: entry
      ? `${entry.title} — Ahmed Al Sunbati`
      : "Writing — Ahmed Al Sunbati",
    description:
      entry?.description ??
      "Notes on storage engines, distributed systems, and backend infrastructure.",
    path: entry ? `/writing/${entry.slug}` : "/writing",
  });

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
            <p className="eyebrow">Project note · Systems</p>
            <h1>{entry.title}</h1>
            <p className="article-deck">{entry.description}</p>
            <div className="article-byline">
              <span>Ahmed Al Sunbati</span>
              <time dateTime={entry.date}>{entry.displayDate}</time>
              <span>{entry.readingTime}</span>
            </div>
          </header>

          <div className="article-layout">
            <aside className="article-aside" aria-label="On this page">
              <p>On this page</p>
              <nav>
                <a href="#recovery-first">Recovery first</a>
                <a href="#transaction-boundary">Transaction boundary</a>
                <a href="#replicated-commit">Replicated commit</a>
                <a href="#proof">Proving the system</a>
              </nav>
            </aside>

            <div className="article-prose">
              <p className="article-lede">
                I’m building a distributed transactional storage engine in C++.
                The project starts below SQL, below query planning, and below
                most of the abstractions that make databases feel friendly:
                pages, cache state, durable writes, and recovery after an
                inconveniently timed crash.
              </p>

              <p>
                That bottom-up approach is intentional. Replication cannot make
                a storage engine correct if a single node cannot explain which
                bytes are durable after a restart. Before adding more surface
                area, I want each layer to have a small set of invariants that
                the next layer can safely assume.
              </p>

              <h2 id="recovery-first">Recovery comes first</h2>
              <p>
                The local durability path combines pager and cache management
                with checksummed rollback journaling. A write-ahead log and
                checkpointing path then provide the foundation for replaying
                committed work without treating every restart as a full
                reconstruction.
              </p>

              <blockquote>
                A storage engine is only as trustworthy as the story it can tell
                after the process disappears between two writes.
              </blockquote>

              <p>
                Checksums matter because “the file exists” is not the same as
                “the record is complete.” Recovery needs to distinguish a valid
                durable state from a partial write that happened to reach disk.
              </p>

              <figure className="architecture-breakout">
                <figcaption>Current system boundary</figcaption>
                <div className="architecture-flow">
                  <span>Transaction</span>
                  <b aria-hidden="true">→</b>
                  <span>WAL / journal</span>
                  <b aria-hidden="true">→</b>
                  <span>Pager + cache</span>
                  <b aria-hidden="true">→</b>
                  <span>Durable pages</span>
                </div>
                <div className="architecture-plane">
                  <span>Raft-backed replicated commit plane</span>
                  <span>Leader election · ordered commit · failover</span>
                </div>
              </figure>

              <h2 id="transaction-boundary">Finding the transaction boundary</h2>
              <p>
                Once local writes can recover, the next question is where a
                transaction becomes visible. Two-phase commit coordinates that
                boundary across participants; the WAL records enough intent to
                finish or unwind work after interruption.
              </p>
              <p>
                The interesting engineering is in the seams: cache eviction
                while a transaction is active, checkpointing without losing the
                recovery point, and keeping an interrupted coordinator from
                leaving participants with incompatible answers.
              </p>

              <h2 id="replicated-commit">Separating storage from replicated commit</h2>
              <p>
                I’m using Raft for the replicated commit plane: leader election,
                ordered agreement, and failover. Keeping this boundary explicit
                lets the storage layer focus on page correctness while the
                consensus layer decides which transaction order the cluster has
                accepted.
              </p>
              <p>
                The goal is not to hide the distributed system. It is to make
                each failure mode land in a layer with a clear responsibility
                and a recovery procedure that can be tested independently.
              </p>

              <h2 id="proof">The feature is the proof</h2>
              <p>
                The project is still in progress. The hard part now is less
                about adding components and more about demonstrating that their
                promises survive crashes, replays, leadership changes, and
                unlucky timing.
              </p>
              <p>
                That means treating fault injection and recovery tests as part
                of the design—not cleanup work after the architecture feels
                finished. A system that passes only on the happy path is a
                sketch; the failure paths are what turn it into storage.
              </p>
            </div>
          </div>

          <footer className="article-footer">
            <div>
              <p className="eyebrow">Continue exploring</p>
              <p>See the other systems and infrastructure work I’m building.</p>
            </div>
            <Link to="/#projects">
              Selected projects
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </footer>
        </article>
      </main>
      <SiteFooter />
    </>
  );
};
