import { Button } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import me from "../assets/me.jpg";
export default function AboutSection() {
    return (
      <section className="flex flex-col-reverse md:flex-row items-center justify-between max-w-5xl mx-auto px-6 py-16">
        {/* Text section */}
        <div className="flex-1 space-y-5 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
            Hello! I'm <span className="text-gray-900 font-bold">Ahmed</span>, a{" "}
            <span className="bg-purple-100 text-purple-700 px-1 rounded">
              Software Engineer
            </span>{" "}
            based in New Hampshire.
          </h1>
            <p className="text-gray-600 leading-relaxed"> 
            I love thinking about systems, whether it's operating systems, networks, software infrastructure, or even biological and silicon intelligence. I’m fascinated by how complex structures can emerge from simple, almost <span className="italic">"dumb"</span> components.
            </p>
            <p className="text-gray-600 leading-relaxed">
            Most recently, I joined <span className="bg-purple-100 text-purple-700 px-1 font-bold italic rounded">DALI Lab</span> as a <span className="bg-purple-100 text-purple-700 px-1 font-bold italic rounded">Full-Stack Developer</span> on the <span className="bg-green-100 text-green-700 px-1 font-bold italic rounded">Deserto</span> team, a platform making outdoor resources more accessible to the Dartmouth community. I worked on the rental system, built an SMS queue using AWS SQS and Twilio, and launched a posting page for sharing outdoor moments during Homecoming ❤️
            </p>

            <p className="text-gray-600 leading-relaxed">
            I’m now working at the <span className="bg-blue-100 text-blue-700 px-1 font-bold italic rounded">Mind, Brain, & Computation Lab</span>, exploring the tradeoff between generalization and capacity in human cognition. I’m using computational models like memory-augmented architectures and Hopfield networks to understand why our working memory is so limited, yet our cognitive range feels endless.
            </p>

  
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-3">
            <Button className="mt-3" colorScheme="blue">
                <a target="_blank" href="https://www.linkedin.com/in/ahmed-al-sunbati/">
                    <div className="flex items-center justify-center gap-2">
                        <FaLinkedin size={20}/> View Linkedin
                    </div>

                </a>
                
            </Button>
            <Button className="mt-3" bg="black" color="white">
                <a target="_blank" href="https://github.com/AhmedAlSunbati712?tab=repositories">
                    <div className="flex items-center justify-center gap-2">
                    <FaGithub size={20}/> View Github
                    </div>
                    
                </a>
                
            </Button>
          </div>
        </div>
        <div className="flex-1 flex justify-center mb-10 md:mb-0">
          <img
            src={me}
            alt="Ahmed"
            className="w-75 h-80 object-cover rounded-xl shadow-teal-purple"
          />
        </div>
      </section>
    );
  }
  