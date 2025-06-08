const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET /clientes
async function listarClientes(req, res) {
  const clientes = await prisma.cliente.findMany({
    orderBy: { id: 'desc' }
  });
  res.json(clientes);
}

// POST /clientes
async function criarCliente(req, res) {
  const { nome, telefone, email, endereco } = req.body;
  try {
    const novoCliente = await prisma.cliente.create({
      data: { nome, telefone, email, endereco },
    });
    res.status(201).json(novoCliente);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao criar cliente.' });
  }
}

// PUT /clientes/:id
async function atualizarCliente(req, res) {
  const id = parseInt(req.params.id);
  const { nome, telefone, email, endereco } = req.body;

  try {
    const clienteAtualizado = await prisma.cliente.update({
      where: { id },
      data: { nome, telefone, email, endereco },
    });
    res.json(clienteAtualizado);
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao atualizar cliente.' });
  }
}

// DELETE /clientes/:id
async function deletarCliente(req, res) {
  const id = parseInt(req.params.id);

  try {
    await prisma.cliente.delete({
      where: { id },
    });
    res.json({ mensagem: 'Cliente deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ erro: 'Erro ao deletar cliente.' });
  }
}


module.exports = {
  listarClientes,
  criarCliente,
  atualizarCliente,
  deletarCliente,
};

