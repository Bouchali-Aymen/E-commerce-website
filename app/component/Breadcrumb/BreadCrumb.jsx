import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import './breadcrumb.css'
import  arrow_image  from '../assets/breadcrum_arrow.png';
import Image from 'next/image';



export const BreadCrumb = ({ product }) => {
  return (
    <div className='breadcrumb'>
      HOME&nbsp;
      <Image
      src={arrow_image}
      alt=""
      />&nbsp;
      SHOP&nbsp;
      <Image
      src={arrow_image}
      alt=""
      />&nbsp;
      {product ? product.category : ""}&nbsp;
      <Image
      src={arrow_image}
      alt=""
      />&nbsp;
      {product ? product.name : ""}
    </div>
  )
}
