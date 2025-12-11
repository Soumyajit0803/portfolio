import React, { useRef } from "react";
import "./About.css";
import AboutStamp from "../../assets/about-stamp.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const aboutContainer = useRef();
    const headRef = useRef();
    useGSAP(
        () => {
            const split = new SplitType(headRef.current, { types: "chars" });

            const t = gsap.timeline({
                defaults: { ease: "power3.out" },
                scrollTrigger: {
                    trigger: aboutContainer.current,
                    start: "top 80%", // when top of section hits 80% of viewport
                    triggerActions: "play none restart none",
                },
            });

            t.
                from(split.chars, {
                    yPercent: -100,
                    rotation: 90,
                    opacity: 0,
                    duration: 1,
                    ease: "back.out(1.5)",
                    stagger: {
                        amount: 0.5,
                        from: "random",
                    },
                })
                .from(".wideline", {
                    scaleX: 0,
                    transformOrigin: "left center",
                    duration: 1,
                })
                .from(".typography div", {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                })
                .from(".typography img", {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    transform: "rotate(10deg)",
                })
            ;

            // Optional: Revert the split when component unmounts to keep DOM clean
            return () => split.revert();
        },
        { scope: aboutContainer }
    );
    return (
        <div id="#0" className="about-content" ref={aboutContainer}>
            <div className="head-wideline">
                <div className="heading" ref={headRef}>About Me</div>
                <div className="wideline"></div>
            </div>
            <div className="typography">
                <div>
                    <p>Welcome to my corner of the Internet!</p>
                    <br />
                    I'm Soumyajit Karmakar, a passionate college student with a zest for creativity and problem-solving.
                    My journey through academia has been an exhilarating exploration of various fields, but my heart
                    lies at the intersection of web development, design and competitive programming.
                    <br />
                    <br />
                    With a strong foundation in the MERN stack, I thrive on building dynamic web apps that blend
                    functionality with aesthetics. For design I consider Figma as my digital canvas, crafting many
                    elegant website UIs. Apart from development, I love to take part in CP contests on various online
                    platforms.
                    <br />
                    <br />
                    Scroll down to learn more about me!
                </div>
                <img
                    src={AboutStamp}
                    style={{
                        padding: "1rem",
                        width: "100%",
                        height: "100%",
                    }}
                />
            </div>
        </div>
    );
};

export default About;
