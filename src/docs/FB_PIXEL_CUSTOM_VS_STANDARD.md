# Facebook Pixel Standard vs. Custom Events

## Why This Matters

When tracking events with Facebook Pixel, there are two methods:

1. `fbq('track', 'EventName', data)` - For standard events
2. `fbq('trackCustom', 'EventName', data)` - For custom (non-standard) events

Using the wrong method for non-standard events generates console warnings:

```
[Meta Pixel] - You are sending a non-standard event 'dtx_paid_landing_page_page_open'. 
The preferred way to send these events is using trackCustom.
```

## Standard Facebook Pixel Events

Our system automatically uses the correct method based on whether the event is standard or custom.
Here is the complete list of standard events recognized by Facebook Pixel:

| Event Name | Description |
|------------|-------------|
| `PageView` | When a user views a page |
| `ViewContent` | When a user views content (product, article) |
| `Search` | When a search is performed |
| `AddToCart` | When a product is added to shopping cart |
| `AddToWishlist` | When a product is added to wishlist |
| `InitiateCheckout` | When a user starts checkout process |
| `AddPaymentInfo` | When payment information is added |
| `Purchase` | When a purchase is completed |
| `Lead` | When a lead is generated |
| `CompleteRegistration` | When a registration form is completed |
| `Contact` | When a user initiates contact |
| `Subscribe` | When a subscription is completed |
| `CustomizeProduct` | When a product is customized |
| `Donate` | When a donation is made |
| `FindLocation` | When a user searches for a location |
| `Schedule` | When an appointment is scheduled |
| `StartTrial` | When a trial begins |
| `SubmitApplication` | When an application is submitted |

## Custom Events (Use trackCustom)

All other events not in the list above should use `trackCustom`. Our enhanced analytics system now handles this automatically.

Examples of custom events in your application:

```typescript
// These will use trackCustom automatically
trackEvent('dtx_paid_landing_page_page_open', data);
trackEvent('dtx_paid_landing_page_page_refresh', data);
trackEvent('UserCompletedAssessment', data);
```

## Best Practices

1. **Use Standard Events When Possible**: Facebook's standard events are optimized for ad targeting and reporting
2. **Be Consistent With Naming**: Use a naming convention for custom events
3. **Add Event Parameters**: Include relevant parameters with your events for better analysis
4. **Verify in Events Manager**: Check Facebook Events Manager to ensure events are received correctly
