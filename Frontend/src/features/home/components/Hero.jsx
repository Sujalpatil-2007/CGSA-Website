import React from "react";
import { useNavigate } from "react-router";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <main className="p-2 h-[89%]   w-screen  flex justify-center items-center ">
      <div className=" lg:w-1/3 h-80 lg:h-full   lg:translate-x-100 lg:translate-y-0 transform translate-x-25 translate-y-40  ">
        <img
          className=" h-full w-full rounded-xl mix-blend object-cover "
          src="hero.png-removebg-preview.png"
          alt="Not found"
        />
      </div>
      <div className="h-[60vh]  absolute left-5 top-33  w-[55vw]">
        <div className=" h-full    flex flex-col lg:gap-7 gap-7 justify-center ">
          <div>
            <h1 className="lg:text-7xl text-4xl w-screen dark:text-white cursor-default font-[font2]  leading-tight ">
              Inspiring Thoughts. <br /> Igniting
              <span className=" text-[#007a06b8]">Change</span>.
            </h1>
          </div>
          <div className="flex justify-start -my-10 items-center">
            <div className="h-1 bg-[#121212cc] dark:bg-white m-2 rounded w-30"></div>
            <div className="h-1 bg-[#121212cc] dark:bg-white rounded w-3"></div>
            <img
              className="lg:h-28 h-20 w-36 lg:w-40 pt-2 rotate-190 mix-blend-multiply "
              src="branch.jpg"
              alt="Not found"
            />
          </div>
          <div className="text-xl dark:text-gray-300 cursor-default font-[font1]">
            <p>
              CGSA is dedicated to preserving Gandhian wisdom, <br />
              promoting non-violence, truth, and sustainable <br />
              development for a better word.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-7 ">
            <button
              onClick={() => {
                navigate("/articles");
              }}
              className=" py-2 px-3 cursor-pointer active:scale-98 rounded-xl font-semibold bg-[#007a06] text-amber-50"
            >
              Explore Articles
            </button>
            <button
              onClick={() => {
                navigate("/aboutUs");
              }}
              className=" py-2 px-3 cursor-pointer active:scale-98 rounded-xl font-semibold border-2 border-[#007a06] text-[#007a06] "
            >
              Know More About CGSA
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Hero;
