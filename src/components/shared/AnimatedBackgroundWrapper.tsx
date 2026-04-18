import type { ReactNode } from 'react';
import { DottedSurface } from '../ui/dotted-surface';

interface AnimatedBackgroundWrapperProps {
  children: ReactNode;
}

export default function AnimatedBackgroundWrapper({ children }: AnimatedBackgroundWrapperProps) {
  return (
    <div className="relative w-full">
      <div className="pointer-events-none fixed inset-0 z-0">
        <DottedSurface className="size-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_85%_80%,rgba(34,197,94,0.08),transparent_45%)]" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
