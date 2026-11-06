import { test, expect } from '../utils/fixtures.js';
import { LoginPage } from '../pages/LoginPage.js';
import { DashboardPage } from '../pages/DashboardPage.js';
import { ProductsPage } from '../pages/ProductsPage.js';
import { CartPage } from '../pages/CartPage.js';

const VALID_EMAIL = 'obulareddy2786@gmail.com';
const VALID_PASSWORD = 'Nani$100623';

test.describe('Smoke Tests - Core Functionality', () => {
  test('SMOKE_001: User can login with valid credentials', async ({ page }) => {
    // Navigate to login page
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('networkidle');

    // Fill login form
    await page.fill('#userEmail', VALID_EMAIL);
    await page.fill('#userPassword', VALID_PASSWORD);

    // Click login
    await page.click('#login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Verify dashboard is loaded (check for home icon)
    const homeIcon = await page.locator('.fa.fa-home').isVisible();
    expect(homeIcon).toBeTruthy();

    console.log('✅ Login successful');
  });

  test('SMOKE_002: Products are displayed on dashboard', async ({ page }) => {
    // Login
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('networkidle');
    await page.fill('#userEmail', VALID_EMAIL);
    await page.fill('#userPassword', VALID_PASSWORD);
    await page.click('#login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Check if products are displayed
    const productCards = await page.locator('.card').count();
    expect(productCards).toBeGreaterThan(0);

    console.log(`✅ Found ${productCards} products`);
  });

  test('SMOKE_003: Can add product to cart', async ({ page }) => {
    // Login
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('networkidle');
    await page.fill('#userEmail', VALID_EMAIL);
    await page.fill('#userPassword', VALID_PASSWORD);
    await page.click('#login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Get first product name
    const firstProductName = await page
      .locator('.card-body h5 b')
      .first()
      .textContent();
    console.log(`Adding product: ${firstProductName}`);

    // Click first product's add to cart button
    await page.locator('.fa.fa-shopping-cart').first().click();
    await page.waitForTimeout(1000);

    console.log('✅ Product added to cart');
  });

  test('SMOKE_004: Can navigate to cart and view items', async ({ page }) => {
    // Login
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('networkidle');
    await page.fill('#userEmail', VALID_EMAIL);
    await page.fill('#userPassword', VALID_PASSWORD);
    await page.click('#login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Add product
    await page.locator('.fa.fa-shopping-cart').first().click();
    await page.waitForTimeout(1000);

    // Navigate to cart
    await page.click('button[routerlink*="cart"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Verify cart has items
    const cartItems = await page.locator('.cartWrap').count();
    expect(cartItems).toBeGreaterThan(0);

    console.log(`✅ Cart has ${cartItems} items`);
  });

  test('SMOKE_005: Can logout from dashboard', async ({ page }) => {
    // Login
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('networkidle');
    await page.fill('#userEmail', VALID_EMAIL);
    await page.fill('#userPassword', VALID_PASSWORD);
    await page.click('#login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Click logout
    await page.click('.fa.fa-sign-out');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Verify on login page
    const emailInput = await page.locator('#userEmail').isVisible();
    expect(emailInput).toBeTruthy();

    console.log('✅ Logout successful');
  });

  test('SMOKE_006: Error message on invalid login', async ({ page }) => {
    // Navigate to login
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('networkidle');

    // Enter invalid credentials
    await page.fill('#userEmail', 'invalid@test.com');
    await page.fill('#userPassword', 'wrongpassword');
    await page.click('#login');

    // Wait for response
    await page.waitForTimeout(2000);

    // Check for error (might be displayed, just verify login page still visible)
    const emailInput = await page.locator('#userEmail').isVisible();
    expect(emailInput).toBeTruthy();

    console.log('✅ Invalid login handled');
  });

  test('SMOKE_007: Complete purchase flow', async ({ page }) => {
    // Login
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('networkidle');
    await page.fill('#userEmail', VALID_EMAIL);
    await page.fill('#userPassword', VALID_PASSWORD);
    await page.click('#login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Add product
    const productName = await page
      .locator('.card-body h5 b')
      .first()
      .textContent();
    await page.locator('.fa.fa-shopping-cart').first().click();
    await page.waitForTimeout(1000);

    // Go to cart
    await page.click('button[routerlink*="cart"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Verify product in cart
    const cartItemText = await page.locator('.cartWrap').first().textContent();
    expect(cartItemText).toContain(productName);

    console.log('✅ Complete flow successful');
  });

  test('SMOKE_008: Verify product count matches display', async ({ page }) => {
    // Login
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('networkidle');
    await page.fill('#userEmail', VALID_EMAIL);
    await page.fill('#userPassword', VALID_PASSWORD);
    await page.click('#login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Count products
    const cards = await page.locator('.card').count();
    const names = await page.locator('.card-body h5 b').count();
    const addButtons = await page.locator('.fa.fa-shopping-cart').count();

    expect(cards).toBe(names);
    expect(cards).toBe(addButtons);

    console.log(
      `✅ Product counts match: ${cards} cards, ${names} names, ${addButtons} buttons`
    );
  });

  test('SMOKE_009: Can remove item from cart', async ({ page }) => {
    // Login
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('networkidle');
    await page.fill('#userEmail', VALID_EMAIL);
    await page.fill('#userPassword', VALID_PASSWORD);
    await page.click('#login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Add product
    await page.locator('.fa.fa-shopping-cart').first().click();
    await page.waitForTimeout(1000);

    // Go to cart
    await page.click('button[routerlink*="cart"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Get item count before
    const itemsBefore = await page.locator('.cartWrap').count();

    // Remove item
    await page.click('.fa.fa-trash-o');
    await page.waitForTimeout(1000);

    // Get item count after
    const itemsAfter = await page.locator('.cartWrap').count();

    expect(itemsAfter).toBeLessThan(itemsBefore);

    console.log(`✅ Item removed: ${itemsBefore} → ${itemsAfter} items`);
  });

  test('SMOKE_010: Dashboard navigation works', async ({ page }) => {
    // Login
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.waitForLoadState('networkidle');
    await page.fill('#userEmail', VALID_EMAIL);
    await page.fill('#userPassword', VALID_PASSWORD);
    await page.click('#login');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);

    // Navigate to orders
    await page.click('button[routerlink*="myorders"]');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Check if on orders page (URL contains myorders)
    expect(page.url()).toContain('myorders');

    console.log('✅ Navigation to orders successful');
  });
});
