import { Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="group bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden 
                 transition-all duration-300 hover:shadow-xl hover:border-purple-200 flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          src={project.img}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 "></div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col justify-between flex-grow p-6">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {project.tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-purple-50 text-purple-700 px-2 py-1 text-xs rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Buttons — fixed position inside card */}
        <div className="w-full flex justify-center gap-3 pt-5 mt-auto">
          {project.link && (
            <Button
              size="md"
              leftIcon={<FaGithub />}
              as="a"
              href={project.link}
              target="_blank"
              color="white"
              colorScheme="teal"
              _hover={{ bg: "gray.800" }}
              className="transition-all duration-200"
            >
              Code
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
