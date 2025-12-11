import React, { useState, useEffect, useRef } from "react";
import "./Homepage.css";
import gsap from "gsap";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";

const Homepage = () => {
    // 1. Create a reference for the container and the text element
    const container = useRef();
    const nameRef = useRef();

    useGSAP(() => {
        // 2. Perform the split INSIDE the hook, where the DOM is guaranteed to exist
        const split = new SplitType(nameRef.current, { types: "chars" });

        // 3. Animate the split characters
        gsap.from(split.chars, {
            yPercent: -100,
            rotation: 30,
            opacity: 0,
            duration: 1.5,
            ease: "back.out(1.5)",
            stagger: {
                amount: 0.5,
                from: "random",
            },
        });

        // Optional: Revert the split when component unmounts to keep DOM clean
        return () => split.revert();
        
    }, { scope: container }); // Scope ensures GSAP selectors only look inside this component

    return (
        <div className="page-wrap" ref={container}>
            <div className="content">
                <img
                    src="/assets/favicon.png"
                    width={25}
                    style={{ margin: "1rem 0" }}
                    alt="Logo"
                />
                <div className="head-wideline">
                    <div className="salutation">Hi, I'm</div>
                    <div className="wideline right-to-left"></div>
                </div>

                {/* Attach the ref here so SplitType can find it */}
                <div className="name" ref={nameRef}>Soumyajit</div>

                <div className="hobby">
                    I am a <Dynamic />
                </div>
                <div className="about">
                    Crafting elegant digital realms by day,
                    <br /> grinding algorithms by night
                </div>
            </div>
        </div>
    );
};

const Dynamic = () => {
    const [holder, setHolder] = useState(0);
    const [index, setIndex] = useState(0);
    let values = ["UI/UX Designer", "Web developer", "CP enthusiast", "Skillful artist"];
    const [typedText, setTypedText] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            if (index < values[holder].length) {
                setTypedText((prevTypedText) => prevTypedText + values[holder][index]);

                setIndex(index + 1);
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    setTypedText("");
                    setIndex(0);
                    setHolder((holder) => (holder + 1) % values.length);
                }, 2000); // Delay before starting typing the next string
            }
        }, 100); // Typing speed (adjust as needed)
        return () => clearInterval(interval);
    }, [holder, values]);

    return <div className="dynamic">{typedText}</div>;
};

export default Homepage;
