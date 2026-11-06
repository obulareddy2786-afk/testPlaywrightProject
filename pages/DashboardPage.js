import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  // Selectors (Updated)
  dashboardIndicator = '.fa.fa-home';
  logoutButton = '.fa.fa-sign-out';
  productsLink = 'button[routerlink*="dashboard"]';
  cartLink = 'button[routerlink*="cart"]';
  ordersLink = 'button[routerlink*="myorders"]';
  confirmationMessage = '.ng-star-inserted';
  loadingSpinner = '.spinner';

  constructor(page) {
    super(page);
    this.pageURL = '/#/dashboard';
  }

  async goto() {
    await super.goto(this.pageURL);
    this.logger.info('Navigated to Dashboard Page');
    await this.page.waitForLoadState('networkidle');
  }

  async isDashboardLoaded() {
    try {
      await this.page.waitForSelector(this.dashboardIndicator, { timeout: 10000 });
      return this.isElementVisible(this.dashboardIndicator);
    } catch {
      return false;
    }
  }

  async navigateToProducts() {
    this.logger.info('Navigating to Products');
    await this.click(this.productsLink);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async navigateToCart() {
    this.logger.info('Navigating to Cart');
    await this.click(this.cartLink);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async navigateToOrders() {
    this.logger.info('Navigating to Orders');
    await this.click(this.ordersLink);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }

  async logout() {
    this.logger.info('Logging out');
    try {
      await this.click(this.logoutButton);
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);
    } catch (error) {
      this.logger.error(`Logout failed: ${error.message}`);
      throw error;
    }
  }

  async waitForLoadingComplete() {
    try {
      const spinner = this.page.locator(this.loadingSpinner);
      await spinner.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    } catch (error) {
      this.logger.warn('Loading spinner not found or already hidden');
    }
  }

  async getPageTitle() {
    return this.page.title();
  }

  async verifyUserIsLoggedIn() {
    return this.isDashboardLoaded();
  }
}
