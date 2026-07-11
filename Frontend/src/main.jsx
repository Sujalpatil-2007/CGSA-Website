import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminProvider } from "./features/admin/admin.context.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AdminProvider>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      draggable
      draggableDirection="x"
    />
    </AdminProvider>
  </AuthProvider>,
);