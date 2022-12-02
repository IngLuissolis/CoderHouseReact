import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Theme } from "../../Contexts/CamisetaContext";
import CartWidget from "../CartWidget/CartWidget";
import './NavBar.css';

//Destructuring al props para mejor legilibilidad del codigo, porque es un objeto
//En el caso de no utilizar destructuring seria props.mensaje y props.temp
const NavBar = () => {

    const {themeCamiseta, setThemeCamiseta} = useContext(Theme);

    const handleChange = (event) => {
        event.preventDefault();
        setThemeCamiseta(event.target.value);
    }

    return (
            <ul className='d-flex justify-content-between align-items-center m-1'>
                <div>
                    <li className='m-1'><Link to='/'>Home</Link></li>
                    <li className='m-1'><Link to='/category/grupoA'>Grupo A</Link></li>
                    <li className='m-1'><Link to='/category/grupoB'>Grupo B</Link></li>
                    <li className='m-1'><Link to='/category/grupoC'>Grupo C</Link></li>
                    <li className='m-1'><Link to='/category/grupoD'>Grupo D</Link></li>
                    <li className='m-1'><Link to='/category/grupoE'>Grupo E</Link></li>
                    <li className='m-1'><Link to='/category/grupoF'>Grupo F</Link></li>
                    <li className='m-1'><Link to='/category/grupoG'>Grupo G</Link></li>
                    <li className='m-1'><Link to='/category/grupoH'>Grupo H</Link></li>
                    </div>
                <div className='d-flex align-items-center m-1'>
                    <select 
                        value={themeCamiseta} 
                        onChange={handleChange}
                    >
                        <option value={'titular'}>Titular</option>
                        <option value={'suplente'}>Suplente</option>
                    </select>
                    <CartWidget/>
                </div>

            </ul>
    )
}

export default NavBar;