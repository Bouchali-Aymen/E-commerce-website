import { Addproduct } from '@/app/components/addproduct/addproduct'
import LeftBar from '@/app/components/LeftBar/LeftBar'
import { ProductsList } from '@/app/components/listproducts/productsList'
import React from 'react'
import './admin.css'



export const Admin = () => {
  return (
    <div className="admin">
        <LeftBar/>
        <Addproduct/>
        <ProductsList/>
    </div>
  )
}


export default Admin;