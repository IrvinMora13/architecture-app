require('dotenv').config();
const mysql = require('mysql2/promise');  

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const connectDB = async () => {
    try {
        await pool.getConnection();
        console.log("✅ Base de datos conectada correctamente.");
    } catch (error) {
        console.error("❌ Error al conectar la base de datos:", error.message);
        process.exit(1);
    }
};

module.exports = { pool, connectDB };
