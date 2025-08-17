'use client';
import { motion, useAnimation, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { components } from '@/types/strapi';
import Section from '../layout/Section';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export async function lottiejson(url: string): Promise<object | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Invalid response');
    // Assert the result as object (if you are sure your API returns a plain object)
    return (await response.json()) as object;
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error loading Lottie JSON:', e);
    }
    return null;
  }
}


type Props = components['schemas']['ItemsPhotologgingComponent'];

const DiabeticPhotoLogging: React.FC<Props> = React.memo(
  ({ icon, animation_loop, lottie_animation }) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, {
      once: true,
      margin: '0px 0px -100px 0px',
    });
    const controls = useAnimation();

    const [animationData, setAnimationData] = useState<object | null>(null);

    // Memoize the animation URL for stable effect dependencies
    const animationUrl = useMemo(
      () => lottie_animation?.url || '',
      [lottie_animation?.url]
    );

    useEffect(() => {
      if (!isInView) return;
      let mounted = true;

      async function fetchAnimation() {
        try {
          const data = animationUrl ? await lottiejson(animationUrl) : null;
          if (mounted && data) {
            setAnimationData(data);
            controls.start('visible');
          } else {
            // fallback to local animation
            const fallback = await import('../../../public/food_scanning.json') as { default: object };
            if (mounted) {
              setAnimationData(fallback.default);
              controls.start('visible');
            }
          }
        } catch {
          const fallback = await import('../../../public/food_scanning.json') as { default: object };
          if (mounted) {
            setAnimationData(fallback.default);
            controls.start('visible');
          }
        }
      }

      fetchAnimation();

      return () => {
        mounted = false;
      };
    }, [isInView, animationUrl, controls]);

    const imageVariants = {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 },
    };

    return (
      <Section
        title="Snap to Get Meal Insights"
        description="Take a picture of your meal to get instant feedback"
        icon={icon}
      >
        <motion.div
          ref={ref}
          variants={imageVariants}
          initial="hidden"
          animate={controls}
        >
          {animationData && (
            <Lottie
              animationData={animationData}
              loop={!!animation_loop}
              className="mt-6 h-56 w-full"
            />
          )}
        </motion.div>
      </Section>
    );
  }
);

DiabeticPhotoLogging.displayName = 'DiabeticPhotoLogging';

export default DiabeticPhotoLogging;

