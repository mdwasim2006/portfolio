import type { ElementType } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { TextEffect } from '../ui/text-effect';

export interface ContactCardProps {
  title: string;
  description: string;
  href: string;
  icon: ElementType;
  className?: string;
}

export function ContactCard({
  title,
  description,
  href,
  icon: Icon,
  className,
}: ContactCardProps) {
  return (
    <article
      className={cn(
        'group relative h-full overflow-hidden rounded-2xl border border-white/22 bg-[#060d19]/58 p-6 shadow-[0_14px_34px_rgba(2,6,23,0.4)] backdrop-blur-2xl transition-all duration-300 hover:scale-[1.03] hover:border-indigo-400/60 hover:shadow-[0_20px_42px_rgba(79,70,229,0.22)] sm:p-7',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(129,140,248,0.14),transparent_42%),radial-gradient(circle_at_82%_85%,rgba(14,165,233,0.1),transparent_40%)]"
      />
      <div className="relative z-[1]">
        <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-indigo-400 transition-all duration-300 group-hover:border-indigo-400/50 group-hover:text-indigo-300 group-hover:shadow-[0_0_18px_rgba(99,102,241,0.3)]">
          <Icon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />
        </div>

        <TextEffect as="h3" per="word" preset="slide" className="text-xl font-semibold tracking-[-0.03em] text-white">
          {title}
        </TextEffect>
        <TextEffect as="p" per="word" preset="fade" className="mt-3 min-h-[3.25rem] text-sm leading-7 text-white/65 sm:text-[0.95rem]">
          {description}
        </TextEffect>

        <a
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/85 transition-all duration-300 hover:border-indigo-400/60 hover:bg-indigo-500/10 hover:text-white"
        >
          <TextEffect as="span" per="word" preset="slide" className="inline-block">
            Connect
          </TextEffect>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </article>
  );
}
