/**
 * Single source of truth for portfolio work.
 *
 * Adding a project is a data edit here, not a component edit. The case-study
 * route (/work/[slug]) and the homepage both read from this file.
 *
 * Narrative fields (challenge/solution/outcome) are written from the projects'
 * own source and design docs. Anything not evidenced there is left undefined
 * rather than invented. The UI omits any section whose field is missing.
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

/** A capability the product actually has, with the detail behind it. */
export interface ProjectFeature {
  title: string;
  body: string;
}

export interface Project {
  slug: string;
  title: string;
  /** One line, used on cards and as the case-study standfirst. */
  tagline: string;
  overview: string;
  year: string;
  role: string;
  /** Ordered most-relevant first; the first three show on cards. */
  stack: string[];
  links: ProjectLink;
  cover: ProjectImage;
  featured: boolean;
  status: "live" | "in-development";

  challenge?: string;
  solution?: string;
  /** What the product does: the substance of the case study. */
  features?: ProjectFeature[];
  outcome?: string;
}

export const projects: Project[] = [
  {
    slug: "axl-tees",
    title: "Axl Tees",
    tagline:
      "A custom commerce backend for a Filipino streetwear label, built because no platform fit the market.",
    overview:
      "A storefront for AXL / Lahat Bawal, an independent streetwear brand in Puerto Princesa selling graphic tees across regular, cropped, and off-shoulder cuts. Rather than a hosted commerce platform, it runs Payload CMS inside the Next.js app, with Postgres for catalog and orders, S3-compatible object storage for media, and PayMongo for checkout.",
    year: "2025",
    role: "Design & Full Stack Development",
    stack: [
      "Next.js 16",
      "React 19",
      "Payload CMS",
      "PostgreSQL",
      "PayMongo",
      "TypeScript",
      "Tailwind CSS",
      "Resend",
    ],
    links: { live: "https://www.axltees.com/" },
    cover: {
      src: "/assets/portfolio/axl-tees.png",
      alt: "Axl Tees storefront showing graphic t-shirt collections",
      width: 1200,
      height: 760,
    },
    featured: true,
    status: "live",

    challenge:
      "The brand needed real checkout (cards, GCash, Maya) on effectively no fixed monthly budget. The obvious answer was a hosted platform, but Shopify Payments does not serve the Philippines, which means a third-party gateway plus Shopify's additional transaction fee on top of a monthly subscription. Medusa's managed hosting started at $29/month for development. Saleor's free tier is non-commercial. Every turnkey option either failed on payments or failed on cost.",

    solution:
      "I evaluated the platforms against the actual constraint, Philippine payment methods at ₱449–₱499 price points, and found the economics inverted the usual advice. PayMongo costs roughly ₱6–₱11 per GCash or Maya transaction and ₱27–₱29 on a domestic card, so per-transaction fees beat any fixed subscription at this volume. That made a custom backend viable, but only if it didn't mean hand-building an admin dashboard. Payload CMS resolved that: it runs inside the same Next.js app, generates the admin UI from schema, and its e-commerce plugin supplies cart and order primitives, leaving me to implement only the PayMongo flow explicitly.",

    features: [
      {
        title: "Local payment methods at checkout",
        body: "PayMongo Hosted Checkout accepts GCash, Maya, and cards, the methods customers here actually use. Payment details never touch my infrastructure, and the hosted flow handles expiry and retries.",
      },
      {
        title: "Shop, collections, and product detail",
        body: "Releases are grouped into collections, with per-product pages covering silhouette and size variants. Cropped, regular, and off-shoulder cuts are modelled as variants rather than separate products.",
      },
      {
        title: "Cart and checkout with address entry",
        body: "A full cart and checkout flow, including a city autocomplete so customers aren't free-typing addresses that later break delivery.",
      },
      {
        title: "Order proof upload",
        body: "Customers can attach payment proof to an order and view it back as an expandable image, a practical necessity for the bank-transfer and e-wallet flows common in Philippine retail.",
      },
      {
        title: "Admin dashboard generated from schema",
        body: "Payload supplies the full back office (products, variants, inventory, orders, and media) without my hand-building CRUD screens. Media is served from S3-compatible object storage.",
      },
      {
        title: "Transactional email",
        body: "Order confirmations go out through Resend, on a verified sending domain.",
      },
    ],
  },

  {
    slug: "sales-tracker",
    title: "Sales Tracker & POS",
    tagline:
      "Point-of-sale, inventory, and sales tracking for a real shop, where a wrong change amount matters more than a slow query.",
    overview:
      "A combined POS, inventory system, and sales tracker running a working cake and minimart business. Two independent clients share one Supabase backend: a Next.js admin back office with a web POS, and an Expo/React Native app for the cashier-facing counter. Built for one to three users first, with a data model already shaped for multi-tenancy.",
    year: "2025",
    role: "Full Stack Development",
    stack: [
      "Next.js 15",
      "React 19",
      "React Native",
      "Expo",
      "Supabase",
      "PostgreSQL",
      "TypeScript",
      "Tailwind CSS",
    ],
    links: { live: "https://sales-tracker-jez.vercel.app/" },
    cover: {
      src: "/assets/portfolio/sales-tracker.png",
      alt: "Sales Tracker point-of-sale dashboard",
      width: 1200,
      height: 760,
    },
    featured: true,
    status: "in-development",

    challenge:
      "This handles real money for a real shop, and the person using it is not technical and cannot debug a failure. That reframes the whole problem: correctness matters more than scale, and silent failure is the worst possible outcome. A sale that quietly doesn't record is worse than one that loudly fails, because the second is recoverable. On top of that, the same domain has to work across two very different clients: a desktop back office and a phone at a counter.",

    solution:
      "I built it as two independent clients against one Supabase backend, with the domain rules that must not drift enforced server-side and the rest duplicated deliberately rather than abstracted into a shared package. The single most important rule: order creation goes through an Edge Function that receives only product IDs and quantities. Prices and profit are resolved server-side from the database and stamped with the seller's identity from the JWT. A tampered client cannot invent a sale price.",

    features: [
      {
        title: "Touch-first point of sale",
        body: "A cashier-facing checkout on both web and mobile. Cart lines are keyed by product and variant, so scanning the same item twice increments the quantity rather than stacking duplicate rows, and the screen shows the change owed to the customer.",
      },
      {
        title: "Products with variants",
        body: "A product either carries its own price or has variants, never both. The POS shows a variant picker where they exist and a straight price-and-quantity stepper where they don't, and the admin table renders variants as indented child rows.",
      },
      {
        title: "Server-calculated prices and profit",
        body: "Order creation runs through a Supabase Edge Function that receives only product ids and quantities. Every price, line total, and profit figure is resolved server-side and stamped with the seller from the JWT, so a tampered client can't invent a sale price.",
      },
      {
        title: "Sales dashboard with export",
        body: "Revenue and profit rolled up by timeframe, with a full order list and CSV/PDF export for records the business actually has to keep.",
      },
      {
        title: "A business day that ends at 3AM",
        body: "The shop trades past midnight, so \"today\" means since the most recent 3AM rather than since midnight. Both clients implement the same cutoff, so the daily summary doesn't split one night's trading across two reporting days.",
      },
      {
        title: "Archive and restore, never delete",
        body: "Removing a product sets an archive flag instead of deleting the row, so the sales history that references it stays intact and the product can be brought back.",
      },
      {
        title: "Email and Google sign-in",
        body: "Both clients support email/password and Google OAuth through Supabase, with mobile using a native auth session and a deep-link callback. Accounts are created on the web; the mobile app is login-only.",
      },
      {
        title: "Shipped to a real tester",
        body: "The mobile POS is distributed as an EAS beta build and in use on an actual counter, not just running in a simulator.",
      },
    ],

    outcome:
      "In use by the business it was built for, handling real customers and real receipts. Every row already carries a user_id, so moving to true multi-tenancy is a policy and permissions problem rather than a rewrite. Active roadmap: raw-material inventory that draws down ingredients per sale, offline POS with sync on reconnect, and thermal-printer and barcode-scanner support.",
  },

  {
    slug: "axl-pastries",
    title: "Axl Pastries",
    tagline:
      "A bakery storefront with a hand-written Go API, built to understand auth from the ground up.",
    overview:
      "An online shop for a pastry business in Puerto Princesa selling cakes, cupcakes, desserts, and muffins, with category browsing, ordering, and custom-message support. A Next.js frontend with Zustand state and Zod-validated forms, backed by a Go API written from scratch: Gin routing, JWT auth, role middleware, and hand-rolled SQL migrations against Postgres.",
    year: "2024",
    role: "Design & Full Stack Development",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Go",
      "Gin",
      "PostgreSQL",
      "Supabase",
      "Zustand",
      "Zod",
      "Tailwind CSS",
    ],
    links: {
      live: "https://axl-pastries.netlify.app/",
      repo: "https://github.com/JezreelBuenconsejo/axl-pastries-frontend",
    },
    cover: {
      src: "/assets/portfolio/axl-pastries/pic1.png",
      alt: "Axl Pastries online shop homepage",
      width: 1200,
      height: 760,
    },
    featured: true,
    status: "in-development",

    challenge:
      "A bakery storefront does not need a custom backend. A BaaS would have shipped it faster. I wrote one in Go anyway, because the goal was to understand what authentication actually involves rather than to call a method that hides it.",

    solution:
      "The Go service handles registration, login, email confirmation, and password reset directly: bcrypt hashing via golang.org/x/crypto, JWTs issued and verified in middleware, and a separate role middleware gating admin routes from customer ones. Data access is raw lib/pq with SQL migrations checked into the repo, and no ORM, so the queries and the schema are both explicit. The frontend keeps cart state in Zustand and validates every form with Zod before it reaches the API.",

    features: [
      {
        title: "Full account lifecycle",
        body: "Registration, login, email confirmation, forgotten password, and password reset, each written directly rather than delegated to an auth provider. Passwords are bcrypt-hashed and sessions are JWT-based.",
      },
      {
        title: "Role-separated admin API",
        body: "Two middleware layers compose on protected routes: one establishes who the caller is, the other decides what that identity may do. Admin endpoints for creating, updating, and deleting products and categories sit behind both; the public catalog endpoints sit behind neither.",
      },
      {
        title: "Catalog browsing by category",
        body: "Public endpoints serve the full cake list, individual product detail, and the category index, with the storefront presenting cakes, cupcakes, desserts, and muffins.",
      },
      {
        title: "Ordering with custom messages",
        body: "Customers can order for local delivery and attach personalised messages and design requests, the details that matter for a cake order and don't fit a standard product form.",
      },
      {
        title: "Validated forms end to end",
        body: "Every form is checked with Zod through React Hook Form before it reaches the API, so validation failures surface at the field rather than as a server error.",
      },
      {
        title: "Versioned SQL migrations",
        body: "Schema changes are numbered SQL files checked into the repo, run against Postgres through raw lib/pq with no ORM in between, so the queries and the schema are both explicit.",
      },
    ],

    outcome:
      "The storefront is live and the Go API covers the full auth surface end to end. The build settled a question I had been avoiding: what a BaaS is actually doing when it hands you a session, which made the architectural choices on later projects, including choosing Supabase deliberately rather than by default, considerably better informed.",
  },
];

/** Projects shown on the homepage, in display order. */
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
