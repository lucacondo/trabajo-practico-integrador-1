Sí. Como rendís a las 14, te conviene estudiar esto en **dos pasadas**: primero dominá el bloque “IMPRESCINDIBLE” porque ahí está lo que más probablemente te salva el 60% teórico; después usá el resto como apunte de consulta para la práctica.

Me basé principalmente en el **Integrador I**, el material de **Express Validator**, **JWT/cookies/bcrypt**, **Relaciones Sequelize** y **Eliminación lógica** que me pasaste. El Integrador I exige justamente Node, Express, Sequelize, MySQL, validaciones, JWT, cookies, bcrypt, relaciones 1:1/1:N/N:M, CRUD, autorización y eliminación lógica. Trabajo Practico Integrador I No pude cargar directamente desde esta sesión el contenido de los dos repositorios públicos de GitHub que pegaste, así que no voy a inventar archivos específicos del repositorio del profesor que no pude verificar.

# PARTE 1 — LO QUE TENÉS QUE SABER SÍ O SÍ

Si solo tenés tiempo para aprender una parte antes del examen, aprendé perfectamente estos conceptos:

| Concepto | Tenés que poder explicar |
|---|---|
| Node.js | Ejecuta JavaScript fuera del navegador, en nuestro caso para construir el backend |
| Express | Framework para crear el servidor y las rutas HTTP |
| API REST | Backend que expone recursos mediante endpoints y métodos HTTP |
| CRUD | Create, Read, Update, Delete |
| Sequelize | ORM que permite trabajar con MySQL mediante JavaScript |
| Modelo | Representación de una tabla de la BD en Sequelize |
| Controller | Contiene la lógica de cada operación |
| Route | Define método + URL y decide qué middleware/controlador ejecutar |
| Middleware | Función que se ejecuta antes del controlador |
| Express-validator | Valida los datos enviados por el cliente |
| JWT | Token firmado usado para identificar al usuario |
| bcrypt | Hashea y compara contraseñas |
| Cookie | Lugar donde guardamos el JWT del usuario |
| Autenticación | Comprobar quién sos |
| Autorización | Comprobar qué tenés permitido hacer |
| FK | Clave foránea que relaciona tablas |
| 1:1 | Un registro se relaciona con uno |
| 1:N | Uno se relaciona con muchos |
| N:M | Muchos se relacionan con muchos |
| Paranoid | Eliminación lógica de Sequelize |
| Git | Control de versiones |
| npm | Gestor de paquetes de Node |

El Integrador I pide explícitamente JWT, cookie `httpOnly`, bcrypt, middlewares de autenticación y autorización, los tres tipos de relaciones y eliminación lógica. Trabajo Practico Integrador I

---

# PARTE 2 — ENTENDÉ EL FLUJO COMPLETO DE UNA API

Esta es probablemente la explicación más importante de todo el examen.

Cuando Postman o un frontend manda una petición:

**Cliente → Ruta → Middlewares → Validaciones → Controller → Modelo Sequelize → MySQL → Controller → Response**

Por ejemplo, conceptualmente:

**Postman quiere crear un artículo**

1. Envía una petición HTTP.
2. Express recibe la petición.
3. La ruta identifica qué operación corresponde.
4. `authMiddleware` comprueba que haya un usuario autenticado.
5. Express-validator comprueba que título, contenido, etc. sean válidos.
6. `validate` revisa si hubo errores.
7. El controller recibe los datos.
8. El controller llama al modelo Article.
9. Sequelize transforma esa operación a SQL.
10. MySQL guarda el artículo.
11. Sequelize devuelve el resultado.
12. El controller responde al cliente con un código HTTP.

Pensalo así:

**Route = puerta**  
**Middleware = guardia de seguridad**  
**Controller = encargado del trabajo**  
**Model = representante de la tabla**  
**Sequelize = traductor JavaScript ↔ SQL**  
**MySQL = donde realmente viven los datos**

---

# PARTE 3 — NODE.JS

## ¿Qué es Node.js?

Es un entorno de ejecución que permite ejecutar JavaScript fuera del navegador.

En nuestro proyecto permite crear:

- servidores;
- APIs;
- conexiones con bases de datos;
- sistemas de autenticación;
- lectura de variables de entorno;
- lógica backend.

Node no es Express.

**Node.js es la plataforma. Express es una biblioteca/framework que funciona sobre Node.**

---

# PARTE 4 — NPM

NPM es el gestor de paquetes de Node.

Sirve para:

- crear un proyecto;
- instalar dependencias;
- guardar qué paquetes usa el proyecto;
- ejecutar scripts.

## Archivos importantes

### `package.json`

Es la configuración principal del proyecto.

Contiene:

- nombre;
- versión;
- scripts;
- dependencias;
- configuración de módulos.

En nuestro proyecto usamos ESModules, por eso configuramos el proyecto para trabajar con `import/export` en lugar de `require/module.exports`.

Esto también aparece como requisito en el material práctico. Trabajo Práctico Integrador IV

### `package-lock.json`

Guarda las versiones exactas de todas las dependencias instaladas.

Sirve para que dos computadoras instalen prácticamente las mismas versiones.

### `node_modules`

Contiene físicamente las dependencias.

No se sube a GitHub porque puede reconstruirse mediante npm.

---

# PARTE 5 — TODAS LAS DEPENDENCIAS IMPORTANTES

El Integrador I pide instalar Express, Sequelize, mysql2, cors, dotenv, jsonwebtoken, bcrypt, cookie-parser y express-validator. Trabajo Practico Integrador I

| Dependencia | Para qué sirve | Cuándo la usamos |
|---|---|---|
| `express` | Crear servidor, rutas, request y response | Toda la API |
| `sequelize` | ORM para trabajar con la BD | Modelos, consultas, relaciones |
| `mysql2` | Driver que permite a Sequelize conectarse con MySQL | Conexión a BD |
| `cors` | Controlar desde qué frontend se puede consumir la API | Comunicación frontend-backend |
| `dotenv` | Leer variables del archivo `.env` | BD, puerto, JWT_SECRET |
| `jsonwebtoken` | Generar y verificar JWT | Login y autenticación |
| `bcrypt` | Hashear y comparar passwords | Registro y login |
| `cookie-parser` | Leer cookies enviadas al servidor | Recuperar JWT desde cookie |
| `express-validator` | Validar datos de entrada | POST, PUT, params |
| `nodemon` | Reiniciar servidor al modificar archivos | Desarrollo, si se utiliza |

---

# PARTE 6 — EXPRESS

Express es el framework encargado de manejar HTTP.

Permite crear:

- servidor;
- rutas;
- middlewares;
- respuestas;
- manejo de JSON;
- conexión entre cliente y lógica del backend.

## Request

La petición recibida suele representarse con `req`.

Los datos pueden venir de varios lugares.

| Lugar | Para qué sirve | Ejemplo conceptual |
|---|---|---|
| `req.body` | Datos enviados en POST/PUT | nombre, email, password |
| `req.params` | Parámetros incluidos en la URL | ID del usuario |
| `req.query` | Parámetros opcionales de búsqueda | página, filtro, orden |
| `req.cookies` | Cookies del navegador | JWT |
| `req.headers` | Información adicional HTTP | Content-Type, Authorization |
| `req.user` | No viene automáticamente; lo agregamos nosotros | Usuario obtenido del JWT |

### Diferencia muy preguntable

Si tenés una URL tipo:

`/users/15`

el `15` es un **param**.

Si fuera conceptualmente:

`/users?page=2`

`page` es un **query parameter**.

---

# PARTE 7 — RESPONSE

`res` representa la respuesta que enviamos al cliente.

Normalmente tiene:

1. código HTTP;
2. datos JSON.

Por ejemplo conceptualmente:

- operación exitosa;
- usuario creado;
- datos encontrados;
- error de validación;
- recurso inexistente.

---

# PARTE 8 — API REST

REST es un estilo para diseñar APIs utilizando recursos y métodos HTTP.

Una buena URL representa el recurso:

- `/users`
- `/articles`
- `/tags`

No debería representar la acción con cosas como:

- `/crearUsuario`;
- `/borrarArticulo`.

La acción ya la representa el método HTTP.

---

# PARTE 9 — CRUD Y MÉTODOS HTTP

| Operación CRUD | HTTP | Significado |
|---|---|---|
| Create | POST | Crear |
| Read | GET | Leer |
| Update | PUT/PATCH | Actualizar |
| Delete | DELETE | Eliminar |

### GET

Consulta información.

No debería modificar datos.

### POST

Crea normalmente un recurso nuevo.

### PUT

Actualiza un recurso existente.

En las prácticas de la materia usamos PUT incluso permitiendo actualizaciones parciales mediante validaciones opcionales.

### DELETE

Elimina un recurso.

Puede ser:

- eliminación física;
- eliminación lógica.

---

# PARTE 10 — CÓDIGOS HTTP: MEMORIZALOS

Creo que cuando decís “números de protocolos” te referís principalmente a estos códigos HTTP.

El material del Integrador diferencia explícitamente `400`, `401`, `403`, `404` y `500`. Trabajo Practico Integrador I

| Código | Nombre | Cuándo usarlo |
|---:|---|---|
| 200 | OK | GET/PUT/DELETE exitoso |
| 201 | Created | Recurso creado correctamente |
| 400 | Bad Request | Validación incorrecta |
| 401 | Unauthorized | No está autenticado |
| 403 | Forbidden | Está autenticado pero no tiene permiso |
| 404 | Not Found | No existe el recurso |
| 409 | Conflict | Conflicto como duplicidad; aunque nuestra materia muchas veces usa 400 |
| 500 | Internal Server Error | Error inesperado del servidor |

## Diferencia 401 vs 403

Pregunta MUY probable.

### 401

“No sé quién sos / no estás autenticado”.

Ejemplo: intentás entrar sin JWT.

### 403

“Sé quién sos, pero no tenés permiso”.

Ejemplo: sos usuario normal intentando entrar a una ruta exclusiva del admin.

**Autenticación falla → 401.**  
**Autorización falla → 403.**

---

# PARTE 11 — PUERTOS IMPORTANTES

| Servicio | Puerto típico en nuestro trabajo |
|---|---:|
| Backend Express | 3000 |
| Frontend Vite | 5173 |
| MySQL | 3306 |
| HTTP estándar | 80 |
| HTTPS estándar | 443 |

El Integrador II, por ejemplo, indica Vite en `localhost:5173` y exige que el backend permita ese origen mediante CORS. Trabajo Práctico Integrador N° …

---

# PARTE 12 — ESTRUCTURA DE CARPETAS DEL BACKEND

Esta arquitectura es fundamental.

| Carpeta/archivo | Responsabilidad |
|---|---|
| `app.js` | Inicia y configura la aplicación |
| `src/config` | Configuración, principalmente BD |
| `src/models` | Define tablas y relaciones |
| `src/controllers` | Lógica de negocio |
| `src/routes` | Define endpoints |
| `src/middlewares` | Código que se ejecuta antes del controller |
| `src/helpers` | Funciones reutilizables |
| `.env` | Variables sensibles/locales |
| `.env.example` | Ejemplo de variables sin secretos |
| `.gitignore` | Archivos que Git debe ignorar |
| `package.json` | Dependencias y configuración Node |

---

# PARTE 13 — APP.JS

Es el punto central del backend.

Su trabajo conceptual es:

1. cargar configuración;
2. crear aplicación Express;
3. configurar CORS;
4. habilitar lectura de JSON;
5. habilitar cookies;
6. registrar las rutas;
7. conectar la base;
8. levantar servidor.

No debería contener toda la lógica CRUD.

La lógica debe estar modularizada.

---

# PARTE 14 — CONFIG/DATABASE

`database.js` centraliza la conexión con MySQL mediante Sequelize.

Necesita datos como:

- nombre BD;
- usuario;
- contraseña;
- host;
- dialecto.

## `authenticate()`

Comprueba que Sequelize pueda conectarse con la BD.

## `sync()`

Sincroniza los modelos Sequelize con las tablas.

Conceptualmente:

**Modelo JavaScript → Sequelize → estructura MySQL**

### Cuidado con `force`

Si se usa una sincronización forzada que recrea tablas, se pueden perder datos.

Para el proyecto normal queríamos sincronizar sin destruir las tablas.

---

# PARTE 15 — `.ENV`

El `.env` almacena configuración que puede variar entre computadoras o ser sensible.

En nuestro proyecto:

- DB_HOST;
- DB_USER;
- DB_PASSWORD;
- DB_NAME;
- JWT_SECRET;
- PORT.

La consigna exige precisamente esas variables. Trabajo Practico Integrador I

### ¿Por qué no se sube?

Porque podría contener:

- contraseñas;
- secretos JWT;
- credenciales.

Por eso `.env` debe estar en `.gitignore`.

### `.env.example`

Sí puede subirse porque muestra qué variables necesita el proyecto pero sin secretos reales.

---

# PARTE 16 — SEQUELIZE

Sequelize es un **ORM**.

ORM significa Object-Relational Mapping.

Permite representar una tabla mediante un objeto/modelo JavaScript.

En vez de escribir todas las consultas SQL manualmente, podemos trabajar mediante métodos de Sequelize.

---

# PARTE 17 — MODELOS

Un modelo define cómo es una tabla.

Describe cosas como:

- columnas;
- tipos de datos;
- obligatoriedad;
- unicidad;
- valores por defecto;
- relaciones;
- timestamps.

## Tipos comunes

| Sequelize | MySQL conceptualmente |
|---|---|
| INTEGER | entero |
| STRING | VARCHAR |
| TEXT | texto largo |
| BOOLEAN | verdadero/falso |
| DATE | fecha/hora |
| DATEONLY | fecha |
| ENUM | conjunto de valores permitidos |

---

# PARTE 18 — PROPIEDADES IMPORTANTES DE MODELOS

### `allowNull`

Define si puede ser nulo.

`false` significa obligatorio a nivel de base de datos.

### `unique`

Impide duplicados.

Ejemplos:

- username;
- email;
- nombre de tag.

### Primary key

Identifica exclusivamente cada registro.

Normalmente usamos `id`.

### Auto increment

Hace que MySQL genere el siguiente ID.

### Default value

Establece un valor cuando el cliente no lo manda.

Ejemplo:

- role = user;
- status = published.

---

# PARTE 19 — MÉTODOS MÁS IMPORTANTES DE SEQUELIZE

Memorizá esta tabla.

| Método | Para qué sirve |
|---|---|
| `create()` | Crear registro |
| `findAll()` | Buscar todos |
| `findByPk()` | Buscar por clave primaria |
| `findOne()` | Buscar uno según condición |
| `update()` | Actualizar |
| `destroy()` | Eliminar |
| `findOrCreate()` | Buscar o crear |
| `count()` | Contar |
| `restore()` | Restaurar eliminado lógicamente si el modelo es paranoid |

## `findByPk` vs `findOne`

### `findByPk`

Se usa cuando buscás específicamente por clave primaria.

Ejemplo conceptual:

“buscar usuario ID 5”.

### `findOne`

Cuando buscás por otra condición.

Ejemplo:

“buscar usuario cuyo email sea X”.

---

# PARTE 20 — `WHERE`

`where` establece condiciones.

Conceptualmente sería equivalente al `WHERE` de SQL.

Lo usamos para:

- buscar username;
- buscar email;
- encontrar artículos de un usuario;
- comprobar duplicados;
- excluir un determinado ID al actualizar.

---

# PARTE 21 — `Op.ne`

`Op.ne` significa **not equal**.

Lo usamos mucho en validaciones de actualización.

¿Por qué?

Supongamos que el usuario 5 tiene email A y quiere modificar su nombre sin cambiar su email.

Al comprobar si el email está repetido, no debemos encontrar al propio usuario 5 y decirle “email duplicado”.

Entonces buscamos:

“¿Existe otro usuario con este email cuyo ID NO sea este usuario?”

Ese “NO sea” es `Op.ne`.

---

# PARTE 22 — RELACIONES EN SEQUELIZE

Tu material dice que Sequelize soporta:

- 1:1;
- 1:N;
- N:M;

y usa principalmente `hasOne`, `belongsTo`, `hasMany` y `belongsToMany`. Relaciones en Sequelize

## 1:1 — Uno a uno

Ejemplo de nuestro proyecto:

**User ↔ Profile**

Un usuario tiene un perfil.

Un perfil pertenece a un usuario.

Métodos conceptuales:

- User “hasOne” Profile;
- Profile “belongsTo” User.

La clave foránea queda en Profile: `user_id`.

El material remarca que `hasOne + belongsTo` representa 1:1. Relaciones en Sequelize

---

# PARTE 23 — 1:N — UNO A MUCHOS

Nuestro caso:

**User → Articles**

Un User puede tener muchos Article.

Cada Article pertenece a un solo User.

Métodos:

- User `hasMany` Article;
- Article `belongsTo` User.

La FK queda del lado “muchos”:

`Article.user_id`

El material explica exactamente esa lógica para `hasMany` y dónde queda la FK. Relaciones en Sequelize

---

# PARTE 24 — N:M — MUCHOS A MUCHOS

Nuestro caso:

**Article ↔ Tag**

Un artículo puede tener muchos tags.

Un tag puede pertenecer a muchos artículos.

Necesitamos una tabla intermedia:

**ArticleTag**

contiene:

- article_id;
- tag_id.

Sequelize usa `belongsToMany` en ambos modelos.

El material confirma que una relación N:M necesita una tabla intermedia con las dos claves foráneas. Relaciones en Sequelize

---

# PARTE 25 — FOREIGN KEY

Una FK es una clave foránea.

Sirve para relacionar una fila con otra tabla.

Ejemplo:

Article tiene `user_id = 7`.

Eso significa:

“este Article pertenece al User cuyo ID es 7”.

---

# PARTE 26 — `as` O ALIAS

Un alias sirve para darle un nombre lógico a una relación.

Ejemplos de nuestro proyecto:

- `profile`;
- `user`;
- `articles`;
- `author`;
- `tags`.

Después ese mismo alias debe utilizarse al incluir relaciones.

Si la asociación usa alias `author`, no conviene intentar incluirla con otro nombre.

---

# PARTE 27 — `include`

Permite cargar información relacionada.

Sin include podrías obtener:

“Article”.

Con include de author podrías obtener:

“Article + información del User autor”.

Es el equivalente conceptual a realizar una consulta relacionada/JOIN.

---

# PARTE 28 — MODELOS DEL INTEGRADOR I

Nuestro sistema terminó teniendo cinco modelos principales.

## User

Representa la cuenta.

Contiene conceptualmente:

- id;
- username;
- email;
- password;
- role;
- timestamps;
- deletedAt.

Role puede diferenciar:

- user;
- admin.

## Profile

Datos personales del User:

- first_name;
- last_name;
- biography;
- avatar_url;
- birth_date;
- user_id.

## Article

Publicación del blog:

- id;
- title;
- content;
- excerpt;
- status;
- user_id.

## Tag

Etiqueta:

- id;
- name.

## ArticleTag

Tabla intermedia:

- article_id;
- tag_id.

---

# PARTE 29 — AUTENTICACIÓN VS AUTORIZACIÓN

Esta es de examen.

## Autenticación

Responde:

**¿Quién sos?**

Ejemplo:

Login correcto → JWT válido → usuario autenticado.

## Autorización

Responde:

**¿Qué podés hacer?**

Ejemplo:

Sos User, pero esa ruta requiere Admin → 403.

---

# PARTE 30 — LOGIN COMPLETO

Entendelo de memoria.

### Registro

1. cliente envía username/email/password/perfil;
2. se validan datos;
3. se comprueba unicidad;
4. bcrypt transforma el password a hash;
5. se crea User;
6. se crea Profile;
7. password original nunca se guarda.

### Login

1. cliente envía username + password;
2. buscamos User;
3. bcrypt compara password recibido con hash;
4. si no coincide → 401;
5. si coincide → generamos JWT;
6. JWT se guarda en cookie;
7. cliente queda autenticado.

### Petición protegida

1. navegador manda cookie;
2. cookie-parser permite leerla;
3. authMiddleware toma JWT;
4. JWT se verifica;
5. información del token se pone en `req.user`;
6. controller puede continuar.

### Logout

Se borra la cookie.

El material oficial muestra exactamente la idea de ruta protegida mediante middleware y logout eliminando la cookie. Autenticación y autorización de…

---

# PARTE 31 — JWT

JWT significa **JSON Web Token**.

Es un estándar para transmitir información firmada.

Tu material lo define como estándar RFC 7519 y explica que la información puede verificarse porque está firmada digitalmente. Autenticación y autorización de…

## Tres partes

Un JWT tiene:

**Header.Payload.Signature**

### Header

Describe el token y algoritmo utilizado.

### Payload

Contiene información.

En nuestro caso podría identificar:

- id;
- username;
- role.

### Signature

Permite verificar que el token no fue modificado.

## MUY IMPORTANTE

**JWT está firmado, no necesariamente cifrado.**

No metas cosas sensibles en el payload, como passwords.

---

# PARTE 32 — JWT_SECRET

Es el secreto utilizado para firmar/verificar los tokens.

Debe permanecer privado.

Por eso está en `.env`.

Si alguien modifica el payload de un JWT sin conocer el secreto correcto, la firma deja de ser válida.

---

# PARTE 33 — BCRYPT

Las contraseñas no deben almacenarse en texto plano.

bcrypt permite:

### Hash

Transformar la contraseña en un valor irreversible diseñado para almacenarse.

### Compare

Comparar:

“password que el usuario acaba de escribir”

contra:

“hash guardado en la BD”.

No necesitamos “desencriptar” el hash.

bcrypt realiza la comparación.

---

# PARTE 34 — HASH ≠ CIFRADO

Otra pregunta típica.

### Cifrado

Está pensado para poder descifrarse con una clave.

### Hash

Es una transformación unidireccional.

Las contraseñas se **hashean**, no deberían guardarse simplemente cifradas.

---

# PARTE 35 — COOKIES

Una cookie es información guardada por el navegador y asociada a un sitio.

Nosotros guardamos el JWT en una cookie.

El material utiliza `cookie-parser` para leerlas. Autenticación y autorización de…

## Propiedades importantes

| Propiedad | Función |
|---|---|
| `httpOnly` | JavaScript del navegador no puede leer la cookie directamente |
| `secure` | Solo enviarla por HTTPS |
| `sameSite` | Controla envío cross-site y ayuda contra CSRF |
| `maxAge` | Tiempo de vida |
| `expires` | Fecha de expiración |
| `path` | Rutas donde se utiliza |

El material también destaca `SameSite` y `MaxAge/Expires`. Autenticación y autorización de…

---

# PARTE 36 — COOKIE-PARSER

Express no interpreta automáticamente todas las cookies como nosotros necesitamos.

`cookie-parser` permite acceder fácilmente a las cookies de la petición.

Por eso nuestro middleware puede encontrar el JWT.

---

# PARTE 37 — CORS

CORS significa Cross-Origin Resource Sharing.

Define qué orígenes pueden comunicarse con el backend desde un navegador.

Por ejemplo:

Frontend:

`localhost:5173`

Backend:

`localhost:3000`

Son orígenes diferentes.

Entonces Express debe permitir al frontend acceder.

Cuando usamos cookies entre frontend/backend también hay que permitir credenciales. El Integrador II exige explícitamente habilitar CORS para `localhost:5173` con credenciales. Trabajo Práctico Integrador N° …

---

# PARTE 38 — EXPRESS-VALIDATOR

Esto tiene altas probabilidades de aparecer.

Sirve para validar y sanitizar datos antes del controller.

El material además recomienda separar validaciones, middleware de errores y controlador para mantener las rutas limpias. Express Validator

## Validadores que tenés que reconocer

| Validador | Función |
|---|---|
| `body()` | Validar req.body |
| `param()` | Validar req.params |
| `notEmpty()` | No puede estar vacío |
| `isLength()` | Longitud |
| `isEmail()` | Email válido |
| `isInt()` | Entero |
| `isIn()` | Valor dentro de una lista |
| `isURL()` | URL válida |
| `isISO8601()` | Fecha válida |
| `isAlphanumeric()` | Letras y números |
| `matches()` | Expresión regular |
| `trim()` | Quitar espacios extremos |
| `normalizeEmail()` | Normalizar email |
| `optional()` | Campo no obligatorio |
| `custom()` | Validación personalizada |

---

# PARTE 39 — `validationResult`

Las reglas validan.

Pero después necesitamos saber:

**¿hubo errores?**

Ahí entra `validationResult`.

El middleware `validate`:

1. obtiene errores;
2. si hay errores → responde 400;
3. si no hay → llama a `next()`.

---

# PARTE 40 — `next()`

En Express, un middleware necesita indicarle a Express:

“terminé, continuá con el siguiente”.

Eso se hace mediante `next()`.

Si devolvemos una respuesta de error, ya no llamamos `next()`.

---

# PARTE 41 — `matchedData()`

Importantísimo.

Después de validar, `matchedData()` devuelve solamente los campos que fueron validados.

El material destaca tres ventajas:

- seguridad;
- limpieza;
- consistencia. Express Validator

Ejemplo conceptual:

El usuario manda:

- username;
- email;
- password;
- `soyAdmin: true`.

Si `soyAdmin` nunca fue un campo validado, `matchedData()` puede evitar que ese dato inesperado llegue al controller.

---

# PARTE 42 — VALIDACIONES CUSTOM

Sirven cuando las validaciones estándar no alcanzan.

Ejemplos:

- comprobar que username no exista;
- comprobar que email sea único;
- comprobar que Tag exista;
- comprobar que Article exista;
- comprobar que user_id corresponda al usuario autenticado.

Estas validaciones pueden consultar la base mediante Sequelize.

---

# PARTE 43 — VALIDACIONES EN UPDATE

En POST de creación muchos campos son obligatorios.

En PUT no.

Porque tal vez quiero cambiar solamente:

“biography”.

No debería tener que volver a mandar username, email, password y todo lo demás.

Por eso usamos:

**validaciones opcionales**.

El material de eliminación/actualización dice expresamente que PUT debe utilizar `.optional()` y `matchedData()` para trabajar solo con los campos enviados y validados. Práctica de Eliminación Lógica …

---

# PARTE 44 — MIDDLEWARE

Un middleware es una función que está “en el medio” de request y controller.

Puede:

- leer request;
- modificar request;
- bloquear;
- devolver respuesta;
- llamar `next()`.

En nuestro proyecto usamos principalmente:

### `authMiddleware`

Comprueba JWT.

### `adminMiddleware`

Comprueba rol admin.

### `ownerMiddleware`

Comprueba si el Article pertenece al usuario.

### `validate`

Comprueba errores de express-validator.

---

# PARTE 45 — AUTH MIDDLEWARE

Su trabajo conceptual:

1. buscar cookie JWT;
2. si no existe → 401;
3. verificar JWT;
4. si es inválido → 401;
5. decodificar payload;
6. guardar datos en `req.user`;
7. llamar `next()`.

---

# PARTE 46 — ADMIN MIDDLEWARE

Se ejecuta después del authMiddleware.

Primero necesitamos saber quién es el usuario.

Después comprobamos:

“¿role === admin?”

Si no:

403.

---

# PARTE 47 — OWNER MIDDLEWARE

Sirve para recursos que pertenecen a usuarios.

Ejemplo:

Article 10 pertenece a User 5.

Si User 8 intenta modificarlo:

403.

Si User 5 intenta modificarlo:

permitido.

En nuestro TP también permitíamos administrador cuando correspondía.

---

# PARTE 48 — CONTROLLERS

Los controllers contienen la lógica de negocio.

Normalmente hacen:

1. obtener datos validados;
2. consultar modelo;
3. comprobar si existe;
4. crear/actualizar/eliminar;
5. responder;
6. manejar errores.

## ¿Qué NO debería hacer una route?

No debería contener 50 líneas de lógica de BD.

Route conecta piezas.

Controller realiza el trabajo.

---

# PARTE 49 — TRY/CATCH

Trabajamos con:

- BD;
- JWT;
- bcrypt;
- operaciones asíncronas.

Todo eso puede fallar.

`try` contiene operación que podría fallar.

`catch` captura el error.

Así evitamos que el servidor explote sin controlar la respuesta.

---

# PARTE 50 — ASYNC/AWAIT

Las operaciones con BD son asíncronas.

`async` indica una función asíncrona.

`await` espera una Promise.

Ejemplos conceptuales:

- esperar búsqueda;
- esperar creación;
- esperar hash;
- esperar transacción.

---

# PARTE 51 — TRANSACCIONES

Las usamos cuando varias operaciones deben comportarse como una sola unidad.

Nuestro registro crea:

1. User;
2. Profile.

Supongamos:

User se crea correctamente.

Profile falla.

Sin transacción quedaría un User sin Profile.

Con transacción:

- si todo funciona → commit;
- si algo falla → rollback.

## ACID, explicación útil

Una transacción busca mantener consistencia.

Lo fundamental para el examen práctico es:

**commit confirma**.

**rollback deshace**.

---

# PARTE 52 — ELIMINACIÓN FÍSICA VS LÓGICA

### Física

La fila desaparece de la base.

### Lógica

La fila permanece pero queda marcada como eliminada.

El material define eliminación lógica exactamente así: no borrar físicamente sino marcar el registro mediante un campo adicional para conservar historial. Práctica de Eliminación Lógica …

---

# PARTE 53 — PARANOID

En Sequelize, `paranoid` activa eliminación lógica.

Requiere timestamps.

Cuando utilizás `destroy()`:

en vez de borrar físicamente,

Sequelize coloca fecha en `deletedAt`.

Las consultas normales dejan de mostrar esa fila automáticamente. Práctica de Eliminación Lógica …

## `deletedAt = null`

Registro activo.

## `deletedAt = fecha`

Registro eliminado lógicamente.

---

# PARTE 54 — CASCADE

Cascade significa que una operación sobre un registro padre afecta datos dependientes.

Ejemplo conceptual:

se elimina físicamente un Article → deberían desaparecer sus asociaciones ArticleTag.

O:

se elimina un User → determinadas relaciones dependientes pueden eliminarse.

## Cuidado con paranoid

Si Article tiene eliminación lógica:

no existe un DELETE físico.

Entonces el cascade SQL puede no ejecutarse automáticamente.

Por eso en nuestro Integrador hicimos explícitamente la eliminación de asociaciones ArticleTag antes de hacer la eliminación lógica del Article.

---

# PARTE 55 — INTEGRIDAD REFERENCIAL

Significa mantener relaciones válidas.

No debería existir:

Article.user_id = 999

si User 999 no existe.

Las FK ayudan a asegurar esto.

También nosotros validamos existencia antes de crear relaciones.

---

# PARTE 56 — NUESTRO PROYECTO: FLUJO POR COMMITS

Este es el recorrido que hicimos. Si el profesor te pregunta “¿cómo construirías el proyecto desde cero?”, esta secuencia es excelente.

| Commit | Qué hicimos | Qué aprendiste |
|---:|---|---|
| 1 | Inicialización, dependencias y servidor | Node, npm, Express, módulos |
| 2 | Conexión Sequelize-MySQL | Config BD, authenticate, sync |
| 3 | User + Profile | modelos y relación 1:1 |
| 4 | Article + Tag + ArticleTag | 1:N y N:M |
| 5 | Helpers bcrypt + JWT | seguridad y reutilización |
| 6 | Express-validator de auth | validación y matchedData |
| 7 | Register + Login | bcrypt + JWT + cookie |
| 8 | auth/admin middleware + profile/logout | protección de rutas |
| 9 | CRUD Tags | admin + validaciones |
| 10 | CRUD Articles | owner + roles |
| 11 | ArticleTag | relaciones N:M |
| 12 | CRUD Users administrativo | permisos + soft delete |
| 13 | Update Profile + eliminación asociaciones | PUT parcial + eliminación lógica/cascade |

Esto sigue el enfoque exigido por el Integrador, que pedía trabajar en `proyecto-integrador`, mínimo diez commits y luego integrarlo a `develop` y finalmente `main`. Trabajo Practico Integrador I

---

# PARTE 57 — COMMIT 1 EN DETALLE

## Objetivo

Crear la base del proyecto.

Conceptos:

- npm;
- package.json;
- dependencias;
- ESModules;
- Express;
- servidor;
- middleware JSON;
- CORS;
- cookies;
- `.env`;
- `.gitignore`.

Resultado:

ya teníamos una API capaz de escuchar peticiones.

---

# PARTE 58 — COMMIT 2

Configuramos Sequelize.

Responsabilidad de database:

- tomar variables `.env`;
- conectarse con MySQL;
- comprobar conexión;
- sincronizar modelos.

Este archivo no debería contener routes ni controllers.

---

# PARTE 59 — COMMIT 3

Creamos User y Profile.

Aprendimos relación:

**1:1**

User tiene Profile.

Profile pertenece a User.

FK:

Profile.user_id.

---

# PARTE 60 — COMMIT 4

Creamos:

- Article;
- Tag;
- ArticleTag.

Relaciones:

User 1:N Article.

Article N:M Tag.

ArticleTag resuelve la N:M.

---

# PARTE 61 — COMMIT 5

Creamos helpers.

## ¿Qué es un helper?

Una función reutilizable que no pertenece necesariamente a un recurso concreto.

Tuvimos:

### bcrypt helper

- hash password;
- compare password.

### JWT helper

- generate token;
- verify token.

Ventaja:

el controller no necesita conocer todos los detalles internos.

---

# PARTE 62 — COMMIT 6

Creamos validaciones de autenticación.

Aprendimos:

- body validators;
- custom validators;
- validationResult;
- matchedData;
- middleware validate.

Separar validaciones del controller hace la aplicación más modular.

---

# PARTE 63 — COMMIT 7

Registro + login.

Aquí se unieron varios conceptos.

Registro:

**validación → bcrypt → User → Profile**

Login:

**buscar User → bcrypt.compare → JWT → cookie**

Este flujo es clave.

---

# PARTE 64 — COMMIT 8

Creamos protección.

### authMiddleware

¿Está logueado?

### adminMiddleware

¿Es administrador?

### Profile

Devuelve usuario autenticado.

### Logout

Borra cookie.

---

# PARTE 65 — COMMIT 9

CRUD Tag.

Tags eran administrados principalmente por admin.

Acá reforzamos:

- rutas protegidas;
- IDs;
- unique;
- custom validation;
- autorización.

---

# PARTE 66 — COMMIT 10

CRUD Article.

Este commit agrega una idea nueva:

**ownership**.

No solo importa estar autenticado.

También importa ser dueño del artículo.

Por eso agregamos ownerMiddleware.

---

# PARTE 67 — COMMIT 11

ArticleTag.

Objetivo:

agregar o quitar Tags de un Article.

La relación pertenece al N:M.

Antes de crear la asociación comprobamos:

- article existe;
- tag existe;
- usuario es autor;
- relación no existe ya.

---

# PARTE 68 — COMMIT 12

CRUD administrativo de Users.

Todas esas rutas requieren:

1. autenticación;
2. autorización admin.

Cuando se crea usuario desde admin también se hashea password.

Cuando se elimina User, nuestro modelo usa eliminación lógica.

---

# PARTE 69 — COMMIT 13

Actualización de Profile.

Usamos:

- PUT;
- optional;
- matchedData;
- req.user.

Además corregimos la eliminación Article:

primero eliminamos asociaciones ArticleTag y luego eliminamos lógicamente el Article.

---

# PARTE 70 — ENDPOINTS DE AUTH

| Método | Endpoint | Función |
|---|---|---|
| POST | `/api/auth/register` | Registrar |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/profile` | Ver usuario autenticado |
| PUT | `/api/auth/profile` | Actualizar Profile |
| POST | `/api/auth/logout` | Logout |

---

# PARTE 71 — USERS

| Método | Endpoint | Permiso |
|---|---|---|
| GET | `/api/users` | Admin |
| GET | `/api/users/:id` | Admin |
| POST | `/api/users` | Admin |
| PUT | `/api/users/:id` | Admin |
| DELETE | `/api/users/:id` | Admin |

---

# PARTE 72 — TAGS

| Método | Endpoint | Permiso |
|---|---|---|
| POST | `/api/tags` | Admin |
| GET | `/api/tags` | Autenticado |
| GET | `/api/tags/:id` | Admin |
| PUT | `/api/tags/:id` | Admin |
| DELETE | `/api/tags/:id` | Admin |

---

# PARTE 73 — ARTICLES

| Método | Endpoint | Función |
|---|---|---|
| POST | `/api/articles` | Crear |
| GET | `/api/articles` | Publicados |
| GET | `/api/articles/:id` | Obtener |
| GET | `/api/articles/user` | Propios |
| GET | `/api/articles/user/:id` | Propio por ID |
| PUT | `/api/articles/:id` | Autor/admin |
| DELETE | `/api/articles/:id` | Autor/admin |

---

# PARTE 74 — ARTICLE-TAGS

| Método | Endpoint | Función |
|---|---|---|
| POST | `/api/articles-tags` | Asociar Tag |
| DELETE | `/api/articles-tags/:id` | Quitar asociación |

---

# PARTE 75 — GIT: CONCEPTOS

Git es un sistema de control de versiones.

Guarda cambios mediante commits.

## Repository

Proyecto controlado por Git.

## Commit

Fotografía lógica del estado del proyecto.

## Branch

Línea independiente de desarrollo.

## Merge

Combina ramas.

## Remote

Repositorio remoto, como GitHub.

## Origin

Nombre convencional que Git da al remoto principal.

---

# PARTE 76 — NUESTRO FLUJO DE RAMAS

La consigna define:

**main → develop → proyecto-integrador**

Trabajo Practico Integrador I

## main

Código estable/final.

## develop

Rama de integración.

## proyecto-integrador

Donde desarrollamos las funcionalidades.

Al terminar:

**proyecto-integrador → merge develop → merge main**

---

# PARTE 77 — COMANDOS GIT QUE USAMOS

Sin entrar en sintaxis complicada, memorizá función de cada uno:

| Comando | Qué hace |
|---|---|
| `git init` | Inicializa repo local |
| `git clone URL` | Descarga repo existente |
| `git status` | Muestra estado de archivos/rama |
| `git add archivo` | Lleva cambio al staging |
| `git add .` | Agrega todos los cambios |
| `git commit -m "mensaje"` | Guarda cambios |
| `git log` | Historial |
| `git log --oneline` | Historial resumido |
| `git branch` | Ver ramas locales |
| `git branch -a` | Ver locales y remotas |
| `git switch rama` | Cambiar rama |
| `git switch -c rama` | Crear y cambiar |
| `git fetch` | Descargar referencias remotas sin merge |
| `git pull` | Fetch + integración de cambios remotos |
| `git push` | Subir commits |
| `git merge rama` | Fusionar otra rama en la actual |
| `git diff` | Comparar cambios |
| `git remote -v` | Ver remotos |
| `git rev-list --count A..B` | Contar commits de B que no están en A |

---

# PARTE 78 — `GIT ADD`, `COMMIT`, `PUSH`

Memorizá este flujo:

**Modificar → add → commit → push**

### Add

Prepara cambios.

### Commit

Guarda esos cambios en el historial local.

### Push

Los envía a GitHub.

Un error común es creer que commit ya subió a GitHub.

No.

Commit es local.

Push es remoto.

---

# PARTE 79 — FETCH VS PULL

### Fetch

Descarga información del remoto.

No integra automáticamente los cambios en tu código actual.

### Pull

Obtiene cambios y trata de integrarlos.

Conceptualmente:

**pull ≈ fetch + merge/rebase según configuración**

---

# PARTE 80 — MERGE

Primero te ubicás en la rama que va a RECIBIR cambios.

Si querés:

proyecto-integrador → develop

te parás en:

develop.

Luego mergeás proyecto-integrador.

Pregunta típica:

**¿hacia dónde ocurre el merge?**

Siempre hacia la rama actualmente activa.

---

# PARTE 81 — CONFLICTO DE MERGE

Sucede cuando Git no puede decidir cómo combinar cambios.

Normalmente porque dos ramas modificaron la misma zona.

Hay que:

1. abrir archivos;
2. decidir contenido;
3. eliminar marcadores de conflicto;
4. guardar;
5. add;
6. commit.

---

# PARTE 82 — COMANDOS NPM

| Comando | Función |
|---|---|
| `npm init` | Inicializar proyecto |
| `npm init -y` | Inicializar aceptando defaults |
| `npm install paquete` | Instalar dependencia |
| `npm install` | Instalar todo lo indicado en package.json |
| `npm uninstall paquete` | Eliminar dependencia |
| `npm run dev` | Ejecutar script dev definido en package.json |
| `npm start` | Ejecutar script start |
| `npm list` | Ver paquetes instalados |
| `npm --version` | Ver versión npm |

---

# PARTE 83 — ¿QUÉ PASA CUANDO CLONÁS UN REPO?

GitHub normalmente no contiene `node_modules`.

Entonces:

1. clone;
2. entrar carpeta;
3. npm install;
4. crear/configurar `.env`;
5. crear BD si hace falta;
6. npm run dev.

El `.env` tampoco debería venir de GitHub.

---

# PARTE 84 — POSTMAN

Sirve para probar una API sin necesitar frontend.

Podés:

- seleccionar método;
- escribir URL;
- enviar JSON;
- manejar cookies;
- ver status;
- ver response.

Es fundamental para separar problemas:

Si Postman funciona y React no:

el backend probablemente está bien y el problema está en frontend/configuración.

---

# PARTE 85 — JSON

Formato común para intercambiar información entre frontend y backend.

Puede representar:

- objetos;
- strings;
- números;
- booleanos;
- arrays;
- null.

Express puede convertir JSON de request a `req.body` cuando está habilitado el middleware correspondiente.

---

# PARTE 86 — SEGURIDAD: QUÉ NUNCA HACER

No deberías:

- guardar password plano;
- devolver password en respuestas;
- subir `.env`;
- confiar directamente en `req.body`;
- permitir que un user se autoconvierta en admin;
- permitir modificar artículos ajenos;
- confiar en un JWT sin verificar firma.

---

# PARTE 87 — POSIBLES PREGUNTAS DE EXAMEN

| Pregunta | Respuesta corta |
|---|---|
| ¿Qué es Express? | Framework web para Node que maneja rutas y HTTP |
| ¿Qué es Sequelize? | ORM para trabajar con BD relacionales mediante JS |
| ¿Qué es CRUD? | Create, Read, Update, Delete |
| ¿Diferencia autenticación/autorización? | Quién sos / qué podés hacer |
| ¿Qué es JWT? | Token JSON firmado usado para transmitir identidad/información verificable |
| ¿JWT cifra información? | No necesariamente; principalmente la firma |
| ¿Para qué sirve bcrypt? | Hashear y comparar contraseñas |
| ¿Qué es middleware? | Función intermedia antes del controller |
| ¿Qué es controller? | Lógica de negocio de la petición |
| ¿Qué hace route? | Une método+URL con middleware/controller |
| ¿Qué es model? | Representación de una tabla |
| ¿Qué es FK? | Campo que referencia otro registro |
| ¿1:1? | hasOne + belongsTo |
| ¿1:N? | hasMany + belongsTo |
| ¿N:M? | belongsToMany + tabla intermedia |
| ¿Qué hace matchedData? | Devuelve solo campos validados |
| ¿Qué hace optional? | Solo valida si el campo fue enviado |
| ¿Qué hace custom? | Permite crear validaciones propias |
| ¿401 vs 403? | Sin autenticación / sin permiso |
| ¿404? | Recurso no encontrado |
| ¿500? | Error interno inesperado |
| ¿paranoid? | Activa soft delete |
| ¿deletedAt? | Marca cuándo se eliminó lógicamente |
| ¿destroy con paranoid? | Actualiza deletedAt, no borra fila |
| ¿findByPk? | Buscar por primary key |
| ¿findOne? | Buscar uno por una condición |
| ¿findAll? | Buscar varios |
| ¿include? | Traer relaciones |
| ¿alias? | Nombre con el que identificamos una asociación |
| ¿transaction? | Agrupa operaciones que deben completarse juntas |
| ¿rollback? | Revierte transacción |
| ¿commit de BD? | Confirma transacción |
| ¿commit Git? | Guarda versión en historial local |
| ¿push? | Envía commits al remoto |
| ¿pull? | Trae e integra cambios |
| ¿fetch? | Actualiza información remota sin integrar automáticamente |
| ¿merge? | Fusiona ramas |

---

# PARTE 88 — CÓMO AFRONTAR LA PARTE PRÁCTICA

Si en VS Code te dicen “creá una API CRUD con User/Product/Movie/etc.”, no empieces improvisando.

Seguí siempre este orden:

1. **Leer entidades y reglas.**
2. **Crear proyecto Node.**
3. **Configurar package.json y ESModules.**
4. **Instalar dependencias.**
5. **Crear `.gitignore` y `.env`.**
6. **Crear estructura `config/models/controllers/routes/middlewares`.**
7. **Configurar Express.**
8. **Configurar Sequelize.**
9. **Crear base MySQL.**
10. **Crear modelo.**
11. **Crear relaciones si existen.**
12. **Crear validaciones.**
13. **Crear controller CRUD.**
14. **Crear routes.**
15. **Conectar routes a app.**
16. **Levantar servidor.**
17. **Probar cada endpoint en Postman.**
18. **Revisar códigos HTTP.**
19. **Git add → commit → push.**

No intentes hacer seguridad o relaciones si todavía ni levanta el servidor.

---

# PARTE 89 — DIAGNÓSTICO RÁPIDO CUANDO ALGO FALLA

### Servidor ni arranca

Mirar primero:

- imports;
- exports;
- nombres duplicados;
- rutas de archivos;
- sintaxis.

Eso fue exactamente lo que te pasó con:

- import repetido;
- export que faltaba;
- validación puesta en archivo incorrecto.

### Servidor arranca pero BD falla

Mirar:

- XAMPP/MySQL;
- DB_NAME;
- DB_USER;
- DB_PASSWORD;
- DB_HOST;
- base creada.

### 404 de Express

Probablemente:

- endpoint incorrecto;
- route no registrada;
- URL incorrecta.

### 401

JWT/cookie/auth.

### 403

Rol/ownership.

### 400

Validación.

### 500

Mirar consola del backend.

---

# PARTE 90 — REACT: SOLO SI TAMBIÉN ENTRA UNIDAD II

Tus materiales también incluyen el Integrador II. Ahí la teoría principal es React con Vite, componentes funcionales, `useState`, `useEffect`, custom hooks, React Router e integración con backend. Trabajo Práctico Integrador N° …

Si tu examen de hoy es principalmente el backend que venimos trabajando, **estudiá primero las 89 secciones anteriores**.

Pero para que no quedes en blanco si aparece React:

| Concepto React | Función |
|---|---|
| Vite | Herramienta para crear y ejecutar proyecto frontend |
| Componente | Función que devuelve interfaz JSX |
| JSX | Sintaxis para describir UI |
| props | Datos recibidos por componente |
| state | Datos internos que pueden cambiar |
| `useState` | Manejar estado |
| `useEffect` | Ejecutar efectos secundarios |
| custom hook | Encapsular lógica reutilizable |
| `map()` | Renderizar listas |
| `key` | Identificar elementos de una lista |
| React Router | Navegación SPA |
| BrowserRouter | Proveedor del router |
| Routes | Contenedor de rutas |
| Route | Define URL y componente |
| Link | Navegación interna sin recargar página |
| Navigate | Redirección |
| localStorage | Persistencia simple en navegador |
| fetch | Peticiones HTTP |

El material exige que una lista use `map()` con una `key` estable basada en el ID, no en el índice. También indica que `useEffect` no debe ser directamente `async`; la función asíncrona se declara por separado y el efecto la invoca. Trabajo Práctico Integrador N° …

---

# PARTE 91 — `useState`

Guarda estado local.

Ejemplos conceptuales:

- formulario;
- loading;
- error;
- artículos.

Cuando el estado cambia, React vuelve a renderizar.

Cuando el nuevo valor depende del anterior conviene utilizar la forma funcional del setter. Esto está pedido expresamente en el Integrador II. Trabajo Práctico Integrador N° …

---

# PARTE 92 — `useEffect`

Se utiliza para efectos secundarios.

Por ejemplo:

“al cargar Home, pedir artículos al backend”.

El array de dependencias controla cuándo vuelve a ejecutarse.

El callback del efecto no debería ser directamente `async`; se define una función async separada y se llama desde el efecto. Trabajo Práctico Integrador N° …

---

# PARTE 93 — `useFetch`

Custom hook para centralizar peticiones GET.

Devuelve conceptualmente:

- data;
- loading;
- error.

El Integrador II exige además enviar las cookies con `credentials: include`. Trabajo Práctico Integrador N° …

---

# PARTE 94 — `useForm`

Custom hook para:

- guardar valores;
- manejar cambios;
- resetear formulario.

Evita repetir lógica entre login y register.

---

# PARTE 95 — FRONTEND + COOKIE

Cuando backend y frontend están separados, el frontend debe incluir credenciales en las peticiones para que el navegador envíe la cookie.

El material insiste en que las peticiones autenticadas envíen la cookie y relaciona los códigos `200/201`, `400`, `401`, `403` y `500` con su manejo en frontend. Trabajo Práctico Integrador N° …

---

# ÚLTIMO REPASO: LAS 15 FRASES QUE MEMORIZARÍA ANTES DE ENTRAR

1. **Express recibe las peticiones HTTP y las rutas conectan endpoints con middlewares y controllers.**
2. **El controller contiene la lógica; el model representa la tabla; Sequelize comunica JavaScript con MySQL.**
3. **CRUD = Create, Read, Update, Delete = POST, GET, PUT, DELETE.**
4. **req.body trae datos enviados; req.params trae valores de la URL.**
5. **Express-validator valida antes del controller y matchedData deja solo datos validados.**
6. **401 significa no autenticado; 403 significa autenticado pero sin permiso.**
7. **JWT identifica al usuario mediante información firmada; no es una contraseña ni debe guardar datos sensibles.**
8. **bcrypt hashea passwords y compara password recibido contra hash almacenado.**
9. **La cookie transporta el JWT; httpOnly evita que JavaScript del navegador la lea directamente.**
10. **Autenticación pregunta quién sos; autorización pregunta qué podés hacer.**
11. **1:1 = hasOne/belongsTo; 1:N = hasMany/belongsTo; N:M = belongsToMany con tabla intermedia.**
12. **Una foreign key referencia otro registro y mantiene relaciones entre tablas.**
13. **paranoid hace eliminación lógica: destroy coloca deletedAt en vez de borrar la fila.**
14. **Una transacción hace que varias operaciones se confirmen juntas con commit o se reviertan con rollback.**
15. **Git: modificar → add → commit → push; las ramas se combinan mediante merge.**

### Mi prioridad para vos hasta las 14

Si todavía sentís que sabés solo 30%, no intentes memorizar las 95 secciones igual. **Dominá perfectamente**: flujo request→route→middleware→controller→model→DB, CRUD/HTTP, Sequelize y relaciones, express-validator, JWT+bcrypt+cookies, 401/403/404/500, paranoid y los comandos esenciales de Git/npm.

Con esos bloques entendidos ya tenés una base mucho más fuerte para tanto el formulario teórico como para poder reconocer qué archivo tocar cuando empiece la práctica.