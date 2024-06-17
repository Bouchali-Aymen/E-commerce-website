import React from "react";
import '../../globals.css'
import './newsletter.css'


const NewsLetter = () => {
    return (
        <div className="newsletter">
            <div className="container">
                <h1>Get Exclusive Offers On Your Email</h1>
                <p>Subscribe to our newsletter and stay updated</p>
                <form action="">
                    <input type="email" placeholder="Your email id"/>
                    <input type="submit" value="Subscribe" />
                </form>
            </div>
        </div>
    )
}




export default NewsLetter;