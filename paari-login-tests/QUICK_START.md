# Quick Start - 5 Minutes

## ⚡ Installation (2 minutes)

```bash
# Navigate to project
cd C:\Users\204761\Downloads\Claude\paari-login-tests

# Install everything
npm install
npx playwright install
```

## 🔧 Configuration (1 minute)

```bash
# Create env file
cp .env.example .env

# Edit .env (credentials are already configured):
# ADMIN_USERNAME=paari
# ADMIN_PASSWORD=dravid12
# OWNER_USERNAME=rajusrinivas
# OWNER_PASSWORD=maheshfan
```

## ▶️ Run Tests (2 minutes)

```bash
# Run all tests
npm test

# OR watch in browser
npm run test:headed

# View report
npm run show-report
```

## 📊 Test Commands Cheat Sheet

| Command | Purpose |
|---------|---------|
| `npm test` | Run all 100+ tests |
| `npm run test:headed` | See browser while running |
| `npm run test:admin` | Admin tests only |
| `npm run test:owner` | Owner tests only |
| `npm run test:negative` | Negative tests only |
| `npm run test:security` | Security tests only |
| `npm run test:ui` | Interactive UI mode |
| `npm run test:debug` | Debug mode |
| `npm run show-report` | View HTML report |

## 🎯 Test Coverage

✅ **100+ Test Cases**

- 15 Admin Login Tests
- 15 Owner Login Tests
- 20 Negative Tests
- 20 Security Tests
- 20 Edge Case Tests

## 📂 What You Have

```
100+ Test Cases for:
├── Admin Login Scenarios
├── Owner Login Scenarios
├── Invalid Credentials
├── Security Vulnerabilities
│   ├── SQL Injection
│   ├── XSS Attacks
│   ├── CSRF Protection
│   └── Rate Limiting
└── Edge Cases & UX
```

## ✨ Features

✅ Page Object Model  
✅ Multi-role testing  
✅ Security testing  
✅ Cross-browser support  
✅ Detailed reporting  
✅ Custom logging  
✅ Parallel execution  

## 🚨 If Tests Fail

### Check Selectors
```bash
npm run codegen
```

Click on elements to get selectors, then update `pages/LoginPage.js`

### Watch Tests Run
```bash
npm run test:headed
```

### Debug Issues
```bash
npm run test:debug
```

## 📍 Test Files Location

```
tests/
├── 01-admin-login.test.js       (15 tests)
├── 02-owner-login.test.js       (15 tests)
├── 03-negative-login.test.js    (20 tests)
├── 04-security-login.test.js    (20 tests)
└── 05-edge-cases.test.js        (20 tests)
```

## 🎓 Credentials Ready

```
Admin:
  Username: paari
  Password: dravid12

Owner:
  Username: rajusrinivas
  Password: maheshfan
```

## 📈 Expected Results

After running `npm test`, you should see:

```
✅ 100+ tests completed
✅ Most tests should PASS (first run)
✅ HTML report generated
✅ Video of failures (if any)
✅ Screenshots on error
```

## 🔍 View Results

```bash
npm run show-report
```

Opens interactive HTML report showing:
- ✅ All test results
- 📸 Screenshots
- 🎥 Videos
- 🔍 Traces
- ⏱️ Execution times

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Cannot find element" | Run `npm run codegen` |
| "Timeout" | Check website is accessible |
| "Cannot find module" | Run `npm install` |
| "Browsers not installed" | Run `npx playwright install` |

## 📚 Documentation

- **README.md** - Full documentation
- **SETUP_GUIDE.md** - Detailed setup
- **QUICK_START.md** - This file

## 🚀 Next Steps

1. ✅ Install: `npm install && npx playwright install`
2. ✅ Configure: `cp .env.example .env`
3. ✅ Run: `npm test`
4. ✅ View: `npm run show-report`
5. ✅ Extend: Add more tests as needed

## 💡 Pro Tips

```bash
# Run specific test
npx playwright test -g "ADMIN_POSITIVE_001"

# Run by pattern
npx playwright test -g "SECURITY"

# Parallel execution
npm run test:parallel

# Single browser
npm run test:chrome
```

## ✅ You're All Set!

```bash
npm test
```

**That's it! 🎉**

---

Full documentation in README.md
Setup details in SETUP_GUIDE.md
