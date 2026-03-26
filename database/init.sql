-- Script de inicialización para PostgreSQL
-- Crear tablas e insertar datos de ejemplo

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Tabla de características/features
CREATE TABLE IF NOT EXISTS features (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de estadísticas
CREATE TABLE IF NOT EXISTS stats (
    id SERIAL PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value VARCHAR(50) NOT NULL,
    metric_label VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL
);

-- Insertar datos de ejemplo en tabla users
INSERT INTO users (name, email, role, is_active) VALUES
('Ana García', 'ana.garcia@ejemplo.com', 'admin', true),
('Carlos Rodríguez', 'carlos.rodriguez@ejemplo.com', 'developer', true),
('María López', 'maria.lopez@ejemplo.com', 'user', true),
('Juan Martínez', 'juan.martinez@ejemplo.com', 'developer', true),
('Laura Sánchez', 'laura.sanchez@ejemplo.com', 'user', true),
('Pedro González', 'pedro.gonzalez@ejemplo.com', 'admin', true),
('Sofía Fernández', 'sofia.fernandez@ejemplo.com', 'user', true),
('Miguel Torres', 'miguel.torres@ejemplo.com', 'developer', true);

-- Insertar datos en tabla features
INSERT INTO features (title, description, icon, category) VALUES
('Rendimiento Ultra Rápido', 'CDN global y compresión automática para máxima velocidad', 'zap', 'performance'),
('SSL Gratuito', 'Certificados SSL automáticos y renovación sin esfuerzo', 'shield', 'security'),
('Escalabilidad Infinita', 'Soporte para millones de usuarios sin configuración adicional', 'trending-up', 'infrastructure'),
('CI/CD Integrado', 'Pipeline automático de build y despliegue', 'git-branch', 'deployment'),
('Analytics en Tiempo Real', 'Monitoreo y análisis de rendimiento en vivo', 'bar-chart', 'analytics'),
('Multi-región', 'Despliegue en múltiples regiones geográficas', 'globe', 'infrastructure');

-- Insertar datos en tabla stats
INSERT INTO stats (metric_name, metric_value, metric_label, category) VALUES
('uptime', '99.9', 'Uptime', 'performance'),
('load_time', '< 1s', 'Load Time', 'performance'),
('ssl_cert', 'Free', 'SSL Certificate', 'security'),
('deployments', '1000+', 'Total Deployments', 'deployment'),
('users', '500K+', 'Active Users', 'usage'),
('regions', '25+', 'Global Regions', 'infrastructure');

-- Crear índices para mejor rendimiento
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_features_category ON features(category);
CREATE INDEX IF NOT EXISTS idx_stats_category ON stats(category);

-- Mostrar datos insertados
SELECT '=== Usuarios creados ===' as info;
SELECT id, name, email, role, is_active FROM users;

SELECT '=== Features creadas ===' as info;
SELECT id, title, category, is_active FROM features;

SELECT '=== Estadísticas creadas ===' as info;
SELECT metric_name, metric_value, category FROM stats;
