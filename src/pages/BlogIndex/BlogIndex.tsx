import { Link } from "react-router-dom";

export const BlogIndex = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto max-w-3xl px-6 py-24 text-left">
        <p className="text-sm uppercase tracking-wide text-muted-foreground mb-4">
          Blog
        </p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
          Writing is coming soon.
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground mb-10">
          This section is reserved for long-form notes on software engineering,
          systems thinking, and project breakdowns.
        </p>
        <Link
          to="/"
          className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface-subtle transition-colors"
        >
          Back to portfolio
        </Link>
      </main>
    </div>
  );
};
