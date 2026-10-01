import { When, Then } from '@cucumber/cucumber';
import { TestWorld } from '../support/world';

When(
  'selecciono el botón Checkout para el proceso de compra',
  async function (this: TestWorld) {
    await this.cart.startCheckout();
  }
);

When(
  'completo mis datos con nombre {string}, apellido {string}, código postal {string}',
  async function (
    this: TestWorld,
    firstName: string,
    lastName: string,
    postalCode: string
  ) {
    await this.checkout.fillInformation(
      firstName,
      lastName,
      postalCode
    );
  }
);

When(
  'verifico los productos seleccionados con su descripción',
  async function (this: TestWorld) {
    await this.checkout.expectProducts(
      this.selectedProducts
    );
  }
);

When(
  'verifico el Payment Information',
  async function (this: TestWorld) {
    await this.checkout.expectPaymentInformation();
  }
);

When(
  'verifico el Shipping Information',
  async function (this: TestWorld) {
    await this.checkout.expectShippingInformation();
  }
);

When(
  'verifico el Price Total',
  async function (this: TestWorld) {
    await this.checkout.expectPriceTotal(
      this.selectedProducts
    );
  }
);

When(
  'selecciono el botón Finish',
  async function (this: TestWorld) {
    await this.checkout.finish();
  }
);

Then(
  'veo la confirmación del pedido',
  async function (this: TestWorld) {
    await this.checkout.expectComplete();
  }
);