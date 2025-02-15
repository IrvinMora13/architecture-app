const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];


  if (!token) return res.status(401).json({ msg: "No autorizado" });

  try {
    const decoded = jwt.verify(token, "secreto_seguro");
    req.user = decoded;
    next();
  } catch (error) {
    console.log("Error en la verificación del token:", error.message); // <-- IMPRIME ERRORES
    res.status(401).json({ msg: "Token no válido" });
  }
};

module.exports = authMiddleware;
