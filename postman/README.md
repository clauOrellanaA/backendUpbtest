# Usar Postman con PostgreSQL en Render

La conexión sigue este recorrido: Postman → API Express → PostgreSQL en Render.
Postman utiliza una URL HTTP de la API, no la URL de PostgreSQL.

## Probar desde tu computadora

1. En el archivo `.env` de la raíz, reemplaza `DATABASE_URL` por la URL externa de conexión de tu base de datos en Render. Mantén esa credencial fuera de Git y Postman.
2. Configura `DB_SSL=true` y `PORT=3000` en ese mismo archivo.
3. Ejecuta `npm run db:init` para crear la tabla de productos si todavía no existe.
4. Ejecuta `npm start` y deja la terminal abierta.
5. Importa `backendUpb.postman_collection.json` en Postman.
6. En las variables de la colección, cambia `baseUrl` a `http://localhost:3000` y guarda.
7. Envía `Health check` y luego `Listar productos`. La primera petición comprueba la API; la segunda también comprueba el acceso a la tabla en PostgreSQL.

## Probar la API desplegada

En la colección, cambia `baseUrl` por la URL pública real del backend desplegado. La dirección incluida en la colección debe verificarse antes de usarla.
El backend desplegado también necesita `DATABASE_URL` y `DB_SSL=true` configurados en su entorno.

## Crear y consultar

Envía `Crear producto`. Cuando recibe HTTP 201, su script guarda automáticamente el identificador en la variable `id` de la colección. Después puedes usar `Obtener producto por id`, `Actualizar producto` y `Eliminar producto`.
Las peticiones de crear, actualizar y eliminar modifican la base de datos conectada.

## Diagnóstico

- Sin respuesta en localhost: comprueba que `npm start` siga ejecutándose y que `baseUrl` use el mismo puerto que `PORT`.
- HTTP 404: comprueba la URL pública del backend y la ruta `/api/productos`.
- HTTP 500 al listar: revisa el error en la terminal del backend; comprueba las credenciales, SSL y que exista la tabla.
- `Health check` responde pero listar falla: el servidor HTTP está disponible, pero todavía hay un problema con la base de datos o su tabla.
