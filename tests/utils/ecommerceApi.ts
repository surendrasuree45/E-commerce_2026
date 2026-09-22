import { APIRequestContext } from '@playwright/test';
import { apiEndpoints } from './apiConfig';
import { apiTestData } from './testData';

function authHeaders(token: string) {
  return { Authorization: token };
}

export function login(
  request: APIRequestContext,
  credentials = apiTestData.credentials,
) {
  return request.post(apiEndpoints.login, {
    data: { userEmail: credentials.email, userPassword: credentials.password },
  });
}

export function getProducts(request: APIRequestContext, token: string) {
  return request.post(apiEndpoints.products, {
    headers: authHeaders(token),
    data: {},
  });
}

export function createOrder(
  request: APIRequestContext,
  token: string,
  productId: string,
  country = apiTestData.order.country,
) {
  return request.post(apiEndpoints.createOrder, {
    headers: authHeaders(token),
    data: { orders: [{ country, productOrderedId: productId }] },
  });
}

export function getOrder(
  request: APIRequestContext,
  token: string,
  orderId: string,
) {
  return request.get(apiEndpoints.orderDetails(orderId), {
    headers: authHeaders(token),
  });
}

export function updateOrder(
  request: APIRequestContext,
  token: string,
  orderId: string,
  country = apiTestData.order.updatedCountry,
) {
  return request.put(apiEndpoints.updateOrder(orderId), {
    headers: authHeaders(token),
    data: { country },
  });
}

export function deleteOrder(
  request: APIRequestContext,
  token: string,
  orderId: string,
) {
  return request.delete(apiEndpoints.deleteOrder(orderId), {
    headers: authHeaders(token),
  });
}

export function createUnauthenticatedOrder(request: APIRequestContext) {
  return request.post(apiEndpoints.createOrder, {
    data: {
      orders: [
        {
          country: apiTestData.order.country,
          productOrderedId: apiTestData.invalidProductId,
        },
      ],
    },
  });
}

