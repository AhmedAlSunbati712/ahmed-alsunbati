import ExperienceCard from "../components/ExperienceCard";

export default function Experiences({ experiences = [] }) {
  return (
    <section className="max-w-5xl px-6 py-16 mx-auto">
      <div className="w-full flex justify-center text-center align-center mb-8">
        <h1 className="text-3xl md:text-3xl font-semibold text-gray-900">
          <span className="text-3xl text-gray-900 font-bold">Professional</span>{" "}
          <span className="text-3xl bg-purple-100 text-purple-700 px-1 rounded">
            Experience
          </span>
        </h1>
      </div>

      <div className="flex flex-col gap-8">
        {experiences.map((experience, i) => (
          <ExperienceCard
            key={i}
            experience={experience}
            color={experience.color}
          />
        ))}
      </div>
    </section>
  );
}
