import { BasePage } from './BasePage.js';

export class CheckoutPage extends BasePage {
  // Selectors
  countryInput = 'input[formcontrolname="country"]';
  countryDropdown = 'ngx-dropdown-list[class*="shown"]';
  countryOption = 'button:has-text("India")';
  stateSelect = 'select[formcontrolname="state"]';
  cvvInput = 'input[formcontrolname="cvv"]';
  nameOnCardInput = 'input[formcontrolname="cardholderName"]';
  placeOrderButton = 'a:has-text("Place Order")';
  orderSummary = '.summary';
  confirmationMessage = '.ng-star-inserted';
  orderIdElement = '.ng-star-inserted';
  backToCheckoutButton = 'a:has-text("Back to checkout")';
  homeButton = 'a[routerlink*="dashboard"]';

  constructor(page) {
    super(page);
    this.pageURL = '#/checkout';
  }

  async goto() {
    await super.goto(this.pageURL);
    this.logger.info('Navigated to Checkout Page');
    await this.page.waitForLoadState('load');
  }

  async isCheckoutPageLoaded() {
    try {
      await this.page.waitForSelector('input[formcontrolname="country"]', { timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async selectCountry(countryName) {
    this.logger.step(1, `Selecting country: ${countryName}`);
    await this.fillInput(this.countryInput, countryName);
    await this.page.waitForTimeout(500);

    const countryOptions = await this.page
      .locator(`button:has-text("${countryName}")`)
      .all();

    if (countryOptions.length > 0) {
      await countryOptions[0].click();
      this.logger.info(`Country "${countryName}" selected`);
      await this.page.waitForTimeout(500);
    }
  }

  async selectState(stateName) {
    this.logger.step(2, `Selecting state: ${stateName}`);
    await this.page.selectOption(this.stateSelect, { label: stateName });
    this.logger.info(`State "${stateName}" selected`);
  }

  async enterCVV(cvv) {
    this.logger.step(3, `Entering CVV`);
    await this.fillInput(this.cvvInput, cvv);
  }

  async enterNameOnCard(name) {
    this.logger.step(4, `Entering cardholder name: ${name}`);
    await this.fillInput(this.nameOnCardInput, name);
  }

  async completePurchase(country, state, cvv, cardholderName) {
    await this.isCheckoutPageLoaded();
    await this.selectCountry(country);
    await this.selectState(state);
    await this.enterCVV(cvv);
    await this.enterNameOnCard(cardholderName);
    await this.placeOrder();
  }

  async placeOrder() {
    this.logger.step(5, 'Placing order');
    await this.click(this.placeOrderButton);
    await this.page.waitForLoadState('load');
    await this.page.waitForTimeout(2000);
    this.logger.info('Order placed successfully');
  }

  async getOrderConfirmationMessage() {
    try {
      const message = await this.getText(this.confirmationMessage);
      this.logger.info(`Confirmation message: ${message}`);
      return message;
    } catch {
      this.logger.error('Could not get confirmation message');
      return null;
    }
  }

  async getOrderId() {
    try {
      const orderText = await this.page.locator('h1').textContent();
      const match = orderText.match(/\d+/);
      if (match) {
        this.logger.info(`Order ID: ${match[0]}`);
        return match[0];
      }
    } catch {
      this.logger.warn('Could not extract order ID');
    }
    return null;
  }

  async isOrderPlaced() {
    try {
      return await this.page
        .locator('h1:has-text("Thankyou for the orders.")')
        .isVisible();
    } catch {
      return false;
    }
  }

  async navigateToDashboard() {
    this.logger.info('Navigating to dashboard');
    await this.click(this.homeButton);
    await this.page.waitForLoadState('load');
  }

  async verifyOrderSummary() {
    const summary = await this.getText(this.orderSummary);
    this.logger.info(`Order summary: ${summary}`);
    return summary;
  }
}
