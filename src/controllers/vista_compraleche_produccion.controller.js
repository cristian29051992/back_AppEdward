const mysql = require('mysql2');

// Obtener los totales de compra de leche y producción agrupados por fecha
exports.getTotales = (req, res) => {
    const db = require('../app'); // Importar db aquí

    const query = `
        SELECT 
            fecha,
            SUM(costo_total) AS totalCompraLeche,
            SUM(valor_total) AS totalProduccion,
            SUM(valor_total) - SUM(costo_total) AS ganancias,
            SUM(cantidad_kg) AS totalKgQueso,
            SUM(cantidad_litros) AS totalLitrosLeche,
            COUNT(DISTINCT CASE WHEN id IS NOT NULL THEN id END) AS totalProductosElaborados
        FROM (
            SELECT 
                DATE(ccl.fecha) AS fecha,
                ccl.costo_total,
                0 AS valor_total,
                0 AS cantidad_kg,
                ccl.cantidad_litros,
                NULL AS id
            FROM 
                costo_compra_leche ccl
            UNION ALL
            SELECT 
                DATE(p.fecha) AS fecha,
                0 AS costo_total,
                p.valor_total,
                p.cantidad_kg,
                0 AS cantidad_litros,
                p.id
            FROM 
                produccion p
        ) AS combined
        GROUP BY 
            fecha
        ORDER BY 
            fecha DESC;  -- Ordenar por fecha de forma descendente
    `;

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json(results);
    });
};
