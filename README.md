# Rahul Shetty Academy - Playwright E2E Test Automation Framework

A **complete, production-ready end-to-end test automation framework** for **Rahul Shetty Academy** eCommerce website.

**Website**: https://rahulshettyacademy.com/client  
**Framework**: Playwright + JavaScript  
**Pattern**: Page Object Model (POM)  
**Total Test Cases**: 70+  
**Status**: ✅ Ready to Run

## 📁 Project Structure

```
playwright-test-framework/
├── pages/                    # Page Object Models
│   ├── BasePage.js          # Base class with common methods
│   ├── LoginPage.js         # Login page object
│   └── HomePage.js          # Home page object
├── tests/                    # Test files
│   ├── auth.test.js         # Authentication tests
│   └── home.test.js         # Home page tests
├── utils/                    # Utilities and helpers
│   ├── fixtures.js          # Custom test fixtures
│   ├── logger.js            # Logging utility
│   └── waits.js             # Wait utilities
├── playwright.config.js      # Playwright configuration
├── package.json             # Project dependencies
├── .env.example             # Environment variables template
└── README.md                # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory**
```bash
cd playwright-test-framework
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```
Update `.env` with your test environment details.

4. **Install Playwright browsers**
```bash
npx playwright install
```

## 📝 Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (see browser)
```bash
npm run test:headed
```

### Run tests in UI mode (interactive)
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run tests on specific browser
```bash
npm run test:chrome      # Chromium only
npm run test:firefox     # Firefox only
npm run test:webkit      # Safari only
```

### Run tests on all browsers
```bash
npm run test:all-browsers
```

### Run tests in parallel (4 workers)
```bash
npm run test:parallel
```

### Run tests serially (1 worker)
```bash
npm run test:serial
```

### Generate test code (Codegen)
```bash
npm run codegen
```

### View test report
```bash
npm run show-report
```

## 🏗️ Architecture

### Page Object Model (POM)
Each page is represented as a class that encapsulates:
- **Selectors**: Element locators
- **Methods**: User interactions and assertions
- **Navigation**: Page-specific navigation logic

### Base Page
All pages inherit from `BasePage` which provides:
- Common click, fill, getText methods
- Wait utilities
- Logging functionality
- Screenshot capability

### Custom Fixtures
Extend Playwright's built-in fixtures with:
- Page objects (loginPage, homePage)
- Pre-authenticated pages for faster test execution

### Utilities
- **Logger**: Timestamped console logging
- **Waits**: Custom wait conditions for elements and navigation

## ✍️ Writing Tests

### Example Test
```javascript
import { test, expect } from '../utils/fixtures.js';
import { LoginPage } from '../pages/LoginPage.js';

test.describe('Login Tests', () => {
  test('should login successfully', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('user@example.com', 'password123');
    
    expect(page.url()).toContain('/home');
  });
});
```

### Using Custom Fixtures
```javascript
test('should access authenticated page', async ({ authenticatedPage }) => {
  // authenticatedPage is already logged in!
  const homePage = new HomePage(authenticatedPage);
  const message = await homePage.getWelcomeMessage();
  expect(message).toBeTruthy();
});
```

## 🛠️ Extending the Framework

### Adding a New Page Object
1. Create a file in `pages/` directory
2. Extend `BasePage`
3. Define selectors and methods
4. Export the class

```javascript
import { BasePage } from './BasePage.js';

export class ProductPage extends BasePage {
  productTitle = '.product-title';
  addToCartButton = 'button[id="add-to-cart"]';

  async addProductToCart() {
    await this.click(this.addToCartButton);
  }
}
```

### Adding Custom Fixtures
Update `utils/fixtures.js`:
```javascript
export const test = base.extend({
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
});
```

## 📊 Test Reports

Playwright generates multiple report formats:
- **HTML Report**: Detailed visual report with traces and videos
- **JSON Report**: Machine-readable results
- **JUnit XML**: CI/CD integration

View HTML report:
```bash
npm run show-report
```

## ⚙️ Configuration

### Playwright Config
Edit `playwright.config.js` to:
- Change base URL
- Modify retry settings
- Adjust timeouts
- Configure reporters
- Set up web server integration

### Test Defaults
- **Timeout**: 30 seconds per test
- **Retries**: 0 (2 in CI)
- **Workers**: Number of CPU cores
- **Screenshots**: On failure only
- **Videos**: On failure only

## 🐛 Debugging

### Debug Mode
```bash
npm run test:debug
```

### Enable Traces
Traces are automatically captured on first retry. View them in the HTML report.

### Use Codegen
Generate test code by recording interactions:
```bash
npm run codegen http://yourapp.com
```

## 📚 Playwright Resources

- [Playwright Docs](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Debugging Guide](https://playwright.dev/docs/debug)

## 🤝 Contributing

1. Follow the Page Object Model pattern
2. Use descriptive test names
3. Add logging for debugging
4. Keep selectors DRY (centralized in page objects)
5. Write independent tests

## 📄 License

ISC

## ✨ Features

✅ Cross-browser testing (Chrome, Firefox, Safari)  
✅ Parallel test execution  
✅ Page Object Model pattern  
✅ Custom fixtures for common flows  
✅ Comprehensive logging  
✅ Auto-generated HTML reports  
✅ Video/screenshot capture on failure  
✅ Trace debugging  
✅ CI/CD ready  

---

**Happy Testing! 🎭**
