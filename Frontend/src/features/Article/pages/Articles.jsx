import React, { useEffect, useState } from "react";
import Navbar from "../../home/components/Navbar";
import { getAllArticles } from "../services/Article.api";
import { Link } from "react-router";
import { Calendar, Search } from "lucide-react";
import Footer from "../../home/components/Footer";
import { useAuth } from "../../auth/hooks/useAuth";
import Loading from "../../auth/pages/Loading";

const Articles = () => {
  const { loading, handleLogin } = useAuth();
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getAllArticles();
        setArticles(data.articles);
      } catch (err) {
        console.log(err);
      }
    };

    fetchArticles();
  }, []);
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

    if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="min-h-screen w-screen dark:bg-gray-900 bg-[#e5d0a7b9]">
      <Navbar />

      <div className="p-10">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />

            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-2 border rounded-full dark:bg-gray-800 dark:text-white lg:rounded-lg bg-white outline-none  focus:shadow-[0px_0px_10px_0px_gray] "
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border w-36 rounded-lg dark:bg-gray-800 dark:text-white bg-white"
          >
            <option value="All">All Categories</option>
            <option value="Truth">Truth</option>
            <option value="Non-Violence">Non-Violence</option>
            <option value="Simplicity">Simplicity</option>
            <option value="Service">Service</option>
          </select>
        </div>
        <div className="text-center">
          <div className="flex  items-start justify-between">
            <h1 className="text-5xl flex justify-start font-[font2] dark:text-green-700 text-green-900">
              Articles
            </h1>
            <p className="text-gray-700 dark:text-white ">
              Found {filteredArticles.length} article(s)
            </p>
          </div>

          <p className="flex justify-start mb-5 mt-2 font-[font1] dark:text-white text-gray-700">
            Explore articles inspired by Gandhian values, truth, non-violence
            and social change.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArticles.map((article) => (
            <Link key={article._id} to={`/articles/${article._id}`}>
              <div className="bg-white dark:bg-gray-800 dark:text-white h-96 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-105 transition-all">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">
                  <div className="flex justify-between">
                    <div className="flex flex-wrap gap-2">
  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800">
    {article.category}
  </span>

</div>
                    <p className="flex items-center gap-1 font-[font1]">
                      <Calendar size={18} />
                      {new Date(article.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <h2 className="text-xl font-[font2] mt-3">{article.title}</h2>

                  <p className="text-gray-600 dark:text-gray-300 font-[font1] mt-2 line-clamp-3">
                    {article.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Articles;
