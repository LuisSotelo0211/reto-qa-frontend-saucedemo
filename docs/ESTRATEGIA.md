# Estrategia de automatización

## Objetivo

Automatizar los principales flujos funcionales solicitados para Sauce Demo: autenticación, selección de uno o varios productos, carrito de compras y finalización de una compra.

También se contemplan escenarios alternativos de autenticación, como el rechazo de credenciales inválidas y el acceso de un usuario bloqueado.

## Cobertura

| Criterio del reto | Escenario |
| --- | --- |
| Login válido | `@login_valido`: iniciar sesión correctamente con `standard_user` |
| Login inválido | `@login_invalido`: rechazar una contraseña incorrecta |
| Diferentes usuarios | `@usuario_bloqueado`: rechazar el acceso de `locked_out_user` |
| Agregar producto desde el catálogo | `@agregar_producto`: agregar un producto y comprobar el cambio de `Add to Cart` a `Remove` |
| Ver productos en el carrito | `@ver_carrito`: agregar uno o varios productos, abrir el carrito y verificar productos, cantidades y precios |
| Completar una compra | `@compra`: iniciar sesión, agregar uno o varios productos, completar el Checkout y confirmar el pedido |

## Estrategia

Los escenarios se encuentran definidos utilizando **Cucumber y Gherkin**, permitiendo describir de forma legible el comportamiento esperado de la aplicación.

**Playwright** se utiliza para controlar Chromium, interactuar con Sauce Demo y realizar las validaciones de los escenarios.

**TypeScript** permite mantener el código tipado y detectar errores durante el desarrollo.

Los Step Definitions comunes se reutilizan entre los escenarios de Login, Carrito y Checkout para evitar duplicar implementaciones de una misma acción.

Los escenarios de **Carrito y Checkout permiten trabajar con uno o varios productos**.

Los productos seleccionados y sus precios se obtienen durante la ejecución y se almacenan para utilizarlos posteriormente en las validaciones del Carrito y Checkout.

Esto permite comprobar dinámicamente los productos seleccionados, sus cantidades y precios, además de calcular el subtotal esperado según los productos agregados.

## Patrón utilizado

Se utiliza el patrón **Page Object Model (POM)** para separar la lógica de interacción con las páginas de los escenarios y Step Definitions.

Los Page Objects implementados son:

- `LoginPage.ts`
- `InventoryPage.ts`
- `CartPage.ts`
- `CheckoutPage.ts`

La separación utilizada es:

```text
Feature
   ↓
Step Definition
   ↓
Page Object
   ↓
Playwright
   ↓
Sauce Demo
```

Los archivos `.feature` describen el comportamiento esperado mediante Gherkin.

Los Step Definitions conectan los pasos de los escenarios con la automatización.

Los Page Objects concentran las acciones y validaciones correspondientes a cada página de Sauce Demo.

Esta separación permite evitar que los escenarios contengan directamente la lógica de interacción con la interfaz y facilita la reutilización de acciones.

## Manejo de datos

Se utilizan las cuentas públicas de Sauce Demo indicadas en el reto y datos ficticios para completar la información del comprador durante Checkout.

Cuando se agrega un producto, su nombre y precio se conservan dentro del escenario para utilizarlos posteriormente en las validaciones.

Para manejar uno o varios productos se utiliza una colección:

```typescript
selectedProducts: {
  name: string;
  price: string;
}[] = [];
```

De esta manera, los precios no necesitan escribirse manualmente en los escenarios.

La misma colección permite validar los productos agregados al Carrito y Checkout, además de calcular el subtotal esperado cuando se seleccionan varios productos.

## Aislamiento de escenarios

Cada escenario utiliza un nuevo navegador y contexto, que se cierran al finalizar la prueba.

Cucumber utiliza un `World` para mantener los Page Objects y los datos correspondientes al escenario que se está ejecutando.

De esta manera, una sesión, carrito o datos generados durante una prueba no afectan a los demás escenarios.

## Validaciones

Se utilizan aserciones de Playwright para comprobar, entre otros:

- URLs esperadas.
- Mensajes de error de autenticación.
- Cambio del botón `Add to Cart` a `Remove`.
- Productos seleccionados.
- Cantidad de productos.
- Precios obtenidos desde el catálogo.
- Productos mostrados en el carrito.
- Productos mostrados durante Checkout.
- Payment Information.
- Shipping Information.
- Price Total.
- Subtotal calculado según los productos seleccionados.
- Mensaje final de confirmación del pedido.

Las aserciones utilizan las esperas automáticas de Playwright para comprobar los estados esperados de la aplicación.

## Alcance y límites

La automatización cubre los requisitos funcionales Front-End solicitados en el reto utilizando Chromium.

Las pruebas dependen de la disponibilidad de la aplicación pública Sauce Demo y de una conexión a Internet.

El alcance actual no incluye pruebas de API, rendimiento, seguridad ni ejecución Cross-Browser, ya que no forman parte de los criterios solicitados para este reto.