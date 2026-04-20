import { animate } from 'animejs';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';

let gsapPluginsRegistered = false;

if (!gsapPluginsRegistered) {
  gsap.registerPlugin(ScrollTrigger);
  gsapPluginsRegistered = true;
}

export function useCreativeMotion() {
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];
    const animeAnimations: Array<{ pause: () => void }> = [];

    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-section]');
      sections.forEach((section, index) => {
        gsap.fromTo(
          section,
          {
            autoAlpha: 0,
            y: 36,
            scale: 0.985,
            filter: 'blur(12px)',
          },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.85,
            delay: index * 0.035,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 90%',
              once: true,
            },
          },
        );
      });

      const parallaxLayers = gsap.utils.toArray<HTMLElement>('[data-parallax]');
      parallaxLayers.forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 10);

        gsap.to(layer, {
          yPercent: -depth,
          ease: 'none',
          scrollTrigger: {
            trigger: layer,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
          },
        });
      });

      const tiltableCards = gsap.utils.toArray<HTMLElement>('[data-tilt]');
      tiltableCards.forEach((card) => {
        const tiltTarget = card.querySelector<HTMLElement>('[data-tilt-inner]') ?? card;
        const rotateXTo = gsap.quickTo(tiltTarget, 'rotationX', { duration: 0.35, ease: 'power3.out' });
        const rotateYTo = gsap.quickTo(tiltTarget, 'rotationY', { duration: 0.35, ease: 'power3.out' });
        const zTo = gsap.quickTo(tiltTarget, 'z', { duration: 0.35, ease: 'power2.out' });

        const handleMove = (event: MouseEvent) => {
          const bounds = card.getBoundingClientRect();
          const px = (event.clientX - bounds.left) / bounds.width;
          const py = (event.clientY - bounds.top) / bounds.height;

          const rotateY = (px - 0.5) * 12;
          const rotateX = (0.5 - py) * 12;

          rotateXTo(rotateX);
          rotateYTo(rotateY);
          zTo(10);
        };

        const handleLeave = () => {
          rotateXTo(0);
          rotateYTo(0);
          zTo(0);
        };

        card.addEventListener('mousemove', handleMove);
        card.addEventListener('mouseleave', handleLeave);

        cleanupFns.push(() => {
          card.removeEventListener('mousemove', handleMove);
          card.removeEventListener('mouseleave', handleLeave);
        });
      });

      const hangingCards = gsap.utils.toArray<HTMLElement>('[data-id-card]');
      hangingCards.forEach((card) => {
        const rope = card.querySelector<HTMLElement>('[data-id-rope]');
        const body = card.querySelector<HTMLElement>('[data-id-body]');
        const tag = card.querySelector<HTMLElement>('[data-id-tag]');
        const dragTarget = body ?? card;
        let isDragging = false;
        let pointerId: number | null = null;
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        gsap.set(card, { transformOrigin: '50% -56px' });
        if (body) {
          gsap.set(body, { transformOrigin: '50% 0%' });
        }

        const revealTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            once: true,
          },
        });

        revealTimeline.fromTo(
          rope,
          {
            scaleY: 0.2,
            autoAlpha: 0.35,
            transformOrigin: 'top center',
          },
          {
            scaleY: 1,
            autoAlpha: 1,
            duration: 0.45,
            ease: 'power2.out',
          },
        );

        revealTimeline.fromTo(
          card,
          {
            y: -82,
            rotation: -20,
            autoAlpha: 0,
          },
          {
            y: 0,
            rotation: 0,
            autoAlpha: 1,
            duration: 1,
            ease: 'bounce.out',
          },
          '<0.05',
        );

        if (rope) {
          revealTimeline.fromTo(
            rope,
            { scaleY: 1 },
            {
              scaleY: 0.95,
              duration: 0.18,
              yoyo: true,
              repeat: 2,
              ease: 'sine.inOut',
            },
            '<0.2',
          );
        }

        const clamp = (value: number, min: number, max: number) =>
          Math.min(max, Math.max(min, value));

        const handlePointerDown = (event: PointerEvent) => {
          isDragging = true;
          pointerId = event.pointerId;
          startX = event.clientX - currentX;
          startY = event.clientY - currentY;
          card.setPointerCapture(event.pointerId);

          if (tag) {
            gsap.to(tag, {
              scale: 1.02,
              duration: 0.18,
              ease: 'power2.out',
              transformOrigin: 'center center',
            });
          }
        };

        const handlePointerMove = (event: PointerEvent) => {
          if (!isDragging || pointerId !== event.pointerId) {
            return;
          }

          const nextX = clamp(event.clientX - startX, -30, 30);
          const nextY = clamp(event.clientY - startY, -22, 22);
          const nextRotation = clamp(nextX * 0.22, -9, 9);

          currentX = nextX;
          currentY = nextY;

          gsap.to(dragTarget, {
            x: nextX,
            y: nextY,
            rotation: nextRotation,
            duration: 0.08,
            ease: 'power2.out',
            overwrite: 'auto',
          });

          if (tag) {
            gsap.to(tag, {
              x: nextX * 0.45,
              duration: 0.1,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        };

        const resetDragTarget = () => {
          isDragging = false;
          pointerId = null;
          currentX = 0;
          currentY = 0;

          gsap.to(dragTarget, {
            rotation: 0,
            x: 0,
            y: 0,
            duration: 0.36,
            ease: 'power3.out',
          });

          if (tag) {
            gsap.to(tag, {
              x: 0,
              scale: 1,
              duration: 0.28,
              ease: 'power2.out',
              overwrite: 'auto',
            });
          }
        };

        const handlePointerUp = (event: PointerEvent) => {
          if (pointerId !== event.pointerId) {
            return;
          }

          if (card.hasPointerCapture(event.pointerId)) {
            card.releasePointerCapture(event.pointerId);
          }

          resetDragTarget();
        };

        const handlePointerCancel = (event: PointerEvent) => {
          if (pointerId !== event.pointerId) {
            return;
          }

          resetDragTarget();
        };

        const handleEscapeDrag = () => {
          if (!isDragging) {
            return;
          }

          resetDragTarget();
        };

        const handleSwing = (event: PointerEvent) => {
          if (isDragging) {
            handlePointerMove(event);
            return;
          }

          const rect = card.getBoundingClientRect();
          const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
          const hoverRotation = normalizedX * 2;

          gsap.to(card, {
            rotation: hoverRotation,
            duration: 0.2,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        const stopSwing = () => {
          if (isDragging) {
            return;
          }

          gsap.to(card, {
            rotation: 0,
            duration: 0.24,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };

        card.addEventListener('pointerdown', handlePointerDown);
        card.addEventListener('pointermove', handleSwing);
        card.addEventListener('pointerleave', stopSwing);
        card.addEventListener('pointerup', handlePointerUp);
        card.addEventListener('pointercancel', handlePointerCancel);
        card.addEventListener('lostpointercapture', handleEscapeDrag);

        cleanupFns.push(() => {
          revealTimeline.kill();
          card.removeEventListener('pointerdown', handlePointerDown);
          card.removeEventListener('pointermove', handleSwing);
          card.removeEventListener('pointerleave', stopSwing);
          card.removeEventListener('pointerup', handlePointerUp);
          card.removeEventListener('pointercancel', handlePointerCancel);
          card.removeEventListener('lostpointercapture', handleEscapeDrag);
        });
      });

      const floatElements = gsap.utils.toArray<HTMLElement>('[data-anime-float]');
      floatElements.forEach((element, index) => {
        const animation = animate(element, {
          translateY: [-(8 + index), 10 + index],
          translateX: [-4 - index * 0.4, 4 + index * 0.5],
          rotate: [-(index + 1) * 0.8, (index + 1) * 0.8],
          ease: 'inOutSine',
          duration: 3200 + index * 240,
          loop: true,
          alternate: true,
        });

        animeAnimations.push(animation);
      });
    });

    return () => {
      animeAnimations.forEach((animation) => animation.pause());
      cleanupFns.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);
}
