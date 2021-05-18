import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import Base from '../core/Base'
import {createCategory} from "./helper/adminapicall"

const AddCategory = () => {

    const [name, setname] = useState("");
    const [error, seterror] = useState(false);
    const [success, setsuccess] = useState(false)

    const {user, token} = isAuthenticated();

    const goBack = () => {
        return (<div className="mt-2">
            <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">Admin home</Link>
        </div>)
    }

    const handleChange = (event) => {
        seterror("");
        setname(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault()
        setsuccess(false);
        seterror("");
        createCategory(user._id, token, {name})
        .then(data=>{
            if(data.error) seterror(true);
            else{
                seterror("");
                setsuccess(true);
                setname("");
            }
        })
    }

    const successMessage = () => {
        if(success){
            return <h4 className="text-success">Category created successfully</h4>
        }
    }

    const errorMessage = () => {
        if(error){
            return <h4 className="text-danger">Failed to create category</h4>
        }
    }

    const categoryForm = () => (
        <form action="post" className="py-2">
            <div className="form-group">
                <p className="lead">Enter the category</p>
                <input type="text" className="form-control my-3" 
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="Ex. Summer"/>
                <button onClick={onSubmit} className="btn btn-outline-info">Create category</button>
            </div>
        </form>
    )

    return (
        <Base 
        title="Create new category"
        description="Add a new category of tshirts"
        className="container bg-info p-4">
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {errorMessage()}
                    {successMessage()}                    
                    {categoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory;