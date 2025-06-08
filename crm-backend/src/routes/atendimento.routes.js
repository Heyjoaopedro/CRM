const express = require('express');
const router = express.Router();
const {
  listarAtendimentos,
  criarAtendimento,
  atualizarAtendimento,
  deletarAtendimento
} = require('../controllers/atendimento.controller');

router.get('/', listarAtendimentos);
router.post('/', criarAtendimento);
router.put('/:id', atualizarAtendimento);
router.delete('/:id', deletarAtendimento);

module.exports = router;
