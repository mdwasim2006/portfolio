'use client';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useEffect, useRef } from 'react';

type DottedSurfaceProps = Omit<React.ComponentProps<'div'>, 'ref'>;

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { resolvedTheme } = useTheme();

  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.display = 'block';
    container.appendChild(canvas);

    const cols = 124;
    const rows = 64;
    const baseRadius = 0.42;

    type Dot = {
      u: number;
      v: number;
      phase: number;
    };

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;

    let scrollProgress = 0;
    let sectionProgress = 0;
    let scrollTarget = 0;
    let sectionTarget = 0;
    let zoomProgress = 1;

    const rebuildDots = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({
            u: cols <= 1 ? 0.5 : col / (cols - 1),
            v: rows <= 1 ? 0.5 : row / (rows - 1),
            // Deterministic phase preserves clean line-like wave motion.
            phase: row * 0.17 + col * 0.09,
          });
        }
      }
    };

    const updateScrollState = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>('[data-section]'),
      );
      const maxScrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollTarget = window.scrollY / maxScrollable;

      if (sections.length === 0) {
        sectionTarget = scrollTarget;
        return;
      }

      const viewportMarker = window.innerHeight * 0.45;
      let activeIndex = 0;
      let activeLocal = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const inView = rect.top <= viewportMarker && rect.bottom >= viewportMarker;
        const sectionHeight = Math.max(1, rect.height);
        const local = Math.min(
          1,
          Math.max(0, (viewportMarker - rect.top) / sectionHeight),
        );

        if (inView) {
          activeIndex = index;
          activeLocal = local;
          nearestDistance = -1;
          return;
        }

        if (nearestDistance >= 0) {
          const center = rect.top + sectionHeight / 2;
          const distance = Math.abs(center - viewportMarker);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            activeIndex = index;
            activeLocal = local;
          }
        }
      });

      sectionTarget =
        (activeIndex + activeLocal) / Math.max(1, sections.length - 1);
    };

    // Animation function
    const renderFrame = (time = 0) => {
      animationFrameRef.current = requestAnimationFrame(renderFrame);

      scrollProgress += (scrollTarget - scrollProgress) * 0.12;
      sectionProgress += (sectionTarget - sectionProgress) * 0.11;
      const zoomTarget = 1 + scrollTarget * 0.95;
      zoomProgress += (zoomTarget - zoomProgress) * 0.1;

      const t = time * 0.001;
      const sectionMotion = sectionProgress - 0.5;
      const centerX = width / 2;
      const horizonY = height * 0.14;
      const sectionSlideY = -sectionProgress * height * 0.16;
      const sectionSlideX = sectionMotion * 92;
      const globalPulse = 1 + Math.sin(t * 1.1) * 0.045;
      const baseR = resolvedTheme === 'dark' ? 224 : 44;
      const baseG = resolvedTheme === 'dark' ? 233 : 58;
      const baseB = resolvedTheme === 'dark' ? 255 : 86;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const flow = t + dot.phase * 0.25;
        const depth = Math.pow(dot.v, 1.28);
        const spread = (0.26 + depth * 1.78) * (0.96 + zoomProgress * 0.5);
        const xBase = centerX + (dot.u - 0.5) * width * spread;
        const yBase = horizonY + depth * (height * 1.02) * (0.8 + zoomProgress * 0.34);
        const waveScale = 0.78 + zoomProgress * 0.5;

        const waveY =
          Math.sin(dot.u * 13 + flow * 1.7 + sectionProgress * 2.4) * (22 * (1 - depth * 0.35)) * waveScale +
          Math.cos(dot.v * 18 + flow * 1.25 + scrollProgress * 7.2) * (18 * (1 - depth * 0.18)) * waveScale;

        const waveX =
          Math.sin(dot.v * 9 + flow * 0.72 + sectionProgress * 1.8) * (16 * (1 - depth * 0.35)) * (0.7 + zoomProgress * 0.45);

        const x = xBase + waveX + sectionSlideX;
        const y = yBase + waveY + sectionSlideY;

        const radius = Math.min(2.2, (baseRadius + depth * 1.2) * globalPulse * (0.86 + zoomProgress * 0.5));
        if (x < -60 || x > width + 60 || y < -60 || y > height + 60) {
          continue;
        }

        const depthFade = Math.min(1, Math.max(0, (y + 30) / (height * 1.05)));
        const alpha =
          (0.18 + depthFade * 0.62) *
          (0.95 + Math.sin(flow * 1.05 + dot.phase) * 0.05) *
          (0.9 + scrollProgress * 0.22);
        ctx.fillStyle = `rgba(${baseR}, ${baseG}, ${baseB}, ${alpha})`;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Handle window resize
    const handleResize = () => rebuildDots();

    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', handleResize);

    // Start animation
    rebuildDots();
    updateScrollState();
    renderFrame();

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, [resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className={cn('pointer-events-none fixed inset-0 z-0', className)}
      {...props}
    />
  );
}
