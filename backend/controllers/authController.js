const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');


async function generateUsername() {
    const [rows] = await pool.query('SELECT id FROM users ORDER BY id DESC LIMIT 1');
    const lastId = rows.length > 0 ? rows[0].id : 0;
    return `A${(lastId + 1).toString().padStart(5, '0')}`;
}

const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }

        const username = await generateUsername();
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);


        await pool.query('INSERT INTO users (username, email, password_hash,salt) VALUES (?,?, ?,?)', [username, email, passwordHash,salt]);
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const [user] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (user.length === 0) return res.status(401).json({ message: 'Usuario no encontrado' });
        
        const isMatch = await bcrypt.compare(password, user[0].password_hash);
        
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });
        const token = jwt.sign({ id: user[0].username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ token, user: { id: user[0].username, email: user[0].email } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error en el servidor login', error });
    }
};

const getMe = async (req, res) => {
    try {
        const userId = req.user.id; 

        const [user] = await pool.query('SELECT username, email FROM users WHERE username = ?', [userId]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ user: user[0] });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

module.exports = { registerUser, loginUser,getMe };
