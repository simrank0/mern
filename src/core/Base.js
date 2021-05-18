import React from 'react';
import Menu from "./Menu"
const Base = ({
    title="My Title",
    description="My description",
    className="bg-dark text-white p-4",
    children
})=>{
    return (
        <div>
            <Menu/>
            <div className="container-fluid px-0">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead mb-0">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <footer className="footer bg-dark">
                <div className="container-fluid bg-success text-white text-center">
                    <h4>If you have any questions feel free to
                    <button className=" mx-3 btn btn-warning btn-large">Contact Us</button>
                    </h4>
                </div>
            </footer>
        </div>
    )
}

export default Base;