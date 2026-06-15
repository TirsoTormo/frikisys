# Skill: Frikisys Article Improver

## Qué hace

Mejora artículos JSON de Frikisys o crea nuevos. Analiza el contenido, detecta huecos, y genera una versión mejorada siguiendo el schema exacto de la wiki.

## Schema de referencia

```json
{
  "id": "nombre-unico",
  "titulo": "Título claro y descriptivo",
  "categoria": "linux|virtualizacion|redes|seguridad|bases-de-datos|cloud",
  "descripcion": "Una o dos frases explicando qué cubre",
  "contenido": [
    { "tipo": "texto", "valor": "Párrafo..." },
    { "tipo": "titulo", "valor": "Nombre de sección" },
    { "tipo": "comando", "valor": "# comando\nls -la", "descripcion": "Qué hace" },
    { "tipo": "lista", "valor": "Elemento 1\nElemento 2" }
  ]
}
```

## Tipos de bloque

| Tipo | Uso | Obligatorio |
|------|-----|------------|
| `texto` | Explicaciones, intro, contexto | siempre |
| `titulo` | Separa secciones temáticas | en secciones |
| `comando` | Terminal, config, código | mínimo 1 |
| `lista` | Listas de elementos | opcional |

## Normas de calidad

- **100% español** — excepto comandos y comentarios de código
- **Comandos con `#` comentarios** — explica cada línea importante
- **Estructura**: intro → 2-4 secciones → errores frecuentes → resumen
- **Un `comando` por bloque** — un bloque puede tener varios comandos relacionados
- **Errores comunes** — siempre: qué sale mal + solución
- **Longitud mínima**: 300 palabras de contenido real

## Errores a detectar

1. Comandos obsoletos o eliminados en versiones recientes
2. Sintaxis JSON incorrecta
3. Artículo sin `descripcion`
4. Bloque `comando` sin `descripcion`
5. Anglicismos evitables
6. Artículo demasiado corto
7. Sin sección de errores frecuentes
8. Comandos sin output de ejemplo

## Para mejorar un artículo existente

```
INPUT: JSON del artículo actual
PROCESO:
  1. Analiza estructura y detecta qué falta
  2. Propón 2-3 comandos nuevos o mejor explicados
  3. Añade sección de errores comunes si no existe
  4. Mejora la intro para que sea más atractiva
  5. Devuelve el JSON mejorado
OUTPUT: JSON del artículo mejorado
```

## Para crear un artículo nuevo

```
INPUT: Tema + categoría + nivel
PROCESO:
  1. Genera estructura con intro + 3-4 secciones
  2. Incluye comandos prácticos con comentarios
  3. Añade sección de errores frecuentes (mínimo 3)
  4. Termina con resumen de comandos clave
OUTPUT: JSON completo del nuevo artículo
```

## Categorías disponibles

- `linux` — Linux
- `virtualizacion` — Virtualización  
- `redes` — Redes
- `seguridad` — Seguridad
- `bases-de-datos` — Bases de Datos
- `cloud` — Cloud
