import React, { useState } from 'react';
import api from '../axios';

function AddTask({ onTaskAdded }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await api.post('/tasks', { title });
      setTitle('');
      onTaskAdded();
    } catch (err) {
      console.error('Erro ao adicionar tarefa:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-6">
      <label htmlFor="new-task" className="text-sm font-medium text-gray-700">
        Nova tarefa:
      </label>
      <input
        id="new-task"
        name="new-task"
        type="text"
        placeholder="Digite o título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
      >
        Adicionar
      </button>
    </form>
  );
}

export default AddTask;
