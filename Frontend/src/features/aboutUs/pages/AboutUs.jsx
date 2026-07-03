import React from "react";
import Navbar from "../../home/components/Navbar";
import { useNavigate } from "react-router";
import Footer from "../../home/components/Footer";
import Loading from "../../auth/pages/Loading";
import { useAuth } from "../../auth/hooks/useAuth";

const AboutUs = () => {
  const navigate = useNavigate();
  const { loading, handleLogin } = useAuth();

  if (loading) {
    return <Loading />;
  }

  return (
    <main className="min-h-screen w-screen bg-[#e5d0a7b9] dark:bg-gray-900  ">
      <Navbar />
      {/* Hero section */}
      <div className="flex  items-center ">
        {/* Hero text */}
        <div className="h-screen lg:w-1/2 flex flex-col absolute lg:static justify-center items-start gap-5 pl-5 lg:pl-30 pb-20 ">
          <h1 className="font-[fon2] text-5xl lg:dark:text-white  lg:text-7xl ">
            About Us
          </h1>
          <p className="font-[fon1] text-2xl lg:text-4xl lg:dark:text-gray-300 ">
            Preserving and Promoting Gandhian <br /> Values for a Better Society
          </p>
          <button
            onClick={() => {
              navigate("/articles");
            }}
            className=" py-2 px-4 cursor-pointer active:scale-98 rounded-full font-semibold bg-[#007a06] text-amber-50"
          >
            Explore Articles
          </button>
        </div>
        <div>
          <img
            className="h-screen  lg:pl-20 pb-12 lg:pb-30 w-auto  object-cover "
            src="Gandhi.png"
            alt=""
          />
        </div>
      </div>
      {/* mission and vision */}
      <div className="flex justify-around items-center -mt-45 ">
        {/* mission */}
        <div className="bg-[#ead19f] dark:bg-gray-800 p-4 lg:p-5 rounded-2xl m-5 h-72 w-[40vw] lg:w-[35vw]">
          <h1 className="lg:text-5xl text-xl dark:text-white font-[font2]">
            Mission
          </h1>
          <p className="lg:text-2xl pt-1 lg:pt-8 lg:leading-normal leading-tight  dark:text-gray-300 font-[font1] ">
            {" "}
            To educate, inspire, and empower individuals through Gandhian
            philosophy and values, fostering social responsibility, and peaceful
            coexistence.
          </p>
        </div>
        {/* vision */}
        <div className="bg-[#ead19f] dark:bg-gray-800 p-4 lg:p-5 rounded-2xl m-5 h-72 w-[40vw] lg:w-[35vw]">
          <h1 className="lg:text-5xl text-xl dark:text-white font-[font2]">
            Vision
          </h1>
          <p className="lg:text-2xl pt-1 lg:pt-8 lg:leading-normal leading-tight dark:text-gray-300  font-[font1] ">
            To create a society rooted in truth, compassion, non-violence,
            sustainability, and service, inspired by the timeless teachings of
            Mahatma Gandhi.
          </p>
        </div>
      </div>
      {/* Core values */}
      <div className="flex flex-col justify-center p-5 gap-5 items-center">
        <div>
          <h1 className="text-3xl font-[font2] dark:text-white ">
            Our Core Values
          </h1>
        </div>
        <div className=" flex flex-col lg:flex-row justify-center lg:gap-10 gap-3 items-center lg:h-52 w-full  ">
          {/* Truth (Satya) */}
          <div className="bg-[#ead19f] p-5 rounded-2xl h-full dark:bg-gray-800 w-full lg:w-1/5">
            <h1 className="font-[font2] dark:text-white text-xl lg:text-2xl ">
              Truth (Satya)
            </h1>
            <p className="font-[font1] hidden lg:block text-md pt-3 dark:text-gray-300 ">
              Truth forms the foundation of ethical living and responsible
              citizenship. We encourage honesty, integrity, and transparency in
              thought and action.
            </p>
          </div>
          {/* Non-Violence (Ahimsa) */}
          <div className="bg-[#ead19f] p-5 rounded-2xl h-full dark:bg-gray-800 w-full lg:w-1/5">
            <h1 className="font-[font2] dark:text-white text-xl lg:text-2xl ">
              Non-Violence (Ahimsa)
            </h1>
            <p className="font-[font1] hidden lg:block text-md pt-3 dark:text-gray-300 ">
              We promote peaceful conflict resolution, compassion, empathy, and
              respect for all living beings.
            </p>
          </div>
          {/* Simplicity (Aparigraha) */}
          <div className="bg-[#ead19f] p-5 rounded-2xl h-full dark:bg-gray-800 w-full lg:w-1/5">
            <h1 className="font-[font2]  dark:text-white text-xl  lg:text-2xl ">
              Simplicity (Aparigraha)
            </h1>
            <p className="font-[font1] hidden lg:block text-md pt-3 dark:text-gray-300 ">
              We advocate mindful living, sustainability, and reducing
              unnecessary material dependence.
            </p>
          </div>
          {/* Service (Seva) */}
          <div className="bg-[#ead19f] p-5 rounded-2xl h-full dark:bg-gray-800 w-full lg:w-1/5">
            <h1 className="font-[font2] dark:text-white text-xl lg:text-2xl ">
              Service (Seva)
            </h1>
            <p className="font-[font1] hidden lg:block text-md pt-3 dark:text-gray-300 ">
              We believe in selfless service to society and active participation
              in community development.
            </p>
          </div>
        </div>
      </div>
      {/* Explore articles  */}
      <div className=" flex justify-center items-center h-72 text-white w-full">
        <div className="h-[90%] lg:w-[60%] w-[90%] p-5 gap-4 flex flex-col text-center rounded-2xl dark:bg-[#026807da] bg-[#007a06da] ">
          <h1 className="lg:text-3xl text-2xl font-[font2] ">
            Explore Articles
          </h1>
          <p className="lg:text-2xl text-xl font-[font1] ">
            Explore our articles anine sectaottas aninitiooos articles, <br />{" "}
            and conmuting out edereestas raconoes.
          </p>
          <div className="lg:p-5">
            <button
              onClick={() => {
                navigate("/articles");
              }}
              className=" py-2 px-4 cursor-pointer active:scale-98 rounded-full font-[font1] bg-[#ead19f] mr-5 text-black"
            >
              Explore Articles
            </button>
            <button
              onClick={() => {
                navigate("/timeline");
              }}
              className=" py-2 px-4 cursor-pointer active:scale-98 rounded-full font-[font1] bg-[#dbd1d1ef] text-black"
            >
              View Timeline
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default AboutUs;
