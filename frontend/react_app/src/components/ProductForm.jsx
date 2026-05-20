import { useState } from "react";
import {
  createProduct,
  updateProduct
} from "../services/productService";

export function ProductForm({
  product,
  onClose,
  onSaved
}) {
  const isEditing = !!product;

  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "otro",
    stock: product?.stock || 0,
    stock_min: product?.stock_min || 0,
    purchase_price: product?.purchase_price || 0,
    sale_price: product?.sale_price || 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEditing) {
        await updateProduct(product.id, formData);
      } else {
        await createProduct(formData);
      }

      onSaved();

    } catch (error) {
      console.error(error);
      alert("Error guardando producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}>
          <h2 style={{ margin: 0 }}>
            {isEditing ? "Editar producto" : "Nuevo producto"}
          </h2>

          <button
            onClick={onClose}
            style={closeButtonStyle}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={gridStyle}>

            <Input
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <div>
              <label style={labelStyle}>
                Categoría
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="ron">Ron</option>
                <option value="cerveza">Cerveza</option>
                <option value="vino">Vino</option>
                <option value="vodka">Vodka</option>
                <option value="whisky">Whisky</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <Input
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
            />

            <Input
              label="Stock mínimo"
              name="stock_min"
              type="number"
              value={formData.stock_min}
              onChange={handleChange}
            />

            <Input
              label="Precio compra"
              name="purchase_price"
              type="number"
              value={formData.purchase_price}
              onChange={handleChange}
            />

            <Input
              label="Precio venta"
              name="sale_price"
              type="number"
              value={formData.sale_price}
              onChange={handleChange}
            />
          </div>

          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            marginTop: "24px",
          }}>
            <button
              type="button"
              onClick={onClose}
              style={secondaryButton}
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={loading}
              style={primaryButton}
            >
              {loading
                ? "Guardando..."
                : isEditing
                  ? "Actualizar"
                  : "Crear producto"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({
  label,
  ...props
}) {
  return (
    <div>
      <label style={labelStyle}>
        {label}
      </label>

      <input
        {...props}
        style={inputStyle}
      />
    </div>
  );
}

/* Styles */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  width: "700px",
  background: "white",
  borderRadius: "14px",
  padding: "24px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "16px",
};

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "13px",
  color: "#374151",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
};

const primaryButton = {
  border: "none",
  background: "#2563eb",
  color: "white",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

const secondaryButton = {
  border: "1px solid #d1d5db",
  background: "white",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

const closeButtonStyle = {
  border: "none",
  background: "transparent",
  cursor: "pointer",
  fontSize: "18px",
};