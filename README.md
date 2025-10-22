
# S.G.C.P. (Sistema Gestor de Clientes y Pedidos)

Sistema web para la gestión de clientes y pedidos en un negocio textil, permitiendo el registro, seguimiento y administración de trabajos de costura y arreglos.

## 📋 Tabla de Contenidos
- [S.G.C.P. (Sistema Gestor de Clientes y Pedidos)](#sgcp-sistema-gestor-de-clientes-y-pedidos)
  - [📋 Tabla de Contenidos](#-tabla-de-contenidos)
  - [✨ Características](#-características)
  - [🛠️ Tecnologías](#️-tecnologías)
  - [🚀 Instalación](#-instalación)
  - [💻 Uso](#-uso)
  - [📁 Estructura del Proyecto](#-estructura-del-proyecto)
  - [🗄️ Base de Datos](#️-base-de-datos)
    - [Tablas Principales:](#tablas-principales)
  - [📋 Requerimientos](#-requerimientos)
    - [Requerimientos Funcionales](#requerimientos-funcionales)
    - [Requerimientos No Funcionales](#requerimientos-no-funcionales)
  - [🔄 API Endpoints](#-api-endpoints)
    - [Clientes](#clientes)
    - [Pedidos](#pedidos)
  - [👥 Contribución](#-contribución)

## ✨ Características
- Gestión completa de clientes (CRUD)
- Sistema de pedidos con seguimiento de estado
- Búsqueda dinámica de clientes y pedidos
- Interfaz responsive y amigable
- Control de fechas y plazos de entrega
- Sistema de estados para pedidos (pendiente/concretado)

## 🛠️ Tecnologías
- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript (Vanilla)
  
- **Backend:**
  - Node.js
  - Express.js
  
- **Base de Datos:**
  - MySQL

## 🚀 Instalación
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Elian-zzz/PatriciaElane.git
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar la base de datos:
   - Crear base de datos MySQL
   - Importar estructura desde bd.sql
   - Configurar credenciales en bd.js

4. Iniciar el servidor:
   ```bash
   node index.js
   ```

## 💻 Uso
El sistema permite:
- Crear y gestionar clientes con referencias únicas
- Registrar pedidos de arreglos o confecciones
- Seguimiento de estado de pedidos
- Búsqueda por nombre de cliente
- Control de fechas de entrega
- Visualización de pedidos pendientes

## 📁 Estructura del Proyecto
```
PatriciaElane/
├── public/
│   ├── css/
│   │   └── raiz_style.css
│   └── js/
│       └── raiz_script.js
├── bd.js
├── bd.sql
├── index.js
├── package.json
└── raiz.html
```

## 🗄️ Base de Datos
### Tablas Principales:
- `cliente`: Almacena información de clientes
- `pedido`: Registra pedidos y sus detalles
- `estadoPedido`: Control de estados de los pedidos

## 📋 Requerimientos

### Requerimientos Funcionales
- **RF1:** Registro de clientes y pedidos vía interfaz web
- **RF2:** Consulta de estado de clientes
- **RF3:** Actualización de estado de pedidos
- **RF4:** Sistema de alertas para pedidos próximos a vencer

### Requerimientos No Funcionales
- **RNF1:** Estados de pedido (pendiente/concretado)
- **RNF2:** Sistema de referencias para diferenciación de clientes
- **RNF3:** Interfaz intuitiva y responsive
- **RNF4:** Rendimiento óptimo en navegadores modernos

## 🔄 API Endpoints

### Clientes
- `GET /api/consultarClientes` - Lista de clientes
- `GET /api/consultarClientePorNombre` - Búsqueda por nombre
- `POST /api/nuevoCliente` - Crear cliente

### Pedidos
- `GET /api/consultarPedidos` - Lista de pedidos
- `POST /api/ingresarPedido` - Crear pedido
- `GET /api/consultarPedidoPorNombre` - Búsqueda por cliente

## 👥 Contribución
Proyecto desarrollado por [Elian-zzz](https://github.com/Elian-zzz)