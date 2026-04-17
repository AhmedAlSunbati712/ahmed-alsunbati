import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { assetUrl } from "@/lib/utils";

export const HeroSection = () => {
  return (
    <section id="hero" className="px-6 py-20 sm:py-28">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="text-left">
            <h1
              className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl"
            >
              Hello, I am Ahmed.
              <span className="mt-2 block text-muted-foreground">
                Software engineer
              </span>
            </h1>

            <p
              className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              I love building things and understanding how complex systems work.
              I am currently a Software Developer and Mentor at DALI Lab, where I previously worked on Deserto and now on to ZebraMD, an AI-powered platform to support rare-disease patients and physicians.
              I also do research at the Mind, Brain, and Computation Lab on the tradeoff between generalization and identification in memory systems.
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a
                href="https://www.linkedin.com/in/ahmed-al-sunbati/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/AhmedAlSunbati712?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-subtle"
              >
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </div>

            <p className="mt-5 text-sm text-muted-foreground">
              Currently working at DALI Lab and Mind, Brain, and Computation Lab.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative h-[20rem] w-[20rem] sm:h-[22rem] sm:w-[22rem]">
              <div className="absolute inset-0 rounded-full border border-border/70 bg-surface-subtle shadow-sm" />
              <div className="absolute inset-[4px] rounded-full border border-border/60" />
              <div className="absolute inset-[10px] overflow-hidden rounded-full border border-border/80 bg-surface">
                <img
                  src={assetUrl("/hero-section avatar.png")}
                  alt="Ahmed Al-Sunbati portrait"
                  className="h-full w-full object-cover object-top scale-[1.18] translate-y-2"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
