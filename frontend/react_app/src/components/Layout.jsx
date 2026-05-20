// src/components/Layout.jsx
import { Sidebar } from "./Sidebar";

export function Layout({ children }) {
  const sidebarWidth = 240; // 👈 definido aquí mismo

  return (
    <div style={styles.wrapper}>
      <Sidebar />

      <main
        style={{
          ...styles.main,
          marginLeft: sidebarWidth,
          width: `calc(100% - ${sidebarWidth}px)`,
        }}
      >
        {children}
      </main>
    </div>
  );
}

const styles = {
  wrapper: {
    display: "flex",
    minHeight: "100vh",
    background: "#f9fafb",
  },

  main: {
    padding: "24px",
    minHeight: "100vh",
    overflowX: "hidden",
  },
};