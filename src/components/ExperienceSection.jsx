import { Briefcase, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { assetUrl } from "@/lib/utils";

const experiences = [
  {
    id: 1,
    role: "Full-Stack Software Engineer",
    company: "DALI Lab",
    location: "Dartmouth College, Hanover, NH",
    startDate: "August 2025",
    endDate: "Present",
    description: "Working on the Deserto team, building a platform making outdoor resources more accessible to the Dartmouth community. Built the rental system, SMS queue infrastructure, and launched a posting feature for Homecoming.",
    responsibilities: [
      "Designed scalable backend architecture for Deserto's posting system (Node.js + PostgreSQL + AWS), supporting 10k+ simulated concurrent requests during load testing",
      "Built asynchronous SMS queue pipeline using AWS SQS and Twilio, ensuring reliability in message delivery",
      "Improved platform performance by 40% via image compression, responsive sizing, and lazy loading; redesigned UI with React + Tailwind",
      "Developed rental management system for outdoor gear, handling scheduling, concurrency, and data consistency"
    ],
    image: "/experiences/dali.jpeg",
    current: true
  },
  {
    id: 2,
    role: "Software Developer, Research Assistant",
    company: "Contextual Dynamics Lab",
    location: "Dartmouth College, Hanover, NH",
    startDate: "March 2025",
    endDate: "October 2025",
    description: "Researching how the brain reorganizes connectivity during memory encoding and forgetting. Built the lab's fMRI analysis pipeline from scratch with modular components for subject data, brain networks, and preprocessing.",
    responsibilities: [
      "Built scalable Python pipelines to process 25GB+ fMRI datasets from 20+ subjects, reducing processing time per subject by 35%",
      "Developed automated clustering & pattern detection workflows using hierarchical clustering, improving pipeline efficiency 25%",
      "Implemented interactive Python/Plotly dashboards and visualization tools to track processing time, success rates, and anomalies"
    ],
    image: "/experiences/cdl.png",
    current: false
  },
  {
    id: 3,
    role: "Research Assistant",
    company: "Spin Lab",
    location: "Dartmouth College, Hanover, NH",
    startDate: "June 2024",
    endDate: "November 2024",
    description: "Explored how isolated quantum systems transition between thermalized and localized phases by simulating interacting spins in disordered 1D chains. Focused on information spread and quantum chaos dynamics.",
    responsibilities: [
      "Optimized particle simulation engine in Python, cutting runtime by 60% and enabling simulation of 200% larger systems with ~100 interacting particles",
      "Developed data aggregation pipelines to compute energy spread, entanglement, and correlation metrics, generating structured datasets of 2k+ data points per experiment",
      "Automated 200+ simulation runs with multithreading and batch processing; built visualization and reporting scripts to analyze system phases"
    ],
    image: "/experiences/spin.png",
    current: false
  }
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="px-6 py-20 sm:py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-left"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <p className="mb-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Experience
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Work timeline.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Research and engineering roles where I designed, built, and shipped systems
            with measurable impact.
          </p>
        </motion.div>

        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <motion.article
              key={experience.id}
              className="rounded-xl border border-border bg-surface p-5 shadow-sm sm:p-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.2, delay: index * 0.04 }}
            >
              <div className="mb-4 flex items-start gap-4">
                <div className="h-12 w-12 overflow-hidden rounded-lg border border-border bg-surface-subtle">
                  <img
                    src={assetUrl(experience.image)}
                    alt={experience.company}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold tracking-tight">{experience.role}</h3>
                    {experience.current && (
                      <span className="rounded-full border border-border bg-surface-subtle px-2.5 py-1 text-xs text-muted-foreground">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {experience.company}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {experience.startDate} - {experience.endDate}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {experience.location}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                {experience.description}
              </p>

              <ul className="mt-4 space-y-2">
                {experience.responsibilities.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
