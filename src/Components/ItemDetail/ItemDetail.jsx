import React, { useState, useContext } from 'react';
import ItemCount from '../ItemCount/ItemCount';
import { Shop } from '../../Contexts/CartContext';
import './ItemDetail.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const imgBBDD = require.context('../../img', true);
const MySwal = withReactContent(Swal);

const ItemDetail = ({product}) => {

    const {addProduct} = useContext(Shop);
    const navigate = useNavigate();

    const [cantidadItemDetail, setCantidadItemDetail] = useState(0);

    const confirmPurchase = (cantidad) => {
      let precioParcial = cantidad*product.precio;
      addProduct({...product, cantidad, precioParcial});
      setCantidadItemDetail(cantidad);
    }

    const handleNavigate = () => {
      navigate('/cart');
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
              {cantidadItemDetail ? 
                (MySwal.fire({
                        title: 'Producto Agregado al Carrito',
                        confirmButtonText: "OK",
                      }),
                <button className="btn btn-primary m-2 p-1" onClick={handleNavigate}>Go cart</button>)
                : <ItemCount onAdd={confirmPurchase} ID={product.id}
                stock={product.stock}/>
              }
            </div>
          </>
        )}
      </>
    );
}

export default ItemDetail;