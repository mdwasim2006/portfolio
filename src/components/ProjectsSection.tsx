import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useState } from 'react';
import { TextEffect } from './ui/text-effect';
import { ArticleCard } from './ui/blog-post-card';

interface ProjectItem {
  title: string;
  stack: string;
  description: string;
  cover: string;
  imageAlt: string;
  link: string;
}

const projects: ProjectItem[] = [
  {
    title: 'CrediChain – Credential Verification System',
    stack: 'React • Node • MongoDB • SHA-256',
    description:
      'Reduced manual verification effort using cryptographic validation and QR-based proof system.',
    cover:
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Blockchain and security technology visualization',
    link: 'https://github.com/mdwasim2006',
  },
  {
    title: 'FlowAI – Workflow Automation System',
    stack: 'React • Node • MongoDB • Automation',
    description:
      'Streamlined task approvals and reduced coordination overhead with real-time workflow automation.',
    cover:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Workflow dashboard interface',
    link: 'https://github.com/mdwasim2006',
  },
  {
    title: 'Secure File Sharing Platform',
    stack: 'React • Node • Encryption • Cloud Storage',
    description:
      'Improved secure document exchange with encrypted links, expiry control, and traceable sharing.',
    cover:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Secure cloud infrastructure and file protection concept',
    link: 'https://github.com/mdwasim2006',
  },
  {
    title: 'AI-Powered Fashion E-Commerce Platform',
    stack: 'React.js • Tailwind CSS • Firebase • Framer Motion',
    description:
      'Built a personalized fashion shopping platform with AI Size & Fit recommendations, smart filtering, virtual try-on MVP, UGC gallery, and a frictionless checkout flow.',
    cover:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Modern fashion e-commerce shopping experience on digital devices',
    link: 'https://github.com/mdwasim2006',
  },
  {
    title: 'Event Management System',
    stack: 'React • Node • MongoDB • CSV Export',
    description:
      'Reduced event coordination effort with registration workflows, admin tooling, and CSV export.',
    cover:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Event planning and management setup',
    link: 'https://github.com/mdwasim2006',
  },
];

export function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);

  return (
    <section id="projects" data-section className="relative mt-8 overflow-hidden bg-transparent py-16 text-white md:mt-10 md:py-20">
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

        <motion.div layout className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                data-project-card
                initial={prefersReducedMotion ? false : { opacity: 0, y: 16, scale: 0.98 }}
                animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.03 }}
              >
                <ArticleCard
                  headline={project.title}
                  excerpt={project.description}
                  cover={project.cover}
                  tag={project.stack}
                  ctaHref={project.link}
                  ctaLabel="View Project"
                  clampLines={3}
                  className="h-full max-w-none"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
