# Paari Login Tests - Complete Setup Guide

## 📋 Prerequisites

- Node.js 16+ (check: `node --version`)
- npm (check: `npm --version`)
- Git (optional)
- Chrome/Firefox/Safari (Playwright will install browsers)

## 🚀 Step-by-Step Setup

### Step 1: Create Project Directory

```bash
# Navigate to your projects folder
cd C:\Users\204761\Downloads\Claude

# Create new project directory
mkdir paari-login-tests
cd paari-login-tests
```

### Step 2: Initialize npm Project

```bash
# Initialize npm (this was already done)
npm install
```

### Step 3: Install Dependencies

```bash
# Install Playwright and dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Step 4: Configure Environment Variables

```bash
# Copy example file
cp .env.example .env

# Edit .env file with actual credentials
# Add:
# ADMIN_USERNAME=paari
# ADMIN_PASSWORD=dravid12
# OWNER_USERNAME=rajusrinivas
# OWNER_PASSWORD=maheshfan
```

## 📝 Test Credentials

The project comes with two pre-configured user roles:

### Admin User
- **Username**: paari
- **Password**: dravid12
- **Role**: Administrator

### Owner User
- **Username**: rajusrinivas
- **Password**: maheshfan
- **Role**: Owner

These credentials are already set in `.env` file.

## ✅ Verify Installation

```bash
# Check if all packages installed
npm list

# Verify Playwright installation
npx playwright --version

# Check if browsers are installed
npx playwright install --with-deps
```

## 🧪 Run First Test

```bash
# Run all tests
npm test

# Or run specific test file
npx playwright test tests/01-admin-login.test.js

# Run in headed mode (see browser)
npm run test:headed
```

## 📂 Project Structure Breakdown

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `playwright.config.js` | Playwright configuration |
| `.env` | Credentials and secrets |
| `.gitignore` | Files to ignore in git |

### Page Objects

| File | Contains |
|------|----------|
| `BasePage.js` | Common page methods |
| `LoginPage.js` | Login page selectors & methods |

### Test Files

| File | Test Cases | Focus |
|------|-----------|-------|
| `01-admin-login.test.js` | 15 | Admin positive tests |
| `02-owner-login.test.js` | 15 | Owner positive tests |
| `03-negative-login.test.js` | 20 | Negative scenarios |
| `04-security-login.test.js` | 20 | Security vulnerabilities |
| `05-edge-cases.test.js` | 20 | Boundary conditions |

### Utilities

| File | Purpose |
|------|---------|
| `fixtures.js` | Custom test fixtures |
| `logger.js` | Logging utilities |
| `waits.js` | Wait utilities |

## 🎯 Running Different Test Types

### Run All Tests
```bash
npm test
```

### Run by Role
```bash
npm run test:admin     # Admin tests only
npm run test:owner     # Owner tests only
```

### Run by Type
```bash
npm run test:negative   # Negative test cases
npm run test:security   # Security test cases
```

### Run by Browser
```bash
npm run test:chrome     # Chrome only
npm run test:firefox    # Firefox only
npm run test:webkit     # Safari only
npm run test:all-browsers # All browsers
```

### Run in Different Modes
```bash
npm run test:headed     # See browser
npm run test:ui         # Interactive UI
npm run test:debug      # Debug mode
npm run test:parallel   # 4 parallel workers
npm run test:serial     # 1 worker (serial)
```

## 📊 View Test Reports

### After Running Tests
```bash
npm run show-report
```

This opens an HTML report with:
- ✅ Test results (passed/failed)
- 📸 Screenshots on failure
- 🎥 Video recordings
- 🔍 Trace files for debugging
- ⏱️ Execution times

## 🔧 Updating Selectors

If tests fail due to selector changes:

### Method 1: Use Codegen
```bash
npm run codegen
```

Then:
1. Navigate to login page
2. Click on elements you need selectors for
3. Copy the selector from codegen console
4. Update `pages/LoginPage.js` with new selector

### Method 2: Manual Inspection
1. Open https://paari.pythonanywhere.com/login/
2. Press F12 (DevTools)
3. Inspect the element
4. Copy the selector (ID, class, name, etc.)
5. Update `pages/LoginPage.js`

### Method 3: Browser Console
```javascript
// Find username input
document.querySelector('input[type="text"]')
document.querySelector('#username')
document.querySelector('[name="username"]')

// Log the correct selector
console.log('Username selector found: input[name="username"]')
```

## 🐛 Debugging Failed Tests

### Run in Headed Mode
```bash
npm run test:headed
```

Watch the browser while tests run to see what fails.

### Run in Debug Mode
```bash
npm run test:debug
```

This opens DevTools where you can step through code.

### Run Single Test
```bash
npx playwright test -g "ADMIN_POSITIVE_001"
```

Run one test at a time to isolate issues.

### Check Error Details
1. Run tests: `npm test`
2. Open report: `npm run show-report`
3. Click on failed test
4. View error message, screenshot, video, trace

## 🔐 Security Considerations

### Credentials
- Never commit `.env` file (already in `.gitignore`)
- Never hardcode passwords in test files
- Use environment variables from `.env`

### Test Accounts
- Use dedicated test accounts
- Never use production user credentials
- Consider creating test accounts specifically for automation

### Best Practices
- Rotate test credentials periodically
- Use strong passwords for test accounts
- Keep `.env` file local only

## 🚀 Running in CI/CD

### GitHub Actions Example
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
      - run: npx playwright install --with-deps
      - run: npm test
      - if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## 📈 Test Maintenance

### Monthly Tasks
- Review test results
- Update selectors if UI changed
- Add new test cases for new features
- Remove deprecated tests

### Quarterly Tasks
- Review security test cases
- Update test credentials
- Performance analysis
- Coverage assessment

### Annually
- Major refactoring if needed
- Technology updates
- Team training sessions

## 🎓 Learning Resources

### Playwright
- [Official Docs](https://playwright.dev)
- [API Reference](https://playwright.dev/docs/api/class-playwright)
- [Best Practices](https://playwright.dev/docs/best-practices)

### Testing
- [Test Design Patterns](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)
- [Debugging](https://playwright.dev/docs/debug)

## ✨ Tips & Tricks

### Run Faster
```bash
# Parallel execution with 4 workers
npm run test:parallel

# Specific browser only (faster than all)
npm run test:chrome
```

### Better Debugging
```bash
# Generate test code by recording
npm run codegen

# Slow down test execution
# Add this to playwright.config.js:
# slowMo: 1000, // 1 second between actions
```

### View Test Progress
```bash
# Run with UI mode (see progress)
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed
```

## ❌ Common Issues & Solutions

### Issue: "Cannot find module 'dotenv'"
```bash
npm install dotenv
```

### Issue: "Browsers not installed"
```bash
npx playwright install --with-deps
```

### Issue: "Cannot find element"
1. Run `npm run codegen`
2. Find correct selector
3. Update `pages/LoginPage.js`

### Issue: "Timeout waiting for element"
1. Check if element exists
2. Add explicit wait
3. Increase timeout in `playwright.config.js`

### Issue: "Cannot connect to website"
1. Check if website is up
2. Verify internet connection
3. Check BASE_URL in `.env`

## 📞 Quick Reference

### Most Used Commands
```bash
npm test                    # Run all tests
npm run test:headed         # Run with browser visible
npm run test:debug          # Debug mode
npm run show-report         # View test report
npm run test:admin          # Admin tests only
npm run test:security       # Security tests only
npm run codegen             # Record selectors
```

### Quick Troubleshooting
```bash
npm run test:headed         # See what's happening
npm run test:debug          # Step through code
npm run codegen             # Find new selectors
npm run show-report         # Check error details
```

## 🎉 You're Ready!

```bash
# Run tests
npm test

# View results
npm run show-report

# Happy testing! 🚀
```

---

**Setup Complete! Start running tests with `npm test`**
