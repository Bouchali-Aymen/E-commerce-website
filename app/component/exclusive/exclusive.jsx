import React from "react";
import '../../globals.css';
import './exclusive.css'
import exclusive_image from '../assets/exclusive_image.png'
import Image from "next/image";


const Exclusive_Offers = () => {
    return (
        <div className="exclusive">
            <div className="container">
                <div className="info">
                <h1>Exclusive</h1>
                <h1>Offers For You</h1>
                <p>ONLY ON BEST SELLERS PRODUCTS</p>
                <button>Check now</button>
                </div>
                <div className="image">
                    <Image
                    src={exclusive_image}
                    alt=''
                    className="exclusive_image"
                    width={280}
                    />
                </div>
            </div>
        </div>
    )
}


export default Exclusive_Offers