import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  // Selectors - UPDATED FOR PAARI WEBSITE
  usernameInput = '//input[@name="username"]';
  usernameInputAlt = 'input[name="username"]';
  usernameInputId = 'input[type="text"]';
  usernameInputClass = '.username-input';

  passwordInput = '//input[@name="password"]';
  passwordInputAlt = 'input[name="password"]';
  passwordInputId = 'input[type="password"]';
  passwordInputClass = '.password-input';

  loginButton = '//button[@type="submit"]';
  loginButtonText = 'button[type="submit"]';
  loginButtonId = '#login-btn';
  loginButtonClass = '.btn-login';

  errorMessage = '//div[contains(@class, "alert-danger")] | //div[contains(@class, "error")] | //span[contains(@class, "error")]';
  errorMessageAlt = '.alert-danger';
  errorText = '[role="alert"]';

  pageHeading = 'h1';
  loginForm = 'form';
  rememberMeCheckbox = 'input[type="checkbox"]';
  forgotPasswordLink = 'a[href*="forgot"]';

  // Additional selectors
  successMessage = '//div[contains(@class, "alert-success")] | //div[contains(@class, "success")]';
  warningMessage = '.warning';
  loadingSpinner = '.spinner';
  pageTitle = 'title';

  constructor(page) {
    super(page);
    this.pageURL = '/login/';
  }

  async goto() {
    await super.goto(this.pageURL);
    this.logger.info('Navigated to Login Page');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async enterUsername(username) {
    this.logger.step(1, `Entering username: ${username}`);
    try {
      await this.fillInput(this.usernameInput, username);
    } catch {
      try {
        await this.fillInput(this.usernameInputId, username);
      } catch {
        await this.fillInput(this.usernameInputClass, username);
      }
    }
  }

  async enterPassword(password) {
    this.logger.step(2, `Entering password`);
    try {
      await this.fillInput(this.passwordInput, password);
    } catch {
      try {
        await this.fillInput(this.passwordInputId, password);
      } catch {
        await this.fillInput(this.passwordInputClass, password);
      }
    }
  }

  async clickLoginButton() {
    this.logger.step(3, `Clicking login button`);
    try {
      await this.click(this.loginButton);
    } catch {
      try {
        await this.click(this.loginButtonId);
      } catch {
        await this.click(this.loginButtonClass);
      }
    }
    try {
      await this.page.waitForLoadState('networkidle', { timeout: 5000 });
    } catch {
      this.logger.warn('Network idle timeout - continuing');
    }
    await this.page.waitForTimeout(1000);
  }

  async login(username, password) {
    await this.goto();
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    this.logger.info('Login process completed');
  }

  async getErrorMessage() {
    try {
      return await this.getText(this.errorMessage);
    } catch {
      try {
        return await this.getText(this.errorMessageAlt);
      } catch {
        return null;
      }
    }
  }

  async isErrorMessageDisplayed() {
    try {
      const visible1 = await this.isElementVisible(this.errorMessage);
      if (visible1) return true;

      const visible2 = await this.isElementVisible(this.errorMessageAlt);
      if (visible2) return true;

      const visible3 = await this.isElementVisible(this.errorText);
      return visible3;
    } catch {
      return false;
    }
  }

  async isLoginPageVisible() {
    try {
      return await this.isElementVisible(this.usernameInput);
    } catch {
      try {
        return await this.isElementVisible(this.usernameInputId);
      } catch {
        return await this.isElementVisible(this.usernameInputClass);
      }
    }
  }

  async isLoginButtonEnabled() {
    try {
      return await this.isButtonEnabled(this.loginButton);
    } catch {
      try {
        return await this.isButtonEnabled(this.loginButtonId);
      } catch {
        return await this.isButtonEnabled(this.loginButtonClass);
      }
    }
  }

  async isSuccessMessageDisplayed() {
    try {
      return await this.isElementVisible(this.successMessage);
    } catch {
      return false;
    }
  }

  async getSuccessMessage() {
    try {
      return await this.getText(this.successMessage);
    } catch {
      return null;
    }
  }

  async clearUsername() {
    try {
      await this.clearInput(this.usernameInput);
    } catch {
      try {
        await this.clearInput(this.usernameInputId);
      } catch {
        await this.clearInput(this.usernameInputClass);
      }
    }
  }

  async clearPassword() {
    try {
      await this.clearInput(this.passwordInput);
    } catch {
      try {
        await this.clearInput(this.passwordInputId);
      } catch {
        await this.clearInput(this.passwordInputClass);
      }
    }
  }

  async getPageHeading() {
    return this.getText(this.pageHeading);
  }

  async waitForLoginFormToLoad(timeout = 10000) {
    try {
      await this.page.waitForSelector(this.usernameInput, { timeout });
      return true;
    } catch {
      return false;
    }
  }

  async isRememberMeCheckboxPresent() {
    try {
      return await this.isElementVisible(this.rememberMeCheckbox);
    } catch {
      return false;
    }
  }

  async clickRememberMe() {
    try {
      await this.click(this.rememberMeCheckbox);
      this.logger.info('Clicked remember me checkbox');
    } catch {
      this.logger.warn('Remember me checkbox not found');
    }
  }

  async isForgotPasswordLinkPresent() {
    try {
      return await this.isElementVisible(this.forgotPasswordLink);
    } catch {
      return false;
    }
  }

  async clickForgotPassword() {
    try {
      await this.click(this.forgotPasswordLink);
      this.logger.info('Clicked forgot password link');
    } catch {
      this.logger.warn('Forgot password link not found');
    }
  }

  async getUsernameValue() {
    try {
      return await this.getInputValue(this.usernameInput);
    } catch {
      try {
        return await this.getInputValue(this.usernameInputId);
      } catch {
        return await this.getInputValue(this.usernameInputClass);
      }
    }
  }

  async getPasswordValue() {
    try {
      return await this.getInputValue(this.passwordInput);
    } catch {
      try {
        return await this.getInputValue(this.passwordInputId);
      } catch {
        return await this.getInputValue(this.passwordInputClass);
      }
    }
  }

  async fillUsernameAndPassword(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
  }

  async pressEnterOnLoginForm() {
    this.logger.info('Pressing Enter key to submit login form');
    await this.pressKey('Enter');
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(2000);
  }

  async takLoginPageScreenshot() {
    await this.takeScreenshot('login-page');
  }
}
