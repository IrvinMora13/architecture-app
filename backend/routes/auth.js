const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const db = require("../db");

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [results] = await db.query("SELECT username, email FROM users WHERE id = ?", [userId]);

    if (results.length === 0) return res.status(404).json({ msg: "Usuario no encontrado" });

    res.json(results[0]);  // Devuelve el primer resultado
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

module.exports = router;
