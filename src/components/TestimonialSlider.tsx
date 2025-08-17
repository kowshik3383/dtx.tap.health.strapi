// import Image from 'next/image';
// import React, { useState } from 'react';
// import { Autoplay } from 'swiper/modules';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { trackEvent } from '@/utils/analytics';
// import 'swiper/css';
// import 'swiper/css/pagination';

// const TestimonialSlider = () => {
// 	const [expandedTestimonial, setExpandedTestimonial] = useState<
// 		number | null
// 	>(null);

// 	const toggleExpand = (id: number) => {
// 		setExpandedTestimonial(expandedTestimonial === id ? null : id);
// 	};

// 	const testimonials = [
// 		{
// 			id: 1,
// 			name: 'Arun',
// 			age: 42,
// 			location: 'Nagpur',
// 			image: 'https://i.ibb.co/h1BJL5N2/IMG-7214.jpg',
// 			rating: 5,
// 			achievement:
// 				'Fasting glucose dropped from 140 mg/dL to 110 mg/dL in just two months',
// 			testimony:
// 				'Managing diabetes always felt like a struggle, but Tap Health made it so easy! The AI gives me meal plans and reminders, and I feel more in control than ever.',
// 		},
// 		{
// 			id: 2,
// 			name: 'Rani',
// 			age: 51,
// 			location: 'Chandigarh',
// 			image: 'https://i.ibb.co/wNDKjjM4/IMG-7213.jpg',
// 			rating: 5,
// 			achievement: 'Lost 4.5 Kg in 1 Month',
// 			testimony:
// 				'I love how I can just click a photo of my meal, and Tap Health instantly gives me the macros. It helps me stay mindful of what I’m eating without any extra effort!',
// 		},
// 		{
// 			id: 3,
// 			name: 'Nagesh',
// 			age: 48,
// 			location: 'Chennai',
// 			image: 'https://i.ibb.co/YTtsqPJ1/IMG-7217.jpg',
// 			rating: 5,
// 			achievement: 'HbA1c improved from 8.5% to 7.1%',
// 			testimony:
// 				'With me being Diabetic, my Wife used to struggle with my meal planning, but Tap Health’s custom meal plans make it so simple for her! It suggests meals that fit my diet and taste. We both are happy now.',
// 		},
// 		{
// 			id: 4,
// 			name: 'Urmila',
// 			age: 39,
// 			location: 'Pune',
// 			image: 'https://i.ibb.co/WNfDCYbg/IMG-7215.jpg',
// 			rating: 5,
// 			achievement: 'Weekly average glucose readings decreased by 15%',
// 			testimony:
// 				'Tracking my sugar levels used to be a hassle, but now I just scan my glucose readings, and Tap Health logs them automatically. So easy and convenient.',
// 		},
// 		{
// 			id: 5,
// 			name: 'Thomas',
// 			age: 47,
// 			location: 'Kochi',
// 			image: 'https://i.ibb.co/MyYbRSDG/IMG-7216.jpg',
// 			rating: 5,
// 			achievement: 'Dropped daily rapid-acting insulin by 10 units',
// 			testimony:
// 				'I thought only expensive programs could help with diabetes, but Tap Health is affordable and just as effective! It’s like having a personal diabetes coach in my pocket.',
// 		},
// 		{
// 			id: 7,
// 			name: 'Manoj',
// 			age: 50,
// 			location: 'Ranchi',
// 			image: 'https://i.ibb.co/h1fQ3692/Manjeet.jpg',
// 			rating: 5,
// 			achievement:
// 				'Increased pain-free walking duration by 20 minutes and better sugar control',
// 			testimony:
// 				"I have a back problem and I am Diabetic. Finding the right workout for me was confusing, but Tap Health gives me a plan based on my fitness level. It’s like having a personal trainer! I'm now able to walk for 20 minutes without pain, which I couldn't do before.",
// 		},
// 		{
// 			id: 8,
// 			name: 'Divya',
// 			age: 45,
// 			location: 'Surat',
// 			image: 'https://i.ibb.co/9f0zRm0/IMG-3139-Original.jpg',
// 			rating: 5,
// 			achievement: 'Reduced HbA1c from 9.7 to 7.6',
// 			testimony:
// 				'I was sceptical about AI, but this app is a game changer! It understands my needs and gives suggestions that work. Diabetes management has never been this simple.',
// 		},
// 		{
// 			id: 9,
// 			name: 'Anil',
// 			age: 45,
// 			location: 'Gurgaon',
// 			image: 'https://i.ibb.co/N2yxgShd/IMG-8075.jpg',
// 			rating: 5,
// 			achievement:
// 				'Anxiety related to diabetes management has gone down significantly',
// 			testimony:
// 				'Tap Health gives me instant answers, easing my diabetes anxiety and improving my blood pressure—no more constant calls to the doctor!',
// 		},
// 		{
// 			id: 10,
// 			name: 'Pravjot',
// 			age: 37,
// 			location: 'Patiala',
// 			image: 'https://i.ibb.co/7xW3tnHy/IMG-8076.jpg',
// 			rating: 5,
// 			achievement: 'Waist circumference reduced by 5 cm in 2 months',
// 			testimony:
// 				'Every time I eat something, I just take a photo, and Tap Health tells me the meal score along with Macros. This feature has completely changed how I manage my diet!',
// 		},
// 		{
// 			id: 11,
// 			name: 'Saket',
// 			age: 41,
// 			location: 'Kolkata',
// 			image: 'https://i.ibb.co/Y4Cz0Qgq/IMG-8074.jpg',
// 			rating: 5,
// 			achievement: 'HbA1C reduced from 11.2 to 7.1',
// 			testimony:
// 				'When I started, my HbA1c was 11.2. With Tap Health’s personalized guidance and constant support, it’s now down to 7.1. I feel more energetic and in control of my health than ever before!',
// 		},
// 	];

// 	return (
// 		<div className="w-full py-8 sm:py-12">
// 			<div className="mx-auto mb-8 max-w-3xl px-4 text-center sm:mb-10 sm:px-6 md:max-w-4xl lg:max-w-5xl">
// 				<h2 className="mb-2 text-[32px] font-bold text-gray-800 sm:text-4xl">
// 					86% of our users
// 				</h2>
// 				<p className="text-[16px] text-gray-600 sm:text-xl">
// 					recommend Tap Health to their friends.
// 				</p>
// 			</div>

// 			<div className="relative px-4 sm:px-6">
// 				<Swiper
// 					modules={[Autoplay]}
// 					spaceBetween={16}
// 					centeredSlides={true}
// 					slidesPerView={1.15}
// 					loop={true}
// 					autoplay={{ delay: 5000, disableOnInteraction: false }}
// 					className="overflow-visible"
// 					onTouchEnd={swiper => {
// 						// Track only user-initiated swipes
// 						if (swiper.touches.diff !== 0) {
// 							const index = swiper.realIndex;
// 							// Get the testimonial data for the active slide
// 							const testimonialData = testimonials[index];

// 							trackEvent(
// 								'dtx_paid_landing_page_testimonial_swipe',
// 								{
// 									url: window.location.href,
// 									slide_index: index,
// 									value: 50,
// 									currency: 'INR',
// 									testimonial_name:
// 										testimonialData?.name || 'unknown',
// 									testimonial_id:
// 										testimonialData?.id || 'unknown',
// 									swipe_direction:
// 										swiper.touches.diff < 0
// 											? 'left'
// 											: 'right',
// 								},
// 							);
// 						}
// 					}}>
// 					{testimonials.map(testimonial => {
// 						const isExpanded =
// 							expandedTestimonial === testimonial.id;
// 						const isLong = testimonial.testimony.length > 200;

// 						return (
// 							<SwiperSlide key={testimonial.id}>
// 								<div className="flex items-center justify-center">
// 									<div className="mx-auto flex h-[500px] w-full max-w-xs flex-col overflow-hidden rounded-[10px] bg-[#2563EB] shadow-lg">
// 										{/* Image */}
// 										<div className="mt-3 flex h-full w-full items-center justify-center overflow-hidden rounded-t-[10px] p-4 pt-4">
// 											<Image
// 												src={testimonial.image}
// 												alt={testimonial.name}
// 												width={288}
// 												height={288}
// 												className="mt-4 h-[288px] w-[288px] object-cover pt-2"
// 												priority
// 											/>
// 										</div>

// 										{/* Content */}
// 										<div className="flex flex-1 flex-col justify-between p-5 pt-3 text-white">
// 											<div>
// 												<div className="mb-1 flex items-center justify-between">
// 													<div>
// 														<h3 className="text-sm font-bold text-white">
// 															{testimonial.name},{' '}
// 															<span className="text-sm font-normal text-blue-100">
// 																Age{' '}
// 																{
// 																	testimonial.age
// 																}
// 															</span>
// 														</h3>
// 														<p className="text-xs text-blue-100">
// 															From{' '}
// 															{
// 																testimonial.location
// 															}
// 														</p>
// 													</div>
// 													<div className="flex">
// 														{[...Array(5)].map(
// 															(_, i) => (
// 																<svg
// 																	key={i}
// 																	className="h-4 w-4 fill-current text-yellow-400"
// 																	viewBox="0 0 24 24">
// 																	<path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
// 																</svg>
// 															),
// 														)}
// 													</div>
// 												</div>

// 												<div className="my-2">
// 													<button className="w-full rounded-full bg-white px-4 py-2 text-center text-sm font-bold text-blue-600">
// 														{
// 															testimonial.achievement
// 														}
// 													</button>
// 												</div>

// 												{/* Testimony */}
// 												<p
// 													className={`mt-2 text-[15px] leading-relaxed font-medium ${!isExpanded && isLong
// 														? 'line-clamp-4'
// 														: ''
// 														}`}>
// 													{testimonial.testimony}
// 												</p>
// 											</div>

// 											{/* See More */}
// 											{isLong && (
// 												<button
// 													onClick={() =>
// 														toggleExpand(
// 															testimonial.id,
// 														)
// 													}
// 													className="mt-2 text-sm text-blue-200 underline hover:text-white">
// 													{isExpanded
// 														? 'See less'
// 														: 'See more'}
// 												</button>
// 											)}
// 										</div>
// 									</div>
// 								</div>
// 							</SwiperSlide>
// 						);
// 					})}
// 				</Swiper>
// 			</div>
// 		</div>
// 	);
// };

// export default TestimonialSlider;
