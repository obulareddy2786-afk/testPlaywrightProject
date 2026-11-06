# E2E Test Cases for Rahul Shetty Academy

## Test Suite Overview

Complete end-to-end test automation framework for **Rahul Shetty Academy** eCommerce website using **Playwright** with **Page Object Model (POM)** pattern.

**Website**: https://rahulshettyacademy.com/client  
**Total Test Cases**: 60+  
**Framework**: Playwright + JavaScript  
**Pattern**: Page Object Model  

---

## Authentication Tests (TC_AUTH_*)

### TC_AUTH_001: Successfully login with valid credentials ✅
- **Given**: User is on the login page
- **When**: User enters valid email and password
- **Then**: User should be redirected to dashboard

### TC_AUTH_002: Login page displays correctly
- **Given**: User navigates to login page
- **When**: Page loads
- **Then**: Email and password input fields should be visible

### TC_AUTH_003: Login button is enabled
- **Given**: User is on the login page
- **When**: Page loads
- **Then**: Login button should be enabled and clickable

### TC_AUTH_004: Error message with invalid email
- **Given**: User is on the login page
- **When**: User enters invalid email and password
- **Then**: Error message should display

### TC_AUTH_005: Error message with wrong password
- **Given**: User is on the login page
- **When**: User enters correct email but wrong password
- **Then**: Error message should display

### TC_AUTH_006: Error message with empty email
- **Given**: User is on the login page
- **When**: User leaves email empty and enters password
- **Then**: Error message should display

### TC_AUTH_007: Error message with empty password
- **Given**: User is on the login page
- **When**: User enters email but leaves password empty
- **Then**: Error message should display

### TC_AUTH_008: Verify user logged in state
- **Given**: User is authenticated
- **When**: User navigates to dashboard
- **Then**: Dashboard should load successfully

### TC_AUTH_009: Logout functionality
- **Given**: User is logged in on dashboard
- **When**: User clicks logout
- **Then**: User should be redirected to login page

### TC_AUTH_010: Email field accepts valid format
- **Given**: User is on the login page
- **When**: User enters valid email
- **Then**: Email value should be stored correctly

---

## Dashboard Tests (TC_DASH_*)

### TC_DASH_001: Dashboard loads successfully
- **Given**: User is authenticated
- **When**: User navigates to dashboard
- **Then**: Dashboard page should load

### TC_DASH_002: Verify logged-in state
- **Given**: User is on dashboard
- **When**: Page loads
- **Then**: User should be verified as logged in

### TC_DASH_003: Navigate to products
- **Given**: User is on dashboard
- **When**: User clicks products link
- **Then**: Should navigate to products page

### TC_DASH_004: Navigate to cart
- **Given**: User is on dashboard
- **When**: User clicks cart button
- **Then**: Should navigate to cart page

### TC_DASH_005: Navigate to orders
- **Given**: User is on dashboard
- **When**: User clicks orders link
- **Then**: Should navigate to orders page

### TC_DASH_006: Page title is displayed
- **Given**: User is on dashboard
- **When**: Page loads
- **Then**: Page should have a valid title

### TC_DASH_007: User profile menu opens
- **Given**: User is on dashboard
- **When**: User clicks profile button
- **Then**: User menu should open

### TC_DASH_008: Logout from dashboard
- **Given**: User is on dashboard
- **When**: User clicks logout
- **Then**: User should be on login page

### TC_DASH_009: Get current page URL
- **Given**: User is on dashboard
- **When**: Page loads
- **Then**: URL should contain "dashboard"

### TC_DASH_010: Wait for loading spinner
- **Given**: User navigates to dashboard
- **When**: Page is loading
- **Then**: Loading spinner should hide when ready

---

## Products Page Tests (TC_PROD_*)

### TC_PROD_001: Products display on dashboard
- **Given**: User is authenticated
- **When**: User navigates to products
- **Then**: Product list should display

### TC_PROD_002: Product names display correctly
- **Given**: User is on products page
- **When**: Page loads
- **Then**: All product names should be visible

### TC_PROD_003: Add to cart buttons for all products
- **Given**: User is on products page
- **When**: Page loads
- **Then**: Each product should have "Add to Cart" button

### TC_PROD_004: Add single product to cart
- **Given**: User is on products page
- **When**: User clicks "Add to Cart" for a product
- **Then**: Product should be added to cart

### TC_PROD_005: Add multiple products to cart
- **Given**: User is on products page
- **When**: User adds 2+ products to cart
- **Then**: All products should be added to cart

### TC_PROD_006: Retrieve product price
- **Given**: User is on products page
- **When**: User views product details
- **Then**: Product price should be displayed

### TC_PROD_007: Verify product visibility
- **Given**: User is on products page
- **When**: Products load
- **Then**: Products should be visible on page

### TC_PROD_008: Navigate to cart from products
- **Given**: User is on products page
- **When**: User clicks cart button
- **Then**: Should navigate to cart page

### TC_PROD_009: Count products on page
- **Given**: User is on products page
- **When**: Page loads
- **Then**: Product count should match visible products

### TC_PROD_010: Add all products individually
- **Given**: User is on products page
- **When**: User adds each product to cart one by one
- **Then**: All products should be in cart

---

## Shopping Cart Tests (TC_CART_*)

### TC_CART_001: Add product and verify in cart
- **Given**: User adds product from products page
- **When**: User navigates to cart
- **Then**: Product should be visible in cart

### TC_CART_002: Display multiple products in cart
- **Given**: User adds 2 products
- **When**: User navigates to cart
- **Then**: Both products should display in cart

### TC_CART_003: Remove product from cart
- **Given**: User has product in cart
- **When**: User clicks remove button
- **Then**: Product should be removed from cart

### TC_CART_004: Remove all items from cart
- **Given**: User has multiple items in cart
- **When**: User removes all items
- **Then**: Cart should be empty

### TC_CART_005: Get cart item names
- **Given**: User has items in cart
- **When**: User views cart
- **Then**: All item names should display

### TC_CART_006: Display cart total
- **Given**: User has items in cart
- **When**: User views cart
- **Then**: Total price should display

### TC_CART_007: Checkout button visible
- **Given**: User has items in cart
- **When**: User views cart
- **Then**: "Checkout" button should be visible

### TC_CART_008: Navigate to checkout
- **Given**: User has items in cart
- **When**: User clicks checkout
- **Then**: Should navigate to checkout page

### TC_CART_009: Empty cart handling
- **Given**: User navigates to empty cart
- **When**: Page loads
- **Then**: "No products" message should display

### TC_CART_010: Multiple products verification
- **Given**: User adds 3 products
- **When**: User views cart
- **Then**: Cart count should be 3

---

## Checkout Tests (TC_CHECKOUT_*)

### TC_CHECKOUT_001: Navigate to checkout
- **Given**: User has items in cart
- **When**: User clicks checkout
- **Then**: Checkout page should load

### TC_CHECKOUT_002: Checkout page verification
- **Given**: User is on checkout page
- **When**: Page loads
- **Then**: Checkout form should display

### TC_CHECKOUT_003: Select country
- **Given**: User is on checkout page
- **When**: User selects country (India)
- **Then**: Country should be selected

### TC_CHECKOUT_004: Enter CVV
- **Given**: User is on checkout page
- **When**: User enters CVV
- **Then**: CVV should be entered correctly

### TC_CHECKOUT_005: Enter cardholder name
- **Given**: User is on checkout page
- **When**: User enters name
- **Then**: Name should be entered correctly

### TC_CHECKOUT_006: Place order successfully
- **Given**: User completes checkout form
- **When**: User clicks "Place Order"
- **Then**: Order should be placed successfully

### TC_CHECKOUT_007: Order confirmation displays
- **Given**: Order is placed
- **When**: Confirmation page loads
- **Then**: Confirmation message should display

### TC_CHECKOUT_008: Order ID generated
- **Given**: Order is placed
- **When**: Confirmation page loads
- **Then**: Order ID should be generated and displayed

### TC_CHECKOUT_009: Complete purchase flow
- **Given**: User has product in cart
- **When**: User completes entire checkout
- **Then**: Order should be confirmed

### TC_CHECKOUT_010: Navigate after order
- **Given**: Order is placed
- **When**: Confirmation page loads
- **Then**: Navigation options should be available

---

## Orders Page Tests (TC_ORDERS_*)

### TC_ORDERS_001: Navigate to orders page
- **Given**: User is on dashboard
- **When**: User clicks orders link
- **Then**: Orders page should load

### TC_ORDERS_002: Orders page displays table
- **Given**: User is on orders page
- **When**: Page loads
- **Then**: Orders table should display

### TC_ORDERS_003: Get order count
- **Given**: User is on orders page
- **When**: Page loads
- **Then**: Order count should be accurate

### TC_ORDERS_004: Retrieve order IDs
- **Given**: User has orders
- **When**: User views orders page
- **Then**: All order IDs should display

### TC_ORDERS_005: Verify orders table
- **Given**: User is on orders page
- **When**: Page loads
- **Then**: Orders table should be visible

### TC_ORDERS_006: Placed order in history
- **Given**: User placed an order
- **When**: User navigates to orders
- **Then**: Order should appear in history

### TC_ORDERS_007: Order confirmation number
- **Given**: User placed an order
- **When**: Confirmation page displays
- **Then**: Confirmation number should show

### TC_ORDERS_008: Verify specific order
- **Given**: User placed an order
- **When**: User searches for order ID
- **Then**: Order should be found

### TC_ORDERS_009: Handle no orders
- **Given**: User has no orders
- **When**: User views orders page
- **Then**: Appropriate message should show

### TC_ORDERS_010: Navigate from orders
- **Given**: User is on orders page
- **When**: User clicks back
- **Then**: Should return to dashboard

---

## End-to-End Flow Tests (TC_E2E_*)

### TC_E2E_001: Complete journey login to order
- **Steps**:
  1. Login with valid credentials
  2. Navigate to products
  3. Add product to cart
  4. Proceed to checkout
  5. Complete purchase
  6. Verify order placed

### TC_E2E_002: Browse and cart functionality
- **Steps**:
  1. Login
  2. Browse products
  3. Add multiple products
  4. Verify cart items
  5. Remove items
  6. Verify updated count

### TC_E2E_003: Multiple orders workflow
- **Steps**:
  1. Login
  2. Place first order
  3. Navigate back to products
  4. Place second order
  5. View order history
  6. Verify both orders

### TC_E2E_004: Cart clear workflow
- **Steps**:
  1. Login
  2. Add 3 products
  3. Verify cart count
  4. Remove all items
  5. Verify empty cart

### TC_E2E_005: Purchase confirmation
- **Steps**:
  1. Login
  2. Add product
  3. Complete checkout
  4. Verify confirmation
  5. Check confirmation message

### TC_E2E_006: Login and logout
- **Steps**:
  1. Login successfully
  2. Verify dashboard
  3. Logout
  4. Verify on login page

### TC_E2E_007: Continue shopping flow
- **Steps**:
  1. Add first product
  2. Continue shopping
  3. Add more products
  4. Verify total in cart

### TC_E2E_008: Product verification
- **Steps**:
  1. View all products
  2. Verify product count
  3. Verify add to cart buttons
  4. Count products

### TC_E2E_009: Purchase and order history
- **Steps**:
  1. Complete purchase
  2. Navigate to orders
  3. Verify order in history

### TC_E2E_010: Full session flow
- **Steps**:
  1. Login
  2. Browse products
  3. Add to cart
  4. Complete purchase
  5. Verify confirmation
  6. Logout

---

## Test Credentials

```
Email: obulareddy2786@gmail.com
Password: Nani$100623
```

---

## Running Tests

### Install Dependencies
```bash
npm install
npx playwright install
```

### Create Environment File
```bash
cp .env.example .env
```

### Run All Tests
```bash
npm test
```

### Run Specific Test File
```bash
npx playwright test tests/auth.test.js
npx playwright test tests/products.test.js
npx playwright test tests/cart.test.js
npx playwright test tests/checkout.test.js
npx playwright test tests/orders.test.js
npx playwright test tests/e2e-flow.test.js
```

### Run in Headed Mode
```bash
npm run test:headed
```

### Run with UI Mode
```bash
npm run test:ui
```

### Run in Debug Mode
```bash
npm run test:debug
```

### Run on Specific Browser
```bash
npm run test:chrome      # Chrome
npm run test:firefox     # Firefox
npm run test:webkit      # Safari
```

### View Test Report
```bash
npm run show-report
```

---

## Test Coverage Summary

| Category | Test Count | Status |
|----------|-----------|--------|
| Authentication | 10 | ✅ Ready |
| Dashboard | 10 | ✅ Ready |
| Products | 10 | ✅ Ready |
| Shopping Cart | 10 | ✅ Ready |
| Checkout | 10 | ✅ Ready |
| Orders | 10 | ✅ Ready |
| End-to-End Flows | 10 | ✅ Ready |
| **Total** | **70** | ✅ Ready |

---

## Page Objects

- **LoginPage.js** - Authentication flows
- **DashboardPage.js** - Dashboard navigation
- **ProductsPage.js** - Product browsing and selection
- **CartPage.js** - Shopping cart operations
- **CheckoutPage.js** - Order placement
- **OrdersPage.js** - Order history viewing

---

## Utilities

- **fixtures.js** - Custom test fixtures with page objects
- **logger.js** - Timestamped logging
- **waits.js** - Smart wait conditions

---

## Notes

✅ All tests are ready to run without manual intervention  
✅ Tests use provided credentials  
✅ Page Object Model for maintainability  
✅ Comprehensive logging for debugging  
✅ Cross-browser support (Chrome, Firefox, Safari)  
✅ Parallel execution capability  
✅ HTML reports with screenshots and videos on failure  
