# Quick Start Guide

## ⚡ Get Up and Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
npx playwright install
```

### Step 2: Create .env File
```bash
cp .env.example .env
# Edit .env with your test environment details
```

### Step 3: Run Your First Tests
```bash
npm test
```

### Step 4: View Results
```bash
npm run show-report
```

---

## 📋 Common Commands

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:headed` | See browser while running |
| `npm run test:ui` | Interactive UI mode |
| `npm run test:debug` | Debug mode with inspector |
| `npm run test:chrome` | Run on Chrome only |
| `npm run test:all-browsers` | Test on all browsers |
| `npm run test:parallel` | Run with 4 workers |
| `npm run codegen` | Record & generate test code |
| `npm run show-report` | View HTML test report |

---

## 🎯 Key Concepts

### Page Object Model
Each page has a class that groups:
- **Selectors** (what to interact with)
- **Methods** (what to do)

```javascript
// Define in pages/LoginPage.js
emailInput = 'input[id="email"]';
async enterEmail(email) {
  await this.fillInput(this.emailInput, email);
}
```

### Custom Fixtures
Reusable test setup for common flows:

```javascript
test('login test', async ({ loginPage }) => {
  await loginPage.goto();
  await loginPage.login('user@example.com', 'pass');
});
```

### Base Page Methods
All pages inherit these utilities:

```javascript
await page.goto(url)                    // Navigate
await page.click(selector)              // Click element
await page.fillInput(selector, text)    // Fill input
await page.getText(selector)            // Get text
await page.isElementVisible(selector)   // Check visibility
await page.takeScreenshot(name)         // Save screenshot
```

---

## 📝 Writing Your First Test

```javascript
import { test, expect } from '../utils/fixtures.js';
import { YourPage } from '../pages/YourPage.js';

test.describe('Your Feature', () => {
  test('should do something', async ({ page }) => {
    const yourPage = new YourPage(page);
    
    // Arrange - setup
    await yourPage.goto();
    
    // Act - do something
    await yourPage.clickButton();
    
    // Assert - verify
    expect(await yourPage.getResult()).toBe('expected');
  });
});
```

---

## 🔧 File Structure Reference

```
pages/              → Page Object Models
tests/              → Test files (.test.js)
utils/              → Helpers (logger, waits, fixtures)
playwright.config.js → Framework config
package.json        → Dependencies
.env               → Environment variables (create from .env.example)
```

---

## 🚨 Troubleshooting

### Tests can't find elements?
- Check selectors in page objects match your app
- Use Codegen to record correct selectors: `npm run codegen`
- Use debug mode: `npm run test:debug`

### Tests timing out?
- Increase timeout: `{ timeout: 10000 }` in config
- Check if element exists: `await page.waitForSelector(selector)`
- Add explicit waits: `await page.waitForNavigation()`

### Different behavior on different browsers?
- Test locally on specific browser: `npm run test:chrome`
- Check for browser-specific CSS/JS issues in your app

---

## 📚 Next Steps

1. **Customize Pages**: Update `LoginPage.js` and `HomePage.js` with YOUR app's selectors
2. **Add Tests**: Create new `.test.js` files in `tests/` directory
3. **Extend Fixtures**: Add common flows to `utils/fixtures.js`
4. **Set Up CI/CD**: Use GitHub Actions or your CI tool to run tests automatically

---

## 🎓 Learn More

- [Playwright Official Docs](https://playwright.dev)
- Inspect elements: Run `npm run test:debug` and use DevTools
- Generate selectors: Run `npm run codegen <url>` and record actions

---

**You're all set! Start writing tests! 🚀**
