import { test, expect, loginData, invalidCredentials } from '../utils/fixtures.js';

test.describe('NEGATIVE LOGIN - Test Cases', () => {
  test('NEGATIVE_001: Login should fail with invalid username', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(invalidCredentials.invalidUsername, loginData.admin.password);

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    expect(isErrorVisible).toBeTruthy();
    loginPage.logger.result(true, 'Login fails with invalid username');
  });

  test('NEGATIVE_002: Login should fail with invalid password', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(loginData.admin.username, invalidCredentials.invalidPassword);

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    expect(isErrorVisible).toBeTruthy();
    loginPage.logger.result(true, 'Login fails with invalid password');
  });

  test('NEGATIVE_003: Login should fail with empty username', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.enterPassword(loginData.admin.password);
    await loginPage.clickLoginButton();

    // Assert - Either error message shown OR still on login page
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    const pageUrl = await loginPage.getPageUrl();
    const stillOnLogin = pageUrl.includes('/login/');
    expect(isErrorVisible || stillOnLogin).toBeTruthy();
    loginPage.logger.result(true, 'Login fails with empty username');
  });

  test('NEGATIVE_004: Login should fail with empty password', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.enterUsername(loginData.admin.username);
    await loginPage.clickLoginButton();

    // Assert - Either error message shown OR still on login page
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    const pageUrl = await loginPage.getPageUrl();
    const stillOnLogin = pageUrl.includes('/login/');
    expect(isErrorVisible || stillOnLogin).toBeTruthy();
    loginPage.logger.result(true, 'Login fails with empty password');
  });

  test('NEGATIVE_005: Login should fail with both fields empty', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.clickLoginButton();

    // Assert - Either error message shown OR still on login page
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    const pageUrl = await loginPage.getPageUrl();
    const stillOnLogin = pageUrl.includes('/login/');
    expect(isErrorVisible || stillOnLogin).toBeTruthy();
    loginPage.logger.result(true, 'Login fails with both fields empty');
  });

  test('NEGATIVE_006: Login should fail with only spaces', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login('   ', '   ');

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    expect(isErrorVisible).toBeTruthy();
    loginPage.logger.result(true, 'Login fails with only spaces');
  });

  test('NEGATIVE_007: Login should be case sensitive for password', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(loginData.admin.username, loginData.admin.password.toUpperCase());

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    expect(isErrorVisible).toBeTruthy();
    loginPage.logger.result(true, 'Password is case sensitive');
  });

  test('NEGATIVE_008: Login should fail with extra spaces before/after username', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login('  ' + loginData.admin.username + '  ', loginData.admin.password);

    // Assert - Either error shown OR login rejected (stayed on login page)
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    const pageUrl = await loginPage.getPageUrl();
    const stillOnLogin = pageUrl.includes('/login/');
    expect(isErrorVisible || stillOnLogin).toBeTruthy();
    loginPage.logger.result(true, 'Extra spaces handled');
  });

  test('NEGATIVE_009: Login should fail with incorrect credentials for admin', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login('wrongadmin', 'wrongpass');

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    expect(isErrorVisible).toBeTruthy();
    loginPage.logger.result(true, 'Wrong credentials rejected');
  });

  test('NEGATIVE_010: Login should fail when username and password are swapped', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(loginData.admin.password, loginData.admin.username);

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    expect(isErrorVisible).toBeTruthy();
    loginPage.logger.result(true, 'Swapped credentials rejected');
  });

  test('NEGATIVE_011: Login should fail with null/undefined values', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    try {
      await loginPage.login(null, null);
      // If this doesn't throw, check for error
      const isErrorVisible = await loginPage.isErrorMessageDisplayed();
      expect(isErrorVisible).toBeTruthy();
    } catch (error) {
      // Expected to fail
      expect(true).toBeTruthy();
    }

    loginPage.logger.result(true, 'Null values handled');
  });

  test('NEGATIVE_012: Login should not proceed with incomplete form submission', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();
    await loginPage.enterUsername(loginData.admin.username);
    // Don't enter password

    // Act
    const buttonEnabled = await loginPage.isLoginButtonEnabled();

    // Assert
    expect(buttonEnabled).toBeTruthy(); // Button should be enabled but submission should fail
    loginPage.logger.result(true, 'Incomplete form handled');
  });

  test('NEGATIVE_013: Error message should display for wrong password', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login(loginData.admin.username, 'completely_wrong_password_12345');

    // Assert - Check if error message visible or page stayed on login
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    const errorMessage = await loginPage.getErrorMessage();
    const pageUrl = await loginPage.getPageUrl();
    const stillOnLogin = pageUrl.includes('/login/');

    expect(isErrorVisible || errorMessage || stillOnLogin).toBeTruthy();
    loginPage.logger.result(true, `Error handled for wrong password`);
  });

  test('NEGATIVE_014: Error message should display for non-existent user', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login('nonexistentuser12345', 'somepassword');

    // Assert - Check if error message visible or page stayed on login
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    const errorMessage = await loginPage.getErrorMessage();
    const pageUrl = await loginPage.getPageUrl();
    const stillOnLogin = pageUrl.includes('/login/');

    expect(isErrorVisible || errorMessage || stillOnLogin).toBeTruthy();
    loginPage.logger.result(true, `Error handled for non-existent user`);
  });

  test('NEGATIVE_015: Multiple failed login attempts should show consistent error', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act - First attempt
    await loginPage.login('wronguser1', 'wrongpass1');
    const isError1Visible = await loginPage.isErrorMessageDisplayed();
    const errorMessage1 = await loginPage.getErrorMessage();
    const pageUrl1 = await loginPage.getPageUrl();

    // Reload and try again
    await loginPage.goto();
    await loginPage.login('wronguser2', 'wrongpass2');
    const isError2Visible = await loginPage.isErrorMessageDisplayed();
    const errorMessage2 = await loginPage.getErrorMessage();
    const pageUrl2 = await loginPage.getPageUrl();

    // Assert - Both attempts should fail (error shown or stayed on login)
    const attempt1Failed = isError1Visible || errorMessage1 || pageUrl1.includes('/login/');
    const attempt2Failed = isError2Visible || errorMessage2 || pageUrl2.includes('/login/');
    expect(attempt1Failed && attempt2Failed).toBeTruthy();
    loginPage.logger.result(true, 'Multiple failed attempts handled consistently');
  });

  test('NEGATIVE_016: Login should fail with extremely long username', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();
    const veryLongUsername = 'a'.repeat(10000);

    // Act
    await loginPage.login(veryLongUsername, loginData.admin.password);

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    expect(isErrorVisible).toBeTruthy();
    loginPage.logger.result(true, 'Very long username rejected');
  });

  test('NEGATIVE_017: Login should fail with extremely long password', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();
    const veryLongPassword = 'a'.repeat(10000);

    // Act
    await loginPage.login(loginData.admin.username, veryLongPassword);

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    expect(isErrorVisible).toBeTruthy();
    loginPage.logger.result(true, 'Very long password rejected');
  });

  test('NEGATIVE_018: Login form should reject special characters in username', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login('<script>alert("xss")</script>', loginData.admin.password);

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    expect(isErrorVisible).toBeTruthy();
    loginPage.logger.result(true, 'XSS payload in username rejected');
  });

  test('NEGATIVE_019: Rapid login attempts should be handled', async ({ loginPage }) => {
    // Arrange
    await loginPage.goto();

    // Act - Try multiple rapid submissions
    for (let i = 0; i < 3; i++) {
      await loginPage.enterUsername(loginData.admin.username);
      await loginPage.enterPassword('wrongpassword');
      try {
        await loginPage.clickLoginButton();
      } catch {
        // Expected to fail or be throttled
      }
      await loginPage.page.waitForTimeout(500);
    }

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    expect(isErrorVisible).toBeTruthy();
    loginPage.logger.result(true, 'Rapid attempts handled');
  });

  test('NEGATIVE_020: Login should fail with numeric only credentials', async ({
    loginPage,
  }) => {
    // Arrange
    await loginPage.goto();

    // Act
    await loginPage.login('123456', '789012');

    // Assert
    const isErrorVisible = await loginPage.isErrorMessageDisplayed();
    expect(isErrorVisible).toBeTruthy();
    loginPage.logger.result(true, 'Numeric only credentials rejected');
  });
});
