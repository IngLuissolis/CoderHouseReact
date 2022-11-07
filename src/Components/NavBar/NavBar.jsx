import React from "react";
import { Link } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import './NavBar.css';

//Destructuring al props para mejor legilibilidad del codigo, porque es un objeto
//En el caso de no utilizar destructuring seria props.mensaje y props.temp
const NavBar = () => {
    return (
            <ul className='d-flex justify-content-between m-1'>
                <div>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/alternativa'>Alternativa</Link></li>
                </div>
                <div className='d-flex align-items-center m-1'>
                    <CartWidget/>
                </div>

            </ul>
    )
}

export default NavBar;