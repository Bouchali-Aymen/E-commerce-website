'use client';

import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import test from '../assets/product_1.png';
import remove from '../assets/cart_cross_icon.png';
import { ShopContext } from '../Context/ShopContext';
import './CartItems.css';

export const CartItems = () => {
    const { all_product, removeFromCart } = useContext(ShopContext);
    const [cart, setCart] = useState({});
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getCartItems = async () => {
        if (localStorage.getItem('token')) {
            const response = await fetch('http://localhost:4000/getCartData', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCart(data);
                console.log('Fetched cart data:', data);
            } else {
                console.log('Failed to fetch cart:', response.status);
            }
        }
    };

    const getData = async () => {
        try {
            const response = await fetch('http://localhost:4000/getProducts', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setProducts(data);
                console.log('Fetched products data:', data);
            } else {
                console.error('Failed to fetch products:', response.status);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };





    const getTotalCartAmount = () => {
        let total = 0;
        for(const item in cart){
            if(cart[item]>0){
                let iteminfo = products.find((e)=>e.id===Number(item));
                total = total+iteminfo.new_price*cart[item];
            }
        }
        return total;
    }
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await getCartItems();
            await getData();
            setIsLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        console.log('Updated cart state:', cart);
    }, [cart]);

    useEffect(() => {
        console.log('Updated products state:', products);
    }, [products]);
    const handleRemoveFromCart = (productId) => {
        removeFromCart(productId);
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            if (updatedCart[productId] > 1) {
                updatedCart[productId]--;
            } else {
                delete updatedCart[productId];
            }
            return updatedCart;
        });
    };
    return (
        <div className='cart-item'>
            {isLoading ? (
                <p>Loading cart and products...</p>
            ) : (
                <div className="container">
                    <div className="content">
                        <div className="head">
                            <p>Product</p>
                            <p style={{ marginLeft: 20 }}>Price</p>
                            <p>Quantity</p>
                            <p>Total</p>
                            <p>Remove</p>
                        </div>
                        <div>
                            {
                                products.map((product) => {
                                    if (cart[product.id] > 0) {
                                        return (
                                            <div className="box" key={product.id}>
                                                <div className="product">
                                                    <Image
                                                        src={product.image}
                                                        alt={product.name}
                                                        width={60}
                                                        height={60}
                                                    />
                                                    <p>{product.name}</p>
                                                </div>
                                                <p style={{ marginLeft: 20, fontWeight: 'bold' }}>{product.new_price} $</p>
                                                <p>{cart[product.id]}</p>
                                                <p style={{ fontWeight: 'bold' }}>{product.new_price * cart[product.id]} $</p>
                                                <Image
                                                    src={remove}
                                                    alt="Remove item"
                                                    onClick={() => {
                                                        handleRemoveFromCart(product.id)
                                                    
                                                        }}
                                                    style={{ cursor: 'pointer' }}
                                                />
                                            </div>
                                        );
                                    }
                                    return null;
                                })
                            }
                        </div>
                    </div>
                    <div className="cart-total">
                        <div className="totals">
                            <h2>Cart Totals</h2>
                            <div className="cell">
                                <p>Subtotal</p>
                                <p>${getTotalCartAmount()}</p>
                            </div>
                            <div className="cell">
                                <p>Shipping Free</p>
                                <p>Free</p>
                            </div>
                            <div className="cell">
                                <p style={{ fontWeight: 'bold' }}>Total</p>
                                <p style={{ fontWeight: 'bold' }}>${getTotalCartAmount()}</p>
                            </div>
                            <button>PROCEED TO CHECKOUT</button>
                        </div>
                        <div className="promo">
                            <p>If you have a promo code, enter it here</p>
                            <form action="">
                                <input type="text" placeholder='promo code' />
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};