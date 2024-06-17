import React from "react";
import hero_image from '../assets/hero_image.png'
import Image from "next/image";
import './landig_style.css'
import hand_icon from '../assets/hand_icon.png'
import arrow from '../assets/arrow.png'
const Landing = () => {
    return(
        <div className="landing">
            <div className="container">
            <div className="info">
                <p>NEW ARRIVALS ONLY</p>
                <h1>new<Image 
                src={hand_icon}
                alt="hand_icon"
                width={50}
                /><br/>collections<br/>for everyone</h1>
                <button>Latest Collection<Image
                src={arrow}
                alt="arrow"
                /></button>
            </div>
            <div className="image">
                <Image
                src={hero_image}
                alt="hero image"
                className="hero_image"
                width={400}
                />
            </div>
            </div>
            
        </div>
    )
}

export default Landing;