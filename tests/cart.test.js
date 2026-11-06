import { test, expect } from '../utils/fixtures.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';

test.describe('Shopping Cart Tests', () => {
  test('TC_CART_001: Should add product to cart and verify', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();
    const firstProduct = productNames[0];

    // Act
    await productsPage.addProductToCart(firstProduct);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);

    // Assert
    const isInCart = await cartPage.verifyItemInCart(firstProduct);
    expect(isInCart).toBeTruthy();
  });

  test('TC_CART_002: Should display added products in cart', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.addProductToCart(productNames[1]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    const cartItemCount = await cartPage.getCartItemCount();

    // Assert
    expect(cartItemCount).toBe(2);
  });

  test('TC_CART_003: Should remove product from cart', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();
    const productToAdd = productNames[0];

    // Act
    await productsPage.addProductToCart(productToAdd);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.removeItemFromCart(productToAdd);

    // Assert
    const isInCart = await cartPage.verifyItemInCart(productToAdd);
    expect(isInCart).toBeFalsy();
  });

  test('TC_CART_004: Should remove all items from cart', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.addProductToCart(productNames[1]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    await cartPage.removeAllItemsFromCart();

    // Assert
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeTruthy();
  });

  test('TC_CART_005: Should get cart item names', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.addProductToCart(productNames[1]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    const cartItemNames = await cartPage.getCartItemNames();

    // Assert
    expect(cartItemNames.length).toBe(2);
    cartItemNames.forEach(name => {
      expect(name).toBeTruthy();
    });
  });

  test('TC_CART_006: Should verify cart total displays', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act
    await productsPage.addProductToCart(productNames[0]);
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);
    const total = await cartPage.getCartTotal();

    // Assert
    expect(total).toBeTruthy();
  });

  test('TC_CART_007: Should show checkout button when cart has items', async ({
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

    // Assert
    const isCheckoutVisible = await cartPage.isCheckoutButtonVisible();
    expect(isCheckoutVisible).toBeTruthy();
  });

  test('TC_CART_008: Should navigate to checkout from cart', async ({ authenticatedPage }) => {
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

  test('TC_CART_009: Should handle empty cart correctly', async ({ cartPage }) => {
    // Act
    await cartPage.goto();

    // Assert
    const isEmpty = await cartPage.isCartEmpty();
    expect(isEmpty).toBeTruthy();
  });

  test('TC_CART_010: Should verify multiple products in cart', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();
    const productsToAdd = productNames.slice(0, 3);

    // Act
    for (const product of productsToAdd) {
      await productsPage.addProductToCart(product);
    }
    await productsPage.navigateToCart();
    const cartPage = new CartPage(authenticatedPage);

    // Assert
    const cartItemCount = await cartPage.getCartItemCount();
    expect(cartItemCount).toBe(productsToAdd.length);
  });
});
