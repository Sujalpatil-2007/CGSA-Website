import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../auth/auth.context";
import Loading from "../../auth/pages/Loading";

const AdminProtected = ({ children }) => {
  const { user, loading } = useContext(AuthContext);


  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "superAdmin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtected;