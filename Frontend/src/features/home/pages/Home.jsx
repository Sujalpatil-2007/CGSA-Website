import React, { useState, useEffect } from "react";
import { CircleX, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import { Link, Navigate } from "react-router";
import { useNavigate } from "react-router";
import { getAllArticles } from "../../Article/services/Article.api";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
  const [latestArticles, setLatestArticles] = useState([]);
  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const data = await getAllArticles();

        const latest = data.articles
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 4);

        setLatestArticles(latest);
      } catch (err) {
        console.log(err);
      }
    };

    fetchLatestArticles();
  }, []);

  return (
    <div id="main">
      <main className="bg-cover bg-[#e5d0a7b9] dark:bg-gray-900 relative   bg-center bg-no-repeat min-h-screen w-full ">
        <Navbar />
        <Hero />
      </main>
      <div className="min-h-screen w-full relative dark:bg-gray-900 bg-[#e7dbc490] ">
        <div className="flex justify-center items-center ">
          <div className="h-[10%] lg:h-[25%] lg:w-[90%] w-[98%] absolute   lg:mt-12 mt-18 flex justify-around items-center rounded-2xl text-center shadow-[0px_0px_10px_0px_black] dark:bg-gray-800 dark:text-white  bg-[#f1eee7db]  ">
            <div className="flex flex-col  p-1 border-r-2 lg:border-none border-[#b1a375] gap-5">
              <h1 className="lg:text-3xl text-xl font-[font2]">Truth</h1>
              <p className="lg:text-xl dark:text-gray-300 leading-4 lg:leading-normal font-[font1] ">
                Commitment to <br /> truth in thought, <br />
                word and action.
              </p>
            </div>
            <div className="flex flex-col  p-1 border-r-2 lg:border-none border-[#b1a375] gap-5">
              <h1 className="lg:text-3xl text-xl font-[font2]">Non-violence</h1>
              <p className="lg:text-xl dark:text-gray-300 leading-4 lg:leading-normal font-[font1] ">
                Promoting peace, <br /> empathy and harmony <br />
                in all we do.
              </p>
            </div>
            <div className="flex flex-col  p-1 border-r-2 lg:border-none border-[#b1a375] gap-5">
              <h1 className="lg:text-3xl text-xl font-[font2]">Simplicity</h1>
              <p className="lg:text-xl dark:text-gray-300 leading-4 lg:leading-normal font-[font1] ">
                Embracing simple living <br /> for a mindful <br />
                and sustainable future.
              </p>
            </div>
            <div className="flex flex-col p-1 border-r-2 lg:border-none border-[#b1a375]   gap-5">
              <h1 className="lg:text-3xl text-xl font-[font2]">Service</h1>
              <p className="lg:text-xl dark:text-gray-300 leading-4 lg:leading-normal font-[font1] ">
                Working selflessly for
                <br /> the welfare <br />
                and upliftment of all.
              </p>
            </div>
          </div>
        </div>
        <div className="h-[25vh] w-full"></div>
        <div className="h-[50%] w-full lg:p-5  ">
          <div className=" flex justify-between  items-center px-3 lg:px-10  ">
            <h1 className="lg:text-3xl text-xl dark:text-white font-[font2] ">
              Featured Articles
            </h1>
            <p
              onClick={() => {
                navigate("/articles");
              }}
              className="lg:text-xl absolute right-3 lg:right-13 text-sm cursor-pointer  font-[font1] text-[#007a06] lg:gap-2 flex items-center "
            >
              View All Articles <ArrowRight />
            </p>
          </div>
          <div className="lg:h-[50vh] p-3 flex items-center justify-center ">
            <div className="grid md:grid-cols-3 gap-6 lg:mt-10">
              <section className="pt-5 lg:pt-18">
                <div className="grid w-[90vw] md:grid-cols-2 lg:grid-cols-4 lg:ml-10 gap-10">
                  {latestArticles.map((article) => (
                    <Link key={article._id} to={`/articles/${article._id}`}>
                      <div className="bg-[#f1eee7db] dark:bg-gray-800 dark:text-white lg:h-[60vh] rounded-2xl  overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-56 object-cover"
                        />
                        <div className="p-5">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {article.category}
                          </span>

                          <h3 className="text-xl font-bold mt-4">
                            {article.title}
                          </h3>

                          <p className="text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">
                            {article.description}
                          </p>

                          <p className="text-gray-400 text-sm font-[font1] pt-3 ">
                            {new Date(article.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
