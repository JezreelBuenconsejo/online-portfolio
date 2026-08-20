/**
 * Single source of truth for portfolio work.
 *
 * Adding a project is a data edit here, not a component edit. The case-study
 * route (/work/[slug]) and the homepage's featured section both read from this.
 *
 * NOTE ON NARRATIVE FIELDS: `challenge`, `solution`, and `outcome` are
 * intentionally left undefined until Jezreel supplies them. They describe
 * engineering decisions only he can speak to, and invented specifics would be
 * actively harmful in an interview. The UI omits any section whose field is
 * undefined, so projects render cleanly without them.
 */

export interface ProjectLink {
  live?: string;
  repo?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Project {
  /** URL segment for /work/[slug]. */
  slug: string;
  title: string;
  /** One line, shown on cards and as the case-study standfirst. */
  tagline: string;
  /** Longer factual description of what the product is. */
  overview: string;
  year: string;
  role: string;
  /** Ordered most-relevant first; the first three show on cards. */
  stack: string[];
  links: ProjectLink;
  cover: ProjectImage;
  /** Surfaces in the homepage's Proof act. */
  featured: boolean;
  /** Shipped and publicly usable, vs. still in development. */
  status: "live" | "in-development";

  /** --- Narrative: awaiting content (see note above) --- */
  challenge?: string;
  solution?: string;
  outcome?: string;
}

export const projects: Project[] = [
  {
    slug: "axl-tees",
    title: "Axl Tees",
    tagline:
      "Storefront for an independent Filipino streetwear label, built end to end.",
    overview:
      "A custom e-commerce build for AXL / Lahat Bawal, a streetwear brand out of Puerto Princesa. The store carries three graphic-tee collections across regular, cropped, and off-shoulder cuts, with product media served from Supabase storage. Built as a bespoke storefront rather than on a hosted commerce platform.",
    year: "2025",
    role: "Design & Full Stack Development",
    stack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    links: { live: "https://www.axltees.com/" },
    cover: {
      src: "/assets/portfolio/axl-tees.png",
      alt: "Axl Tees storefront showing graphic t-shirt collections",
      width: 1200,
      height: 760,
    },
    featured: true,
    status: "live",
  },
  {
    slug: "sales-tracker",
    title: "Sales Tracker & POS",
    tagline:
      "Point-of-sale and inventory system for brick-and-mortar retail.",
    overview:
      "A retail management system combining a touch-friendly point-of-sale counter with inventory and reporting. Handles products with variants, category organisation, pricing and archiving, plus a sales dashboard that tracks revenue and profit across timeframes with CSV and PDF export.",
    year: "2025",
    role: "Full Stack Development",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    links: { live: "https://sales-tracker-jez.vercel.app/" },
    cover: {
      src: "/assets/portfolio/sales-tracker.png",
      alt: "Sales Tracker point-of-sale dashboard",
      width: 1200,
      height: 760,
    },
    featured: true,
    status: "in-development",
  },
  {
    slug: "axl-pastries",
    title: "Axl Pastries",
    tagline:
      "Digital storefront and ordering hub for a Puerto Princesa bakery.",
    overview:
      "An online shop for a local pastry business selling cakes, cupcakes, desserts and muffins. Covers product browsing by category, online ordering and checkout, and support for custom designs and personalised messages, alongside local delivery and phone-order details.",
    year: "2024",
    role: "Design & Frontend Development",
    stack: ["Next.js", "React", "Tailwind CSS"],
    links: { live: "https://axl-pastries.netlify.app/" },
    cover: {
      src: "/assets/portfolio/axl-pastries/pic1.png",
      alt: "Axl Pastries online shop homepage",
      width: 1200,
      height: 760,
    },
    featured: true,
    status: "in-development",
  },
];

/** Projects shown in the homepage Proof act, in display order. */
export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Adjacent projects for case-study prev/next navigation. */
export function getProjectNeighbours(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? projects[i - 1] : projects[projects.length - 1],
    next: i < projects.length - 1 ? projects[i + 1] : projects[0],
  };
}
