'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';
import { components } from '@/types/strapi';

export default function Hero({
  logo,
  tag_line,
  title_line_1,
  title_line_2,
  hero_image,
  partnerLogo,
}: components['schemas']['DynamicZoneHeroComponent']) {
  return (
    <section className="gradient-frame overflow-hidden relative">
      <div className="flex min-h-[45vh] w-full flex-col p-4 font-display relative">

        {/* Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="z-20 mt-[20px] flex items-center justify-between"
        >
          {/* Tap Health Logo */}
          {logo?.url && (
            <div className="relative h-[22px] w-[106.857px]">
              <Image
                src={logo.url}
                alt="Tap Health Logo"
                width={107}
                height={22}
                className="object-contain"
                fetchPriority="high"
                placeholder="blur"
                blurDataURL="/images/logo-blur.png"
              />
            </div>
          )}

          {/* Partner Logo */}
          {partnerLogo?.url && (
            <div className="relative w-[264px] h-[48px]">
              <Image
                src={partnerLogo.url}
                alt={partnerLogo.name || 'Partner Logo'}
                width={264}
                height={48}
                className="object-contain"
                fetchPriority="high"
                placeholder="blur"
                blurDataURL="/images/partner-blur.png"
              />
            </div>
          )}
        </motion.div>

        {/* Headline Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-20 mt-6 flex flex-1 flex-col md:mt-16"
        >
          <div className="space-y-3 md:space-y-4">
            <h1 className="font-['Urbanist'] text-[17px] font-medium tracking-[-1.2%] text-[#252E49]">
              {tag_line}
            </h1>
            <p className="font-['Urbanist'] text-[32px] font-extrabold leading-[100%] tracking-[-1.2%] text-[#252E49]">
              {title_line_1} <br /> {title_line_2}
            </p>
          </div>
        </motion.div>

        {/* Hero Image */}
        {hero_image?.url && (
          <div className="absolute right-0 -bottom-20 z-10">
            <div className="relative h-[340px] w-[220px] md:h-[420px] md:w-[300px]">

              <Image
                src={hero_image.url}
                alt="Hero Image - Man holding phone"
                width={300}
                height={420}
                className="object-cover"
                priority
                placeholder="blur"
                blurDataURL="/images/hero-blur.jpg"
                sizes="(max-width: 768px) 220px, 300px"
              />

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
