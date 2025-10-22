# 🚀 Guía de Despliegue - Sistema de Gestión de Ferretería

## 📋 Opciones de Despliegue

### 1. 🌐 Netlify Drop (Más Fácil)
1. Ve a [netlify.com/drop](https://netlify.com/drop)
2. Arrastra y suelta el archivo `dist/my-project-css/ferreteria-app.zip`
3. ¡Tu aplicación estará disponible en minutos!

### 2. 📦 Vercel
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Importa este repositorio
4. Vercel detectará automáticamente que es Angular

### 3. 🔧 GitHub Pages
1. Sube el código a GitHub
2. Ve a Settings > Pages
3. Selecciona "Deploy from a branch"
4. Elige la carpeta `dist/my-project-css`

### 4. ☁️ Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

## 🎯 Características de la Aplicación

- ✅ **Sistema de Clientes**: CRUD completo con localStorage
- ✅ **Formularios Validados**: Validaciones robustas para DNI, email, etc.
- ✅ **Diseño Responsive**: Funciona en móviles y desktop
- ✅ **Sin Backend**: Funciona completamente offline
- ✅ **Datos de Ejemplo**: 3 clientes precargados

## 🔗 URLs de la Aplicación

- **Dashboard**: `/dashboard`
- **Lista de Clientes**: `/customers`
- **Nuevo Cliente**: `/customers/new`
- **Editar Cliente**: `/customers/edit/:id`

## 📱 Funcionalidades

1. **Registrar Clientes**: Formulario completo con validaciones
2. **Ver Clientes**: Lista con filtros y ordenamiento
3. **Editar Clientes**: Modificar datos existentes
4. **Eliminar Clientes**: Marcar como inactivo
5. **Restaurar Clientes**: Reactivar clientes eliminados

## 🛠️ Tecnologías

- **Angular 18**: Framework principal
- **TypeScript**: Lenguaje de programación
- **SCSS**: Estilos modernos
- **SweetAlert2**: Notificaciones elegantes
- **localStorage**: Persistencia de datos

## 📊 Datos de Ejemplo

La aplicación incluye 3 clientes de prueba:
- Juan Pérez (DNI: 12345678)
- María González (DNI: 87654321)
- Carlos Rodríguez (CNE: 12345678901234567890)


