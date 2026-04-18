import { cn } from '../../lib/utils';
import type { ElementType } from 'react';
import { TextEffect } from '../ui/text-effect';

export interface AboutCardProps {
  title: string;
  description: string;
  icon?: ElementType;
  className?: string;
}

export function AboutCard({
  title,
  description,
  icon: Icon,
  className,
}: AboutCardProps) {
  return (
    <article
      className={cn(
        'group rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/45 hover:shadow-[0_20px_40px_rgba(79,70,229,0.2)] sm:p-7',
        className,
      )}
    >
      {Icon ? (
        <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-indigo-400 transition-colors duration-300 group-hover:text-indigo-300">
          <Icon className="h-5 w-5" />
        </div>
      ) : null}

      <TextEffect as="h3" per="word" preset="slide" className="text-xl font-semibold tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-indigo-400">
        {title}
      </TextEffect>

      <TextEffect as="p" per="word" preset="fade" className="mt-3 text-sm leading-7 text-white/65 sm:text-[0.95rem]">
        {description}
      </TextEffect>
    </article>
  );
}
