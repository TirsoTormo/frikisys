# Cómo contribuir en Frikisys

¡Gracias por querer contribuir! Esta guía te explica todo: desde cómo escribir un artículo hasta cómo enviarlo.

---

## Maneras de contribuir

1. **Escribir un artículo nuevo** — sobre cualquier tema de SysAdmin/SysOps
2. **Mejorar un artículo existente** — más comandos, mejores explicaciones, corregir errores
3. **Añadir ejemplos prácticos** — comandos que falten, casos de uso reales
4. **Corregir errores** — typos, información desactualizada, comandos que ya no funcionan
5. **Traducir** — (pendiente) artículos en otros idiomas

---

## Paso a paso

### 1. Haz un fork del repositorio

```bash
git clone https://github.com/TirsoTormo/frikisys.git
cd frikisys
git checkout -b contenido/nombre-del-articulo
```

### 2. Crea o edita el archivo JSON

**Nuevo artículo:**
```bash
# Crea el archivo en la carpeta correspondiente
touch src/content/linux/mi-nuevo-articulo.json
```

**Artículo existente:** edita el archivo directamente.

### 3. Escribe el contenido

Usa el schema del [README.md](./README.md#formato-de-artículos). Aquí tienes una plantilla:

```json
{
  "id": "mi-nuevo-articulo",
  "titulo": "Título del Artículo",
  "categoria": "linux",
  "descripcion": "Descripción breve en 1-2 frases.",
  "contenido": [
    {
      "tipo": "texto",
      "valor": "Introducción: por qué es importante este tema, contexto general."
    },
    {
      "tipo": "titulo",
      "valor": "Primera sección"
    },
    {
      "tipo": "comando",
      "valor": "# Tu comando aquí\necho 'Hola SysAdmin'",
      "descripcion": "Qué hace este comando y cuándo usarlo"
    },
    {
      "tipo": "texto",
      "valor": "Explicación adicional después del comando."
    },
    {
      "tipo": "titulo",
      "valor": "Segunda sección"
    },
    {
      "tipo": "comando",
      "valor": "# Otro comando\ndf -h",
      "descripcion": "Ver uso de disco"
    }
  ]
}
```

### 4. Normas de contenido

**✅ Haz:**
- Escribe en **español** completo y claro
- Cada comando debe tener `descripcion` aunque sea corta
- Usa comentarios en los bloques de código (`# esto es un comentario`)
- Incluye casos de error comunes ("esto falla si...")
- Estructura lógica: intro → secciones → ejemplos → errores frecuentes
- Los títulos de sección (`tipo: "titulo"`) separan bloques temáticos

**❌ Evita:**
- Anglicismos innecesarios (dice "red" donde puedes decir "red")
- Artículos vacíos o con solo 1-2 comandos
- Código sin explicación de qué hace
- URLs rotas o comandos obsoletos (si un comando ya no funciona, ponlo con un ⚠️)

### 5. Verifica que compila

```bash
npm run build
```

Si el build pasa, estás listo. Si hay errores de JSON, revisa la sintaxis.

### 6. Envía un Pull Request

```bash
git add src/content/
git commit -m "feat: añadir artículo sobre [tema]"
git push origin contenido/nombre-del-articulo
```

Luego abre un PR en GitHub describiendo qué has añadido.

---

## Guía de estilo para artículos

### Longitud
- Mínimo: 300 palabras de contenido real
- Ideal: 500–1500 palabras
- Máximo: sin límite, pero分段 bien con títulos de sección

### Tono
- **Técnico pero accesible** — asume que el lector sabe lo básico pero no es experto
- Usa segunda persona: "Ejecuta este comando", no "El usuario debe ejecutar"
- Sé directo: "Haz X" no "Se recomienda hacer X"

### Comandos
- Siempre incluye la salida esperada o un ejemplo
- Comenta líneas complejas: `# esto filtra solo errores`
- Agrupa comandos relacionados en un solo bloque `comando`
- Usa `bash` como lenguaje

### Estructura recomendada

```
1. Introducción (tipo: texto)
   → Qué vas a aprender y por qué importa

2. Requisitos previos (tipo: lista)
   → Paquetes instalados, permisos necesarios

3. Sección 1 (tipo: titulo)
   → Concepto + comando + explicación

4. Sección 2 (tipo: titulo)
   → Otro concepto + comando + explicación

5. Errores frecuentes (tipo: titulo)
   → Qué sale mal y cómo solucionarlo (tipo: texto + comando)

6. Resumen (tipo: texto)
   → Repaso rápido de lo aprendido
```

---

## Mejorar artículos existentes

Si encuentras un artículo que necesita más detalle:

1. Abre el archivo JSON correspondiente
2. Añade secciones con más comandos o explicaciones
3. Actualiza la `descripcion` si cambia el alcance
4. Haz PR con el título: `fix: mejorar artículo [nombre]`

---

## Usar la skill de IA para mejorar artículos

Frikisys incluye una skill de IA (`frikisys-article-improver`) que puede ayudarte a:

- Reescribir un artículo para que sea más claro
- Añadir comandos que falten
- Detectar errores o información desactualizada
- Traducir comandos complejos a español

Consulta `skills/frikisys-article-improver/SKILL.md` para instrucciones.

---

## Issues y suggestions

Si no quieres escribir código pero tienes una idea:

1. Abre un **Issue** en GitHub
2. Describe el tema que falta o el error que encontraste
3. Label: `enhancement` para nuevos temas, `bug` para errores

---

¡Tu conocimiento como SysAdmin es valioso! Cada artículo ayuda a otros profesionales. 🚀
