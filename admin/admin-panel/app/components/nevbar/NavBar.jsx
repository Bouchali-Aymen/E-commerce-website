'use client'
import React from "react"
import './navbar.css'
import logo from '../../../assets/logo.png'
import Image from 'next/image'
import '../../globals.css'
import profile_image from '../../../assets/profile.jpg'
import dropdown from '../../../assets/dropdown_icon.png'



const NavBar = () =>{



    return(
       
        <div className="navbar">
            <div className="container">
                <div className="logo">
                <Image
                src={logo}
                alt = 'logo'
                className="logo-image"
                priority={true}
                />
                <h1>SHOPPER<span>Admin Panel</span></h1>
                </div>
                <div className="profile">
                    <div className="image">
                        <Image 
                        src={profile_image}
                        alt="profile"
                        className="profile-image"
                        />
                    </div>
                    <Image 
                    src={dropdown}
                    alt="dropdown"
                    />
                </div>
                </div>
            </div>
    )
}

export default NavBar;