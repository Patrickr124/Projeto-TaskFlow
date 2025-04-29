const db = require('../db');


exports.getAllTasks = async (req, res) => {
  const { status } = req.query;
  const userId = req.user.userId;

  let query = 'SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC';
  const params = [userId];

  if (status) {
    query = 'SELECT * FROM tasks WHERE user_id = $1 AND completed = $2 ORDER BY id DESC';
    params.push(status === 'completed');
  }

  try {
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao buscar tarefas');
  }
};


exports.createTask = async (req, res) => {
  const { title } = req.body;
  const userId = req.user.userId;

  try {
    const result = await db.query(
      'INSERT INTO tasks(title, user_id) VALUES($1, $2) RETURNING *',
      [title, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao criar tarefa');
  }
};


exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const userId = req.user.userId;

  try {
    const result = await db.query(
      'UPDATE tasks SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *',
      [title, id, userId]
    );
    if (result.rowCount === 0) return res.status(404).send('Tarefa não encontrada');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar tarefa');
  }
};


exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const result = await db.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2',
      [id, userId]
    );
    if (result.rowCount === 0) return res.status(404).send('Tarefa não encontrada');
    res.status(204).send(); // No Content
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao excluir tarefa');
  }
};


exports.markTaskComplete = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const result = await db.query(
      'UPDATE tasks SET completed = true WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, userId]
    );
    if (result.rowCount === 0) return res.status(404).send('Tarefa não encontrada');
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao marcar tarefa como concluída');
  }
};
