import { motion } from 'framer-motion';

const PATH_COUNT = 20;

function buildPath(index: number, width: number, height: number, phase: -1 | 1) {
  const startY = height * 0.12 + index * (height / (PATH_COUNT + 3));
  const endY = startY + 190 + index * 6;

  const cp1Y = startY + 70 + phase * (18 + (index % 3) * 6);
  const cp2Y = endY - 70 - phase * (18 + (index % 4) * 5);

  return `M -140 ${startY + phase * 6} C ${width * 0.24} ${cp1Y}, ${width * 0.74} ${cp2Y}, ${width + 140} ${endY - phase * 6}`;
}

export function SectionBackgroundPaths() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none text-indigo-500/20 dark:text-indigo-400/30">
      <svg
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        className="h-[120%] w-[120%] -translate-x-[8%] -translate-y-[8%] opacity-95 mix-blend-screen"
        aria-hidden="true"
      >
        {Array.from({ length: PATH_COUNT }).map((_, index) => (
          <motion.path
            key={index}
            d={buildPath(index, 1200, 800, -1)}
            fill="none"
            stroke="rgba(99,102,241,0.2)"
            strokeOpacity={0.2}
            strokeWidth={1.35}
            initial={{ pathLength: 0.55, opacity: 0.08, x: -28 }}
            animate={{
              d: [buildPath(index, 1200, 800, -1), buildPath(index, 1200, 800, 1), buildPath(index, 1200, 800, -1)],
              pathLength: [0.55, 1, 0.55],
              opacity: [0.08, 0.25, 0.08],
              x: [-28, 28, -28],
            }}
            transition={{
              duration: 20 + (index % 5) * 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: 'easeInOut',
              delay: index * 0.22,
            }}
          />
        ))}
      </svg>
    </div>
  );
}
