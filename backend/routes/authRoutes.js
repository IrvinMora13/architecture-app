const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();

async function generateUsername() {
    const [rows] = await db.promise().query('SELECT id FROM users ORDER BY id DESC LIMIT 1');
    const lastId = rows.length > 0 ? rows[0].id : 0;
    return `A${(lastId + 1).toString().padStart(5, '0')}`;
}

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    const [existingUser] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
        return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    const userId = await generateUsername();
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    const sql = 'INSERT INTO users (username, email, password_hash, salt) VALUES (?, ?, ?, ?)';
    try {
        const [result] = await db.query(sql, [userId, email, passwordHash, salt]);
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (err) {
        res.status(500).json({ error: err });
    };
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE email = ?';
    try {
        const [results] = await db.query(sql, [email]);
        if (results.length === 0) return res.status(401).json({ message: 'Usuario no encontrado' });

        const user = results[0];
        const isMatch = bcrypt.compareSync(password, user.password_hash);
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, email: user.email} });
    } catch (err) {
        console.error('Error en login:', err);
        res.status(500).json({ error: err });
    }
});



module.exports = router;
