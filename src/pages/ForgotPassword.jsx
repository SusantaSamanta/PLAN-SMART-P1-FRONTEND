import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ResetPasswordOtpInput from '../components/ResetPasswordOtpInput';
import NewPasswordInput from '../components/NewPasswordInput';
import '../style/ForgatePw.css';
import { IoIosMail } from "react-icons/io";
import { FaKey } from "react-icons/fa";

const ForgotPassword = () => {

    const location = useLocation();
    console.log(location);



    const [showCurrentPage, setShowCurrentPage] = useState('EnterMail');  // EnterCode   // EnterNewPassword
    const currentEmailValue = useRef(null);
    const errorMessageForInput = useRef(null);




    ////// Verify userEmail Length and format  : like 'susanta@gmail.com'  
    const emailLengthVerify = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };





    const formHeightInMobile = useRef(null);
    useEffect(() => {
        if (window.screen.width < 500) {
            formHeightInMobile.current.style.height =
                document.documentElement.clientHeight + "px";
        }
    }, []);

    const handelForHideError = () => {
        errorMessageForInput.current.style.display = 'none';
    }

    const handelForgotPassword = (e) => {
        e.preventDefault();
        if (currentEmailValue.current.value == '') {
            errorMessageForInput.current.style.display = 'block';
            errorMessageForInput.current.innerText = 'Please enter a email';
            return;
        }
        if (!emailLengthVerify(currentEmailValue.current.value)) {
            errorMessageForInput.current.style.display = 'block';
            errorMessageForInput.current.innerText = 'Please enter a valid email. Like example@gmail.com';
            return;
        }
        setShowCurrentPage('EnterCode');
    }






    return (
        <>
            <section className='bg-[#080C17]'>

                <div
                    ref={formHeightInMobile}
                    className='h-screen md:h-screen flex flex-col justify-center items-center text-white overflow-hidden relative
                               bg-[url("./assets/forgotPasswordB1.jpg")]
                               bg-no-repeat
                               bg-cover
                               bg-center
                               md:bg-[length:100%_100%] 
                               md:bg-center
                '>
                    <motion.div
                        className='card w-full md:w-110 h-full md:h-130 overflow-hidden relative '
                    >
                        <div class="border-glow"></div>

                        <div class="top-shin"></div>
                        <div class="bottom-glow1"></div>
                        <div class="bottom-glow2"></div>
                        <div class="bottom-glow3"></div>
                        <div class="bottom-glow4"></div>

                        <div className='w-full md:h-full pt-20 px-6 md:p-10 flex flex-col items-center  justify-center border-0'>


                            {    // 1st page email enter for reset password
                                showCurrentPage == 'EnterMail' &&
                                <div>
                                    <div className='border-0 p-2 w-auto flex justify-center items-center ' >
                                        <div className='w-20  h-20 bg-gradient-to-b from-[#6272ffca]   to-[rgba(0,0,0,0.2)] px-4 py-[18px] border-2 border-[#8792f8] rounded-[50%] flex items-center justify-center'>
                                            {/* <img className='w-[90%]' src="src/assets/faKey.png" alt="" /> */}
                                            <FaKey className='text-[#8792f8] text-3xl' />
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-100 text-center ">
                                        Forgot Password
                                    </h2>

                                    <p className="mt-2 text-base text-gray-200 text-center">Please enter your email to reset your password.</p>

                                    <form className="mt-8 md:mt-4 ">

                                        {/* <label htmlFor='email' className="block text-sm font-medium text-gray-300">Email</label> */}
                                        <div className='mt-1 border-0  relative'>

                                            <input
                                                ref={currentEmailValue}
                                                type='email'
                                                name='email'
                                                required
                                                onFocus={() => handelForHideError()}
                                                placeholder='example@gmail.com'
                                                className=" w-full  h-12   pl-12 py-0 rounded-xl bg-transparent text-white text-base font-geist outline-none transition-all duration-300 border-2 border-white/30 focus:border-2  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20" />

                                            <IoIosMail className="text-2xl text-[#8792f8] opacity-100 absolute left-[26px] top-[50%] -translate-y-1/2 -translate-x-1/2" />
                                            {/* <img
                                                
                                                src="src/assets/mail.png"
                                                alt="mail"
                                            /> */}
                                        </div>

                                        {/* error message */}
                                        <div
                                            ref={errorMessageForInput}
                                            className='mt-4 p-1 pl-3 hidden border-l-2  rounded-[6px] bg-[#ff8a4f17]  text-[#ff8a4fc8] text-sm'
                                            style={{ lineHeight: 1.4 }}
                                        >
                                            No user found. Place enter correct email.
                                        </div>


                                        <button
                                            // whileHover={{y: -2}}
                                            // transition={{ duration: 0.1, ease: 'easeOut' }}
                                            onClick={(e) => handelForgotPassword(e)}
                                            type="submit"
                                            // bg-glass-button
                                            className="w-full h-11 py-2 mt-4 rounded-lg bg-gradient-to-b from-[#769dff] to-[#1a5cff] text-white font-bold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
                                        >
                                            Continue
                                        </button>

                                    </form>
                                </div>

                            }

                            {   // 2nd page verification code enter for reset password
                                showCurrentPage == 'EnterCode' &&
                                <ResetPasswordOtpInput email={'susantasamanta@gmail.com'} setShowCurrentPage={setShowCurrentPage} length={6} />

                            }

                            {   // 3rd page for take input of new password
                                showCurrentPage == 'EnterNewPassword' &&
                                <NewPasswordInput />

                            }





                            {/* Submit */}







                            {/* Footer */}
                            <p className="md:mt-5 hidden md:block text-center text-gray-100 text-sm">

                                <Link to={'/login'} className="text-white hover:underline">
                                    Back to {" "}Login
                                </Link>
                            </p>


                        </div>

                        <p className="mb-10 border-0 w-full md:hidden relative bottom-0  text-center text-gray-300 text-sm">

                            <Link to={'/login'} className="text-blue-100 hover:underline">
                                Back to {" "}Login
                            </Link>
                        </p>
                    </motion.div>



                </div>




            </section >
        </>
    )
}

export default ForgotPassword