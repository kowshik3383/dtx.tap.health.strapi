# Using Provider-Specific Event Names

This document provides examples of using the enhanced analytics system with provider-specific event names.

## Different Event Names for Different Analytics Providers

Our analytics system now supports specifying different event names for different providers. This is useful when providers have different naming conventions:

```typescript
// Example: Page view tracking with different naming conventions
trackEvent('Page View', pageViewProps, {
  providerSpecificNames: {
    mixpanel: 'Page View',  // Mixpanel uses spaces in event names
    facebook: 'PageView'    // Facebook uses CamelCase without spaces
  }
});

// Example: Checkout event
trackEvent('Start Checkout', checkoutData, {
  providerSpecificNames: {
    mixpanel: 'Checkout Started',
    facebook: 'InitiateCheckout'  // FB has specific standard event names
  }
});

// Example: Purchase event
trackEvent('Purchase Completed', purchaseData, {
  providerSpecificNames: {
    mixpanel: 'Purchase Completed',
    facebook: 'Purchase'  // FB standard event name
  }
});
```

## Sending Events to Specific Providers Only

You can also target specific providers:

```typescript
// Mixpanel-specific tracking
trackEvent('User Segmentation Update', userData, {
  providers: ['mixpanel']  // Only send to Mixpanel
});

// Facebook Pixel-specific tracking
trackEvent('ViewContent', productData, {
  providers: ['facebook']  // Only send to Facebook Pixel
});
```

## Using Both Features Together

You can combine provider filtering with provider-specific names:

```typescript
// Target specific providers with specific event names
trackEvent('Cart Updated', cartData, {
  providers: ['mixpanel', 'facebook'],
  providerSpecificNames: {
    mixpanel: 'Cart Items Updated',
    facebook: 'AddToCart'
  }
});
```

## Facebook Pixel Standard Events Reference

When using provider-specific names for Facebook Pixel, consider using their standard event names:

- `PageView` - When a page is viewed
- `ViewContent` - When a product or content is viewed
- `Search` - When a search is performed
- `AddToCart` - When a product is added to the shopping cart
- `AddToWishlist` - When a product is added to a wishlist
- `InitiateCheckout` - When a checkout is started
- `AddPaymentInfo` - When payment information is added
- `Purchase` - When a purchase is made
- `Lead` - When a lead is captured
- `CompleteRegistration` - When a registration is completed

Full reference: https://developers.facebook.com/docs/meta-pixel/reference
