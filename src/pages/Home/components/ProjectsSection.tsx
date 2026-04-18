import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { useMemo, useState } from "react";

import { assetUrl } from "@/lib/utils";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  frontendUrl?: string;
  featured: boolean;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Smart Receipts",
    category: "Web Development",
    description:
      "A scalable full-stack receipt processing system with Express, PostgreSQL/Prisma, and AWS S3; features an asynchronous BullMQ + Redis pipeline for OCR (Tesseract) and LLM-based data extraction, with a React + TypeScript frontend for real-time visualization.",
    image: "/projects/smart-receipts.png",
    tags: [
      "TypeScript",
      "Express",
      "PostgreSQL",
      "Prisma",
      "BullMQ",
      "Redis",
      "AWS S3",
      "Tesseract OCR",
      "LLM",
    ],
    githubUrl: "https://github.com/AhmedAlSunbati712/smart-receipts-backend",
    frontendUrl:
      "https://github.com/AhmedAlSunbati712/smart-receipts-frontend",
    featured: true,
  },
  {
    id: 2,
    title: "P2P VideoChat over UDP",
    category: "Networking",
    description:
      "A peer-to-peer encrypted video calling system in Python over UDP; features custom reliable transport with sequence numbering and selective retransmission, multithreading for real-time frame processing, and Diffie-Hellman key exchange for secure communication.",
    image: "/projects/videochat.png",
    tags: [
      "Python",
      "UDP Sockets",
      "Multithreading",
      "Diffie-Hellman",
      "Cryptography",
      "Network Protocol",
    ],
    githubUrl: "https://github.com/AhmedAlSunbati712/videochat-app",
    featured: true,
  },
  {
    id: 3,
    title: "Yalnix",
    category: "Systems Programming",
    description:
      "A UNIX-like operating system kernel for the simulated DCS-58 architecture",
    image: "/projects/yalnix.png",
    tags: ["C", "Operating Systems", "Kernel Development"],
    githubUrl: "https://github.com/AhmedAlSunbati712/tiny-kernels",
    featured: true,
  },
  {
    id: 4,
    title: "Tiny Search Engine",
    category: "Systems Programming",
    description:
      "A search engine in C with multithreaded crawling, indexing, and ranked retrieval",
    image: "/projects/tse.png",
    tags: ["C", "Multithreading", "Search Algorithms"],
    githubUrl: "https://github.com/AhmedAlSunbati712/Tiny-Search-Engine",
    featured: true,
  },
  {
    id: 6,
    title: "Nuggets",
    category: "Systems Programming",
    description:
      "A C-based multiplayer game in which players navigate a mapped environment to collect gold nuggets",
    image: "/projects/nuggets.png",
    tags: ["C", "Networking", "Multiplayer"],
    githubUrl: "https://github.com/AhmedAlSunbati712/Nuggets-CS50-Group-project",
    featured: true,
  },
  {
    id: 7,
    title: "Brain Tumor Analysis",
    category: "Machine Learning",
    description:
      "Leveraging ResNet and U-Net for tumor classification and segmentation",
    image: "/projects/brain_tumor.png",
    tags: ["Python", "Deep Learning", "Computer Vision"],
    githubUrl: "https://github.com/xghouftw/brain-tumor-analysis",
    featured: true,
  },
  {
    id: 8,
    title: "VibeBite",
    category: "Web Development",
    description:
      "A web app that pairs a custom Spotify playlist with a recipe based on your mood, using Spotify, Spoonacular, and OpenAI APIs",
    image: "/projects/vibebite.png",
    tags: ["Web Development", "API Integration", "Spotify"],
    githubUrl: "https://github.com/AhmedAlSunbati712/VibeBite",
    featured: true,
  },
  {
    id: 9,
    title: "Spatial Navigation in Artificial Agents",
    category: "Machine Learning",
    description:
      "Spatial navigation with an LSTM, predicting position from self-motion cues. Biologically inspired grid-like representations",
    image: "/projects/grid-cells.png",
    tags: ["Python", "LSTM", "Neuroscience"],
    githubUrl: "https://github.com/AhmedAlSunbati712/memgrid",
    featured: true,
  },
];

export const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const featuredProject = useMemo(
    () => projects.find((project) => project.featured) ?? projects[0],
    []
  );
  const otherProjects = useMemo(
    () => projects.filter((project) => project.id !== featuredProject.id),
    [featuredProject.id]
  );
  const visibleProjects = showAll ? otherProjects : otherProjects.slice(0, 6);

  return (
    <section id="projects" className="px-6 py-5 sm:py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-left"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.25 }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Projects
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Selected work.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A focused collection of systems, research, and full-stack projects.
            One featured project appears first, followed by a compact index.
          </p>
        </motion.div>

        <motion.article
          className="mb-8 overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.25, delay: 0.05 }}
        >
          <div className="grid gap-0 md:grid-cols-2">
            <div className="h-64 overflow-hidden border-b border-border md:h-full md:border-b-0 md:border-r">
              <img
                src={assetUrl(featuredProject.image)}
                alt={featuredProject.title}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-6 text-left sm:p-8">
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Featured project
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">
                {featuredProject.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {featuredProject.category}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {featuredProject.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {featuredProject.tags.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border bg-surface-subtle px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex gap-3">
                <a
                  href={featuredProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
                >
                  <Github className="h-4 w-4" />
                  View code
                </a>
                {featuredProject.frontendUrl && (
                  <a
                    href={featuredProject.frontendUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-subtle"
                  >
                    <ArrowRight className="h-4 w-4" />
                    Frontend
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.article>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <motion.article
              key={project.id}
              className="rounded-xl border border-border bg-surface p-5 text-left shadow-sm"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.2, delay: index * 0.03 }}
            >
              <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                {project.category}
              </p>
              <h4 className="mt-2 text-lg font-semibold tracking-tight">
                {project.title}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={`${project.id}-${tag}`}
                    className="rounded-full border border-border bg-surface-subtle px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                <Github className="h-4 w-4" />
                Repository
              </a>
            </motion.article>
          ))}
        </div>

        {otherProjects.length > 6 && (
          <motion.div
            className="mt-8 text-left"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-subtle"
            >
              {showAll ? "Show fewer projects" : "Show more projects"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
