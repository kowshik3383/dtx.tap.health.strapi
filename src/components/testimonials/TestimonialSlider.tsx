'use client';

import React, { useState } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { components } from '@/types/strapi';

import { trackEvent, trackFacebookPixelEvent } from '@/utils/analytics';
import { registerIntentEvent } from '@/utils/registerIntentEvent';
import TestimonialCard from './TestimonialCard';

import 'swiper/css';
export type Testimonial = components['schemas']['Testimonial'];
interface TestimonialSliderProps {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
}
const TestimonialSlider = ({
  title,
  description,
  testimonials,
}: TestimonialSliderProps) => {
  const [expandedTestimonial, setExpandedTestimonial] = useState<
    number | null
  >(null);

  const toggleExpand = (id: number) => {
    setExpandedTestimonial(expandedTestimonial === id ? null : id);
  };

  return (
    <div className="w-full py-8 sm:py-12">
      <div className="mx-auto mb-8 max-w-3xl px-4 text-center sm:mb-10 sm:px-6 md:max-w-4xl lg:max-w-5xl">
        <h2 className="mb-2 text-[32px] font-bold text-gray-800 sm:text-4xl">
          {title}
        </h2>
        <p className="text-[16px] text-gray-600 sm:text-xl">
          {description}
        </p>
      </div>

      <div className="relative px-4 sm:px-6">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          centeredSlides
          slidesPerView={1.15}
          loop
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="overflow-visible"
          onTouchEnd={swiper => {
            if (swiper.touches.diff !== 0) {
              const index = swiper.realIndex;
              const testimonialData = testimonials?.[index];

              const eventPayload = {
                url: window.location.href,
                slide_index: index,
                testimonial_name:
                  testimonialData?.name || 'unknown',
                testimonial_id:
                  testimonialData?.id || 'unknown',
                swipe_direction:
                  swiper.touches.diff < 0 ? 'left' : 'right',
              };

              // ✅ Internal analytics (no value/currency)
              trackEvent('testimonial_swipe', eventPayload);

              // ✅ Facebook Pixel only
              trackFacebookPixelEvent('testimonial_swipe', {
                value: 50,
                currency: 'INR',
              });

              registerIntentEvent('TestimonialSwipe');
            }
          }}>
          {testimonials?.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id}>
              <TestimonialCard
                testimonial={testimonial}
                isExpanded={expandedTestimonial === index}
                ind={index}
                toggleExpand={toggleExpand}
                initialRender={index < 3} // 👈 render only first 3 immediately
              />
            </SwiperSlide>
          ))}

        </Swiper>
      </div>
    </div>
  );
};

export default React.memo(TestimonialSlider);
