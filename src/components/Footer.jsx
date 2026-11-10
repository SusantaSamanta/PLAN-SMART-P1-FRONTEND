
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#070b19] text-gray-300">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-10 lg:px-20">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-xl font-bold text-white">
                F
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  Future<span className="text-blue-500">Vision</span>
                </h2>
                <p className="text-[10px] text-gray-400">
                  Build your future
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-6 text-gray-400">
              Revolutionizing the hiring landscape with AI-powered
              interviews, smarter decisions, and better opportunities.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: <FaGithub />, link: "https://github.com/SusantaSamanta" },
                { icon: <FaLinkedinIn />, link: "https://in.linkedin.com/in/susanta-samanta-10a283330" },
                { icon: <FaInstagram />, link: "https://instagram.com" },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-400 transition hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", to: "/" },
                { name: "About Us", to: "/#about" },
                { name: "Features", to: "/#features" },
                { name: "Contact Us", to: "/#contact" },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="transition hover:text-blue-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Our Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/dashboard" className="transition hover:text-blue-400">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/login" className="transition hover:text-blue-400">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="transition hover:text-blue-400">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 font-semibold text-white">
              Contact Information
            </h3>

            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <FaEnvelope className="mt-1 shrink-0 text-blue-500" />
                <a
                  href="mailto:susantasamanta0708@gmail.com"
                  className="break-all transition hover:text-blue-400"
                >
                  susantasamanta0708@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaPhoneAlt className="shrink-0 text-blue-500" />
                <a
                  href="tel:+919547594759"
                  className="transition hover:text-blue-400"
                >
                  +91 95475 94759
                </a>
              </li>

              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="shrink-0 text-blue-500" />
                <span>West Bengal, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} FutureVision. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Built with <span className="text-blue-500">♥</span> for a
            smarter future.
          </p>

          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-blue-400 transition hover:bg-blue-600 hover:text-white"
          >
            <FaArrowUp />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
