const express = require('express');
const router = express.Router();

const {
  listarClientes,
  criarCliente,
  atualizarCliente,
  deletarCliente
} = require('../controllers/cliente.controller');

router.get('/', listarClientes);
router.post('/', criarCliente);
router.put('/:id', atualizarCliente);
router.delete('/:id', deletarCliente);

module.exports = router;
