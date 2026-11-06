# Paari Login Test Suite

A comprehensive, production-ready Playwright test automation framework for the Paari application login functionality with multiple user roles (Admin, Owner).

**Website**: https://paari.pythonanywhere.com/login/

## 📊 Test Coverage

- **Total Test Cases**: 100+
- **Admin Login Tests**: 15 positive test cases
- **Owner Login Tests**: 15 positive test cases
- **Negative Login Tests**: 20 test cases
- **Security Tests**: 20 test cases
- **Edge Case Tests**: 20 test cases

### Test Categories

| Category | Count | Focus |
|----------|-------|-------|
| Admin Positive | 15 | Valid login, form validation, navigation |
| Owner Positive | 15 | Valid login for owner role, session handling |
| Negative | 20 | Invalid credentials, empty fields, errors |
| Security | 20 | SQL injection, XSS, CSRF, rate limiting |
| Edge Cases | 20 | Boundary conditions, unusual input patterns |
| **TOTAL** | **100+** | **Comprehensive Coverage** |

## 🚀 Quick Start

### Installation

```bash
# Clone/navigate to project
cd paari-login-tests

# Install dependencies
npm install

# Install browsers
npx playwright install

# Configure credentials
cp .env.example .env
# Edit .env with actual credentials
```

### Run All Tests

```bash
npm test
```

### Run Specific Test Category

```bash
# Admin tests only
npm run test:admin

# Owner tests only
npm run test:owner

# Negative tests only
npm run test:negative

# Security tests only
npm run test:security
```

### Run in Different Modes

```bash
# Headed mode (see browser)
npm run test:headed

# UI mode (interactive)
npm run test:ui

# Debug mode
npm run test:debug

# Parallel execution (4 workers)
npm run test:parallel

# Serial execution (1 worker)
npm run test:serial
```

### Cross-Browser Testing

```bash
# Chrome only
npm run test:chrome

# Firefox only
npm run test:firefox

# WebKit (Safari) only
npm run test:webkit

# All browsers
npm run test:all-browsers
```

### View Test Report

```bash
npm run show-report
```

## 📁 Project Structure

```
paari-login-tests/
├── pages/
│   ├── BasePage.js              # Base page class with common methods
│   └── LoginPage.js             # Login page object model
├── tests/
│   ├── 01-admin-login.test.js   # 15 Admin positive tests
│   ├── 02-owner-login.test.js   # 15 Owner positive tests
│   ├── 03-negative-login.test.js # 20 Negative tests
│   ├── 04-security-login.test.js # 20 Security tests
│   └── 05-edge-cases.test.js    # 20 Edge case tests
├── utils/
│   ├── fixtures.js              # Custom test fixtures
│   ├── logger.js                # Logging utility
│   └── waits.js                 # Wait utilities
├── playwright.config.js         # Playwright configuration
├── package.json                 # Dependencies
├── .env                         # Credentials (create from .env.example)
└── README.md                    # This file
```

## 🔐 Test Credentials

Set credentials in your local `.env` file or provide them through your CI secret store. Do not commit `.env` or put real credentials in documentation or source files.

## Jenkins CI

The root `Jenkinsfile` runs the Playwright suite on a Linux Jenkins agent, installs Chromium, and publishes the JUnit and Playwright reports. The agent must have Node.js and npm available on `PATH`; Jenkins must have Pipeline and Credentials Binding support.

Before running the job, add these six **Secret text** credentials in Jenkins with the matching IDs:

| Jenkins credentials ID | Environment variable |
| --- | --- |
| `paari-admin-username` | `ADMIN_USERNAME` |
| `paari-admin-password` | `ADMIN_PASSWORD` |
| `paari-owner-username` | `OWNER_USERNAME` |
| `paari-owner-password` | `OWNER_PASSWORD` |
| `paari-test-email` | `TEST_EMAIL` |
| `paari-test-password` | `TEST_PASSWORD` |

Create a Pipeline job pointing to this repository and select **Pipeline script from SCM** to load the `Jenkinsfile`. Configure the GitHub repository and webhook in Jenkins to trigger builds on pushes or pull requests. Keep credentials in Jenkins, not in Git.

## ✅ Test Case Coverage

### Admin Login (15 Tests)

1. ✅ Successful login with valid credentials
2. ✅ All form elements visible
3. ✅ Login button enabled
4. ✅ Username field accepts input
5. ✅ Password field accepts input
6. ✅ Login with Enter key
7. ✅ Form behavior on page refresh
8. ✅ Case sensitivity handling
9. ✅ Page title verification
10. ✅ Multiple login button clicks
11. ✅ Form accessibility
12. ✅ Login page heading
13. ✅ Correct login URL
14. ✅ Secure password field type
15. ✅ Clear and re-enter credentials

### Owner Login (15 Tests)

1. ✅ Successful login with valid credentials
2. ✅ Form displays correctly
3. ✅ Form submission works
4. ✅ Long username handling
5. ✅ Special characters in password
6. ✅ Tab navigation between fields
7. ✅ Redirect after login
8. ✅ Role-based access control
9. ✅ Generic login page for all roles
10. ✅ Page refresh during login
11. ✅ Password masking
12. ✅ Autofill support
13. ✅ Network delay handling
14. ✅ Session persistence
15. ✅ Success feedback message

### Negative Tests (20 Tests)

1. ✅ Invalid username
2. ✅ Invalid password
3. ✅ Empty username
4. ✅ Empty password
5. ✅ Both fields empty
6. ✅ Only spaces in fields
7. ✅ Case sensitive password
8. ✅ Extra spaces in username
9. ✅ Incorrect credentials for admin
10. ✅ Swapped username/password
11. ✅ Null/undefined values
12. ✅ Incomplete form submission
13. ✅ Error message for wrong password
14. ✅ Error message for non-existent user
15. ✅ Consistent error messages
16. ✅ Very long username
17. ✅ Very long password
18. ✅ Special characters rejection
19. ✅ Rapid login attempts
20. ✅ Numeric only credentials

### Security Tests (20 Tests)

1. ✅ SQL injection in username blocked
2. ✅ SQL injection in password blocked
3. ✅ XSS in username blocked
4. ✅ XSS in password blocked
5. ✅ Password not logged in network
6. ✅ HTTPS connection used
7. ✅ CSRF token present
8. ✅ Security headers checked
9. ✅ Rate limiting on failed attempts
10. ✅ Password autocomplete handling
11. ✅ Secure session cookies
12. ✅ Generic error messages (no enumeration)
13. ✅ Input length limits
14. ✅ Response splitting prevention
15. ✅ Input sanitization
16. ✅ Timing attack prevention
17. ✅ Secure comparison used
18. ✅ Unicode handling
19. ✅ Null byte injection prevention
20. ✅ No sensitive data in HTML source

### Edge Cases (20 Tests)

1. ✅ Browser back button navigation
2. ✅ Copy-paste credentials
3. ✅ Rapid button clicks
4. ✅ Form submission without button
5. ✅ Single character credentials
6. ✅ Credentials with quotes
7. ✅ Page zoom changes
8. ✅ International characters
9. ✅ Simultaneous field entries
10. ✅ Credentials with newlines
11. ✅ Emoji in credentials
12. ✅ HTML tags in input
13. ✅ Repeated character credentials
14. ✅ Focus loss handling
15. ✅ Maximum input length
16. ✅ Tab key navigation
17. ✅ System reserved credentials
18. ✅ Form state before submission
19. ✅ Disabled button handling
20. ✅ Rapid field switching

## 🛠️ Page Object Model

### LoginPage Class

```javascript
// Selectors
usernameInput, passwordInput, loginButton
errorMessage, successMessage
pageHeading, loginForm

// Methods
async login(username, password)
async enterUsername(username)
async enterPassword(password)
async clickLoginButton()
async isErrorMessageDisplayed()
async isSuccessMessageDisplayed()
async isLoginPageVisible()
async getErrorMessage()
// ... and many more
```

### BasePage Class

```javascript
// Common methods available to all pages
async goto(url)
async click(selector)
async fillInput(selector, text)
async getText(selector)
async isElementVisible(selector)
async waitForTimeout(ms)
// ... and more
```

## 📊 Test Execution

### Running Tests

```bash
# All tests
npm test

# Specific test file
npx playwright test tests/01-admin-login.test.js

# Single test
npx playwright test -g "ADMIN_POSITIVE_001"

# Pattern matching
npx playwright test -g "ADMIN"
npx playwright test -g "SECURITY"
npx playwright test -g "NEGATIVE"
```

### Debugging

```bash
# Debug mode
npm run test:debug

# With UI
npm run test:ui

# Generate code
npm run codegen
```

## 📈 Test Reports

Generated after test run:

- **HTML Report**: `/playwright-report/index.html`
- **JSON Results**: `/test-results/results.json`
- **JUnit XML**: `/test-results/junit.xml`

View report:
```bash
npm run show-report
```

## 🔄 CI/CD Integration

### GitHub Actions

```yaml
name: Paari Login Tests
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

## 🐛 Troubleshooting

### Tests Fail: "Cannot find element"

1. Selectors might have changed on the website
2. Run codegen to record correct selectors: `npm run codegen`
3. Update `pages/LoginPage.js` with correct selectors

### Tests Timeout

1. Increase timeout in `playwright.config.js`
2. Add explicit waits: `await page.waitForLoadState('networkidle')`
3. Check network connectivity

### Login Fails

1. Verify credentials in `.env` file
2. Check if website is accessible
3. Try manual login in browser first
4. Run in headed mode to watch: `npm run test:headed`

## 📚 Documentation

- **QUICK_START.md** - Quick reference guide
- **TEST_CASES.md** - Detailed test case documentation
- **SETUP_GUIDE.md** - Setup instructions

## ✨ Features

✅ 100+ comprehensive test cases  
✅ Page Object Model pattern  
✅ Multi-role testing (Admin, Owner)  
✅ Security testing (SQL injection, XSS)  
✅ Edge case coverage  
✅ Cross-browser support  
✅ Parallel execution  
✅ Detailed reporting  
✅ Custom fixtures  
✅ Advanced logging  

## 🎯 Next Steps

1. **Setup**: Follow Quick Start guide
2. **Configure**: Update `.env` with credentials
3. **Run**: Execute `npm test`
4. **Review**: Check HTML report
5. **Extend**: Add more test cases as needed

## 📞 Support

For issues or questions:
1. Check test output for error details
2. Run in debug mode: `npm run test:debug`
3. Check HTML report for screenshots/videos
4. Review test code in `/tests/` directory

---

**Happy Testing! 🎭**
