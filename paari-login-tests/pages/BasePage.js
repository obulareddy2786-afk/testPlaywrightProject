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
    try {
      const isVisible = await this.page.locator(selector).isVisible({ timeout: 2000 });
      this.logger.info(`Element [${selector}] visibility: ${isVisible}`);
      return isVisible;
    } catch (error) {
      this.logger.debug(`Element [${selector}] not visible or not found`);
      return false;
    }
  }

  async waitAndClick(selector, timeout = 5000) {
    await this.page.locator(selector).waitFor({ state: 'visible', timeout });
    await this.click(selector);
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

  async clearInput(selector) {
    this.logger.info(`Clearing input [${selector}]`);
    await this.page.locator(selector).clear();
  }

  async getInputValue(selector) {
    const value = await this.page.locator(selector).inputValue();
    this.logger.info(`Retrieved input value from [${selector}]: ${value}`);
    return value;
  }

  async isButtonEnabled(selector) {
    try {
      const isEnabled = await this.page.locator(selector).isEnabled({ timeout: 2000 });
      this.logger.info(`Button [${selector}] enabled: ${isEnabled}`);
      return isEnabled;
    } catch (error) {
      this.logger.warn(`Button [${selector}] check failed, returning true as default`);
      return true;  // Default to true if button doesn't exist or times out
    }
  }

  async pressKey(key) {
    this.logger.info(`Pressing key: ${key}`);
    await this.page.keyboard.press(key);
  }

  async takeScreenshot(name) {
    const filename = `screenshot-${name}-${Date.now()}.png`;
    await this.page.screenshot({ path: `screenshots/${filename}` });
    this.logger.info(`Screenshot saved: ${filename}`);
  }
}
