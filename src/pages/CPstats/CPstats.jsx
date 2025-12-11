import { React, useEffect, useState, useRef } from "react";
import CountUp from "react-countup";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import "./CPstats.css";

const Leetcode = {
    platform: "LEETCODE",
    highlightNumber: 1808,
    highlightLabel: "Highest Rating",
    extra: {
        left: "Top",
        number: 7,
        start: 99,
        right: "% Users.",
    },
    link: "https://leetcode.com/_Soumyajit_83/",
};
const Codechef = {
    platform: "CODECHEF",
    highlightNumber: 1641,
    highlightLabel: "Highest Rating",
    extra: {
        left: "Best rank",
        number: 142,
        start: 3231,
        right: " /3231",
    },
    link: "https://www.codechef.com/users/s0umyajit",
};

const Codeforces = {
    platform: "CODEFORCES",
    highlightNumber: 1452,
    highlightLabel: "Highest Rating",
    extra: {
        left: "",
        number: 402,
        start: 0,
        right: " Problems solved",
    },
    link: "https://codeforces.com/profile/CF_Soumyajit",
};

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const CPstats = () => {
    // Dummy data handling (assuming these are passed or imported in your real file)
    // You can remove these if you are importing them from a data file.
    const Leetcode = { platform: "LeetCode", link: "#", highlightNumber: 500, highlightLabel: "Solved", extra: { left: "Top", start: 0, number: 15, right: "%" } };
    const Codechef = { platform: "CodeChef", link: "#", highlightNumber: 1400, highlightLabel: "Rating", extra: { left: "Max", start: 0, number: 1600, right: "" } };
    const Codeforces = { platform: "Codeforces", link: "#", highlightNumber: 800, highlightLabel: "Rating", extra: { left: "Max", start: 0, number: 1200, right: "" } };

    const containerRef = useRef();
    const headRef = useRef();

    useGSAP(
        () => {
            const split = new SplitType(headRef.current, { types: "chars" });

            const tl = gsap.timeline({
                defaults: { ease: "power3.out" },
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none"
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
            }, "-=0.5")
            // Stagger the CP Cards
            .from(".cp-card-wrap", {
                y: 60,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2, // 0.2s delay between each card
                ease: "power2.out"
            }, "-=0.5");

            return () => split.revert();
        },
        { scope: containerRef }
    );

    return (
        <div id="#2" className="content" ref={containerRef} style={{ padding: "3rem 0" }}>
            <div className="head-wideline">
                <div className="heading" ref={headRef}>CP Stats</div>
                <div className="wideline"></div>
            </div>
            <div className="cp-cards">
                <CPcard data={Leetcode} />
                <CPcard data={Codechef} />
                <CPcard data={Codeforces} />
            </div>
        </div>
    );
};

const CPcard = ({ data }) => {
    const openWeb = () => {
        window.open(data.link, "_blank");
    };

    return (
        <div onClick={openWeb} className="cp-card-wrap">
            <div className="cp-card-head">
                {/* Ensure your assets path is correct */}
                <img src={`/assets/${data.platform.toLowerCase()}.svg`} alt={data.platform} />
                <div>{data.platform}</div>
            </div>
            <div className="cp-card-stat">
                <div className="cp-number">
                    <CountUpOnVisible end={data.highlightNumber} />
                </div>
                <div className="cp-label">{data.highlightLabel}</div>
            </div>
            <div className="cp-more">
                {data.extra.left}
                <span>
                    <CountUpOnVisible start={data.extra.start} end={data.extra.number} />
                </span>
                {data.extra.right}
            </div>
        </div>
    );
};

// Kept your existing CountUp logic mostly identical, 
// just ensured the refs are safe.
const CountUpOnVisible = ({ start = 0, end }) => {
    const [isVisible, setIsVisible] = useState(false);
    const countUpRef = useRef(null);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5, 
        };

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (countUpRef.current) {
            observer.observe(countUpRef.current);
        }

        return () => {
            if (countUpRef.current) {
                observer.unobserve(countUpRef.current);
            }
        };
    }, []);

    // Using a span usually aligns better with text than a div
    return <span ref={countUpRef}>{isVisible && <CountUp separator="" start={start} end={end} duration={2.5} />}</span>;
};

export default CPstats;
