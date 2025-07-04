import React, {useEffect, useRef} from 'react';
import './Navbar.css'
/*import logo from '../../assets/logo.png'*/
import myflex from "../../assets/myflex.png"
import search_icon from '../../assets/search_icon.svg'
import bell_icon from '../../assets/bell_icon.svg'
import profile_img from '../../assets/profile_img.png'
import caret_img from '../../assets/caret_icon.svg'
import {logout} from "../../firebase.js";

const Navbar = () => {

    const navRef = useRef()

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 80) {
                navRef.current.classList.add('nav-dark')
            } else {
                navRef.current.classList.remove('nav-dark')
            }
        })
    }, []);

    return (
        <div ref={navRef} className="navbar">
            <div className="navbar-left">
                <img src={myflex} alt=""/>
                <ul>
                    <li>Home</li>
                    <li>TV Shows</li>
                    <li>Movies</li>
                    <li>New & Popular</li>
                    <li>My List</li>
                    <li>Browse by Languages</li>
                </ul>
            </div>
            <div className="navbar-right">
                <img className="icons" src={search_icon} alt=""/>
                <p>Children</p>
                <img className="icons" src={bell_icon} alt=""/>
                <div className="navbar-profile">
                    <img className="profile" src={profile_img} alt=""/>
                    <img src={caret_img} alt=""/>
                    <div className="dropdown">
                        <p onClick={() => {
                            logout()
                        }}>Sign Out of MyFlex</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;