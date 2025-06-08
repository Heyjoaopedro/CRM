const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /atendimentos
async function listarAtendimentos(req, res) {
  const atendimentos = await prisma.atendimento.findMany({
    include: { cliente: true },
    orderBy: { data: 'desc' }
  });
  res.json(atendimentos);
}

// POST /atendimentos
async function criarAtendimento(req, res) {
  const { descricao, data, valor, pago, clienteId } = req.body;
  try {
    const atendimento = await prisma.atendimento.create({
      data: { descricao, data: new Date(data), valor, pago, clienteId }
    });
    res.status(201).json(atendimento);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar atendimento.' });
  }
}

// PUT /atendimentos/:id
async function atualizarAtendimento(req, res) {
  const id = parseInt(req.params.id);
  const { descricao, data, valor, pago, clienteId } = req.body;
  try {
    const atendimentoAtualizado = await prisma.atendimento.update({
      where: { id },
      data: { descricao, data: new Date(data), valor, pago, clienteId }
    });
    res.json(atendimentoAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar atendimento.' });
  }
}

// DELETE /atendimentos/:id
async function deletarAtendimento(req, res) {
  const id = parseInt(req.params.id);
  try {
    await prisma.atendimento.delete({
      where: { id }
    });
    res.json({ mensagem: 'Atendimento excluído com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar atendimento.' });
  }
}

module.exports = {
  listarAtendimentos,
  criarAtendimento,
  atualizarAtendimento,
  deletarAtendimento
};
