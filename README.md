# Reto QA Front - Sauce Demo

Automatización de pruebas funcionales para **Sauce Demo** desarrollada con **Playwright, Cucumber y TypeScript**.

## Requisitos

Para configurar y ejecutar el proyecto se necesita:

- Node.js 22 o superior
- npm
- Git

El proyecto fue desarrollado y probado utilizando **Node.js 24**.

## Instalación

Instalar las dependencias del proyecto:

```
npm ci
```

Instalar Chromium mediante Playwright:

```
npx playwright install chromium
```

## Ejecución

Para ejecutar la suite completa:

```
npm test
```

Se abre Chromium y se ejecutan los 6 escenarios automatizados.

Las acciones se ralentizan mediante `slowMo: 1500` para poder observar la ejecución de las pruebas.

Esta configuración se encuentra en:

```text
tests/support/hooks.ts
```

Para ejecutar las pruebas a velocidad normal se puede cambiar temporalmente:

```typescript
slowMo: 1500
```

por:

```typescript
slowMo: 0
```

## Ejecución por tags

Cucumber permite ejecutar funcionalidades o escenarios específicos mediante tags.

### Login

Ejecutar todos los escenarios de Login:

```
npm test -- --tags "@login"
```

Login válido:

```
npm test -- --tags "@login_valido"
```

Login inválido:

```
npm test -- --tags "@login_invalido"
```

Usuario bloqueado:

```
npm test -- --tags "@usuario_bloqueado"
```

### Carrito

Ejecutar todos los escenarios del carrito:

```
npm test -- --tags "@carrito"
```

Agregar producto:

```
npm test -- --tags "@agregar_producto"
```

Ver productos agregados al carrito:

```
npm test -- --tags "@ver_carrito"
```

### Checkout

Completar una compra:

```
npm test -- --tags "@compra"
```

## Comprobaciones adicionales

Para comprobar los tipos de TypeScript:

```
npm run typecheck
```

Para verificar que los escenarios Gherkin tengan sus Step Definitions correspondientes sin ejecutar las pruebas contra Sauce Demo:

```
npm run test:dry
```

## Selección de productos

Los escenarios de **Carrito y Checkout permiten trabajar con uno o varios productos**.

Los productos utilizados durante las pruebas se indican directamente en los archivos `.feature`.

Ejemplo para agregar varios productos al carrito:

```gherkin
Y selecciono el botón de "Add to Cart" para el producto "Sauce Labs Backpack"
Y selecciono el botón de "Add to Cart" para el producto "Sauce Labs Fleece Jacket"
```

En Checkout también se puede trabajar con uno o varios productos:

```gherkin
Y agrego el producto "Sauce Labs Backpack" al carrito
Y agrego el producto "Sauce Labs Fleece Jacket" al carrito
```

Se debe utilizar el nombre exacto mostrado en el catálogo de Sauce Demo.

Por ejemplo:

- `Sauce Labs Backpack`
- `Sauce Labs Onesie`
- `Sauce Labs Fleece Jacket`

## Reporte

Después de ejecutar las pruebas, Cucumber genera automáticamente el reporte HTML:

```text
reports/cucumber.html
```

El archivo puede abrirse en un navegador para revisar los escenarios y pasos ejecutados, sus resultados y los errores encontrados en caso de fallo.

El reporte se genera nuevamente en cada ejecución.

La carpeta `reports` está excluida del repositorio mediante `.gitignore`.

## Notas

- Las pruebas requieren conexión a Internet y acceso a Sauce Demo.
- Se requiere Node.js 22 o superior.
- El proyecto fue desarrollado y probado utilizando Node.js 24.
- Para ejecutar sin mostrar Chromium, cambiar `headless: false` por `headless: true` en `tests/support/hooks.ts`.
- Si Chromium no está instalado, ejecutar `npx playwright install chromium`.