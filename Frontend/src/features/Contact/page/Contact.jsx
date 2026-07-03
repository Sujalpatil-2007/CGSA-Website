import React, { useState } from "react";
import Navbar from "../../home/components/Navbar";
import { Send, Mail, CalendarDays, UsersRound, Clock } from "lucide-react";
import { toast } from "react-toastify";
import HelpCard from "../components/HelpCard";
import Footer from "../../home/components/Footer";
import { useAuth } from "../../auth/hooks/useAuth";
import Loading from "../../auth/pages/Loading"

const Contact = () => {
  const [name, setName] = useState("");
  const { loading, handleLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name != "" && email != "" && subject != "" && message != "") {
      toast.success("Message Sent Successfully ✨");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      toast.error("Please fill all fields ❌");
    }
  };

  if (loading) {
    return <Loading />;
  }
  
  return (
    <main className="bg-[#e5d0a7b9] dark:bg-gray-900 min-h-screen w-screen">
      <Navbar />
      {/* Top section  */}
      <div className="lg:h-60 h-40 relative bg-linear-to-r from-green-900 via-green-800 to-green-700 w-full flex justify-center items-center  ">
        {/* right text */}
        <div className="lg:h-full w-1/2 absolute left-5 lg:left-15 text-white flex lg:gap-5 gap-3 flex-col justify-center items-start  ">
          <h1 className="lg:text-4xl font-[font2] ">Get In Touch</h1>
          <p className="font-[font1] leading-tight text-gray-300 text-sm lg:text-2xl ">
            We'd love to hear from you. Whether you have a question, <br />{" "}
            suggestion, or want to know more about our activities, <br /> feel
            free to reach out.
          </p>
        </div>
        {/* left img  */}
        <div className="lg:h-full flex justify-end items-center w-1/2  ">
          <img className="lg:h-72 h-40 absolute right-5 lg:right-15 object-center object-cover" src="contactPageimg.png" alt="" />
        </div>
      </div>
      {/* Mid section  */}
      <div className="lg:h-[70vh] min-h-[75vh]  w-full px-3 lg:px-20 gap-5 py-5 lg:flex justify-center items-center  ">
        {/* form  */}
        <div
          className="h-full w-full rounded-2xl p-5 dark:bg-gray-800 dark:text-white bg-[#f8f5ee]  shadow-xl"
        >
          <h1 className="font-[font2] text-3xl ">Send Us a Message</h1>
          <form onSubmit={handleSubmit}>
            {/* name and email  */}
            <div className="lg:flex gap-3">
              {/* Name input  */}
              <div className="flex flex-col pt-3">
                <label className="text-xl font-[font1] dark:text-gray-300 " htmlFor="Name">
                  Your Name :
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter your Name"
                  className=" bg-white dark:bg-gray-700 border rounded p-2 lg:w-72 h-9"
                />
              </div>
              {/* Email input  */}
              <div className="flex flex-col pt-3">
                <label className="text-xl font-[font1] dark:text-gray-300 " htmlFor="Name">
                  Email Address :
                </label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter your Email"
                  className=" bg-white dark:bg-gray-700 border rounded p-2 lg:w-72 h-9"
                />
              </div>
            </div>
            {/* Subject  */}
            <div className="pt-5">
              <label htmlFor="subject" className="text-xl dark:text-gray-300  font-[font1] ">
                Subject :
              </label>
              <select
                name="subject"
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                className="lg:w-[92%] w-[99%] border dark:bg-gray-700 dark:text-gray-300 bg-white rounded-lg p-2 "
              >
                <option value="">Select Subject</option>
                <option value="General Inquiry">General Inquiry</option>

                <option value="Articles & Publications">
                  Articles & Publications
                </option>

                <option value="Research Collaboration">
                  Research Collaboration
                </option>

                <option value="Events & Workshops">Events & Workshops</option>
                <option value="Feedback & Suggestions">
                  Feedback & Suggestions
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
            {/* Message  */}
            <div className="pt-5">
              <label htmlFor="message" className="text-xl dark:text-gray-300 font-[font1] ">
                Message :
              </label>
              <textarea
                name="message"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                rows={5}
                placeholder="Write your message here..."
                className="bg-white lg:w-[92%] w-[99%] dark:bg-gray-700 border rounded-lg p-2 "
              ></textarea>
            </div>
            <div className="pt-5">
              <button
                className="bg-green-700 text-white  flex justify-center items-center cursor-pointer active:scale-98 rounded px-3 py-2 left-0 font-[font2] "
                onClick={handleSubmit}
              >
                <Send size={30} className="p-1" />
                Send Message
              </button>
            </div>
          </form>
        </div>
        {/* Help card */}
        <div className="h-full w-full flex flex-col  rounded-2xl p-5 lg:mt-0 mt-5 dark:bg-gray-800  bg-[#f8f5ee]">
          <div className="flex lg:flex-row gap-5 lg:gap-0 flex-col justify-around items-start">
            <HelpCard
            i={<Mail color="#ffff" />}
            h="General Inquiries"
            p="For any queries related to articles, research, or collaborations.
"
          />
          <HelpCard
            i={<CalendarDays color="#ffff" />}
            h="Events & Programs"
            p="For information about events, workshops, and initiatives.
"
          />
          <HelpCard
            i={<UsersRound color="#ffff" />}
            h="Feedback & Suggestions"
            p="We value your feedback and suggestions to improve our platform."
          />
        </div>
        <div className="flex pt-10 gap-5 justify-start items-center">
          <div>
            <Clock color="#ffff" lg:size={120} size={110} fill="green" />
          </div>
          <div>
            <h1 className="lg:text-2xl text-xl dark:text-white font-[font2] ">Office Hours</h1>
            <p className="lg:text-xl dark:text-gray-300 font-[font1] pt-1 ">Monday - Friday : 9:00 AM - 5:00 PM <br />
                Saturday       : 9:00 AM - 1:00 PM <br />
                Sunday         : Closed
            </p>
          </div>
        </div>
          </div>
      </div>
      <Footer/>
    </main>
  );
};

export default Contact;
