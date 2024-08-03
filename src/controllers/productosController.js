// src\controllers\productosController.js
const mysql = require('mysql2');

// Obtener todos los productos
exports.getAll = (req, res) => {
    const db = require('../app'); // Importar db aquí
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
};

// Crear un nuevo producto
exports.create = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const { nombre, precio_kg } = req.body;
    db.query('INSERT INTO productos (nombre, precio_kg) VALUES (?, ?)', [nombre, precio_kg], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: results.insertId, nombre, precio_kg });
    });
};

// Actualizar un producto
exports.update = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const { id } = req.params;
    const { nombre, precio_kg } = req.body;
    db.query('UPDATE productos SET nombre = ?, precio_kg = ? WHERE id = ?', [nombre, precio_kg, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Producto actualizado con éxito', data: { id, nombre, precio_kg } });
    });
};

// Eliminar un producto
exports.delete = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const { id } = req.params;
    db.query('DELETE FROM productos WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Producto eliminado con éxito' });
    });
};