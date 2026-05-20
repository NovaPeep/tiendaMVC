import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LogIn, User, Lock } from "lucide-react";

export function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
    } catch (err) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={container}>

      <div style={card}>

        {/* HEADER */}
        <div style={header}>
          <div style={iconBox}>
            <LogIn size={22} />
          </div>

          <h1 style={title}>Bienvenido</h1>
          <p style={subtitle}>Inicia sesión para continuar</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} style={form}>

          {/* USER */}
          <div style={inputGroup}>
            <User size={16} style={icon} />

            <input
              style={input}
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* PASSWORD */}
          <div style={inputGroup}>
            <Lock size={16} style={icon} />

            <input
              style={input}
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* ERROR */}
          {error && (
            <div style={errorBox}>
              {error}
            </div>
          )}

          {/* BUTTON */}
          <button style={button} disabled={loading}>
            {loading ? "Ingresando..." : "Iniciar sesión"}
          </button>

        </form>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const container = {
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#f9fafb"
};

const card = {
  width: "360px",
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "24px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
};

const header = {
  textAlign: "center",
  marginBottom: "20px"
};

const iconBox = {
  width: "44px",
  height: "44px",
  margin: "0 auto 10px",
  borderRadius: "12px",
  background: "#eff6ff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#2563eb"
};

const title = {
  margin: 0,
  fontSize: "20px",
  fontWeight: "700"
};

const subtitle = {
  margin: "6px 0 0",
  fontSize: "13px",
  color: "#6b7280"
};

const form = {
  display: "flex",
  flexDirection: "column",
  gap: "12px"
};

const inputGroup = {
  display: "flex",
  alignItems: "center",
  border: "1px solid #e5e7eb",
  borderRadius: "10px",
  padding: "10px",
  gap: "8px",
  background: "#fff"
};

const icon = {
  color: "#9ca3af"
};

const input = {
  border: "none",
  outline: "none",
  width: "100%",
  fontSize: "14px"
};

const button = {
  marginTop: "6px",
  background: "#2563eb",
  color: "white",
  border: "none",
  padding: "10px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "14px"
};

const errorBox = {
  background: "#fef2f2",
  border: "1px solid #fecaca",
  color: "#b91c1c",
  padding: "10px",
  borderRadius: "10px",
  fontSize: "13px"
};