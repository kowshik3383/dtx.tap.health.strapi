export interface UserStory {
	id: number;
	name: string;
	reduction: string;
	reductionType: 'hba1c' | 'weight';
	stars: number;
	thumbnail: string;
	videoUrl: string;
	title: string;
}

export const userStories: UserStory[] = [
	{
		id: 3,
		name: 'Dr. Neemi Mulwani',
		title: 'MBBS. | Consultant Diabetologist',
		reduction: '2.7%',
		reductionType: 'hba1c',
		stars: 5,
		thumbnail: 'https://i.ibb.co/Cx9T59q/Neemi-Mulwani-20250510-114050.png',
		videoUrl:
			'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/neemi-testimonial/master.m3u8',
	},
	{
		id: 2,
		name: 'Dr. O.P. Tripathi',
		title: 'MBBS. | MD. Diabetologist',
		reduction: '13kg',
		reductionType: 'weight',
		stars: 5,
		thumbnail: 'https://i.ibb.co/0VVwPxtb/O-P-Tripathi-20250509-190938.png',
		videoUrl:
			'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/tripathi-testimonial/master.m3u8',
	},
	{
		id: 1,
		name: 'Dr. Suryamani Tripathi',
		title: 'MBBS. | MD. Diabetologist',
		reduction: '2.6%',
		reductionType: 'hba1c',
		stars: 5,
		thumbnail:
			'https://i.ibb.co/8RPvcLV/Suryamani-Tripathi-20250509-190507.png',
		videoUrl:
			'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/suryamani-testimonial/master.m3u8',
	},
	{
		id: 4,
		name: 'Dr. Himanshu Gupta',
		title: 'MBBS. | Consultant Physician',
		reduction: '2.9%',
		reductionType: 'hba1c',
		stars: 5,
		thumbnail:
			'https://i.ibb.co/NgBy5Bgn/Himanshu-Gupta-20250509-141645.png',
		videoUrl:
			'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/himanshu-testimonial/master.m3u8',
	},
];
