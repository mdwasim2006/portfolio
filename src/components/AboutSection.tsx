import { Braces, Code2, Layers3, type LucideIcon } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { AboutCard, type AboutCardProps } from './about/AboutCard';
import { HangingIdCard } from './about/HangingIdCard';
import { TextEffect } from './ui/text-effect';

interface AboutItem extends AboutCardProps {
  icon: LucideIcon;
}

interface AboutStat {
  value: string;
  suffix?: string;
  label: string;
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

const aboutStats: AboutStat[] = [
  { value: '10', suffix: '+', label: 'Projects Built' },
  { value: '1', label: 'Hackathon Runner Up' },
  { value: '10', suffix: '+', label: 'Competitions Participated' },
  { value: '8.8', label: 'CGPA' },
];

export function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" data-section className="relative mt-8 overflow-hidden bg-transparent py-16 text-white md:mt-10 md:py-20">
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
          <div className="mx-auto mt-3 h-[2px] w-16 bg-indigo-500 opacity-70" />
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75 }}
          className="relative mb-10 overflow-hidden rounded-3xl border border-indigo-400/20 bg-[#090c16]/80 p-6 shadow-[0_0_0_1px_rgba(99,102,241,0.2),0_0_60px_rgba(99,102,241,0.14)] backdrop-blur-md lg:mb-14 lg:p-8"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(129,140,248,0.15),transparent_42%),radial-gradient(circle_at_88%_86%,rgba(34,211,238,0.1),transparent_40%)]" />
          <div className="pointer-events-none absolute left-[62%] top-8 hidden h-[80%] w-px bg-white/10 lg:block" />

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="pr-0 lg:pr-4">
              <TextEffect as="h3" per="word" preset="slide" className="text-3xl font-semibold tracking-[-0.03em] text-white">
                About Me
              </TextEffect>
              <TextEffect as="p" per="word" preset="fade" className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
                I build practical software with a focus on clean architecture, secure workflows, and intuitive user experience.
              </TextEffect>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {aboutStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-indigo-300/40"
                  >
                    <p className="text-3xl font-extrabold tracking-[-0.03em] text-white">
                      {stat.value}
                      {stat.suffix ? <span className="ml-1 text-indigo-300">{stat.suffix}</span> : null}
                    </p>
                    <p className="mt-1 text-sm text-white/70">{stat.label}</p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm text-white/60">Working with focus, creating with purpose.</p>
            </div>

            <div className="relative flex min-h-[26rem] items-center justify-center lg:justify-center lg:pl-6">
              <HangingIdCard
                name="Mohamed Wasim"
                role="Software Developer"
                location="India"
                imageSrc="/my-photo.jpg"
                imageAlt="Portrait of Mohamed Wasim"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {aboutItems.map((item, index) => (
            <motion.div
              key={item.title}
              data-tilt
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="h-full"
            >
              <AboutCard
                title={item.title}
                description={item.description}
                icon={item.icon}
                className="h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
