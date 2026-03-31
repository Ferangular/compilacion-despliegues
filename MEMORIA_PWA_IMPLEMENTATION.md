# Implementación de PWA en Angular 21.2.5 - Guía Completa

## Contexto del Proyecto

- **Proyecto**: compilacion-despliegues
- **Angular CLI**: 21.2.2 (actualizado a 21.2.5)
- **Node.js**: 20.19.2
- **Package Manager**: npm 11.4.0
- **Sistema Operativo**: Windows x64

## Problemas de Versiones Encontrados

### Conflicto Inicial de Versiones

Al inicio del proyecto, existía un desalineamiento entre las versiones de Angular y sus dependencias:

```
Angular CLI       : 21.2.2
Angular           : <error>
@angular/build    : <error>
@angular/common   : <error>
@angular/core     : <error>
@angular/service-worker : <error>
```

### Solución de Versiones

Se actualizó el `package.json` para alinear todas las dependencias a la versión 21.2.5:

```json
{
  "dependencies": {
    "@angular/common": "21.2.5",
    "@angular/compiler": "21.2.5",
    "@angular/core": "21.2.5",
    "@angular/forms": "21.2.5",
    "@angular/platform-browser": "21.2.5",
    "@angular/router": "21.2.5",
    "@angular/service-worker": "21.2.5"
  },
  "devDependencies": {
    "@angular/build": "21.2.5",
    "@angular/cli": "21.2.5",
    "@angular/compiler-cli": "21.2.5"
  }
}
```

## Proceso de Implementación PWA

### 1. Configuración del Service Worker

#### Archivo: `src/app/app.config.ts`

Se añadió el provider del Service Worker con configuración optimizada:

```typescript
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    // ... otros providers
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
```

**Detalles importantes:**

- `enabled: !isDevMode()` - Solo activo en producción
- `registrationStrategy: 'registerWhenStable:30000'` - Espera 30s después de que la app esté estable

### 2. Configuración de Caché

#### Archivo: `ngsw-config.json`

Configuración de estrategias de caché para diferentes tipos de recursos:

```json
{
  "$schema": "./node_modules/@angular/service-worker/config/schema.json",
  "index": "/index.html",
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": ["/favicon.ico", "/index.html", "/manifest.webmanifest", "/*.css", "/*.js"]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": ["/**/*.(svg|cur|jpg|jpeg|png|apng|webp|avif|gif|otf|ttf|woff|woff2)"]
      }
    }
  ]
}
```

**Estrategias implementadas:**

- **App**: `prefetch` - Cache inmediato de archivos críticos
- **Assets**: `lazy` - Cache bajo demanda de imágenes y fuentes

### 3. Scripts de Build

#### Archivo: `package.json`

Scripts configurados para diferentes entornos:

```json
{
  "scripts": {
    "build:prod": "ng build --configuration production",
    "build:netlify": "ng build --configuration production --output-path dist/compilacion-despliegues/browser",
    "preview": "serve dist/compilacion-despliegues/browser"
  }
}
```

## Proceso de Pruebas

### 1. Compilación de Producción

```bash
npm run build:prod
```

### 2. Servir Localmente

```bash
npm run preview
# o
npx serve dist/compilacion-despliegues/browser -p 3000
```

### 3. Verificación en Chrome DevTools

#### Service Worker

- **Ruta**: Application → Service Workers
- **Estado esperado**: `ngsw-worker.js` activo con "activated & is running"
- **Funcionalidad**: Permite simular modo offline

#### Manifest

- **Ruta**: Application → Manifest
- **Verificación**: Datos de aplicación cargados correctamente

#### Cache Storage

- **Ruta**: Application → Storage → Cache Storage
- **Cachés esperadas**: `ngsw:/:app` y `ngsw:/:assets`

### 4. Pruebas de Funcionalidad

#### Test Offline

1. Marcar casilla "Offline" en Service Workers
2. Refrescar página (F5)
3. **Resultado esperado**: App funciona completamente offline

#### Test de Instalación

- **Indicador**: Icono de instalación en barra de direcciones
- **Funcionalidad**: App instalable como aplicación de escritorio

## Problemas Comunes y Soluciones

### 1. Error de Versiones

**Problema**: Desalineación entre Angular CLI y dependencias
**Solución**: Actualizar todas las dependencias a la misma versión (21.2.5)

### 2. Service Worker No Funciona

**Problema**: Página en blanco en modo offline
**Solución**:

- Navegar por toda la app antes de probar offline
- Esperar a que el Service Worker cachee los recursos
- Verificar que se esté sirviendo desde `dist/compilacion-despliegues/browser`

### 3. Problemas con SSL

**Problema**: Comando `serve --ssl` no soportado
**Solución**: Usar `ng serve --ssl` o `http-server` con certificados auto-firmados

## Verificación Final

### Checklist de PWA Funcional

- ✅ Service Worker activo y registrado
- ✅ Manifest detectado y cargado
- ✅ Caché de recursos funcionando
- ✅ Navegación offline operativa
- ✅ Icono de instalación visible
- ✅ Todas las rutas accesibles sin conexión

### Herramientas de Verificación

- **Chrome DevTools**: Application tab
- **Consola**: Sin errores de Service Worker
- **Network**: Recursos con iconos de caché (⚙️)

## Resultado Final

La aplicación Angular 21.2.5 está completamente configurada como PWA con:

- Funcionalidad offline completa
- Capacidad de instalación
- Estrategias de caché optimizadas
- Configuración de producción lista para despliegue

## Notas Importantes

1. **No se incluyeron iconos personalizados** en el manifest
2. **La configuración es genérica** y puede ser adaptada según necesidades específicas
3. **Las imágenes de referencia** deben ser capturas de pantalla de:
   - Chrome DevTools mostrando Service Worker activo
   - Aplicación funcionando en modo offline
   - Icono de instalación en la barra de direcciones
   - Cache Storage con los recursos cacheados

## Referencias de Imágenes

_[AQUÍ DEBES INSERTAR LAS CAPTURAS DE PANTALLA]_

1. **Service Worker Activo**: DevTools mostrando `ngsw-worker.js` con estado "activated & is running"
2. **Modo Offline**: Aplicación funcionando completamente sin conexión
3. **Icono de Instalación**: Botón de instalación en la barra de direcciones del navegador
4. **Cache Storage**: Contenido de las cachés `ngsw:/:app` y `ngsw:/:assets`

---

**Fecha**: 31 de marzo de 2026  
**Versión Angular**: 21.2.5  
**Estado**: ✅ PWA completamente funcional
