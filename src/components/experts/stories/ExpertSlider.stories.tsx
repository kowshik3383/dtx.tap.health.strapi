/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import ExpertSlider from '../Expert';

const meta: Meta<typeof ExpertSlider> = {
	title: 'Sections/ExpertSlider',
	component: ExpertSlider,
	parameters: {
		layout: 'fullscreen',
		docs: {
			description: {
				component: `
## 🧠 ExpertSlider Section

This component showcases a horizontal slider of medical experts, typically used on a landing page or health product site.

Each expert displays:
- 👤 Name
- 🎓 Credentials
- 🧪 Experience
- 💬 Motivational quote
- 🔗 Optional LinkedIn link
- 🖼️ Image

---

## ✍️ How to edit this component in Strapi

1. Go to **Content Manager > Pages**
2. Select a page (e.g., Homepage)
3. In the **Dynamic Zone**, locate the 'Expert Component'

### Component Fields
- \`title_line_1\`: Top headline
- \`title_line_2\`: Subheadline
- \`experts\`: Array of experts with:
  - name
  - credentials
  - experience
  - quote
  - image
  - LinkedIn URL (optional)

---

## ✅ Variants Covered
- Default with 3 experts
- Single expert
- No experts
- Very long names/credentials
- Missing image (fallback)
- Missing LinkedIn URL
- Responsive behavior (mobile, tablet, desktop)
`,
			},
		},
	},
	tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ExpertSlider>;

const baseExpert: components['schemas']['ItemsExpertsComponent'] = {
	id: 0,
	name: 'Dr. Jane Doe',
	credentials: 'MD - Internal Medicine',
	experience: '5 Years of Experience',
	quote: 'Health is not just the absence of disease.',
	image: {
		url: 'https://via.placeholder.com/300',
		alternativeText: 'Doctor',
	},
	linkedin_url: '',
};

// ✅ Default story (Docs will show this only)
export const Default: Story = {
	name: 'Default - 3 Experts',
	render: () => (
		<ExpertSlider
			title_line_1="Meet Our Medical"
			title_line_2="Experts"
			experts={[
				{
					...baseExpert,
					id: 1,
					name: 'Dr. Arjun Mehta',
					image: {
						url: 'https://storage.googleapis.com/tap-health-dev-strapi/thumbnail_person_1_9532720abf/thumbnail_person_1_9532720abf.png',
						alternativeText: 'Dr. Arjun',
					},
					credentials: 'MBBS, MD - Endocrinology',
					experience: '10+ Years of Experience',
					linkedin_url: 'https://linkedin.com/in/arjun-mehta',
					quote: 'Empowering patients through sustainable lifestyle changes.',
				},
				{
					...baseExpert,
					id: 2,
					name: 'Dr. Neha Kapoor',
					image: {
						url: 'https://storage.googleapis.com/tap-health-dev-strapi/thumbnail_person_3_0f425fd928/thumbnail_person_3_0f425fd928.png',
						alternativeText: 'Dr. Neha',
					},
					credentials: 'Certified Diabetologist',
					experience: '8 Years in Preventive Care',
					linkedin_url: 'https://linkedin.com/in/neha-kapoor',
					quote: 'Diabetes reversal starts with informed action.',
				},
				{
					...baseExpert,
					id: 3,
					name: 'Dr. Rajiv Sharma',
					image: {
						url: 'https://storage.googleapis.com/tap-health-dev-strapi/thumbnail_person_2_3383dd94dc/thumbnail_person_2_3383dd94dc.png',
						alternativeText: 'Dr. Rajiv',
					},
					credentials: 'Lifestyle Medicine Specialist',
					experience: '12 Years of Holistic Practice',
					quote: 'Your lifestyle is your strongest medicine.',
				},
			]}
		/>
	),
};

// 🔒 Hidden from Docs
export const SingleExpert: Story = {
	name: 'Single Expert_',
	parameters: { docs: { disable: true } },
	render: () => (
		<ExpertSlider
			title_line_1="Single Expert"
			title_line_2="Example"
			experts={[baseExpert]}
		/>
	),
};

export const NoExperts: Story = {
	name: 'No Experts Provided',
	parameters: { docs: { disable: true } },
	render: () => (
		<ExpertSlider
			title_line_1="No Experts Available"
			title_line_2=""
			experts={[]}
		/>
	),
};

export const LongNameExpert: Story = {
	name: 'Very Long Names and Credentials',
	parameters: { docs: { disable: true } },
	render: () => (
		<ExpertSlider
			title_line_1="Long Text Test"
			title_line_2="Overflow"
			experts={[
				{
					...baseExpert,
					name: 'Dr. Maria Elizabeth Catherine Johnson IV',
					credentials:
						'MPH, MBBS, PhD in Nutritional Epidemiology and Lifestyle Disorders',
				},
			]}
		/>
	),
};

export const NoImageExpert: Story = {
	name: 'Missing Image',
	parameters: { docs: { disable: true } },
	render: () => (
		<ExpertSlider
			title_line_1="Image Missing"
			title_line_2="Fallback Case"
			experts={[
				{
					...baseExpert,
					image: undefined as any, // triggers fallback logic
				},
			]}
		/>
	),
};

export const NoLinkedInExpert: Story = {
	name: 'No LinkedIn URL',
	parameters: { docs: { disable: true } },
	render: () => (
		<ExpertSlider
			title_line_1="No Social Profile"
			title_line_2="Test"
			experts={[
				{
					...baseExpert,
					linkedin_url: '',
				},
			]}
		/>
	),
};

export const MixedExperts: Story = {
	name: 'Mixed Validity',
	parameters: { docs: { disable: true } },
	render: () => (
		<ExpertSlider
			title_line_1="Mixed Experts"
			title_line_2="Valid + Broken"
			experts={[
				{
					...baseExpert,
					id: 10,
					name: 'Dr. Broken Image',
					image: { url: '', alternativeText: '' },
				},
				{
					...baseExpert,
					id: 11,
					name: 'Dr. Missing Link',
					linkedin_url: '',
				},
				{
					...baseExpert,
					id: 12,
					name: 'Dr. Overflow Name Example That Is Super Long',
					credentials:
						'MBBS, MD, PhD in Meta-Clinical Psychology and Quantum Biology',
				},
			]}
		/>
	),
};
