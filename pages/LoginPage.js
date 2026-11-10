import { BasePage } from './BasePage.js';

export class LoginPage extends BasePage {
  // Selectors for Rahul Shetty Academy (Updated)
  emailInput = '#userEmail';
  passwordInput = '#userPassword';
  loginButton = '#login';
  errorMessage = '[style*="red"]';
  pageHeading = 'h1';

  constructor(page) {
    super(page);
    this.pageURL = '#/auth/login';
  }

  async goto() {
    await super.goto(this.pageURL);
    this.logger.info('Navigated to Login Page');
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(1000);
  }

  async enterEmail(email) {
    this.logger.step(1, `Entering email: ${email}`);
    await this.fillInput(this.emailInput, email);
  }

  async enterPassword(password) {
    this.logger.step(2, `Entering password`);
    await this.fillInput(this.passwordInput, password);
  }

  async clickLoginButton() {
    this.logger.step(3, `Clicking login button`);
    await this.click(this.loginButton);
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(2000);
  }

  async login(email, password) {
    await this.goto();
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLoginButton();
    this.logger.info('Login process completed');
  }

  async getErrorMessage() {
    try {
      return await this.getText(this.errorMessage);
    } catch {
      return null;
    }
  }

  async isErrorMessageDisplayed() {
    try {
      return await this.isElementVisible(this.errorMessage);
    } catch {
      return false;
    }
  }

  async isLoginPageVisible() {
    return this.isElementVisible(this.emailInput);
  }

  async isLoginButtonEnabled() {
    const button = this.page.locator(this.loginButton);
    return button.isEnabled();
  }
}
