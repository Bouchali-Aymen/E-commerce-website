import React from 'react'
import './related.css'
import '../../globals.css'
import Item from '../items/item'
import {ShopContext, ShopContextProvider} from '../Context/ShopContext'
import { useContext } from "react";


export const Related_Products = ({category,current_product}) => {
    const {all_product} = useContext(ShopContext);
    const categoryItems = all_product.filter(item => item.category === category && item.id!==current_product);
  
  return (
    <ShopContextProvider>
  <div className='related_products'>
        <div className="container">
        {
        categoryItems.slice(0,4).map((item,i)=>{
                    if(item.category===category && item.id!==current_product){
                        return <Item key={i} id={item.id} name={item.name} image_src={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    }
                    else return null
                })}
        </div>
    </div>
    </ShopContextProvider>
  )
}
