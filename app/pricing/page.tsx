'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Header } from '@/components/Header';
import { getCurrentUser } from '@/lib/auth';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const user = await getCurrentUser();
      if (!user) {
        window.location.href = '/auth/signin';
        return;
      }

      // Call your API route to create a Checkout session
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: 'price_12345', // Replace with your Premium Plan Price ID
          userId: user.id,
        }),
      });

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      if (!stripe) throw new Error('Stripe failed to load');

      // Redirect to Stripe Checkout
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error initiating checkout:', error);
      alert('Failed to start subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Choose Your Plan</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-900">Free Plan</h2>
            <p className="text-gray-600 mt-2">Basic access to blog features</p>
            <p className="text-2xl font-bold text-gray-900 mt-4">$0/month</p>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600">Read public posts</li>
              <li className="text-gray-600">Limited post creation</li>
            </ul>
            <button
              className="mt-6 w-full bg-gray-300 text-gray-800 py-2 rounded-md"
              disabled
            >
              Current Plan
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-blue-500">
            <h2 className="text-xl font-semibold text-gray-900">Premium Plan</h2>
            <p className="text-gray-600 mt-2">Unlock exclusive features</p>
            <p className="text-2xl font-bold text-gray-900 mt-4">$15/month</p>
            <ul className="mt-4 space-y-2">
              <li className="text-gray-600">Unlimited post creation</li>
              <li className="text-gray-600">Access to premium content</li>
              <li className="text-gray-600">Priority support</li>
            </ul>
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? 'Processing...' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}