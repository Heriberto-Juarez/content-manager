# Content Manger 🧑‍💻💫

Aplicación útil para manejar contenido de distintos tipos.


# Setup

Pasos para ejecutar este proyecto:

1. Tener instalado Node.js v20.11.0
2. Clonar el repo
3. Instalar dependencias en 
    
    * backend (cd backend && yarn install)
    * ui (cd ui && yarn install)
4. Crear archivos .env y copiar el contenido de .env.example
    * cp backend/.env.example backend/.env
    * cp ui/.env.example ui/.env
5. Sobreeescribir los valores de cada .env por valores correspondientes. (En cada .env ejemplo hay comentarios que indican los valores que se deben agregar)

6. Si todo está bien ahora se puede ejecutar el comando `yarn dev` en cada uno de los proyectos.


Si en el backend hay algún error es probable que alguno de los siguientes tenga agún detalle:

1. Credenciales de acceso a la base de datos Mongo incorrectas (se especifica en .env)
2. Alguna variable de entorno no definida (en .env)
3. Algún puerto está ocupado por otra app.




# Usuarios:

## Administrador
Para crear un usuario de tipo administrador hay que hacerlo de forma directa en la base de datos. 

Una opción fácil es registrarse a través de la interfaz web ya sea como Lector o Creador, y una vez que el usuario este en la base de datos hay que ingresar a la colección de usuarios y modificar el tipo de usuario a ``Administrador``

![Ejemplo colleción](https://i.imgur.com/I5oBqCn.png)


## Creador y Lector
Para estos usuarios simplemente se puede registrar a través de la pantalla de login.




# Seguridad
Con respecto a la seguridad en el tema de los JWT hay una duración de 30 días, esto solo se dejo así para que no haya problemas de autorización de las peticiones y no se debe dejar así para un sistema de producción. Lo ideal es tokens de poca duración que se refrescan de forma periodica para tratar de reducir el riesgo en un cao de Man-in-the-middle attack.

