import { expect, type Page } from '@playwright/test';

type SelectedProduct = {
  name: string;
  price: string;
};

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  async fillInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.page
      .getByTestId('firstName')
      .fill(firstName);

    await this.page
      .getByTestId('lastName')
      .fill(lastName);

    await this.page
      .getByTestId('postalCode')
      .fill(postalCode);

    await this.page
      .getByTestId('continue')
      .click();
  }

  async expectProducts(
    products: SelectedProduct[]
  ): Promise<void> {
    await expect(
      this.page
    ).toHaveURL(/checkout-step-two\.html$/);

    const checkoutItems = this.page.locator('.cart_item');

    // Valida automáticamente la cantidad de productos.
    await expect(
      checkoutItems
    ).toHaveCount(products.length);

    // Valida cada producto agregado.
    for (const product of products) {
      const checkoutProduct = checkoutItems.filter({
        has: this.page.getByText(
          product.name,
          { exact: true }
        ),
      });

      await expect(
        checkoutProduct
      ).toHaveCount(1);

      await expect(
        checkoutProduct.locator('.inventory_item_name')
      ).toHaveText(product.name);

      await expect(
        checkoutProduct.locator('.inventory_item_desc')
      ).toBeVisible();

      await expect(
        checkoutProduct.locator('.inventory_item_price')
      ).toHaveText(product.price);

      await expect(
        checkoutProduct.locator('.cart_quantity')
      ).toHaveText('1');
    }
  }

  async expectPaymentInformation(): Promise<void> {
    await expect(
      this.page.getByText('Payment Information:')
    ).toBeVisible();

    await expect(
      this.page.getByText('SauceCard #31337')
    ).toBeVisible();
  }

  async expectShippingInformation(): Promise<void> {
    await expect(
      this.page.getByText('Shipping Information:')
    ).toBeVisible();

    await expect(
      this.page.getByText('Free Pony Express Delivery!')
    ).toBeVisible();
  }

  async expectPriceTotal(
    products: SelectedProduct[]
  ): Promise<void> {
    await expect(
      this.page.getByText('Price Total')
    ).toBeVisible();

    // Calcula automáticamente el subtotal esperado.
    const expectedItemTotal = products.reduce(
      (total, product) => {
        const price = Number(
          product.price.replace('$', '')
        );

        return total + price;
      },
      0
    );

    await expect(
      this.page.locator('.summary_subtotal_label')
    ).toHaveText(
      `Item total: $${expectedItemTotal.toFixed(2)}`
    );

    await expect(
      this.page.locator('.summary_tax_label')
    ).toContainText('Tax:');

    await expect(
      this.page.locator('.summary_total_label')
    ).toContainText('Total:');
  }

  async finish(): Promise<void> {
    await this.page
      .getByTestId('finish')
      .click();
  }

  async expectComplete(): Promise<void> {
    await expect(
      this.page
    ).toHaveURL(/checkout-complete\.html$/);

    await expect(
      this.page.getByTestId('complete-header')
    ).toHaveText('Thank you for your order!');
  }
}