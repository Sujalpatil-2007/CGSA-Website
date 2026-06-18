import React, { use } from "react";
import { Mail, LockKeyhole, Sun } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import Loading from "./Loading";
import Navbar from "../../home/components/Navbar";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin({ email, password });
    navigate("/");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="h-screen  w-screen bg-cover  bg-center bg-no-repeat bg-[url(bg.jpg)] dark:bg-gray-900 dark:bg-none p-5 overflow-hidden ">
        <main className="h-full lg:h-[90%]  w-full  text-center flex justify-center items-center">
          <div className="h-[60vh] shadow-[0px_0px_10px_0px_black] dark:shadow-[0px_0px_3px_0px_white] lg:h-[60vh] w-80 lg:w-1/4 p-5 rounded-2xl flex justify-start gap-10 items-center flex-col dark:bg-gray-800 dark:text-white bg-[#fcfbf851]">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl">Welcome Back</h1>
              <p>Login to continue your journey with CGSA.</p>
            </div>
            <div className="h-[30vh]  w-full flex flex-col gap-6 ">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="email"
                    className="flex text-xl font-semibold "
                  >
                    <Mail size={20} className="mt-1" />
                    Email
                  </label>
                  <input
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="w-full rounded p-1 border-2 border-gray-400"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter email addres"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="flex text-xl font-semibold "
                  >
                    <LockKeyhole size={20} className="mt-1" />
                    Password
                  </label>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="w-full rounded p-1 border-2 border-gray-400 "
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                  />
                </div>
                <div className="h-12 lg:h-[8vh] mt-6 cursor-pointer active:scale-98 rounded-xl bg-[#007a06] text-amber-50 flex justify-center items-center ">
                  <button className="text-2xl font-semibold">Login</button>
                </div>
              </form>
              <p>
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-[#007a06] font-semibold "
                >
                  Register
                </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Login;
