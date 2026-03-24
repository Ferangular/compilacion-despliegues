# 🚀 Curso: Introducción a Compilación y Despliegues

> Un curso completo sobre compilación, optimización y despliegue de aplicaciones Angular modernas

## 📋 Descripción del Curso

Este curso está diseñado para desarrolladores que desean dominar el proceso de compilación y despliegue de aplicaciones Angular. Aprenderás desde los fundamentos básicos hasta técnicas avanzadas de optimización y estrategias de despliegue en la nube.

---

## 📚 Módulos del Curso

### 🏗️ Módulo 1: Fundamentos de Compilación en Angular
1. **Introducción a la compilación en frontend**
   - Conceptos básicos de compilación
   - Por qué es importante en el desarrollo moderno
   
2. **Diferencias entre JIT y AOT**
   - Just-In-Time compilation
   - Ahead-Of-Time compilation
   - Ventajas y casos de uso
   
3. **Configuración de la compilación en Angular**
   - Configuración básica de angular.json
   - Opciones de compilación disponibles

---

### ⚙️ Módulo 2: Configuración de Entornos
1. **Variables de entorno en Angular**
   - Uso de environment.ts y environment.prod.ts
   - Mejores prácticas para variables de entorno
   
2. **Configuración de angular.json para distintos entornos**
   - Configuraciones de desarrollo, staging y producción
   - Personalización de builds
   
3. **Uso de fileReplacements y buenas prácticas**
   - Reemplazo de archivos por entorno
   - Estrategias de configuración

---

### 🛠️ Módulo 3: Herramientas de Build
1. **Webpack: El fundamento de la construcción de aplicaciones**
   - Arquitectura de Webpack
   - Loaders y plugins
   
2. **Configuración básica de Webpack en Angular**
   - Configuración por defecto de Angular CLI
   - Personalización del webpack.config.js
   
3. **Optimización de bundles con Webpack**
   - Code splitting
   - Tree shaking
   - Minificación
   
4. **Esbuild: La evolución de la velocidad en builds**
   - Introducción a Esbuild
   - Integración con Angular
   - Comparación de rendimiento

---

### ☁️ Módulo 4: Despliegue en la Nube
1. **Plataformas de despliegue en la nube**
   - AWS S3 + CloudFront
   - Vercel, Netlify
   - Google Cloud Platform
   
2. **Estrategias de despliegue**
   - Despliegue continuo (CI/CD)
   - Blue-Green Deployment
   - Canary Releases
   
3. **Consideraciones clave para el despliegue en la nube**
   - Seguridad
   - Escalabilidad
   - Costos

---

### ⚡ Módulo 5: Optimización para Producción
1. **Técnicas de optimización**
   - Lazy loading de módulos
   - Preloading strategies
   - Optimización de imágenes
   
2. **Uso de source maps y debugging en producción**
   - Configuración de source maps
   - Herramientas de debugging
   
3. **Estrategias de carga de recursos**
   - Preloading, lazy loading
   - Critical CSS
   - Resource hints
   
4. **Optimización de assets y uso de CDNs**
   - Compresión de imágenes
   - Optimización de fuentes
   - Configuración de CDN
   
5. **Estrategias de cache**
   - Browser cache
   - Service Workers
   - Cache API
   
6. **Herramientas para medir el rendimiento**
   - Lighthouse
   - Web Vitals
   - Bundle analyzer

---

### 🎯 Módulo 6: Proyecto Práctico
- Aplicación de todos los conceptos aprendidos
- Configuración completa de un proyecto real
- Despliegue en plataforma de nube
- Optimización y medición de rendimiento

---

## 🛠️ Requisitos Previos

- Conocimientos básicos de Angular
- Node.js instalado
- Angular CLI configurado
- Cuenta en algún servicio de nube (opcional para Módulo 4)

---

## 🚀 Comenzando

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd compilacion-despliegues

# Instalar dependencias
npm install
```

### Servidor de Desarrollo
```bash
# Iniciar servidor de desarrollo
ng serve

# Navegar a http://localhost:4200/
```

### Build de Producción
```bash
# Build para producción
ng build --configuration production

# Build con análisis de bundle
ng build --configuration production --stats-json
```

---

## 📖 Recursos Adicionales

- [Documentación Oficial de Angular](https://angular.dev)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
- [Webpack Documentation](https://webpack.js.org/)
- [Lighthouse Performance Testing](https://developers.google.com/web/tools/lighthouse)

---

## 📄 Licencia

Este proyecto es parte de un curso educativo. Uso exclusivo para fines de aprendizaje.

---

## 🤝 Contribuciones

Las sugerencias y mejoras son bienvenidas. Por favor, abre un issue para discutir cambios significativos antes de hacer un pull request.

---

*Hecho con ❤️ para la comunidad de desarrolladores Angular*
