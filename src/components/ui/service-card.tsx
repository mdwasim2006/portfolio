import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { cn } from '../../lib/utils';

const cardVariants = cva(
  'relative flex w-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 p-6 shadow-sm transition-shadow duration-300 ease-in-out group hover:shadow-lg backdrop-blur-md',
  {
    variants: {
      variant: {
        default: 'bg-white/[0.025] text-white',
        red: 'bg-red-500/80 text-white',
        blue: 'bg-blue-500/80 text-white',
        gray: 'bg-slate-600/70 text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface ServiceCardProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'
    >,
    VariantProps<typeof cardVariants> {
  title: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
  icon?: React.ReactNode;
}

const ServiceCard = React.forwardRef<HTMLDivElement, ServiceCardProps>(
  ({ className, variant, title, href, imgSrc, imgAlt, icon, ...props }, ref) => {
    const cardAnimation = {
      hover: {
        scale: 1.02,
        transition: { duration: 0.3 },
      },
    };

    const imageAnimation = {
      hover: {
        scale: 1.08,
        rotate: 2,
        x: 8,
        transition: { duration: 0.4 },
      },
    };

    const arrowAnimation = {
      hover: {
        x: 5,
        transition: { duration: 0.3, repeat: Infinity, repeatType: 'reverse' as const },
      },
    };

    const isExternal = /^https?:\/\//i.test(href);

    return (
      <motion.div
        className={cn(cardVariants({ variant, className }))}
        ref={ref}
        variants={cardAnimation}
        whileHover="hover"
        {...(props as Record<string, unknown>)}
      >
        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white/90">
            {icon}
          </div>

          <h3 className="text-lg font-bold tracking-tight sm:text-xl">{title}</h3>
          <a
            href={href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
            aria-label={`Learn more about ${title}`}
            className="mt-auto inline-flex items-center text-sm font-semibold uppercase tracking-[0.18em] group-hover:underline"
          >
            Learn More
            <motion.div variants={arrowAnimation}>
              <ArrowRight className="ml-2 h-4 w-4" />
            </motion.div>
          </a>
        </div>

        <motion.img
          src={imgSrc}
          alt={imgAlt}
          className="absolute -bottom-6 -right-6 h-32 w-32 object-cover opacity-35 group-hover:opacity-55 sm:-bottom-8 sm:-right-8 sm:h-40 sm:w-40"
          variants={imageAnimation}
        />
      </motion.div>
    );
  },
);

ServiceCard.displayName = 'ServiceCard';

export { ServiceCard };
