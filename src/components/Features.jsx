import React from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaClock, FaCheckSquare, FaEdit } from "react-icons/fa";



const features = [
    {
        icon: <FaCheckSquare className="text-blue-400 text-2xl mt-1" />,
        title: "Customizable Questions",
        desc: "Tailor the interview questions to the specific roles and skills you're hiring for.",
    },
    {
        icon: <FaEdit className="text-blue-400 text-2xl mt-1" />,
        title: "Customizable Questions",
        desc: "Tailor the interview questions to the specific roles and skills you're hiring for.",
    },
    {
        icon: <FaClock className="text-blue-400 text-2xl mt-1" />,
        title: "Customizable Questions",
        desc: "Tailor the interview questions to the specific roles and skills you're hiring for.",
    },
];

const Features = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, margin: "-100px" }); // 👈 animate multiple times

    return (
        <section
            className="h-auto border-0 px-6 md:px-20 py-15 bg-[#070b19] text-white flex flex-col items-center justify-center "
            ref={ref}
            id="features"
        >
            <motion.h2
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold mb-3"
            >
                Core Features
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-400 text-center max-w-xl mb-12"
            >
                Discover the powerful features that make our AI interview platform the
                perfect solution for your hiring needs.
            </motion.p>

            <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
                <div className="space-y-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            className="flex items-start gap-4 bor"
                        >
                            {f.icon}
                            <div>
                                <h3 className="font-semibold text-lg">{f.title}</h3>
                                <p className="text-gray-400 text-sm">{f.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="bg-blue-700 rounded-2xl flex items-center justify-center text-2xl font-semibold p-16"
                >
                    AI Interview
                </motion.div>
            </div>
        </section>
    );
};

export default Features;
