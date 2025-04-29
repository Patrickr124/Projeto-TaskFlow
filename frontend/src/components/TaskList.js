import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';
import AddTask from './AddTask';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const loadTasks = () => {
    let url = '/tasks';
    if (filter) {
      url += `?status=${filter}`;
    }

    api.get(url)
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadTasks();
  }, [filter]);

  const deleteTask = (id) => {
    api.delete(`/tasks/${id}`)
      .then(() => loadTasks())
      .catch(err => console.error(err));
  };

  const updateTask = (id) => {
    const newTitle = prompt('Novo título:');
    if (newTitle) {
      api.put(`/tasks/${id}`, { title: newTitle })
        .then(() => loadTasks())
        .catch(err => console.error(err));
    }
  };

  const markTaskComplete = (id) => {
    api.patch(`/tasks/${id}/complete`)
      .then(() => loadTasks())
      .catch(err => console.error(err));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-blue-600">Tarefas</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Sair
          </button>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <label htmlFor="filter-select" className="text-sm text-gray-700">Filtrar:</label>
          <select
            id="filter-select"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="">Todos</option>
            <option value="completed">Concluídas</option>
            <option value="pending">Pendentes</option>
          </select>
        </div>

        <AddTask onTaskAdded={loadTasks} />

        <ul className="mt-6 space-y-4">
          {tasks.length === 0 ? (
            <li className="text-center text-gray-500">Nenhuma tarefa encontrada.</li>
          ) : (
            tasks.map(task => (
              <li key={task.id} className="flex justify-between items-center bg-gray-50 p-3 rounded border">
                <div>
                  <span className="font-medium">{task.title}</span>
                  <span className="ml-2 text-sm">
                    {task.completed ? "✅ Concluída" : "⏳ Pendente"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateTask(task.id)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Atualizar
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                  {!task.completed && (
                    <button
                      onClick={() => markTaskComplete(task.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                    >
                      Concluir
                    </button>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default TaskList;
