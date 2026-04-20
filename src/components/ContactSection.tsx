import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import { ContactCard, type ContactCardProps } from './contact/ContactCard';
import { Github, Linkedin } from './icons/BrandIcons';
import { TextEffect } from './ui/text-effect';

const contacts: ContactCardProps[] = [
  {
    title: 'GitHub',
    description: 'Explore open-source work, engineering experiments, and practical software builds.',
    href: 'https://github.com/mdwasim2006',
    icon: Github,
  },
  {
    title: 'LinkedIn',
    description: 'Connect professionally for collaborations, internships, and industry opportunities.',
    href: 'https://linkedin.com/in/mohamed-wasim-1a5938398',
    icon: Linkedin,
  },
  {
    title: 'Email',
    description: 'Reach out directly for project discussions, proposals, and quick communication.',
    href: 'mailto:wasim.j.office@gmail.com',
    icon: Mail,
  },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      data-section
      ref={sectionRef}
      className="relative mt-8 overflow-hidden bg-transparent py-16 text-white md:mt-10 md:py-20"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.7 }}
          className="mx-auto mb-10 max-w-2xl text-center md:mb-12"
        >
          <TextEffect as="p" per="char" preset="slide" className="mb-3 text-sm uppercase tracking-widest text-indigo-400">
            Connect
          </TextEffect>
          <TextEffect as="h2" per="word" preset="blur" className="mb-6 text-3xl font-semibold tracking-[-0.05em] md:text-4xl">
            Get In Touch
          </TextEffect>
          <div className="mx-auto mt-3 h-[2px] w-16 bg-indigo-500 opacity-70" />
          <TextEffect as="p" per="word" preset="fade" className="mx-auto mb-10 mt-5 text-sm leading-7 text-white/60 sm:text-base md:mb-12">
            Open to collaborations, projects, and opportunities.
          </TextEffect>
        </motion.div>

        <div
          className={`grid grid-cols-1 gap-6 transition-all duration-700 md:grid-cols-3 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
          }`}
        >
          {contacts.map((contact, index) => (
            <motion.div
              key={contact.title}
              data-tilt
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <ContactCard
                title={contact.title}
                description={contact.description}
                href={contact.href}
                icon={contact.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
