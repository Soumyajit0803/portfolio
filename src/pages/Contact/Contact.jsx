import React, { useRef } from "react";
import "./Contact.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faHeart } from "@fortawesome/free-solid-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const containerRef = useRef();
    const headRef = useRef();

    const openWeb = (link) => {
        window.open(link, "_blank");
    };

    useGSAP(
        () => {
            // --- 1. Header Animation ---
            const split = new SplitType(headRef.current, { types: "chars" });
            const t = gsap.timeline({
                defaults: { ease: "power3.out" },
                scrollTrigger: {  
                    trigger: containerRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
            });
            
            t.from(split.chars, {
                yPercent: -100,
                rotation: 90,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.5)",
                stagger: { amount: 0.5, from: "random" },
            }).from(".wideline", {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1,
            }).from(".contact-body", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            }).from(".single-contact", {
                y: 50,
                opacity: 0,
                scale: 0.5,
                duration: 0.6,
                stagger: 0.15, // Delay between each icon
                ease: "back.out(1.7)", // Nice "pop" effect
            }).from(".signature", {
                opacity: 0,
                y: 20,
                duration: 1,
                delay: 0.5, // Small delay so it appears last
            });

            return () => split.revert();
        },
        { scope: containerRef }
    );

    return (
        <div id="#5" className="contact-wrap" ref={containerRef}>
            <div className="head-wideline">
                <div className="heading" ref={headRef}>Say hello!</div>
                <div className="wideline"></div>
            </div>
            
            <div className="contact-body">
                Did I sound interesting so far?
                <br />
                Whether you're curious about my work or looking to collaborate on something exciting, I'm always open to new opportunities.
                <br />
                <br />
                Let's connect and create something impactful together!
            </div>

            <div className="contact-list">
                <div className="single-contact">
                    <FontAwesomeIcon
                        className="font-awesome"
                        icon={faLinkedin}
                        size="2x"
                        color="#ffad33"
                        onClick={() => openWeb("https://www.linkedin.com/in/soumyajit-karmakar-68362526b/")}
                    />
                </div>

                <div className="single-contact">
                    <FontAwesomeIcon
                        className="font-awesome"
                        icon={faEnvelope}
                        size="2x"
                        color="#ffad33"
                        onClick={() => openWeb("mailto:sona832004@gmail.com")}
                    />
                </div>

                <div className="single-contact">
                    <FontAwesomeIcon
                        className="font-awesome"
                        icon={faGithub}
                        size="2x"
                        color="#ffad33"
                        onClick={() => openWeb("https://github.com/Soumyajit0803")}
                    />
                </div>
            </div>
            <p className="signature">Made with {<FontAwesomeIcon icon={faHeart} color="#ffad33" />} by <i>Soumyajit</i>.</p>
        </div>
    );
};

export default Contact;