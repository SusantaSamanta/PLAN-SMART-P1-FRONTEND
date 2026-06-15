import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const HomeHero = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" });

    return (
        <section
            ref={ref}
            className="h-[80vh] md:h-[55vh] lg:h-[90vh] border-0 px-5 pt-20 md:pt-30 lg:pt-25  flex flex-col justify-center items-center text-center bg-[#070b19] text-white"
            // className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-r from-[#0a1a47] to-[#020617] text-white"
        >
            {/* Animated Container */}
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="max-w-4xl"
            >
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    The Future of Hiring is <br className="hidden md:block" />
                    Here with <span className="text-blue-400">Real Time AI Voice Interviews</span>
                </h1>

                <p className="text-gray-300 text-lg md:text-xl mb-8">
                    Streamline your recruitment process, reduce bias, and identify top candidates
                    faster with our intelligent, conversational AI interview platform.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/dashboard" className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition">
                        Get Started
                    </Link>
                    <Link to={'/signup'} className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition flex items-center gap-2 justify-center">
                        Create account free <span className="text-lg">→</span>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default HomeHero;
