import { useState } from "react";
import Projects from "../sections/Projects"
import projects from "../projects.js"
import AboutSection from "../sections/About";
import experiences from "../experiences.js";
import ExperienceCard from "../components/ExperienceCard";
import Experiences from "../sections/Experiences";
// Placeholder project data


export default function Portfolio() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % projects.length);
  const prev = () => setCurrent((current - 1 + projects.length) % projects.length);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center">
      <AboutSection />
      <Projects projects={projects} />
      <Experiences experiences={experiences} />

    </div>
  );
}