import { FaFacebookSquare, FaGithub, FaPhoneAlt } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import Reveal from "@/components/motion/Reveal";
import { contact, site } from "@/data/site";

/**
 * Act V — Invitation.
 *
 * Oversized type and the accent glow from Act I, closing the loop.
 */

const CHANNELS = [
  { label: contact.email, href: `mailto:${contact.email}`, Icon: MdEmail },
  { label: contact.phoneDisplay, href: `tel:${contact.phone}`, Icon: FaPhoneAlt },
];

const SOCIAL = [
  { label: "GitHub", href: contact.github, Icon: FaGithub },
  { label: "Facebook", href: contact.facebook, Icon: FaFacebookSquare },
  { label: "Instagram", href: contact.instagram, Icon: FaSquareInstagram },
];

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 overflow-hidden">
      {/* Ambient glow — echoes the hero. Decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-40 flex justify-center"
      >
        <div className="w-[40rem] h-[40rem] rounded-full bg-gradient-radial from-accent/[0.14] via-accent/[0.04] to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent mb-5">
            Contact
          </p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.08] text-ink text-balance">
            Have something you want built?
          </h2>
          <p className="mt-6 max-w-measure text-lg text-ink-muted leading-relaxed text-pretty">
            I&apos;m based in {site.location.city} and work with clients
            remotely. The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <ul className="flex flex-col gap-3">
            {CHANNELS.map(({ label, href, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="group inline-flex items-center gap-3 text-lg sm:text-xl text-ink hover:text-accent transition-colors duration-fast"
                >
                  <Icon
                    className="w-5 h-5 text-accent shrink-0"
                    aria-hidden="true"
                  />
                  <span className="border-b border-line-bright group-hover:border-accent transition-colors duration-fast pb-0.5">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={200} className="mt-12 pt-8 border-t border-line">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {SOCIAL.map(({ label, href, Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-accent transition-colors duration-fast"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
