import type { Meta, StoryObj } from '@storybook/react';
import Hero from '../Hero';

// --- Example mock data, modeled to match Strapi types ---
const mockHeroProps = {
  logo: { url: '/mock-logo.png' },
  partnerLogo: { url: '/mock-partner-logo.png', name: 'Partner Co.' },
  hero_image: { url: '/mock-hero-image.jpg' },
  tag_line: 'Making Health Easy',
  title_line_1: 'Your One-stop',
  title_line_2: 'Digital Health Partner',
};

// ----------- Storybook Metadata with Docs -----------

const meta: Meta<typeof Hero> = {
  title: 'Sections/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A visually dynamic "Hero" section with:
- Animated logos and text (framer-motion)
- Company and partner logos
- Responsive layout + headline + hero image
- Type-safe; accepts CMS (Strapi) data; easy to plug into any site.

All images and logos are locally mocked for Storybook; replace or upload images in \`/public\` in your Next.js app for best results.
        `
      }
    },
    nextjs: { appDirectory: true },
  },
  argTypes: {
    tag_line: { control: 'text', description: 'One-liner under the logos' },
    title_line_1: { control: 'text', description: 'First part of headline' },
    title_line_2: { control: 'text', description: 'Second part of headline' },
    logo: { control: false },
    partnerLogo: { control: false },
    hero_image: { control: false },
  },
};
export default meta;
type Story = StoryObj<typeof Hero>;

// ----------- Default Story: All Visuals -----------

export const Default: Story = {
  args: { ...mockHeroProps },
  parameters: {
    docs: {
      description: {
        story: 'Full Hero section, all visuals present.',
      }
    }
  }
};

// ----------- Missing Partner Logo -----------

export const NoPartnerLogo: Story = {
  args: {
    ...mockHeroProps,
    partnerLogo: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero section without a partner logo.',
      }
    }
  }
};

// ----------- No Hero Image -----------

export const NoHeroImage: Story = {
  args: {
    ...mockHeroProps,
    hero_image: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero section without a hero image.',
      }
    }
  }
};

// ----------- Logos Only -----------

export const LogosOnly: Story = {
  args: {
    ...mockHeroProps,
    tag_line: "",
    title_line_1: "",
    title_line_2: "",
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero with only the logos, no text or image.',
      }
    }
  }
};
