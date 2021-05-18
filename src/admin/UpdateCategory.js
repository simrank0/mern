import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import { updateCategory, getCategory } from "./helper/adminapicall"

const UpdateCategory = ({match}) => {
    const [category, setCategory] = useState({
        name:"",
        error:""
    });
    const [success, setsuccess] = useState(false);
    const {user, token} = isAuthenticated();

    const preload = (categoryId) => {
        getCategory(categoryId).then(data=>{
            if(data.error) setCategory({...category, error:data.error})
            else {
                setCategory({
                    name:data.name,
                    error:""
                })
            }
            })
    }

    const handleChange = event => {
        const value = event.target.value;
        setCategory({...category, name:value});
    }

    const goBack = () => {
        return (<div className="mt-2">
            <Link className="btn btn-sm btn-dark mb-3" to="/admin/dashboard">Admin home</Link>
        </div>)
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setCategory({...category, error:""});
        updateCategory(match.params.categoryId, user._id, token, category)
        .then(data=>{
            if(data.error) setCategory({...category, error:data.error});
            else{
                setsuccess(true);
            }
        })
    }

    const successMessage = () => (
        <div className="alert alert-success mt-3"
        style={{display:success?"":"none"}}>
            <h4>{category.name} updated successfully</h4>
        </div>
    )

    const errorMessage = () => {
        <div className="alert alert-danger mt-3"
        style={{display:!success?"":"none"}}>
            <h4>Failed to update the category</h4>
        </div>
    }

    useEffect(() => {
        preload(match.params.categoryId)
    }, [])

    const categoryForm = () => (
        <form action="post" className="py-2 text-white">
            <div className="form-group mb-2">
                <input 
                type="text" className="form-control" 
                onChange={handleChange}
                name="name"
                placeholder="Name"
                value={category.name}
                />
            </div>
            <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-outline-success text-white">
                Update Category
            </button>
        </form>
    )

    return (
        <Base 
        title="Create new product"
        description="Product updation section"
        className="container bg-info p-4">
            {goBack()}
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2">
                    {errorMessage()}
                    {successMessage()}                    
                    {categoryForm()}
                </div>
            </div>
        </Base>
    )
}

export default UpdateCategory;