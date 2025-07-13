import React from "react"
import { Link, NavLink } from "react-router-dom"
import imageUrl from "/assets/images/avatar-icon.png"


export default function Header() {
    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }
     function fakeLogOut() {
        localStorage.removeItem("loggedin")
    }

    return (
        <header>
            <Link className="site-logo" to="/">#VanLife</Link>
            <nav>
                <NavLink 
                    to="/host" 
                    className={({ isActive }) => isActive ? "active-link" : ""}>
                    Host
                </NavLink>
                <NavLink 
                    to="/about" 
                    className={({ isActive }) => isActive ? "active-link" : ""}>
                    About
                </NavLink>
                <NavLink 
                    to="/vans" 
                    className={({ isActive }) => isActive ? "active-link" : ""}>
                    Vans
                </NavLink>
                <Link to="login" className="login-link">
                    <img src={imageUrl} className="login-icon"/>
                </Link>
                <button onClick={fakeLogOut}>X</button>
            </nav>
        </header>
    )
    
}