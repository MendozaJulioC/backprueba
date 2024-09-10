require('dotenv').config();
const { Pool } = require('pg');

// Configuración para la base de datos de desarrollo
const devConfig = {
    user: process.env.K_PGUSER,
    host: process.env.K_PGHOST,
    database: process.env.K_PGDATABASE,
    password: process.env.K_PGPASSWORD,
    port: process.env.K_PGPORT,
    ssl: false // Desactiva SSL en desarrollo
};

const prodConfig = {
    user: process.env.PROD_PGUSER,
    host: process.env.PROD_PGHOST,
    database: process.env.PROD_PGDATABASE,
    password: process.env.PROD_PGPASSWORD,
    port: process.env.PROD_PGPORT,
    // ssl: false // Desactiva SSL en desarrollo
};

const webConfig = {
    user: process.env.W_PGUSER,
    host: process.env.W_PGHOST,
    database: process.env.W_PGDATABASE,
    password: process.env.W_PGPASSWORD,
    port: process.env.W_PGPORT,
    ssl: { rejectUnauthorized: false } // SSL para la base de datos web
};


// Crear los pools de conexiones
const devPool = new Pool(devConfig);
const prodPool = new Pool(prodConfig);
const webPool = new Pool(webConfig);

// Manejo de errores de conexión
devPool.on('error', (err, client) => {
    console.error('Error en el pool de conexiones de desarrollo:', err);
});
prodPool.on('error', (err, client) => {
    console.error('Error en el pool de conexiones de producción:', err);
});
webPool.on('error', (err, client) => {
    console.error('Error en el pool de conexiones web:', err);
});

// Exportar los pools de conexiones
module.exports = { devPool, prodPool, webPool };

