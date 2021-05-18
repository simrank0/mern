import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { getProduct, updateProduct, getCategories } from "./helper/adminapicall"

const UpdateProduct = ({match}) => {

    const [values, setvalues] = useState({
        name:"",
        description:"",
        price:"",
        stock:"",
        photo:"",
        categories:[],
        category:"",
        loading:false,
        error:"",
        createdProduct:"",
        getRedirect: false,
        formData:""
    })
    // const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false);

    const {name, description, price, stock, 
        category, categories, loading, error, 
        createdProduct, getRedirect, formData} = values;

    const {user, token} = isAuthenticated();

    const preload = (productId) => {
        getProduct(productId).then(data=>{
            if(data.error) setvalues({...values, error: data.error})
            else {
                preloadCategories();
                setvalues({...values, 
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock, 
                    formData:new FormData()
                });
            }
        })
    }

    const preloadCategories = () => {
        getCategories().then(data=>{
            if(data.error) setvalues({...values, error:data.error})
            else setvalues({categories:data, formData: new FormData()})
        })
    }

    const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setvalues({...values, [name]: value})
    }

    const goBack = () => {
        return (<div className="mt-2">
            <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">Admin home</Link>
        </div>)
    }

    const onSubmit = (event) => {
        console.log(match)
        event.preventDefault()
        setvalues({...values, error: "" , loading: true});
        updateProduct(match.params.productId, user._id, token, formData)
        .then(data=>{
            if(data.error) setvalues({...values, error:data.error})
            else{
                setsuccess(true);
                setvalues({...values, 
                            name:"",
                            description:"",
                            price:"",
                            photo:"",
                            stock:"",
                            loading:false,
                            createdProduct:data.name});
            }
        })
    }

    const successMessage = () => (
        <div className="alert alert-success mt-3"
        style={{display:createdProduct?"":"none"}}>
            <h4>{createdProduct} updated successfully</h4>
        </div>
    )

    const errorMessage = () => {
        <div className="alert alert-danger mt-3"
        style={{display:error?"":"none"}}>
            <h4>Failed to update the product</h4>
        </div>
    }

    useEffect(() => {
        preload(match.params.productId);
    }, [])

    const productForm = () => (
        <form action="post" className="py-2 text-white">
            <span>Post photo</span>
            <div className="form-group mb-2">
                <label htmlFor="" className="btn btn-block btn-success form-control">
                    <input type="file"
                    name="photo"
                    accept="image"
                    onChange={handleChange("photo")}
                    placeholder="Choose a file"
                    className="form-control"/>
                </label>
            </div>
            <div className="form-group mb-2">
                <input 
                type="text" className="form-control" 
                onChange={handleChange("name")}
                name="name"
                placeholder="Name"
                value={name}
                />
            </div>
            <div className="form-group mb-2">
                <textarea className="form-control" 
                onChange={handleChange("description")}
                name="description"
                placeholder="Description"
                value={description}
                />
            </div>
            <div className="form-group mb-2">
                <input className="form-control" 
                onChange={handleChange("price")}
                placeholder="Price"
                type="number"
                value={price}
                />
            </div>
            <div className="form-group mb-2">
                <select onChange={handleChange("category")} 
                className="form-control"
                placeholder="Category">
                    <option value="">Select</option>
                    {categories && categories.map((cate, index)=>(
                        <option key={index} value={cate._id}>{cate.name}</option>
                    ))}
                </select>
            </div>
            <div className="form-group mb-2">
                <input className="form-control" 
                onChange={handleChange("stock")}
                placeholder="Quantity"
                type="number"
                value={stock}
                />
            </div>
            <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-outline-success text-white">
                Update Product
            </button>
        </form>
    )

    return (
        <Base 
        title="Update product"
        description="Product updation section"
        className="container bg-info p-4">
            {goBack()}
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2">
                    {errorMessage()}
                    {successMessage()}                    
                    {productForm()}
                </div>
            </div>
        </Base>
    )
}

export default UpdateProduct;