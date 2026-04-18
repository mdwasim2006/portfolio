import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export interface FloatingNavItem {
  label: string;
  href: string;
}

export interface FloatingNavbarProps {
  logo?: string;
  navItems?: FloatingNavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

const defaultNavItems: FloatingNavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export function FloatingNavbar({
  logo = 'wasim.',
  navItems = defaultNavItems,
  ctaLabel = 'Hire Me',
  ctaHref = '#contact',
  className = '',
}: FloatingNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className={`fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 px-3 sm:px-0 ${className}`}>
      <div
        className={`relative rounded-full border border-white/10 bg-slate-950/70 text-white shadow-[0_16px_40px_rgba(2,6,23,0.35)] backdrop-blur-xl transition-all duration-300 ${isScrolled ? 'scale-[0.98] bg-slate-950/80' : 'scale-100'} ${mobileMenuOpen ? 'shadow-[0_20px_50px_rgba(2,6,23,0.45)]' : ''}`}
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
          <a
            href="#home"
            className="inline-flex items-center text-base font-semibold tracking-[0.22em] text-white transition duration-300 hover:text-indigo-300"
          >
            {logo}
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-white/75 transition duration-300 hover:text-white hover:brightness-110"
              >
                {item.label}
                <span className="absolute inset-x-4 bottom-1 h-px origin-left scale-x-0 bg-indigo-400 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={ctaHref}
              className="hidden items-center gap-1.5 rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)] transition duration-300 hover:bg-indigo-400 hover:shadow-[0_12px_34px_rgba(99,102,241,0.48)] md:inline-flex"
            >
              {ctaLabel}
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition duration-300 hover:bg-white/10 hover:text-indigo-200 md:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden border-t border-white/10 transition-all duration-300 ease-out ${mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <nav className="flex flex-col gap-1 px-3 py-3 sm:px-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition duration-300 hover:bg-white/5 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-4 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-indigo-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              {ctaLabel}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
