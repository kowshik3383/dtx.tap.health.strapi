'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { components } from '@/types/strapi';
import DiabetesAssistant from '../DiabetesAssistant';

const meta: Meta<typeof DiabetesAssistant> = {
  title: 'Cards/DiabetesAssistant',
  component: DiabetesAssistant,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## 🤖 DiabetesAssistant Card

The **DiabetesAssistant** component presents a chatbot-style interaction between a user and a virtual assistant that provides personalized guidance for managing diabetes.

This component is used in digital health platforms to:
- Provide real-time reassurance
- Simulate expert-like responses
- Make interactions feel personal and trustworthy

It features a dual-message layout: a **user message bubble** followed by an **assistant reply bubble**.

---

## 🛠️ Props from Strapi

| Prop                | Type             | Description                                              |
|---------------------|------------------|----------------------------------------------------------|
| \`title\`            | \`string\`         | Section headline                                          |
| \`description\`      | \`string\`         | Optional subheading below the title                      |
| \`icon.url\`         | \`string (URL)\`   | Icon representing the assistant (usually an SVG)         |
| \`userMessage\`      | \`string\`         | Message sent by the user                                 |
| \`assistantMessage\` | \`string\`         | Assistant's reply to the user                            |

---

## ✅ Edge Cases Covered in This Storybook

This Storybook showcases all real-world scenarios your component may encounter:

1. **Default:** Ideal state with valid data  
2. **Long User Message:** Handles lengthy or multi-line user inputs  
3. **Long Assistant Message:** Assistant delivers a detailed response  
4. **Missing User Message:** Only assistant message shown  
5. **Missing Assistant Message:** Only user message shown  
6. **No Title & Description:** Header removed to test minimal mode  
7. **Broken Icon URL:** Validates image error fallback  
8. **Emoji Support:** Emoji rendering in chat bubbles  
9. **Multiline Assistant Message:** Breaks content into multiple paragraphs  

---

## ✍️ How to Edit in Strapi

1. Go to **Content Manager → Components → Assistant Component**
2. Fill the following fields:
   - **Title** → e.g., \`Your 24/7 Diabetes Assistant\`
   - **Description** → Short supportive tagline
   - **Icon** → Upload assistant avatar (SVG preferred)
   - **User Message** → Simulated patient question
   - **Assistant Message** → Reply from the assistant

---

✅ Keep replies friendly, empathetic, and helpful  
✅ Use short sentences with optional emoji  
✅ Avoid technical terms that may confuse patients  
✅ Preview on mobile to ensure responsive layout
        `,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof DiabetesAssistant>;

const baseData: components['schemas']['ItemsAssistantComponent'] = {
  title: 'Your 24/7 Diabetes Assistant',
  description: 'Expert advice whenever you need it',
  icon: {
    url: 'https://storage.googleapis.com/tap-health-dev-strapi/diabetes_589e03ea50/diabetes_589e03ea50.svg',
    name: 'Assistant Icon',
    alternativeText: 'Assistant Icon',
  },
  userMessage: 'My sugar reading was 165 mg/dL after lunch... is that okay?',
  assistantMessage:
    "It's slightly higher than ideal. Try a 15-minute walk now—it can help bring it down.",
};

// 1️⃣ Default
export const Default: Story = {
  args: baseData,
};

// 2️⃣ Long User Message
export const LongUserMessage: Story = {
  args: {
    ...baseData,
    userMessage:
      'I’ve been eating normally, took my insulin as prescribed, and still my sugar shot up to 240 mg/dL post dinner. What could be going wrong?',
  },
};

// 3️⃣ Long Assistant Message
export const LongAssistantMessage: Story = {
  args: {
    ...baseData,
    assistantMessage:
      'It could be due to delayed carb absorption, stress, or inaccurate insulin dosage. Let’s review your food intake and activity for the day to narrow this down. Consider tracking this using your logbook.',
  },
};

// 4️⃣ Missing User Message
export const NoUserMessage: Story = {
  args: {
    ...baseData,
    userMessage: '',
  },
};

// 5️⃣ Missing Assistant Message
export const NoAssistantMessage: Story = {
  args: {
    ...baseData,
    assistantMessage: '',
  },
};


// 7️⃣ Broken Icon URL
export const BrokenIcon: Story = {
  args: {
    ...baseData,
    icon: {
      url: 'https://nonexistent.com/icon.svg',
      name: 'Broken Icon',
      alternativeText: 'Broken Icon',
    },
  },
};

// 8️⃣ Emoji Message
export const EmojiMessage: Story = {
  args: {
    ...baseData,
    userMessage: 'My reading is 180 😟',
    assistantMessage: 'Try taking a walk 🏃‍♀️ and drinking water 💧!',
  },
};

// 9️⃣ Multiline Assistant Message
export const MultiLineAssistant: Story = {
  args: {
    ...baseData,
    assistantMessage: `It’s a bit high.\nTry a walk now.\nThen re-check your levels in 30 minutes. Physical activity can help lower blood sugar, and it's important to stay hydrated.\n\nIf it continues to be high, consider adjusting your insulin or carbohydrate intake. Consult your logbook for details.\n\nRemember, managing diabetes is a balance of medication, diet, and exercise. You're doing great by staying proactive!`,
  },
};
