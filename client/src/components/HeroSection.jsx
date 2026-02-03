import { Github, Linkedin } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/5" ref={ref}>
      
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.08)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        </div>
        
        {/* Subtle gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-500/10 to-teal-500/10 blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-gradient-to-r from-teal-500/10 to-emerald-500/10 blur-[100px]" />
      </div>

      <div className="container max-w-7xl mx-auto w-full mt-16 sm:mt-0">
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20" 
          initial="hidden" 
          animate={isInView ? "visible" : "hidden"} 
          variants={{ 
            hidden: { opacity: 0 }, 
            visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } 
          }}
        >
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight" 
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}
            >
              <span className="block text-foreground">Hello, I'm Ahmed</span>
              <span className="block text-primary mt-2">
                Software Engineer
              </span>
            </motion.h1>

            <motion.p 
              className="text-lg sm:text-xl text-muted-foreground mt-6 leading-relaxed max-w-2xl" 
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}
            >
              I build <span className="text-primary font-semibold">systems that matter</span> — from operating systems and networks to software infrastructure and computational intelligence. I'm fascinated by how complex structures emerge from simple components.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8" 
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}
            >
              <motion.a 
                href="https://www.linkedin.com/in/ahmed-al-sunbati/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden px-8 py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-3 transition-shadow duration-300" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Linkedin className="h-5 w-5" /> 
                <span>LinkedIn</span>
              </motion.a>
              
              <motion.a 
                href="https://github.com/AhmedAlSunbati712?tab=repositories" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden px-8 py-4 rounded-xl font-semibold border border-border text-foreground hover:border-primary transition-all duration-300 bg-background/80 backdrop-blur-sm text-sm flex items-center justify-center gap-3" 
                whileHover={{ scale: 1.02 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Github className="h-5 w-5" /> 
                <span>GitHub</span>
              </motion.a>
            </motion.div>

            <motion.div 
              className="mt-6 text-center lg:text-left" 
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}
            >
              <div className="text-sm text-muted-foreground">
                Currently working at <span className="text-primary font-semibold">DALI Lab</span> and <span className="text-primary font-semibold">Mind, Brain, & Computation Lab</span>
              </div>
            </motion.div>
          </div>

          {/* Profile Photo */}
          <motion.div 
            className="flex-1 flex justify-center lg:justify-end w-full" 
            variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}
          >
            <div className="relative">
              {/* Subtle glow behind photo */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 blur-2xl" />
              
              {/* Profile image */}
              <motion.div 
                className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <img 
                  src="/me.jpg" 
                  alt="Ahmed Al-Sunbati" 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
