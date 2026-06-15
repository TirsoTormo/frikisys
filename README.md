# Frikisys — Wiki de SysAdmin & SysOps en Español

Documentación práctica y comandos esenciales para profesionales de infraestructura Linux, virtualización y cloud computing. **100% en español.**

🔗 **[Ver la web →](https://frikisys.vercel.app)**
🔗 **[GitHub →](https://github.com/TirsoTormo/frikisys)**

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React 19 + TypeScript |
| Estilos | Tailwind CSS 3 + CSS variables |
| Build | Create React App |
| Deploy | Vercel (automático) |
| PWA | Service Worker + manifest.json |

---

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

Abre [http://localhost:3000](http://localhost:3000). Hot reload incluido.

---

## Scripts disponibles

| Comando | Qué hace |
|---------|----------|
| `npm start` | Servidor de desarrollo (hot reload) |
| `npm run build` | Build de producción en `build/` |
| `npm test` | Tests unitarios |

---

## Estructura del proyecto

```
frikisys/
├── public/
│   ├── index.html         # HTML base + meta tags SEO
│   ├── 404.html           # Página de error 404
│   ├── sitemap.xml         # Para indexación de Google
│   ├── robots.txt         # Directivas para crawlers
│   ├── og-image.png       # Imagen para redes sociales
│   └── vercel.json        # Headers de seguridad + rewrites
├── src/
│   ├── App.tsx            # Routing, estado, meta tags dinámicos
│   ├── index.tsx          # Entry point con ErrorBoundary + HelmetProvider
│   ├── components/
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleGrid.tsx
│   │   ├── ArticleSkeleton.tsx  # Skeleton de loading
│   │   ├── ArticleViewer.tsx     # Lector con parser markdown
│   │   ├── ErrorBoundary.tsx     # Manejo de errores
│   │   ├── Footer.tsx
│   │   ├── Landing.tsx          # Página de inicio
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── content/            # Artículos JSON por categoría
│   │   ├── linux/
│   │   ├── virtualizacion/
│   │   ├── redes/
│   │   ├── seguridad/
│   │   ├── bases-de-datos/
│   │   └── cloud/
│   └── utils/
│       └── contentLoader.ts  # Carga y transforma artículos
├── vercel.json            # Security headers (CSP, X-Frame-Options…)
└── package.json
```

---

## Formato de artículos

Cada artículo es un archivo **JSON** en su carpeta de categoría. Sigue este schema exacto:

```json
{
  "id": "nombre-unico-articulo",
  "titulo": "Título claro y descriptivo",
  "categoria": "linux",
  "descripcion": "Una o dos frases explicando qué cubre el artículo",
  "contenido": [
    {
      "tipo": "texto",
      "valor": "Párrafo introductorio o explicación. Puede contener varias líneas."
    },
    {
      "tipo": "titulo",
      "valor": "Nombre de la sección"
    },
    {
      "tipo": "comando",
      "valor": "# Comando o bloque de código\nls -la /var/log\ncat /etc/os-release",
      "descripcion": "Breve descripción de qué hace este comando"
    },
    {
      "tipo": "lista",
      "valor": "Elemento 1\nElemento 2\nElemento 3"
    }
  ]
}
```

### Tipos de bloque

| Tipo | Uso |
|------|-----|
| `texto` | Explicaciones, contexto, introducciones |
| `titulo` | Título de sección (se muestra como `## Título`) |
| `comando` | Comandos de terminal con descripción |
| `lista` | Listas de elementos |

### Categorías disponibles

| Carpeta | Nombre en UI |
|---------|-------------|
| `linux/` | Linux |
| `virtualizacion/` | Virtualización |
| `redes/` | Redes |
| `seguridad/` | Seguridad |
| `bases-de-datos/` | Bases de Datos |
| `cloud/` | Cloud |

---

## Despliegue

Push a `main` → Vercel despliega automáticamente. No hay configuración extra.

Para añadir el dominio personalizado `frikisys.com`, configúralo en el dashboard de Vercel.

---

## SEO y descubrimiento

- `public/sitemap.xml` — listado de todas las URLs para Google
- `public/robots.txt` — directivas para crawlers
- Meta tags dinámicos por artículo (título, descripción, canonical, OG, Twitter Card)
- JSON-LD schema.org (TechArticle para artículos, WebSite para home)

---

## Licencia

MIT — usa, modifica y distribuye libremente.

---

> 💡 **¿Quieres mejorar un artículo?** Consulta [CONTRIBUTING.md](./CONTRIBUTING.md) para la guía completa.
