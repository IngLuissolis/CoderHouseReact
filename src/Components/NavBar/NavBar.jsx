import React from "react";
import { Link } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";
import './NavBar.css';

//Destructuring al props para mejor legilibilidad del codigo, porque es un objeto
//En el caso de no utilizar destructuring seria props.mensaje y props.temp
const NavBar = () => {
    return (
            <ul className='d-flex justify-content-between align-items-center m-1'>
                <div>
                    <li className='m-1'><Link to='/'>Home</Link></li>
                    <li className='m-1'><Link to='/category/grupoA'>Grupo A</Link></li>
                    <li className='m-1'><Link to='/category/grupoB'>Grupo B</Link></li>
                    </div>
                <div className='d-flex align-items-center m-1'>
                    <CartWidget/>
                </div>

            </ul>
    )
}

export default NavBar;