
import React from "react";
import { motion } from "framer-motion";
import { FaArrowLeft, FaHome, FaCompass } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#070b19] px-5 py-16 text-white">

      {/* Background Effects */}
      <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute -right-32 bottom-10 h-72 w-72 rounded-full bg-indigo-600/20 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-2xl text-center">

        {/* 404 Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: -30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <h1 className="select-none text-[120px] font-extrabold leading-none tracking-tighter text-transparent sm:text-[180px] md:text-[220px]"
            style={{
              WebkitTextStroke: "2px #3B82F6",
            }}
          >
            404
          </h1>

          {/* <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <FaCompass className="text-4xl text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)] sm:text-5xl" />
          </motion.div> */}
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <h2 className="mt-8 text-2xl font-bold sm:text-3xl md:text-4xl">
            Oops! Page Not Found
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-gray-400 sm:text-base">
            Looks like you've taken a wrong turn. The page you're looking
            for doesn't exist or may have been moved.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">

            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-7 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <FaHome />
              Back to Home
            </button>

            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 px-7 py-3 font-semibold text-gray-300 transition duration-300 hover:-translate-y-1 hover:border-blue-500 hover:text-white"
            >
              <FaArrowLeft />
              Go Back
            </button>

          </div>
        </motion.div>

        {/* Branding */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16 text-sm text-gray-600"
        >
          Lost in the digital universe?{" "}
          <span className="font-semibold text-blue-500">
            FutureVision
          </span>
        </motion.p>

      </div>
    </section>
  );
};

export default NotFound;
