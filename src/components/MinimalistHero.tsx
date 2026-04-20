import { useState, type ElementType } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Download } from 'lucide-react';
import { Github, Linkedin } from './icons/BrandIcons';
import { TextEffect } from './ui/text-effect';
import ProfileCard from './reactbits/ProfileCard';

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
  projectsHref?: string;
  projectsLabel?: string;
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
  projectsHref = '#projects',
  projectsLabel = 'View Projects',
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
  const primaryName = headingLines[0] || 'Mohamed Wasim';
  const secondaryName = headingLines[1] || 'Software Developer';

  return (
    <section
      id="home"
      data-section
      className={`relative min-h-screen overflow-hidden bg-transparent text-white ${className}`}
    >
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-5 pb-8 pt-5 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between pb-4">
          <motion.a
            href="#home"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-3xl font-extrabold tracking-[-0.03em]"
          >
            <TextEffect as="span" per="word" preset="slide" className="inline-block">
              {logo}
            </TextEffect>
          </motion.a>

          <nav className="hidden items-center gap-9 md:flex">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                whileHover={{ y: -2 }}
                className="text-sm font-semibold tracking-wide text-white/80 transition hover:text-white"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.03] md:hidden"
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

        <div className="grid flex-1 items-center gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, x: -22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="order-2 lg:order-1"
          >
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/35 px-3 py-2 text-xs text-white/90">
              <span className="inline-block h-2 w-2 rounded-full bg-indigo-400" />
              <span className="font-medium">Design. Build. Ship.</span>
            </div>

            <h1 className="mt-5 max-w-[16ch] text-4xl font-extrabold leading-[0.95] tracking-[-0.04em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              <TextEffect as="span" per="word" preset="blur" className="block">
                {primaryName}
              </TextEffect>
              <TextEffect as="span" per="word" preset="blur" className="block text-white/92">
                {secondaryName}
              </TextEffect>
            </h1>

            <div className="mt-4 inline-flex items-center rounded-full border border-amber-300/35 bg-amber-500/12 px-3 py-1.5 text-xs font-semibold text-amber-100">
              <span aria-hidden="true" className="mr-2">🏆</span>
              Hackathon Winner - Project X 2026
            </div>

            <TextEffect as="p" per="word" preset="fade" className="mt-6 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
              {intro}
            </TextEffect>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={projectsHref}
                className="inline-flex items-center gap-2 rounded-full border border-indigo-400/50 bg-indigo-500/85 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
              >
                {projectsLabel}
              </a>

              {resumeHref ? (
                <a
                  href={resumeHref}
                  download={resumeFileName}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-5 py-3 text-sm font-semibold text-white transition hover:border-indigo-400/60 hover:bg-indigo-500/10"
                >
                  <Download className="h-4 w-4" />
                  {resumeLabel}
                </a>
              ) : null}

              <a
                href={readMoreHref}
                className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-white/80 transition hover:text-white"
              >
                <span aria-hidden="true">→</span>
                {readMoreLabel}
              </a>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={item.href.startsWith('mailto:') ? undefined : 'noreferrer'}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/30 text-white transition hover:border-white/40"
                    aria-label={item.label}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
              <span className="ml-1 text-xs font-medium uppercase tracking-[0.15em] text-white/60">{locationLabel}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
          >
            <ProfileCard
              avatarUrl={imageSrc}
              name="Mohamed Wasim"
              title="Software Developer"
              handle="mdwasim2006"
              status="Chennai, India"
              contactText="Open to Internships"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              naturalTone={true}
              onContactClick={() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection instanceof HTMLElement) {
                  contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                window.history.replaceState(null, '', '#contact');
              }}
              iconUrl=""
              behindGlowEnabled={true}
              behindGlowColor="rgba(255,255,255,0.16)"
              behindGlowSize="42%"
              innerGradient="linear-gradient(145deg,rgba(18,20,24,0.98) 0%,rgba(38,40,44,0.96) 100%)"
              className="w-full max-w-[20rem] sm:max-w-[22rem]"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
