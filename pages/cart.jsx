'use client'

import { CartItems } from "@/app/component/CartItems/CartItems";
import NavBar from "@/app/component/navBar/navbar";
import React from "react";



const Cart = () =>{


    return(
       
        <div>
            <div className="container">
            <CartItems/>
            </div>
        </div>
    )
}

export default Cart;