# Analytics Event Mapper

## Overview

The Event Mapper provides a centralized way to define and map standard event names to provider-specific event names. This ensures consistency in event tracking across different analytics providers.

## Benefits

- **Consistency**: Standardize event naming across your application
- **Maintainability**: Change provider-specific event names in one place
- **Readability**: Make analytics code more understandable with standardized event constants
- **Type Safety**: Get TypeScript support for event names

## How to Use

### Basic Usage

```typescript
import { trackEvent } from '@/utils/analytics';
import { getProviderSpecificNames } from '@/utils/eventMapper';

// Track a page view with proper provider-specific names
trackEvent('Page viewed', pageData, {
  providerSpecificNames: getProviderSpecificNames('PAGE_VIEW')
  // This automatically maps to:
  // - "Page View" for Mixpanel
  // - "PageView" for Facebook Pixel
});
```

### Available Standard Events

The Event Mapper includes these standard events with proper mappings:

| Standard Event | Mixpanel Name | Facebook Pixel Name |
|----------------|---------------|---------------------|
| PAGE_VIEW | Page View | PageView |
| USER_SIGNUP | User Signup | CompleteRegistration |
| USER_LOGIN | User Login | Login |
| VIEW_PRODUCT | Product Viewed | ViewContent |
| ADD_TO_CART | Product Added to Cart | AddToCart |
| CHECKOUT_START | Checkout Started | InitiateCheckout |
| PURCHASE | Purchase Completed | Purchase |
| PLAN_PURCHASE_CLICK | Plan Purchase Click | InitiateCheckout |
| SEARCH | Search Performed | Search |
| CONTACT | Contact Request | Contact |
| LEAD | Lead Generated | Lead |

### Adding New Standard Events

To add new standard events to the mapper, edit the `EVENT_MAPPINGS` object in `src/utils/eventMapper.ts`:

```typescript
export const EVENT_MAPPINGS = {
  // ... existing mappings
  
  // Add your new standard event
  MY_NEW_EVENT: {
    default: 'My New Event',
    mixpanel: 'My New Event for Mixpanel',
    facebook: 'MyNewEventForFacebook'
  }
};
```

### Using with Non-Standard Events

For one-off events not worth adding to the standard mappings:

```typescript
trackEvent('Custom event', eventData, {
  providerSpecificNames: {
    mixpanel: 'Custom Event for Mixpanel',
    facebook: 'CustomEventForFacebook'
  }
});
```

## Best Practices

1. **Use Constants**: Always use the defined constant names from the Event Mapper
2. **Add Common Events**: If you track an event in multiple places, add it to the mapper
3. **Be Specific**: Use clear, descriptive names that distinguish different user actions
4. **Follow Conventions**: Follow each provider's naming conventions in your mappings
