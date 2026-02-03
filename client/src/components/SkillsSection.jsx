import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import your images
import htmlIcon from "@/assets/icons/html.png";
import cssIcon from "@/assets/icons/css.png";
import jsIcon from "@/assets/icons/javascript.png";
import tsIcon from "@/assets/icons/typescript.png";
import reactIcon from "@/assets/icons/react.png";
import nextjsIcon from "@/assets/icons/nextjs.png";
import nodejsIcon from "@/assets/icons/nodejs.png";
import expressIcon from "@/assets/icons/express.png";
import mongodbIcon from "@/assets/icons/mongodb.png";
import postgresqlIcon from "@/assets/icons/postgresql.png";
import graphqlIcon from "@/assets/icons/graphql.png";
import javaIcon from "@/assets/icons/java.png";
import pythonIcon from "@/assets/icons/python.png";
import gitIcon from "@/assets/icons/git.png";
import githubIcon from "@/assets/icons/github.png";
import dockerIcon from "@/assets/icons/docker.png";
import SQLIcon from "@/assets/icons/sql.png";
import MySQLIcon from "@/assets/icons/mysql.png";

const skills = [
  // Languages
  { name: "Java", level: 90, category: "languages", icon: "java" },
  { name: "Python", level: 90, category: "languages", icon: "python" },
  { name: "JavaScript", level: 90, category: "languages", icon: "javascript" },
  { name: "TypeScript", level: 85, category: "languages", icon: "typescript" },
  { name: "C", level: 85, category: "languages", icon: null },
  { name: "C++", level: 80, category: "languages", icon: null },
  { name: "Go", level: 75, category: "languages", icon: null },

  // Web & Full-Stack
  { name: "React", level: 90, category: "fullstack", icon: "react" },
  { name: "Angular", level: 75, category: "fullstack", icon: null },
  { name: "Node.js", level: 90, category: "fullstack", icon: "nodejs" },
  { name: "Express", level: 85, category: "fullstack", icon: "express" },
  { name: "Redis", level: 80, category: "fullstack", icon: null },
  { name: "MongoDB", level: 85, category: "fullstack", icon: "mongodb" },
  { name: "PostgreSQL", level: 85, category: "fullstack", icon: "postgresql" },
  { name: "GraphQL", level: 80, category: "fullstack", icon: "graphql" },
  { name: "REST API", level: 90, category: "fullstack", icon: null },
  { name: "HTML/CSS", level: 90, category: "fullstack", icon: "html" },

  // Tools
  { name: "Git", level: 90, category: "tools", icon: "git" },
  { name: "CI/CD", level: 80, category: "tools", icon: null },
  { name: "Docker", level: 85, category: "tools", icon: "docker" },
  { name: "AWS", level: 80, category: "tools", icon: null },
  { name: "Kubernetes", level: 70, category: "tools", icon: null },
  { name: "CUDA", level: 70, category: "tools", icon: null },

  // AI & Data
  { name: "TensorFlow", level: 80, category: "aidata", icon: null },
  { name: "Deep Learning", level: 85, category: "aidata", icon: null },
  { name: "Reinforcement Learning", level: 75, category: "aidata", icon: null },
  { name: "NLP", level: 80, category: "aidata", icon: null },
  { name: "RAG", level: 80, category: "aidata", icon: null },
  { name: "LLMs", level: 85, category: "aidata", icon: null },
  { name: "Data Analysis", level: 85, category: "aidata", icon: null },
];

const categories = [
  { id: "all", label: "All Skills", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { id: "languages", label: "Languages", color: "bg-gradient-to-r from-blue-500 to-cyan-500" },
  { id: "fullstack", label: "Web & Full-Stack", color: "bg-gradient-to-r from-green-500 to-emerald-500" },
  { id: "tools", label: "Tools", color: "bg-gradient-to-r from-orange-500 to-yellow-500" },
  { id: "aidata", label: "AI & Data", color: "bg-gradient-to-r from-pink-500 to-rose-500" },
];

const iconImages = {
  html: htmlIcon,
  css: cssIcon,
  javascript: jsIcon,
  typescript: tsIcon,
  react: reactIcon,
  nextjs: nextjsIcon,
  nodejs: nodejsIcon,
  express: expressIcon,
  mongodb: mongodbIcon,
  postgresql: postgresqlIcon,
  graphql: graphqlIcon,
  java: javaIcon,
  python: pythonIcon,
  git: gitIcon,
  github: githubIcon,
  docker: dockerIcon,
  sql: SQLIcon,
  mysql: MySQLIcon,
};

const SkillBar = ({ level }) => (
  <div className="w-full h-3 bg-secondary/20 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${level}%` }}
      transition={{ duration: 1.5, delay: 0.2 }}
      className={`h-full rounded-full ${
        level > 75 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
        level > 50 ? 'bg-gradient-to-r from-yellow-400 to-amber-500' : 
        'bg-gradient-to-r from-red-400 to-pink-500'
      }`}
    />
  </div>
);

const SkillIcon = ({ skill }) => (
  <div className="w-16 h-16 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
    {skill.icon && iconImages[skill.icon] ? (
      <img src={iconImages[skill.icon]} alt={skill.name} className="w-8 h-8 object-contain" />
    ) : (
      <span className="text-xs font-bold text-primary text-center px-1">{skill.name.slice(0, 3)}</span>
    )}
  </div>
);

const InfiniteScrollSkills = ({ skills }) => {
  const duplicatedSkills = [...skills, ...skills, ...skills];
  
  return (
    <div className="overflow-hidden py-8">
      <motion.div
        className="flex gap-8 mb-8"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div key={`${skill.name}-${index}`} className="flex-shrink-0 flex flex-col items-center gap-2">
            <SkillIcon skill={skill} />
            <span className="text-sm font-medium text-center">{skill.name}</span>
          </div>
        ))}
      </motion.div>
      
      <motion.div
        className="flex gap-8"
        animate={{ x: ["-100%", "0%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...duplicatedSkills].reverse().map((skill, index) => (
          <div key={`${skill.name}-reverse-${index}`} className="flex-shrink-0 flex flex-col items-center gap-2">
            <SkillIcon skill={skill} />
            <span className="text-sm font-medium text-center">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSkills = skills.filter(skill => 
    activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-28 px-4 bg-gradient-to-br from-background via-secondary/5 to-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            My Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Technologies I've mastered and my proficiency levels
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2.5 rounded-full font-medium border border-transparent hover:shadow-lg ${
                activeCategory === category.id
                  ? `${category.color} text-white shadow-md`
                  : "bg-secondary/50 text-foreground hover:bg-secondary/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {activeCategory === "all" ? (
          <InfiniteScrollSkills skills={skills} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-card p-6 rounded-2xl border border-border/30 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg group"
                >
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 rounded-full bg-card border-2 border-primary/50 flex items-center justify-center">
                      {skill.icon && iconImages[skill.icon] ? (
                        <img src={iconImages[skill.icon]} alt={skill.name} className="w-6 h-6 object-contain" />
                      ) : (
                        <span className="text-xs font-bold text-primary">{skill.name.slice(0, 3)}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {skill.name}
                        </h3>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          skill.level > 75 ? 'bg-emerald-500/10 text-emerald-500' : 
                          skill.level > 50 ? 'bg-amber-500/10 text-amber-500' : 
                          'bg-pink-500/10 text-pink-500'
                        }`}>
                          {skill.level}%
                        </span>
                      </div>
                      <SkillBar level={skill.level} />
                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>Basic</span>
                        <span>Advanced</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};