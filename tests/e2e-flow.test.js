import { test, expect } from '../utils/fixtures.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { OrdersPage } from '../pages/OrdersPage.js';

test.describe('End-to-End User Flow Tests', () => {
  const validEmail = 'obulareddy2786@gmail.com';
  const validPassword = 'Nani$100623';
  const testOrderDetails = {
    country: 'India',
    state: 'Andhra Pradesh',
    cvv: '123',
    cardholderName: 'Test User',
  };

  test('TC_E2E_001: Complete user journey from login to order placement', async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);

    // Step 2: Verify dashboard loaded
    await page.waitForLoadState('networkidle');
    const dashboardPage = new DashboardPage(page);
    const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBeTruthy();

    // Step 3: Navigate to products
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();
    expect(productNames.length).toBeGreaterThan(0);

    // Step 4: Add product to cart
    const productToOrder = productNames[0];
    await productsPage.addProductToCart(productToOrder);

    // Step 5: Navigate to cart
    await productsPage.navigateToCart();
    const cartPage = new CartPage(page);
    const isProductInCart = await cartPage.verifyItemInCart(productToOrder);
    expect(isProductInCart).toBeTruthy();

    // Step 6: Navigate to checkout
    await cartPage.clickCheckout();
    const checkoutPage = new CheckoutPage(page);
    const isCheckoutLoaded = await checkoutPage.isCheckoutPageLoaded();
    expect(isCheckoutLoaded).toBeTruthy();

    // Step 7: Complete purchase
    await checkoutPage.completePurchase(
      testOrderDetails.country,
      testOrderDetails.state,
      testOrderDetails.cvv,
      testOrderDetails.cardholderName
    );

    // Step 8: Verify order placement
    const isOrderPlaced = await checkoutPage.isOrderPlaced();
    expect(isOrderPlaced).toBeTruthy();
  });

  test('TC_E2E_002: User login, browse products, and verify cart functionality', async ({
    page,
  }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);

    // Step 2: Navigate to products
    await page.waitForLoadState('networkidle');
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();

    // Step 3: Add multiple products
    const productNames = await productsPage.getAllProductNames();
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.addProductToCart(productNames[1]);

    // Step 4: Verify cart
    await productsPage.navigateToCart();
    const cartPage = new CartPage(page);
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(2);

    // Step 5: Remove one item
    await cartPage.removeItemFromCart(productNames[0]);
    const updatedCount = await cartPage.getCartItemCount();
    expect(updatedCount).toBe(1);
  });

  test('TC_E2E_003: User login, place multiple orders, and view order history', async ({
    page,
  }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);

    // Step 2: Get products
    await page.waitForLoadState('networkidle');
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Step 3: Place first order
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(page);
    await cartPage.clickCheckout();
    let checkoutPage = new CheckoutPage(page);
    await checkoutPage.completePurchase(
      testOrderDetails.country,
      testOrderDetails.state,
      testOrderDetails.cvv,
      testOrderDetails.cardholderName
    );
    const firstOrderId = await checkoutPage.getOrderId();
    expect(firstOrderId).toBeTruthy();

    // Step 4: Place second order
    await page.goto(`${process.env.BASE_URL || 'https://rahulshettyacademy.com/client'}/#/dashboard`);
    await page.waitForLoadState('networkidle');
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    await productsPage.addProductToCart(productNames[1]);
    await productsPage.navigateToCart();
    await cartPage.clickCheckout();
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.completePurchase(
      testOrderDetails.country,
      testOrderDetails.state,
      testOrderDetails.cvv,
      testOrderDetails.cardholderName
    );
    const secondOrderId = await checkoutPage.getOrderId();
    expect(secondOrderId).toBeTruthy();

    // Step 5: Verify orders in history
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToOrders();
    const ordersPage = new OrdersPage(page);
    const hasOrders = await ordersPage.hasOrders();
    expect(hasOrders).toBeTruthy();
  });

  test('TC_E2E_004: Login, add products, clear cart, and verify empty cart', async ({
    page,
  }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);

    // Step 2: Add products
    await page.waitForLoadState('networkidle');
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.addProductToCart(productNames[1]);
    await productsPage.addProductToCart(productNames[2]);

    // Step 3: Verify cart has 3 items
    await productsPage.navigateToCart();
    const cartPage = new CartPage(page);
    let cartCount = await cartPage.getCartItemCount();
    expect(cartCount).toBe(3);

    // Step 4: Clear cart
    await cartPage.removeAllItemsFromCart();

    // Step 5: Verify empty cart
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeTruthy();
  });

  test('TC_E2E_005: Complete purchase and verify order confirmation', async ({ page }) => {
    // Step 1: Login and navigate to products
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);

    await page.waitForLoadState('networkidle');
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Step 2: Add product and proceed to checkout
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(page);
    await cartPage.clickCheckout();

    // Step 3: Complete order
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.completePurchase(
      testOrderDetails.country,
      testOrderDetails.state,
      testOrderDetails.cvv,
      testOrderDetails.cardholderName
    );

    // Step 4: Verify confirmation message
    const isOrderPlaced = await checkoutPage.isOrderPlaced();
    const confirmationMessage = await checkoutPage.getOrderConfirmationMessage();
    expect(isOrderPlaced).toBeTruthy();
  });

  test('TC_E2E_006: Logout after successful login', async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);

    // Step 2: Verify logged in
    await page.waitForLoadState('networkidle');
    const dashboardPage = new DashboardPage(page);
    const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBeTruthy();

    // Step 3: Logout
    await dashboardPage.logout();

    // Step 4: Verify on login page
    await page.waitForLoadState('networkidle');
    const newLoginPage = new LoginPage(page);
    const isLoginVisible = await newLoginPage.isLoginPageVisible();
    expect(isLoginVisible).toBeTruthy();
  });

  test('TC_E2E_007: Add product to cart, continue shopping, add more products', async ({
    page,
  }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);

    // Step 2: Add first product
    await page.waitForLoadState('networkidle');
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();
    await productsPage.addProductToCart(productNames[0]);

    // Step 3: Continue shopping
    await productsPage.navigateToCart();
    const cartPage = new CartPage(page);
    const initialCount = await cartPage.getCartItemCount();
    expect(initialCount).toBe(1);

    // Step 4: Add more products
    await cartPage.continueShopping();
    await productsPage.waitForProductsLoaded();
    await productsPage.addProductToCart(productNames[1]);
    await productsPage.addProductToCart(productNames[2]);

    // Step 5: Verify updated cart
    await productsPage.navigateToCart();
    const finalCount = await cartPage.getCartItemCount();
    expect(finalCount).toBe(3);
  });

  test('TC_E2E_008: View all products and verify display', async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);

    // Step 2: Navigate to products
    await page.waitForLoadState('networkidle');
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();

    // Step 3: Verify products count
    const productCount = await productsPage.getProductCount();
    const productNames = await productsPage.getAllProductNames();
    expect(productCount).toBe(productNames.length);
    expect(productCount).toBeGreaterThan(0);

    // Step 4: Verify each product has add to cart button
    const addToCartCount = await productsPage.getAddToCartButtonCount();
    expect(addToCartCount).toBe(productCount);
  });

  test('TC_E2E_009: Purchase product and verify in order history', async ({ page }) => {
    // Step 1: Complete login and purchase flow
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);

    await page.waitForLoadState('networkidle');
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    await productsPage.addProductToCart(productNames[0]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(page);
    await cartPage.clickCheckout();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.completePurchase(
      testOrderDetails.country,
      testOrderDetails.state,
      testOrderDetails.cvv,
      testOrderDetails.cardholderName
    );

    // Step 2: Navigate to orders
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.navigateToOrders();
    const ordersPage = new OrdersPage(page);

    // Step 3: Verify order exists
    const hasOrders = await ordersPage.hasOrders();
    expect(hasOrders).toBeTruthy();
  });

  test('TC_E2E_010: Full user session from login to logout with purchase', async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(validEmail, validPassword);
    await page.waitForLoadState('networkidle');

    // Step 2: Browse and purchase
    const productsPage = new ProductsPage(page);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();
    await productsPage.addProductToCart(productNames[0]);

    // Step 3: Complete checkout
    await productsPage.navigateToCart();
    const cartPage = new CartPage(page);
    await cartPage.clickCheckout();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.completePurchase(
      testOrderDetails.country,
      testOrderDetails.state,
      testOrderDetails.cvv,
      testOrderDetails.cardholderName
    );
    expect(await checkoutPage.isOrderPlaced()).toBeTruthy();

    // Step 4: Logout
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.logout();
    await page.waitForLoadState('networkidle');

    // Step 5: Verify logged out
    const verifyLoginPage = new LoginPage(page);
    const isLoginVisible = await verifyLoginPage.isLoginPageVisible();
    expect(isLoginVisible).toBeTruthy();
  });
});
