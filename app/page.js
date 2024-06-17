'use client'
import NavBar from './component/navBar/navbar'
import styles from './page.module.css'
import Shop from '@/pages/shop'
import Footer from './component/footer/footer'
import { useContext } from 'react'
import { ShopContext,ShopContextProvider } from './component/Context/ShopContext'




export default function Home() {
  
  return (
    
      <main className={styles.main}>
        
      <Shop/>
    </main>
   
   
  )
}
