import React, { useState } from "react";
import { createArticle } from "../services/Article.api";
import {Send} from 'lucide-react'
import { useNavigate } from "react-router";

const publishForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    content: "",
    author: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (window.confirm("Do you want to publish it?")) {
      const data = await createArticle(formData);
      setFormData({
        title: "",
        category: "",
        description: "",
        image: "",
        content: "",
        author: "",
      });
      navigate(`/articles/${data.article._id}`);
    }} catch (err) {
      console.log(err);
    }
};

  return (
    <main className="h-full w-full dark:bg-gray-900   flex justify-center items-center ">
      <div className="lg:h-[95%]  w-[95%]  ">
        <div className="p-1">
          <div className="flex">
            <h1 className="font-[font2] text-[#007a06b8] dark:text-green-700 text-3xl lg:text-4xl">
              Publish New Article
            </h1>
            <img
              className="h-23 w-0 lg:w-27 -mt-7  rotate-175 mix-blend-multiply "
              src="branch.jpg"
              alt="Not found"
            />
          </div>
          <p className="font-[font1] dark:text-white -mt-7 ">
            Share your thoughts on Gandhian ideology and inspire change.
          </p>
        </div>
        <div className=" lg:h-[90%] w-full ">
          <div className="h-full w-full rounded-2xl border-2 border-[#aba69ca7]  ">
            <form onSubmit={handleSubmit} className="h-full dark:bg-gray-800 dark:text-white p-3 w-full">
              {/* Title */}
              <div>
                <label
                htmlFor="title"
                className="flex text font-[font2] "
              >Title <span className="text-red-500">*</span> </label>
              <input
                className=" rounded w-full  p-1 border-2 border-gray-400"
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter article title"
              />
              </div>
              {/* img and category  */}
              <div className="flex flex-col    w-full   ">
              <div className="flex gap-10 relative ">
                {/* image url */}
              <div>
                <label
                htmlFor="image"
                className="flex text font-[font2] "
              >Image <span className="text-red-500">*</span> </label>
              <input
                className=" lg:w-96 w-42  rounded p-1 border-2 border-gray-400"
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                placeholder="https://example.com/image.jpg"
              />
              </div>
              {/* category */}
              <div>
              <label
                htmlFor="category"
                className="flex h-5 w-5  text font-[font2] "
              >Category <span className="text-red-500">*</span></label>
              <select name="category"
               id="category"
               value={formData.category}
               onChange={handleChange}
                className="bg-[#cac5bb68] dark:bg-gray-700 rounded "
               required
               >
                <option value="">Select a category</option>
                <option value="Truth">Truth</option>
                <option value="Non-Violence">Non-Violence</option>
                <option value="Simplicity">Simplicity</option>
                <option value="Service">Service</option>
               </select>
              </div>
              {/* img */}
              
              {formData.image && (
                <div className="h-32 w-52 mt-1 flex gap-3 absolute left-150 ">
                <img className="bg-[#938a8a51] object-cover rounded " src={formData.image} alt="Image Preview" />
                <p className="font-[font1] w-56 whitespace-nowrap " >Paste an image URL to <br /> preview your article cover image.</p>
              </div>
              )}
              
              </div>
              {/* Author */}
              <div>
                <label
                htmlFor="author"
                className="flex text font-[font2] "
              >Author <span className="text-red-500">*</span> </label>
              <input
                className=" rounded p-1 border-2 border-gray-400"
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Author name"
              />
              </div>
              </div>
            
              
              {/* description */}
              <div>
                <label
                htmlFor="description"
                className="flex text font-[font2] "
              >Description <span className="text-red-500">*</span> </label>
              <textarea
                className=" rounded w-full p-1 border-2 border-gray-400"
                type="text"
                id="description"
                name="description"
                value={formData.description}
                rows="3"
                onChange={handleChange}
                required
                placeholder="Short article description..."
              />
              </div>
              {/* content */}
              <div>
                <label
                htmlFor="content"
                className="flex text font-[font2] "
              >Content <span className="text-red-500">*</span> </label>
              <textarea
                className=" rounded w-full p-1 border-2 border-gray-400"
                type="text"
                id="content"
                name="content"
                value={formData.content}
                rows="9"
                onChange={handleChange}
                required
                placeholder="Write your article content..."
              />
              </div>
              
              <div className="pt-1">
                <button className="bg-red-400  flex justify-center items-center cursor-pointer active:scale-98 rounded px-3 py-2 left-0 font-[font2] " onClick={handleSubmit}><Send size={30}  className="p-1" />Publish Article</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
    
  );
};

export default publishForm;
