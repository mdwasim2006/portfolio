import { cn } from '../../lib/utils';
import type { ElementType } from 'react';
import { TextEffect } from '../ui/text-effect';
import BorderGlow from '../ui/BorderGlow';

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
    <BorderGlow
      edgeSensitivity={34}
      glowColor="244 85 68"
      backgroundColor="rgb(255 255 255 / 3%)"
      borderRadius={16}
      glowRadius={20}
      glowIntensity={0.9}
      coneSpread={24}
      animated
      colors={['#818cf8', '#ec4899', '#22d3ee']}
      fillOpacity={0}
      className={cn(
        'about-border-glow-edge-only group h-full transition-all duration-300 hover:-translate-y-1.5',
        className,
      )}
    >
      <article
        className={cn(
          'flex h-full min-h-[15rem] flex-col rounded-2xl border border-white/14 bg-[#090f1b]/85 p-6 shadow-[0_12px_30px_rgba(0,0,0,0.32)] backdrop-blur-xl transition-all duration-300 group-hover:border-indigo-500/45 group-hover:shadow-[0_20px_40px_rgba(79,70,229,0.2)] sm:p-7',
        )}
      >
        {Icon ? (
          <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-indigo-400 transition-colors duration-300 group-hover:border-indigo-400/30 group-hover:text-indigo-300">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}

        <TextEffect as="h3" per="word" preset="slide" className="text-xl font-semibold tracking-[-0.03em] text-white transition-colors duration-300 group-hover:text-indigo-400">
          {title}
        </TextEffect>

        <TextEffect as="p" per="word" preset="fade" className="mt-3 min-h-[6.4rem] text-sm leading-7 text-white/65 sm:text-[0.95rem]">
          {description}
        </TextEffect>
      </article>
    </BorderGlow>
  );
}
