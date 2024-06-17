import React from 'react'
import './popup.css'
import Image from 'next/image'
import check from '../assets/check.png'
import remove from '../assets/cart_cross_icon.png'

export const PopUp = () => {
  return (
    <div className='popup'>
      <div className="close">
      <Image
      src={remove}
      alt=""
      className='remove'
      onClick={()=>{
        let popup = document.querySelector('.popup');
        popup.style.display = "none";
      }}
      />
      </div>
      
      <Image
      src={check}
      alt=""
      className='check'
      />
      <p>Registration Completed</p>
    </div>
  )
}
