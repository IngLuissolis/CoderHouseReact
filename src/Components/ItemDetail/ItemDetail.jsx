import React from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { useContext } from 'react';
import { Shop } from '../../Contexts/CartContext';
import './ItemDetail.css';

const imgBBDD = require.context('../../img', true);

const ItemDetail = ({product}) => {

    const {addProduct} = useContext(Shop);

    const confirmPurchase = (cantidad) => {
      let precioParcial = cantidad*product.precio;
      addProduct({...product, cantidad, precioParcial});
    }

    return (
      <>
        {product.imgBandera === null ? (
          <></>
        ) : (
          <>
            <div key={product.id} className="card m-3 p-0 text-center">
              <div className="d-flex justify-content-center align-items-center">
                <h3 className="m-1 p-1">{product.nombre}</h3>
                <img
                  className="imgBandera m-1 p-1"
                  src={imgBBDD("./" + product.imgBandera)}
                  alt="img producto"
                />
              </div>
              <img
                className="imgCamiseta m-1 p-1"
                src={imgBBDD("./" + product.imgCamiseta)}
                alt="img camiseta"
              />
              <p className="m-1 p-1">Stock: {product.stock}</p>
              <p className="m-1 p-1">Precio: ${product.precio}</p>
              <p className="m-1 p-1">Descripción: Camiseta {product.camiseta}</p>
              <ItemCount onAdd={confirmPurchase} ID={product.id}
                stock={product.stock}/>
            </div>
          </>
        )}
      </>
    );
}

export default ItemDetail;