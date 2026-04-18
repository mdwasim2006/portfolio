import { Braces, Code2, Layers3, type LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { AboutCard, type AboutCardProps } from './about/AboutCard';
import { TextEffect } from './ui/text-effect';

interface AboutItem extends AboutCardProps {
  icon: LucideIcon;
}

const aboutItems: AboutItem[] = [
  {
    title: 'Programming',
    description:
      'Strong foundation in Python, C, and Java with focus on problem solving and logic building.',
    icon: Code2,
  },
  {
    title: 'Development',
    description:
      'Building full-stack web applications using React, Node.js, and modern frontend technologies.',
    icon: Braces,
  },
  {
    title: 'Projects',
    description:
      'Experience working on real-world projects including workflow systems, verification platforms, and web applications.',
    icon: Layers3,
  },
];

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="relative mt-8 overflow-hidden bg-transparent py-16 text-white md:mt-10 md:py-20">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-12"
        >
          <TextEffect as="p" per="char" preset="slide" className="mb-3 text-sm uppercase tracking-widest text-indigo-400">
            Overview
          </TextEffect>
          <TextEffect as="h2" per="word" preset="blur" className="mb-6 text-3xl font-semibold tracking-[-0.05em] md:text-4xl">
            About Me
          </TextEffect>
          <div className="mx-auto mt-3 h-[2px] w-16 bg-indigo-500 opacity-70" />
          <TextEffect as="p" per="word" preset="fade" className="mx-auto mb-12 mt-5 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
            I am a Computer Science Engineering student focused on building real-world applications, exploring modern technologies, and solving practical problems through software.
          </TextEffect>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {aboutItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <AboutCard
                title={item.title}
                description={item.description}
                icon={item.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
