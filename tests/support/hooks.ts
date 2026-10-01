import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, selectors } from '@playwright/test';
import { TestWorld } from './world';

setDefaultTimeout(60_000);
selectors.setTestIdAttribute('data-test');

// Cada escenario comienza con un navegador y una sesión nuevos.
Before(async function (this: TestWorld) {
  this.browser = await chromium.launch({
    headless: false,
    slowMo: 1500, // Ralentiza las acciones para observar la prueba.
  });
  this.context = await this.browser.newContext();
  const page = await this.context.newPage();
  page.setDefaultTimeout(10_000);
  this.initializePages(page);
});

After(async function (this: TestWorld) {
  await this.browser?.close();
});
