import { ArrowRight, Github, ChevronUp, Star, Code, Sparkles, X } from "lucide-react";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Smart Receipts",
    category: "Web Development",
    description: "A scalable full-stack receipt processing system with Express, PostgreSQL/Prisma, and AWS S3; features an asynchronous BullMQ + Redis pipeline for OCR (Tesseract) and LLM-based data extraction, with a React + TypeScript frontend for real-time visualization.",
    image: "/projects/vibebite.png", // TODO: Replace with actual Smart Receipts screenshot
    tags: ["TypeScript", "Express", "PostgreSQL", "Prisma", "BullMQ", "Redis", "AWS S3", "Tesseract OCR", "LLM"],
    githubUrl: "https://github.com/AhmedAlSunbati712/smart-receipts-backend",
    frontendUrl: "https://github.com/AhmedAlSunbati712/smart-receipts-frontend",
    featured: true,
    accentColor: "from-teal-500 to-cyan-600",
    status: "Complete",
    highlights: ["OCR processing pipeline", "LLM-based extraction", "Real-time analytics"]
  },
  {
    id: 2,
    title: "P2P VideoChat over UDP",
    category: "Networking",
    description: "A peer-to-peer encrypted video calling system in Python over UDP; features custom reliable transport with sequence numbering and selective retransmission, multithreading for real-time frame processing, and Diffie-Hellman key exchange for secure communication.",
    image: "/projects/tse.png", // TODO: Replace with actual VideoChat screenshot
    tags: ["Python", "UDP Sockets", "Multithreading", "Diffie-Hellman", "Cryptography", "Network Protocol"],
    githubUrl: "https://github.com/AhmedAlSunbati712/videochat-app",
    featured: true,
    accentColor: "from-violet-500 to-purple-600",
    status: "Complete",
    highlights: ["P2P architecture", "End-to-end encryption", "Custom reliable transport"]
  },
  {
    id: 3,
    title: "Yalnix",
    category: "Systems Programming",
    description: "A UNIX-like operating system kernel for the simulated DCS-58 architecture",
    image: "/projects/yalnix.png",
    tags: ["C", "Operating Systems", "Kernel Development"],
    githubUrl: "https://github.com/AhmedAlSunbati712/tiny-kernels",
    featured: true,
    accentColor: "from-blue-500 to-cyan-600",
    status: "Complete",
    highlights: ["Kernel development", "Process management", "System calls"]
  },
  {
    id: 4,
    title: "Tiny Search Engine",
    category: "Systems Programming",
    description: "A search engine in C with multithreaded crawling, indexing, and ranked retrieval",
    image: "/projects/tse.png",
    tags: ["C", "Multithreading", "Search Algorithms"],
    githubUrl: "https://github.com/AhmedAlSunbati712/Tiny-Search-Engine",
    featured: true,
    accentColor: "from-purple-500 to-indigo-600",
    status: "Complete",
    highlights: ["Multithreaded crawling", "Indexing", "Ranked retrieval"]
  },
  {
    id: 6,
    title: "Nuggets",
    category: "Systems Programming",
    description: "A C-based multiplayer game in which players navigate a mapped environment to collect gold nuggets",
    image: "/projects/nuggets.png",
    tags: ["C", "Networking", "Multiplayer"],
    githubUrl: "https://github.com/AhmedAlSunbati712/Nuggets-CS50-Group-project",
    featured: true,
    accentColor: "from-amber-500 to-orange-600",
    status: "Complete",
    highlights: ["Multiplayer game", "Real-time gameplay", "Map navigation"]
  },
  {
    id: 7,
    title: "Brain Tumor Analysis",
    category: "Machine Learning",
    description: "Leveraging ResNet and U-Net for tumor classification and segmentation",
    image: "/projects/brain_tumor.png",
    tags: ["Python", "Deep Learning", "Computer Vision"],
    githubUrl: "https://github.com/xghouftw/brain-tumor-analysis",
    featured: true,
    accentColor: "from-emerald-500 to-teal-600",
    status: "Complete",
    highlights: ["ResNet", "U-Net", "Medical imaging"]
  },
  {
    id: 8,
    title: "VibeBite",
    category: "Web Development",
    description: "A web app that pairs a custom Spotify playlist with a recipe based on your mood, using Spotify, Spoonacular, and OpenAI APIs",
    image: "/projects/vibebite.png",
    tags: ["Web Development", "API Integration", "Spotify"],
    githubUrl: "https://github.com/AhmedAlSunbati712/VibeBite",
    featured: true,
    accentColor: "from-pink-500 to-rose-600",
    status: "Complete",
    highlights: ["API integration", "Mood-based recommendations", "Recipe pairing"]
  },
  {
    id: 9,
    title: "Spatial Navigation in Artificial Agents",
    category: "Machine Learning",
    description: "Spatial navigation with an LSTM, predicting position from self-motion cues. Biologically inspired grid-like representations",
    image: "/projects/grid-cells.png",
    tags: ["Python", "LSTM", "Neuroscience"],
    githubUrl: "https://github.com/AhmedAlSunbati712/memgrid",
    featured: true,
    accentColor: "from-indigo-500 to-purple-600",
    status: "Complete",
    highlights: ["LSTM networks", "Spatial navigation", "Biological modeling"]
  }
];

const categoryColors = {
  "Systems Programming": "from-blue-500/20 to-cyan-600/20 text-blue-600 border-blue-500/30",
  "Machine Learning": "from-emerald-500/20 to-teal-600/20 text-emerald-600 border-emerald-500/30",
  "Web Development": "from-pink-500/20 to-rose-600/20 text-pink-600 border-pink-500/30",
  "Networking": "from-violet-500/20 to-purple-600/20 text-violet-600 border-violet-500/30"
};

export const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5, 1], [0.1, 0.2, 0.1]);

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);
  
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  const categories = ["All", ...new Set(projects.map(project => project.category))];

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setShowAll(false);
    setIsMobileFilterOpen(false);
  };

  const handleVideoPlay = (project) => {
    setSelectedVideo(project);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const ProjectHighlights = ({ highlights }) => (
    <div className="space-y-2">
      {highlights.map((highlight, index) => (
        <div key={index} className="flex items-center gap-2 text-sm">
          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
          <span className="text-muted-foreground">{highlight}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section 
      id="projects" 
      className="relative min-h-screen py-20 md:py-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
      ref={sectionRef}
    >
      {/* Clean Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
        {/* Header */}
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
            <Sparkles className="h-4 w-4" />
            My Projects
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Project
            <span className="block text-primary">Portfolio</span>
          </motion.h2>

          <motion.p 
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            A collection of projects I've built to showcase my skills in full-stack development and modern web technologies.
          </motion.p>
        </motion.div>

        {/* Simple Filter */}
        <motion.div 
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => handleFilterChange(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border ${
                  activeFilter === category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                className="group"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="relative bg-background border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                  
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Status Badge */}
                    <div className="absolute top-3 right-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        project.status === "Complete" 
                          ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/30"
                          : "bg-amber-500/20 text-amber-600 border border-amber-500/30"
                      }`}>
                        {project.status}
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${categoryColors[project.category]}`}>
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Overlay - Code Button Only */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 rounded-full backdrop-blur-sm border bg-white/20 text-white border-white/30 hover:bg-white/30 transition-all duration-200"
                      >
                        <Code size={20} />
                      </a>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-foreground">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <motion.div 
                          className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/20 text-amber-600 text-xs font-medium border border-amber-500/30"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.3 }}
                        >
                          <Star size={12} className="fill-amber-500" /> 
                          Featured
                        </motion.div>
                      )}
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                      {project.description}
                    </p>

                    {/* Key Features */}
                    <div className="mb-4">
                      <ProjectHighlights highlights={project.highlights} />
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + tagIndex * 0.05 + 0.4 }}
                          className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4 border-t border-border">
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium border transition-all duration-300 ${
                          project.githubUrl === "#"
                            ? "bg-muted text-muted-foreground cursor-not-allowed border-border"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                        onClick={(e) => project.githubUrl === "#" && e.preventDefault()}
                      >
                        <Github size={16} />
                        View Code
                      </motion.a>
                      {project.frontendUrl && (
                        <motion.a
                          href={project.frontendUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium border transition-all duration-300 bg-background text-foreground border-border hover:border-primary hover:bg-primary/5"
                        >
                          <Code size={16} />
                          Frontend
                        </motion.a>
                      )}
                    </div>
                  </div>

                  {/* Accent Border */}
                  <div className={`h-1 bg-gradient-to-r ${project.accentColor}`} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More */}
        {filteredProjects.length > 3 && (
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-medium transition-all duration-300 ${
                showAll
                  ? "bg-muted text-foreground border border-border"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {showAll ? (
                <>
                  <ChevronUp size={18} />
                  Show Less
                </>
              ) : (
                <>
                  View More Projects
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </motion.div>
        )}

      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-background rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedVideo.title} Demo
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {selectedVideo.category}
                  </p>
                </div>
                <motion.button
                  onClick={handleCloseVideo}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Video Player */}
              <div className="aspect-video bg-black">
                <video
                  ref={videoRef}
                  src={selectedVideo.video}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                  onEnded={handleCloseVideo}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <p className="text-muted-foreground text-sm flex-1">
                    Watch the demo of {selectedVideo.title} in action
                  </p>
                  <div className="flex gap-3">
                    <motion.a
                      href={selectedVideo.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        selectedVideo.demoUrl === "#"
                          ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                      onClick={(e) => selectedVideo.demoUrl === "#" && e.preventDefault()}
                    >
                      Visit Live Site
                    </motion.a>
                    <motion.a
                      href={selectedVideo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg text-sm font-medium border transition-all duration-300 ${
                        selectedVideo.githubUrl === "#"
                          ? "bg-muted text-muted-foreground cursor-not-allowed border-border"
                          : "bg-background text-foreground border-border hover:border-primary hover:bg-primary/5"
                      }`}
                      onClick={(e) => selectedVideo.githubUrl === "#" && e.preventDefault()}
                    >
                      View Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};