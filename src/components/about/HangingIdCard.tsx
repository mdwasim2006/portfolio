import { MapPin, ShieldCheck, Sparkles } from 'lucide-react';

interface HangingIdCardProps {
  name: string;
  role: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
}

export function HangingIdCard({ name, role, location, imageSrc, imageAlt }: HangingIdCardProps) {
  return (
    <div className="relative mx-auto flex w-[15.75rem] max-w-[15.75rem] cursor-grab touch-none select-none flex-col items-center active:cursor-grabbing" data-id-card>
      <div className="h-16 w-[2px] bg-gradient-to-b from-indigo-300/90 to-indigo-300/5" data-id-rope />
      <div className="-mt-1 h-3.5 w-3.5 rounded-full border border-indigo-200/70 bg-indigo-300/45 shadow-[0_0_18px_rgba(99,102,241,0.35)]" />

      <div className="mt-2 w-full" data-id-body data-tilt-inner>
        <article className="group w-full rounded-2xl border border-indigo-200/30 bg-[#0d1220]/95 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.45)] backdrop-blur-md lg:p-5">
          <div className="flex items-center gap-3.5">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="h-14 w-14 rounded-xl border border-indigo-300/25 object-cover object-[center_18%] scale-125"
          />
          <div className="min-w-0">
            <h3 className="truncate text-[1rem] font-bold tracking-[-0.02em] text-white lg:text-lg">{name}</h3>
            <p className="text-sm text-indigo-200/90">{role}</p>
          </div>
        </div>

          <div className="mt-3.5 space-y-2 text-sm text-white/75">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-cyan-300" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            <span>Secure systems and clean engineering workflows</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-fuchsia-300" />
            <span>Focused on creative UI, automation, and performance</span>
          </div>
        </div>

        <div
          data-id-tag
          className="mt-4 rounded-lg border border-indigo-200/20 bg-indigo-500/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-indigo-100/90 transition group-hover:border-indigo-200/45 group-hover:bg-indigo-500/20 lg:text-[11px]"
        >
          Full Stack Development • Secure Architecture • Creative Interaction Design
        </div>
        </article>
      </div>
    </div>
  );
}
