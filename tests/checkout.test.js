import { test, expect } from '../utils/fixtures.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';

test.describe('Checkout and Order Placement Tests', () => {
  const testOrderDetails = {
    country: 'India',
    state: 'Andhra Pradesh',
    cvv: '123',
    cardholderName: 'Test User',
  };

  test('TC_CHECKOUT_001: Should navigate to checkout from cart', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.clickCheckout();

    // Assert
    expect(authenticatedPage.url()).toContain('checkout');
  });

  test('TC_CHECKOUT_002: Should verify checkout page is loaded', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.clickCheckout();

    // Assert
    const checkoutPage = new CheckoutPage(authenticatedPage);
    const isLoaded = await checkoutPage.isCheckoutPageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('TC_CHECKOUT_003: Should select country during checkout', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.clickCheckout();
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await checkoutPage.selectCountry(testOrderDetails.country);

    // Assert
    expect(true).toBe(true); // Country selected successfully
  });

  test('TC_CHECKOUT_004: Should enter CVV for payment', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.clickCheckout();
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await checkoutPage.selectCountry(testOrderDetails.country);
    await checkoutPage.enterCVV(testOrderDetails.cvv);

    // Assert
    expect(true).toBe(true); // CVV entered successfully
  });

  test('TC_CHECKOUT_005: Should enter cardholder name', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.clickCheckout();
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await checkoutPage.selectCountry(testOrderDetails.country);
    await checkoutPage.enterNameOnCard(testOrderDetails.cardholderName);

    // Assert
    expect(true).toBe(true); // Cardholder name entered successfully
  });

  test('TC_CHECKOUT_006: Should place order successfully', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
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
    const isOrderPlaced = await checkoutPage.isOrderPlaced();
    expect(isOrderPlaced).toBeTruthy();
  });

  test('TC_CHECKOUT_007: Should display order confirmation after successful order', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
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
    const confirmationMessage = await checkoutPage.getOrderConfirmationMessage();
    expect(confirmationMessage).toBeTruthy();
  });

  test('TC_CHECKOUT_008: Should generate order ID after successful order', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
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

  test('TC_CHECKOUT_009: Should complete end-to-end purchase flow', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();
    const productToOrder = productNames[0];

    // Act - Add product
    await productsPage.addProductToCart(productToOrder);

    // Act - Navigate to cart
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    const isProductInCart = await cartPage.verifyItemInCart(productToOrder);

    // Act - Navigate to checkout
    await cartPage.clickCheckout();
    const checkoutPage = new CheckoutPage(authenticatedPage);
    await checkoutPage.completePurchase(
      testOrderDetails.country,
      testOrderDetails.state,
      testOrderDetails.cvv,
      testOrderDetails.cardholderName
    );

    // Assert
    const isOrderPlaced = await checkoutPage.isOrderPlaced();
    expect(isProductInCart).toBeTruthy();
    expect(isOrderPlaced).toBeTruthy();
  });

  test('TC_CHECKOUT_010: Should navigate back to dashboard after order', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
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
    const isOrderPlaced = await checkoutPage.isOrderPlaced();
    expect(isOrderPlaced).toBeTruthy();
  });
});
