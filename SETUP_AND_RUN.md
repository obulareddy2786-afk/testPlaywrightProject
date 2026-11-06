# Playwright E2E Test Framework - Setup & Execution Guide

## 🚀 Quick Start (5 Minutes)

### 1. Install Dependencies
```bash
npm install
npx playwright install
```

### 2. Environment Setup
The `.env` file is already configured with test credentials:
```
BASE_URL=https://rahulshettyacademy.com/client
TEST_USER_EMAIL=obulareddy2786@gmail.com
TEST_USER_PASSWORD=Nani$100623
HEADLESS=false
DEBUG=false
```

### 3. Run All Tests
```bash
npm test
```

### 4. View Results
```bash
npm run show-report
```

---

## 📋 Test Execution Commands

### Run All Tests
```bash
npm test
```
Runs all test files sequentially and generates HTML report.

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```
Opens browser and shows test execution in real-time.

### Run Tests in Interactive UI Mode
```bash
npm run test:ui
```
Opens Playwright's interactive UI for debugging and test execution.

### Run Tests in Debug Mode
```bash
npm run test:debug
```
Opens browser with DevTools for step-by-step debugging.

### Run Tests in Parallel (4 Workers)
```bash
npm run test:parallel
```
Speeds up execution by running multiple tests simultaneously.

### Run Tests Serially (1 Worker)
```bash
npm run test:serial
```
Runs tests one at a time (useful for debugging).

---

## 🎯 Run Specific Test Files

### Authentication Tests Only
```bash
npx playwright test tests/auth.test.js
```
Runs 10 authentication-related tests.

### Dashboard Tests Only
```bash
npx playwright test tests/home.test.js
```
Runs 10 dashboard navigation tests.

### Products Tests Only
```bash
npx playwright test tests/products.test.js
```
Runs 10 product browsing tests.

### Shopping Cart Tests Only
```bash
npx playwright test tests/cart.test.js
```
Runs 10 cart operation tests.

### Checkout Tests Only
```bash
npx playwright test tests/checkout.test.js
```
Runs 10 checkout and payment tests.

### Order History Tests Only
```bash
npx playwright test tests/orders.test.js
```
Runs 10 order viewing tests.

### End-to-End Flow Tests Only
```bash
npx playwright test tests/e2e-flow.test.js
```
Runs 10 comprehensive workflow tests.

---

## 🌐 Run Tests on Specific Browsers

### Chrome Only
```bash
npm run test:chrome
```
Tests on Chromium browser.

### Firefox Only
```bash
npm run test:firefox
```
Tests on Firefox browser.

### Safari Only
```bash
npm run test:webkit
```
Tests on WebKit (Safari) browser.

### All Browsers
```bash
npm run test:all-browsers
```
Runs tests on Chrome, Firefox, and Safari sequentially.

---

## 📊 Generate & View Reports

### Run Tests and Generate HTML Report
```bash
npm test
```
Automatically generates an HTML report.

### View the Generated Report
```bash
npm run show-report
```
Opens the HTML test report in your default browser.

### Report Contents
- ✅ Test results (passed/failed)
- 📸 Screenshots on failure
- 🎥 Video recordings on failure
- 🔍 Traces for debugging
- ⏱️ Test execution times

---

## 🧪 Run Specific Test Case by Name

### Run a Single Test
```bash
npx playwright test -g "TC_AUTH_001"
```
Runs only the test named "TC_AUTH_001: Successfully login with valid credentials"

### Run Multiple Tests by Pattern
```bash
npx playwright test -g "TC_AUTH"
```
Runs all authentication tests (TC_AUTH_001, TC_AUTH_002, etc.)

### Run Cart Tests Only
```bash
npx playwright test -g "TC_CART"
```

### Run Order Tests Only
```bash
npx playwright test -g "TC_ORDERS"
```

---

## 🔧 Generate Test Code (Codegen)

### Record Tests by Interacting with the App
```bash
npm run codegen
```
Opens Codegen to record test steps by clicking on elements.

---

## 🐛 Debugging & Troubleshooting

### Debug Failing Tests
```bash
npm run test:debug
```
Opens browser with inspector to debug test issues step-by-step.

### Enable Verbose Logging
```bash
DEBUG=true npm test
```
Shows detailed logging for each test step.

### Run with Increased Timeout
```bash
npx playwright test --timeout=60000
```
Increases timeout to 60 seconds per test (default: 30s).

### Retry Failed Tests
```bash
npx playwright test --retries=3
```
Automatically retries failed tests up to 3 times.

---

## 📁 Project Structure

```
playwright-test-framework/
├── tests/                        # All test files
│   ├── auth.test.js             # 10 Authentication tests
│   ├── home.test.js             # 10 Dashboard tests
│   ├── products.test.js         # 10 Product tests
│   ├── cart.test.js             # 10 Cart tests
│   ├── checkout.test.js         # 10 Checkout tests
│   ├── orders.test.js           # 10 Order tests
│   └── e2e-flow.test.js         # 10 End-to-end tests
│
├── pages/                        # Page Object Models
│   ├── BasePage.js              # Base class with common methods
│   ├── LoginPage.js             # Login page interactions
│   ├── DashboardPage.js         # Dashboard navigation
│   ├── ProductsPage.js          # Product browsing
│   ├── CartPage.js              # Shopping cart
│   ├── CheckoutPage.js          # Order placement
│   └── OrdersPage.js            # Order history
│
├── utils/                        # Utilities
│   ├── fixtures.js              # Custom test fixtures
│   ├── logger.js                # Logging utility
│   └── waits.js                 # Wait utilities
│
├── playwright.config.js          # Framework configuration
├── package.json                  # Dependencies and scripts
├── .env                          # Environment variables (configured)
├── README.md                     # Project overview
├── TEST_CASES.md                # Detailed test case documentation
├── QUICK_START.md               # Quick reference
└── SETUP_AND_RUN.md            # This file
```

---

## 🎓 Test Case Categories

### 1. Authentication Tests (10 tests)
- Login with valid credentials
- Error handling for invalid inputs
- Empty field validation
- Login/logout flow

### 2. Dashboard Tests (10 tests)
- Dashboard load verification
- Navigation to products/cart/orders
- Page elements verification
- User menu operations

### 3. Products Tests (10 tests)
- Product display and listing
- Add to cart functionality
- Product details retrieval
- Multiple product selection

### 4. Shopping Cart Tests (10 tests)
- Add/remove products
- Cart total calculation
- Clear cart functionality
- Empty cart handling

### 5. Checkout Tests (10 tests)
- Checkout form completion
- Country/state selection
- Payment details entry
- Order placement and confirmation

### 6. Order History Tests (10 tests)
- Order listing display
- Order ID verification
- Order details viewing
- Order history navigation

### 7. End-to-End Flow Tests (10 tests)
- Complete purchase journeys
- Multi-step workflows
- Session management
- Full user scenarios

---

## 🔑 Test Credentials

```
Email:    obulareddy2786@gmail.com
Password: Nani$100623
```

These credentials are already configured in `.env` file.

---

## ✅ Expected Test Results

When all tests run successfully, you should see:

```
Authentication Tests........... 10/10 passed ✅
Dashboard Tests................ 10/10 passed ✅
Products Tests................. 10/10 passed ✅
Shopping Cart Tests............ 10/10 passed ✅
Checkout Tests................. 10/10 passed ✅
Order History Tests............ 10/10 passed ✅
End-to-End Flow Tests.......... 10/10 passed ✅

Total: 70 tests passed ✅
```

---

## 🆘 Troubleshooting

### Tests Fail Due to Selectors
**Solution**: Selectors might have changed on the website. Use codegen to find updated selectors:
```bash
npm run codegen
```

### Tests Timeout
**Solution**: Increase timeout in playwright.config.js or run with:
```bash
npx playwright test --timeout=60000
```

### Browser Won't Open
**Solution**: Ensure browsers are installed:
```bash
npx playwright install
```

### Can't Find Elements
**Solution**: Run in debug mode to inspect elements:
```bash
npm run test:debug
```

### Tests Pass Locally But Fail in CI
**Solution**: Set headless=true in .env for CI environments and ensure network is stable.

---

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Debugging Guide](https://playwright.dev/docs/debug)

---

## 💡 Tips & Tricks

1. **Run specific test by name**:
   ```bash
   npx playwright test -g "TC_AUTH_001"
   ```

2. **View test videos**:
   Videos are saved in `test-results/` for failed tests

3. **Use UI mode for interactive debugging**:
   ```bash
   npm run test:ui
   ```

4. **Generate test report without running tests**:
   ```bash
   npm run show-report
   ```

5. **Update snapshot tests** (if applicable):
   ```bash
   npx playwright test --update-snapshots
   ```

---

## 🎯 CI/CD Integration

### GitHub Actions Example
```yaml
name: Playwright Tests
on: push
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npx playwright install
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## 📞 Support

For issues or questions:
1. Check TEST_CASES.md for test documentation
2. Review QUICK_START.md for common commands
3. Run tests in debug mode: `npm run test:debug`
4. Check playwright-report/ for detailed error info

---

**Happy Testing! 🚀**
