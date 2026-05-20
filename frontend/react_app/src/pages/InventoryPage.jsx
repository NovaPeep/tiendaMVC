// src/pages/InventoryPage.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { ProductForm } from "../components/ProductForm";
import {
  getProducts,
  createProduct,
  updateProduct
} from "../services/productService";

export function InventoryPage() {
  const { role } = useAuth();
  const isOwner = role === "owner";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  // Filtros en el frontend
  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase()
      .includes(search.toLowerCase());
    const matchCategory = filterCategory
      ? p.category === filterCategory
      : true;
    return matchSearch && matchCategory;
  });

  // Métricas calculadas
  const total = products.length;
  const available = products.filter(
    p => p.stock > p.stock_min
  ).length;
  const lowStock = products.filter(
    p => p.stock <= p.stock_min && p.stock > 0
  ).length;
  const outOfStock = products.filter(
    p => p.stock === 0
  ).length;

  const getStatus = (product) => {
    if (product.stock === 0) return { label: "Agotado", color: "#dc2626", bg: "#fef2f2" };
    if (product.stock <= product.stock_min) return { label: "Stock bajo", color: "#d97706", bg: "#fffbeb" };
    return { label: "Disponible", color: "#16a34a", bg: "#f0fdf4" };
  };

  const getMargin = (p) => {
    if (!p.purchase_price || !p.sale_price) return "—";
    const margin = ((p.sale_price - p.purchase_price) / p.purchase_price * 100);
    return `${margin.toFixed(1)}%`;
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 600 }}>Inventario</h1>
          <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: "13px" }}>
            Control de productos y stock
          </p>
        </div>
        {isOwner && (
          <button
            onClick={() => { setEditingProduct(null); setShowForm(true); }}
            style={{ background: "#2563eb", color: "white", border: "none", padding: "10px 18px", borderRadius: "8px", cursor: "pointer", fontSize: "13px" }}
          >
            + Agregar producto
          </button>
        )}
      </div>

      {/* Métricas */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "20px" }}>
        <MetricCard label="Total productos" value={total} color="#374151" />
        <MetricCard label="Disponibles" value={available} color="#16a34a" />
        <MetricCard label="Stock bajo" value={lowStock} color="#d97706" />
        <MetricCard label="Agotados" value={outOfStock} color="#dc2626" />
      </div>

      {/* Alerta stock bajo */}
      {lowStock > 0 && (
        <div style={{ background: "#fffbeb", border: "1px solid #fcd34d", borderRadius: "8px", padding: "12px 16px", marginBottom: "16px", fontSize: "13px", color: "#92400e" }}>
          ⚠️ {lowStock} producto(s) con stock por debajo del mínimo
        </div>
      )}

      {/* Filtros */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "16px" }}>
        <input
          placeholder="Buscar producto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ flex: 1, padding: "8px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px" }}
        />
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid #e5e7eb", fontSize: "13px" }}
        >
          <option value="">Todas las categorías</option>
          <option value="ron">Ron</option>
          <option value="cerveza">Cerveza</option>
          <option value="vino">Vino</option>
          <option value="vodka">Vodka</option>
          <option value="whisky">Whisky</option>
          <option value="otro">Otro</option>
        </select>
      </div>

      {/* Tabla */}
      <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "12px", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
          <thead style={{ background: "#f9fafb" }}>
            <tr>
              {["Producto", "Categoría", "Stock", "P. compra", "P. venta", "Margen", "Estado", "Acciones"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", color: "#6b7280", fontWeight: 500, borderBottom: "1px solid #e5e7eb" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(product => {
              const status = getStatus(product);
              return (
                <tr key={product.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "12px 14px", fontWeight: 500 }}>{product.name}</td>
                  <td style={{ padding: "12px 14px", color: "#6b7280", textTransform: "capitalize" }}>{product.category}</td>
                  <td style={{ padding: "12px 14px", color: status.color, fontWeight: 500 }}>{product.stock}</td>
                  <td style={{ padding: "12px 14px", color: "#6b7280" }}>${Number(product.purchase_price).toLocaleString()}</td>
                  <td style={{ padding: "12px 14px" }}>${Number(product.sale_price).toLocaleString()}</td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ background: "#f0fdf4", color: "#16a34a", padding: "2px 8px", borderRadius: "99px", fontSize: "12px" }}>
                      {getMargin(product)}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ background: status.bg, color: status.color, padding: "3px 10px", borderRadius: "99px", fontSize: "12px" }}>
                      {status.label}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    {isOwner && (
                      <button
                        onClick={() => { setEditingProduct(product); setShowForm(true); }}
                        style={{ background: "none", border: "1px solid #e5e7eb", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontSize: "12px" }}
                      >
                        Editar
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <p style={{ textAlign: "center", color: "#9ca3af", padding: "32px" }}>
            No se encontraron productos
          </p>
        )}
      </div>

      {/* Modal de formulario */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => setShowForm(false)}
          onSaved={() => { setShowForm(false); loadProducts(); }}
        />
      )}
    </div>
  );
}

function MetricCard({ label, value, color }) {
  return (
    <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px" }}>
      <p style={{ margin: 0, fontSize: "12px", color: "#6b7280" }}>{label}</p>
      <p style={{ margin: "6px 0 0", fontSize: "26px", fontWeight: 600, color }}>{value}</p>
    </div>
  );
}