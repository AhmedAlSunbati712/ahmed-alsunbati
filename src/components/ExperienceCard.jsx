import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

export default function ExperienceCard({ experience, color }) {
  const shadowColors = {
    blue: "shadow-blue-300",
    purple: "shadow-purple-300",
    red: "shadow-red-300",
    green: "shadow-green-300",
    yellow: "shadow-yellow-300",
    pink: "shadow-pink-300",
    gray: "shadow-gray-300",
  };

  const shadow = shadowColors[color] || "shadow-gray-300";

  const image_classes = `w-full h-full object-cover rounded-md shadow-md ${shadow}`;
  const content_classes = `bg-white shadow-sm rounded-md flex flex-col justify-between p-6 flex-grow text-left ${shadow}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full flex flex-col sm:flex-row mt-5"
    >
      {/* Image Section */}
      {experience.img && (
        <div className="sm:w-48 w-full sm:h-56 h-48 flex-shrink-0 mx-2 overflow-hidden">
          <img
            src={experience.img}
            alt={experience.company}
            className={image_classes}
          />
        </div>
      )}

      {/* Content Section */}
      <div className={content_classes}>
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-wrap items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                {experience.company}
              </h3>
              {experience.location && (
                <p className="text-sm text-gray-500 italic flex items-center gap-1">
                  <FaMapMarkerAlt className="text-purple-500" />{" "}
                  {experience.location}
                </p>
              )}
            </div>

            <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
              <FaCalendarAlt className="text-purple-500" />
              {experience.startDate} — {experience.endDate || "Present"}
            </p>

            <p className="mt-4 text-gray-700 text-sm leading-relaxed">
              {experience.description}
            </p>

            {/* Responsibilities List */}
            {experience.responsibilities &&
              experience.responsibilities.length > 0 && (
                <ul className="mt-4 space-y-2 list-disc list-inside text-gray-600 text-sm">
                  {experience.responsibilities.map((item, i) => (
                    <li key={i} className="leading-snug">
                      {item}
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
