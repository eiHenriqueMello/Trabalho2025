const express = require('express');
const router = express.Router();

const ProdutoController = require('./../controllers/ProdutoController');
const ClienteController = require('./../controllers/ClienteController');
const PedidoController = require('./../controllers/PedidoController');
const CidadeController = require('./../controllers/CidadeController'); 

router.post('/clientes', ClienteController.store);
router.get('/clientes/:id', ClienteController.show);
router.put('/clientes/:id', ClienteController.update);

router.get('/produtos', ProdutoController.index); 

router.post('/pedidos', PedidoController.store);
router.get('/pedidos', PedidoController.index); 


router.post('/admin/cidades', CidadeController.store); 
router.post('/admin/produtos', ProdutoController.store);
router.get('/admin/pedidos', PedidoController.indexAll);

module.exports = router;