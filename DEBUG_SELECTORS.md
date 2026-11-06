# Debug Selectors Guide

If tests are still failing, use this guide to verify and update selectors.

## 🔍 How to Find Correct Selectors

### Method 1: Using Playwright Codegen
```bash
npm run codegen
```
This opens the website and records selectors as you click elements.

### Method 2: Using Browser DevTools
1. Open the website: https://rahulshettyacademy.com/client/#/auth/login
2. Press F12 to open DevTools
3. Click the element picker (top-left arrow in DevTools)
4. Click on the element you want to inspect
5. Look at the HTML in the Elements tab
6. Copy the selector (ID, class, or attribute)

### Method 3: Using Console Commands

Paste these in the browser console to find elements:

**Find Email Input:**
```javascript
document.querySelectorAll('input').forEach(el => {
  if(el.type === 'email' || el.placeholder.includes('email') || el.id.includes('email')) {
    console.log('Email Input:', el.id || el.name || el.className, el);
  }
});
```

**Find Password Input:**
```javascript
document.querySelectorAll('input').forEach(el => {
  if(el.type === 'password' || el.placeholder.includes('password')) {
    console.log('Password Input:', el.id || el.name || el.className, el);
  }
});
```

**Find Login Button:**
```javascript
document.querySelectorAll('button, input[type="submit"]').forEach(el => {
  if(el.textContent.includes('Login') || el.value.includes('Login') || el.id.includes('login')) {
    console.log('Login Button:', el.id || el.className, el);
  }
});
```

**Find All Products:**
```javascript
console.log('Total cards:', document.querySelectorAll('.card').length);
document.querySelectorAll('.card').forEach((card, i) => {
  const name = card.querySelector('.card-body h5 b')?.textContent;
  const price = card.querySelector('.card-body')?.textContent;
  console.log(`Product ${i+1}: ${name}`);
});
```

**Find Add to Cart Buttons:**
```javascript
document.querySelectorAll('.card').forEach((card, i) => {
  const button = card.querySelector('.fa.fa-shopping-cart');
  console.log(`Product ${i+1} has add to cart:`, !!button);
});
```

**Find Cart Items:**
```javascript
console.log('Cart items:', document.querySelectorAll('.cartWrap').length);
document.querySelectorAll('.cartWrap').forEach(item => {
  console.log(item.querySelector('h1')?.textContent);
});
```

---

## 📋 Known Selectors (Latest)

### Login Page
```javascript
Email: "#userEmail"
Password: "#userPassword"  
Login Button: "#login"
Error Message: "[style*='red']"
```

### Dashboard
```javascript
Home Icon: ".fa.fa-home"
Logout Button: ".fa.fa-sign-out"
```

### Products
```javascript
Product Cards: ".card"
Product Name: ".card-body h5 b"
Product Image: ".card-img-top"
Add to Cart: ".fa.fa-shopping-cart"
```

### Cart
```javascript
Cart Items: ".cartWrap"
Item Name: ".cartWrap h1"
Remove Button: ".fa.fa-trash-o"
Checkout Button: "button[routerlink*='checkout']"
```

### Checkout
```javascript
Country Input: "input[formcontrolname='country']"
Country Dropdown Options: "button[ngbdropdownmenu]"
CVV Input: "input[formcontrolname='cvv']"
Name Input: "input[formcontrolname='cardholderName']"
Place Order Button: "a[routerlink*='order']" or ".completebuy"
```

### Orders
```javascript
Orders Table: "table"
Order Rows: "table tbody tr"
Order IDs: "th[scope='row']"
```

---

## 🐛 Troubleshooting Failed Tests

### Test Fails: "Element not found"
1. Note the selector from the error
2. Open the website in browser
3. Press F12
4. Use Ctrl+Shift+C to pick the element
5. Find the correct selector in the HTML
6. Update the page object file

### Test Fails: "Timeout waiting for element"
The element might:
- Not exist on that page
- Be hidden/invisible
- Load dynamically
- Have a different selector

**Solution:**
- Add explicit wait: `await page.waitForSelector(selector, { timeout: 5000 })`
- Add delay: `await page.waitForTimeout(1000)`
- Check if element is visible: `await element.isVisible()`

### Test Fails: "Value does not match"
The data on the website might have changed.

**Solution:**
- Update test data in the test file
- Or verify the value matches expectation

---

## 📝 Update Files After Finding Correct Selectors

After finding correct selectors, update these files:

### Update LoginPage.js
File: `pages/LoginPage.js`

```javascript
emailInput = '#userEmail';        // Update this
passwordInput = '#userPassword';  // Update this
loginButton = '#login';           // Update this
```

### Update ProductsPage.js
File: `pages/ProductsPage.js`

```javascript
productCards = '.card';
productNames = '.card-body h5 b';  // Update this
productImages = '.card-img-top';   // Update this
addToCartButtons = '.fa.fa-shopping-cart'; // Update this
```

### Update CartPage.js
File: `pages/CartPage.js`

```javascript
cartItems = '.cartWrap';
removeButtons = '.fa.fa-trash-o';  // Update this
checkoutButton = 'button[routerlink*="checkout"]'; // Update this
```

---

## 🧪 Quick Test Selectors

Run this command in browser console to test if selectors work:

```javascript
// Test Login Selectors
console.log('Email input exists:', !!document.querySelector('#userEmail'));
console.log('Password input exists:', !!document.querySelector('#userPassword'));
console.log('Login button exists:', !!document.querySelector('#login'));

// Test Dashboard Selectors
console.log('Home icon exists:', !!document.querySelector('.fa.fa-home'));
console.log('Logout exists:', !!document.querySelector('.fa.fa-sign-out'));

// Test Products Selectors
console.log('Products count:', document.querySelectorAll('.card').length);
console.log('Add to cart buttons:', document.querySelectorAll('.fa.fa-shopping-cart').length);

// Test Cart Selectors
console.log('Cart items count:', document.querySelectorAll('.cartWrap').length);
console.log('Remove buttons:', document.querySelectorAll('.fa.fa-trash-o').length);
```

---

## ✅ Verification Checklist

Before running tests, verify:

- [ ] Email input is found: `#userEmail`
- [ ] Password input is found: `#userPassword`
- [ ] Login button is found: `#login`
- [ ] Can login successfully
- [ ] Dashboard loads after login
- [ ] Products display: `.card` elements exist
- [ ] Product names found: `.card-body h5 b`
- [ ] Add to cart works: `.fa.fa-shopping-cart`
- [ ] Cart items show: `.cartWrap` elements
- [ ] Can navigate to checkout
- [ ] Can place order

If any step fails, update the corresponding selector in the page object.

---

## 🚀 After Updating Selectors

```bash
# Run tests again
npm test

# Run specific test file
npx playwright test tests/auth.test.js

# Run with headed mode to watch
npm run test:headed

# Run in debug mode
npm run test:debug
```

---

## 📞 Still Having Issues?

1. **Collect error output:**
   ```bash
   npm test > test-errors.txt 2>&1
   ```

2. **Check specific test:**
   ```bash
   npx playwright test tests/auth.test.js --headed
   ```

3. **View detailed trace:**
   ```bash
   npm run show-report
   ```

4. **Use codegen to find selectors:**
   ```bash
   npm run codegen
   ```

5. **Verify selectors in console:**
   Open website → F12 → Console → Run selector test code above

Good luck! 🎯
