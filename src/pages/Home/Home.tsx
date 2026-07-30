import { ArrowDownRight, ArrowUpRight, Mail } from "lucide-react";

import { AsciiSpringBackground } from "@/components/AsciiSpringBackground";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { currentlyReading, experiences, projects } from "@/data/portfolio";
import { usePageMeta } from "@/hooks/use-page-meta";

export const Home = () => {
  usePageMeta({
    title: "Ahmed Al Sunbati — Software Engineer",
    description:
      "Computer science student at Dartmouth interested in distributed systems, infrastructure, and databases.",
  });

  return (
    <>
      <SiteHeader />
      <main className="site-shell">
        <section className="hero" aria-labelledby="intro-title">
          <AsciiSpringBackground />
          <div className="hero-heading">
            <div>
              <p className="eyebrow">
                Software engineer · Dartmouth College
              </p>
              <h1 id="intro-title">Ahmed Al Sunbati</h1>
            </div>
            <a
              className="ascii-profile"
              href="https://github.com/AhmedAlSunbati712"
              target="_blank"
              rel="noreferrer"
              aria-label="View Ahmed Al Sunbati on GitHub"
            >
              <img
                src="https://raw.githubusercontent.com/AhmedAlSunbati712/AhmedAlSunbati712/main/light_mode.svg"
                alt="ASCII self-portrait of Ahmed Al Sunbati"
                decoding="async"
              />
            </a>
          </div>
          <div className="hero-lower">
            <p className="hero-copy">
              Computer science student at Dartmouth interested in distributed
              systems, infrastructure, and databases.
            </p>
            <div className="hero-actions">
              <a href="mailto:ahmedalsunbati27@gmail.com">
                <Mail aria-hidden="true" />
                Email me
              </a>
              <a
                href="https://www.linkedin.com/in/ahmed-al-sunbati"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="hero-reading" aria-label="Currently reading">
            <p>Currently reading</p>
            <div className="hero-reading-viewport">
              <div className="hero-reading-track">
                {[0, 1].map((groupIndex) => (
                  <div
                    className="hero-reading-group"
                    key={groupIndex}
                    aria-hidden={groupIndex === 1}
                  >
                    {currentlyReading.map((book) => (
                      <span
                        className="hero-reading-book"
                        key={`${groupIndex}-${book.title}`}
                      >
                        <cite>{book.title}</cite>
                        <span>
                          {book.author} · {book.year}
                        </span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <a className="scroll-cue" href="#experience">
            Selected work
            <ArrowDownRight aria-hidden="true" />
          </a>
        </section>

        <div className="work-grid">
          <section
            className="work-column experience-column"
            id="experience"
            aria-labelledby="experience-title"
          >
            <header className="column-header">
              <div>
                <p className="eyebrow">Experience</p>
                <h2 id="experience-title">Where I’m working.</h2>
              </div>
            </header>

            <div className="experience-list">
              {experiences.map((experience) => (
                <article className="experience-item" key={experience.company}>
                  <div className="experience-heading">
                    <span className="company-mark" aria-hidden="true">
                      {experience.mark}
                    </span>
                    <div>
                      <h3>{experience.role}</h3>
                      <p className="company-name">
                        {experience.company}
                        {experience.organization
                          ? ` · ${experience.organization}`
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div className="experience-meta">
                    <time>{experience.period}</time>
                    <span>{experience.location}</span>
                  </div>

                  <p className="experience-summary">{experience.summary}</p>
                  <ul className="impact-list">
                    {experience.highlights.map((highlight) => (
                      <li key={highlight}>{highlight}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section
            className="work-column projects-column"
            id="projects"
            aria-labelledby="projects-title"
          >
            <header className="column-header">
              <div>
                <p className="eyebrow">Selected projects</p>
                <h2 id="projects-title">What I’m building.</h2>
              </div>
            </header>

            <div className="project-list">
              {projects.map((project) => (
                <article className="project-item" key={project.title}>
                  <div className="project-topline">
                    <div className="project-period">
                      {project.upcoming ? (
                        <span className="project-upcoming">Upcoming</span>
                      ) : (
                        <time>{project.period}</time>
                      )}
                      {project.status && (
                        <span className="project-status">{project.status}</span>
                      )}
                    </div>
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <p className="project-detail">{project.detail}</p>

                  <div className="project-footer">
                    <ul className="technology-list" aria-label="Technologies">
                      {project.technologies.map((technology) => (
                        <li key={technology}>{technology}</li>
                      ))}
                    </ul>

                    {project.links && (
                      <div className="project-links">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {link.label}
                            <ArrowUpRight aria-hidden="true" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
};
