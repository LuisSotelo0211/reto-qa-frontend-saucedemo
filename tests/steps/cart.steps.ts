import { When, Then } from '@cucumber/cucumber';
import { TestWorld } from '../support/world';

When(
  'selecciono el botón de {string} para el producto {string}',
  async function (
    this: TestWorld,
    buttonName: string,
    productName: string
  ) {
    if (buttonName !== 'Add to Cart') {
      throw new Error(`Botón no soportado: ${buttonName}`);
    }

    const price = await this.inventory.addProduct(productName);

    this.selectedProducts.push({
      name: productName,
      price: price
    });

    // Se mantienen para los escenarios que trabajan con un solo producto.
    this.selectedProduct = productName;
    this.selectedPrice = price;
  }
);

When(
  'agrego el producto {string} al carrito',
  async function (
    this: TestWorld,
    productName: string
  ) {
    const price = await this.inventory.addProduct(productName);

    this.selectedProduct = productName;
    this.selectedPrice = price;

    this.selectedProducts.push({
      name: productName,
      price: price
    });
  }
);

Then(
  'el producto seleccionado queda marcado como agregado en el catálogo',
  async function (this: TestWorld) {
    await this.inventory.expectProductAdded(
      this.selectedProduct
    );
  }
);

When(
  'botón de {string} cambia a {string}',
  async function (
    this: TestWorld,
    originalButton: string,
    newButton: string
  ) {
    if (
      originalButton !== 'Add to Cart' ||
      newButton !== 'Remove'
    ) {
      throw new Error(
        `Cambio de botón no soportado: ${originalButton} → ${newButton}`
      );
    }

    await this.inventory.expectProductAdded(
      this.selectedProduct
    );
  }
);

When(
  'abro el carrito de la parte superior derecha',
  async function (this: TestWorld) {
    await this.inventory.openCart();
  }
);

Then(
  'veo los productos seleccionados en el carrito',
  async function (this: TestWorld) {
    await this.cart.expectProducts(
      this.selectedProducts
    );
  }
);

Then(
  'verifico el precio de los productos agregados en el carrito',
  async function (this: TestWorld) {
    await this.cart.expectProductPrices(
      this.selectedProducts
    );
  }
);