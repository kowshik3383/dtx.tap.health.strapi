// src/data/testimonials.ts
import { Testimonial } from './types';

export const testimonials: Testimonial[] = [
	{
		id: 1,
		name: 'Ramesh S.',
		age: 42,
		plan: '42 Years, (12 months plan)',
		quote: "I've reduced my diabetes medicines in just 3 months.",
		avatar: '/assets/v2/avatar2.svg',
		rating: 5,
		description:
			"I followed the AI's meal and activity plan closely—and in my last checkup, my doctor actually lowered my medication. That's a huge win for me.",
		image: '/assets/v2/testimonial.svg',
	},
	{
		id: 2,
		name: 'Swayam',
		age: 38,
		plan: '52 Years, (6 months plan)',
		quote: 'It’s like having a coach in my pocket 24/7.',
		avatar: '/assets/v2/avatar1.svg',
		rating: 5,
		description:
			'The AI support is honestly amazing. It remembers my habits, gives timely advice, and adjusts things when I slip up. It really feels personal.',
		image: '/assets/v2/testimonial2.svg',
	},
	{
		id: 3,
		name: 'Lokesh Rawat',
		age: 35,
		plan: '38 Years, (3 months plan)',
		quote: 'The meal and workout plans actually fit my day.',
		avatar: '/assets/v2/avatar3.svg',
		rating: 5,
		description:
			'I don’t have to overthink anything. I wake up, check the plan, and just follow along—whether it’s food suggestions or short home workouts.',
		image: '/assets/v2/testimonial3.svg',
	},
];
