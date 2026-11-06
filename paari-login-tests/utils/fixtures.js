import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import dotenv from 'dotenv';

dotenv.config();

export const loginData = {
  admin: {
    username: process.env.ADMIN_USERNAME || 'paari',
    password: process.env.ADMIN_PASSWORD || 'dravid12',
    role: 'Admin',
  },
  owner: {
    username: process.env.OWNER_USERNAME || 'rajusrinivas',
    password: process.env.OWNER_PASSWORD || 'maheshfan',
    role: 'Owner',
  },
  testUser: {
    username: process.env.TEST_EMAIL || 'testuser@example.com',
    password: process.env.TEST_PASSWORD || 'TestPassword123!',
    role: 'User',
  },
};

export const invalidCredentials = {
  invalidUsername: process.env.INVALID_USERNAME || 'invaliduser',
  invalidPassword: process.env.INVALID_PASSWORD || 'wrongpassword123',
};

export const securityTestData = {
  sqlInjection: process.env.SQL_INJECTION_PAYLOAD || "admin' OR '1'='1",
  xss: process.env.XSS_PAYLOAD || "<script>alert('XSS')</script>",
  specialChars: process.env.SPECIAL_CHARS || "!@#$%^&*()_+-=[]{}|;:',.<>?/",
};

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  adminLoginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const page_with_creds = {
      ...loginPage,
      adminUsername: process.env.ADMIN_USERNAME,
      adminPassword: process.env.ADMIN_PASSWORD,
    };
    await use(page_with_creds);
  },

  ownerLoginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const page_with_creds = {
      ...loginPage,
      ownerUsername: process.env.OWNER_USERNAME,
      ownerPassword: process.env.OWNER_PASSWORD,
    };
    await use(page_with_creds);
  },

  userLoginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const page_with_creds = {
      ...loginPage,
      testEmail: process.env.TEST_EMAIL,
      testPassword: process.env.TEST_PASSWORD,
    };
    await use(page_with_creds);
  },
});

export { expect } from '@playwright/test';
