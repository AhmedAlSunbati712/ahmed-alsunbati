import { motion } from "framer-motion";

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
  SiGo,
  SiCplusplus,
  SiC,
  SiNvidia
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi, TbBrain, TbDatabase, TbRobot, TbMessageChatbot } from "react-icons/tb";
import { BsGearWideConnected } from "react-icons/bs";

const skills = [
  { name: "Java", category: "languages", icon: FaJava },
  { name: "Python", category: "languages", icon: SiPython },
  { name: "JavaScript", category: "languages", icon: SiJavascript },
  { name: "TypeScript", category: "languages", icon: SiTypescript },
  { name: "C", category: "languages", icon: SiC },
  { name: "C++", category: "languages", icon: SiCplusplus },
  { name: "Go", category: "languages", icon: SiGo },
  { name: "React", category: "fullstack", icon: SiReact },
  { name: "Angular", category: "fullstack", icon: SiAngular },
  { name: "Node.js", category: "fullstack", icon: SiNodedotjs },
  { name: "Express", category: "fullstack", icon: SiExpress },
  { name: "Redis", category: "fullstack", icon: SiRedis },
  { name: "MongoDB", category: "fullstack", icon: SiMongodb },
  { name: "PostgreSQL", category: "fullstack", icon: SiPostgresql },
  { name: "GraphQL", category: "fullstack", icon: SiGraphql },
  { name: "REST API", category: "fullstack", icon: TbApi },
  { name: "HTML/CSS", category: "fullstack", icon: SiHtml5 },
  { name: "Git", category: "tools", icon: SiGit },
  { name: "CI/CD", category: "tools", icon: BsGearWideConnected },
  { name: "Docker", category: "tools", icon: SiDocker },
  { name: "AWS", category: "tools", icon: SiAmazonwebservices },
  { name: "Kubernetes", category: "tools", icon: SiKubernetes },
  { name: "CUDA", category: "tools", icon: SiNvidia },
  { name: "TensorFlow", category: "aidata", icon: SiTensorflow },
  { name: "Deep Learning", category: "aidata", icon: TbBrain },
  { name: "Reinforcement Learning", category: "aidata", icon: TbRobot },
  { name: "NLP", category: "aidata", icon: TbMessageChatbot },
  { name: "RAG", category: "aidata", icon: TbDatabase },
  { name: "LLMs", category: "aidata", icon: TbBrain },
  { name: "Data Analysis", category: "aidata", icon: TbDatabase },
];

const categories = [
  { id: "languages", label: "Languages" },
  { id: "fullstack", label: "Web and Full-Stack" },
  { id: "tools", label: "Tools" },
  { id: "aidata", label: "AI and Data" }
];

const SkillCard = ({ skill, index }) => {
  const IconComponent = skill.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.15, delay: index * 0.02 }}
    >
      <div className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface-subtle">
          <IconComponent className="h-4.5 w-4.5 text-muted-foreground" />
        </div>
        <span className="text-sm font-medium text-foreground">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
};

export const SkillsSection = () => {
  return (
    <section id="skills" className="px-6 py-20 sm:py-24">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2 }}
          className="mb-12 text-left"
        >
          <p className="mb-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Skills
          </p>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Technical toolkit.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            A grouped overview of the technologies I use most often.
          </p>
        </motion.div>

        <div className="space-y-8">
          {categories.map((category) => {
            const categorySkills = skills.filter((skill) => skill.category === category.id);
            return (
              <div key={category.id}>
                <h3 className="mb-3 text-sm font-semibold text-foreground">{category.label}</h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categorySkills.map((skill, index) => (
                    <SkillCard key={skill.name} skill={skill} index={index} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
