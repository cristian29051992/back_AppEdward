// src\controllers\produccionController.js
const mysql = require('mysql2');

// Obtener toda la producción
// Obtener toda la producción con nombre del producto
exports.getAll = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const query = `
        SELECT 
            p.id AS produccion_id,
            p.fecha,
            p.id_producto,
            p.cantidad_kg,
            p.valor_total,
            pr.nombre AS producto_nombre
        FROM 
            produccion p
        JOIN 
            productos pr ON p.id_producto = pr.id
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al obtener la producción' });
        } else {
            res.json({ message: 'Producción obtenida con éxito', data: results });
        }
    });
};


// Obtener registros de producción en un rango de fechas
exports.getByDateRange = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const { fechaInicio, fechaFin } = req.query;

    // Asegúrate de que las fechas estén presentes y válidas
    if (!fechaInicio || !fechaFin) {
        res.status(400).json({ error: 'Las fechas inicio y fin son requeridas' });
        return;
    }

    const query = `
        SELECT p.id, p.fecha, p.id_producto, p.cantidad_kg, p.valor_total, prod.nombre AS nombre_producto
        FROM produccion p
        JOIN productos prod ON p.id_producto = prod.id
        WHERE p.fecha BETWEEN ? AND ?
    `;
    
    db.query(query, [fechaInicio, fechaFin], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Datos obtenidos con éxito', data: results });
    });
};


// Crear un nuevo registro de producción
exports.create = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const { fecha, id_producto, cantidad_kg, valor_total } = req.body;
    db.query('INSERT INTO produccion (fecha, id_producto, cantidad_kg, valor_total) VALUES (?, ?, ?, ?)', [fecha, id_producto, cantidad_kg, valor_total], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al crear el registro de producción' });
        } else {
            const { insertId, fecha, id_producto, cantidad_kg, valor_total } = results;
            res.json({ message: 'Registro de producción creado con éxito', data: { id: insertId, fecha, id_producto, cantidad_kg, valor_total } });
        }
    });
};

// Actualizar un registro de producción
exports.update = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const { fecha, id_producto, cantidad_kg, valor_total } = req.body;
    const { id } = req.params; // Obtener el id de req.params
    db.query('UPDATE produccion SET fecha = ?, id_producto = ?, cantidad_kg = ?, valor_total = ? WHERE id = ?', [fecha, id_producto, cantidad_kg, valor_total, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al actualizar el registro de producción' });
        } else {
            res.json({ message: 'Registro de producción actualizado con éxito', data: { id, fecha, id_producto, cantidad_kg, valor_total } });
        }
    });
};

// Eliminar un registro de producción
exports.delete = (req, res) => {
    const db = require('../app'); // Importar db aquí
    const { id } = req.params;
    db.query('DELETE FROM produccion WHERE id = ?', [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error al eliminar el registro de producción' });
        } else {
            res.json({ message: 'Registro de producción eliminado con éxito' });
        }
    });
};