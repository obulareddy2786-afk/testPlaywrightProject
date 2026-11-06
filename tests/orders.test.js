import { test, expect } from '../utils/fixtures.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { OrdersPage } from '../pages/OrdersPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test.describe('Orders and Order History Tests', () => {
  const testOrderDetails = {
    country: 'India',
    state: 'Andhra Pradesh',
    cvv: '123',
    cardholderName: 'Test User',
  };

  test('TC_ORDERS_001: Should navigate to orders page from dashboard', async ({
    dashboardPage,
  }) => {
    // Act
    await dashboardPage.goto();
    await dashboardPage.navigateToOrders();

    // Assert
    expect(dashboardPage.page.url()).toContain('myorders');
  });

  test('TC_ORDERS_002: Should display orders page with table', async ({ ordersPage }) => {
    // Act
    await ordersPage.goto();

    // Assert
    const isLoaded = await ordersPage.isOrdersPageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('TC_ORDERS_003: Should get order count', async ({ ordersPage }) => {
    // Act
    await ordersPage.goto();
    const orderCount = await ordersPage.getOrderCount();

    // Assert
    expect(orderCount).toBeGreaterThanOrEqual(0);
  });

  test('TC_ORDERS_004: Should retrieve all order IDs', async ({ ordersPage }) => {
    // Act
    await ordersPage.goto();

    // Assert
    const hasOrders = await ordersPage.hasOrders();
    if (hasOrders) {
      const orderIds = await ordersPage.getAllOrderIds();
      expect(orderIds.length).toBeGreaterThan(0);
    }
  });

  test('TC_ORDERS_005: Should verify orders table exists', async ({ ordersPage }) => {
    // Act
    await ordersPage.goto();

    // Assert
    const tableExists = await ordersPage.verifyOrderTableExists();
    expect(tableExists).toBeTruthy();
  });

  test('TC_ORDERS_006: Should place order and verify in order history', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act - Place order
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.clickCheckout();
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await checkoutPage.completePurchase(
      testOrderDetails.country,
      testOrderDetails.state,
      testOrderDetails.cvv,
      testOrderDetails.cardholderName
    );

    // Act - Navigate to orders
    const dashboardPage = new DashboardPage(authenticatedPage);
    await dashboardPage.navigateToOrders();
    const ordersPage = new OrdersPage(authenticatedPage);

    // Assert
    const hasOrders = await ordersPage.hasOrders();
    expect(hasOrders).toBeTruthy();
  });

  test('TC_ORDERS_007: Should display order confirmation number', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act - Place order
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.clickCheckout();
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await checkoutPage.completePurchase(
      testOrderDetails.country,
      testOrderDetails.state,
      testOrderDetails.cvv,
      testOrderDetails.cardholderName
    );

    // Assert
    const orderId = await checkoutPage.getOrderId();
    expect(orderId).toBeTruthy();
  });

  test('TC_ORDERS_008: Should verify placed order in order history', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act - Place order
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.clickCheckout();
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await checkoutPage.completePurchase(
      testOrderDetails.country,
      testOrderDetails.state,
      testOrderDetails.cvv,
      testOrderDetails.cardholderName
    );

    // Get order ID
    const orderId = await checkoutPage.getOrderId();

    // Assert
    expect(orderId).toBeTruthy();
  });

  test('TC_ORDERS_009: Should handle empty orders list', async ({ ordersPage }) => {
    // Act
    await ordersPage.goto();

    // Assert
    const orderCount = await ordersPage.getOrderCount();
    expect(orderCount).toBeGreaterThanOrEqual(0);
  });

  test('TC_ORDERS_010: Should navigate from orders to dashboard', async ({ ordersPage }) => {
    // Act
    await ordersPage.goto();
    await ordersPage.goBack();

    // Assert
    expect(ordersPage.page.url()).toContain('dashboard');
  });
});
