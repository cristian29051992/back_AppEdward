const express = require('express');
const router = express.Router();
const vistaCompralecheProduccionController = require('../controllers/vista_compraleche_produccion.controller');

router.get('/totales', vistaCompralecheProduccionController.getTotales);

module.exports = router;
