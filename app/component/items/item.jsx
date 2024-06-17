import React from "react";
import './item.css';
import Image from "next/image";
import product_image from '../assets/product_14.png'
import Link from "next/link";
import { usePathname } from "next/navigation";




const Item = ({image_src,name,new_price,old_price,id}) =>{
    const regexPattern = /^\/product\/([a-zA-Z0-9_-]+)$/;
    let url = `product/${id}`;
    const path = usePathname();

    return(
          <div className="item">
            <div className="image">
                {
                    path.match(regexPattern)
                    ?
                    <Link href={
                        {
                        pathname:'/redirect',
                        query:{
                            productId:id,
                        },
                    }
                        }
                        
                        >
                            <Image
                            src={image_src}
                            alt='product'
                            className="product_image"
                            width={320}
                            height={60}
                            />
                            </Link>
                            :
                            <Link href={
                                {
                        pathname:url,
                        query:{
                            productId:id,
                        },
                        }
                        }
                        as={`/product/${id}`}
                        >
                            <Image
                            src={image_src}
                            alt='product'
                            className="product_image"
                            priority={true}
                            width={320}
                            height={60}
                            />
                             </Link>
                }
            
            </div>
            <p>{name}</p>
            <p className="price">${new_price}<span>${old_price}</span></p>
        </div>
       
      
    )
}


export default Item;