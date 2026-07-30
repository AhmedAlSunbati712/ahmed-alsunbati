export type Experience = {
  company: string;
  organization?: string;
  role: string;
  period: string;
  location: string;
  mark: string;
  summary: string;
  highlights: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  title: string;
  period?: string;
  upcoming?: boolean;
  status?: string;
  description: string;
  detail: string;
  technologies: string[];
  links?: ProjectLink[];
};

export type ReadingEntry = {
  author: string;
  year: string;
  title: string;
  subtitle: string;
  publisher: string;
};

export const experiences: Experience[] = [
  {
    company: "Intuit",
    organization: "FinTech Organization",
    role: "Backend Engineering Intern",
    period: "Jun 2026 — Present",
    location: "Mountain View, CA",
    mark: "I",
    summary:
      "Building Vigil, an agent that investigates production runtime errors and CI failures for a high-traffic payments service.",
    highlights: [
      "Enriches failures with source context, verifies root-cause hypotheses against the codebase, and delivers diagnoses through Slack and Jira.",
      "Collapses recurring errors into a single diagnosis job using stack-trace fingerprints, Redis sliding-window counters, and cooldown TTLs.",
      "Designed a path from one service to roughly 1,000 with consistent-hash monitor partitions, queue-depth autoscaling, and sharded event streams.",
    ],
  },
  {
    company: "DALI Lab",
    organization: "Dartmouth College",
    role: "Full-Stack Software Engineer",
    period: "Aug 2025 — Present",
    location: "Hanover, NH",
    mark: "D",
    summary:
      "Shipping backend infrastructure and product work across ZebraMD, an AI healthcare platform, and Deserto.",
    highlights: [
      "Built authenticated diagnostic chat, report persistence, disease-ranking, and PDF export APIs with NestJS, TypeORM, and PostgreSQL.",
      "Added phenotype normalization and vector-retrieval infrastructure with transactional upserts, feature flags, retries, and fallback lookups.",
      "Designed Deserto services spanning 10k+ req/s load tests, SQS + Twilio messaging, Elasticsearch, and conflict-safe rental scheduling.",
    ],
  },
  {
    company: "Mind, Brain, and Computation Lab",
    organization: "Dartmouth College",
    role: "Software Developer · Research Assistant",
    period: "Sep 2025 — Present",
    location: "Hanover, NH",
    mark: "M",
    summary:
      "Studying the tradeoff between exact recall and nearest-match transfer in computational memory systems.",
    highlights: [
      "Built an evaluation stack that feeds early, middle, and late CLIP/DINO embeddings into an associative retrieval engine.",
      "Reduced engine-core runtime from 40 minutes to 27 seconds through incremental projection updates, vectorization, and JIT compilation.",
      "Automated multithreaded sweeps across five dimensions and aggregated results from more than 500 trials.",
    ],
  },
  {
    company: "Contextual Dynamics Lab",
    organization: "Dartmouth College",
    role: "Software Developer · Research Assistant",
    period: "Mar 2025 — Oct 2025",
    location: "Hanover, NH",
    mark: "C",
    summary:
      "Built the lab’s fMRI analysis infrastructure for research on memory encoding and forgetting.",
    highlights: [
      "Built modular Python pipelines for 25GB+ fMRI datasets from 20+ participants, reducing per-subject processing time by 35%.",
      "Automated hierarchical clustering and pattern-detection workflows, improving pipeline efficiency by 25%.",
      "Created Plotly dashboards to surface processing time, success rates, and processing anomalies.",
    ],
  },
  {
    company: "Spin Lab",
    organization: "Dartmouth College",
    role: "Research Assistant",
    period: "Jun 2024 — Nov 2024",
    location: "Hanover, NH",
    mark: "S",
    summary:
      "Simulated interacting spins in disordered 1D chains to study thermalization, localization, information spread, and quantum chaos.",
    highlights: [
      "Optimized a Python simulation engine, cutting runtime by 60% and enabling experiments with roughly 100 interacting particles.",
      "Built aggregation pipelines for energy spread, entanglement, and correlation metrics, producing 2k+ data points per experiment.",
      "Automated more than 200 multithreaded simulation runs with analysis and visualization scripts.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "StoneleafDB",
    period: "May 2026 — Present",
    status: "In progress",
    description:
      "A crash-safe distributed transactional storage engine built from the pager upward.",
    detail:
      "Checksummed rollback journaling, two-phase commit, WAL and checkpointing, with a Raft-backed commit plane for leader election and failover.",
    technologies: ["C++", "Raft", "WAL", "Crash recovery"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/AhmedAlSunbati712/StoneleafDB",
      },
    ],
  },
  {
    title: "ForkVFS",
    upcoming: true,
    description:
      "A forkable distributed block-storage service with quorum-backed durability and copy-on-write forks.",
    detail:
      "Writes are persisted across a quorum of storage nodes, while forks share existing blocks until they diverge.",
    technologies: [
      "Distributed storage",
      "Quorum replication",
      "Copy-on-write",
    ],
  },
  {
    title: "Proteus",
    period: "Feb 2026",
    description:
      "A distributed generative-AI virtual try-on system with cost-aware GPU orchestration.",
    detail:
      "Queue-driven scheduling batches low-latency inference while KEDA scales GPU pods from Redis demand; SegFormer and CatVTON power the vision pipeline.",
    technologies: ["PyTorch", "Kubernetes", "KEDA", "Redis"],
    links: [
      {
        label: "Frontend",
        href: "https://github.com/AhmedAlSunbati712/proteus-frontend",
      },
      {
        label: "Backend",
        href: "https://github.com/AhmedAlSunbati712/proteus-backend",
      },
    ],
  },
  {
    title: "Smart Receipts",
    period: "Dec 2025",
    description:
      "A full-stack receipt pipeline for OCR, structured extraction, and real-time processing visibility.",
    detail:
      "BullMQ and Redis coordinate asynchronous Tesseract and LLM jobs around PostgreSQL, Prisma, and S3-backed document storage.",
    technologies: ["TypeScript", "PostgreSQL", "BullMQ", "AWS S3"],
    links: [
      {
        label: "Backend",
        href: "https://github.com/AhmedAlSunbati712/smart-receipts-backend",
      },
      {
        label: "Frontend",
        href: "https://github.com/AhmedAlSunbati712/smart-receipts-frontend",
      },
    ],
  },
  {
    title: "Yalnix OS",
    period: "Sep 2025",
    description:
      "A UNIX-like kernel for the simulated DCS-58 architecture.",
    detail:
      "Implements virtual memory, traps and interrupts, context switching, scheduling, system calls, synchronization, and IPC.",
    technologies: ["C", "Virtual memory", "Scheduling", "IPC"],
    links: [
      {
        label: "Repository",
        href: "https://github.com/AhmedAlSunbati712/tiny-kernels",
      },
    ],
  },
];

export const currentlyReading: ReadingEntry[] = [
  {
    author: "A. Petrov",
    year: "2019",
    title: "Database Internals",
    subtitle: "A Deep Dive into How Distributed Data Systems Work",
    publisher: "O’Reilly Media",
  },
  {
    author: "M. Kleppmann",
    year: "2017",
    title: "Designing Data-Intensive Applications",
    subtitle:
      "The Big Ideas Behind Reliable, Scalable, and Maintainable Systems",
    publisher: "O’Reilly Media",
  },
  {
    author: "T. Jeffery",
    year: "2021",
    title: "Distributed Services with Go",
    subtitle: "Your Guide to Reliable, Scalable, and Maintainable Systems",
    publisher: "Pragmatic Bookshelf",
  },
];
