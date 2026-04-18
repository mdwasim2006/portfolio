"use client";

import * as React from 'react';
import { useRef } from 'react';
import { motion, type MotionValue, useMotionValue, useSpring, useTransform } from 'motion/react';
import { cn } from '../../lib/utils';

export interface AnimatedDockProps {
  className?: string;
  items: DockItemData[];
}

export interface DockItemData {
  link: string;
  Icon: React.ReactNode;
  target?: string;
}

export const AnimatedDock = ({ className, items }: AnimatedDockProps) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'mx-auto flex h-16 w-fit items-end gap-4 rounded-2xl border border-white/10 bg-white/[0.035] px-4 pb-3 shadow-[0_12px_32px_rgba(15,23,42,0.2)] backdrop-blur-md',
        className,
      )}
    >
      {items.map((item, index) => (
        <DockItem key={`${item.link}-${index}`} mouseX={mouseX}>
          <a
            href={item.link}
            target={item.target}
            rel={item.target === '_blank' ? 'noreferrer' : undefined}
            className="flex h-full w-full items-center justify-center text-white/85 transition-colors hover:text-white"
            aria-label={item.target === '_blank' ? 'Open external link' : undefined}
          >
            {item.Icon}
          </a>
        </DockItem>
      ))}
    </motion.div>
  );
};

interface DockItemProps {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
}

export const DockItem = ({ mouseX, children }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconScale = useTransform(width, [40, 80], [1, 1.5]);
  const iconSpring = useSpring(iconScale, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="flex aspect-square w-10 items-center justify-center rounded-full bg-indigo-500 text-white shadow-[0_8px_24px_rgba(99,102,241,0.35)]"
    >
      <motion.div style={{ scale: iconSpring }} className="flex h-full w-full items-center justify-center">
        {children}
      </motion.div>
    </motion.div>
  );
};
