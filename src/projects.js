import img1 from "./assets/projects_carousel/brain_tumor.png"
import img2 from "./assets/projects_carousel/tse.png"
import img3 from "./assets/projects_carousel/nuggets.png"
import img4 from "./assets/projects_carousel/vibebite.png"
import img5 from "./assets/projects_carousel/grid-cells.png"
import yalnix from "./assets/projects_carousel/yalnix.png"
const projects = [
    {
      title: "Yalnix",
      description: " A UNIX-like operating system kernel for the simulated DCS-58 architecture",
      link: "#",
      img: yalnix
    },
    {
      title: "Tiny Search Engine",
      description: "A search engine in C with multithreaded crawling, indexing, and ranked retrieval",
      link: "https://github.com/AhmedAlSunbati712/Tiny-Search-Engine",
      img: img2
    },
    {
      title: "Nuggets",
      description: "A C-based multiplayer game in which players navigate a mapped environment to collect gold nuggets",
      link: "#",
      img: img3
    },
    {
      title: "Brain Tumor analysis",
      description: "Leveraging ResNet and U-Net for tumor classification and segmentation.",
      link: "#",
      img: img1
    },

    {
        title: "VibeBite",
        description: "A web app that pairs a custom Spotify playlist with a recipe based on your mood, using Spotify, Spoonacular, and OpenAI APIs.",
        link: "https://github.com/AhmedAlSunbati712/VibeBite",
        img: img4
    },
    {
        title: "Spatial Navigation in Artifical Agents",
        description: "Spatial navigation with an LSTM, predicting position from self-motion cues. Biologically inspired grid-like representations.",
        link: "https://github.com/AhmedAlSunbati712/memgrid",
        img: img5
    },
    
];

export default projects;