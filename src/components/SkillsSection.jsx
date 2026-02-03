import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// React Icons - Simple Icons (tech logos)
import { 
  SiJavascript, 
  SiTypescript, 
  SiReact, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiPostgresql, 
  SiGraphql, 
  SiGit, 
  SiDocker,
  SiPython,
  SiAngular,
  SiRedis,
  SiAmazonwebservices,
  SiKubernetes,
  SiTensorflow,
  SiHtml5,
  SiCss3,
  SiGo,
  SiCplusplus,
  SiC,
  SiNvidia
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi, TbBrain, TbDatabase, TbRobot, TbMessageChatbot } from "react-icons/tb";
import { BsGearWideConnected } from "react-icons/bs";

const skills = [
  // Languages
  { name: "Java", category: "languages", icon: FaJava, color: "#ED8B00" },
  { name: "Python", category: "languages", icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", category: "languages", icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", category: "languages", icon: SiTypescript, color: "#3178C6" },
  { name: "C", category: "languages", icon: SiC, color: "#A8B9CC" },
  { name: "C++", category: "languages", icon: SiCplusplus, color: "#00599C" },
  { name: "Go", category: "languages", icon: SiGo, color: "#00ADD8" },

  // Web & Full-Stack
  { name: "React", category: "fullstack", icon: SiReact, color: "#61DAFB" },
  { name: "Angular", category: "fullstack", icon: SiAngular, color: "#DD0031" },
  { name: "Node.js", category: "fullstack", icon: SiNodedotjs, color: "#339933" },
  { name: "Express", category: "fullstack", icon: SiExpress, color: "#000000" },
  { name: "Redis", category: "fullstack", icon: SiRedis, color: "#DC382D" },
  { name: "MongoDB", category: "fullstack", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", category: "fullstack", icon: SiPostgresql, color: "#4169E1" },
  { name: "GraphQL", category: "fullstack", icon: SiGraphql, color: "#E10098" },
  { name: "REST API", category: "fullstack", icon: TbApi, color: "#06B6D4" },
  { name: "HTML/CSS", category: "fullstack", icon: SiHtml5, color: "#E34F26" },

  // Tools
  { name: "Git", category: "tools", icon: SiGit, color: "#F05032" },
  { name: "CI/CD", category: "tools", icon: BsGearWideConnected, color: "#06B6D4" },
  { name: "Docker", category: "tools", icon: SiDocker, color: "#2496ED" },
  { name: "AWS", category: "tools", icon: SiAmazonwebservices, color: "#FF9900" },
  { name: "Kubernetes", category: "tools", icon: SiKubernetes, color: "#326CE5" },
  { name: "CUDA", category: "tools", icon: SiNvidia, color: "#76B900" },

  // AI & Data
  { name: "TensorFlow", category: "aidata", icon: SiTensorflow, color: "#FF6F00" },
  { name: "Deep Learning", category: "aidata", icon: TbBrain, color: "#8B5CF6" },
  { name: "Reinforcement Learning", category: "aidata", icon: TbRobot, color: "#8B5CF6" },
  { name: "NLP", category: "aidata", icon: TbMessageChatbot, color: "#8B5CF6" },
  { name: "RAG", category: "aidata", icon: TbDatabase, color: "#8B5CF6" },
  { name: "LLMs", category: "aidata", icon: TbBrain, color: "#8B5CF6" },
  { name: "Data Analysis", category: "aidata", icon: TbDatabase, color: "#8B5CF6" },
];

const categories = [
  { id: "all", label: "All Skills", color: "bg-primary" },
  { id: "languages", label: "Languages", color: "bg-blue-500" },
  { id: "fullstack", label: "Web & Full-Stack", color: "bg-emerald-500" },
  { id: "tools", label: "Tools", color: "bg-orange-500" },
  { id: "aidata", label: "AI & Data", color: "bg-violet-500" },
];

const SkillCard = ({ skill, index }) => {
  const IconComponent = skill.icon;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group"
    >
      <div className="bg-card p-4 rounded-xl border border-border/30 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-4">
        {/* Icon */}
        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
          <IconComponent 
            className="w-6 h-6 transition-transform group-hover:scale-110" 
            style={{ color: skill.color }}
          />
        </div>
        
        {/* Name */}
        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSkills = skills.filter(skill => 
    activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-20 md:py-28 px-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
            Skills
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Technologies and tools I work with
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? `${category.color} text-white shadow-md`
                  : "bg-card text-foreground border border-border hover:border-primary/50"
              }`}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
