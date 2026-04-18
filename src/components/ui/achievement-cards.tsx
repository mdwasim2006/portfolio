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
          'flex min-w-[240px] items-center gap-4 rounded-lg border border-white/12 bg-white/[0.03] p-4 shadow-sm backdrop-blur-md',
          'transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md',
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
