import React, { useEffect } from 'react'
import About from '../components/About'
import Features from '../components/Features';
import HomeHero from '../components/HomeHero';

const Home = ({ scrollTo }) => {


    useEffect(() => {
        if (scrollTo) {
            const section = document.getElementById(scrollTo);
            if (section) 
                section.scrollIntoView({ behavior: "smooth", block: "center", });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [scrollTo]);


    return (
        <>
            <HomeHero />
            <div id="about">
                <About />
            </div>
            <div id="features">
                <Features />
            </div>
        </>
    )
}

export default Home