import React from "react";
import Image from "next/image";
import logo from '../assets/logo_big.png';
import '../../globals.css'
import './footer.css'
import instagram from '../assets/instagram_icon.png'
import pintrest from '../assets/pintester_icon.png'
import whatsapp from '../assets/whatsapp_icon.png'


const Footer = ()=> {
    return (
        <div className="footer">
            <h1><Image
            src={logo}
            alt='logo'
            />SHOPPER</h1>
            <ul className="links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="socials">
                <Image
                src={instagram}
                alt=''
                className="icon"
                />
                <Image
                src={pintrest}
                alt=''
                className="icon"
                />
                <Image
                src={whatsapp}
                alt=''
                className="icon"
                />
            </div>
            <hr />
            <p>Copyright @ 2023 - All Right Reserved</p>
        </div>
    )
}



export default Footer;