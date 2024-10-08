import { useState } from 'react';
import ThemeToggleButton from '../components/ThemeSwitcher';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../features/user/userSlice';
import { toast, ToastContainer } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const API_URL = import.meta.env.VITE_URL_SERVER

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Todos los campos son requeridos');
      return;
    }

    try {
      const response = await fetch(`${API_URL}users/login-admin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });

      if(!response.ok) {
        const data = await response.json();
        toast.error(data.message || 'Error al iniciar sesión');
        return
      }
      const data = await response.json();

      dispatch(addUser(data.user));
      navigate('/app/orders')
      toast.success('Inicio de sesión exitoso')
    } catch (err) {
      toast.error('Error al iniciar sesión', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black">
      <div className="bg-white dark:bg-[#141414] p-8 rounded-lg shadow-md w-full max-w-md text-black dark:text-white">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Iniciar Sesión</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg focus:ring
              focus:ring-indigo-500 bg-transparent"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg
              focus:ring focus:ring-indigo-500 dark:bg-transparent "
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 dark:border dark:border-cyan-500
            dark:bg-transparent dark:hover:border-cyan-600 focus:ring focus:ring-indigo-300 dark:focus:ring-indigo-700"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
      <div className="fixed bottom-0 right-0 m-4">
        <ThemeToggleButton />
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
