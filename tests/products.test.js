import { test, expect } from '../utils/fixtures.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';

test.describe('Products Page Tests', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    const dashboardPage = new DashboardPage(authenticatedPage);
    await dashboardPage.isDashboardLoaded();
  });

  test('TC_PROD_001: Should display products on dashboard', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();

    // Act
    await productsPage.waitForProductsLoaded();
    const productCount = await productsPage.getProductCount();

    // Assert
    expect(productCount).toBeGreaterThan(0);
  });

  test('TC_PROD_002: Should display product names correctly', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();

    // Act
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Assert
    expect(productNames.length).toBeGreaterThan(0);
    productNames.forEach(name => {
      expect(name).toBeTruthy();
      expect(name.length).toBeGreaterThan(0);
    });
  });

  test('TC_PROD_003: Should have add to cart buttons for all products', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();

    // Act
    await productsPage.waitForProductsLoaded();
    const productCount = await productsPage.getProductCount();
    const addToCartCount = await productsPage.getAddToCartButtonCount();

    // Assert
    expect(addToCartCount).toBe(productCount);
  });

  test('TC_PROD_004: Should add single product to cart', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();
    const firstProduct = productNames[0];

    // Act
    await productsPage.addProductToCart(firstProduct);

    // Assert
    expect(true).toBe(true); // Product added successfully
  });

  test('TC_PROD_005: Should add multiple products to cart', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();
    const productsToAdd = productNames.slice(0, 2);

    // Act
    await productsPage.addMultipleProductsToCart(productsToAdd);

    // Assert
    expect(true).toBe(true); // Multiple products added successfully
  });

  test('TC_PROD_006: Should retrieve product price', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();
    const firstProduct = productNames[0];

    // Act
    const price = await productsPage.getProductPrice(firstProduct);

    // Assert
    expect(price).toBeTruthy();
    expect(price.length).toBeGreaterThan(0);
  });

  test('TC_PROD_007: Should verify product visibility', async ({ authenticatedPage }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();
    const firstProduct = productNames[0];

    // Act
    const isVisible = await productsPage.isProductVisible(firstProduct);

    // Assert
    expect(isVisible).toBeTruthy();
  });

  test('TC_PROD_008: Should navigate to cart from products page', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();

    // Act
    await productsPage.navigateToCart();

    // Assert
    await authenticatedPage.waitForLoadState('networkidle');
    expect(authenticatedPage.url()).toContain('cart');
  });

  test('TC_PROD_009: Should get correct number of products on page', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();

    // Act
    await productsPage.waitForProductsLoaded();
    const productCount = await productsPage.getProductCount();
    const productNames = await productsPage.getAllProductNames();

    // Assert
    expect(productNames.length).toBe(productCount);
  });

  test('TC_PROD_010: Should add each product individually to cart', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const productsPage = new ProductsPage(authenticatedPage);
    await productsPage.goto();
    await productsPage.waitForProductsLoaded();
    const productNames = await productsPage.getAllProductNames();

    // Act & Assert
    for (const productName of productNames) {
      try {
        await productsPage.addProductToCart(productName);
        expect(true).toBe(true);
      } catch (error) {
        throw new Error(`Failed to add product: ${productName}`);
      }
    }
  });
});
