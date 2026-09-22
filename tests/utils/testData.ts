import {
  getOptionalEnvironmentVariable,
  getRequiredEnvironmentVariable,
} from './environment.js';

export const uiTestData = {
  products: {
    primary: 'Samsung galaxy s6',
    secondary: 'Sony vaio i5',
  },
  customer: {
    name: 'Surendra Test',
    country: 'India',
    city: 'Bangalore',
    card: '4111111111111111',
    month: '09',
    year: '2026',
  },
  categories: ['Phones', 'Laptops', 'Monitors'] as const,
};

const defaultApiEmail = 'rahulshettyacademy@gmail.com';
const defaultApiPassword = 'learning';

export const apiTestData = {
  credentials: {
    get email() {
      return (
        getOptionalEnvironmentVariable('RSA_API_EMAIL', defaultApiEmail) ??
        defaultApiEmail
      );
    },
    get password() {
      return (
        getOptionalEnvironmentVariable('RSA_API_PASSWORD', defaultApiPassword) ??
        defaultApiPassword
      );
    },
  },
  invalidPassword: 'invalid-password',
  invalidProductId: 'invalid-product-id',
  order: {
    country: 'India',
    updatedCountry: 'Canada',
  },
};
