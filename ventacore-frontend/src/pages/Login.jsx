import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Login = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Estado para manejar el error

  const handleLogin = async () => {
    setError(""); // Limpiar errores previos

    const success = await login(username, password); // Capturamos el resultado

    if (success) {
      navigate("/dashboard"); // Solo redirigir si el login fue exitoso
    } else {
      setError("Usuario o contraseña incorrectos."); // Mostrar error si las credenciales son inválidas
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
        <div className="w-full max-w-sm p-6 bg-blue-700 rounded-lg shadow-md">
        <h2 className="text-2xl text-white font-semibold text-center mb-4">Bienvenido</h2>

        {error && <p className="text-red-500 text-center mb-2">{error}</p>}

        <input
          type="text"
          placeholder="Usuario"
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={handleLogin}
          className="w-full p-2 bg-blue-400 hover:bg-blue-500 text-white font-semibold rounded transition duration-300"
        >
          Login
        </button>

        <div className="text-center mt-3 text-white text-sm">
          <p className="hover:underline cursor-pointer">¿Perdiste tu contraseña?</p>
          <p className="hover:underline cursor-pointer">¿No tienes Cuenta? Regístrate</p>
        </div>

        <p className="text-center text-white mt-5 text-xs hover:underline cursor-pointer">Volver</p>
      </div>
    </div>
  );
};

export default Login;
