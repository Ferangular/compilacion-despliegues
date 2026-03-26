const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuración de la base de datos PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'firebase_demo',
  user: process.env.DB_USER || 'demo_user',
  password: process.env.DB_PASSWORD || 'demo_password',
});

// Verificar conexión a la base de datos
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error conectando a PostgreSQL:', err);
  } else {
    console.log('✅ Conectado a PostgreSQL:', res.rows[0].now);
  }
});

// API Endpoints

// GET /api/users - Obtener todos los usuarios
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at, is_active FROM users WHERE is_active = true ORDER BY created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/users/:id - Obtener un usuario por ID
app.get('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, created_at, is_active FROM users WHERE id = $1 AND is_active = true',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error obteniendo usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/users - Crear nuevo usuario
app.post('/api/users', async (req, res) => {
  const { name, email, role = 'user' } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Nombre y email son requeridos' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, role) VALUES ($1, $2, $3) RETURNING id, name, email, role, created_at, is_active',
      [name, email, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creando usuario:', error);
    if (error.code === '23505') {
      res.status(409).json({ error: 'El email ya existe' });
    } else {
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
});

// GET /api/features - Obtener todas las características
app.get('/api/features', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, title, description, icon, category FROM features WHERE is_active = true ORDER BY category, title'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo features:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/stats - Obtener estadísticas
app.get('/api/stats', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT metric_name, metric_value, metric_label, category FROM stats ORDER BY category'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// GET /api/health - Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as total_users FROM users WHERE is_active = true');
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      total_users: parseInt(result.rows[0].total_users)
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    });
  }
});

// Endpoint por defecto
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Firebase Demo API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users',
      features: '/api/features',
      stats: '/api/stats',
      health: '/api/health'
    }
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor API corriendo en http://localhost:${PORT}`);
  console.log('📊 Endpoints disponibles:');
  console.log('   GET /api/users - Lista de usuarios');
  console.log('   GET /api/features - Características');
  console.log('   GET /api/stats - Estadísticas');
  console.log('   GET /api/health - Health check');
});
