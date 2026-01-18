import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import MobileMenu from './MobileMenu';


const MobileNavbar = () => {


    const [menuOpen, setMenuOpen] = useState(true)


    const clickToScroll = (section) => {
        if (section == 'home') {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            const to = document.getElementById(section);
            if (to) {
                to.scrollIntoView({ behavior: "smooth", block: "center", });
            }
        }
    }



    const handleMenuOpen = () => {

    }






    return (
        <>

            <section className="flex md:hidden items-center justify-between px-4 py-3 
                    bg-gradient-to-r from-[#0a3cff] via-[#0e2b90] to-[#050f3c]
                    text-white shadow-lg rounded-xl mx-auto mt-4 w-[95%] max-w-7xl z-50 relative">

                <Link to={'/'} onClick={() => { clickToScroll('home'); setMenuOpen(true) }} className="flex items-center gap-2">
                    <img src="../src/assets/react.svg" alt="logo" className="w-8 h-8  lg:block" />
                    <h1 className="font-semibold text-lg">PLANSMART</h1>
                </Link>



                {
                    menuOpen ? <HiMenuAlt3 onClick={() => { setMenuOpen(!menuOpen) }} className='text-3xl' /> : <IoClose onClick={() => { setMenuOpen(!menuOpen) }} className='text-3xl' />
                }


                <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />



            </section>


        </>
    )
}

export default MobileNavbar