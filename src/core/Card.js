import React, { useState } from 'react'
import ImageHelper from './helper/imageHelper';
import {Redirect} from "react-router-dom"
import { addItemToCart, removeItemFromCart } from './helper/cardHelper';
import { isAuthenticated } from '../auth/helper';

const Card = ({product, AddToCart=true, RemoveFromCart=false, setreload=f=>f, reload=undefined}) => {

    const [redirect, setRedirect] = useState(false);    

    const getARedirect = (redirect) => {
        if(redirect && isAuthenticated()) return <Redirect to="/cart"/>
        else if(redirect) return <Redirect to="/Signin"/>
    }

    const addToCart = () => {
        addItemToCart(product, ()=> setRedirect(true))
    }

    return(
        <div className="card shadow shadow-light text-white bg-grey">
            <div className="card-header text-center lead">{product.name}</div>
            <div className="card-body text-center">
                {getARedirect(redirect)}
                <ImageHelper product={product}/>
                <p className="lead bg-success font-weight-normal text-wrap">
                    {product.description}
                </p>
                <p className="btn btn-success rounded btn-sm px-4">Rs. {product.price}</p>
                <div className="row">
                    {AddToCart && <div className="col-12">
                        <button onClick={addToCart} className="btn btn-block btn-outline-success my-2 col-12">
                            Add to cart
                        </button>
                    </div>}
                    {RemoveFromCart && <div className="col-12">
                        <button onClick={()=>{
                            removeItemFromCart(product._id);
                            setreload(!reload)}} className="btn btn-block btn-outline-danger my-2 col-12">
                            Remove from cart
                        </button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Card;