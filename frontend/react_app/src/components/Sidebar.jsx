// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ClipboardList,
  Truck,
  BarChart3,
  LogOut,
  Store
} from "lucide-react";

export function Sidebar() {
  const { role, logout } = useAuth();
  const isOwner = role === "owner";

  return (
    <aside style={sidebar}>

      {/* LOGO */}
      <div style={logoContainer}>
        <Store size={20} />
        <div>
          <p style={logoTitle}>TiendaMVC</p>
          <p style={logoSub}>Licores El Barrio</p>
        </div>
      </div>

      {/* NAV */}
      <nav style={nav}>
        <NavItem to="/home" icon={<LayoutDashboard size={18} />} label="Dashboard" />

        <NavItem to="/inventory" icon={<Package size={18} />} label="Inventario" />

        <NavItem to="/ventas/nueva" icon={<ShoppingCart size={18} />} label="Registrar venta" />

        {isOwner && (
          <NavItem to="/ventas" icon={<ClipboardList size={18} />} label="Historial ventas" />
        )}

        <NavItem to="/proveedores" icon={<Truck size={18} />} label="Proveedores" />

        {isOwner && (
          <NavItem to="/reportes" icon={<BarChart3 size={18} />} label="Reportes" />
        )}
      </nav>

      {/* USER */}
      <div style={userBox}>
        <div style={{ fontSize: "12px", color: "#6b7280" }}>
          Rol
        </div>

        <div style={{ fontSize: "13px", fontWeight: 600 }}>
          {isOwner ? "Dueño" : "Empleado"}
        </div>

        <button onClick={logout} style={logoutBtn}>
          <LogOut size={16} />
          Cerrar sesión
        </button>
      </div>

    </aside>
  );
}

/* ================= NAV ITEM ================= */

function NavItem({ to, icon, label }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        ...item,
        background: isActive ? "#eff6ff" : "transparent",
        color: isActive ? "#1d4ed8" : "#374151",
      })}
    >
      <span style={{ display: "flex", alignItems: "center" }}>
        {icon}
      </span>

      <span>{label}</span>
    </NavLink>
  );
}

/* ================= STYLES ================= */

const sidebar = {
  width: "240px",
  height: "100vh",
  position: "fixed",
  left: 0,
  top: 0,
  background: "#ffffff",
  borderRight: "1px solid #e5e7eb",
  display: "flex",
  flexDirection: "column",
  padding: "16px 12px"
};

const logoContainer = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 12px",
  marginBottom: "16px"
};

const logoTitle = {
  margin: 0,
  fontSize: "14px",
  fontWeight: 700
};

const logoSub = {
  margin: 0,
  fontSize: "11px",
  color: "#6b7280"
};

const nav = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "4px"
};

const item = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "10px 12px",
  borderRadius: "10px",
  textDecoration: "none",
  fontSize: "13px",
  transition: "0.2s"
};

const userBox = {
  borderTop: "1px solid #e5e7eb",
  padding: "12px"
};

const logoutBtn = {
  marginTop: "10px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  border: "1px solid #e5e7eb",
  background: "white",
  padding: "8px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "13px"
};