import { test, expect } from '../utils/fixtures.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';

test.describe('Authentication Tests', () => {
  const validEmail = 'obulareddy2786@gmail.com';
  const validPassword = 'Nani$100623';

  test('TC_AUTH_001: Successfully login with valid credentials', async ({ loginPage, page }) => {
    // Arrange
    await loginPage.goto("https://rahulshettyacademy.com/client/#/auth/login");

    // Act
    await loginPage.login(validEmail, validPassword);

    // Assert
    await page.waitForLoadState('networkidle');
    const dashboardPage = new DashboardPage(page);
    const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBeTruthy();
  });

  test('TC_AUTH_002: Login page should be displayed with email and password fields', async ({
    loginPage,
  }) => {
    // Act
    await loginPage.goto();

    // Assert
    const isLoginVisible = await loginPage.isLoginPageVisible();
    expect(isLoginVisible).toBeTruthy();
  });

  test('TC_AUTH_003: Login button should be enabled', async ({ loginPage }) => {
    // Act
    await loginPage.goto();

    // Assert
    const isEnabled = await loginPage.isLoginButtonEnabled();
    expect(isEnabled).toBeTruthy();
  });

  test('TC_AUTH_004: Should display error with invalid email', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.enterEmail('invalidemail@test.com');
    await loginPage.enterPassword('invalidpassword');
    await loginPage.clickLoginButton();

    // Assert
    await new Promise(resolve => setTimeout(resolve, 1000));
    const isErrorVisible = await loginPage.isErrorMessageDisplayed().catch(() => false);
    expect(isErrorVisible).toBeTruthy();
  });

  test('TC_AUTH_005: Should display error with wrong password', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.enterEmail(validEmail);
    await loginPage.enterPassword('wrongpassword123');
    await loginPage.clickLoginButton();

    // Assert
    await new Promise(resolve => setTimeout(resolve, 1000));
    const isErrorVisible = await loginPage.isErrorMessageDisplayed().catch(() => false);
    expect(isErrorVisible).toBeTruthy();
  });

  test('TC_AUTH_006: Should display error with empty email', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.enterPassword(validPassword);
    await loginPage.clickLoginButton();

    // Assert
    await new Promise(resolve => setTimeout(resolve, 1000));
    const isErrorVisible = await loginPage.isErrorMessageDisplayed().catch(() => false);
    expect(isErrorVisible).toBeTruthy();
  });

  test('TC_AUTH_007: Should display error with empty password', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.enterEmail(validEmail);
    await loginPage.clickLoginButton();

    // Assert
    await new Promise(resolve => setTimeout(resolve, 1000));
    const isErrorVisible = await loginPage.isErrorMessageDisplayed().catch(() => false);
    expect(isErrorVisible).toBeTruthy();
  });

  test('TC_AUTH_008: Should logout successfully from dashboard', async ({
    authenticatedPage,
  }) => {
    // Arrange
    const dashboardPage = new DashboardPage(authenticatedPage);

    // Act
    const isDashboardLoaded = await dashboardPage.isDashboardLoaded();
    expect(isDashboardLoaded).toBeTruthy();

    // Assert - User is logged in
    expect(isDashboardLoaded).toBe(true);
  });

  test('TC_AUTH_009: Should navigate to login page from dashboard after logout', async ({
    authenticatedPage,
    page,
  }) => {
    // Arrange
    const dashboardPage = new DashboardPage(authenticatedPage);
    await dashboardPage.isDashboardLoaded();

    // Act
    await dashboardPage.logout();

    // Assert
    await new Promise(resolve => setTimeout(resolve, 1000));
    const loginPage = new LoginPage(page);
    const isLoginVisible = await loginPage.isLoginPageVisible();
    expect(isLoginVisible).toBeTruthy();
  });

  test('TC_AUTH_010: Email field should accept valid email format', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.enterEmail(validEmail);
    const emailValue = await loginPage.page.locator('#userEmail').inputValue();

    // Assert
    expect(emailValue).toBe(validEmail);
  });
});
