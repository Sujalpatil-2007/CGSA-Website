import React from "react";
import Navbar from "../../home/components/Navbar";
import EditForm from "../components/EditForm";
import { Quote } from "lucide-react";
import Footer from "../../home/components/Footer";

const EditArticle = () => {
  return (
    <div className="min-h-screen w-full bg-[#e5d0a7b9] flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Main Section */}
      <div className="flex-1 w-full border-y-2 border-[#b9b6b0] dark:border-[#74726e9c] bg-[#e6dfd2] flex justify-center items-center">
        <EditForm />
      </div>

      {/* Footer Quote */}
      <div className="h-35 pl-15 flex flex-col dark:bg-gray-800 dark:text-white items-start justify-center w-full bg-[#e5d0a7b9]">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl pt-3 rotate-180">
            <Quote fill="black" />
          </h1>

          <h1 className="text-xl dark:text-white text-[#2a2929] font-[font2]">
            Be the change you wish to see in the world.
          </h1>
        </div>

        <h1 className="text-xl font-[font1] pl-10">
          - Mahatma Gandhi
        </h1>
      </div>

      <Footer/>

    </div>
  );
};

export default EditArticle;