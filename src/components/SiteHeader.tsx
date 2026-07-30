import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

import { assetUrl } from "@/lib/utils";

export const SiteHeader = () => {
  return (
    <header className="site-header">
      <div className="site-shell header-inner">
        <Link className="brand" to="/" aria-label="Ahmed Al Sunbati, home">
          <img src={assetUrl("/avatar-icon.png")} alt="" />
          <span className="brand-full">Ahmed Al Sunbati</span>
          <span className="brand-short">Ahmed</span>
        </Link>

        <nav className="primary-nav" aria-label="Primary navigation">
          <Link to="/#experience">Experience</Link>
          <Link to="/#projects">Projects</Link>
        </nav>

        <div className="header-tools">
          <a
            className="icon-link optional-tool"
            href="https://github.com/AhmedAlSunbati712"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <Github aria-hidden="true" />
          </a>
          <a
            className="icon-link optional-tool"
            href="https://www.linkedin.com/in/ahmed-al-sunbati"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
};
