import { BasePage } from './BasePage.js';

export class OrdersPage extends BasePage {
  // Selectors
  orderRows = '.ng-star-inserted tbody tr';
  orderIds = 'th[scope="row"]';
  orderDetails = 'button:has-text("View")';
  orderTableHeader = 'table';
  noOrdersMessage = 'h1:has-text("No orders found")';
  ordersContainer = 'app-myorders';
  backButton = 'a:has-text("Back")';

  constructor(page) {
    super(page);
    this.pageURL = '#/myorders';
  }

  async goto() {
    await super.goto(this.pageURL);
    this.logger.info('Navigated to Orders Page');
    await this.page.waitForLoadState('load');
  }

  async isOrdersPageLoaded() {
    try {
      await this.page.waitForSelector('table', { timeout: 10000 });
      return true;
    } catch {
      return false;
    }
  }

  async getOrderCount() {
    const count = await this.getElementCount(this.orderRows);
    this.logger.info(`Found ${count} orders`);
    return count;
  }

  async getAllOrderIds() {
    await this.isOrdersPageLoaded();
    const orderIds = await this.page.locator(this.orderIds).allTextContents();
    this.logger.info(`Order IDs: ${orderIds.join(', ')}`);
    return orderIds;
  }

  async viewOrderDetails(orderId) {
    this.logger.info(`Viewing details for order: ${orderId}`);
    const rows = await this.page.locator(this.orderRows).all();

    for (const row of rows) {
      const id = await row.locator('th').textContent();
      if (id.includes(orderId)) {
        await row.locator(this.orderDetails).click();
        await this.page.waitForLoadState('load');
        this.logger.info(`Viewing order ${orderId} details`);
        return true;
      }
    }

    throw new Error(`Order ${orderId} not found`);
  }

  async isOrderPresent(orderId) {
    const orderIds = await this.getAllOrderIds();
    const found = orderIds.some(id => id.includes(orderId));
    this.logger.info(`Order ${orderId} ${found ? 'found' : 'not found'}`);
    return found;
  }

  async searchOrder(orderId) {
    this.logger.info(`Searching for order: ${orderId}`);
    return this.isOrderPresent(orderId);
  }

  async hasOrders() {
    const isNoOrdersVisible = await this.isElementVisible(this.noOrdersMessage).catch(
      () => false
    );

    if (isNoOrdersVisible) {
      this.logger.info('No orders found on page');
      return false;
    }

    const orderCount = await this.getOrderCount();
    return orderCount > 0;
  }

  async goBack() {
    this.logger.info('Going back');
    await this.click(this.backButton);
    await this.page.waitForLoadState('load');
  }

  async verifyOrderTableExists() {
    return this.isElementVisible(this.orderTableHeader);
  }
}
