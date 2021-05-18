import React, { useEffect, useState } from 'react'
import '../styles.css'
import { API } from '../backend.js'
import Base from './Base.js'
import Card from './Card'
import {getProducts} from "../admin/helper/adminapicall"

export default function Home() {

    const [products, setProducts] = useState("");
    const [error, setError] = useState(false);

    const loadAllProducts = () => {
        getProducts().then(data=>{
            if(data.error) setError(true);
            else {setProducts(data);}
        })
    }

    useEffect(() => {
        loadAllProducts();
    }, [])

    return (<Base title="Home Page" description="Welcome to Tshirt Store">
    <div className="row">
    {products && products.map((product, index)=>
        (<div key={index} className="col-4 mb-4">
            <Card product={product}/>
        </div>)
    )}
        </div>
    </Base>)
}
