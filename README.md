# Frikisys — Wiki de SysAdmin & SysOps en Español

Documentación práctica y comandos esenciales para profesionales de infraestructura Linux, virtualización y cloud computing. 100% en español.

**[Ver la web →](https://frikisys.com)**

## Stack

- **Frontend:** React 19 + TypeScript
- **Estilos:** Tailwind CSS 3
- **Build:** Create React App
- **Deploy:** Vercel

## Empezar en local

```bash
# Clonar el repo
git clone https://github.com/TirsoTormo/frikisys.git
cd frikisys

# Instalar dependencias
npm install

# Arrancar en desarrollo
npm start
```

Abre [http://localhost:3000](http://localhost:3000) — el navegador se recarga al hacer cambios.

## Scripts disponibles

| Comando | Qué hace |
|---|---|
| `npm start` | Servidor de desarrollo |
| `npm run build` | Build de producción (en `build/`) |
| `npm test` | Tests con Create React App |

## Estructura del proyecto

```
src/
├── components/     # Componentes React (Landing, ArticleViewer, etc.)
├── content/        # Artículos en formato JSON
│   ├── linux/
│   └── virtualizacion/
└── index.css       # Estilos globales y variables CSS
```

### Añadir un artículo

1. Crea un archivo JSON en `src/content/linux/` o `src/content/virtualizacion/`
2. Sigue el schema:

```json
{
  "id": "nombre-articulo",
  "title": "Título del artículo",
  "category": "linux",
  "content": "Contenido en Markdown...",
  "tags": ["etiqueta1", "etiqueta2"],
  "author": "Frikisys Team",
  "date": "2025-01-01",
  "codeBlocks": [
    { "language": "bash", "code": "echo 'hola'" }
  ]
}
```

3. El artículo aparece automáticamente en la web.

## Despliegue

El proyecto se despliega automáticamente con Vercel cada vez que se hace push a `main`. No necesitas configuración extra.

Para dominio personalizado o ajustes, ver el dashboard de [Vercel](https://vercel.com).

## Contribuir

1. Haz un fork del repo
2. Crea una rama para tu cambio: `git checkout -b mi-nuevo-articulo`
3. Añade o modifica artículos en `src/content/`
4. Ejecuta `npm run build` para verificar que todo compila
5. Haz un PR a `main`

## Licencia

MIT — libre para usar, modificar y distribuir.