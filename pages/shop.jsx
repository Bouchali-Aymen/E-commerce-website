import React, { useContext } from "react"
import Landing from "@/app/component/landing/landing";
import Popular from "@/app/component/popular/popular";
import Exclusive_Offers from "@/app/component/exclusive/exclusive";
import New_Collection from "@/app/component/new_collection/new_collection";
import NewsLetter from "@/app/component/newsletter/newsletter";
import { ShopContext, ShopContextProvider } from "@/app/component/Context/ShopContext";




const Shop = () => {

    
    return (
        <ShopContextProvider>
            <div>
            <Landing/>
            <Popular/>
            <Exclusive_Offers/>
            <New_Collection/>
            <NewsLetter/>
            </div>
        </ShopContextProvider>
        
    )
}


export default Shop;