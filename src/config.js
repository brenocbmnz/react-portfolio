// Skills icons - https://icon-sets.iconify.design/
import { Icon } from "@iconify/react";

// Navbar Logo image (add your image to the src/images directory and uncomment the line below to import your image)
// import newLogo from "./images/yourFileName"

// Hero Images (add your images to the /images directory with the same names)
import HeroLight from "./images/hero-light.jpg";
import HeroDark from "./images/hero-dark.jpg";

// Projects Images (add your images to the images directory and import below)
import Logo from "./images/logo.svg";

/* START HERE
 **************************************************************
  Add your GitHub username (string - "YourUsername") below.
*/
export const githubUsername = "brenocbmnz";

// Navbar Logo image
export const navLogo = null;

/* Main
 ************************************************************** 
  Add a custom blog icon or update the hero images for the Main section.
*/
export const Blog = null;

// LinkedIn URL
export const linkedin = "https://www.linkedin.com/in/breno-cardoso-bezerra-de-menezes-767a88161/";

export const portfolioContent = {
  eyebrow: "FULL STACK DEVELOPER  HUMAN-CENTERED TECHNOLOGY",
  headline: "I build useful products for the web.",
  introduction:
    "Full-stack developer building thoughtful, accessible web products, with a particular interest in games and inclusive technologies.",
  bio:
    "I’m a full-stack developer interested in using technology to help people and strengthen the communities around them.",
  about:
    "Human rights and social impact shape the problems I want to work on. I enjoy turning real needs into accessible, maintainable products, from PHP and Laravel backends to JavaScript and React interfaces. Sometimes I dabble in Python and C#.",
};

// Hero images (imported above - lines 8-9)
export { HeroLight as Light };
export { HeroDark as Dark };

/* About Me
 **************************************************************
  Add a second paragraph for the about me section.
*/
export const moreInfo = portfolioContent.about;

/* Skills
 ************************************************************** 
  Add or remove skills in the SAME format below, choose icons here - https://icon-sets.iconify.design/
*/
export const skillData = [
  {
    id: 1,
    skill: <Icon icon="mdi:language-html5" className="display-4" />,
    name: "HTML5",
  },
  {
    id: 2,
    skill: <Icon icon="ion:logo-css3" className="display-4" />,
    name: "CSS3",
  },
  {
    id: 3,
    skill: <Icon icon="fa6-brands:php" className="display-4" />,
    name: "PHP",
  },
  {
    id: 4,
    skill: <Icon icon="simple-icons:laravel" className="display-4" />,
    name: "Laravel",
  },
  {
    id: 5,
    skill: <Icon icon="fa6-brands:js" className="display-4" />,
    name: "JavaScript",
  },
  {
    id: 6,
    skill: <Icon icon="ri:bootstrap-fill" className="display-4" />,
    name: "BootStrap",
  },
  {
    id: 7,
    skill: <Icon icon="mdi:react" className="display-4" />,
    name: "React",
  },
  {
    id: 8,
    skill: <Icon icon="mdi:docker" className="display-4" />,
    name: "Docker",
  },
  {
    id: 9,
    skill: <Icon icon="fa6-brands:square-github" className="display-4" />,
    name: "GitHub",
  },
  {
    id: 10,
    skill: <Icon icon="mdi:language-python" className="display-4" />,
    name: "Python",
  },
  {
    id: 11,
    skill: <Icon icon="devicon-plain:csharp" className="display-4" />,
    name: "C#",
  },
  {
    id: 12,
    skill: <Icon icon="fa6-brands:git-alt" className="display-4" />,
    name: "Git",
  },
];

export const skillGroups = [
  {
    id: "frontend",
    name: "Frontend",
    description: "Interfaces that stay clear, responsive, and accessible.",
    skills: ["HTML5", "CSS3", "JavaScript", "React", "Bootstrap"],
  },
  {
    id: "backend",
    name: "Backend",
    description: "Application logic, APIs, and data-driven workflows.",
    skills: ["PHP", "Laravel"],
  },
  {
    id: "workflow",
    name: "Tools & workflow",
    description: "Practical tooling for versioning, delivery, and repeatable environments.",
    skills: ["Docker", "Git", "GitHub"],
  },
  {
    id: "exploring",
    name: "Also exploring",
    description: "Languages I occasionally use for experiments and side projects.",
    skills: ["Python", "C#"],
  },
];

// Resume link (string - "https://YourResumeUrl") - I am using CloudFront to share my resume (https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html)
export const resume = null;

/* Projects
 ************************************************************** 
  List the repo names (string - "your-repo-name") you want to include (they will be sorted alphabetically). If empty, only the first 3 will be included.
*/
export const filteredProjects = ["safer-app", "dnd-gen", "ecommerce-integrador"];

export const projectMetadata = [
  {
    name: "safer-app",
    category: "Community",
    stack: ["Laravel", "JavaScript", "Maps"],
    featuredOrder: 1,
    description:
      "A community platform that helps LGBTQIAPN+ people register and discover welcoming spaces.",
  },
  {
    name: "dnd-gen",
    category: "Creative Tool",
    stack: ["React", "AI", "JavaScript"],
    featuredOrder: 2,
    description:
      "An AI-assisted tool for exploring character references and shaping tabletop RPG ideas.",
  },
  {
    name: "ecommerce-integrador",
    category: "Commerce",
    stack: ["PHP", "JavaScript", "E-commerce"],
    featuredOrder: 3,
    description:
      "A complete e-commerce platform covering the core browsing and purchasing workflow.",
  },
];

// Custom descriptions for project cards (overrides the GitHub repo description)
export const projectDescriptions = [
  {
    name: "safer-app",
    description: "A community platform that helps LGBTQIAPN+ people register and discover welcoming spaces.",
  },
  {
    name: "dnd-gen",
    description: "An AI-assisted tool for exploring character references and shaping tabletop RPG ideas.",
  },
  {
    name: "ecommerce-integrador",
    description: "A complete e-commerce platform covering the core browsing and purchasing workflow.",
  },
];

// Replace the defualt GitHub image for matching repos below (images imported above - lines 7-8)
export const projectCardImages = [
  {
    name: "example-1",
    image: Logo,
  },
];

/* Contact Info
 ************************************************************** 
  Add your formspree endpoint below.
  https://formspree.io/
*/
export const formspreeUrl = "https://formspree.io/f/mlgqabbk";

// Footer icons theme (light or dark)
export const footerTheme = "dark";
