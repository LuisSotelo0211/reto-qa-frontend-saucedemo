# language: es
@carrito
Característica: Carrito de compras
  Como cliente quiero agregar un producto y revisarlo en mi carrito.

  @agregar_producto
  Escenario: Agregar un producto al carrito desde la página de productos
    Dado que estoy en la página de inicio de sesión
    Cuando ingreso el usuario "standard_user" y la contraseña "secret_sauce"
    Y selecciono el botón "Login"
    Y selecciono el botón de "Add to Cart" para el producto "Sauce Labs Onesie"
    Entonces el producto seleccionado queda marcado como agregado en el catálogo
    Y botón de "Add to Cart" cambia a "Remove"

  @ver_carrito
Escenario: Ver los productos agregados en el carrito de compras
  Dado que estoy en la página de inicio de sesión
  Cuando ingreso el usuario "standard_user" y la contraseña "secret_sauce"
  Y selecciono el botón "Login"
  Y selecciono el botón de "Add to Cart" para el producto "Sauce Labs Backpack"
  Y selecciono el botón de "Add to Cart" para el producto "Sauce Labs Fleece Jacket"
  Y botón de "Add to Cart" cambia a "Remove"
  Y abro el carrito de la parte superior derecha
  Entonces veo los productos seleccionados en el carrito
  Y verifico el precio de los productos agregados en el carrito
