import { useAuth } from "../context/AuthContext";

export function HomePage() {
  const { logout, role } = useAuth();
  return (
    <div className="home-container">
      <h1>Bienvenido 👋</h1>
      <p>Rol: {role}</p>
      <button onClick={logout}>
        Cerrar sesión
      </button>
    </div>
  );
}