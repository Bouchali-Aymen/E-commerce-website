import '../app/component/layout'
import NavBar from "@/app/component/navBar/navbar";
import React, { useContext } from "react";
import '../app/globals.css'
import './css/shop_category.css'
import {ShopContext, ShopContextProvider} from '../app/component/Context/ShopContext'
import { useRouter } from "next/router";
import men_banner from '../app/component/assets/banner_mens.png'
import women_banner from '../app/component/assets/banner_women.png'
import kids_banner from '../app/component/assets/banner_kids.png'
import Footer from '@/app/component/footer/footer';
import Image from 'next/image';
import down_arrow from '../app/component/assets/dropdown_icon.png'
import Item from '@/app/component/items/item';
import { useState, useEffect } from 'react';







const ShopCategory = () => {
    const router = useRouter();
    const {categoryname} = router.query;
    //const {all_product} = useContext(ShopContext);
    const [products, setProducts] = useState([]);
    
    

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/getProducts', {
          method: 'GET',
        });
  
        if (response.ok) {
        const data = await response.json();
        console.log(data);
        setProducts(data);
        console.log(products);
        } else {
          console.error('Failed to fetch products:', response.status);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
  
    useEffect(() => {

      fetchData();
    }, []);

    useEffect(() => {
        console.log('Updated products:', products);
      }, [products]);
    

    return (
        
        <div className="shop_category">
            
            <div className="container">
                <div className="banner">
                    <Image
                    src={
                        categoryname==='men'?
                        men_banner
                        :
                        categoryname==='women'?
                        women_banner
                        :
                        kids_banner
                    }
                    alt=''
                    className='banner_image'
                    />
                </div>
                <div className="filter">
                    <p><span>Showing 1-12</span> out of 54 Products</p>
                    <button className='sort'>Sort by<Image
                    src={down_arrow}
                    alt=''
                    /></button>
                </div>
                <div className="products">
                { products.map((item,i)=>{
                    item.category = (item.category).charAt(0).toLowerCase()+item.category.slice(1);
                    if(item.category===categoryname){
                        return <Item key={i} id={item.id} name={item.name} image_src={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    }
                    else return null
                })}
                <button>Explore More</button>
                </div>
            </div>
            <Footer/>
        </div>
    )
}


export default ShopCategory;