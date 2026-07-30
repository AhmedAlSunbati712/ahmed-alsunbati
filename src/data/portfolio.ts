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
  period: string;
  status?: string;
  description: string;
  detail: string;
  technologies: string[];
  links?: ProjectLink[];
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
];

export const projects: Project[] = [
  {
    title: "Distributed Transactional Storage Engine",
    period: "May 2026 — Present",
    status: "In progress",
    description:
      "A crash-safe distributed transactional storage engine built from the pager upward.",
    detail:
      "Checksummed rollback journaling, two-phase commit, WAL and checkpointing, with a Raft-backed commit plane for leader election and failover.",
    technologies: ["C++", "Raft", "WAL", "Crash recovery"],
  },
  {
    title: "Proteus",
    period: "Feb 2026",
    description:
      "A distributed generative-AI virtual try-on system with cost-aware GPU orchestration.",
    detail:
      "Queue-driven scheduling batches low-latency inference while KEDA scales GPU pods from Redis demand; SegFormer and CatVTON power the vision pipeline.",
    technologies: ["PyTorch", "Kubernetes", "KEDA", "Redis"],
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
