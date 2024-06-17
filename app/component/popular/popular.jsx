import React from "react";
import Item from "../items/item";
import '../../globals.css'
import './popular.css'
import data_product from "../assets/data";



const Popular = () => {
    return (
        <div className="popular">
            <h1 className="special-heading">POPULAR IN WOMEN</h1>
            <div className="container">
                {data_product.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image_src={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
        </div>
    )
}


export default Popular;