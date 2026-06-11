# Explorador de Países — App Web

Aplicación web de una sola página (SPA) que consume la **REST Countries API v5** para mostrar información de más de 250 países del mundo. Permite buscar, filtrar por región, marcar favoritos y registrarse con validación completa.

---

## Tecnologías utilizadas

| Tecnología | Propósito |
|---|---|
| **HTML5 semántico** | Estructura con etiquetas `<header>`, `<main>`, `<section>`, `<aside>`, `<footer>`, `<article>`, `<fieldset>`, etc. |
| **CSS3 con variables** | Sistema de diseño con `:root` para colores, sombras, bordes, transiciones; modo oscuro mediante clase `.modo-oscuro` |
| **JavaScript ES6 Modules** | Código modular con `import`/`export` dividido en 4 archivos |
| **REST Countries API v5** | Fuente de datos: `https://api.restcountries.com/countries/v5` |
| **localStorage** | Persistencia de favoritos, modo oscuro y registros de usuario |
| **sessionStorage** | Persistencia temporal de la última búsqueda |

---

## Estructura del proyecto

```
appwed/
├── manifest.json            # Web App Manifest (PWA)
├── index.html              # Página principal (estructura completa)
├── server.js               # Servidor proxy local (Node.js)
├── README.md               # Este archivo
├── assets/
│   ├── icon/
│   │   ├── icon-192.svg    # Icono 192x192 para manifest
│   │   └── icon-512.svg    # Icono 512x512 para manifest
│   └── img/
│       └── sin-bandera.svg # Placeholder para banderas sin imagen
├── css/
│   ├── style.css           # Estilos principales
│   └── responsive.css      # Media queries responsive
├── js/
│   ├── app.js              # Orquestador principal
│   ├── api.js              # Llamadas a la API externa (v5 + API Key)
│   ├── ui.js               # Renderizado de componentes visuales
│   └── utils.js            # Funciones utilitarias genéricas
└── .idea/                  # Configuración de IDE (IntelliJ / WebStorm)
```

---

## Funcionalidades

### 1. Exploración de países
- Obtiene todos los países desde la API REST Countries
- Muestra tarjetas con: **bandera, nombre, capital, región, población y área**
- Animación `fadeInUp` al aparecer las tarjetas
- Contador dinámico de resultados

### 2. Búsqueda y filtros
- **Buscador en vivo** con debounce de 350ms
- **Filtro por región** (África, América, Asia, Europa, Oceanía)
- Búsqueda con mínimo 2 caracteres
- Última búsqueda restaurada desde `sessionStorage`

### 3. Sistema de favoritos
- Botón estrella en cada tarjeta para agregar/quitar favoritos
- Almacenados en `localStorage`
- Barra lateral derecha con lista de favoritos

### 4. Formulario de registro
- **Campos**: nombre, email, contraseña, teléfono, edad, fecha de nacimiento, foto de perfil, género, intereses, región preferida, biografía
- **Validación en tiempo real** al hacer blur
- **Validación completa al submit** con feedback visual (borde rojo/verde)
- Mensaje de éxito con auto-reseteo a los 3 segundos
- Datos guardados en `localStorage`

### 5. Modo oscuro / claro
- Botón en el header con icono luna/sol
- Persistencia en `localStorage`
- Respeta `prefers-color-scheme: dark` del sistema operativo

### 6. Accesibilidad
- Skip link para saltar al contenido principal
- Atributos `aria-label`, `aria-live`, `role="alert"`, `aria-describedby`
- Navegación por teclado con `tabindex` y `focus-within`
- `prefers-reduced-motion` para personas sensibles a animaciones

### 7. Diseño responsive

| Breakpoint | Columnas del grid |
|---|---|
| < 480px | 1 columna |
| ≥ 480px | 2 columnas |
| ≥ 768px | 3 columnas + sidebar lateral |
| ≥ 1024px | 4 columnas |
| ≥ 1280px | 5 columnas |

---

## Flujo de datos

```
REST Countries API v5 ──► api.js (fetch con paginacion + timeout 15s + API Key)
                            │
                     ┌──────▼──────┐
                     │   app.js    │ ← Orquestador principal
                     └──┬───┬───┬──┘
                        │   │   │
               ┌────────▼─┐ ┌▼────────┐ ┌─────────▼──┐
               │  ui.js   │ │utils.js │ │ localStorage │
               │renderizado│ │helpers  │ │ sessionStor. │
               └──────────┘ └─────────┘ └─────────────┘
```

---

## Funciones técnicas destacadas

| Función | Archivo | Descripción |
|---|---|---|
| `obtenerTodosLosPaises()` | `api.js` | Fetch con paginación automática, `AbortController` y timeout de 15s |
| `debounce()` | `utils.js` | Retrasa ejecución hasta que el usuario deje de escribir |
| `toggleFavorito()` | `app.js` | Agrega/elimina favoritos y re-renderiza |
| `validarFormulario()` | `app.js` | Valida 8 campos usando `validity.valid` nativo del DOM |
| `ordenarPorNombre()` | `utils.js` | Ordena países alfabéticamente con `localeCompare` |

---

## Cómo usar

No funciona abriendo `index.html` directamente (`file://`) porque ES Modules y la API v5 lo requieren.

### Opción recomendada: Servidor proxy incluido

```bash
node server.js
# Luego abre http://localhost:3000
```

El servidor proxy evita los problemas de CORS automáticamente.

### Opción alternativa: Live Server (VS Code)

Requiere registrar tu propia API Key:

1. **Obtén API Key gratis** en [restcountries.com/sign-up](https://restcountries.com/sign-up)
2. **Agrega `127.0.0.1`** en orígenes permitidos en [restcountries.com/api-keys](https://restcountries.com/api-keys)
3. **Reemplaza la API Key** en `js/api.js` (línea 1)
4. Abre `index.html` con Live Server

---

## Datos del proyecto

- **Autor:** Tarea App Web
- **Año:** 2025
- **API utilizada:** [REST Countries v5](https://restcountries.com)
