/**
 * Frikisys Article Validator
 * Valida que todos los JSON de artículos cumplen el schema correcto
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content');
const CATEGORIES = ['linux', 'virtualizacion', 'redes', 'seguridad', 'bases-de-datos', 'cloud'];
const VALID_TYPES = ['texto', 'titulo', 'comando', 'lista'];

let errors = [];
let warnings = [];
let validated = 0;

function validateArticle(filePath) {
  const filename = path.basename(filePath, '.json');
  let json;

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    json = JSON.parse(content);
  } catch (e) {
    errors.push(`❌ ${filename}: JSON inválido — ${e.message}`);
    return;
  }

  validated++;

  // Required fields
  if (!json.id) errors.push(`❌ ${filename}: falta campo "id"`);
  if (!json.titulo) errors.push(`❌ ${filename}: falta campo "titulo"`);
  if (!json.categoria) errors.push(`❌ ${filename}: falta campo "categoria"`);
  if (!json.descripcion) errors.push(`❌ ${filename}: falta campo "descripcion"`);
  if (!json.contenido) {
    errors.push(`❌ ${filename}: falta campo "contenido"`);
    return;
  }

  if (!Array.isArray(json.contenido)) {
    errors.push(`❌ ${filename}: "contenido" debe ser un array`);
    return;
  }

  if (json.contenido.length === 0) {
    warnings.push(`⚠️  ${filename}: contenido vacío`);
    return;
  }

  // Validate blocks
  let hasCommand = false;
  let hasTitulo = false;

  json.contenido.forEach((block, i) => {
    if (!block.tipo) {
      errors.push(`❌ ${filename}: bloque ${i} sin campo "tipo"`);
      return;
    }

    if (!VALID_TYPES.includes(block.tipo)) {
      errors.push(`❌ ${filename}: tipo "${block.tipo}" inválido (línea ${i})`);
    }

    if (!block.valor && block.tipo !== 'comando') {
      errors.push(`❌ ${filename}: bloque ${i} sin campo "valor"`);
    }

    if (block.tipo === 'comando') {
      hasCommand = true;
      if (!block.descripcion) {
        warnings.push(`⚠️  ${filename}: bloque comando ${i} sin "descripcion"`);
      }
    }

    if (block.tipo === 'titulo') {
      hasTitulo = true;
    }

    // Check for non-Spanish text in valor
    if (block.tipo === 'texto' && block.valor) {
      const nonSpanish = block.valor.match(/[a-zA-Z]{4,}/g);
      if (nonSpanish) {
        const englishWords = nonSpanish.filter(w => !isSpanishWord(w));
        if (englishWords.length > 3) {
          warnings.push(`⚠️  ${filename}: bloque texto ${i} tiene muchas palabras en inglés: "${englishWords.slice(0, 5).join(', ')}..."`);
        }
      }
    }
  });

  if (!hasCommand) {
    warnings.push(`⚠️  ${filename}: no tiene ningún bloque "comando"`);
  }

  if (!hasTitulo && json.contenido.length > 3) {
    warnings.push(`⚠️  ${filename}: artículo largo sin secciones ("titulo")`);
  }
}

function isSpanishWord(word) {
  const spanishWords = ['the', 'and', 'for', 'with', 'from', 'this', 'that', 'what', 'when', 'where', 'who', 'which', 'how', 'are', 'you', 'not', 'but', 'can', 'all', 'any', 'has', 'have', 'had', 'was', 'were', 'been', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'where', 'why', 'how', 'all', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'only', 'own', 'same', 'than', 'too', 'very'];
  return spanishWords.includes(word.toLowerCase());
}

console.log('🔍 Validando artículos de Frikisys...\n');

CATEGORIES.forEach(category => {
  const catDir = path.join(CONTENT_DIR, category);
  if (!fs.existsSync(catDir)) {
    console.log(`📁 ${category}/ — no existe, skipping`);
    return;
  }

  const files = fs.readdirSync(catDir).filter(f => f.endsWith('.json'));
  console.log(`📁 ${category}/ (${files.length} artículos)`);

  files.forEach(file => {
    validateArticle(path.join(catDir, file));
  });
});

console.log(`\n📊 Validado: ${validated} artículos`);

if (warnings.length > 0) {
  console.log(`\n⚠️  Warnings (${warnings.length}):`);
  warnings.forEach(w => console.log(`  ${w}`));
}

if (errors.length > 0) {
  console.log(`\n❌ Errores (${errors.length}):`);
  errors.forEach(e => console.log(`  ${e}`));
  process.exit(1);
} else {
  console.log('\n✅ Todos los artículos son válidos!');
  process.exit(0);
}
