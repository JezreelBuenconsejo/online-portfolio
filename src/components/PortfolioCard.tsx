"use client";
import { motion } from "framer-motion";
import { revealItem } from "./Reveal";

/**
 * Client boundary for a single staggered project card, so that Portfolio
 * itself can stay a server component.
 */
export default function PortfolioCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return <motion.div variants={revealItem}>{children}</motion.div>;
}
