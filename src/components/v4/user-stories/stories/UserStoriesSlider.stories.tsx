import type { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import UserStoriesSlider from '../UserStoriesSlider';

const mockStories: components['schemas']['DynamicZoneDoctorStoriesComponent']['stories'] = [
	{
		id: 1,
		name: 'Dr. Asha Menon',
		credentials: 'Endocrinologist',
		quote: 'Tap Health helped my patients manage diabetes better.',
		thumbnail: {
			url: '/assets/v4/user-stories/doctor1.jpg',
			alternativeText: 'Dr. Asha Menon',
		},
		video_url: 'https://www.w3schools.com/html/mov_bbb.mp4',
		
	},
	{
		id: 2,
		name: 'Dr. Rajeev Kumar',
		credentials: 'Diabetologist',
		quote: 'The app is easy to use and very effective.',
		thumbnail: {
			url: '/assets/v4/user-stories/doctor2.jpg',
			alternativeText: 'Dr. Rajeev Kumar',
		},
		video_url: '',
		video: {
			url: 'https://www.w3schools.com/html/movie.mp4',
			alternativeText: 'Doctor testimonial video',
		},
	},
	{
		id: 3,
		name: 'Dr. Priya Sharma',
		credentials: 'General Physician',
		quote: 'My patients love the reminders and meal suggestions.',
		thumbnail: {
			url: '/assets/v4/user-stories/doctor3.jpg',
			alternativeText: 'Dr. Priya Sharma',
		},
		video_url: '',
		
	},
];

const meta: Meta<typeof UserStoriesSlider> = {
	title: 'Sections/UserStoriesSlider',
	component: UserStoriesSlider,
	parameters: {
		docs: {
			description: {
				component: `
# UserStoriesSlider

A horizontally scrollable slider for doctor/user stories, supporting video modals.

## Props

| Prop                    | Type    | Description                                   |
|-------------------------|---------|-----------------------------------------------|
| \`title\`                  | string  | Subtitle above the main heading               |
| \`highlighted_title_line1\`| string  | Main heading/title line 1                     |
| \`highlighted_title_line2\`| string  | Main heading/title line 2                     |
| \`stories\`                | array   | Array of story objects (see below)            |

### Story object fields

- \`id\`: number
- \`name\`: string
- \`designation\`: string
- \`description\`: string
- \`image\`: { url: string, alternativeText?: string }
- \`video_url\`: string (optional)
- \`video\`: { url: string, alternativeText?: string } (optional)

## How to use

- Add or remove stories in the \`stories\` array.
- Each story can have either \`video_url\` or \`video.url\` (or both/none).
- Clicking the play button opens the video modal.

## Edge Cases

- No stories
- Stories with only images (no video)
- Stories with only video
- Stories with both video_url and video
- Long descriptions
- Missing images (should fallback gracefully)
        `,
			},
		},
	},
};
export default meta;

type Story = StoryObj<typeof UserStoriesSlider>;

export const Default: Story = {
	args: {
		title: 'Smart Technology',
		highlighted_title_line1: 'Trusted & Recommended',
		highlighted_title_line2: 'by Doctors',
		stories: mockStories,
	},
};

export const NoStories: Story = {
	args: {
		title: 'No Stories',
		highlighted_title_line1: 'Nothing to show',
		highlighted_title_line2: '',
		stories: [],
	},
};

export const OnlyImages: Story = {
	args: {
		title: 'Image Only',
		highlighted_title_line1: 'Doctors',
		highlighted_title_line2: 'No Videos',
		stories: mockStories.map((s) => ({ ...s, video_url: '', video: undefined })),
	},
};

export const OnlyVideos: Story = {
	args: {
		title: 'Video Only',
		highlighted_title_line1: 'Doctors',
		highlighted_title_line2: 'No Images',
		stories: mockStories.map((s, i) => ({
			...s,
			thumbnail: undefined,
			video_url: i % 2 === 0 ? s.video_url : '',
			video: i % 2 === 1 ? { url: 'https://www.w3schools.com/html/movie.mp4', alternativeText: 'Alt' } : undefined,
		})),
	},
};

export const LongDescriptions: Story = {
	args: {
		title: 'Long Descriptions',
		highlighted_title_line1: 'Doctors',
		highlighted_title_line2: 'With long testimonials',
		stories: mockStories.map((s) => ({
			...s,
			quote: (s.quote ?? '').repeat(5),
		})),
	},
};