# language: es
Característica: Compra de productos
  Como cliente quiero completar mi compra y recibir la confirmación.

 @compra
  Escenario: Completar una compra con datos válidos
    Dado que estoy en la página de inicio de sesión
    Cuando ingreso el usuario "standard_user" y la contraseña "secret_sauce"
    Y selecciono el botón "Login"
    Y agrego el producto "Sauce Labs Fleece Jacket" al carrito
    Y agrego el producto "Sauce Labs Bike Light" al carrito
    Y agrego el producto "Test.allTheThings() T-Shirt (Red)" al carrito
    Y abro el carrito de la parte superior derecha
    Y veo los productos seleccionados en el carrito
    Y selecciono el botón Checkout para el proceso de compra
    Y completo mis datos con nombre "Luis", apellido "Sotelo", código postal "15108"
    Y verifico los productos seleccionados con su descripción
    Y verifico el Payment Information
    Y verifico el Shipping Information
    Y verifico el Price Total
    Y selecciono el botón Finish
    Entonces veo la confirmación del pedido