'use client'

import React, { useState, useEffect } from 'react';
import './leftbar.css';
import add_product_icon from '../../../assets/Admin Panel Assets/Product_Cart.svg';
import Image from 'next/image';
import products_list from '../../../assets/Admin Panel Assets/Product_list_icon.svg';
import '../addproduct/addproduct.css';
import '../listproducts/productlist.css';




export const LeftBar = () => {



const [addprod, setAddProd] = useState(null);
const [listprod, setListProd] = useState(null);

useEffect(() => {
    setAddProd(document.querySelector('.addproduct'));
    setListProd(document.querySelector('.productlist'));
  }, []); // This effect runs once when the component mounts

return (
    <div className="leftbar">
    <ul>
        
        <li
            onClick={() => {
            if (listprod) listprod.style.display = 'none';
            if (addprod) addprod.style.display = 'block';
            }}
        >
            <Image src={add_product_icon} alt="add product" />
            Add Products
        </li>
        
        <li
            onClick={() => {
            if (listprod) listprod.style.display = 'block';
            if (addprod) addprod.style.display = 'none';
            }}
        >
            <Image src={products_list} alt="add product" />
            Products List
        </li>
    </ul>
    </div>
);
};

export default LeftBar;