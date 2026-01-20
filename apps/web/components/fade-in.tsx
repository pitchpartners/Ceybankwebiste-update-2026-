"use client";

import { motion } from "framer-motion";
import { ComponentPropsWithoutRef, ReactNode } from "react";

interface FadeInProps extends ComponentPropsWithoutRef<typeof motion.div> {
  children: ReactNode;
  delay?: number;
}

export default function FadeIn({ children, delay = 0 , ...rest }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.2 }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
