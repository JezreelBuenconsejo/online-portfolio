export interface SkillGroup {
  title: string;
  /** Short line explaining what this group is actually for. */
  note: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    note: "Where most of my work lives.",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "JavaScript",
      "Tailwind",
      "Astro",
      "Vue",
      "Angular",
      "CSS",
      "Bootstrap",
    ],
  },
  {
    title: "Backend",
    note: "APIs, data, and the parts that hold the money.",
    skills: [
      "Golang",
      "Node.js",
      "PostgreSQL",
      "Supabase",
      "Python",
      "Django",
      "C#",
      "PHP",
      "Laravel",
      "CodeIgniter",
      "Firebase",
      "AWS",
    ],
  },
  {
    title: "Mobile",
    note: "Shipped to real devices, not just simulators.",
    skills: ["React Native", "Expo", "Flutter"],
  },
  {
    title: "Platforms & tooling",
    note: "The rest of the job.",
    skills: [
      "Git & GitHub",
      "REST APIs",
      "CI/CD Pipelines",
      "Wordpress",
      "Shopify",
      "Wix",
      "CRM Systems",
    ],
  },
];

/** Icon per skill. Skills without one render as a text chip. */
export const skillIcons: Record<string, string> = {
  JavaScript: "/assets/skills/JS.png",
  TypeScript: "/assets/skills/TS.png",
  React: "/assets/skills/React.png",
  "Next.js": "/assets/skills/nextjs.png",
  Vue: "/assets/skills/vue.png",
  Angular: "/assets/skills/angular.png",
  Astro: "/assets/skills/Astro.png",
  CSS: "/assets/skills/css.png",
  Tailwind: "/assets/skills/tailwind.png",
  Bootstrap: "/assets/skills/bootstrap.png",
  Wordpress: "/assets/skills/wordpress.png",
  Wix: "/assets/skills/wix.png",
  Shopify: "/assets/skills/shopify.png",
  Golang: "/assets/skills/golang.png",
  "C#": "/assets/skills/CSharp.png",
  "Node.js": "/assets/skills/nodejs.png",
  Python: "/assets/skills/python.png",
  Django: "/assets/skills/django.png",
  PHP: "/assets/skills/php.png",
  Laravel: "/assets/skills/laravel.png",
  CodeIgniter: "/assets/skills/codeigniter.png",
  AWS: "/assets/skills/aws.png",
  Firebase: "/assets/skills/firebase.png",
  Supabase: "/assets/skills/supabase.png",
  Flutter: "/assets/skills/flutter.png",
  "React Native": "/assets/skills/React.png",
  "Git & GitHub": "/assets/skills/git.png",
  "REST APIs": "/assets/skills/rest-api-icon.png",
};
