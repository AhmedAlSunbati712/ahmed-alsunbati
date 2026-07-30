import {
  Github,
  Linkedin,
  Moon,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { assetUrl } from "@/lib/utils";

type Theme = "light" | "dark";

const initialTheme = (): Theme => {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
};

export const SiteHeader = () => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

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
          <NavLink to="/writing">Writing</NavLink>
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
          <button
            className="icon-link"
            type="button"
            onClick={() =>
              setTheme((current) => (current === "light" ? "dark" : "light"))
            }
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon aria-hidden="true" />
            ) : (
              <Sun aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
