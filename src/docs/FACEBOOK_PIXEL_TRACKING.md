# Facebook Pixel Event Tracking Guide

## Overview

This guide explains how to track events with Facebook Pixel in your application. The implementation automatically tracks all events with both Mixpanel and Facebook Pixel, and supports provider-specific event names.

## UPDATED MAY 2025: Non-Standard Events Use trackCustom

Facebook recommends using `trackCustom` for non-standard events. Our analytics system now automatically:
- Uses `fbq('track', ...)` for standard events like PageView, Purchase, etc.
- Uses `fbq('trackCustom', ...)` for all non-standard events

This eliminates the warnings in the console about non-standard events.

## Available Functions

### 1. Unified Event Tracking with Provider-Specific Names

```typescript
import { trackEvent } from '@/utils/analytics';

// Track any event with different names for different providers
trackEvent('Default Event Name', properties, {
  providerSpecificNames: {
    mixpanel: 'Mixpanel Specific Name',  
    facebook: 'FacebookSpecificName'    
  }
});
```

### 2. Facebook Pixel Specific Events (through fbEvents.ts)

```typescript
import { trackPlanPurchaseClick, trackPurchaseComplete } from '@/utils/fbEvents';

// Track a plan purchase click
trackPlanPurchaseClick(
  'premium-plan-123',  // planId
  999,                 // price
  12,                  // duration in months
  true,                // isPromotional
  'SUMMER2025'         // promotionalCode
);

// Track a purchase completion
trackPurchaseComplete(
  planData,            // Plan data object
  999,                 // Amount
  'INR'                // Currency (default is 'INR')
);
```

### 3. Custom Facebook Pixel Events

```typescript
import { trackFacebookPixelEvent } from '@/utils/analytics';

// Track a standard Facebook Pixel event
trackFacebookPixelEvent('Purchase', {
  value: 99.99,
  currency: 'INR'
});

// Track a custom (non-standard) Facebook Pixel event
// This will automatically use trackCustom
trackFacebookPixelEvent('UserCompletedAssessment', {
  assessmentId: 'diabetes-risk',
  score: 85
});
```

## Implementation Examples

### Example 1: Track a button click to purchase a plan

```tsx
import { trackPlanPurchaseClick } from '@/utils/fbEvents';

function PlanCard({ plan }) {
  const handlePurchaseClick = () => {
    trackPlanPurchaseClick(
      plan.id,
      plan.price,
      plan.duration,
      !!plan.promotionalCode,
      plan.promotionalCode
    );
    
    // Continue with purchase flow...
  };

  return (
    <button onClick={handlePurchaseClick}>
      Purchase Plan
    </button>
  );
}
```

### Example 2: Track a successful purchase

```tsx
import { trackPurchaseComplete } from '@/utils/fbEvents';

function ConfirmationPage({ data }) {
  useEffect(() => {
    // Track purchase on confirmation page load
    if (data?.data?.plan && data?.data?.paymentHistory?.[0]) {
      trackPurchaseComplete(
        data.data.plan,
        data.data.paymentHistory[0].amount
      );
    }
  }, [data]);

  return (
    // Your confirmation page UI
  );
}
```

## Facebook Pixel Standard Events

Facebook Pixel supports several standard events that you might want to use:

- `PageView`: Already implemented in AnalyticsProvider
- `Purchase`: Implemented in trackPurchaseComplete
- `AddToCart`: Consider adding for shopping cart functionality
- `InitiateCheckout`: Consider adding for checkout flow
- `Subscribe`: Consider adding for subscription events
- `Contact`: For when users contact support
- `Lead`: For capturing lead information

For a complete list of standard events, see Facebook's documentation: https://developers.facebook.com/docs/meta-pixel/reference
