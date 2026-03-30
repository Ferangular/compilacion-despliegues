#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build optimizado para producción...\n');

// Limpiar dist anterior
if (fs.existsSync('dist')) {
  console.log('🧹 Limpiando directorio dist...');
  fs.rmSync('dist', { recursive: true, force: true });
}

// Build de producción con optimizaciones
console.log('📦 Ejecutando build de producción...');
try {
  execSync('ng build --configuration production', { stdio: 'inherit' });
  console.log('✅ Build completado exitosamente\n');
} catch (error) {
  console.error('❌ Error en el build:', error.message);
  process.exit(1);
}

// Analizar tamaño del bundle
console.log('📊 Analizando tamaño del bundle...');
const distPath = path.join(process.cwd(), 'dist/compilacion-despliegues/browser');

if (fs.existsSync(distPath)) {
  const files = fs.readdirSync(distPath, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .map(dirent => {
      const filePath = path.join(distPath, dirent.name);
      const stats = fs.statSync(filePath);
      return {
        name: dirent.name,
        size: stats.size,
        sizeKB: (stats.size / 1024).toFixed(2)
      };
    })
    .sort((a, b) => b.size - a.size);

  console.log('\n📋 Archivos generados:');
  files.forEach(file => {
    const sizeIcon = file.size > 500000 ? '🔴' : file.size > 100000 ? '🟡' : '🟢';
    console.log(`${sizeIcon} ${file.name}: ${file.sizeKB} KB`);
  });

  const totalSize = files.reduce((acc, file) => acc + file.size, 0);
  console.log(`\n📦 Tamaño total: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);

  // Verificar budgets
  const mainJs = files.find(f => f.name.includes('main'));
  if (mainJs && mainJs.size > 500000) {
    console.log('⚠️  Advertencia: El bundle principal excede el límite recomendado (500KB)');
  }

  if (mainJs && mainJs.size > 1000000) {
    console.log('❌ Error: El bundle principal excede el límite máximo (1MB)');
    process.exit(1);
  }
}

// Generar reporte de bundle analysis
console.log('\n📈 Generando bundle analysis...');
try {
  execSync('ng build --configuration production --stats-json', { stdio: 'inherit' });
  console.log('✅ Stats JSON generado para webpack-bundle-analyzer');
  console.log('💡 Para analizar el bundle: npx webpack-bundle-analyzer dist/compilacion-despliegues/browser/stats.json');
} catch (error) {
  console.warn('⚠️  No se pudo generar el análisis de bundle:', error.message);
}

// Optimizar archivos para deploy
console.log('\n🔧 Optimizando archivos para deploy...');
try {
  // Comprimir archivos gzip
  execSync('find dist/compilacion-despliegues/browser -type f -exec gzip -k {} \\;', { stdio: 'inherit' });
  console.log('✅ Archivos comprimidos con gzip');
} catch (error) {
  console.warn('⚠️  No se pudo comprimir archivos gzip:', error.message);
}

console.log('\n🎉 Build optimizado completado!');
console.log('📁 Output: dist/compilacion-despliegues/browser/');
console.log('🚀 Listo para deploy en producción');
