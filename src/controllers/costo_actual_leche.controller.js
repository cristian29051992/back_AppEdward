const mysql = require('mysql2');

// Obtener el costo actual de la leche
exports.getCostoActualLeche = (req, res) => {
    const db = require('../app'); // Importar db aquí
    db.query('SELECT costo FROM costo_actual_leche ORDER BY id_costo_actual_leche DESC LIMIT 1', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (results.length > 0) {
            res.json(results[0].costo);
        } else {
            res.status(404).json({ error: 'No se encontró el costo actual de la leche' });
        }
    });
};

// Actualizar el costo actual de la leche
exports.update = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const { id } = req.params;
    const { costo } = req.body;
    db.query('UPDATE costo_actual_leche SET costo = ? WHERE id_costo_actual_leche = ?', [costo, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Costo actualizado con éxito', data: { id, costo } });
    });
};
