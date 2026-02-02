# CRUDTASK - Sistema de Gestión de Tareas Académicas

## Descripción
CRUDTASK es una aplicación web dedicada a la gestión de tareas académicas que permite a usuarios registrarse, iniciar sesión, gestionar sus tareas y su perfil, además de proporcionar un panel de administración para supervisar la actividad del sistema.

## Características

### Para Usuarios
- ✅ **Registro e Inicio de Sesión** - Crear cuenta y acceder al sistema
- ✅ **Dashboard** - Ver todas las tareas en una interfaz intuitiva
- ✅ **CRUD de Tareas** - Crear, leer, actualizar y eliminar tareas
- ✅ **Gestión de Perfil** - Editar datos personales y contraseña
- ✅ **Filtrado de Tareas** - Ver tareas por estado (todas, pendientes, completadas)
- ✅ **Estadísticas** - Ver resumen de tareas completadas y pendientes

### Para Administradores
- ✅ **Panel de Control** - Dashboard con estadísticas del sistema
- ✅ **Gestión de Usuarios** - Ver, buscar y eliminar usuarios
- ✅ **Supervisión de Tareas** - Ver todas las tareas del sistema
- ✅ **Actividad del Sistema** - Monitorear la actividad de usuarios
- ✅ **Estadísticas Globales** - Tasa de completitud, total de tareas, etc.

## Estructura del Proyecto

```
pruebadesempeño/
├── index.html                 # Login
├── db.json                    # Base de datos JSON
├── package.json
├── public/
│   └── views/
│       └── register.html      # Registro de usuarios
└── src/
    ├── style.css              # Estilos generales
    ├── login.js               # Lógica de login
    ├── register.js            # Lógica de registro
    ├── dashboard.html         # Dashboard de usuario
    ├── dashboard.js           # Lógica del dashboard
    ├── profile.html           # Perfil del usuario
    ├── profile.js             # Lógica del perfil
    ├── admin-dashboard.html   # Panel del administrador
    ├── admin-dashboard.js     # Lógica del admin
    └── styles/
        ├── dashboard.css
        ├── profile.css
        └── admin-dashboard.css
```

## Instalación y Configuración

### 1. Requisitos previos
- Node.js instalado
- npm (gestor de paquetes)

### 2. Instalación de dependencias
```bash
cd pruebadesempeño
npm install
```

### 3. Iniciar json-server (API)
En una terminal:
```bash
npx json-server --watch db.json
```
Esto iniciará el servidor en `http://localhost:3000`

### 4. Iniciar Vite (Servidor de desarrollo)
En otra terminal:
```bash
npm run dev
```

### 5. Acceder a la aplicación
- Abre tu navegador en `http://localhost:5173` (o la URL que Vite indique)

## Credenciales de Prueba

### Usuario Regular
- Email: `santamariajuan34@gmail.com`
- Contraseña: `123456`

### Administrador
- Email: `admin@crudtask.com`
- Contraseña: `admin123`

## Flujo de Uso

### Como Usuario Regular
1. **Registro**: Crea una nueva cuenta en `/public/views/register.html`
2. **Login**: Inicia sesión con tus credenciales en la página principal
3. **Dashboard**: Visualiza todas tus tareas
4. **Crear Tarea**: Haz clic en "+ Nueva Tarea" para crear una
5. **Editar/Eliminar**: Gestiona tus tareas con los botones de acción
6. **Perfil**: Actualiza tu información personal en "Mi Perfil"

### Como Administrador
1. **Login**: Usa las credenciales de admin
2. **Panel Admin**: Accede automáticamente al panel de administración
3. **Usuarios**: Ver y gestionar todos los usuarios del sistema
4. **Tareas**: Supervisar todas las tareas de todos los usuarios
5. **Estadísticas**: Monitorear la actividad del sistema

## Estructura de Datos

### Usuarios
```json
{
  "id": "abc123",
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "123456",
  "rol": "usuario|admin",
  "fechaRegistro": "2026-02-02T12:00:00Z"
}
```

### Tareas
```json
{
  "id": "task123",
  "titulo": "Tarea ejemplo",
  "descripcion": "Descripción de la tarea",
  "fechaEntrega": "2026-02-15",
  "prioridad": "alta|media|baja",
  "estado": "pendiente|completada",
  "usuarioId": "abc123",
  "fechaCreacion": "2026-02-02T12:00:00Z"
}
```

## Funcionalidades Técnicas

- **Autenticación Local**: Uso de localStorage para mantener sesión
- **Validación**: Validación de emails, contraseñas y campos requeridos
- **API RESTful**: Consumo de json-server
- **Protección de Rutas**: Redirección según autenticación y rol
- **Interfaz Responsiva**: Diseño adaptable a diferentes tamaños
- **Filtrado y Búsqueda**: Funcionalidades de filtrado en tiempo real

## Notas de Seguridad

⚠️ **IMPORTANTE**: Esta es una aplicación de demostración. En producción:
- Nunca almacenes contraseñas en texto plano
- Implementa autenticación segura (JWT, OAuth)
- Usa bases de datos reales (MongoDB, PostgreSQL, etc.)
- Implementa validación en servidor
- Usa HTTPS
- Implement CORS correctamente

## Desarrollo Futuro

- [ ] Autenticación con JWT
- [ ] Hashing de contraseñas (bcrypt)
- [ ] Notificaciones de vencimiento de tareas
- [ ] Sistema de calificaciones
- [ ] Exportación de reportes
- [ ] Temas oscuros
- [ ] Notificaciones en tiempo real (WebSockets)
- [ ] Integración con calendario

## Soporte

Para problemas o preguntas, asegúrate de:
1. Verificar que json-server esté corriendo
2. Verificar que Vite esté corriendo
3. Revisar la consola del navegador (F12)
4. Verificar la consola del terminal para errores

## Licencia

Este proyecto es de código abierto.
