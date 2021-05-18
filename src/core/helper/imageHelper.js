import React from 'react'
import { API } from '../../backend';

const ImageHelper = ({product}) => {
    return (
        <div className="rounded border mb-1 border-dark">
            <img 
            src={`${API}/product/photo/${[product._id]}`} 
            alt="product"
            style={{maxHeight:"100%", maxWidth:"100%"}} 
            className="mb-3 rounded"/>
        </div>
    )
}

export default ImageHelper;