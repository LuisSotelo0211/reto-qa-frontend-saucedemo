# Informe breve de estrategia de automatización

## Objetivo y cobertura

Verificar el flujo de compra en Sauce Demo con Playwright, Cucumber y TypeScript.

| Criterio | Escenario |
| --- | --- |
| Login válido | @login_valido: acceso con standard_user |
| Credenciales inválidas | @login_invalido: rechazo de contraseña incorrecta |
| Diferentes usuarios | @usuario_bloqueado: rechazo de locked_out_user |
| Agregar desde el catálogo | @agregar_producto: selección y cambio del botón a Remove |
| Ver productos en carrito | @ver_carrito: nombres, cantidades y precios |
| Completar compra | @compra: datos, resumen y confirmación del pedido |

Los criterios de agregar y visualizar productos tienen escenarios separados. Se conservan seis escenarios independientes y los tags para ejecutarlos individualmente.

## Patrón y organización

Se utiliza **Page Object Model**. Las cuatro clases de `pages/` concentran selectores, acciones y validaciones por pantalla. Los archivos de `tests/features/` describen el comportamiento en Gherkin y los de `tests/steps/` conectan esos pasos con el POM. Los hooks abren y cierran el navegador y el World conserva el estado de cada escenario.

## Datos y aislamiento

Se usan las cuentas públicas del reto y datos ficticios de comprador. Los nombres de productos se eligen en los `.feature`. La colección `selectedProducts` guarda sus nombres y precios del catálogo para contrastarlos con carrito y checkout. Cada escenario abre su propio navegador y contexto; no depende de una sesión o carrito anterior.

## Validaciones

Se verifican URLs, mensajes de login, botón Remove, nombres, cantidades y precios, datos de pago y envío y confirmación final. El subtotal se calcula con los productos seleccionados. También se comprueban el impuesto del 8% observado en Sauce Demo, redondeado a dos decimales, y el total como subtotal más impuesto. Esta tasa es una expectativa explícita de la aplicación demo; si cambia su regla, debe revisarse el caso.

Las aserciones de Playwright esperan los estados esperados. `slowMo` facilita observar las acciones y no sustituye esas esperas.

## Alcance y límites

La suite cubre los requisitos Front en Chromium. Depende de la disponibilidad de Sauce Demo. No incluye API, rendimiento ni otros navegadores. El README contiene los requisitos, comandos y ubicación de reportes; este informe describe la estrategia y los patrones.
