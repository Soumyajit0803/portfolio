import React, { useRef } from "react";
import "./Experience.css";
import { Educard } from "../Education/Education";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
    const containerRef = useRef();
    const headRef = useRef();

    useGSAP(
        () => {
            // --- 1. Header Animation (Independent) ---
            const split = new SplitType(headRef.current, { types: "chars" });
            
            // Header Text
            gsap.from(split.chars, {
                yPercent: -100,
                rotation: 90,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.5)",
                stagger: { amount: 0.5, from: "random" },
                scrollTrigger: {
                    trigger: headRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            // Wideline
            gsap.from(".wideline", {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1,
                scrollTrigger: {
                    trigger: ".wideline",
                    start: "top 85%",
                    toggleActions: "play none none none"
                }
            });

            // --- 2. Card Animations (Independent per card) ---
            const cards = gsap.utils.toArray(".card-wrapper");
            
            cards.forEach((card) => {
                gsap.from(card, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card, // Each card watches itself
                        start: "top 85%", 
                        toggleActions: "play none none none"
                    }
                });
            });

            // --- 3. Bullet Animations (Independent per bullet list) ---
            // This finds all bullet lists and animates their items when the list comes into view
            const bulletLists = gsap.utils.toArray(".bullets menu");
            
            bulletLists.forEach((list) => {
                // Find the li items *inside* this specific list
                const items = list.querySelectorAll("li");
                
                gsap.from(items, {
                    x: -15,
                    opacity: 0,
                    duration: 0.5,
                    stagger: 0.1, // Stagger strictly within this specific list
                    scrollTrigger: {
                        trigger: list, // Trigger when the list container is visible
                        start: "top 90%",
                        toggleActions: "play none none none"
                    }
                });
            });

            return () => split.revert();
        },
        { scope: containerRef }
    );

    return (
        <div
            id="#3"
            className="content"
            ref={containerRef}
            style={{
                padding: "3rem 0",
            }}
        >
            <div className="head-wideline">
                <div className="heading" ref={headRef}>Experience</div>
                <div className="wideline"></div>
            </div>
            <div className="exp-data">
                <Educard
                    data={{
                        degree: "CodeIIEST x GDG IIEST",
                        projects: [
                            { project: "Webgame Challenge", duration: "Nov 2024" },
                            { project: "Winter of opensource", duration: "Dec 2024" },
                            { project: "CodeIIEST website", duration: "Feb 2024" },
                        ],
                        bullets: [
                            "Core member of CodeIIEST and development lead of GDG IIEST.",
                            "Organiser and Judging panel for Webgame Challenge and Winter of Opensource.",
                            "Collaborated and supervised the design and development of the official website of CodeIIEST- the coding club of IIEST Shibpur.",
                        ],
                    }}
                />
                <Educard
                    data={{
                        degree: "Rebeca",
                        projects: [
                            { project: "Main site (Design + dev)", duration: "Mar 2024" },
                            { project: "Admin panel (Dev)", duration: "Feb 2025" },
                        ],
                        bullets: [
                            "Designed and developed the website of Rebeca- the annual cultural fest of IIEST Shibpur.",
                            "Contributed to both frontend and backend code, along with developing an admin panel for organisers to handle data regarding their events.",
                        ],
                    }}
                />
                <Educard
                    data={{
                        degree: "Instruo",
                        projects: [
                            { project: "Main site (Design + dev)", duration: "Dec 2024" },
                        ],
                        bullets: [
                            "Organiser and Judging panel for Hacknovare- an inter-college hackathon.",
                            "Speaheaded the design and development of Instruo's official website.",
                        ],
                    }}
                />
            </div>
        </div>
    );
};

export default Experience;