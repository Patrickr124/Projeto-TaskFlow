
const tasksRoutes = require('./routes/tasks');     //  rotas de tarefas
const authRoutes = require('./routes/auth');       //  Rotas de autenticação

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/tasks', tasksRoutes);  // Mantém  rotas de tarefas
app.use('/', authRoutes);        // Adiciona rotas /login e /register

// Inicialização do servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
