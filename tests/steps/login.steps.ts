import { Given, When, Then } from '@cucumber/cucumber';
import { TestWorld } from '../support/world';

Given(
  'que estoy en la página de inicio de sesión',
  async function (this: TestWorld) {
    await this.login.open();
  }
);

When(
  'ingreso el usuario {string} y la contraseña {string}',
  async function (
    this: TestWorld,
    username: string,
    password: string
  ) {
    await this.login.enterCredentials(
      username,
      password
    );
  }
);

When(
  'selecciono el botón {string}',
  async function (
    this: TestWorld,
    buttonName: string
  ) {
    if (buttonName !== 'Login') {
      throw new Error(
        `Botón no soportado en LoginPage: ${buttonName}`
      );
    }

    await this.login.clickLogin();
  }
);

Then(
  'veo la página de productos',
  async function (this: TestWorld) {
    await this.inventory.expectLoaded();
  }
);

Then(
  'el acceso es rechazado con el mensaje {string}',
  async function (
    this: TestWorld,
    message: string
  ) {
    await this.login.expectError(message);
  }
);
