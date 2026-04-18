import { useEffect, useMemo, useRef, useState, type ElementType } from 'react';
import {
  Code2,
  FileCode2,
  Braces,
  Atom,
  Server,
  Wind,
} from 'lucide-react';
import { cn } from '../lib/utils';

export interface SkillItem {
  label: string;
  icon: ElementType;
}

export interface OrbitingSkillsProps {
  innerSkills?: SkillItem[];
  outerSkills?: SkillItem[];
  className?: string;
}

const defaultInnerSkills: SkillItem[] = [
  { label: 'HTML', icon: FileCode2 },
  { label: 'CSS', icon: Code2 },
  { label: 'JavaScript', icon: Braces },
];

const defaultOuterSkills: SkillItem[] = [
  { label: 'React', icon: Atom },
  { label: 'Node.js', icon: Server },
  { label: 'Tailwind CSS', icon: Wind },
];

function OrbitSkill({
  skill,
  angle,
  radius,
}: {
  skill: SkillItem;
  angle: number;
  radius: number;
}) {
  return (
    <div
      className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{
        transform: `translate(-50%, -50%) rotate(calc(var(--orbit-rotation) + ${angle}deg)) translateY(-${radius}px) rotate(calc(-1 * (var(--orbit-rotation) + ${angle}deg)))`,
      }}
    >
      <button
        type="button"
        className={cn(
          'group relative inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:shadow-[0_0_24px_rgba(99,102,241,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60',
        )}
        aria-label={skill.label}
        title={skill.label}
      >
        <skill.icon className="h-5 w-5 text-white/90 transition-colors duration-300 group-hover:text-indigo-300" />
        <span className="pointer-events-none absolute -bottom-11 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/90 px-3 py-1 text-[11px] font-medium tracking-[0.18em] text-white/85 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5">
          {skill.label}
        </span>
      </button>
    </div>
  );
}

export function OrbitingSkills({
  innerSkills = defaultInnerSkills,
  outerSkills = defaultOuterSkills,
  className,
}: OrbitingSkillsProps) {
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const rotationRef = useRef(0);
  const [isPaused, setIsPaused] = useState(false);

  const innerAngles = useMemo(
    () => innerSkills.map((_, index) => (360 / innerSkills.length) * index),
    [innerSkills],
  );
  const outerAngles = useMemo(
    () => outerSkills.map((_, index) => (360 / outerSkills.length) * index),
    [outerSkills],
  );

  useEffect(() => {
    const step = (time: number) => {
      if (!orbitRef.current) {
        return;
      }

      if (lastTimeRef.current == null) {
        lastTimeRef.current = time;
      }

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!isPaused) {
        rotationRef.current = (rotationRef.current + delta * 0.012) % 360;
        orbitRef.current.style.setProperty('--orbit-rotation', `${rotationRef.current}deg`);
      }

      animationRef.current = window.requestAnimationFrame(step);
    };

    animationRef.current = window.requestAnimationFrame(step);

    return () => {
      if (animationRef.current != null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  return (
    <div
      ref={orbitRef}
      className={cn(
        'relative mx-auto flex w-full max-w-4xl items-center justify-center py-10 sm:py-12',
        className,
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="relative flex h-[24rem] w-[24rem] items-center justify-center scale-90 sm:h-[28rem] sm:w-[28rem] sm:scale-100 lg:h-[36rem] lg:w-[36rem]">
        <div className="absolute inset-0 rounded-full border border-white/5 bg-[radial-gradient(circle,rgba(99,102,241,0.1),transparent_58%)] blur-2xl" />

        <div className="absolute inset-16 rounded-full border border-white/5" />
        <div className="absolute inset-32 rounded-full border border-white/5" />

        <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-2xl" />
        <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border border-indigo-400/30 bg-[#111111] shadow-[0_0_40px_rgba(99,102,241,0.18)]">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 text-sm font-semibold tracking-[0.22em] text-white shadow-[0_0_30px_rgba(99,102,241,0.45)]">
            Code
          </div>
        </div>

        <div className="absolute inset-0 [--orbit-rotation:0deg]">
          {innerSkills.map((skill, index) => (
            <OrbitSkill
              key={skill.label}
              skill={skill}
              angle={innerAngles[index]}
              radius={86}
            />
          ))}
        </div>

        <div className="absolute inset-0 [--orbit-rotation:0deg]">
          {outerSkills.map((skill, index) => (
            <OrbitSkill
              key={skill.label}
              skill={skill}
              angle={outerAngles[index]}
              radius={142}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

