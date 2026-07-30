import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { usePageMeta } from "@/hooks/use-page-meta";

export const NotFound = () => {
  usePageMeta({
    title: "Page not found — Ahmed Al Sunbati",
    description: "The requested page could not be found.",
  });

  return (
    <>
      <SiteHeader />
      <main className="site-shell not-found">
        <p className="eyebrow">404</p>
        <h1>This page wandered off.</h1>
        <p>
          The link may be old, or the page may have moved during the portfolio
          rebuild.
        </p>
        <Link to="/">
          <ArrowLeft aria-hidden="true" />
          Return home
        </Link>
      </main>
      <SiteFooter />
    </>
  );
};
