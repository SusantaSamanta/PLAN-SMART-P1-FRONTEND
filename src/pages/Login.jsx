import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

const Login = () => {

  const formHeightInMobile = useRef(null);
  useEffect(() => {
    if (window.screen.width < 500 && document.documentElement.clientHeight > 700) {
      formHeightInMobile.current.style.height =
        document.documentElement.clientHeight + "px";
    }
  }, []);

  const [remember, setRemember] = useState(false);

  const handelLogin = async () => {
    try {
      const response = await axios.post('/api/user/auth/login',
        { email: 'asd@gmail', password: 'asd' },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      console.log(response.data);

    } catch (error) {
      console.log(error);

    }
  }


  return (
    <>
      <section className='bg-[#101114]'>

        <div ref={formHeightInMobile} className='h-auto md:h-screen  flex flex-col justify-center items-end md:items-center text-white overflow-hidden
          bg-[url("./assets/Rays.svg")]  
          bg-[length:150%_150%] bg-[-40px_-350px] 
          md:bg-[length:120%_120%] md:bg-[80px_-280px] 
          lg:bg-[length:80%_80%] lg:bg-[top_right]  bg-no-repeat'>
          <motion.div className='h-full md:h-auto  w-full md:w-120   pt-10 px-6 md:p-7 border-t-1 md:border-2 border-[#6d6d6d2f] rounded-3xl md:rounded-3xl bg-[#dcdcdc06] backdrop-blur-[0px]'
          // initial={{ opacity: 0, y: 50 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // transition={{ duration: 0.8, ease: 'easeOut' }}
          // viewport={{ once: true }}
          // initial={{ opacity: 0 }}
          // whileInView={{ opacity: 1, }}
          // transition={{ duration: 0.4 }}
          // viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-white ">
              Login to your account
            </h2>

            <p className="mt-2 text-base text-gray-200">  Welcome back! Please enter your details.</p>

            <form className="mt-8 md:mt-4 ">


              <label htmlFor='email' className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type='email'
                name='email'
                placeholder='example@gmail.com'
                className="mt-1 w-full  h-12 md:h-10 mb-3 px-4 py-2 rounded-lg bg-[#20242d4c] text-gray-200 border border-gray-700 focus:border-2 focus:border-gray-600 focus:outline-none" />


              <label htmlFor='password'  className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type='password'
                name='password'
                placeholder='•••••••••••••'
                className="mt-1 w-full h-12 md:h-10  px-4 py-2 rounded-lg bg-[#20242d4c] text-gray-200 border focus:border-2 border-gray-700 focus:border-gray-600 focus:outline-none"
              />





              {/* error message */}
              <div className='my-5 p-1 pl-3 border-l-2  rounded-[6px] bg-[#ff8a4f17]  text-[#ff8a4fc8] text-sm' style={{ lineHeight: 1.4 }}>Please enter a password Lorem ipsum dolor sit amet consectetur adipisicing elit.cere?</div>




              <div className="flex mb-6 items-center justify-between text-sm ">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="peer hidden"
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  {/* Custom checkbox */}
                  <span className="w-4 h-4 flex items-center justify-center rounded border border-gray-500 peer-checked:bg-blue-600 peer-checked:border-blue-500 transition">
                    {/* Tick mark when checked */}
                    <svg
                      className="hidden peer-checked:block w-3 h-3 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-400">Remember for 30 days</span>
                </label>

                <Link to={"/forgot-password"} className="text-blue-500 hover:underline">
                  Forgot password
                </Link>
              </div>



              {/* Submit */}
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-gradient-to-b from-[#769dff] to-[#1a5cff] text-white  hover:bg-blue-700 transition font-bold"
              >
                Login
              </button>



            </form>



            {/* OR Divider */}
            <div className="h-10 my-2 md:my-1 flex items-center">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="mx-3 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>


            {/* Social Logins */}
            <div className="grid grid-cols-1 border-0 gap-4">
              <button className="flex items-center justify-center w-full h-10 border-b-1 border-r-1 border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-6 h-6" />
                <span className='ml-2 font-bold'>
                  Continue with Google
                </span>
              </button>
              {/* <button className="flex items-center justify-center w-full h-10 border-b-1 border-r-1 border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700">
                <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" className="w-6 h-6" />
              </button>
              <button className="flex items-center justify-center w-full h-10 border-b-1 border-r-1 border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-700">
                <img src="https://www.svgrepo.com/show/353655/discord-icon.svg" alt="Discord" className="w-6 h-6" />
              </button> */}
            </div>


            {/* Footer */}

            <p className="mt-8 hidden md:block text-center text-gray-300 text-sm">
              Don't have an account?{" "}
              <Link to={'/signup'} className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>



          </motion.div>
          <p className="mb-10 w-full  md:hidden text-center text-gray-300 text-sm">
            Don't have an account?{" "}
            <Link to={'/signup'} className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>

        </div>



      </section>
    </>
  )
}

export default Login









