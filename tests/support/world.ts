import { World, setWorldConstructor } from '@cucumber/cucumber';
import type { Browser, BrowserContext, Page } from '@playwright/test';

import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

// Cucumber crea un World diferente para cada escenario.
export class TestWorld extends World {
  browser!: Browser;
  context!: BrowserContext;

  login!: LoginPage;
  inventory!: InventoryPage;
  cart!: CartPage;
  checkout!: CheckoutPage;

  // Producto individual utilizado principalmente en Checkout.
  selectedProduct!: string;
  selectedPrice!: string;

  // Lista de productos agregados al carrito.
  selectedProducts: {
    name: string;
    price: string;
  }[] = [];

  initializePages(page: Page): void {
    this.login = new LoginPage(page);
    this.inventory = new InventoryPage(page);
    this.cart = new CartPage(page);
    this.checkout = new CheckoutPage(page);
  }
}

setWorldConstructor(TestWorld);