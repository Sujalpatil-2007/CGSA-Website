import { Navigate } from "react-router";
import { useContext } from "react";
import { AdminContext } from "../admin.context";
import Loading from "../../auth/pages/Loading";

const AdminProtected = ({ children }) => {
  const { admin, loading } = useContext(AdminContext);

  if (loading) {
    return <Loading />;
  }

  if (!admin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtected;