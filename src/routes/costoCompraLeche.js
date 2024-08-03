// src\routes\costoCompraLecheRouter.js
const express = require('express');
const router = express.Router();
const costoCompraLecheController = require('../controllers/costoCompraLecheController');

router.get('/', costoCompraLecheController.getAll);
router.get('/rango-fechas', costoCompraLecheController.getByDateRange);
router.post('/', costoCompraLecheController.create);
router.put('/:id', costoCompraLecheController.update);
router.delete('/:id', costoCompraLecheController.delete);

module.exports = router;