import { useEffect, useId, useMemo, useRef, type CSSProperties } from 'react';
import { animate, useMotionValue, type AnimationPlaybackControls } from 'framer-motion';

type ResponsiveImage = {
  src: string;
  alt?: string;
  srcSet?: string;
};

type AnimationConfig = {
  preview?: boolean;
  scale: number;
  speed: number;
};

type NoiseConfig = {
  opacity: number;
  scale: number;
};

type ShadowOverlayProps = {
  type?: 'preset' | 'custom';
  presetIndex?: number;
  customImage?: ResponsiveImage;
  sizing?: 'fill' | 'stretch';
  color?: string;
  animation?: AnimationConfig;
  noise?: NoiseConfig;
  style?: CSSProperties;
  className?: string;
};

function mapRange(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number,
): number {
  if (fromLow === fromHigh) {
    return toLow;
  }
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
  const id = useId();
  return `shadowoverlay-${id.replace(/:/g, '')}`;
};

export function Component({
  sizing = 'fill',
  color = 'rgba(128, 128, 128, 1)',
  animation,
  noise,
  style,
  className,
}: ShadowOverlayProps) {
  const id = useInstanceId();
  const animationEnabled = Boolean(animation && animation.scale > 0);
  const feColorMatrixRef = useRef<SVGFEColorMatrixElement | null>(null);
  const hueRotateMotionValue = useMotionValue(180);
  const hueRotateAnimation = useRef<AnimationPlaybackControls | null>(null);

  const displacementScale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
  const animationDuration = animation ? mapRange(animation.speed, 1, 100, 1000, 50) : 1;

  useEffect(() => {
    if (feColorMatrixRef.current && animationEnabled) {
      hueRotateAnimation.current?.stop();
      hueRotateMotionValue.set(0);

      hueRotateAnimation.current = animate(hueRotateMotionValue, 360, {
        duration: animationDuration / 25,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: 'loop',
        repeatDelay: 0,
        ease: 'linear',
        delay: 0,
        onUpdate: (value: number) => {
          if (feColorMatrixRef.current) {
            feColorMatrixRef.current.setAttribute('values', String(value));
          }
        },
      });

      return () => {
        hueRotateAnimation.current?.stop();
      };
    }

    return undefined;
  }, [animationEnabled, animationDuration, hueRotateMotionValue]);

  const overlayNoise = noise ?? { opacity: 0.3, scale: 1.1 };

  const background = useMemo(
    () => ({
      backgroundColor: color,
      maskImage: `url('https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png')`,
      maskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
      maskRepeat: 'no-repeat',
      maskPosition: 'center',
      width: '100%',
      height: '100%',
    }),
    [color, sizing],
  );

  return (
    <div
      className={className}
      style={{
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: -displacementScale,
            filter: animationEnabled ? `url(#${id}) blur(5px)` : 'none',
            opacity: 1,
        }}
      >
        {animationEnabled && (
          <svg style={{ position: 'absolute' }}>
            <defs>
              <filter id={id}>
                <feTurbulence
                  result="undulation"
                  numOctaves="2"
                  baseFrequency={`${mapRange(animation!.scale, 0, 100, 0.001, 0.0005)},${mapRange(animation!.scale, 0, 100, 0.004, 0.002)}`}
                  seed="0"
                  type="turbulence"
                />
                <feColorMatrix ref={feColorMatrixRef} in="undulation" type="hueRotate" values="180" />
                <feColorMatrix
                  in="dist"
                  result="circulation"
                  type="matrix"
                  values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="circulation"
                  scale={displacementScale}
                  result="dist"
                />
                <feDisplacementMap in="dist" in2="undulation" scale={displacementScale} result="output" />
              </filter>
            </defs>
          </svg>
        )}

        <div style={background} />
      </div>

      {overlayNoise.opacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")`,
            backgroundSize: overlayNoise.scale * 200,
            backgroundRepeat: 'repeat',
            opacity: overlayNoise.opacity,
          }}
        />
      )}
    </div>
  );
}
