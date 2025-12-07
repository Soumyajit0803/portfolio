import { React, useRef, useEffect } from "react";
import Header from "./components/header/Header";
import Homepage from "./pages/homepage/Homepage";
import About from "./pages/About/About";
import Education from "./pages/Education/Education";
import Experience from "./pages/Experience/Experience";
import Projects from "./pages/Projects/Projects";
import Contact from "./pages/Contact/Contact";
import Techstack from "./pages/Techstack/Techstack";
import CPstats from "./pages/CPstats/CPstats";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";
import SmoothScroll from "./SmoothScroll";

const App = () => {
    const observer = useRef(null);
    const bullets = useRef(null);
    const descend = useRef(null);

    useEffect(() => {
        // Initialize IntersectionObserver when the component mounts
        observer.current = new IntersectionObserver(slider, { threshold: 0.5 });
        bullets.current = new IntersectionObserver(bulletSlider, { threshold: 0.5 });
        descend.current = new IntersectionObserver(descendSlider, { threshold: 0.5 });

        // Fetching all boxes and setting them on observe by the observer object
        const boxes = document.querySelectorAll(".hiderx");
        boxes.forEach((box) => {
            observer.current.observe(box);
        });
        const bulletBoxes = document.querySelectorAll(".right-to-left");
        bulletBoxes.forEach((box) => {
            bullets.current.observe(box);
        });
        const descendBoxes = document.querySelectorAll(".left-to-right");
        descendBoxes.forEach((box) => {
            descend.current.observe(box);
        });

        // Cleanup function to disconnect the observer when the component unmounts
        return () => {
            observer.current.disconnect();
            bullets.current.disconnect();
            descend.current.disconnect();
        };
    }, []);
    const slider = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("shower");
                // console.log("Fire the animation!");
            }
        });
    };
    const bulletSlider = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("bulletshow");
                // console.log("Fire the animation!");
            }
        });
    };
    const descendSlider = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("descend-show");
                // console.log("Fire the animation!");
            }
        });
    };

    return (
        <SmoothScroll>
            <div className="website">
                <Header />
                <div className="design left">
                    <div className="element e1"></div>
                    <div className="element e2"></div>
                    <div className="element e3"></div>
                    <div className="element e4"></div>
                    <div className="element e5"></div>
                </div>
                <div className="design right">
                    <div className="element e1"></div>
                    <div className="element e2"></div>
                    <div className="element e3"></div>
                    <div className="element e4"></div>
                    <div className="element e5"></div>
                </div>
                <Homepage />
                <About />
                <Education />
                <CPstats />
                {/* <Techstack /> */}
                <Experience />
                <Projects />
                <Contact />
                <Analytics />
            </div>
        </SmoothScroll>
    );
};

export default App;
