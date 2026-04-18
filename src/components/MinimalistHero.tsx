import { useState, type ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, ArrowRight, Download } from 'lucide-react';
import { Github, Linkedin } from './icons/BrandIcons';
import { TextEffect } from './ui/text-effect';

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: ElementType;
}

export interface MinimalistHeroProps {
  logo?: string;
  navItems?: NavItem[];
  intro: string;
  headingLines: [string, string];
  imageSrc: string;
  imageAlt: string;
  readMoreHref?: string;
  readMoreLabel?: string;
  resumeHref?: string;
  resumeLabel?: string;
  resumeFileName?: string;
  socialLinks?: SocialLink[];
  locationLabel?: string;
  accentClassName?: string;
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const defaultSocialLinks: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'Email', href: 'mailto:hello@example.com', icon: Mail },
];

export function MinimalistHero({
  logo = 'wasim.',
  navItems = defaultNavItems,
  intro,
  headingLines,
  imageSrc,
  imageAlt,
  readMoreHref = '#about',
  readMoreLabel = 'Read More',
  resumeHref,
  resumeLabel = 'Download Resume',
  resumeFileName = 'resume.pdf',
  socialLinks = defaultSocialLinks,
  locationLabel = 'India',
  accentClassName = 'bg-indigo-500',
  className = '',
}: MinimalistHeroProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section
      id="home"
      className={`relative min-h-screen overflow-hidden bg-transparent text-white ${className}`}
    >
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 pb-8 pt-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-white/10 pb-5">
          <motion.a
            href="#home"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-xl font-semibold tracking-[0.22em]"
          >
            <TextEffect as="span" per="char" preset="slide" className="inline-block">
              {logo}
            </TextEffect>
          </motion.a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ y: -2 }}
                className="text-sm font-medium tracking-[0.18em] text-white/70 transition hover:text-white"
              >
                <TextEffect as="span" per="word" preset="fade" className="inline-block">
                  {item.label}
                </TextEffect>
              </motion.a>
            ))}
          </nav>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 md:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </header>

        <AnimatePresence>
          {mobileMenuOpen ? (
            <motion.nav
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mt-4 flex flex-col gap-4 border-b border-white/10 pb-5 md:hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium tracking-[0.18em] text-white/75"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <TextEffect as="span" per="word" preset="fade" className="inline-block">
                    {item.label}
                  </TextEffect>
                </a>
              ))}
            </motion.nav>
          ) : null}
        </AnimatePresence>

        <div className="grid flex-1 items-center gap-14 py-10 md:grid-cols-3 md:gap-8 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="order-3 flex flex-col justify-end md:order-1 md:self-end"
          >
            <TextEffect as="p" per="word" preset="fade" className="max-w-sm text-base leading-7 text-white/70 sm:text-lg">
              {intro}
            </TextEffect>
            <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              {resumeHref ? (
                <a
                  href={resumeHref}
                  download={resumeFileName}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:border-indigo-400/60 hover:bg-indigo-500/10 sm:tracking-[0.2em]"
                >
                  <Download className="h-4 w-4" />
                  <TextEffect as="span" per="word" preset="fade" className="inline-block">
                    {resumeLabel}
                  </TextEffect>
                </a>
              ) : null}

              <a
                href={readMoreHref}
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:translate-x-1 sm:tracking-[0.24em]"
              >
                <TextEffect as="span" per="char" preset="slide" className="inline-block">
                  {readMoreLabel}
                </TextEffect>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="order-1 flex items-center justify-center md:order-2"
          >
            <div className="relative flex items-center justify-center">
              <div
                className={`absolute h-72 w-72 rounded-full ${accentClassName} opacity-20 blur-2xl sm:h-96 sm:w-96 lg:h-[28rem] lg:w-[28rem]`}
              />
              <div
                className="absolute h-64 w-64 rounded-full border border-indigo-300/35 bg-indigo-500/15 shadow-[0_0_32px_rgba(99,102,241,0.35)] sm:h-80 sm:w-80 lg:h-[24rem] lg:w-[24rem]"
              />
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                initial={{ opacity: 0, scale: 0.84 }}
                animate={{ opacity: 1, scale: 1.24 }}
                transition={{ duration: 0.9, delay: 0.25, ease: 'easeOut' }}
                className="relative z-10 h-56 w-56 rounded-full object-cover shadow-[0_18px_50px_rgba(0,0,0,0.12)] sm:h-64 sm:w-64 lg:h-72 lg:w-72"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative z-20 order-2 flex flex-col items-start justify-center md:order-3 md:items-end md:pl-8 md:text-right lg:pl-10"
          >
            <h1 className="max-w-[12ch] text-5xl font-black uppercase leading-[0.9] tracking-[-0.08em] sm:text-7xl lg:text-[6.8rem] xl:text-[7.8rem]">
              <TextEffect as="span" per="word" preset="blur" className="block">
                {headingLines[0]}
              </TextEffect>
              <TextEffect as="span" per="word" preset="blur" className="block">
                {headingLines[1]}
              </TextEffect>
            </h1>
          </motion.div>
        </div>

        <footer className="relative pt-2">
          <div className="hidden items-end justify-between md:flex">
            <div className="flex items-center gap-5">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    whileHover={{ y: -3 }}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-white transition hover:border-white hover:bg-white hover:text-black"
                    aria-label={item.label}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.a>
                );
              })}
            </div>

            <TextEffect as="p" per="char" preset="fade" className="text-sm uppercase tracking-[0.3em] text-white/55">
              {locationLabel}
            </TextEffect>
          </div>

          <div className="mt-8 flex items-end justify-between md:hidden">
            <div className="flex items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white"
                    aria-label={item.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
            <TextEffect as="p" per="char" preset="fade" className="text-xs uppercase tracking-[0.28em] text-white/55">
              {locationLabel}
            </TextEffect>
          </div>
        </footer>
      </div>
    </section>
  );
}
