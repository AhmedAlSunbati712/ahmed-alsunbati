import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

import { assetUrl } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto max-w-6xl px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src={assetUrl("/avatar-icon.png")}
              alt="Avatar icon"
              className="h-8 w-8 rounded-full border border-border object-cover"
            />
            <span className="text-sm font-medium tracking-tight">
              Ahmed Al Sunbati
            </span>
          </div>

          <nav className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-foreground"
              >
                {item.name}
              </a>
            ))}
            <Link to="/blog" className="transition-colors hover:text-foreground">
              Blog
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="https://github.com/AhmedAlSunbati712"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub profile"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ahmed-al-sunbati"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn profile"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
