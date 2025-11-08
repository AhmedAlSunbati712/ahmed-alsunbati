import ProjectCard from "../components/ProjectCard";

export default function Projects({ projects = [] }) {
  return (
    <section className="max-w-5xl px-6">
      <div className="w-full flex justify-center text-center align-center">
          <h1 className="text-3xl md:text-3xl font-semibold text-gray-900">
            <span className="text-3xl text-gray-900 font-bold">Featured</span>{" "}
            <span className="text-3xl bg-purple-100 text-purple-700 px-1 rounded">
              Projects
            </span>{" "}
            </h1>
      </div>
      <div className="mt-5 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </section>
  );
}
