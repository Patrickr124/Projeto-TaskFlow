import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../axios';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      if (response.data.token) {
        login(response.data.token);
        navigate('/tasks');
      } else {
        setError('Erro ao autenticar. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de autenticação. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-[-120px]">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>

        {error && (
          <p className="mb-4 text-red-500 text-sm text-center">{error}</p>
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
            Entrar
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
