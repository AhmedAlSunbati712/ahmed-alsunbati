import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

export const SiteFooter = () => (
  <footer className="site-footer">
    <div className="site-shell footer-inner">
      <div>
        <p className="footer-name">Ahmed Al Sunbati</p>
        <p className="footer-note">
          Backend engineering, distributed systems, and computational research.
        </p>
      </div>

      <div className="footer-links" aria-label="Contact links">
        <a href="mailto:ahmedalsunbati27@gmail.com">
          Email <ArrowUpRight aria-hidden="true" />
        </a>
        <a
          href="https://github.com/AhmedAlSunbati712"
          target="_blank"
          rel="noreferrer"
        >
          GitHub <ArrowUpRight aria-hidden="true" />
        </a>
        <a
          href="https://www.linkedin.com/in/ahmed-al-sunbati"
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn <ArrowUpRight aria-hidden="true" />
        </a>
        <Link to="/writing">Writing</Link>
      </div>

      <p className="footer-year">© {new Date().getFullYear()}</p>
    </div>
  </footer>
);
