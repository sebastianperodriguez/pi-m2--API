# PI M2 - API REST

API REST para gestión de authors y posts, construida con Node.js, Express y PostgreSQL. Proyecto integrador del Módulo 2 del programa Full Stack Development.

## Tecnologías utilizadas

- **Node.js** — entorno de ejecución
- **Express** — framework web
- **PostgreSQL** — base de datos relacional
- **pg** — cliente PostgreSQL para Node.js
- **dotenv** — manejo de variables de entorno
- **Vitest** — framework de testing
- **Supertest** — testing de endpoints HTTP
- **Nodemon** — recarga automática en desarrollo

## Estructura del proyecto
pi-m2/
├── src/
│   ├── controllers/
│   │   ├── authors.js
│   │   └── posts.js
│   ├── db/
│   │   ├── pool.js
│   │   ├── schema.sql
│   │   └── seed.sql
│   ├── middlewares/
│   │   ├── errorHandler.js
│   │   └── validate.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── authors.js
│   │   └── posts.js
│   ├── services/
│   │   ├── authors.js
│   │   └── posts.js
│   ├── test/
│   │   ├── authors.test.js
│   │   └── posts.test.js
│   ├── utils/
│   │   └── validators.js
│   ├── app.js
│   └── server.js
├── .env.example
├── openapi.yaml
└── package.json
## Instalación y uso local

1. Clonar el repositorio
   git clone https://github.com/sebastianperodriguez/pi-m2--API
   cd pi-m2

2. Instalar dependencias
   npm install

3. Configurar variables de entorno
   Copiar .env.example a .env y completar con tus credenciales de PostgreSQL

4. Crear la base de datos
   psql -U postgres
   CREATE DATABASE pi_m2;
   \q

5. Ejecutar el schema
   psql -U postgres -d pi_m2 -f src/db/schema.sql

6. Iniciar el servidor en desarrollo
   npm run dev

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| PORT | Puerto del servidor (default: 3000) |
| DB_HOST | Host de PostgreSQL |
| DB_PORT | Puerto de PostgreSQL |
| DB_USER | Usuario de PostgreSQL |
| DB_PASSWORD | Contraseña de PostgreSQL |
| DB_NAME | Nombre de la base de datos |

## Endpoints

### Authors

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/authors | Listar todos los authors |
| GET | /api/authors/:id | Obtener un author por id |
| POST | /api/authors | Crear un author |
| PUT | /api/authors/:id | Actualizar un author |
| DELETE | /api/authors/:id | Eliminar un author |

### Posts

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | /api/posts | Listar todos los posts |
| GET | /api/posts/:id | Obtener un post por id |
| GET | /api/posts/author/:authorId | Posts con detalle del author |
| POST | /api/posts | Crear un post |
| PUT | /api/posts/:id | Actualizar un post |
| DELETE | /api/posts/:id | Eliminar un post |

## Validaciones

- `name` no puede estar vacío en authors
- `email` debe ser único en authors
- `title`, `content` y `author_id` no pueden estar vacíos en posts
- Respuestas con códigos HTTP adecuados: 200, 201, 204, 400, 404, 500

## Tests

npm test

15 tests en total — 7 para authors y 8 para posts, cubriendo operaciones CRUD, validaciones y casos de error.

## Documentación API

La documentación OpenAPI está disponible en `openapi.yaml`. Puede visualizarse en:
https://editor.swagger.io

## Deploy

API desplegada en Railway:
**https://pi-m2-api-production.up.railway.app**