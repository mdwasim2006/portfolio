import { ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { TextEffect } from '../ui/text-effect';

export interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  link: string;
  className?: string;
}

export function ProjectCard({
  title,
  description,
  imageSrc,
  imageAlt,
  link,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        'group mx-auto h-full w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] shadow-[0_16px_40px_rgba(30,41,59,0.18)] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/35 hover:bg-white/[0.04] hover:shadow-[0_24px_60px_rgba(30,41,59,0.26)]',
        'flex flex-col justify-between',
        className,
      )}
    >
      <a href={link} target="_blank" rel="noreferrer" className="flex h-full flex-col">
        <div className="relative overflow-hidden">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>

        <div className="flex h-full flex-col justify-between gap-6 p-6">
          <div className="space-y-4">
          <TextEffect as="h3" per="word" preset="slide" className="text-xl font-semibold tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-indigo-400">
            {title}
          </TextEffect>

          <TextEffect as="p" per="word" preset="fade" className="min-h-[4.5rem] text-sm leading-7 text-white/65 sm:text-[0.95rem]">
            {description}
          </TextEffect>
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 transition-transform duration-300 group-hover:translate-x-0.5">
            <TextEffect as="span" per="word" preset="slide" className="inline-block">
              View Project
            </TextEffect>
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </a>
    </article>
  );
}
