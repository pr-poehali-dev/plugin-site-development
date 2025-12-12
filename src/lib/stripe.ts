import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const getStripePublishableKey = async (): Promise<string> => {
  try {
    const response = await fetch('https://functions.poehali.dev/c57ea81e-068c-45b2-95ef-97a0d61bcc9d', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'get_publishable_key' })
    });
    const data = await response.json();
    if (data.success && data.publishable_key) {
      return data.publishable_key;
    }
  } catch (error) {
    console.error('Failed to fetch Stripe key:', error);
  }
  return import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
};

export const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = getStripePublishableKey().then(key => loadStripe(key));
  }
  return stripePromise;
};
