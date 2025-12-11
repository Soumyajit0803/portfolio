import { React, useRef } from "react";
import "./Education.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

const School = {
    degree: "Higher Secondary",
    institution: "Kendriya Vidyalaya Barrackpore (ARMY)",
    branch: "Computer Science",
    duration: "March 2022",
    bullets: [
        "Participated in many Sit-and-Drawing Competitions.",
        "Ranked #1 in my school, in both 10th and 12th CBSE Board Examinations.",
    ],
};
const College = {
    degree: "Bachelor of Technology",
    institution: "IIEST, Shibpur",
    branch: "Information Technology",
    duration: "2022-26",
    bullets: [
        "Participated in many drawing, coding and design contests.",
        "Actively led the building of various college websites related to clubs, department and events.",
        "Collaborated in building website for CP-DSA bootcamp held by our college.",
        "Mentoring batchmates in the web development bootcamp held by our college.",
        "Actively collaborating in design and development of the website for CodeIIEST",
    ],
};

gsap.registerPlugin(ScrollTrigger);

const Education = () => {
    const eduContainer = useRef();
    const headRef = useRef();

    useGSAP(
        () => {
            const split = new SplitType(headRef.current, { types: "chars" });

            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                scrollTrigger: {
                    trigger: eduContainer.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none" // Changed to reverse so it fades out when scrolling up
                },
            });

            tl.from(split.chars, {
                yPercent: -100,
                rotation: 90,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.5)",
                stagger: { amount: 0.5, from: "random" },
            })
            .from(".wideline", {
                scaleX: 0,
                transformOrigin: "left center",
                duration: 1,
            }, "-=0.5") // overlap slightly with text
            
            // 1. Animate the Cards Container (Cards slide up)
            .from(".card-wrapper", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2, // Delay between School card and College card
            }, "-=0.5") 

            // 2. Animate the Headlines inside the cards (Degree, Institution)
            .from(".headlines > div", {
                y: 20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
            }, "-=0.5")

            // 3. Animate the Bullets (Cascade effect)
            .from(".single-bullet", {
                x: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.05, // Fast ripple effect down the list
            }, "-=0.5");

            // CLEANUP: Essential for SplitType in React
            return () => split.revert();
        },
        { scope: eduContainer }
    );

    return (
        <div id="#1" className="edu-content" ref={eduContainer}>
            <div className="head-wideline">
                <div className="heading" ref={headRef}>
                    Education
                </div>
                <div className="wideline"></div>
            </div>
            <div className="all-cards">
                <Educard data={School} />
                <Educard data={College} />
            </div>
        </div>
    );
};

export const Educard = ({ data }) => {
    return (
        <div className="card-wrapper">
            <div className="card-header">
                <div className="headlines">
                    <div className="degree">{data.degree}</div>
                    <div className="institution">{data.institution}</div>
                    {data.projects ? (
                        data.projects.map((p, i) => (
                            <div className="byline-info" key={i}>
                                <div>{p.project}</div>
                                <div>{p.duration}</div>
                            </div>
                        ))
                    ) : (
                        <div className="byline-info">
                            <div>{data.branch}</div>
                            <div>{data.duration}</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="bullets">
                <menu>
                    {data.bullets?.map((value, index) => {
                        return (
                            // Removed inline style animationDelay, GSAP handles it now
                            <li key={index} className="single-bullet">
                                {value}
                            </li>
                        );
                    })}
                </menu>
            </div>
        </div>
    );
};

export default Education;