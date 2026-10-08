Perfecto. Vamos desde **cero absoluto**, suponiendo que nunca viste JWT, cookies, autenticación, `paranoid`, `.optional()` ni `matchedData()`.

La idea es que al terminar puedas explicar el tema en una hoja y también reconocer **qué tenés que hacer en VS Code** si te lo piden en la práctica.

# 1. Antes de JWT: autenticación y autorización

Primero necesitás diferenciar dos palabras.

**Autenticación** significa comprobar **quién es el usuario**. Por ejemplo: alguien escribe usuario y contraseña y el sistema comprueba si son correctos.

**Autorización** significa comprobar **qué puede hacer ese usuario una vez identificado**. Por ejemplo: ya sabemos que sos Juan, pero ahora tenemos que comprobar si Juan es `admin` o `user`. El material lo resume así: autenticación responde “¿quién eres?” y autorización responde “¿qué puedes hacer?”. Autenticación y autorización de…

Pensalo así:

> Entrás a un boliche. Mostrar tu DNI es **autenticación**. Que después te permitan entrar al sector VIP es **autorización**.

En nuestro Integrador pasa exactamente esto:

**Login correcto → autenticado.**

**role = admin → autorizado para determinadas operaciones.**

---

# 2. ¿Qué problema viene a resolver JWT?

Imaginate que hacés login:

```text
Usuario: gonza
Contraseña: ********
```

El backend comprueba que sos vos.

Pero después hacés otra petición:

```text
GET /api/auth/profile
```

¿Cómo sabe el servidor que esa petición también viene del mismo usuario que hizo login?

No tendría sentido mandarle usuario y contraseña nuevamente en cada petición.

Ahí aparece el **token**.

Después del login, el servidor genera una especie de **credencial digital temporal**.

Esa credencial es nuestro JWT.

---

# 3. ¿Qué es JWT?

JWT significa:

**JSON Web Token**

Según el material, JWT es un estándar abierto, RFC 7519, que permite transmitir información de manera compacta en un objeto JSON cuya integridad puede verificarse porque está firmado digitalmente. Autenticación y autorización de…

En palabras simples:

> JWT es como una credencial que crea el servidor después de que el usuario inicia sesión correctamente.

Puede contener, por ejemplo:

```text
id: 7
username: gonza
role: admin
```

Entonces, en las siguientes peticiones, el servidor puede leer esa credencial y saber:

> “Esta petición pertenece al usuario 7 y su rol es admin.”

---

# 4. ¿Cómo es un JWT por dentro?

Un JWT tiene **tres partes** separadas por puntos. Autenticación y autorización de…

Conceptualmente:

```text
HEADER.PAYLOAD.SIGNATURE
```

Tenés que memorizar estos tres nombres.

| Parte | Qué contiene |
|---|---|
| Header | Información sobre el token y algoritmo usado |
| Payload | Información del usuario/datos del token |
| Signature | Firma que permite comprobar que el token no fue modificado |

## Header

Dice cosas relacionadas con el token.

Por ejemplo, qué algoritmo se utilizó para firmarlo.

No es donde guardamos el usuario.

---

# 5. Payload

Es probablemente la parte que más vas a trabajar.

Ahí podemos guardar información como:

```text
id
username
role
```

En nuestro Integrador generábamos el JWT después del login con información del usuario.

Pero hay algo muy importante:

**no deberías guardar una contraseña dentro del JWT.**

El payload sirve para datos necesarios para identificar/autorización, no para secretos sensibles.

---

# 6. Signature

La `Signature`, o firma, es una de las partes fundamentales.

Sirve para comprobar que el token **no fue alterado**.

Por ejemplo, imaginá que el JWT dice:

```text
role: user
```

y alguien intenta modificarlo manualmente para poner:

```text
role: admin
```

Si modifica el payload, la firma original ya no coincide.

Cuando el servidor verifica el token debería detectar que fue manipulado.

---

# 7. ¿Qué es `JWT_SECRET`?

Para firmar y verificar el JWT utilizamos una clave secreta.

En el material aparece como una variable de entorno:

```text
JWT_SECRET
```

El helper utiliza ese secreto tanto para generar como para verificar los tokens. Autenticación y autorización de…

Pensalo como un **sello secreto del servidor**.

El servidor sabe:

> “Los tokens legítimos fueron firmados utilizando mi secreto.”

Por eso `JWT_SECRET` debe estar en:

```text
.env
```

y **no debería subirse a GitHub**.

---

# 8. Generar JWT vs verificar JWT

En nuestro proyecto teníamos un helper para JWT.

Conceptualmente existen dos operaciones muy importantes:

| Operación | Significado |
|---|---|
| Generar token | Crear y firmar un JWT |
| Verificar token | Comprobar firma, validez y recuperar payload |

El material explica que `generateToken()` crea un JWT firmado y `verifyToken()` comprueba la firma y devuelve el payload. Autenticación y autorización de…

Esto te lo pueden preguntar textual:

**¿Qué diferencia hay entre generar y verificar un token?**

Respuesta:

> Generar crea la credencial después del login; verificar comprueba posteriormente que esa credencial es válida.

---

# 9. ¿Cuándo generamos el JWT?

Normalmente **durante el login**.

Flujo:

```text
Usuario manda username/password
               ↓
Backend busca usuario
               ↓
Comprueba contraseña
               ↓
Contraseña correcta
               ↓
Genera JWT
               ↓
Envía JWT al cliente
```

El material muestra exactamente este flujo: primero busca al usuario, valida credenciales, genera el JWT y después lo envía mediante una cookie. Autenticación y autorización de…

---

# 10. JWT no comprueba la contraseña

Esto es muy importante.

JWT y bcrypt hacen trabajos diferentes.

**bcrypt comprueba contraseña.**

**JWT mantiene la autenticación después del login.**

Pensalo:

```text
PASSWORD
   ↓
bcrypt
   ↓
¿es correcta?
   ↓
Sí
   ↓
JWT
```

Nunca mezcles ambos conceptos.

---

# 11. ¿Qué es bcrypt?

Aunque preguntaste JWT, bcrypt forma parte del mismo flujo de autenticación de tu material.

Las contraseñas **no se guardan directamente**.

Nunca debería quedar:

```text
password = "hola123"
```

en la base.

Se guarda un **hash**.

El material explica que no deben almacenarse contraseñas en texto plano y que bcrypt está diseñado específicamente para hashearlas. Autenticación y autorización de… Autenticación y autorización de…

---

# 12. Hash vs encriptación

También puede aparecer en un formulario teórico.

| Concepto | Idea |
|---|---|
| Hash | Transformación pensada para no recuperar el original |
| Encriptación | Puede revertirse teniendo la clave adecuada |
| Codificación | Cambia representación/formato; no busca seguridad criptográfica |

El material diferencia esos tres conceptos explícitamente. Autenticación y autorización de…

Para contraseñas:

**bcrypt → hash.**

No decimos:

> “desencriptar la contraseña bcrypt”.

Lo correcto es:

> “comparar la contraseña introducida contra el hash”.

---

# 13. ¿Qué hace bcrypt en Register?

En registro:

```text
password introducido
        ↓
bcrypt hash
        ↓
hash generado
        ↓
BD
```

Es decir:

**primero hasheamos y después guardamos.**

El material indica expresamente que el password debe ser hasheado antes de guardarlo. Autenticación y autorización de…

---

# 14. ¿Qué hace bcrypt en Login?

En login no volvemos a guardar nada.

Tenemos:

```text
password que acaba de escribir
+
hash que está en MySQL
```

y bcrypt los compara.

Si coincide:

```text
Login correcto
→ generar JWT
```

Si no:

```text
401 Credenciales inválidas
```

Este flujo está detallado en el material. Autenticación y autorización de…

---

# 15. ¿Qué es `saltRounds`?

bcrypt tiene un factor de costo.

Tu material lo llama:

**saltRounds**

Cuanto mayor sea, más costoso y lento resulta calcular el hash.

El material usa como ejemplo 8, 10, 12 y 15, y recomienda 10–12 como equilibrio. Autenticación y autorización de…

En nuestro trabajo utilizamos:

```text
10
```

No necesitás saber matemáticas de bcrypt.

Para el examen alcanza con entender:

> `saltRounds` controla el costo computacional del hash. Más alto puede aumentar seguridad, pero también tarda más.

---

# 16. ¿Qué tiene que ver la cookie con JWT?

Ahora viene la parte que suele confundir.

JWT es **el token**.

Cookie es **un mecanismo para almacenarlo/enviarlo desde el navegador**.

No son la misma cosa.

Analogía:

> JWT = DNI.

> Cookie = billetera donde llevás el DNI.

La cookie almacena el token y el navegador puede enviarla en peticiones posteriores.

El material define cookies como pequeños datos que el servidor envía al navegador y que después este reenvía automáticamente. Autenticación y autorización de…

---

# 17. Flujo JWT + cookie completo

Este flujo tenés que poder dibujarlo en el examen.

```text
1. Cliente manda username/password
              ↓
2. Backend comprueba usuario
              ↓
3. bcrypt compara contraseña
              ↓
4. Si es correcta → genera JWT
              ↓
5. Backend coloca JWT en cookie
              ↓
6. Navegador guarda cookie
              ↓
7. Navegador pide ruta protegida
              ↓
8. Envía cookie
              ↓
9. Middleware toma JWT
              ↓
10. Verifica JWT
              ↓
11. Guarda payload en req.user
              ↓
12. Controller continúa
```

Eso es prácticamente todo nuestro sistema de autenticación.

---

# 18. Atributos importantes de la cookie

El material menciona varios. Autenticación y autorización de… Autenticación y autorización de…

| Propiedad | Qué significa |
|---|---|
| `httpOnly` | JavaScript del navegador no puede acceder directamente |
| `secure` | Solo enviarla mediante HTTPS |
| `sameSite` | Controla cuándo puede enviarse entre sitios |
| `maxAge` | Cuánto tiempo dura |
| `path` | En qué rutas es válida |
| `domain` | En qué dominio es válida |

### `httpOnly`

Importantísimo.

Ayuda a que JavaScript del navegador no pueda leer directamente la cookie.

En nuestro TP se usa para mejorar la seguridad.

---

# 19. ¿Para qué sirve `cookie-parser`?

Cuando llega una petición:

```text
request → servidor
```

puede traer cookies.

`cookie-parser` permite que Express las interprete y podamos acceder a:

```text
req.cookies
```

El material indica que es necesario para leer las cookies recibidas. Autenticación y autorización de…

---

# 20. ¿Qué es `authMiddleware`?

Es la pieza encargada de proteger rutas.

Supongamos:

```text
GET /api/auth/profile
```

No queremos que cualquiera pueda entrar.

Entonces ponemos un middleware antes del controller.

Flujo:

```text
Request
  ↓
authMiddleware
  ↓
¿hay token?
  ↓
¿es válido?
  ↓
Sí → next()
No → error
```

El material muestra que el middleware obtiene el token de la cookie, lo verifica, guarda los datos decodificados en `req.user` y finalmente llama `next()`. Autenticación y autorización de…

---

# 21. ¿Qué es `req.user`?

Esto suele confundir muchísimo.

Express **no crea mágicamente `req.user`**.

Nosotros lo agregamos.

El middleware verifica el token:

```text
JWT
 ↓
payload
 ↓
req.user
```

Entonces después el controller puede saber quién hizo la petición.

Por ejemplo:

```text
req.user.id
req.user.role
```

---

# 22. ¿Qué hace `next()`?

Un middleware está antes del controller.

Si todo está correcto:

```text
next()
```

significa:

> “Continuá con la siguiente función.”

Si el usuario no tiene token, el middleware responde con error y **no continúa**.

---

# 23. Ruta pública vs ruta protegida

Una ruta pública no necesita JWT.

Ejemplo:

```text
POST /login
```

Todavía no podés exigir JWT porque justamente está intentando iniciar sesión.

Una ruta protegida sí necesita middleware.

Ejemplo:

```text
GET /profile
```

El material muestra justamente login como público y profile con `authMiddleware`. Autenticación y autorización de…

---

# 24. Logout

Con JWT guardado en cookie, logout consiste principalmente en:

**eliminar la cookie.**

El material usa `clearCookie()` para hacerlo. Autenticación y autorización de…

Después, en una nueva petición:

```text
No hay cookie
→ no hay JWT
→ authMiddleware
→ 401
```

---

# 25. ¿Qué significa `credentials: include`?

Esto pertenece más al frontend, pero puede preguntarse.

Si frontend y backend necesitan trabajar con cookies, el frontend debe permitir que esas cookies sean recibidas/enviadas.

Por eso se usa:

```text
credentials: include
```

El material lo considera crucial tanto al hacer login como al acceder a rutas protegidas. Autenticación y autorización de… Autenticación y autorización de…

---

# 26. ¿Qué tiene que ver CORS?

Nuestro frontend puede estar en:

```text
localhost:5173
```

y backend:

```text
localhost:3000
```

Entonces hay dos orígenes.

Para permitir comunicación con cookies, el backend configura CORS permitiendo el origen del frontend y:

```text
credentials: true
```

El material lo marca expresamente como necesario. Autenticación y autorización de…

---

# 27. Resumen JWT que tenés que memorizar

Si en el examen dice:

**“Explique el funcionamiento de autenticación JWT.”**

Una respuesta muy buena sería:

> En el login, el servidor verifica las credenciales del usuario. La contraseña almacenada se encuentra hasheada y se compara mediante bcrypt. Si las credenciales son válidas, el servidor genera un JWT firmado con una clave secreta. Ese token contiene información necesaria del usuario y puede almacenarse en una cookie httpOnly. En las rutas protegidas, un middleware obtiene el token desde la cookie, verifica su firma y, si es válido, coloca el payload en `req.user` y permite continuar. Si no hay token o no es válido, se rechaza la petición. Al hacer logout se elimina la cookie.

Si podés explicar eso sin mirar, **JWT ya lo entendés bastante bien**.

---

# AHORA: ELIMINACIÓN LÓGICA Y ACTUALIZACIONES

Esta parte es bastante más fácil que JWT.

# 28. Primero: ¿qué es eliminar normalmente?

Supongamos una tabla Users:

| id | username |
|---:|---|
| 1 | Ana |
| 2 | Pedro |
| 3 | Juan |

Si hacés una eliminación física sobre Pedro:

| id | username |
|---:|---|
| 1 | Ana |
| 3 | Juan |

Pedro **desapareció realmente** de la base.

Eso es eliminación física.

---

# 29. ¿Qué es eliminación lógica?

La eliminación lógica NO borra realmente la fila.

Agrega/utiliza un campo para indicar:

> “Este registro debe considerarse eliminado.”

Tu material lo define justamente como mantener físicamente el registro, pero marcarlo como eliminado para excluirlo de consultas sin perder el historial. Práctica de Eliminación Lógica …

Ejemplo conceptual:

| id | username | deletedAt |
|---:|---|---|
| 1 | Ana | NULL |
| 2 | Pedro | 2026-10-08 |
| 3 | Juan | NULL |

Pedro sigue en MySQL.

Pero para la aplicación está eliminado.

---

# 30. ¿Para qué sirve esto?

Permite mantener:

- historial;
- integridad;
- auditoría;
- información relacionada;
- posibilidad de restauración.

Por ejemplo, si un usuario escribió 300 artículos quizá no quieras borrar físicamente todos sus datos de forma inmediata.

---

# 31. ¿Qué es `paranoid`?

Sequelize tiene una opción específica:

**paranoid**

El material dice que `paranoid` automatiza la eliminación lógica. Cuando está activado, Sequelize utiliza `deletedAt` y las consultas normales excluyen los registros eliminados. Práctica de Eliminación Lógica …

Conceptualmente:

```text
paranoid = true
```

significa:

> “Este modelo usa eliminación lógica.”

---

# 32. ¿Qué es `deletedAt`?

Es el campo que indica cuándo se eliminó lógicamente el registro.

### Registro activo

```text
deletedAt = NULL
```

### Registro eliminado

```text
deletedAt = fecha/hora
```

Esa diferencia es importantísima.

---

# 33. `paranoid` necesita `timestamps`

Según tu práctica, para usar `paranoid` también debe estar activado:

**timestamps**

porque Sequelize necesita manejar campos temporales. Práctica de Eliminación Lógica …

Pensalo así:

```text
timestamps
→ createdAt
→ updatedAt

paranoid
→ deletedAt
```

---

# 34. ¿Tengo que cambiar el DELETE del controller?

Esta es una de las mejores partes de Sequelize.

Normalmente no.

Seguís utilizando:

**destroy()**

Pero si el modelo tiene `paranoid`, Sequelize entiende:

> “No quiero hacer DELETE físico; quiero poner fecha en deletedAt.”

El material dice expresamente que el controller sigue usando `.destroy()` normalmente. Práctica de Eliminación Lógica …

---

# 35. ¿Qué ocurre con `findAll()` después?

Supongamos que User 5 fue eliminado lógicamente.

Una consulta normal ya no debería mostrarlo.

Sequelize excluye automáticamente registros cuyo `deletedAt` no es `null`. Práctica de Eliminación Lógica …

Por eso desde la API parece eliminado aunque en MySQL siga estando.

---

# 36. ¿Qué diferencia hay entre soft delete y hard delete?

| Tipo | Qué ocurre |
|---|---|
| Física / hard delete | La fila desaparece |
| Lógica / soft delete | La fila sigue, pero `deletedAt` indica eliminación |

**Paranoid = soft delete.**

---

# 37. Ahora las actualizaciones

La práctica también pide rutas:

```text
PUT /api/{nombre}/:id
DELETE /api/{nombre}/:id
```

para los recursos. Práctica de Eliminación Lógica …

PUT sirve para actualizar.

Ejemplo:

```text
PUT /api/users/7
```

significa:

> “Quiero actualizar el User cuyo ID es 7.”

Ese `7` normalmente viene de:

**req.params**

---

# 38. ¿Por qué actualizar es diferente de crear?

Al crear un User quizás necesitás:

```text
username
email
password
nombre
apellido
```

todos obligatorios.

Pero si ya existe y solamente quiere cambiar su email:

```text
email
```

¿para qué obligarlo a mandar todos los campos otra vez?

Por eso el material dice que en PUT no todos los campos tienen que ser obligatorios. Práctica de Eliminación Lógica …

---

# 39. Ahí aparece `.optional()`

En Express Validator:

**`.optional()`**

significa:

> “Este campo puede no venir. Pero si viene, validalo.”

Este concepto tenés que entender perfecto.

Supongamos que tenemos validaciones para:

```text
username
email
password
```

y todos tienen `optional`.

Si el cliente manda solamente:

```text
email
```

entonces:

- username no viene → no hay problema;
- email viene → se valida;
- password no viene → no hay problema.

Eso es exactamente lo que exige el material para PUT. Práctica de Eliminación Lógica …

---

# 40. `optional()` NO significa “aceptá cualquier cosa”

Esto es muy importante.

Si no manda email:

```text
✅ permitido
```

Si manda email válido:

```text
✅ permitido
```

Si manda email inválido:

```text
❌ error 400
```

`optional()` solamente significa:

> “No es obligatorio que el campo exista.”

Si existe, las demás reglas siguen aplicándose.

---

# 41. Y ahora aparece `matchedData()`

Esto es probablemente lo segundo más importante de esta práctica.

Después de validar queremos obtener solamente los campos que fueron:

1. enviados;
2. validados.

Ahí usamos:

**matchedData()**

El material dice que evita pasar al modelo datos inesperados o no validados provenientes directamente de `req.body`. Práctica de Eliminación Lógica …

---

# 42. ¿Por qué no utilizar directamente todo `req.body`?

Imaginá que permitís modificar:

```text
username
email
```

Pero el usuario manda además:

```text
role = admin
```

Si vos mandás directamente todo el body al modelo podrías procesar algo que nunca quisiste permitir.

Con `matchedData()` trabajás con los campos que tus validaciones reconocieron.

Esto mejora seguridad y control.

---

# 43. Flujo completo de un PUT

Memorizá esto:

```text
PUT /users/5
     ↓
Route
     ↓
Validaciones
     ↓
Campos son optional
     ↓
validate
     ↓
¿hay errores?
     ↓
No
     ↓
Controller
     ↓
matchedData()
     ↓
Buscar User 5
     ↓
¿existe?
     ↓
Sí
     ↓
update()
     ↓
200 OK
```

Si no existe:

```text
404
```

Si la validación falla:

```text
400
```

Si ocurre algo inesperado:

```text
500
```

El material especifica esos códigos para la práctica. Práctica de Eliminación Lógica …

---

# 44. Flujo completo del DELETE lógico

```text
DELETE /users/5
       ↓
Route
       ↓
Controller
       ↓
Buscar User 5
       ↓
¿existe?
       ↓
Sí
       ↓
destroy()
       ↓
Como tiene paranoid
       ↓
Se actualiza deletedAt
       ↓
200 OK
```

Pero físicamente:

```text
registro todavía existe en MySQL
```

---

# 45. Los códigos HTTP de esta práctica

Estos sí tenés que memorizarlos.

| Código | Significado en la práctica |
|---:|---|
| 201 | Recurso creado |
| 200 | Consulta o actualización exitosa |
| 400 | Validación incorrecta |
| 404 | Recurso inexistente |
| 500 | Error inesperado |

Son exactamente los códigos especificados en el material de la práctica. Práctica de Eliminación Lógica …

---

# 46. TRY/CATCH

La práctica exige `try-catch` en los controllers. Práctica de Eliminación Lógica …

¿Por qué?

Porque operaciones como:

- buscar;
- actualizar;
- eliminar;
- conectarse a la BD

pueden fallar.

Entonces:

```text
try
→ intento hacer operación

catch
→ si algo inesperado falla, manejo el error
```

Normalmente el catch termina enviando:

```text
500
```

---

# 47. Diferencia entre 400 y 404

Muy probable en examen.

**400**:

El cliente mandó datos incorrectos.

Ejemplo:

```text
email = "hola"
```

cuando debía ser email válido.

**404**:

Los datos podrían ser correctos, pero el recurso no existe.

Ejemplo:

```text
PUT /users/999999
```

y no hay User 999999.

---

# 48. ¿Dónde trabaja cada cosa?

Esta tabla te puede salvar en la práctica:

| Necesidad | Archivo/lugar |
|---|---|
| Activar paranoid | Model |
| Activar timestamps | Model |
| Definir PUT/DELETE | Routes |
| `.optional()` | Validations/middleware |
| `matchedData()` | Controller |
| Buscar registro | Controller usando Model |
| `update()` | Controller |
| `destroy()` | Controller |
| try/catch | Controller |
| Validar errores | Middleware `validate` |
| Código HTTP | Controller/middleware |

---

# 49. Flujo de archivos

Cuando actualizás:

```text
route
↓
validation
↓
validate middleware
↓
controller
↓
model
↓
database
```

Cuando eliminás lógicamente:

```text
route
↓
controller
↓
model con paranoid
↓
Sequelize
↓
deletedAt en BD
```

---

# 50. Git de esta práctica

El material también exige flujo Git.

La rama se crea desde:

**develop**

con nombre:

**eliminacion-logica**

Todo el desarrollo va allí.

Al terminar:

```text
eliminacion-logica
       ↓
     develop
       ↓
      main
```

y se exigían por lo menos tres commits claros. Práctica de Eliminación Lógica …

No creo que esta sea la parte más difícil del examen, pero puede aparecer teóricamente.

---

# 51. Lo que más probablemente te pueden preguntar sobre eliminación lógica

Si te preguntan:

**¿Qué es eliminación lógica?**

Respondé:

> Es una técnica en la que un registro no se elimina físicamente de la base de datos, sino que se marca como eliminado. En Sequelize puede implementarse mediante `paranoid: true`, que utiliza el campo `deletedAt`. Las consultas normales excluyen automáticamente esos registros.

Si preguntan:

**¿Qué necesita `paranoid`?**

> `timestamps: true`.

Si preguntan:

**¿qué método uso para eliminar?**

> `destroy()` normalmente; Sequelize se encarga del soft delete.

Si preguntan:

**¿cómo sé si está eliminado?**

> `deletedAt` contiene una fecha en lugar de `null`.

---

# 52. Lo que más probablemente te pueden preguntar de actualización

**¿Por qué usamos `.optional()` en PUT?**

> Porque al actualizar no siempre queremos modificar todos los campos; solamente se valida un campo si fue enviado.

**¿Para qué usamos `matchedData()`?**

> Para trabajar únicamente con datos que fueron enviados y validados, evitando utilizar directamente campos inesperados del body.

**¿Qué pasa si el registro no existe?**

> 404 Not Found.

**¿Qué pasa si manda un valor inválido?**

> 400 Bad Request.

---

# 53. Relación entre JWT y este tema

Aunque parecen temas distintos, se combinan.

Supongamos:

```text
PUT /api/articles/8
```

Primero podemos usar JWT para saber:

```text
¿quién intenta modificarlo?
```

Después autorización:

```text
¿es el autor o admin?
```

Después Express Validator:

```text
¿los datos nuevos son válidos?
```

Después:

```text
matchedData()
```

Después Sequelize:

```text
update()
```

Es decir:

```text
JWT
↓
identifica usuario

Middleware
↓
comprueba permiso

Express Validator
↓
comprueba datos

matchedData
↓
limpia datos

Sequelize
↓
actualiza BD
```

Así se conectan todos los temas de la unidad.

---

# 54. Si mañana... o en diez minutos te olvidás de todo, memorizá esto

### JWT

**Login → bcrypt comprueba password → servidor genera JWT → JWT va en cookie → middleware verifica JWT → payload va a req.user → ruta continúa.**

### Eliminación lógica

**paranoid + timestamps → destroy() no borra físicamente → Sequelize pone fecha en deletedAt → consultas normales dejan de mostrarlo.**

### Actualización

**PUT → campos optional → validate → matchedData → buscar registro → update → 200.**

Y tres diferencias:

| Pregunta | Respuesta |
|---|---|
| Autenticación vs autorización | quién sos vs qué podés hacer |
| JWT vs cookie | token vs lugar/mecanismo para almacenarlo/enviarlo |
| DELETE físico vs lógico | borrar fila vs marcarla con deletedAt |

Si dominás esas tres frases y entendés el flujo, ya dejaste de estar en “no sé nada” y tenés una base bastante sólida para responder teoría y orientarte en la práctica.