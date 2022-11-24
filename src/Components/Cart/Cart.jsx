import React from 'react';
import { useContext } from 'react';
import { Shop } from '../../Contexts/CartContext';
import './Cart.css';

const imgBBDD = require.context('../../img', true);

const Cart = ({item}) => {

    const {removeProduct} = useContext(Shop);

    return(
            <div className="d-flex justify-content-between align-items-center m-3 p-1">
                <img className='imgCamisetaCart' src={imgBBDD("./" + item.camiseta1)} alt='item-bandera'></img>
                <h2 className="m-1 p-0">{item.nombre}</h2>
                <span>Cantidad: {item.quantity}</span>
                <button className="btn btn-danger" onClick={() => removeProduct(item.id)}>Eliminar</button>
            </div>
    );
}

export default Cart;