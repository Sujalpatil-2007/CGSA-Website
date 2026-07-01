import { React, useRef, useState, useEffect } from "react";
import { Sun, Moon, Menu, CircleX } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAuth } from "../../auth/hooks/useAuth";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, handleLogout } = useAuth();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark",
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  gsap.registerPlugin(ScrollTrigger);

  const tl = useRef();

  useGSAP(() => {
    tl.current = gsap.timeline({ paused: true });

    tl.current.to(".slider", {
      right: 0,
      duration: 0.6,
    });

    tl.current.from(".links", {
      x: 150,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5,
    });
  });

  const Logout = async () => {
    await handleLogout();
    navigate("/");
  };

  return (
    <main className="flex justify-between items-center px-2 py-1 lg:px-5 lg:pl-1  w-full bg-[#e5d0a7b9] dark:bg-gray-900">
      {/* Logo */}
      <div className="flex  items-center gap-0">
        <Link to={"/"}>
          <img
            src={darkMode ? "/darkimage.png" : "/lightimage.png"}
            alt="CGSA Logo"
            className="h-12 -mx-1  lg:h-16 md:h-10 w-18  lg:w-22 "
          />
        </Link>
        <div>
          <h1 className="font-[font2] text-sm dark:text-white lg:text-xl">
            CGSA
          </h1>

          <p className="text-sm lg:text-xl leading-3 dark:text-gray-300 lg:leading-5 font-[font1]">
            Centre of Gandhian
            <br />
            Studies and Action
          </p>
        </div>
      </div>

      {/* Desktop Nav */}
      <div className=" hidden lg:flex items-center justify-center gap-8 dark:bg-gray-800 bg-amber-50 rounded-2xl shadow-md px-8 py-3">
        <Link
          to="/"
          className="font-[font2] dark:text-white hover:text-green-700"
        >
          Home
        </Link>

        <Link
          to="/articles"
          className="font-[font2] dark:text-white hover:text-green-700"
        >
          Articles
        </Link>

        <Link
          to="/timeline"
          className="font-[font2] dark:text-white hover:text-green-700"
        >
          Timeline
        </Link>

        <Link
          to="/aboutUs"
          className="font-[font2] dark:text-white hover:text-green-700"
        >
          About Us
        </Link>

        <Link
          to="/contact"
          className="font-[font2] dark:text-white hover:text-green-700"
        >
          Contact
        </Link>

        {user && (
          <Link
            to="/PublishArticles"
            className="font-semibold dark:text-white hover:text-green-700"
          >
            Publish
          </Link>
        )}
      </div>
      {/* Right Side */}
      <div className=" flex items-center gap-2 lg:gap-3 ">
        <button
          onClick={toggleTheme}
          className="  p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 dark:text-white cursor-pointer"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-green-700 cursor-pointer text-white px-4 py-2 text-xl lg:text-base rounded-xl font-semibold"
          >
            Login
          </button>
        ) : (
          <button
            onClick={Logout}
            className="bg-red-600 cursor-pointer text-white px-4 py-2 rounded-xl font-semibold"
          >
            Logout
          </button>
        )}

        {/* Mobile Menu */}
        <Menu
          size={28}
          className="  cursor-pointer dark:text-white "
          onClick={() => tl.current.play()}
        />

        <div className="slider fixed h-screen w-[60%] lg:w-[25%] right-[-60%] lg:right-[-25%] top-0  z-1 flex items-start pt-30 dark:bg-gray-900 shadow-2xl  bg-[#e1dcdcce]">
          <CircleX
            size={34}
            className="absolute top-5 right-5 dark:text-white cursor-pointer"
            onClick={() => tl.current.reverse()}
          />

          <div className=" flex flex-col gap-8 px-8 ">
            <Link
              className="links text-3xl font-semibold hover:text-green-700 dark:text-white "
              to="/"
            >
              Home
            </Link>

            <Link
              className="links text-3xl font-semibold hover:text-green-700 dark:text-white "
              to="/articles"
            >
              Articles
            </Link>

            <Link
              className="links text-3xl font-semibold hover:text-green-700 dark:text-white "
              to="/timeline"
            >
              Timeline
            </Link>

            <Link
              className="links text-3xl font-semibold hover:text-green-700 dark:text-white "
              to="/aboutUs"
            >
              About Us
            </Link>

            <Link
              className="links text-3xl font-semibold hover:text-green-700 dark:text-white "
              to="/contact"
            >
              Contact
            </Link>

            {user && (
              <Link
                className="links text-3xl font-semibold hover:text-green-700 dark:text-white "
                to="/PublishArticles"
              >
                Publish
              </Link>
            )}

            {user && (
              <button
                onClick={Logout}
                className=" mt-4 w-fit bg-red-600 text-white px-5 py-2 rounded-xl"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Navbar;
