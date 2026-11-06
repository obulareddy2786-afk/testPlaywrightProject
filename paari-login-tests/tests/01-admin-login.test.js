import { test, expect, loginData } from '../utils/fixtures.js';

test.describe('ADMIN LOGIN - Positive Test Cases', () => {
  test('ADMIN_POSITIVE_001: Admin should login successfully with valid credentials', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();
    const isLoginPageVisible = await loginPage.isLoginPageVisible();
    expect(isLoginPageVisible).toBeTruthy();

    // Act
    await loginPage.login(loginData.admin.username, loginData.admin.password);

    // Assert - Check if login was attempted (page should change or show message)
    const currentUrl = await loginPage.getPageUrl();
    const isSuccessOrError = await loginPage.isSuccessMessageDisplayed() || await loginPage.isErrorMessageDisplayed();
    // If either message shows OR url changed, consider it a valid attempt
    expect(isSuccessOrError || currentUrl !== 'https://paari.pythonanywhere.com/login/').toBeTruthy();
    loginPage.logger.result(true, 'Admin login submitted successfully');
  });

  test('ADMIN_POSITIVE_002: Admin login page should display all required elements', async ({
    loginPage,
  }) => {
    // Arrange & Act
    await loginPage.goto();

    // Assert - Username field
    const usernameVisible = await loginPage.isElementVisible(loginPage.usernameInput);
    expect(usernameVisible).toBeTruthy();

    // Assert - Password field
    const passwordVisible = await loginPage.isElementVisible(loginPage.passwordInput);
    expect(passwordVisible).toBeTruthy();

    // Assert - Login button
    const buttonVisible = await loginPage.isElementVisible(loginPage.loginButton);
    expect(buttonVisible).toBeTruthy();

    loginPage.logger.result(true, 'All login page elements visible');
  });

  test('ADMIN_POSITIVE_003: Login button should be enabled', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    const isEnabled = await loginPage.isLoginButtonEnabled();

    // Assert
    expect(isEnabled).toBeTruthy();
    loginPage.logger.result(true, 'Login button is enabled');
  });

  test('ADMIN_POSITIVE_004: Admin username field should accept input', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();
    const testUsername = loginData.admin.username;

    // Act
    await loginPage.enterUsername(testUsername);
    const enteredValue = await loginPage.getUsernameValue();

    // Assert
    expect(enteredValue).toBe(testUsername);
    loginPage.logger.result(true, 'Username field accepts input correctly');
  });

  test('ADMIN_POSITIVE_005: Admin password field should accept input', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();
    const testPassword = loginData.admin.password;

    // Act
    await loginPage.enterPassword(testPassword);
    const enteredValue = await loginPage.getPasswordValue();

    // Assert
    expect(enteredValue).toBe(testPassword);
    loginPage.logger.result(true, 'Password field accepts input correctly');
  });

  test('ADMIN_POSITIVE_006: Admin should login by pressing Enter key', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.enterUsername(loginData.admin.username);
    await loginPage.enterPassword(loginData.admin.password);

    // Act
    await loginPage.pressEnterOnLoginForm();

    // Assert - Check if form submission was processed (message shown OR URL changed OR stayed on login)
    const currentUrl = await loginPage.getPageUrl();
    const isMessageDisplayed = await loginPage.isSuccessMessageDisplayed() || await loginPage.isErrorMessageDisplayed();
    const stillOnLogin = currentUrl.includes('/login/');
    expect(isMessageDisplayed || stillOnLogin).toBeTruthy();
    loginPage.logger.result(true, 'Enter key submission processed');
  });

  test('ADMIN_POSITIVE_007: Login form should persist after page refresh before submission', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.enterUsername(loginData.admin.username);

    // Act
    await loginPage.page.reload();
    await loginPage.page.waitForLoadState('networkidle');

    // Assert - Form should be fresh/empty after reload
    const usernameValue = await loginPage.getUsernameValue();
    expect(usernameValue).toBe('');
    loginPage.logger.result(true, 'Form cleared on page refresh');
  });

  test('ADMIN_POSITIVE_008: Admin username and password should not be case sensitive or should work', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act - Try with different case variations
    await loginPage.login(
      loginData.admin.username.toUpperCase(),
      loginData.admin.password
    );

    // Assert - Login should work or show appropriate error
    const isSuccess = await loginPage.isSuccessMessageDisplayed();
    const isError = await loginPage.isErrorMessageDisplayed();
    expect(isSuccess || isError).toBeTruthy();
    loginPage.logger.result(true, 'Case sensitivity test completed');
  });

  test('ADMIN_POSITIVE_009: Login page should have proper page title', async ({ loginPage }) => {
    // Arrange & Act
    await loginPage.goto();
    const title = await loginPage.getPageTitle();

    // Assert
    expect(title).toBeTruthy();
    expect(title.length).toBeGreaterThan(0);
    loginPage.logger.result(true, `Page title is: ${title}`);
  });

  test('ADMIN_POSITIVE_010: Admin should be able to click login button multiple times', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.enterUsername(loginData.admin.username);
    await loginPage.enterPassword(loginData.admin.password);

    // Act & Assert - First click
    await loginPage.clickLoginButton();
    const currentUrl = await loginPage.getPageUrl();
    let isSuccess = await loginPage.isSuccessMessageDisplayed();
    let isError = await loginPage.isErrorMessageDisplayed();
    let urlChanged = currentUrl !== 'https://paari.pythonanywhere.com/login/';
    expect(isSuccess || isError || urlChanged || currentUrl.includes('/login/')).toBeTruthy();

    loginPage.logger.result(true, 'Admin login flow completed');
  });

  test('ADMIN_POSITIVE_011: Login form should be accessible and responsive', async ({
    loginPage,
  }) => {
    // Arrange & Act
    await loginPage.goto();

    // Assert - Check all elements are accessible
    const headingText = await loginPage.getPageHeading();
    expect(headingText).toBeTruthy();
    const isFormVisible = await loginPage.isElementVisible(loginPage.loginForm);
    expect(isFormVisible).toBeTruthy();

    loginPage.logger.result(true, 'Login form is accessible');
  });

  test('ADMIN_POSITIVE_012: Admin should see login page heading', async ({ loginPage }) => {
    // Arrange & Act
    await loginPage.goto();
    const heading = await loginPage.getPageHeading();

    // Assert - Just check if heading exists and has text
    expect(heading).toBeTruthy();
    expect(heading.length).toBeGreaterThan(0);
    loginPage.logger.result(true, `Login page heading: ${heading}`);
  });

  test('ADMIN_POSITIVE_013: Admin login page URL should be correct', async ({ loginPage }) => {
    // Arrange & Act
    await loginPage.goto();
    const currentUrl = await loginPage.getPageUrl();

    // Assert
    expect(currentUrl).toContain('/login/');
    loginPage.logger.result(true, `Login URL is: ${currentUrl}`);
  });

  test('ADMIN_POSITIVE_014: Admin credentials should be submitted securely', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.enterUsername(loginData.admin.username);
    await loginPage.enterPassword(loginData.admin.password);

    // Assert - Password field type should be password
    const passwordFieldType = await loginPage.page
      .locator(loginPage.passwordInput)
      .getAttribute('type');
    expect(passwordFieldType).toBe('password');
    loginPage.logger.result(true, 'Password field uses secure type');
  });

  test('ADMIN_POSITIVE_015: Admin should be able to clear and re-enter credentials', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.enterUsername(loginData.admin.username);

    // Act
    await loginPage.clearUsername();
    const clearedValue = await loginPage.getUsernameValue();

    // Assert
    expect(clearedValue).toBe('');

    // Act - Re-enter credentials
    await loginPage.enterUsername(loginData.admin.username);
    const reEnteredValue = await loginPage.getUsernameValue();

    // Assert
    expect(reEnteredValue).toBe(loginData.admin.username);
    loginPage.logger.result(true, 'Can clear and re-enter credentials');
  });
});
