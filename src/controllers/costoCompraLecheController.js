// src\controllers\costoCompraLecheController.js
const mysql = require('mysql2');

// Obtener todos los costos de compra de leche
exports.getAll = (req, res) => {
    const db = require('../app'); // Importar db aquí
    db.query('SELECT * FROM costo_compra_leche order by id desc', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

// src/controllers/costoCompraLecheController.js
exports.getByDateRange = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const { fechaInicio, fechaFin } = req.query;

    // Asegúrate de que las fechas estén presentes y válidas
    if (!fechaInicio || !fechaFin) {
        res.status(400).json({ error: 'Las fechas inicio y fin son requeridas' });
        return;
    }

    const query = `
        SELECT * FROM costo_compra_leche 
        WHERE fecha BETWEEN ? AND ?
    `;
    db.query(query, [fechaInicio, fechaFin], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};


// Crear un nuevo costo de compra de leche
exports.create = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const { fecha, cantidad_litros, costo_total } = req.body;
    db.query('INSERT INTO costo_compra_leche (fecha, cantidad_litros, costo_total) VALUES (?, ?, ?)', [fecha, cantidad_litros, costo_total], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: results.insertId, fecha, cantidad_litros, costo_total });
    });
};

// Actualizar un costo de compra de leche
exports.update = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const { id } = req.params;
    const { fecha, cantidad_litros, costo_total } = req.body;
    db.query('UPDATE costo_compra_leche SET fecha = ?, cantidad_litros = ?, costo_total = ? WHERE id = ?', [fecha, cantidad_litros, costo_total, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Costo de compra de leche actualizado con éxito', data: { id, fecha, cantidad_litros, costo_total } });
    });
};

// Eliminar un costo de compra de leche
exports.delete = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const { id } = req.params;
    db.query('DELETE FROM costo_compra_leche WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Costo de compra de leche eliminado con éxito' });
    });
};