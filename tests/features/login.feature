# language: es
@login
Característica: Inicio de sesión
  Como cliente quiero iniciar sesión para comprar en Sauce Demo.

  @login_valido
  Escenario: Iniciar sesión con credenciales válidas
    Dado que estoy en la página de inicio de sesión
    Cuando ingreso el usuario "standard_user" y la contraseña "secret_sauce"
    Y selecciono el botón "Login"
    Entonces veo la página de productos

  @login_invalido
  Escenario: Rechazar credenciales inválidas
    Dado que estoy en la página de inicio de sesión
    Cuando ingreso el usuario "standard_user" y la contraseña "incorrecta"
    Y selecciono el botón "Login"
    Entonces el acceso es rechazado con el mensaje "Epic sadface: Username and password do not match any user in this service"

  @usuario_bloqueado
  Escenario: Rechazar el acceso de un usuario bloqueado
    Dado que estoy en la página de inicio de sesión
    Cuando ingreso el usuario "locked_out_user" y la contraseña "secret_sauce"
    Y selecciono el botón "Login"
    Entonces el acceso es rechazado con el mensaje "Epic sadface: Sorry, this user has been locked out."
