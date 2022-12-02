import React from 'react';
import { useContext } from 'react';
import { Shop } from '../../Contexts/CartContext';
import './CartItem.css';

const imgBBDD = require.context('../../img', true);

const Cart = ({item}) => {

    const {removeProduct} = useContext(Shop);

    const handleRemove = () => {
        removeProduct(item.id)
      }

    return(
        <>
            <div className="d-flex justify-content-between align-items-center m-3 p-1">
                <img className='imgCamisetaCart' src={imgBBDD("./" + item.imgCamiseta)} alt='item-bandera'></img>
                <h3 className="m-1 p-0">{item.nombre}</h3>
                <span className="m-1 p-0">Camiseta {item.camiseta}</span>
                <span className="m-1 p-0">Cantidad {item.cantidad}</span>
                <span className="m-1 p-0">${item.precioParcial.toLocaleString()}</span>
                <button className="btn btn-danger" onClick={handleRemove}>Quitar</button>
            </div>
            <div className="astrodivider">
                <div className="astrodividermask"></div>
            </div>
       </>
    );
}

export default Cart;