import { Briefcase, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

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
    accentColor: "from-blue-500 to-cyan-600",
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
    accentColor: "from-emerald-500 to-teal-600",
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
    accentColor: "from-slate-500 to-gray-600",
    current: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: (index) => ({
    opacity: 0,
    x: index % 2 === 0 ? -50 : 50
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

const ExperienceCard = ({ experience, index }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className={`relative flex items-center w-full ${
        isLeft ? "lg:justify-start" : "lg:justify-end"
      }`}
    >
      {/* Timeline dot - visible on all screens */}
      <div className="absolute left-0 lg:left-1/2 lg:-translate-x-1/2 z-10">
        <motion.div
          className={`w-4 h-4 rounded-full border-4 border-background ${
            experience.current ? "bg-emerald-500" : "bg-primary"
          }`}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          viewport={{ once: true }}
        >
          {experience.current && (
            <motion.div
              className="absolute inset-0 rounded-full bg-emerald-500"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        className={`ml-8 lg:ml-0 lg:w-[calc(50%-2rem)] ${
          isLeft ? "lg:mr-auto lg:pr-8" : "lg:ml-auto lg:pl-8"
        }`}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="bg-card rounded-2xl border border-border/30 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          {/* Card Header */}
          <div className="p-6 pb-4">
            <div className="flex items-start gap-4">
              {/* Company Logo */}
              <div className="w-14 h-14 rounded-xl overflow-hidden border border-border/50 flex-shrink-0 bg-background">
                <img
                  src={experience.image}
                  alt={experience.company}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Company */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-foreground leading-tight">
                    {experience.role}
                  </h3>
                  {experience.current && (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 text-xs font-medium border border-emerald-500/30 flex-shrink-0">
                      Current
                    </span>
                  )}
                </div>
                <p className="text-primary font-semibold mt-1">{experience.company}</p>
              </div>
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{experience.startDate} — {experience.endDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>{experience.location}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="px-6 pb-4">
            <p className="text-muted-foreground text-sm leading-relaxed">
              {experience.description}
            </p>
          </div>

          {/* Responsibilities */}
          <div className="px-6 pb-6">
            <div className="space-y-2">
              {experience.responsibilities.map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-2 text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Accent Border */}
          <div className={`h-1 bg-gradient-to-r ${experience.accentColor}`} />
        </div>
      </motion.div>
    </motion.div>
  );
};

export const ExperienceSection = () => {
  return (
    <section
      id="experience"
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-secondary/5 to-background"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Briefcase className="h-4 w-4" />
            My Experience
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Work
            <span className="block text-primary">Experience</span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            My journey through research labs and software development, building systems that matter.
          </motion.p>
        </motion.div>

        {/* Timeline Container */}
        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical Timeline Line */}
          <div className="absolute left-[7px] lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5">
            <motion.div
              className="h-full bg-gradient-to-b from-cyan-500 via-teal-500 to-emerald-500 rounded-full"
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Experience Cards */}
          <div className="space-y-12 lg:space-y-16">
            {experiences.map((experience, index) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
