const { pool } = require('../config/db');

const getActiveProjects = async (req, res) => {
    try {
        const [results] = await pool.query("SELECT name, type_id, progress_percentage FROM projects AS p INNER JOIN project_progress AS progress ON p.id = progress.project_id");
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Error obteniendo los proyectos activos' });
    }
};

module.exports = { getActiveProjects };