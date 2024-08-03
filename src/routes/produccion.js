const express = require('express');
const router = express.Router();
const produccionController = require('../controllers/produccionController');

router.get('/', produccionController.getAll);
router.get('/rango-fechas', produccionController.getByDateRange);
router.post('/', produccionController.create);
router.put('/:id', produccionController.update);
router.delete('/:id', produccionController.delete);

module.exports = router;
