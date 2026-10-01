import { expect, type Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html$/);

    await expect(
      this.page.getByTestId('title')
    ).toHaveText('Products');
  }

  async addProduct(name: string): Promise<string> {
    const product = this.page
      .getByTestId('inventory-item')
      .filter({
        has: this.page.getByText(name, { exact: true }),
      });

    await expect(product).toHaveCount(1);

    const price = await product
      .getByTestId('inventory-item-price')
      .innerText();

    await product
      .getByRole('button', {
        name: 'Add to cart',
        exact: true,
      })
      .click();

    await expect(
      this.page.getByTestId('shopping-cart-badge')
    ).toBeVisible();

    return price;
  }

  async expectProductAdded(name: string): Promise<void> {
    await this.expectLoaded();

    const product = this.page
      .getByTestId('inventory-item')
      .filter({
        has: this.page.getByText(name, { exact: true }),
      });

    await expect(product).toHaveCount(1);

    await expect(
      product.getByRole('button', {
        name: 'Remove',
        exact: true,
      })
    ).toBeVisible();

    await expect(
      this.page.getByTestId('shopping-cart-badge')
    ).toBeVisible();
  }

  async openCart(): Promise<void> {
    await this.page
      .getByTestId('shopping-cart-link')
      .click();
  }
}