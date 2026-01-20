import { 
  Code2, Database, Server, Layout, Wrench, Terminal, 
  Github, Linkedin, Mail, Smartphone, Globe, BarChart, Cpu, BookOpen
} from 'lucide-react';
import { NavItem, SkillCategory, ExperienceItem, ProjectItem, EducationItem } from './types';

export const PERSONAL_DETAILS = {
  name: "Mohd Mateenur Rehman",
  role: "Full Stack Developer",
  tagline: "Building Secure & Scalable Web Applications.",
  email: "3mateen@gmail.com",
  phone: "+91 9675544716",
  location: "New Delhi, Delhi, India",
  linkedin: "https://www.linkedin.com/in/mateenur-rehman/",
  github: "https://github.com/mateenism",
  about: "I'm a passionate Full Stack Developer with a strong foundation in Laravel, PHP, MySQL, and JavaScript. I enjoy transforming ideas into responsive, secure, and user-friendly web applications that solve real-world problems. Over time, I’ve gained hands-on experience in API integration, database design, and clean code architecture. My focus is on building scalable systems while maintaining an eye for design and user experience. I believe in continuous learning, collaboration, and writing code that makes an impact. Every project I work on is a step forward in creating smarter and more meaningful digital solutions.",
  profileImage: "https://picsum.photos/400/400?grayscale" // Placeholder
};

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Top Skills",
    skills: [
      { name: "Laravel", icon: Server },
      { name: "PHP", icon: Code2 },
      { name: "Python", icon: Code2 },
      { name: "MySQL", icon: Database },
      { name: "HTML5", icon: Layout },
    ]
  },
  {
    title: "Frontend & JavaScript",
    skills: [
      { name: "JavaScript", icon: Code2 },
      { name: "CSS3", icon: Layout },
      { name: "Bootstrap", icon: Layout },
      { name: "Responsive Design", icon: Smartphone },
    ]
  },
  {
    title: "Backend & Security",
    skills: [
      { name: "RESTful APIs", icon: Globe },
      { name: "Authentication", icon: Wrench },
      { name: "RBAC", icon: Wrench },
      { name: "System Architecture", icon: Server },
    ]
  },
  {
    title: "Tools & Version Control",
    skills: [
      { name: "Git & GitHub", icon: Github },
      { name: "VS Code", icon: Terminal },
      { name: "Database Design", icon: Database },
      { name: "Debugging", icon: Wrench },
    ]
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: "AeoLogic Technologies",
    role: "Full Stack Developer",
    period: "Sep 2024 - Present",
    description: [
      "Developed and maintained responsive web applications using Laravel, PHP, MySQL, JavaScript, and Bootstrap, ensuring seamless performance across devices.",
      "Implemented RESTful APIs, authentication systems, and role-based access controls (RBAC) to enhance security and scalability.",
      "Collaborated with teams to design clean, efficient, and user-friendly interfaces aligned with modern UI/UX standards.",
      "Managed database design, version control (Git/GitHub), and deployment processes to deliver reliable, production-ready solutions."
    ]
  },
  {
    company: "Freelance / Internship",
    role: "Full Stack Developer",
    period: "Jun 2024 - Aug 2024",
    description: [
      "Assisted in designing, developing, and maintaining full-stack web applications using HTML, CSS, JavaScript, Bootstrap, PHP, and Laravel.",
      "Worked with MySQL databases for data modeling, query optimization, and CRUD operations.",
      "Participated in code reviews, debugging, and version control using Git/GitHub.",
      "Implemented authentication, middleware, and role-based access control in Laravel projects."
    ]
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    title: "Asset Management",
    description: "Laravel Based Asset  management system with lifecycle tracking, assignments, QR scanning,User Management,Inventory Management and reports.",
    techStack: ["Laravel", "PHP", "MySQL", ],
    githubUrl: "https://github.com/mateenism",
    demoUrl: "#",
    imageUrl: "https://unsplash.com/photos/woman-typing-on-laptop-with-email-open-zunkloizgWY"
  },
  {
    title: "AeoLogic's Website",
    description: "Designed and developed Aeologic’s official website with responsive, performance-focused architecture.",
    techStack: ["PHP",  "MySQL","HTML", "JSON","Laravel"],
    githubUrl: "https://github.com/mateenism",
    demoUrl: "https://www.aeologic.com/",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Event Management System",
    description: "Developed an event management system enabling scheduling, registrations, attendee tracking, and automated reporting.",
    techStack: ["Laravel", "HTML", "PhP","MySQL"],
    githubUrl: "https://github.com/mateenism",
    demoUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  }
];

export const EDUCATION: EducationItem[] = [
  {
    institution: "AlmaBetter",
    degree: "Full Stack Data Science",
    period: "May 2023 - Aug 2024",
    location: "Online / Remote"
  },

  {
    institution: "Mahatma Jyotiba Phule Rohilkhand University (MJPRU)",
    degree: "Bachelor of Commerce - BCom",
    period: "Jul 2016 - Jun 2019",
    location: "Bareilly, U.P."
  },

  {
    institution: "M.A. College",
    degree: "Senior Secondary School",
    period: "May 2014 - Jun 2016",
    location: "Amroha, U.P."
  }
];