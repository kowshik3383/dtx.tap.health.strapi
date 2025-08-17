export type Testimonial = {
	id: number;
	name: string;
	age: number;
	location: string;
	image: string;
	rating: number;
	achievement: string;
	testimony: string;
};

export const testimonials: Testimonial[] = [
	{
		id: 1,
		name: 'Arun',
		age: 42,
		location: 'Nagpur',
		image: 'https://i.ibb.co/h1BJL5N2/IMG-7214.jpg',
		rating: 5,
		achievement:
			'Fasting glucose dropped from 140 mg/dL to 110 mg/dL in just two months',
		testimony:
			'Managing diabetes always felt like a struggle, but Tap Health made it so easy! The AI gives me meal plans and reminders, and I feel more in control than ever.',
	},
	{
		id: 2,
		name: 'Rani',
		age: 51,
		location: 'Chandigarh',
		image: 'https://i.ibb.co/wNDKjjM4/IMG-7213.jpg',
		rating: 5,
		achievement: 'Lost 4.5 Kg in 1 Month',
		testimony:
			'I love how I can just click a photo of my meal, and Tap Health instantly gives me the macros. It helps me stay mindful of what I’m eating without any extra effort!',
	},
	{
		id: 3,
		name: 'Nagesh',
		age: 48,
		location: 'Chennai',
		image: 'https://i.ibb.co/YTtsqPJ1/IMG-7217.jpg',
		rating: 5,
		achievement: 'HbA1c improved from 8.5% to 7.1%',
		testimony:
			'With me being Diabetic, my Wife used to struggle with my meal planning, but Tap Health’s custom meal plans make it so simple for her! It suggests meals that fit my diet and taste. We both are happy now.',
	},
	{
		id: 4,
		name: 'Urmila',
		age: 39,
		location: 'Pune',
		image: 'https://i.ibb.co/WNfDCYbg/IMG-7215.jpg',
		rating: 5,
		achievement: 'Weekly average glucose readings decreased by 15%',
		testimony:
			'Tracking my sugar levels used to be a hassle, but now I just scan my glucose readings, and Tap Health logs them automatically. So easy and convenient.',
	},
	{
		id: 5,
		name: 'Thomas',
		age: 47,
		location: 'Kochi',
		image: 'https://i.ibb.co/MyYbRSDG/IMG-7216.jpg',
		rating: 5,
		achievement: 'Dropped daily rapid-acting insulin by 10 units',
		testimony:
			'I thought only expensive programs could help with diabetes, but Tap Health is affordable and just as effective! It’s like having a personal diabetes coach in my pocket.',
	},
	{
		id: 7,
		name: 'Manoj',
		age: 50,
		location: 'Ranchi',
		image: 'https://i.ibb.co/h1fQ3692/Manjeet.jpg',
		rating: 5,
		achievement:
			'Increased pain-free walking duration by 20 minutes and better sugar control',
		testimony:
			"I have a back problem and I am Diabetic. Finding the right workout for me was confusing, but Tap Health gives me a plan based on my fitness level. It’s like having a personal trainer! I'm now able to walk for 20 minutes without pain, which I couldn't do before.",
	},
	{
		id: 8,
		name: 'Divya',
		age: 45,
		location: 'Surat',
		image: 'https://i.ibb.co/9f0zRm0/IMG-3139-Original.jpg',
		rating: 5,
		achievement: 'Reduced HbA1c from 9.7 to 7.6',
		testimony:
			'I was sceptical about AI, but this app is a game changer! It understands my needs and gives suggestions that work. Diabetes management has never been this simple.',
	},
	{
		id: 9,
		name: 'Anil',
		age: 45,
		location: 'Gurgaon',
		image: 'https://i.ibb.co/N2yxgShd/IMG-8075.jpg',
		rating: 5,
		achievement:
			'Anxiety related to diabetes management has gone down significantly',
		testimony:
			'Tap Health gives me instant answers, easing my diabetes anxiety and improving my blood pressure—no more constant calls to the doctor!',
	},
	{
		id: 10,
		name: 'Pravjot',
		age: 37,
		location: 'Patiala',
		image: 'https://i.ibb.co/7xW3tnHy/IMG-8076.jpg',
		rating: 5,
		achievement: 'Waist circumference reduced by 5 cm in 2 months',
		testimony:
			'Every time I eat something, I just take a photo, and Tap Health tells me the meal score along with Macros. This feature has completely changed how I manage my diet!',
	},
	{
		id: 11,
		name: 'Saket',
		age: 41,
		location: 'Kolkata',
		image: 'https://i.ibb.co/Y4Cz0Qgq/IMG-8074.jpg',
		rating: 5,
		achievement: 'HbA1C reduced from 11.2 to 7.1',
		testimony:
			'When I started, my HbA1c was 11.2. With Tap Health’s personalized guidance and constant support, it’s now down to 7.1. I feel more energetic and in control of my health than ever before!',
	},
];
