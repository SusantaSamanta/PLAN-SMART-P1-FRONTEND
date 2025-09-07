import React from 'react'

const ResetPasswordInput = () => {
    return (
        <>
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
                            type='email'
                            name='email'
                            placeholder='example@gmail.com'
                            className=" w-full  h-10  pl-10 py-0 rounded-lg bg-[#20242d4c] text-gray-200 border-2 border-[rgba(255,255,255,0.32)] focus:border-2 focus:border-gray-600 focus:outline-none" />
                        {/* <p className=''>M</p> */}

                        <img
                            className="w-5 absolute left-6 top-1/2 -translate-y-1/2 -translate-x-1/2"
                            src="src/assets/mail.png"
                            alt="mail"
                        />
                    </div>

                    {/* error message */}
                    <div className='mt-4   p-1 pl-3 border-l-2  rounded-[6px] bg-[#ff8a4f17]  text-[#ff8a4fc8] text-sm' style={{ lineHeight: 1.4 }}>No user found. Place enter correct email.</div>


                    <button
                        onClick={() => handelForgotPassword()}
                        type="submit"
                        className="w-full py-2 mt-4 rounded-lg bg-gradient-to-b from-[#769dff] to-[#1a5cff] text-white  hover:bg-blue-700 transition font-bold"
                    >
                        Continue
                    </button>

                </form>
            </div>




        </>
    )
}

export default ResetPasswordInput