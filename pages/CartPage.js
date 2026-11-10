import { BasePage } from './BasePage.js';

export class CartPage extends BasePage {
  // Selectors (Updated)
  cartItems = '.cartWrap';
  cartItemNames = '.cartWrap h1';
  removeButtons = '.fa.fa-trash-o';
  cartTotal = 'h3';
  checkoutButton = 'button[routerlink*="checkout"]';
  emptyCartMessage = 'h1';
  productQuantity = 'input[type="number"]';
  continueShoppingButton = 'button[routerlink*="dashboard"]';
  loadingSpinner = '.spinner';

  constructor(page) {
    super(page);
    this.pageURL = '#/cart';
  }

  async goto() {
    await super.goto(this.pageURL);
    this.logger.info('Navigated to Cart Page');
    await this.page.waitForLoadState('load');
  }

  async isCartEmpty() {
    try {
      return await this.isElementVisible(this.emptyCartMessage);
    } catch {
      return false;
    }
  }

  async getCartItemCount() {
    const count = await this.getElementCount(this.cartItems);
    this.logger.info(`Cart contains ${count} items`);
    return count;
  }

  async getCartItemNames() {
    const names = await this.page.locator(this.cartItemNames).allTextContents();
    this.logger.info(`Cart items: ${names.join(', ')}`);
    return names;
  }

  async removeItemFromCart(productName) {
    this.logger.info(`Removing "${productName}" from cart`);
    const items = await this.page.locator(this.cartItems).all();

    for (let i = 0; i < items.length; i++) {
      const name = await items[i].locator('h1').textContent();
      if (name && name.includes(productName)) {
        await items[i].locator(this.removeButtons).click();
        this.logger.info(`Product "${productName}" removed from cart`);
        await this.page.waitForTimeout(1000);
        return true;
      }
    }

    throw new Error(`Product "${productName}" not found in cart`);
  }

  async removeAllItemsFromCart() {
    this.logger.info('Removing all items from cart');
    let removed = 0;
    let maxAttempts = 10;

    while (maxAttempts > 0) {
      const buttons = await this.page.locator(this.removeButtons).all();
      if (buttons.length === 0) break;

      await buttons[0].click();
      await this.page.waitForTimeout(500);
      removed++;
      maxAttempts--;
    }

    this.logger.info(`Removed ${removed} items from cart`);
  }

  async getCartTotal() {
    const total = await this.getText(this.cartTotal);
    this.logger.info(`Cart total: ${total}`);
    return total;
  }

  async isCheckoutButtonVisible() {
    return this.isElementVisible(this.checkoutButton);
  }

  async clickCheckout() {
    this.logger.step(1, 'Clicking Checkout button');
    await this.click(this.checkoutButton);
    await this.page.waitForLoadState('load');
  }

  async continueShopping() {
    this.logger.info('Continuing shopping');
    await this.click(this.continueShoppingButton);
    await this.page.waitForLoadState('load');
  }

  async updateItemQuantity(productName, quantity) {
    this.logger.info(`Updating quantity of "${productName}" to ${quantity}`);
    const items = await this.page.locator(this.cartItems).all();

    for (const item of items) {
      const name = await item.locator('h1').textContent();
      if (name.includes(productName)) {
        await item.locator(this.productQuantity).fill(quantity.toString());
        await this.page.waitForTimeout(500);
        this.logger.info(`Quantity updated to ${quantity}`);
        return true;
      }
    }

    throw new Error(`Product "${productName}" not found in cart`);
  }

  async verifyItemInCart(productName) {
    try {
      const items = await this.getCartItemNames();
      const found = items.some(item => item && item.includes(productName));
      this.logger.info(`Product "${productName}" ${found ? 'found' : 'not found'} in cart`);
      return found;
    } catch {
      return false;
    }
  }

  async waitForCartToLoad() {
    try {
      await this.page.waitForSelector(this.cartItems, { timeout: 5000 }).catch(() => {});
    } catch {
      this.logger.warn('Cart items selector not found');
    }
  }

  async isEmptyCartDisplayed() {
    try {
      const text = await this.page.locator(this.emptyCartMessage).textContent();
      return text && text.includes('No Products');
    } catch {
      return false;
    }
  }
}
