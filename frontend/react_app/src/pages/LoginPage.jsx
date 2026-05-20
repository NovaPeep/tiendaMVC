import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    try {
      // Llamamos al login del contexto
      await login(username, password);

      // Si el login es exitoso, normalmente
      // el contexto redirecciona o guarda el usuario
    } catch (err) {
      // Guardamos el mensaje de error
      setError(err.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario</label>
          <input
            type="text"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button type="submit">
          Ingresar
        </button>
      </form>
    </div>
  );
}