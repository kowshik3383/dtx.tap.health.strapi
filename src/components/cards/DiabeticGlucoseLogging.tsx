'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { components } from '@/types/strapi';
import { lottiejson } from './DiabeticPhotoLogging';
import Section from '../layout/Section';

// Fix: ensure correct type for Lottie
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type Props = components['schemas']['ItemsGlucoseComponent'];

const DiabeticGlucoseLogging: React.FC<Props> = React.memo(
  ({ title, description, icon, lottie_animation, animation_loop }) => {
    // Fix: type for ref
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
    const controls = useAnimation();

    // Fix: type for lottieData
    const [lottieData, setLottieData] = useState<object | null>(null);

    // Fix: useMemo with correct type
    const animationUrl = useMemo<string>(
      () => lottie_animation?.url || '',
      [lottie_animation?.url]
    );

    useEffect(() => {
      if (!isInView) return;
      let mounted = true;

      async function fetchAnimation() {
        try {
          const data = await lottiejson(animationUrl);
          if (mounted && data) {
            setLottieData(prev => (JSON.stringify(prev) !== JSON.stringify(data) ? data : prev));
            controls.start('visible');
          } else {
            // Fix: dynamic import with proper type
            const fallback = await import('../../../public/Glucometer.json') as { default: object };
            if (mounted) setLottieData(fallback.default);
          }
        } catch {
          const fallback = await import('../../../public/Glucometer.json') as { default: object };
          if (mounted) setLottieData(fallback.default);
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
        title={title || 'Diabetic Glucose Logging'}
        description={description || 'All your records in one place, understand trends'}
        icon={icon}
      >
        <motion.div ref={ref} variants={imageVariants} initial="hidden" animate={controls}>
          {lottieData && (
            <Lottie
              animationData={lottieData}
              loop={!!animation_loop}
              className="mt-6 h-56 w-full"
            />
          )}
        </motion.div>
      </Section>
    );
  }
);

export default DiabeticGlucoseLogging;
