import React, { useState,useEffect } from "react";

import Item from "../items/item";
import '../../globals.css'
import './new_collection.css'





const New_Collection = () => {

    const [new_collections,setCollection] = useState([]);



    const NewCollection = async() =>{
        try {
            const response = await fetch('http://localhost:4000/getNewCollection', {
            method: 'GET',
            });
    
            if (response.ok) {
            const data = await response.json();
            console.log(data);
            setCollection(data);
            } else {
            console.error('Failed to fetch products:', response.status);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    
    }

    useEffect(()=>{
        NewCollection();
    },[])



    return (
        <div className="collection">
            <h1 className="special-heading">NEW COLLECTION</h1>
            <div className="container">
            {new_collections.map((item,i)=>{
                    return <Item key={i} id={item.id} name={item.name} image_src={item.image} new_price={item.new_price} old_price={item.old_price}/>
                })}
            </div>
        </div>
    )
}



export default New_Collection