'use client'


import React,{createContext, useState} from "react";
import all_product from "../assets/all_product";



const ShopContext = createContext(null);
const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index< all_product.length+1; index++) {
    cart[index] = 0;
    }
    return cart;
}
const ShopContextProvider = ({children}) =>{

    const [cartItems,setCartItems] = useState(getDefaultCart());
    const [token,setToken] = useState("");
    const [cartItemsNumber,setCartNumber] = useState(0);

    const addToCart = (itemId) => {
        setCartItems((prev) => {
        const updatedCart = { ...prev, [itemId]: prev[itemId] + 1 };
        if(localStorage.getItem('token')){
            fetch('http://localhost:4000/addToCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({itemid:itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data)
                getCartProductsNumber();
            })
            .catch((error)=>console.log(error))
        }
        return updatedCart;
        });
      };



    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
        if(localStorage.getItem('token')){
            fetch('http://localhost:4000/removeFromCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({itemid:itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data)
                getCartProductsNumber();
            })
            .catch((error)=>console.log(error))
        }
    }

 


    const getTotalCartAmount = () => {
        let CartItems;
        if(localStorage.getItem('token')){
            fetch('http://localhost:4000/getCartData',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('token')}`,
                    'Content-Type':'application/json',
                },
                
            })
            .then((response)=>response.json())
            .then((data)=>CartItems = data)
            .catch((error)=>console.log(error))
        }
        let total = 0;
        for(const item in CartItems){
            if(CartItems[item]>0){
                let iteminfo = all_product.find((e)=>e.id===Number(item));
                total = total+iteminfo.new_price*CartItems[item];
            }
        }
        return total;
    }

    const getCartProductsNumber = async () => {
        if (localStorage.getItem('token')) {
            try {
                const response = await fetch('http://localhost:4000/numberOfProductsInCart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        'auth-token': `${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                const data = await response.json();
                console.log(data);
                setCartNumber(data);
            } catch (error) {
                console.log(error);
            }
        }
        return 0; // Return a default value if the request fails or there's no token
    };

    

    const contextValue = {all_product,cartItems,cartItemsNumber,addToCart,removeFromCart,getTotalCartAmount,getCartProductsNumber};

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    )
}


export  {ShopContext,ShopContextProvider};