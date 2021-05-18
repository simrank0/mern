import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { isAuthenticated } from '../auth/helper'
import '../styles.css'
import Base from './Base.js'
import Card from './Card'
import { loadCart } from './helper/cardHelper'
import Paymentb from './Paymentb'

const Cart = () => {

    const [products, setProducts] = useState([]);
    const [reload, setreload] = useState(false)


    useEffect(()=>(
        setProducts(loadCart())
    ),[reload]);

    const loadAllProducts = products => {
        return (
            <div>
                {products.map((product, index)=>(
                    <Card 
                    key={index} 
                    product={product} 
                    AddToCart={false} 
                    RemoveFromCart={true}
                    setreload={setreload}
                    reload={reload}/>
                ))}
            </div>
        )
    }

    return (
    <Base title="Cart Page" description="Ready to checkout">
        {isAuthenticated() ?
        (<div className="row text-center">
            <div className="col-6">{products.length>0? loadAllProducts(products) : <h3>Cart Empty</h3>}</div>
            <div className="col-6"><Paymentb products={products} setreload={setreload}/></div>
        </div>): (<Redirect to="/Signin"/>)}
    </Base>
    )
}

export default Cart;