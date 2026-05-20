import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getProducts,
  getLowStockProducts,
} from "../services/productService";

import {
  LayoutDashboard,
  Package,
  AlertTriangle,
  XCircle,
  DollarSign,
  Activity,
  TrendingUp,
  ShoppingCart,
  Truck,
  BarChart3
} from "lucide-react";

export function HomePage() {
  const { role } = useAuth();
  const isOwner = role === "owner";

  const [products, setProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [p, l] = await Promise.all([
        getProducts(),
        getLowStockProducts(),
      ]);

      setProducts(p);
      setLowStock(l);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div style={{ padding: 20 }}>Cargando...</div>;
  }

  const totalProducts = products.length;
  const outOfStock = products.filter(p => p.stock === 0).length;

  const totalValue = products.reduce((acc, p) => {
    return acc + (p.stock * (p.sale_price || 0));
  }, 0);

  return (
    <div style={container}>

      {/* HEADER */}
      <div style={header}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <LayoutDashboard size={22} />
          <div>
            <h1 style={title}>Dashboard</h1>
            <p style={subtitle}>
              Resumen general del negocio en tiempo real
            </p>
          </div>
        </div>

        <div style={badge}>
          {isOwner ? "Dueño" : "Empleado"}
        </div>
      </div>

      {/* STATS */}
      <div style={grid}>
        <Stat icon={<Package size={18} />} label="Productos" value={totalProducts} />
        <Stat icon={<AlertTriangle size={18} />} label="Stock bajo" value={lowStock.length} warn />
        <Stat icon={<XCircle size={18} />} label="Agotados" value={outOfStock} danger />
        <Stat icon={<DollarSign size={18} />} label="Valor inventario" value={`$${totalValue.toLocaleString()}`} success />
      </div>

      {/* MAIN */}
      <div style={grid2}>

        {/* ALERTAS */}
        <div style={card}>
          <div style={sectionTitle}>
            <AlertTriangle size={16} />
            <span>Alertas</span>
          </div>

          {lowStock.length === 0 ? (
            <p style={muted}>Sin alertas</p>
          ) : (
            lowStock.slice(0, 5).map(p => (
              <div key={p.id} style={alertItem}>
                <AlertTriangle size={14} style={{ marginRight: 6 }} />
                {p.name} — stock {p.stock}
              </div>
            ))
          )}
        </div>

        {/* ACTIVIDAD */}
        <div style={card}>
          <div style={sectionTitle}>
            <Activity size={16} />
            <span>Actividad reciente</span>
          </div>

          <div style={activityItem}>
            <TrendingUp size={14} /> Inventario actualizado
          </div>

          <div style={activityItem}>
            <Package size={14} /> Productos sincronizados
          </div>

          <div style={activityItem}>
            <BarChart3 size={14} /> Reporte generado
          </div>
        </div>

      </div>

      {/* ACTIONS */}
      <div style={card}>
        <div style={sectionTitle}>
          Acciones rápidas
        </div>

        <div style={actions}>
          <Action icon={<Package size={16} />} label="Nuevo producto" />
          <Action icon={<ShoppingCart size={16} />} label="Registrar venta" />
          <Action icon={<Truck size={16} />} label="Proveedores" />

          {isOwner && (
            <Action primary icon={<BarChart3 size={16} />} label="Reportes" />
          )}
        </div>
      </div>

    </div>
  );
}

/* ================= COMPONENTS ================= */

function Stat({ icon, label, value, warn, danger, success }) {
  return (
    <div style={{
      ...statCard,
      borderLeft:
        danger ? "4px solid #ef4444" :
        warn ? "4px solid #f59e0b" :
        success ? "4px solid #22c55e" :
        "4px solid #2563eb"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{icon}</span>
      </div>

      <p style={statLabel}>{label}</p>
      <h2 style={statValue}>{value}</h2>
    </div>
  );
}

function Action({ icon, label, primary }) {
  return (
    <button style={{
      ...btn,
      background: primary ? "#2563eb" : "#f3f4f6",
      color: primary ? "white" : "#111827"
    }}>
      <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {icon}
        {label}
      </span>
    </button>
  );
}

/* ================= STYLES ================= */

const container = {
  padding: "24px",
  background: "#f9fafb",
  minHeight: "100vh"
};

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "24px"
};

const title = {
  margin: 0,
  fontSize: "24px",
  fontWeight: "700"
};

const subtitle = {
  margin: "4px 0 0",
  color: "#6b7280",
  fontSize: "14px"
};

const badge = {
  background: "#e0f2fe",
  color: "#0369a1",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "12px"
};

const grid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "16px",
  marginBottom: "16px"
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
  marginBottom: "16px"
};

const card = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: "14px",
  padding: "16px"
};

const sectionTitle = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  marginBottom: 12,
  fontSize: "14px",
  fontWeight: "600"
};

const alertItem = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: "13px",
  padding: "6px 0",
  borderBottom: "1px solid #f3f4f6"
};

const activityItem = {
  display: "flex",
  alignItems: "center",
  gap: 6,
  fontSize: "13px",
  padding: "6px 0",
  color: "#374151"
};

const muted = {
  fontSize: "13px",
  color: "#9ca3af"
};

const actions = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap"
};

const btn = {
  border: "none",
  padding: "10px 14px",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "13px"
};

const statCard = {
  background: "white",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #e5e7eb"
};

const statLabel = {
  margin: 0,
  fontSize: "12px",
  color: "#6b7280"
};

const statValue = {
  margin: "6px 0 0",
  fontSize: "24px",
  fontWeight: "700"
};