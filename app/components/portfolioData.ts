/**
 * Portfolio Data Configuration
 * Centralized data for projects, certifications, and skills
 */

/** Link configuration for project cards */
export interface ProjectLink {
  label: string;      // Display text for the link
  href: string;       // URL destination
  primary: boolean;   // Primary action styling
  icon?: string;      // Optional Font Awesome icon class
}

/** Project card data structure */
export interface Project {
  title: string;           // Project name
  description: string;     // Brief description
  image: string;           // Relative path to project image
  tech: string[];          // Technology stack
  links: ProjectLink[];    // External links (GitHub, demo, etc.)
}

/** Certification card data structure */
export interface Certification {
  title: string;    // Certificate title
  issuer: string;   // Issuing organization
  date: string;     // Issue date
  image: string;    // Relative path to certificate image
}

/** Individual skill/technology item */
export interface SkillItem {
  name: string;  // Technology name
  icon: string;  // Icon class or image path
}

/** Skill category grouping */
export interface Skill {
  title: string;        // Category name
  icon: string;         // Category icon class
  items: SkillItem[];   // Technologies in this category
}

/** Portfolio tab configuration */
export interface Tab {
  id: "projects" | "certifications" | "skills";  // Unique tab identifier
  label: string;                                   // Display label
  icon: string;                                    // Font Awesome icon class
}

export const PROJECTS: Project[] = [
  {
    title: "CollabBoard – Real-Time Collaborative Whiteboard",
    description:
      "Collaborative whiteboard application with real-time drawing, user authentication, and board management.",
    image: "/project/CollabBoard.png",
    tech: ["Go", "PostgreSQL", "WebSockets", "React", "TypeScript", "Docker"],
    links: [{ label: "View Project", href: "https://github.com/ByteNirush/CollabBoard.git", primary: true }],
  },
  {
    title: "Elevator Control System",
    description:
      "A complete Windows Forms application demonstrating Object-Oriented Programming principles and software engineering best practices through an elevator simulation system.",
    image: "/project/Elevator.png",
    tech: ["C#", ".NET", "Windows Forms", "SQLite"],
    links: [{ label: "View Project", href: "https://github.com/ByteNirush/Elevator-Control-System.git", primary: true }],
  },
  {
    title: "Electricity Bill System",
    description:
      "Comprehensive software to automate and streamline the electricity billing process: manage customer data, meter readings, bill generation, payment processing, and reporting.",
    image: "/project/Electricity.png",
    tech: ["Java", "JavaFX", "MySQL"],
    links: [{ label: "View Project", href: "https://github.com/ByteNirush/Electricity-Bill-System-Group-17.git", primary: true }],
  },
  {
    title: "FreshGuaard",
    description:
      "AI-Powered Waste Reduction & Recipe Recommendation, Ingredient Safety Scanner, Community Watch & Reporting.",
    image: "/project/FreshGuaard.png",
    tech: ["HTML", "Tailwind", "Python/Django"],
    links: [{ label: "View Project", href: "https://github.com/ByteNirush/foodsafety", primary: true }],
  },
  {
    title: "Taxi Booking System",
    description:
      "Desktop-based taxi booking platform. Enhanced skills in Python, Tkinter, and Database integration through a fully functional booking system.",
    image: "/project/Taxi Booking System.png",
    tech: ["Python", "Tkinter", "SQLite"],
    links: [{ label: "View Project", href: "https://github.com/ByteNirush/Taxi_Booking_System.git", primary: true }],
  },
  {
    title: "Self-Care Web App",
    description:
      "A comprehensive self-care platform with vision board, personal development, journal, and mood-based music recommendation.",
    image: "/project/Self-Care.png",
    tech: ["HTML/CSS", "JavaScript", "Firebase"],
    links: [{ label: "View Project", href: "https://github.com/ByteNirush/BugBusters-Octopus-_Clockmakers.git", primary: true }],
  },
  {
    title: "RescueEats",
    description:
      "RescueEats is a scalable, modern food delivery application built with Flutter. It connects customers with restaurants, offering a seamless ordering experience, real-time updates, and a gamified user experience.",
    image: "/project/RescueEats.png",
    tech: ["Flutter", "Dart", "Express.js", "Node.js", "Mongodb"],
    links: [
      { label: "Frontend", href: "https://github.com/ByteNirush/RescueEats-Frontend.git", primary: true, icon: "fab fa-github" },
      { label: "Backend", href: "https://github.com/ByteNirush/RescueEats.git", primary: false, icon: "fab fa-github" },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Complete Go for Professional Developers",
    issuer: "Frontend Masters",
    date: "July 2025",
    image: "/Certification/Go.png",
  },
  {
    title: "Career Essentials in GitHub Professional Certificate",
    issuer: "GitHub",
    date: "January 2025",
    image: "/Certification/GitHub.png",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    date: "July 2024",
    image: "/Certification/Web-Design.png",
  },
  {
    title: "Scientific Computing with Python",
    issuer: "freeCodeCamp",
    date: "November 2024",
    image: "/Certification/python.png",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "November 2024",
    image: "/Certification/JavaScript.png",
  },
  {
    title: "AWS Educate Getting Started with Databases",
    issuer: "Amazon Web Services (AWS)",
    date: "May 2025",
    image: "/Certification/Databases.png",
  },
  {
    title: "AWS Academy Graduate - AWS Academy Cloud Architecting",
    issuer: "Amazon Web Services (AWS)",
    date: "June 2025",
    image: "/Certification/Academy.png",
  },
  {
    title: "Career Essentials in Software Development by Microsoft and LinkedIn",
    issuer: "Microsoft",
    date: "February 2025",
    image: "/Certification/Microsoft .png",
  },
];

export const SKILLS: Skill[] = [
  {
    title: "Programming Languages",
    icon: "fas fa-code",
    items: [
      { name: "Java", icon: "devicon-java-plain colored" },
      { name: "Go", icon: "devicon-go-original-wordmark colored" },
      { name: "Python", icon: "devicon-python-plain colored" },
      { name: "C", icon: "devicon-c-plain colored" },
      { name: "C#", icon: "devicon-csharp-plain colored" },
      { name: "JavaScript", icon: "devicon-javascript-plain colored" },
      { name: "TypeScript", icon: "devicon-typescript-plain colored" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    icon: "fas fa-layer-group",
    items: [
      { name: "Gin", icon: "/skills/gin.png" },
      { name: "Fiber", icon: "/skills/fiber.png" },
      { name: "Echo", icon: "/skills/echo.png" },
      { name: "Node.js", icon: "devicon-nodejs-plain-wordmark colored" },
      { name: "Express.js", icon: "devicon-express-original" },
      { name: "Spring Boot", icon: "devicon-spring-original colored" },
      { name: "Django", icon: "devicon-django-plain colored" },
      { name: "FastAPI", icon: "devicon-fastapi-plain colored" },
      { name: "React", icon: "devicon-react-original colored" },
      { name: "Next.js", icon: "devicon-nextjs-original-wordmark" },
      { name: "Tailwind CSS", icon: "devicon-tailwindcss-original colored" },
    ],
  },
  {
    title: "Databases",
    icon: "fas fa-database",
    items: [
      { name: "PostgreSQL", icon: "devicon-postgresql-plain colored" },
      { name: "MySQL", icon: "devicon-mysql-plain colored" },
      { name: "SQLite", icon: "devicon-sqlite-plain colored" },
      { name: "MongoDB", icon: "devicon-mongodb-plain colored" },
      { name: "Redis", icon: "devicon-redis-plain colored" },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: "fas fa-cloud",
    items: [
      { name: "Docker", icon: "devicon-docker-plain colored" },
      { name: "Git", icon: "devicon-git-plain colored" },
      { name: "GitHub", icon: "devicon-github-original" }, // Removed colored for white text
      { name: "AWS", icon: "devicon-amazonwebservices-plain-wordmark colored" },
      { name: "Azure", icon: "devicon-azure-plain colored" },
    ],
  },
];
