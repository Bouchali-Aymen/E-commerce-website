import { ShopContext, ShopContextProvider } from "@/app/component/Context/ShopContext";
import React, { useContext } from "react";
import NavBar from '../../app/component/navBar/navbar'
import '../../app/globals.css'
import '../css/product.css'
import Image from "next/image";
import { useRouter } from "next/router";
import star_icon from '../../app/component/assets/star_icon.png'
import star_dull from '../../app/component/assets/star_dull_icon.png'
import { BreadCrumb } from "@/app/component/Breadcrumb/BreadCrumb";
import Footer from "@/app/component/footer/footer";
import { Description } from "@/app/component/description/Description";
import { Related_Products } from "@/app/component/Related_Products/Related_Products";





const Product = () => {


    const {all_product,getCartProductsNumber} = useContext(ShopContext);

    const {addToCart} = useContext(ShopContext);

    const router = useRouter();


    const productId = router.query.id;


    const product = all_product.find((e)=> e.id === Number(productId));


    let image_src;
    
    if(!product){
        image_src = star_icon;
    }
    else{
        image_src = product.image;
    }



    return (
        <ShopContextProvider>
         <div className="product">
            
            <div className="container">
            <BreadCrumb product={product}/>
            <div className="es-info first">
            <h1>
                {product?product.name:"hamid"}
                </h1>
                        <div className="rating">
                        {Array.from({ length: 4 }).map((_, index) => (
                        <Image
                        key={index}
                        src={star_icon}
                        alt=''
                        />
                    ))}
                     <Image
                        src={star_dull}
                        alt=''
                        />
                        <p>(122)</p>
                        </div>
                        <div className="price">
                            <h3>${product?product.old_price:""}</h3>
                            <h3>${product?product.new_price:""}</h3>
                        </div>
            </div>
                <div className="content">
                    <div className="images">
                    <div className="second">
                        <Image
                        src={image_src}
                        alt='image'
                        className="second-image"
                       
                        />
                         <Image
                        src={image_src}
                        alt='image'
                        className="second-image"
                       
                        />
                         <Image
                        src={image_src}
                        alt='image'
                        className="second-image"
                        
                        />
                         <Image
                        src={image_src}
                        alt='image'
                        className="second-image"
                       
                        />
                    </div>

                    
                    <Image
                        src={image_src}
                        alt='image'
                        className="main-image"
                        />
                    </div>
                    
                  
                

                    <div className="info">
                    <div className="es-info last">
            <h1>{product?product.name:"hamid"}</h1>
                        <div className="rating">
                        {Array.from({ length: 4 }).map((_, index) => (
                        <Image
                        key={index}
                        src={star_icon}
                        alt=''
                        />
                    ))}
                     <Image
                        src={star_dull}
                        alt=''
                        />
                        <p>(122)</p>
                        </div>
                        <div className="price">
                            <h3>${product?product.old_price:""}</h3>
                            <h3>${product?product.new_price:""}</h3>
                        </div>
            </div>
                          <div className="description">
                            <p>A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline
                                and short sleeves, warn as an undershirt or outer    garment
                            </p>
                          </div>
                          <div className="size">
                            <h3>Select Size</h3>
                            <div className="sizes">
                                <div className="box">S</div>
                                <div className="box">M</div>
                                <div className="box">L</div>
                                <div className="box">XL</div>
                                <div className="box">XXL</div>
                            </div>
                          </div>

                          <button onClick={async()=>{await addToCart(productId)}}>ADD TO CART</button>

                          <div className="footer-product">
                            <h5>category: <span>{product?product.category:""}</span></h5>
                            <h5>Tags: <span>Modern, Latest</span></h5>
                          </div>
                    </div>
                    
                </div>
                <Description/>
            </div>
            <h1 className="special-heading">Related Products</h1>
           
                <Related_Products category={product?product.category:""} current_product={product?product.id:""}/>
        
            <Footer/>
        </div>
        </ShopContextProvider>
     
    )
}

export default Product