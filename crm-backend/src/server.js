const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite JSON no body das requisições

// Rotas
const clienteRoutes = require('./routes/cliente.routes');
const atendimentoRoutes = require('./routes/atendimento.routes');

app.use('/clientes', clienteRoutes);
app.use('/atendimentos', atendimentoRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.send('API do CRM rodando 🚀');
});

// Inicia o servidor
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
