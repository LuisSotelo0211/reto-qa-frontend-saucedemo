import { expect, type Page } from '@playwright/test';

type SelectedProduct = {
  name: string;
  price: string;
};

export class CartPage {
  constructor(private readonly page: Page) {}

  async expectProducts(
    products: SelectedProduct[]
  ): Promise<void> {
    await expect(
      this.page
    ).toHaveURL(/cart\.html$/);

    const cartItems = this.page.getByTestId(
      'inventory-item'
    );

    // La cantidad esperada se calcula automáticamente.
    await expect(
      cartItems
    ).toHaveCount(products.length);

    for (const product of products) {
      const cartProduct = cartItems.filter({
        has: this.page.getByText(
          product.name,
          { exact: true }
        ),
      });

      await expect(
        cartProduct
      ).toHaveCount(1);

      await expect(
        cartProduct.getByTestId('inventory-item-name')
      ).toHaveText(product.name);

      // Cada producto agregado aparece una vez.
      await expect(
        cartProduct.getByTestId('item-quantity')
      ).toHaveText('1');
    }
  }

  async expectProductPrices(
    products: SelectedProduct[]
  ): Promise<void> {
    const cartItems = this.page.getByTestId(
      'inventory-item'
    );

    for (const product of products) {
      const cartProduct = cartItems.filter({
        has: this.page.getByText(
          product.name,
          { exact: true }
        ),
      });

      await expect(
        cartProduct.getByTestId('inventory-item-price')
      ).toHaveText(product.price);
    }
  }

  async startCheckout(): Promise<void> {
    await this.page
      .getByTestId('checkout')
      .click();
  }
}