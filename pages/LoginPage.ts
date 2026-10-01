import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async enterCredentials(
    username: string,
    password: string
  ): Promise<void> {
    await this.page.getByTestId('username').fill(username);
    await this.page.getByTestId('password').fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.page.getByTestId('login-button').click();
  }

  async signIn(
    username: string,
    password: string
  ): Promise<void> {
    await this.enterCredentials(username, password);
    await this.clickLogin();
  }

  async expectError(message: string): Promise<void> {
    await expect(
      this.page.getByTestId('error')
    ).toHaveText(message);

    await expect(
      this.page.getByTestId('login-button')
    ).toBeVisible();

    await expect(
      this.page
    ).not.toHaveURL(/inventory\.html/);
  }
}