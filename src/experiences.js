import dali from "./assets/experiences/dali.jpeg"
import cdl from "./assets/experiences/cdl.png"
import spin from "./assets/experiences/spin.png"

const experiences = [
    {
        company: "Full-stack Software Developer, Dali Lab",
        location: "Dartmouth College, Hanover",
        startDate: "August 2025",
        endDate: "Present",
        description: "Working as Full-Stack Developer on the Deserto team, a platform making outdoor resources more accessible to the Dartmouth community. I worked on the rental system, built an SMS queue using AWS SQS and Twilio, and launched a posting page for sharing outdoor moments during Homecoming ",
        responsibilities: ["Designed scalable backend architecture for Deserto’s posting system (Node.js + PostgreSQL + AWS), supporting 10k+ simulated concurrent requests during load testing.", "Built asynchronous SMS queue pipeline using AWS SQS and Twilio, ensuring reliability in message delivery.", "Developed rental management system for outdoor gear, handling scheduling, concurrency, and data consistency."],
        img: dali,
        color: "blue"
    },
    {
        company: "Research Assistant, Contextual Dynamics Lab",
        location: "Dartmouth College, Hanover",
        startDate: "March 2025",
        endDate: "Present",
        description: "I work on understanding how the brain reorganizes its connectivity when people are told to remember or forget information. Using data from a directed-forgetting experiment, I built the lab’s analysis pipeline from scratch into modular components that handle subject data, brain networks, and preprocessing. The goal is to uncover how memory encoding and forgetting show up in large-scale brain communication patterns.",
        responsibilities: ["Processed fMRI scans from 20+ subjects to analyze brain region communication during directed-forgetting experiment", "Created custom brain maps and used clustering algorithms to group similar activity patterns, improving data processing efficiency by 40%", "Used Python, nilearn, and matplotlib to analyze and visualize 25GB of brain imaging data into clear insights"],
        img: cdl,
        color: "green"
    },
    {
        company: "Research Assistant, Spin Lab",
        location: "Dartmouth College, Hanover",
        startDate: "June 2024",
        endDate: "November 2024",
        description: "Explored how isolated quantum systems transition between thermalized and localized phases by simulating interacting spins in disordered 1D chains. Focused on how information spreads and whether quantum dynamics can mimic classical chaos.",
        responsibilities: ["Modeled the behavior of ~100 interacting particles in fluorapatite crystals using QuSpin.", "Analyzed energy spread and quantum information using entanglement and other metrics over 200+ runs.", "Compared different measures to evaluate whether the system behaves more like a thermalized or localized phase.", "Improved simulation code, cutting runtime by 60% and doubling the system size handled locally."],
        img: spin,
        color: "green"
    }

]

export default experiences;