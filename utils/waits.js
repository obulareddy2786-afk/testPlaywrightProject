export class Waits {
  static async waitForElement(page, selector, timeout = 5000) {
    return page.waitForSelector(selector, { timeout });
  }

  static async waitForNavigation(page, action, timeout = 5000) {
    await Promise.all([
      page.waitForNavigation({ timeout }),
      action(),
    ]);
  }

  static async waitForElementToBeVisible(page, selector, timeout = 5000) {
    const element = await page.locator(selector).first();
    await element.waitFor({ state: 'visible', timeout });
  }

  static async waitForElementToBeHidden(page, selector, timeout = 5000) {
    await page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  static async sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  static async waitUntilUrlContains(page, urlPart, timeout = 5000) {
    await page.waitForURL(new RegExp(urlPart), { timeout });
  }
}
