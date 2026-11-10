
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="contact"
      className="bg-[#080B18] px-5 py-16 text-white sm:px-10"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading Animation */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={
            isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: -50 }
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold sm:text-4xl">
            Contact <span className="text-blue-500">Us</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400">
            Have questions or need assistance? We're here to help you
            build a better future.
          </p>
        </motion.div>

        {/* Contact Cards Animation */}
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {[
            {
              icon: <FaEnvelope />,
              title: "Email Us",
              value: "susantasamanta0708@gmail.com",
              link: "mailto:susantasamanta0708@gmail.com",
            },
            {
              icon: <FaPhoneAlt />,
              title: "Call Us",
              value: "+91 95475 94759",
              link: "tel:+919547594759",
            },
            {
              icon: <FaMapMarkerAlt />,
              title: "Our Location",
              value: "West Bengal, India",
              link: null,
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 40 }
              }
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: 0.3 + index * 0.2,
              }}
              className="rounded-xl border border-white/10 bg-[#0D1224] p-6 text-center transition duration-300 hover:-translate-y-1 hover:border-blue-500/50"
            >
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/15 text-xl text-blue-400">
                {item.icon}
              </div>

              <h3 className="mt-4 font-semibold">{item.title}</h3>

              {item.link ? (
                <a
                  href={item.link}
                  className="mt-2 block text-sm text-gray-400 transition hover:text-blue-400"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 text-sm text-gray-400">
                  {item.value}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Animation */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 40 }
          }
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.9 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl border border-blue-500/20 bg-gradient-to-r from-blue-600/15 to-indigo-600/10 p-6 text-center sm:flex-row sm:text-left"
        >
          <div>
            <h3 className="text-lg font-semibold">
              Ready to shape the future?
            </h3>
            <p className="mt-1 text-sm text-gray-400">
              Connect with us and let's create something amazing.
            </p>
          </div>

          <a
            href="mailto:susantasamanta0708@gamil.com"
            className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold transition hover:bg-blue-700"
          >
            Get in Touch <FaArrowRight />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
