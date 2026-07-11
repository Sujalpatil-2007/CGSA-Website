import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../auth/auth.context";
import Loading from "../../auth/pages/Loading";

const AdminProtected = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!user.isSuperAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtected;