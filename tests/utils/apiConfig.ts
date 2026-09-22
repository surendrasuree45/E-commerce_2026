import { getRequiredEnvironmentVariable } from './environment.js';

export const apiBaseUrl = getRequiredEnvironmentVariable('API_BASE_URL');

export const apiEndpoints = {
  login: `${apiBaseUrl}/auth/login`,
  products: `${apiBaseUrl}/product/get-all-products`,
  createOrder: `${apiBaseUrl}/order/create-order`,
  orderDetails: (orderId: string) =>
    `${apiBaseUrl}/order/get-orders-details?id=${orderId}`,
  updateOrder: (orderId: string) =>
    `${apiBaseUrl}/order/update-order/${orderId}`,
  deleteOrder: (orderId: string) =>
    `${apiBaseUrl}/order/delete-order/${orderId}`,
};
