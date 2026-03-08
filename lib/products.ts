export interface Product {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'starter-monthly',
    name: 'Starter',
    description: 'Perfect for getting started',
    priceInCents: 2900, // $29/month
    interval: 'month',
    features: [
      'starterFeature1',
      'starterFeature2',
      'starterFeature3',
    ],
  },
  {
    id: 'starter-annual',
    name: 'Starter',
    description: 'Perfect for getting started',
    priceInCents: 27800, // $278/year (save 20%)
    interval: 'year',
    features: [
      'starterFeature1',
      'starterFeature2',
      'starterFeature3',
    ],
  },
  {
    id: 'pro-monthly',
    name: 'Professional',
    description: 'For serious developers',
    priceInCents: 7900, // $79/month
    interval: 'month',
    popular: true,
    features: [
      'proFeature1',
      'proFeature2',
      'proFeature3',
      'proFeature4',
    ],
  },
  {
    id: 'pro-annual',
    name: 'Professional',
    description: 'For serious developers',
    priceInCents: 75800, // $758/year (save 20%)
    interval: 'year',
    popular: true,
    features: [
      'proFeature1',
      'proFeature2',
      'proFeature3',
      'proFeature4',
    ],
  },
  {
    id: 'enterprise-monthly',
    name: 'Enterprise',
    description: 'For teams and agencies',
    priceInCents: 19900, // $199/month
    interval: 'month',
    features: [
      'enterpriseFeature1',
      'enterpriseFeature2',
      'enterpriseFeature3',
      'enterpriseFeature4',
      'enterpriseFeature5',
    ],
  },
  {
    id: 'enterprise-annual',
    name: 'Enterprise',
    description: 'For teams and agencies',
    priceInCents: 191000, // $1910/year (save 20%)
    interval: 'year',
    features: [
      'enterpriseFeature1',
      'enterpriseFeature2',
      'enterpriseFeature3',
      'enterpriseFeature4',
      'enterpriseFeature5',
    ],
  },
];

export function getProductsByInterval(interval: 'month' | 'year') {
  return PRODUCTS.filter(p => p.interval === interval);
}

export function formatPrice(cents: number, interval: 'month' | 'year') {
  const dollars = cents / 100;
  return `$${dollars.toFixed(0)}`;
}
