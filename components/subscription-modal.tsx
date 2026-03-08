'use client';

import { useState, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js';
import { Language, t } from '@/lib/translations';
import { getProductsByInterval, formatPrice, Product } from '@/lib/products';
import { startCheckoutSession } from '@/app/actions/stripe';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface SubscriptionModalProps {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

function PlanCard({ 
  product, 
  lang, 
  interval,
  onSelect 
}: { 
  product: Product; 
  lang: Language; 
  interval: 'month' | 'year';
  onSelect: (productId: string) => void;
}) {
  const planKey = product.name.toLowerCase().replace(' ', '') as 'starter' | 'professional' | 'enterprise';
  const nameKey = `${planKey === 'professional' ? 'pro' : planKey}Plan` as const;
  const descKey = `${planKey === 'professional' ? 'pro' : planKey}Desc` as const;

  return (
    <div className={`relative glass-card rounded-2xl p-6 ${product.popular ? 'neon-border scale-105' : 'border border-border'}`}>
      {product.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
          {t('popular', lang)}
        </div>
      )}
      
      <h3 className="text-xl font-bold text-foreground mb-1">{t(nameKey, lang)}</h3>
      <p className="text-sm text-muted-foreground mb-4">{t(descKey, lang)}</p>
      
      <div className="mb-6">
        <span className="text-4xl font-bold gradient-text">
          {formatPrice(product.priceInCents, interval)}
        </span>
        <span className="text-muted-foreground">
          {interval === 'month' ? t('perMonth', lang) : t('perYear', lang)}
        </span>
      </div>

      <ul className="space-y-3 mb-6">
        {product.features.map((featureKey, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <svg className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-foreground">{t(featureKey, lang)}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={() => onSelect(product.id)}
        className={`w-full py-3 rounded-xl font-semibold transition-all ${
          product.popular 
            ? 'bg-primary text-primary-foreground hover:scale-105' 
            : 'bg-secondary text-secondary-foreground hover:bg-primary/20'
        }`}
      >
        {t('subscribe', lang)}
      </button>
    </div>
  );
}

export function SubscriptionModal({ lang, isOpen, onClose }: SubscriptionModalProps) {
  const [interval, setInterval] = useState<'month' | 'year'>('month');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const products = getProductsByInterval(interval);

  const fetchClientSecret = useCallback(() => {
    if (!selectedProductId) return Promise.resolve(null);
    return startCheckoutSession(selectedProductId);
  }, [selectedProductId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-5xl w-full glass-card rounded-3xl neon-border p-8 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full glass-card flex items-center justify-center hover:scale-110 transition-transform"
        >
          <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {selectedProductId ? (
          // Checkout View
          <div>
            <button
              onClick={() => setSelectedProductId(null)}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to plans
            </button>
            
            <div className="rounded-2xl overflow-hidden bg-white">
              <EmbeddedCheckoutProvider
                stripe={stripePromise}
                options={{ fetchClientSecret }}
              >
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          </div>
        ) : (
          // Plans View
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-2">{t('choosePlan', lang)}</h2>
              <p className="text-muted-foreground">{t('subscription', lang)}</p>
            </div>

            {/* Interval Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={() => setInterval('month')}
                className={`px-6 py-2 rounded-xl font-medium transition-all ${
                  interval === 'month' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/20'
                }`}
              >
                {t('monthly', lang)}
              </button>
              <button
                onClick={() => setInterval('year')}
                className={`px-6 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
                  interval === 'year' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground hover:bg-primary/20'
                }`}
              >
                {t('annual', lang)}
                <span className="px-2 py-0.5 rounded-full bg-chart-4 text-primary-foreground text-xs">
                  {t('savePercent', lang)}
                </span>
              </button>
            </div>

            {/* Plans Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {products.map((product) => (
                <PlanCard
                  key={product.id}
                  product={product}
                  lang={lang}
                  interval={interval}
                  onSelect={setSelectedProductId}
                />
              ))}
            </div>

            {/* Company Attribution */}
            <div className="mt-8 text-center text-xs text-muted-foreground">
              <p>Secure payments powered by Stripe</p>
              <p className="mt-1">Flores Landscape & Design LLC | Phoenix, Arizona</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
