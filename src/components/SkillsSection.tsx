import { motion, useReducedMotion } from 'framer-motion';
import { Skills } from './ui/skills-showcase';
import { TextEffect } from './ui/text-effect';

export function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="skills" data-section className="relative mt-8 mx-auto max-w-6xl px-6 py-16 text-white md:mt-10 md:py-20">
      <div className="relative z-10">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.7 }}
        className="mb-10 text-center md:mb-14"
      >
        <TextEffect as="p" per="char" preset="slide" className="text-sm uppercase tracking-widest text-indigo-400">
          CORE STACK
        </TextEffect>
        <TextEffect as="h2" per="word" preset="blur" className="text-3xl md:text-4xl font-semibold mt-2">
          Skills
        </TextEffect>
        <div className="w-16 h-[2px] bg-indigo-500 mx-auto mt-4 opacity-70"></div>
      </motion.div>

      <motion.div
        data-tilt
        initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.75, delay: 0.08 }}
        className="flex justify-center"
      >
        <Skills />
      </motion.div>
      </div>
    </section>
  );
}

export default SkillsSection;
