const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const clientRoutes = require('./routes/cliente.routes');
const atendimentoRoutes = require('./routes/atendimento.routes');

app.use(cors());
app.use(express.json());
app.use('/atendimentos', atendimentoRoutes);
app.get('/', (req, res) => {
  res.send('API do CRM rodando!🚀');
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

