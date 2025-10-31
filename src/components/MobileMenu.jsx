import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const MobileMenu = ({ menuOpen, setMenuOpen }) => {

    console.log(menuOpen, setMenuOpen);


    const {
        isLogin, setIsLogin,
        userDetails, setUserDetails,
        isLoading, setIsLoading } = useContext(AppContext)


    const closeMenu = () => {
        setTimeout(() => {
            setMenuOpen(!menuOpen)
        }, 20);
    }

    const clickToScroll = (section) => {
        closeMenu()
        if (section == 'home') {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const to = document.getElementById(section);
            if (to) {
                to.scrollIntoView({ behavior: "smooth", block: "center", });
            }
        }
    }

    return (
        <>
            {
                !menuOpen &&
                <div className='h-auto w-full mt-18 py-4 gap-4 
                                flex flex-col items-center justify-center absolute z-40 top-0 left-0 
                                bg-gradient-to-r from-[#0a3bffeb] via-[#0e2a90ea] to-[#050f3ce0]
                                text-white shadow-lg rounded-xl font-medium'>

                    <Link to={'/about'} onClick={() => clickToScroll('about')} className="hover:text-blue-300 cursor-pointer transition border-0 w-full text-center">
                        About
                    </Link>

                    <Link to={'/features'} onClick={() => clickToScroll('features')} className="hover:text-blue-300 cursor-pointer transition border-0 w-full text-center">
                        Features
                    </Link>


                    <Link to={'/contact'} className="hover:text-blue-300 cursor-pointer transition border-0 w-full text-center">Contact Us</Link>


                    {!isLoading && isLogin && (
                        <Link onClick={() => closeMenu()} to="/profile" className="hover:text-blue-300 cursor-pointer transition border-0 w-full text-center">
                            Profile
                        </Link>
                    )}
                    <div className="flex items-center gap-4">
                        {!isLoading &&
                            <div>
                                {
                                    !isLogin &&
                                    <Link to={'/login'} className="text-sm font-medium hover:text-blue-300 transition border-0 w-full text-center">
                                        Login
                                    </Link>
                                }
                                {
                                    isLogin &&
                                    <button onClick={() => handelLogout()} className="text-sm font-medium hover:text-blue-300 transition border-0 w-full text-center">
                                        Logout
                                    </button>
                                }

                            </div>
                        }
                        <Link to={'/signup'} className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold 
                                           px-4 py-2 rounded-full transition border-0 w-full text-center">
                            Sign Up
                        </Link>
                    </div>

                </div>

            }

        </>
    )
}

export default MobileMenu