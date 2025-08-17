export interface UserStory {
	id: number;
	name: string;
	reduction: string;
	reductionType: 'hba1c' | 'weight';
	stars: number;
	thumbnail: string;
	videoUrl: string;
}

export const userStories: UserStory[] = [
	{
		id: 3,
		name: 'Harmanpreet Singh',
		reduction: '2.7%',
		reductionType: 'hba1c',
		stars: 5,
		thumbnail: 'https://i.ibb.co/Gygbxts/Frame-7.png',
		videoUrl:
			'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/harmanpreet-testimonial/master.m3u8',
	},
	{
		id: 2,
		name: 'Sharawan Kumar',
		reduction: '13kg',
		reductionType: 'weight',
		stars: 5,
		thumbnail: 'https://i.ibb.co/cSCKWmmB/Frame-6.png',
		videoUrl:
			'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/ritesh-testimonial/master.m3u8',
	},
	{
		id: 1,
		name: 'Neena Prasad',
		reduction: '2.6%',
		reductionType: 'hba1c',
		stars: 5,
		thumbnail: 'https://i.ibb.co/ymk8VfjL/Frame-5.png',
		videoUrl:
			'https://storage.googleapis.com/dtx-assets-prod/marketing/videos/jyoti-testimonial/master.m3u8',
	},
];
