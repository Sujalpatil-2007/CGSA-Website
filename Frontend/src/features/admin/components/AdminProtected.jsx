import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../auth/auth.context";
import Loading from "../../auth/pages/Loading";
import { toast } from "react-toastify";

const AdminProtected = ({ children }) => {
  const { user, loading } = useContext(AuthContext);


  if (!user) {
    return <Navigate to="/" replace />;
    toast.error("Not login ")
  }

  if (!user.isSuperAdmin) {
  return <Navigate to="/" replace />;
}

  return children;
};

export default AdminProtected;