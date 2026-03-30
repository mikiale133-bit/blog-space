import { Facebook, Instagram, Twitter, Send } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-700 text-gray-300 mt-uto py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Links */}

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-white">
                <Send size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-500 mt-6 pt-4 text-center text-sm text-gray-400">
          © {currentYear} BlogSpace. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
