import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Workflow, CalendarCheck2, FileLock2, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { TextEffect } from './ui/text-effect';
import { ServiceCard } from './ui/service-card';

interface ProjectItem {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
  icon: LucideIcon;
}

const projects: ProjectItem[] = [
  {
    title: 'CrediChain – Credential Verification System',
    description:
      'A secure system for instant certificate verification using SHA-256 hashing and QR-based validation with tamper detection.',
    imageSrc:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Blockchain and security technology visualization',
    link: 'https://github.com/mdwasim2006',
    icon: ShieldCheck,
  },
  {
    title: 'FlowAI – Workflow Automation System',
    description:
      'A real-time workflow automation platform with approval pipelines, live tracking, and smart deadline management.',
    imageSrc:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Workflow dashboard interface',
    link: 'https://github.com/mdwasim2006',
    icon: Workflow,
  },
  {
    title: 'Secure File Sharing Platform',
    description:
      'A secure web app for anonymous file sharing with encrypted links, expiry control, and real-time tracking.',
    imageSrc:
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Secure cloud infrastructure and file protection concept',
    link: 'https://github.com/mdwasim2006',
    icon: FileLock2,
  },
  {
    title: 'Event Management System',
    description:
      'A web-based system for managing events, registrations, and admin workflows with CSV export functionality.',
    imageSrc:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Event planning and management setup',
    link: 'https://github.com/mdwasim2006',
    icon: CalendarCheck2,
  },
];

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="relative mt-8 overflow-hidden bg-transparent py-16 text-white md:mt-10 md:py-20">
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
        >
          <TextEffect as="h2" per="word" preset="blur" className="mb-6 text-3xl font-semibold tracking-[-0.05em] md:text-4xl">
            Projects
          </TextEffect>
          <div className="mx-auto mt-3 h-[2px] w-16 bg-indigo-500 opacity-70" />
          <TextEffect as="p" per="word" preset="fade" className="mx-auto mb-10 mt-5 text-sm leading-7 text-white/55 sm:text-base md:mb-12">
            A focused collection of software, automation, and secure systems built with a modern product mindset.
          </TextEffect>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.65, delay: index * 0.08 }}
            >
              <ServiceCard
                title={project.title}
                href={project.link}
                imgSrc={project.imageSrc}
                imgAlt={project.imageAlt}
                icon={<project.icon className="h-5 w-5" />}
                variant="default"
                className="mx-auto h-full w-full max-w-sm min-h-[20rem]"
              />
            </motion.div>
          ))}
        </div>

        {projects.length > 3 ? (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.035] px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:border-indigo-400/60 hover:bg-indigo-500/10 sm:tracking-[0.16em]"
            >
              {showAllProjects ? 'Show Less' : 'Show More'}
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
