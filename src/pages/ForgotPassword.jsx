import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ResetPasswordOtpInput from '../components/ResetPasswordOtpInput';
import NewPasswordInput from '../components/NewPasswordInput';



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

                <div ref={formHeightInMobile} className='h-screen md:h-screen flex flex-col justify-center items-center text-white overflow-hidden relative
                  bg-[url("./assets/forgotPasswordBg.jpg")]
                  bg-no-repeat
                  bg-cover
                  bg-center
                  md:bg-[length:100%_100%] 
                  md:bg-center
                '>
                    <motion.div className='w-full md:w-100 h-full md:h-auto  pt-20 px-6 md:p-10 flex flex-col md:justify-center md:mt-4 border-t-1 md:border-2 md border-[#6d6d6d2f] rounded-3xl  bg-[#16161637] md:bg-[#dcdcdc06] md:backdrop-blur-[10px] relative'
                    // initial={{ opacity: 0 }}
                    // whileInView={{ opacity: 1, }}
                    // transition={{ duration: 0.5, ease: 'easeOut' }}
                    // viewport={{ once: true }}
                    >

                        {    // 1st page email enter for reset password
                            showCurrentPage == 'EnterMail' &&
                            <div>
                                <div className='border-0 p-2 w-auto flex justify-center items-center ' >
                                    <div className='w-20 bg-gradient-to-b from-[#5060eb56]   to-[rgba(0,0,0,0.42)] px-4 py-[18px] border-1 border-[#4A5CFF] rounded-[50%] flex items-center justify-center'>
                                        <img className='w-[90%]' src="src/assets/faKey.png" alt="" />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-bold text-white text-center ">
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
                                            className=" w-full  h-12 md:h-10  pl-10 py-0 rounded-lg bg-[#20242d4c] text-gray-200 border-2 border-[rgba(255,255,255,0.32)] focus:border-2 focus:border-gray-600 focus:outline-none" />

                                        <img
                                            className="w-5 opacity-70 absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2"
                                            src="src/assets/mail.png"
                                            alt="mail"
                                        />
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
                                        onClick={(e) => handelForgotPassword(e)}
                                        type="submit"
                                        className="w-full py-2 mt-4 rounded-lg bg-gradient-to-b from-[#769dff] to-[#1a5cff] text-white  hover:bg-blue-700 transition font-bold"
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
                        <p className="md:mt-5 hidden md:block text-center text-gray-300 text-sm">
                            Back to {" "}
                            <Link to={'/login'} className="text-blue-500 hover:underline">
                                Login
                            </Link>
                        </p>




                    </motion.div>

                    <p className="mb-10 border-0 md:hidden text-center text-gray-300 text-sm">
                        Back to {" "}
                        <Link to={'/login'} className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>


                </div>




            </section >
        </>
    )
}

export default ForgotPassword