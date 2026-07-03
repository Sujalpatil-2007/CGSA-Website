import { useContext,useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login,logout,register,getMe } from "../services/auth.api";
import { toast } from "react-toastify";

export const useAuth = ()=> {
    const context = useContext(AuthContext)
    const {user,setUser,loading,setLoading} = context;

    const handleLogin = async ({ email, password }) => {
  setLoading(true);
  try {
    const data = await login({ email, password });
    setUser(data.user);
    toast.success("Login Successful 🎉");
    return true;
  } catch (err) {
    console.log(err);
    toast.error("Invalid Email or Password ❌");
    return false;
  } finally {
    setLoading(false);
  }
};

    const handleRegister = async ({username,email,password}) => {
        setLoading(true)
        try{
        const data = await register({username,email,password})
        setUser(data.user)
        toast.success("Account Created Successfully 🎉");
        return true;
      }
        catch(err){
            console.log(err);
            toast.error("Registration Failed ❌");
            return false;
        }finally{
        setLoading(false)}
    }

const handleLogout = async () => {
  setLoading(true);

  try {
    await logout();

    setUser(null);

    toast.success("Logged Out Successfully 👋");
  } catch (err) {
    console.log(err);

    toast.error("Logout Failed ❌");
  } finally {
    setLoading(false);
  }
};

    useEffect(() => {
  const getAndSetUser = async () => {
    try {
      const data = await getMe();
      if (data?.user) {
        setUser(data.user);
      }
    } catch (err) {
       if (err.response?.status !== 401) {
    console.error(err);
  }

  setUser(null);
    } finally {
      setLoading(false);
    }
  };

  getAndSetUser();
}, []);

    return {user,loading,handleLogin,handleLogout,handleRegister}

}