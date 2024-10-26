const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.POSTGRES_USER,
    host: 'localhost' || process.env.POSTGRES_HOST, // Fallback to localhost if not in Docker
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT || 5432, // Change to 5433 if needed
    max: 40,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
});
// console.log(`Connecting to database at ${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}`);
pool.connect();

module.exports = pool;


