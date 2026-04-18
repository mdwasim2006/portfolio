import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '../../lib/utils';

export interface JobCardProps {
  companyLogo: React.ReactNode;
  companyName: string;
  jobTitle: string;
  salary: string;
  tags: string[];
  postedDate: string;
  variant?: 'pink' | 'yellow' | 'blue' | 'purple';
  className?: string;
  onClick?: () => void;
}

const variantClasses = {
  pink: 'border-t-pink-500',
  yellow: 'border-t-yellow-500',
  blue: 'border-t-blue-500',
  purple: 'border-t-purple-500',
};

export const AnimatedJobCard = ({
  companyLogo,
  companyName,
  jobTitle,
  salary,
  tags,
  postedDate,
  variant = 'purple',
  className,
  onClick,
}: JobCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cardRef = React.useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left - width / 2);
    mouseY.set(e.clientY - top - height / 2);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-150, 150], [-10, 10]);

  const springConfig = { stiffness: 300, damping: 20, mass: 0.5 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  return (
    <motion.div
      layout
      onClick={onClick}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative w-full max-w-sm shrink-0 transform-gpu cursor-pointer overflow-hidden rounded-xl bg-card p-6 shadow-md transition-shadow duration-300 hover:shadow-2xl',
        'border-t-4 border-white/10 bg-white/[0.04]',
        variantClasses[variant],
        className,
      )}
      aria-label={`Job opening: ${jobTitle} at ${companyName}`}
      tabIndex={0}
    >
      <div style={{ transform: 'translateZ(20px)' }} className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-indigo-300">
            {companyLogo}
          </div>
          <span className="font-semibold text-white/70">{companyName}</span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">{jobTitle}</h3>
          <p className="text-sm text-indigo-400">{salary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/75"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-2 text-right text-xs text-white/55">{postedDate}</div>
      </div>
    </motion.div>
  );
};
