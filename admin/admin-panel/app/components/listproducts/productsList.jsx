'use client'


import React, { useEffect, useState } from 'react'
import './productlist.css'
import Image from 'next/image'
import noimage from '../../../assets/Admin Panel Assets/noimage.jpg'
import remove_image from '../../../assets/cart_cross_icon.png'






export const ProductsList = () => {


  const [products,setProducts] = useState([]);
  const [remove, setRemove] = useState(false);
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:4000/getProducts', {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data);
        console.log(data)
      } else {
        console.error('Failed to fetch products:', response.status);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };


  useEffect(() => {
   
    fetchData();
  }, []); // Make sure to pass an empty dependency array to run the effect only once on mount.


  const removeProduct = async (id) => {
    try {
      const response = await fetch('http://localhost:4000/removeProduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Send the ID in the expected format
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        await fetchData();
        // Handle the data as needed
      } else {
        console.error('Failed to remove product:', response.status);
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };


  return (
    <div className="productlist">
      <h1>All Products List</h1>
      <div className="content">
            <div className="head">
                    <p>Product</p>
                    <p>Title</p>
                    <p>Old Price</p>
                    <p>New Price</p>
                    <p>Category</p>
                    <p>Remove</p>
            </div>
            
            <div>
                {
                    products.map((e)=>{
                            return <div className="box" key={e.id}>
                                <div className="product">
                                <Image
                                src={e.image}
                                alt=""
                                width={80}
                                height={100}
                                />
                                </div>
                                <p>{e.name}</p>
                                <p  style={{"marginLeft":5}}>{e.old_price} $</p>
                                <p>{e.new_price}$</p>
                                <p>{e.category}</p>
                                <Image
                                src={remove_image}
                                alt=""
                                onClick={()=>{
                                  
                                  if(confirm('are you sure you want to delete this product ?')==true ){
                                    removeProduct(e.id)
                                  }
                                }}
                                style={{cursor:"pointer"}}
                                />
                            </div>
                        
                    })
                }
            </div>
            </div>
    </div>
  )
}
