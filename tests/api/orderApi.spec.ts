import { expect, test } from '@playwright/test';
import { apiTestData } from '../utils/testData';
import {
  createOrder,
  createUnauthenticatedOrder,
  deleteOrder,
  getOrder,
  getProducts,
  login,
  updateOrder,
} from '../utils/ecommerceApi';

test.describe('E-Commerce API automation', () => {
  test('authenticates with valid credentials', async ({ request }) => {
    const response = await login(request);
    const authenticated = await response.json();

    expect(response.status()).toBe(200);
    expect(authenticated.token).toBeTruthy();
    expect(authenticated.userId).toBeTruthy();
  });

  test('rejects invalid credentials', async ({ request }) => {
    const response = await login(request, {
      ...apiTestData.credentials,
      password: apiTestData.invalidPassword,
    });

    expect(response.ok()).toBeFalsy();
    expect(response.status()).toBe(400);
  });

  test('chains authenticate, create, retrieve, update validation, and delete', async ({
    request,
  }) => {
    const loginResponse = await login(request);
    const loginData = await loginResponse.json();
    const token = loginData.token as string;

    const productsResponse = await getProducts(request, token);
    expect(productsResponse.status()).toBe(200);
    const products = await productsResponse.json();
    expect(products.data.length).toBeGreaterThan(0);

    const product = products.data[0];
    const createResponse = await createOrder(request, token, product._id);
    expect(createResponse.status()).toBe(201);
    const created = await createResponse.json();
    const orderId = created.orders[0] as string;
    expect(orderId).toBeTruthy();

    try {
      const retrieveResponse = await getOrder(request, token, orderId);
      expect(retrieveResponse.status()).toBe(200);
      const retrieved = await retrieveResponse.json();
      expect(retrieved.data).toMatchObject({
        _id: orderId,
        productOrderedId: product._id,
        productName: product.productName,
        country: apiTestData.order.country,
      });

      const updateResponse = await updateOrder(request, token, orderId);
      expect(updateResponse.status()).toBe(404);

      const unchangedResponse = await getOrder(request, token, orderId);
      expect(unchangedResponse.status()).toBe(200);
      expect((await unchangedResponse.json()).data.country).toBe(
        apiTestData.order.country,
      );
    } finally {
      const deleteResponse = await deleteOrder(request, token, orderId);
      expect(deleteResponse.status()).toBe(200);
    }

    const deletedResponse = await getOrder(request, token, orderId);
    expect(deletedResponse.ok()).toBeFalsy();
    expect([400, 404]).toContain(deletedResponse.status());
  });

  test('rejects an unauthenticated order creation request', async ({ request }) => {
    const response = await createUnauthenticatedOrder(request);

    expect(response.ok()).toBeFalsy();
    expect([401, 403]).toContain(response.status());
  });
});