import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" }); // animate each time visible

    return (
        <section
            ref={ref}
            id="about"
            className="h-auto px-5 md:px-20 py-6 lg:py-10 border-0 flex justify-center items-center bg-[#070b19] text-gray-300 "
        >
            <motion.div
                initial={{ opacity: 0, x: -80 }} // 👈 start from left
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }} // 👈 slide in
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="max-w-3xl text-center my-8 border-0"
            >
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    About <span className="text-blue-500">PlanSmart</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                    We're on a mission to revolutionize the hiring landscape. Our
                    AI-powered platform provides a fair, efficient, and data-driven
                    approach to talent acquisition, helping companies build diverse and
                    high-performing teams.
                </p>
            </motion.div>
        </section>
    );
};

export default About;
