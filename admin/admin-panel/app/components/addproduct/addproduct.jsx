'use client'
import React, { useState } from 'react'
import upload from '../../../assets/Admin Panel Assets/upload_area.svg'
import Image from 'next/image'
import './addproduct.css'
import OpenAI from 'openai'
import { NextResponse } from 'next/server'




export const Addproduct = () => {



  const [image, setImage] = useState(false);



  const [product, setProduct] = useState({
    name: '',
    old_price:0,
    new_price:0,
    category:'Women',
    image:''
  })





  const ImageHandler = (e) => {
    setImage(e.target.files[0]);
  }

  
  const handleChange = (e) => {
    const {name,value} = e.target;

    setProduct({
        ...product,
        [name]:value
    })
    console.log(product);
}


  const formData = new FormData();
  formData.append('product', image);


  const handlesubmit = async() => {
    event.preventDefault();
    try{
      const response = await fetch('http://localhost:4000/upload',{
        method:'POST',
        body: formData
      })
      if(response.ok){
        const result = await response.json();
        console.log(result);
        product.image=result.image_url;
      }

      const {name,old_price,new_price,category,image} = product;



      if(name && old_price && new_price && image){
        const productadded = await fetch('http://localhost:4000/addProduct',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(product)
        });
        if(productadded.ok){
          console.log(productadded);
          alert('product has been added succesfully');
          document.getElementById("productform").reset();
          
        }
        else{
          console.log('failed to add product, somthing went wrong')
          alert('failed to add product, somthing went wrong')
        }
      }
      else{
        alert("All fields are required");
      }
    }
    catch(e){
      console.log(e);
    }
  }
   

  return (
    <div className="addproduct">
        <form action="" onSubmit={handlesubmit} id='productform'>
            <label htmlFor="name">Product title</label>
            <input type="text" name='name' placeholder='Type here' value={product.name} onChange={handleChange}/>
            <div className="price">
                
                <div className="prix">
                <label htmlFor="old_price">Price</label>
                <input type="number" name="old_price" id="" placeholder='Type here' value={product.old_price} onChange={handleChange}/>
                </div>
                <div className="offer">
                <label htmlFor="new_price">Offer Price</label>
                <input type="number" name='new_price' placeholder='Type here' value={product.new_price} onChange={handleChange}/>
                </div>

            </div>
            <label htmlFor="category">Product category</label>
            <select name='category' value={product.category} onChange={handleChange}>
                <option value="Women">Women</option>
                <option value="Men" >Men</option>
                <option value="Kids" >Kids</option>
            </select>
            <label htmlFor="images" style={{cursor:'pointer'}}> <Image
            src={image?URL.createObjectURL(image):upload}
            alt="upload"
            width={100}
            height={100}
            />
            </label>
           
            <input onChange={ImageHandler} type="file" name="images" id="images" accept='image/*' hidden/>
            <input type="submit" value="ADD" />
        </form>
    </div>
  )
}
