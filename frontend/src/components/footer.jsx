// src/components/Footer.jsx
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 font-poppins ">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-4">CATEGORIES</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Men’s</li>
            <li>Women’s</li>
            <li>Kid’s</li>
            <li>Gifting</li>
            <li>Customised</li>
          </ul>
        </div>

        {/* Featured */}
        <div>
          <h3 className="font-semibold mb-4">FEATURED</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Diwali Collection</li>
            <li>Rakhi Collection</li>
            <li>Eid Collection</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-4">LEGAL</h3>
          <ul className="space-y-2 text-gray-600">
            <li>General Info</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4">TALK TO US</h3>
          <ul className="space-y-2 text-gray-600">
            <li>support@ercom.com</li>
            <li>+66 2399 1145</li>
            <li>Contact Us</li>
            <li>Facebook</li>
            <li>Linkedin</li>
            <li>Twitter</li>
          </ul>
        </div>
      </div>

      <div className="border-t mt-6">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-gray-600">
          <p>© 2025 Askwebnistry. All Rights Reserved.</p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-xl border text-gray-800 hover:bg-gray-100"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-xl border text-gray-800 hover:bg-gray-100"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center rounded-xl border text-gray-800 hover:bg-gray-100"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
