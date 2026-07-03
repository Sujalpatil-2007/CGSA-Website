import React from "react";
import Navbar from "../../home/components/Navbar";
import PublishForm from "../../Article/components/publishForm";
import { Quote } from "lucide-react";
import Footer from "../../home/components/Footer";
import { useAuth } from "../../auth/hooks/useAuth";
import Loading from "../../auth/pages/Loading";

const PublishArticles = () => {
  const { loading, handleLogin } = useAuth();

    if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen w-screen  bg-[#e5d0a7b9]">
      <Navbar />
      <div className="lg:h-screen h-[85vh] w-screen border-2 border-[#b9b6b0]  bg-[#e6dfd2] ">
        <PublishForm />
      </div>
      <div className="h-35 lg:pl-15 pl-5 flex flex-col items-start justify-center w-screen dark:bg-gray-800 dark:text-white bg-[#e5d0a7]">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl lg:pt-3 pt-12 rotate-180 ">
            <Quote fill="black" />{" "}
          </h1>
          <h1 className="text-xl text-[#2a2929] dark:text-white font-[font2] ">
            The best way to find yourself is to lose yourself in the service of
            others.
          </h1>
        </div>
        <h1 className="text-xl font-[font1]  pl-10 ">-Mahatma Gandhi</h1>
      </div>
      <Footer />
    </div>
  );
};

export default PublishArticles;
