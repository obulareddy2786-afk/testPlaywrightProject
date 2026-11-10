import { BasePage } from './BasePage.js';

export class ProductsPage extends BasePage {
  // Selectors (Updated)
  productCards = '.card';
  productNames = '.card-body h5 b';
  productImages = '.card-img-top';
  addToCartButtons = '.fa.fa-shopping-cart';
  cartButton = 'button[routerlink*="cart"]';
  productFilter = 'select[name*="filter"]';
  searchBox = 'input[type="search"]';
  loadingSpinner = '.spinner';
  productDescription = '.card-body p';

  constructor(page) {
    super(page);
    this.pageURL = '#/dashboard';
  }

  async goto() {
    await super.goto(this.pageURL);
    this.logger.info('Navigated to Products Page');
    await this.page.waitForLoadState('load');
  }

  async waitForProductsLoaded() {
    await this.page.waitForSelector('.card', { timeout: 10000 });
    this.logger.info('Products loaded successfully');
  }

  async getProductCount() {
    const count = await this.getElementCount(this.productCards);
    this.logger.info(`Found ${count} products`);
    return count;
  }

  async getAllProductNames() {
    await this.waitForProductsLoaded();
    const products = await this.page.locator(this.productNames).allTextContents();
    this.logger.info(`Product names: ${products.join(', ')}`);
    return products;
  }

  async addProductToCart(productName) {
    this.logger.step(1, `Adding product "${productName}" to cart`);
    const cards = await this.page.locator('.card').all();

    for (const card of cards) {
      const title = await card.locator('.card-body h5 b').textContent();
      if (title && title.includes(productName)) {
        await card.locator('.fa.fa-shopping-cart').click();
        this.logger.info(`Product "${productName}" added to cart`);
        await this.page.waitForTimeout(1000);
        return true;
      }
    }

    throw new Error(`Product "${productName}" not found`);
  }

  async addMultipleProductsToCart(productNames) {
    this.logger.step(1, `Adding ${productNames.length} products to cart`);
    for (const productName of productNames) {
      await this.addProductToCart(productName);
    }
    this.logger.info(`All ${productNames.length} products added to cart`);
  }

  async getProductByName(productName) {
    const cards = await this.page.locator('.card').all();

    for (const card of cards) {
      const title = await card.locator('.card-body h5 b').textContent();
      if (title && title.includes(productName)) {
        return card;
      }
    }

    throw new Error(`Product "${productName}" not found`);
  }

  async getProductPrice(productName) {
    const card = await this.getProductByName(productName);
    const price = await card.locator('.card-body h5 .fa.fa-rupee').textContent();
    this.logger.info(`Product "${productName}" price: ${price}`);
    return price;
  }

  async searchForProduct(searchTerm) {
    this.logger.info(`Searching for products with term: "${searchTerm}"`);
    await this.fillInput(this.searchBox, searchTerm);
    await this.page.waitForLoadState('load');
  }

  async filterProducts(filterOption) {
    this.logger.info(`Filtering products with option: ${filterOption}`);
    await this.page.selectOption(this.productFilter, filterOption);
    await this.page.waitForLoadState('load');
  }

  async navigateToCart() {
    this.logger.info('Navigating to Cart');
    await this.click(this.cartButton);
    await this.page.waitForLoadState('load');
  }

  async isProductVisible(productName) {
    try {
      const card = await this.getProductByName(productName);
      return card.isVisible();
    } catch {
      return false;
    }
  }

  async getAddToCartButtonCount() {
    const count = await this.getElementCount(this.addToCartButtons);
    this.logger.info(`Found ${count} "Add to Cart" buttons`);
    return count;
  }
}
