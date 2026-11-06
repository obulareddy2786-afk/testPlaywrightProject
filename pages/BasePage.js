import { Logger } from '../utils/logger.js';
import { Waits } from '../utils/waits.js';

export class BasePage {
  constructor(page) {
    this.page = page;
    this.logger = Logger;
    this.waits = Waits;
  }

  async goto(url = '') {
    this.logger.info(`Navigating to ${url || 'base URL'}`);
    await this.page.goto(url);
  }

  async fillInput(selector, text) {
    this.logger.info(`Filling input [${selector}] with text: ${text}`);
    await this.page.locator(selector).fill(text);
  }

  async click(selector) {
    this.logger.info(`Clicking element [${selector}]`);
    await this.page.locator(selector).click();
  }

  async getText(selector) {
    const text = await this.page.locator(selector).textContent();
    this.logger.info(`Retrieved text from [${selector}]: ${text}`);
    return text;
  }

  async getElementCount(selector) {
    const count = await this.page.locator(selector).count();
    this.logger.info(`Element count for [${selector}]: ${count}`);
    return count;
  }

  async isElementVisible(selector) {
    const isVisible = await this.page.locator(selector).isVisible();
    this.logger.info(`Element [${selector}] visibility: ${isVisible}`);
    return isVisible;
  }

  async waitAndClick(selector, timeout = 5000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
    await this.click(selector);
  }

  async takeScreenshot(name = 'screenshot') {
    await this.page.screenshot({ path: `screenshots/${name}-${Date.now()}.png` });
    this.logger.info(`Screenshot saved: ${name}`);
  }

  async getPageTitle() {
    return this.page.title();
  }

  async getPageUrl() {
    return this.page.url();
  }

  async waitForTimeout(ms) {
    await this.page.waitForTimeout(ms);
  }
}
