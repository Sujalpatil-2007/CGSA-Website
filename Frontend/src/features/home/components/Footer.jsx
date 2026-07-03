import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiYoutubeFill,
} from "@remixicon/react";

const Footer = () => {
  return (
    <>
      {/* Main Footer */}
      <footer className="bg-linear-to-b from-green-950 to-green-900 text-[#F3ECDA]">
        {/* Top Leaf Section */}
        <div className="bg-[#f8e3baf5] dark:bg-gray-900 h-10 flex justify-center">
          <div className="bg-green-950 h-10 w-32 rounded-b-full flex items-start justify-center pt-3">
            🌿
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-8 py-14 grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h1 className="text-4xl font-bold font-[font2]">CGSA</h1>

            <div className="w-20 h-0.5 bg-orange-500 my-4"></div>

            <h2 className="font-semibold">
              Centre of Gandhian Studies and Action
            </h2>

            <p className="mt-4 text-gray-300">
              Promoting Truth, Non-Violence, Simplicity and Service through
              education and action.
            </p>

            <div className="flex gap-3 mt-5">
              <RiFacebookCircleFill />
              <RiInstagramFill />
              <RiYoutubeFill />
              <i className="ri-youtube-fill"></i>
            </div>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-xl text-green-400 font-semibold">
              Quick Links
            </h2>

            <div className="w-12 h-0.5 bg-orange-500 my-3"></div>

            <div className="flex flex-col gap-3">
              <Link to="/">Home</Link>
              <Link to="/aboutUs">About</Link>
              <Link to="/articles">Articles</Link>
              <Link to="/timeline">Timeline</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-xl text-green-400 font-semibold">
              Gandhian Values
            </h2>

            <div className="w-12 h-0.5 bg-orange-500 my-3"></div>

            <div className="flex flex-col gap-3">
              <p>🕊 Truth</p>
              <p>🤝 Non-Violence</p>
              <p>🌱 Simplicity</p>
              <p>❤️ Service</p>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-xl text-green-400 font-semibold">Contact</h2>

            <div className="w-12 h-0.5 bg-orange-500 my-3"></div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Mail size={18} />
                <span>cgsa@gmail.com</span>
              </div>

              <div className="flex gap-2">
                <Phone size={18} />
                <span>+91 xxxxx xxxxx</span>
              </div>

              <div className="flex gap-2">
                <MapPin size={18} />
                <span>Centre of Gandhian Studies and Action</span>
              </div>
            </div>
          </div>
        </div>

        {/* Gandhi Quote */}
        <div className="bg-[#F3ECDA] dark:bg-gray-800 text-center py-2 px-5">
          <h1 className="text-6xl text-orange-600">“</h1>

          <p className="text-3xl -mt-5 dark:text-gray-300 text-green-950 font-[font2]">
            Be the change that you wish to see in the world.
          </p>

          <div className="w-40 h-1 bg-orange-500 mx-auto my-3"></div>

          <p className="italic dark:text-white text-gray-700">
            — Mahatma Gandhi
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-800 py-5 text-center text-sm text-gray-300">
          © 2026 Centre of Gandhian Studies and Action. All Rights Reserved.
          <br />
          Designed With Simplicity, Inspired By Gandhi.
        </div>
      </footer>
    </>
  );
};

export default Footer;
