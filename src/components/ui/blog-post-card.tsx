"use client";

import React from 'react';

import { Badge } from './badge';
import { Card, CardHeader, CardContent, CardFooter } from './card';
import { cn } from '../../lib/utils';

export interface ArticleCardProps {
  headline: string;
  excerpt: string;
  cover?: string;
  tag?: string;
  ctaHref?: string;
  ctaLabel?: string;
  readingTime?: number;
  writer?: string;
  publishedAt?: Date;
  clampLines?: number;
  className?: string;
}

export function formatReadTime(seconds: number): string {
  if (!seconds || seconds < 60) return 'Less than 1 min read';
  const minutes = Math.ceil(seconds / 60);
  return `${minutes} min read`;
}

export function formatPostDate(date: Date): string {
  if (!date) return '';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  cover,
  tag,
  ctaHref,
  ctaLabel = 'View Project',
  readingTime,
  headline,
  excerpt,
  writer,
  publishedAt,
  clampLines,
  className,
}) => {
  const hasMeta = tag || readingTime;
  const hasFooter = writer || publishedAt || ctaHref;
  const fallbackCover = '/projects/project-fallback.svg';

  return (
    <Card className={cn('flex h-full w-full flex-col gap-3 overflow-hidden border-white/10 bg-[#0b1020]/90 p-3 shadow-lg', className)}>
      {(cover || fallbackCover) && (
        <CardHeader className="p-0">
          <div className="relative h-48 w-full overflow-hidden rounded-2xl sm:h-52">
            <img
              src={cover || fallbackCover}
              alt={headline}
              className="h-full w-full object-cover"
              loading="lazy"
              onError={(event) => {
                const target = event.target as HTMLImageElement;
                if (target.src !== window.location.origin + fallbackCover) {
                  target.src = fallbackCover;
                }
              }}
            />
          </div>
        </CardHeader>
      )}

      <CardContent className="flex-grow p-3 pt-1">
        {hasMeta && (
          <div className="mb-4 flex items-center text-sm text-white/60">
            {tag && (
              <Badge className="rounded-full bg-white/8 px-3 py-1 text-xs text-white/75">
                {tag}
              </Badge>
            )}
            {tag && readingTime && <span className="mx-2">•</span>}
            {readingTime && <span>{formatReadTime(readingTime)}</span>}
          </div>
        )}

        <h2 className="mb-2 text-2xl font-bold leading-tight text-white">{headline}</h2>

        <p
          className={cn('text-white/65', {
            'overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [display:-webkit-box]':
              clampLines && clampLines > 0,
          })}
          style={{
            WebkitLineClamp: clampLines,
          }}
        >
          {excerpt}
        </p>
      </CardContent>

      {hasFooter && (
        <CardFooter className="flex items-center justify-between gap-3 p-3 pt-0">
          {writer && (
            <div>
              <p className="text-sm text-white/55">By</p>
              <p className="font-semibold text-white/75">{writer}</p>
            </div>
          )}
          {publishedAt && (
            <div className={writer ? 'text-right' : ''}>
              <p className="text-sm text-white/55">Published</p>
              <p className="font-semibold text-white/75">{formatPostDate(publishedAt)}</p>
            </div>
          )}
          {ctaHref && (
            <a
              href={ctaHref}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center justify-center rounded-full border border-indigo-400/45 bg-indigo-500/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-indigo-200 transition hover:border-indigo-300 hover:bg-indigo-500/25"
            >
              {ctaLabel}
            </a>
          )}
        </CardFooter>
      )}
    </Card>
  );
};
