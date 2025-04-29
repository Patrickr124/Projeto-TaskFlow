import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../axios'; 

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError('Usuário e senha não podem estar em branco.');
      return;
    }

    try {
      const response = await api.post('/register', {
        username: trimmedUsername,
        password: trimmedPassword,
      });

      if (response.status === 201) {
        setSuccess('Cadastro realizado com sucesso! Redirecionando...');
        setError(null);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Erro ao cadastrar. Tente novamente.');
        setSuccess(null);
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Erro ao cadastrar. Tente novamente.';
      setError(msg);
      setSuccess(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-[-120px]">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Cadastro</h2>

        {error && (
          <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
        )}

        {success && (
          <p className="mb-4 text-green-500 text-sm text-center">{success}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Usuário</label>
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
          >
            Cadastrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Faça login aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
