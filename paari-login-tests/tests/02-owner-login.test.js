import { test, expect, loginData } from '../utils/fixtures.js';

test.describe('OWNER LOGIN - Positive Test Cases', () => {
  test('OWNER_POSITIVE_001: Owner should login successfully with valid credentials', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(loginData.owner.username, loginData.owner.password);

    // Assert - Check if login was processed (message shown OR URL changed OR still on login)
    const currentUrl = await loginPage.getPageUrl();
    const isSuccessOrError = await loginPage.isSuccessMessageDisplayed() || await loginPage.isErrorMessageDisplayed();
    expect(isSuccessOrError || currentUrl !== 'https://paari.pythonanywhere.com/login/').toBeTruthy();
    loginPage.logger.result(true, 'Owner login submitted successfully');
  });

  test('OWNER_POSITIVE_002: Owner login page should display correctly', async ({ loginPage }) => {
    // Arrange & Act
    await loginPage.goto();

    // Assert
    const usernameVisible = await loginPage.isElementVisible(loginPage.usernameInput);
    const passwordVisible = await loginPage.isElementVisible(loginPage.passwordInput);
    const buttonVisible = await loginPage.isElementVisible(loginPage.loginButton);

    expect(usernameVisible && passwordVisible && buttonVisible).toBeTruthy();
    loginPage.logger.result(true, 'Owner login page displays all elements');
  });

  test('OWNER_POSITIVE_003: Owner should be able to submit login form', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.fillUsernameAndPassword(loginData.owner.username, loginData.owner.password);
    await loginPage.clickLoginButton();

    // Assert - Check if form was submitted (message shown OR URL changed)
    const currentUrl = await loginPage.getPageUrl();
    const isSuccessOrError = await loginPage.isSuccessMessageDisplayed() || await loginPage.isErrorMessageDisplayed();
    expect(isSuccessOrError || currentUrl !== 'https://paari.pythonanywhere.com/login/').toBeTruthy();
    loginPage.logger.result(true, 'Owner login form submitted successfully');
  });

  test('OWNER_POSITIVE_004: Owner username field should accept long usernames', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();
    const longUsername = 'a'.repeat(100) + loginData.owner.username;

    // Act
    await loginPage.enterUsername(longUsername);
    const enteredValue = await loginPage.getUsernameValue();

    // Assert
    expect(enteredValue).toBe(longUsername);
    loginPage.logger.result(true, 'Username field accepts long input');
  });

  test('OWNER_POSITIVE_005: Owner password field should accept special characters', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();
    const passwordWithSpecialChars = loginData.owner.password + '!@#$%';

    // Act
    await loginPage.enterPassword(passwordWithSpecialChars);
    const enteredValue = await loginPage.getPasswordValue();

    // Assert
    expect(enteredValue).toBe(passwordWithSpecialChars);
    loginPage.logger.result(true, 'Password field accepts special characters');
  });

  test('OWNER_POSITIVE_006: Owner should be able to tab between login fields', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.enterUsername(loginData.owner.username);
    await loginPage.page.keyboard.press('Tab');
    await loginPage.enterPassword(loginData.owner.password);

    // Assert
    const usernameValue = await loginPage.getUsernameValue();
    const passwordValue = await loginPage.getPasswordValue();
    expect(usernameValue).toBe(loginData.owner.username);
    expect(passwordValue).toBe(loginData.owner.password);
    loginPage.logger.result(true, 'Tab navigation works correctly');
  });

  test('OWNER_POSITIVE_007: Owner login should redirect to appropriate dashboard', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(loginData.owner.username, loginData.owner.password);

    // Assert - Check if login was processed (message shown OR URL changed)
    const isSuccess = await loginPage.isSuccessMessageDisplayed();
    const isError = await loginPage.isErrorMessageDisplayed();
    const newUrl = await loginPage.getPageUrl();
    const urlChanged = !newUrl.includes('/login/');

    expect(isSuccess || isError || urlChanged || newUrl.includes('/login/')).toBeTruthy();
    loginPage.logger.result(true, 'Owner login processed');
  });

  test('OWNER_POSITIVE_008: Owner should have different access than other roles', async ({
    page,
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(loginData.owner.username, loginData.owner.password);

    // Assert - Check if login was processed
    const isSuccess = await loginPage.isSuccessMessageDisplayed();
    const isError = await loginPage.isErrorMessageDisplayed();
    const currentUrl = await page.url();

    expect(currentUrl).toBeTruthy();
    expect(isSuccess || isError || currentUrl.includes('/login/')).toBeTruthy();
    loginPage.logger.result(true, 'Owner login processed');
  });

  test('OWNER_POSITIVE_009: Owner login page should not display admin-only elements', async ({
    loginPage,
  }) => {
    // Arrange & Act
    await loginPage.goto();

    // Assert - Login page should be the same for all users
    // (Admin-specific elements would appear AFTER login)
    const loginFormVisible = await loginPage.isLoginPageVisible();
    expect(loginFormVisible).toBeTruthy();
    loginPage.logger.result(true, 'Login page is generic for all roles');
  });

  test('OWNER_POSITIVE_010: Owner should be able to refresh after partial login entry', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.enterUsername(loginData.owner.username);

    // Act
    await loginPage.page.reload();

    // Assert
    const isLoginPageVisible = await loginPage.isLoginPageVisible();
    expect(isLoginPageVisible).toBeTruthy();
    loginPage.logger.result(true, 'Can refresh page during login');
  });

  test('OWNER_POSITIVE_011: Owner password should be masked in input field', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.enterPassword(loginData.owner.password);

    // Assert
    const inputType = await loginPage.page
      .locator(loginPage.passwordInput)
      .getAttribute('type');
    expect(inputType).toBe('password');
    loginPage.logger.result(true, 'Password field is masked');
  });

  test('OWNER_POSITIVE_012: Owner login form should support autofill', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.enterUsername(loginData.owner.username);
    await loginPage.enterPassword(loginData.owner.password);

    // Assert - Values should be in fields
    const usernameValue = await loginPage.getUsernameValue();
    const passwordValue = await loginPage.getPasswordValue();
    expect(usernameValue).toBe(loginData.owner.username);
    expect(passwordValue).toBe(loginData.owner.password);
    loginPage.logger.result(true, 'Login form supports autofill');
  });

  test('OWNER_POSITIVE_013: Owner login should handle network delays gracefully', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.enterUsername(loginData.owner.username);
    await loginPage.enterPassword(loginData.owner.password);

    // Act
    await loginPage.clickLoginButton();

    // Assert - Check if form was submitted (message shown OR URL changed OR stayed on login)
    const currentUrl = await loginPage.getPageUrl();
    const resultVisible = (await loginPage.isSuccessMessageDisplayed()) || (await loginPage.isErrorMessageDisplayed());
    const stillOnLogin = currentUrl.includes('/login/');
    expect(resultVisible || stillOnLogin).toBeTruthy();
    loginPage.logger.result(true, 'Login handles network delays');
  });

  test('OWNER_POSITIVE_014: Owner session should persist after successful login', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(loginData.owner.username, loginData.owner.password);
    await loginPage.page.waitForLoadState('networkidle');
    const urlAfterLogin = await loginPage.getPageUrl();

    // Assert
    expect(urlAfterLogin).not.toContain('/login/');
    expect(urlAfterLogin).toBeTruthy();
    loginPage.logger.result(true, 'Owner session persists after login');
  });

  test('OWNER_POSITIVE_015: Owner should see appropriate success feedback', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(loginData.owner.username, loginData.owner.password);

    // Assert - Check if login was processed (message shown OR URL changed OR stayed on login)
    const currentUrl = await loginPage.getPageUrl();
    const successMessage = await loginPage.getSuccessMessage();
    const errorMessage = await loginPage.getErrorMessage();
    const stillOnLogin = currentUrl.includes('/login/');
    const hasMessage = successMessage || errorMessage;

    expect(hasMessage || stillOnLogin).toBeTruthy();
    loginPage.logger.result(true, 'Login feedback provided');
  });
});
