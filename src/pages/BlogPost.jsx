import { Link, useParams } from "react-router-dom";

export const BlogPost = () => {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto max-w-3xl px-6 py-24 text-left">
        <p className="text-sm uppercase tracking-wide text-muted-foreground mb-4">Blog</p>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
          {slug || "article"}
        </h1>
        <p className="text-base leading-relaxed text-muted-foreground mb-10">
          This route is intentionally reserved for future markdown/MDX articles.
        </p>
        <div className="flex items-center gap-3">
          <Link
            to="/blog"
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface-subtle transition-colors"
          >
            Back to blog
          </Link>
          <Link
            to="/"
            className="inline-flex items-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-surface-subtle transition-colors"
          >
            Portfolio
          </Link>
        </div>
      </main>
    </div>
  );
};
