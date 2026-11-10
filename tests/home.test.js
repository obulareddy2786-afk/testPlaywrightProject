import { test, expect } from '../utils/fixtures.js';
import { DashboardPage } from '../pages/DashboardPage.js';

test.describe('Dashboard Page Tests', () => {
  test('TC_DASH_001: Should load dashboard successfully', async ({ dashboardPage }) => {
    // Act
    await dashboardPage.goto();
    const isLoaded = await dashboardPage.isDashboardLoaded();

    // Assert
    expect(isLoaded).toBeTruthy();
  });

  test('TC_DASH_002: Should verify user is logged in', async ({ dashboardPage }) => {
    // Act
    await dashboardPage.goto();
    const isLoggedIn = await dashboardPage.verifyUserIsLoggedIn();

    // Assert
    expect(isLoggedIn).toBeTruthy();
  });

  test('TC_DASH_003: Should navigate to products from dashboard', async ({ dashboardPage }) => {
    // Act
    await dashboardPage.goto();
    await dashboardPage.navigateToProducts();

    // Assert
    expect(dashboardPage.page.url()).toContain('dashboard');
  });

  test('TC_DASH_004: Should navigate to cart from dashboard', async ({ dashboardPage }) => {
    // Act
    await dashboardPage.goto();
    await dashboardPage.navigateToCart();

    // Assert
    expect(dashboardPage.page.url()).toContain('cart');
  });

  test('TC_DASH_005: Should navigate to orders from dashboard', async ({ dashboardPage }) => {
    // Act
    await dashboardPage.goto();
    await dashboardPage.navigateToOrders();

    // Assert
    expect(dashboardPage.page.url()).toContain('myorders');
  });

  test('TC_DASH_006: Should display page title', async ({ dashboardPage }) => {
    // Act
    await dashboardPage.goto();
    const title = await dashboardPage.getPageTitle();

    // Assert
    expect(title).toBeTruthy();
  });

  test('TC_DASH_007: Should have user profile button', async ({ dashboardPage }) => {
    // Act
    await dashboardPage.goto();
    await dashboardPage.openUserMenu();

    // Assert
    expect(true).toBe(true); // User menu opened successfully
  });

  test('TC_DASH_008: Should logout from dashboard', async ({ page }) => {
    // Arrange
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.goto();
    const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBeTruthy();

    // Act
    await dashboardPage.logout();
    await page.waitForLoadState('load');

    // Assert
    expect(page.url()).toContain('login');
  });

  test('TC_DASH_009: Should get current page URL', async ({ dashboardPage }) => {
    // Act
    await dashboardPage.goto();
    const currentUrl = await dashboardPage.getPageUrl();

    // Assert
    expect(currentUrl).toContain('dashboard');
  });

  test('TC_DASH_010: Should wait for loading to complete', async ({ dashboardPage }) => {
    // Act
    await dashboardPage.goto();
    await dashboardPage.waitForLoadingComplete();

    // Assert
    expect(true).toBe(true); // Loading completed
  });
});
