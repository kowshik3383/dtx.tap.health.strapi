# Handling Non-Standard Facebook Pixel Events

## Problem: Console Warnings

You may see warnings like this in your console:

```
[Meta Pixel] - You are sending a non-standard event 'dtx_paid_landing_page_page_open'.
The preferred way to send these events is using trackCustom.
See 'https://developers.facebook.com/docs/ads-for-websites/pixel-events/#events' for more information.
```

## Solution: Using trackCustom for Custom Events

Our updated analytics system now automatically uses:
- `fbq('track', 'EventName')` for standard Facebook events
- `fbq('trackCustom', 'EventName')` for non-standard events

## How It Works

The system determines if an event is standard in two ways:

1. Checking against the `FB_STANDARD_EVENTS` list in `analytics.ts`
2. Using the `isStandardFBEvent` flag in our event mappings

## Adding Custom Events

To add your own custom events:

1. Add the event to `eventMapper.ts`:

```typescript
export const EVENT_MAPPINGS = {
  // ...existing events
  
  MY_CUSTOM_EVENT: {
    default: 'My Custom Event',
    mixpanel: 'My Custom Event for Mixpanel',
    facebook: 'my_custom_event_name',
    isStandardFBEvent: false  // Important: Set to false for custom events
  }
};
```

2. Create a helper function in `fbEvents.ts`:

```typescript
export const trackMyCustomEvent = (data?: Record<string, any>): void => {
  trackEvent('My Custom Event', data, {
    providerSpecificNames: getProviderSpecificNames('MY_CUSTOM_EVENT')
  });
};
```

3. Use it in your components:

```typescript
import { trackMyCustomEvent } from '@/utils/fbEvents';

// In your component
trackMyCustomEvent({
  property1: 'value1',
  property2: 'value2'
});
```

## For the Specific Events Mentioned

We've already added helper functions for the non-standard events mentioned in your error messages:

```typescript
// Import the helper functions
import { trackPaidLandingPageOpen, trackPaidLandingPageRefresh } from '@/utils/fbEvents';

// Track paid landing page open
trackPaidLandingPageOpen({
  source: 'direct',
  referrer: document.referrer
});

// Track paid landing page refresh
trackPaidLandingPageRefresh({
  method: 'visibility_change'
});
```

These will automatically use `fbq('trackCustom', ...)` for Facebook Pixel tracking.

## Best Practices

1. **Use Standard Events When Possible**: Facebook's standard events are optimized for ad targeting
2. **Consistent Naming**: Use snake_case for custom Facebook events
3. **Document Event Parameters**: Keep a list of what parameters each event should include
4. **Check Events Manager**: Verify events in Meta Events Manager

See the full example in `src/examples/custom-facebook-events.tsx`
