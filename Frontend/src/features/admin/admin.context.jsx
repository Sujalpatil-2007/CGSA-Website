import {
  createContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

export const AdminContext =
  createContext();

export const AdminProvider = ({
  children,
}) => {
  const [admin, setAdmin] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const getAdmin = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/auth/get-me`,
        {
          withCredentials: true,
        }
      );

      if (res.data.user.isSuperAdmin) {
        setAdmin(res.data.user);
      } else {
        setAdmin(null);
      }
    } catch (err) {
      console.log(err);

      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        admin,
        loading,
        getAdmin,
        setAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};