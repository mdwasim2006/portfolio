import * as React from 'react';
import { cn } from '../../lib/utils';

export interface AwardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AwardCard = React.forwardRef<HTMLDivElement, AwardCardProps>(
  ({ className, icon, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex h-full min-w-[240px] items-center gap-4 rounded-lg border border-white/22 bg-[#070f1b]/58 p-4 shadow-[0_12px_26px_rgba(2,6,23,0.35)] backdrop-blur-2xl',
          'transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_16px_30px_rgba(2,6,23,0.48)]',
          className,
        )}
        {...props}
      >
        <div className="flex-shrink-0 text-white/90">{icon}</div>

        <div className="flex flex-col text-left">
          <p className="text-sm text-white/60">{title}</p>
          <p className="font-semibold text-white">{description}</p>
        </div>
      </div>
    );
  },
);

AwardCard.displayName = 'AwardCard';

export { AwardCard };
