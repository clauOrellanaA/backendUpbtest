const { Router } = require('express');
const productoController = require('../controllers/producto.controller');

const router = Router();

router.get('/', productoController.listar);
router.get('/buscar', productoController.buscarPorNombre);
router.get('/:id', productoController.obtener);
router.post('/', productoController.crear);
router.put('/:id', productoController.actualizar);
router.delete('/:id', productoController.eliminar);

module.exports = router;
