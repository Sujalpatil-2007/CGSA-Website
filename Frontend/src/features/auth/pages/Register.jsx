import React, { useState } from "react";
import { Mail, LockKeyhole, User, Sun } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";
import Navbar from "../../home/components/Navbar";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Navbar />
      <div className="h-screen  w-screen bg-cover  bg-center bg-no-repeat bg-[url(bg.jpg)] bg-[#e5d0a7b9] dark:bg-gray-900 dark:bg-none p-5 overflow-hidden ">
        <main className="h-full lg:h-[90%]  w-full  text-center flex justify-center items-center">
          <div className="h-[60vh] shadow-[0px_0px_10px_0px_black] dark:shadow-[0px_0px_3px_0px_white] lg:h-[70vh] w-80 lg:w-1/4 p-5 rounded-2xl flex justify-start gap-10 items-center flex-col dark:text-white dark:bg-gray-800 bg-[#fcfbf851]">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl">Create an Account</h1>
              <p>Join CGSA and be a part of the change.</p>
            </div>
            <div className="h-[30vh]  w-full flex flex-col gap-6 ">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                  <label
                    htmlFor="username"
                    className="flex text-xl font-semibold "
                  >
                    <User />
                    Username
                  </label>
                  <input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="w-full rounded p-1 border-2 border-gray-400"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Enter username"
                  />
                </div>
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
                    maxLength={12}
                    minLength={8}
                    id="password"
                    name="password"
                    placeholder="Enter password"
                  />
                </div>
                <div className="h-12 lg:h-[8vh] mt-6 cursor-pointer active:scale-98 rounded-xl bg-[#007a06] text-amber-50 flex justify-center items-center ">
                  <button className="text-2xl font-semibold">
                    Create Account
                  </button>
                </div>
                <p>
                Already have an account?{" "}
                <Link to={"/login"} className="text-[#007a06] font-semibold ">
                  Login
                </Link>
              </p>
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Register;
