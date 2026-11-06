# 🔧 Detailed Selector Update Guide

## 📍 File to Update: `pages/LoginPage.js`

**Location**: `C:\Users\204761\Downloads\Claude\paari-login-tests\pages\LoginPage.js`

---

## 🎯 Step 1: Find Correct Selectors

### Method A: Using Browser DevTools (Recommended)

1. **Open the website**
   - Go to: https://paari.pythonanywhere.com/login/

2. **Open DevTools**
   - Press: `F12`
   - Or Right-click → "Inspect"

3. **Find Username Input**
   - Click the element picker (arrow icon in DevTools top-left)
   - Click on the username input field
   - Look at the HTML - you'll see something like:
     ```html
     <input type="text" id="username" name="username" class="form-control">
     ```
   - Copy the selector (choose one):
     - `#username` (ID - most reliable)
     - `input[name="username"]` (name attribute)
     - `input[type="text"]` (type attribute)
     - `.form-control` (class - less reliable)

4. **Find Password Input**
   - Click element picker again
   - Click on password field
   - Look for:
     ```html
     <input type="password" id="password" name="password" class="form-control">
     ```
   - Copy selector: `#password` or `input[name="password"]`

5. **Find Login Button**
   - Click element picker
   - Click on login button
   - Look for:
     ```html
     <button type="submit" id="login" class="btn btn-primary">Login</button>
     ```
   - Copy selector: `#login` or `button[type="submit"]`

### Method B: Using Playwright Codegen

```bash
npm run codegen
```

This opens the website with a recorder:
1. Click on the username input
2. See the selector appear in the recorder
3. Copy it
4. Do same for password and button

---

## ✏️ Step 2: Update LoginPage.js

### Location: Lines 4-32 (Selectors Section)

**Current Code:**
```javascript
export class LoginPage extends BasePage {
  // Selectors - Update these based on actual website selectors
  usernameInput = 'input[name="username"]';
  usernameInputAlt = 'input[type="text"]';
  usernameInputId = '#username';
  usernameInputClass = '.username-input';

  passwordInput = 'input[name="password"]';
  passwordInputAlt = 'input[type="password"]';
  passwordInputId = '#password';
  passwordInputClass = '.password-input';

  loginButton = 'button[type="submit"]';
  loginButtonText = 'button:has-text("Login")';
  loginButtonId = '#login-btn';
  loginButtonClass = '.btn-login';

  errorMessage = '.error';
  errorMessageAlt = '.alert-danger';
  errorText = '[role="alert"]';

  pageHeading = 'h1';
  loginForm = 'form';
  rememberMeCheckbox = 'input[type="checkbox"]';
  forgotPasswordLink = 'a[href*="forgot"]';

  successMessage = '.success';
  warningMessage = '.warning';
  loadingSpinner = '.spinner';
  pageTitle = 'title';
}
```

### 📝 What to Update

#### 1️⃣ USERNAME INPUT SELECTOR

**Line 5**: Update `usernameInput`

**Before:**
```javascript
usernameInput = 'input[name="username"]';
```

**After** (Example - use YOUR actual selector):
```javascript
usernameInput = '#username';  // or input[name="username"], or any selector that works
```

**Other related selectors (Lines 6-8):**
```javascript
usernameInputAlt = 'input[type="text"]';        // Alternative selector
usernameInputId = '#username';                   // ID selector
usernameInputClass = '.form-control';            // Class selector - update if different
```

---

#### 2️⃣ PASSWORD INPUT SELECTOR

**Line 10**: Update `passwordInput`

**Before:**
```javascript
passwordInput = 'input[name="password"]';
```

**After** (Example):
```javascript
passwordInput = '#password';  // or input[name="password"], or any selector that works
```

**Other related selectors (Lines 11-13):**
```javascript
passwordInputAlt = 'input[type="password"]';     // Alternative selector
passwordInputId = '#password';                    // ID selector
passwordInputClass = '.form-control';             // Class selector
```

---

#### 3️⃣ LOGIN BUTTON SELECTOR

**Line 15**: Update `loginButton`

**Before:**
```javascript
loginButton = 'button[type="submit"]';
```

**After** (Example):
```javascript
loginButton = '#login';  // or button[type="submit"], or .btn, etc.
```

**Other related selectors (Lines 16-18):**
```javascript
loginButtonText = 'button:has-text("Login")';    // Text-based selector
loginButtonId = '#login';                         // ID selector
loginButtonClass = '.btn-primary';                // Class selector
```

---

#### 4️⃣ ERROR MESSAGE SELECTOR

**Line 20**: Update `errorMessage`

**Before:**
```javascript
errorMessage = '.error';
```

**After** (Example):
```javascript
errorMessage = '.alert-danger';  // or .error, or [role="alert"], etc.
```

---

#### 5️⃣ SUCCESS MESSAGE SELECTOR

**Line 30**: Update `successMessage`

**Before:**
```javascript
successMessage = '.success';
```

**After** (Example):
```javascript
successMessage = '.alert-success';  // Update based on actual website
```

---

## 🔍 Example: How to Find Selectors Step-by-Step

### For Username Input:

1. Open https://paari.pythonanywhere.com/login/
2. Press F12 to open DevTools
3. Click the element picker (arrow in top-left of DevTools)
4. Click the username input field
5. In the HTML, you'll see something like:

```html
<input type="email" placeholder="Email" class="form-control" id="userEmail" name="email">
```

6. You can use ANY of these selectors:
   - `#userEmail` (ID - BEST)
   - `input[name="email"]` (name attribute)
   - `input[type="email"]` (type)
   - `.form-control` (class - might match other elements)
   - `input[placeholder="Email"]` (placeholder)

7. Pick the most specific one (usually ID) and update `usernameInput`:

```javascript
usernameInput = '#userEmail';  // Update this line!
```

---

## 📋 Quick Checklist: What Selectors to Find

| Element | Current Selector | Line | What to Find |
|---------|------------------|------|-------------|
| Username Input | `input[name="username"]` | 5 | ID or name attribute |
| Password Input | `input[name="password"]` | 10 | ID or name attribute |
| Login Button | `button[type="submit"]` | 15 | ID, class, or text |
| Error Message | `.error` | 20 | Class or role attribute |
| Success Message | `.success` | 30 | Class or element type |
| Login Form | `form` | 25 | Form element selector |

---

## 🎯 Common Selector Patterns

### By ID (Most Reliable)
```javascript
usernameInput = '#userEmail';     // Looks for id="userEmail"
```

### By Name Attribute
```javascript
usernameInput = 'input[name="email"]';  // Looks for name="email"
```

### By Type
```javascript
usernameInput = 'input[type="email"]';  // Looks for type="email"
```

### By Class
```javascript
usernameInput = '.form-control';  // Looks for class="form-control"
```

### By Placeholder
```javascript
usernameInput = 'input[placeholder="Email"]';  // Looks for placeholder text
```

### By Multiple Attributes
```javascript
usernameInput = 'input[type="email"][class="form-control"]';
```

---

## ✅ Step 3: Save Changes

1. **Edit the file**: `pages/LoginPage.js`
2. **Update selectors** in lines 4-32
3. **Save the file** (Ctrl+S)

Example of updated file:

```javascript
export class LoginPage extends BasePage {
  // Selectors - UPDATED FOR YOUR WEBSITE
  usernameInput = '#userEmail';                    // ✅ UPDATED
  usernameInputAlt = 'input[type="email"]';
  usernameInputId = '#userEmail';

  passwordInput = '#userPassword';                 // ✅ UPDATED
  passwordInputAlt = 'input[type="password"]';
  passwordInputId = '#userPassword';

  loginButton = 'button[type="submit"]';           // ✅ UPDATED
  loginButtonText = 'button:has-text("Login")';
  loginButtonId = '#login';

  errorMessage = '.alert-danger';                  // ✅ UPDATED
  errorMessageAlt = '.text-danger';
  errorText = '[role="alert"]';

  successMessage = '.alert-success';               // ✅ UPDATED
  // ... rest of selectors
}
```

---

## 🧪 Step 4: Test the Changes

```bash
# Run a single test to verify selectors work
npx playwright test -g "ADMIN_POSITIVE_001"

# OR watch in browser
npm run test:headed

# OR run specific file
npx playwright test tests/01-admin-login.test.js
```

If tests pass → Selectors are correct! ✅
If tests fail → Check error message and update selectors again

---

## 🐛 Debugging Failed Tests

### If You Get "Cannot find element [selector]"

1. **Check selector is correct:**
   ```bash
   # Open browser DevTools and paste in console:
   document.querySelector('#userEmail')  // Should return the element
   ```

2. **If it returns `null`** - selector is wrong, find the correct one

3. **If it returns an element** - selector is correct, issue might be:
   - Element not loaded yet
   - Element not visible
   - Wrong page

### Test This In Browser Console:

```javascript
// Test username input
console.log('Username field:', document.querySelector('#userEmail'));

// Test password input
console.log('Password field:', document.querySelector('#userPassword'));

// Test login button
console.log('Login button:', document.querySelector('button[type="submit"]'));
```

All three should return element objects, not `null`.

---

## 📝 Common Selectors for Popular Frameworks

### Bootstrap (Most Common)
```javascript
usernameInput = 'input[type="email"]';
passwordInput = 'input[type="password"]';
loginButton = 'button[type="submit"]';
errorMessage = '.alert-danger';
successMessage = '.alert-success';
```

### Material-UI
```javascript
usernameInput = '[name="username"]';
passwordInput = '[name="password"]';
loginButton = '[type="submit"]';
errorMessage = '.MuiAlert-message';
```

### Custom HTML
```javascript
usernameInput = '#email';
passwordInput = '#pwd';
loginButton = '.login-btn';
errorMessage = '.error-msg';
```

---

## ✨ Pro Tips

1. **Use IDs when possible** - They're the most reliable
2. **Avoid classes that might change** - Use ID or name attribute
3. **Test selectors in console first** - Before adding to code
4. **Keep alternatives** - The code tries multiple selectors automatically
5. **If selector has spaces** - It's probably wrong (use DevTools)

---

## 🎬 Video Guide (Steps to Follow)

1. Open website → https://paari.pythonanywhere.com/login/
2. Press F12 → DevTools opens
3. Click element picker (arrow icon)
4. Click username field → See HTML
5. Copy ID or name attribute
6. Open `pages/LoginPage.js` line 5
7. Replace selector
8. Save file
9. Repeat for password and button
10. Run tests: `npm test`

---

## 📞 If You're Still Stuck

**Share with me:**
1. What HTML you see in DevTools for username field
2. What HTML for password field
3. What HTML for login button
4. Any error messages from tests

Example:
```
For username field in DevTools, I see:
<input id="userEmail" type="email" class="form-control">

For password field, I see:
<input id="userPassword" type="password" class="form-control">

For login button, I see:
<button class="btn btn-primary" type="submit">Sign In</button>
```

Then I can provide exact selectors to use! ✅

---

**Ready to update? Start with Step 1: Find Correct Selectors** 🚀
