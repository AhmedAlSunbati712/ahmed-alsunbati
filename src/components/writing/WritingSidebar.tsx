import { Link, useLocation } from "react-router-dom";

type WritingSidebarProps = {
  articleHeadings?: Array<{ id: string; title: string }>;
};

export const WritingSidebar = ({
  articleHeadings = [],
}: WritingSidebarProps) => {
  const location = useLocation();

  return (
    <aside className="writing-sidebar" aria-label="Writing navigation">
      <div className="writing-sidebar-group">
        <p>Browse</p>
        <nav>
          <Link
            className={location.pathname === "/writing" ? "active" : undefined}
            to="/writing"
          >
            All articles
          </Link>
          <Link
            className={
              location.pathname === "/writing/series" ? "active" : undefined
            }
            to="/writing/series"
          >
            Series
          </Link>
          <Link
            className={
              location.pathname.includes("/series/stoneleafdb")
                ? "active"
                : undefined
            }
            to="/writing/series/stoneleafdb"
          >
            StoneleafDB
          </Link>
        </nav>
      </div>

      {articleHeadings.length > 0 && (
        <div className="writing-sidebar-group writing-toc">
          <p>In this article</p>
          <nav>
            {articleHeadings.map((heading) => (
              <a href={`#${heading.id}`} key={heading.id}>
                {heading.title}
              </a>
            ))}
          </nav>
        </div>
      )}
    </aside>
  );
};
