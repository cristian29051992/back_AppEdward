const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors'); // Importa el paquete cors

const app = express();
const port = 3000;

// Configura CORS para permitir solicitudes desde tu frontend
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Configurar la conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '2905',
    database: 'bd_quesillera_edward'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});

// Rutas
const costoCompraLecheRouter = require('./routes/costoCompraLeche');
const productosRouter = require('./routes/productos');
const produccionRouter = require('./routes/produccion');
const vistaCompralecheProduccionRouter = require('./routes/vista_compraleche_produccion'); 
const costoActualLecheRouter = require('./routes/costo_actual_leche');

app.use('/costo-compra-leche', costoCompraLecheRouter);
app.use('/productos', productosRouter);
app.use('/produccion', produccionRouter);
app.use('/vista-compraleche-produccion', vistaCompralecheProduccionRouter); 
app.use('/costo-actual-leche', costoActualLecheRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = db;
