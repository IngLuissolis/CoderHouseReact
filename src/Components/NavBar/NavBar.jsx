import React from "react";
import CartWidget from "../CartWidget/CartWidget";
import './NavBar.css';

//Destructuring al props para mejor legilibilidad del codigo, porque es un objeto
//En el caso de no utilizar destructuring seria props.mensaje y props.temp
const NavBar = () => {
    return (
            <ul className='d-flex justify-content-between m-1'>
                <div>
                    <li><a href="#home">Camisetas</a></li>
                    <li><a href="#news">Gorros</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#about">About</a></li>
                </div>
                <div className='d-flex align-items-center m-1'>
                    <CartWidget/>
                </div>

            </ul>
    )
}

export default NavBar;