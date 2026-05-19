# 🛍️ E-Commerce API & Frontend

Proyecto escolar para la materia de Programación Web. Consiste en una plataforma de comercio electrónico funcional con arquitectura Full-Stack (Node.js + Express + MongoDB Atlas) y una interfaz limpia en el Frontend usando vanilla JavaScript.

## 🚀 Características del Sistema

* **Clientes:** Registro, inicio de sesión (JWT), buscador de productos, carrito de compras reactivo y generación de pedidos con actualización de stock en tiempo real.
* **Administrador:** Gestión del catálogo de productos y consulta de clientes mediante comandos directos desde la terminal (rutas protegidas por rol).

---

## 🛠️ Instalación y Despliegue Local

1. Clonar este repositorio en tu máquina local.
2. Instalar los módulos de Node.js necesarios:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno en un archivo `.env` en la raíz del proyecto:
   ```text
   PORT=3000
   TOKEN_SECRET=ClaveSecreta_Para_JWT_2026
   DB_CONNECT=mongodb+srv://rvelasco11_db_user:aoaSGZNyu09w1xlv@cluster0.3mdkrmd.mongodb.net/ProyectoWeb?appName=Cluster0
   ```
4. Arrancar el servidor en modo desarrollo:
   ```bash
   npx nodemon src/app.js
   ```
5. Acceder a la interfaz desde el navegador: `http://localhost:3000/login.html`

---

## 🛣️ Endpoints de la API (Estructura de Rutas)

### Autenticación e Historial
* `POST /api/user/register` - Registro de nuevos usuarios.
* `POST /api/user/login` - Login de usuarios (Devuelve Token JWT).
* `GET /api/user/clients` - Listar todos los clientes registrados (**Solo Admin**).

### Catálogo de Productos
* `GET /api/products` - Recuperar catálogo o buscar por nombre (`?search=nombre`).
* `POST /api/products` - Agregar un nuevo producto al inventario (**Solo Admin**).
* `PUT /api/products/:id` - Modificar datos o stock de un producto (**Solo Admin**).

### Carrito y Compras
* `POST /api/orders` - Crear un nuevo pedido con uno o varios productos.
* `GET /api/orders/my-orders` - Recuperar el historial de pedidos del cliente.

---

## 💻 Manual de Operación para el Administrador (cURL)

El rol de administrador se gestiona directamente desde la terminal mediante peticiones HTTP. 

*(Nota: En Windows PowerShell, asegúrate de escribir `curl.exe` en lugar de solo `curl` para evitar conflictos de formato).*

### 1. Iniciar sesión como Administrador
```bash
curl.exe -X POST http://localhost:3000/api/user/login -H "Content-Type: application/json" -d '{"username":"admin","password":"admin1234"}'
```
> Copia el token generado en la respuesta para usarlo en los siguientes comandos.

### 2. Agregar un Producto Nuevo al Catálogo
```bash
curl.exe -X POST http://localhost:3000/api/products -H "Authorization: Bearer TU_TOKEN_AQUI" -H "Content-Type: application/json" -d '{"name":"Teclado Mecanico","description":"RGB switch azul","price":1200,"stock":15}'
```

### 3. Modificar un Producto Existente
```bash
curl.exe -X PUT http://localhost:3000/api/products/ID_DEL_PRODUCTO -H "Authorization: Bearer TU_TOKEN_AQUI" -H "Content-Type: application/json" -d '{"price":1150,"stock":10}'
```

### 4. Consultar la Lista de Clientes Registrados
```bash
curl.exe -X GET http://localhost:3000/api/user/clients -H "Authorization: Bearer TU_TOKEN_AQUI"
```
