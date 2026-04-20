import type { ReactNode } from 'react';
import { DottedSurface } from '../ui/dotted-surface';

interface AnimatedBackgroundWrapperProps {
  children: ReactNode;
}

export default function AnimatedBackgroundWrapper({ children }: AnimatedBackgroundWrapperProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_75%_55%_at_20%_-10%,rgba(99,102,241,0.2),transparent_60%),radial-gradient(ellipse_65%_50%_at_90%_0%,rgba(14,165,233,0.16),transparent_62%),radial-gradient(ellipse_60%_55%_at_50%_100%,rgba(168,85,247,0.1),transparent_70%)]"
      />
      <DottedSurface className="opacity-95" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
