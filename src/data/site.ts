/** Site-wide constants. Single place to change identity and contact details. */

export const site = {
  url: "https://www.jezreelbuenconsejo.com",
  name: "Jezreel Jose Buenconsejo",
  role: "Software Developer",
  title: "Jezreel Jose Buenconsejo — Software Developer",
  description:
    "Software Developer & Frontend Engineer (React/Next.js, TypeScript, Golang, Node.js) based in the Philippines. I build fast, accessible, and scalable web apps.",
  location: {
    city: "Puerto Princesa",
    region: "Palawan",
    country: "PH",
  },
} as const;

export const contact = {
  email: "b.jezreel@yahoo.com",
  phone: "+639654464832",
  phoneDisplay: "+63 965 446 4832",
  github: "https://github.com/JezreelBuenconsejo",
  facebook: "https://www.facebook.com/jezreel.buenconsejo.10/",
  instagram: "https://www.instagram.com/randomguuuuuy/",
} as const;

export const nav = [
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/#contact" },
] as const;
