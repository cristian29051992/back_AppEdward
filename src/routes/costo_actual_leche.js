const express = require('express');
const router = express.Router();
const costoActualLecheController = require('../controllers/costo_actual_leche.controller');

// Ruta para obtener el costo actual de la leche
router.get('/', costoActualLecheController.getCostoActualLeche);

// Ruta para actualizar el costo actual de la leche
router.put('/:id', costoActualLecheController.update);

module.exports = router;
